import { performance } from "node:perf_hooks";

import OpenAI from "openai";

export type Prospect = {
  companyName: string;
  summary: string;
  outreachEmail: string;
  coldCallScript: string;
};

type ProspectPayload = Omit<Prospect, "companyName">;

const prospectSchema = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "outreachEmail", "coldCallScript"],
  properties: {
    summary: {
      type: "string",
      description:
        "A short 3-4 sentence prospect summary with likely context, pain points, and a sales angle."
    },
    outreachEmail: {
      type: "string",
      description:
        "A concise cold outreach email with a subject line, greeting, body, and sign-off."
    },
    coldCallScript: {
      type: "string",
      description:
        "A short cold call script with an opener, value proposition, qualifying question, and close."
    }
  }
} as const;

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to backend/.env before generating prospect materials."
    );
  }

  return new OpenAI({ apiKey });
}

function getOpenAIModel() {
  return process.env.OPENAI_MODEL?.trim() || "gpt-5.4-mini";
}

function isProspectPayload(value: unknown): value is ProspectPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.summary === "string" &&
    typeof candidate.outreachEmail === "string" &&
    typeof candidate.coldCallScript === "string"
  );
}

export async function buildProspectResponse(companyName: string): Promise<Prospect> {
  const client = getOpenAIClient();
  const model = getOpenAIModel();
  const openAIStartedAt = performance.now();

  try {
    const response = await client.responses.create({
      model,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: [
                "You are an AI sales assistant for an interview demo.",
                "Generate practical outbound materials for a sales rep targeting a company.",
                "Be useful, concise, and credible.",
                "Do not invent precise metrics, recent news, named executives, or specific product facts unless they are obvious from the company name alone.",
                "If context is uncertain, write with calibrated language such as likely, may, appears to, or probably.",
                "The summary should be 3-4 sentences.",
                "The email should be concise and polished.",
                "The call script should sound natural and short enough for a real opening conversation."
              ].join(" ")
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Company name: ${companyName}`
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "prospect_assets",
          strict: true,
          schema: prospectSchema
          }
      }
    });

    console.info(
      `[timing] openai.responses.create company="${companyName}" model="${model}" responseId="${response.id}" durationMs=${Math.round(
        performance.now() - openAIStartedAt
      )}`
    );

    const payloadText = response.output_text;

    if (!payloadText) {
      throw new Error("OpenAI returned an empty response.");
    }

    const payload = JSON.parse(payloadText) as unknown;

    if (!isProspectPayload(payload)) {
      throw new Error("OpenAI returned an invalid prospect payload.");
    }

    return {
      companyName,
      summary: payload.summary,
      outreachEmail: payload.outreachEmail,
      coldCallScript: payload.coldCallScript
    };
  } catch (error) {
    console.info(
      `[timing] openai.responses.create company="${companyName}" model="${model}" durationMs=${Math.round(
        performance.now() - openAIStartedAt
      )} status=error`
    );
    throw error;
  }
}

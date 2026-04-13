import type { Prospect } from "./types";

type GenerateProspectResponse = {
  prospect: Prospect;
};

export async function generateProspect(companyName: string): Promise<Prospect> {
  const response = await fetch("/api/prospects/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ companyName })
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? "Unable to generate prospect materials.");
  }

  const payload = (await response.json()) as GenerateProspectResponse;
  return payload.prospect;
}


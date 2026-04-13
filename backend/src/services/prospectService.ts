export type Prospect = {
  companyName: string;
  summary: string;
  outreachEmail: string;
  coldCallScript: string;
};

type ProspectSignal = {
  sector: string;
  painPoint: string;
  valueAngle: string;
};

const signalLibrary: Array<{ keyword: string; signal: ProspectSignal }> = [
  {
    keyword: "health",
    signal: {
      sector: "healthcare",
      painPoint: "slow handoffs across revenue, operations, and customer success",
      valueAngle: "give reps faster context and more consistent messaging"
    }
  },
  {
    keyword: "fin",
    signal: {
      sector: "financial services",
      painPoint: "high-friction outreach where trust and precision matter",
      valueAngle: "help reps personalize outreach without slowing down"
    }
  },
  {
    keyword: "data",
    signal: {
      sector: "data infrastructure",
      painPoint: "complex technical positioning that is hard for reps to translate quickly",
      valueAngle: "turn product context into buyer-ready language"
    }
  },
  {
    keyword: "cloud",
    signal: {
      sector: "cloud software",
      painPoint: "crowded categories where generic outreach gets ignored",
      valueAngle: "produce sharper account-specific messaging at scale"
    }
  },
  {
    keyword: "logistics",
    signal: {
      sector: "logistics",
      painPoint: "disconnected operational workflows and delayed follow-up",
      valueAngle: "reduce time between research, outreach, and next step"
    }
  }
];

const defaultSignal: ProspectSignal = {
  sector: "B2B software",
  painPoint: "reps losing time when they move from account research into outbound execution",
  valueAngle: "compress research, messaging, and call prep into a single workflow"
};

function inferSignal(companyName: string): ProspectSignal {
  const normalizedName = companyName.toLowerCase();

  return (
    signalLibrary.find(({ keyword }) => normalizedName.includes(keyword))?.signal ??
    defaultSignal
  );
}

export async function buildProspectResponse(companyName: string): Promise<Prospect> {
  const signal = inferSignal(companyName);

  const summary = `${companyName} appears to be operating in ${signal.sector}, where teams often care about speed, clarity, and consistent buyer communication. A strong outbound angle is that sales reps likely face ${signal.painPoint}, so an AI assistant can ${signal.valueAngle}.`;

  const outreachEmail = [
    `Subject: Helping ${companyName} turn account research into faster outbound`,
    "",
    `Hi there,`,
    "",
    `I took a look at ${companyName} and one theme stood out: teams in ${signal.sector} usually need reps to move quickly without sending generic messaging.`,
    "",
    `We built an AI sales assistant that turns a target account into a short prospect summary, a polished outreach email, and a cold call script in one step. The goal is simple: reduce prep time while improving message consistency.`,
    "",
    `If ${signal.painPoint} is relevant for your team, I’d love to show you a quick demo.`,
    "",
    `Best,`,
    `Your Name`
  ].join("\n");

  const coldCallScript = [
    `Hi, this is Your Name.`,
    "",
    `I’m reaching out because teams like ${companyName} often have to balance fast outreach with thoughtful messaging, especially in ${signal.sector}.`,
    "",
    `We built a lightweight AI assistant that helps reps go from company research to a usable email and call plan in minutes instead of stitching it together manually.`,
    "",
    `I was curious whether your team is exploring ways to improve outbound consistency or reduce rep prep time.`,
    "",
    `If that’s relevant, I’d be happy to show a two-minute example.`
  ].join("\n");

  return {
    companyName,
    summary,
    outreachEmail,
    coldCallScript
  };
}


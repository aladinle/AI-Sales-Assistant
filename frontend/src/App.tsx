import { FormEvent, useState, useTransition } from "react";

import { generateProspect } from "./features/prospect/api";
import { ArtifactCard } from "./features/prospect/components/ArtifactCard";
import type { Prospect } from "./features/prospect/types";

const starterCompanies = ["Ramp", "Notion", "Cloudflare"];

export default function App() {
  const [companyName, setCompanyName] = useState("");
  const [prospect, setProspect] = useState<Prospect | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedCompanyName = companyName.trim();

    if (!trimmedCompanyName) {
      setErrorMessage("Enter a company name to generate outreach assets.");
      return;
    }

    setErrorMessage(null);

    try {
      const nextProspect = await generateProspect(trimmedCompanyName);
      startTransition(() => {
        setProspect(nextProspect);
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong while generating assets.";
      setErrorMessage(message);
    }
  }

  function handleStarterClick(name: string) {
    setCompanyName(name);
  }

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Project 1 · AI Sales Assistant</p>
          <h1>Turn a company name into a demo-ready outbound package.</h1>
          <p className="lede">
            This prototype shows the product loop clearly: lightweight company input, fast AI value,
            and sales-ready output that feels useful in a real workflow.
          </p>
        </div>

        <div className="hero-panel__meta">
          <p>Inputs</p>
          <strong>Company name</strong>
          <p>Outputs</p>
          <strong>Summary, email, cold call script</strong>
        </div>
      </section>

      <section className="workspace-panel">
        <form className="generator-form" onSubmit={handleSubmit}>
          <label htmlFor="companyName">Target company</label>
          <div className="generator-form__controls">
            <input
              id="companyName"
              name="companyName"
              placeholder="Enter a company like Ramp or Notion"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
            />
            <button type="submit" disabled={isPending}>
              {isPending ? "Generating..." : "Generate assets"}
            </button>
          </div>
        </form>

        <div className="starter-row">
          {starterCompanies.map((name) => (
            <button
              key={name}
              className="starter-chip"
              type="button"
              onClick={() => handleStarterClick(name)}
            >
              {name}
            </button>
          ))}
        </div>

        {errorMessage ? <p className="error-banner">{errorMessage}</p> : null}

        {prospect ? (
          <section className="results-grid">
            <ArtifactCard title="Prospect summary" body={prospect.summary} />
            <ArtifactCard title="Outreach email" body={prospect.outreachEmail} />
            <ArtifactCard title="Cold call script" body={prospect.coldCallScript} />
          </section>
        ) : (
          <section className="empty-state">
            <p className="empty-state__eyebrow">Demo narrative</p>
            <h2>Built to show product judgment, not just API plumbing.</h2>
            <p>
              The current version uses a backend mock generator so we can lock down architecture,
              UX flow, and talking points before introducing a live model.
            </p>
          </section>
        )}
      </section>
    </main>
  );
}


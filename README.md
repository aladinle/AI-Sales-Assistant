# AI Sales Assistant

Interview-ready project scaffold for a small AI product: enter a company name and receive a prospect summary, outreach email, and cold call script.

## Folder layout

```text
ai-sales-assistant/
  backend/
  frontend/
```

## Why this structure

- `frontend`: React + Vite app focused on product UX and demo flow
- `backend`: Node + Express API with a clean path to real model integration
- Feature-first UI code and service-based backend logic for easy talking points

## Local development

1. Run `npm install`
2. Run `npm run dev`
3. Open `http://localhost:5173`

The app currently uses a mock prospect generator so the full flow is demoable before wiring in OpenAI.

## Suggested next steps

1. Replace the mock generator with an LLM-backed research + drafting pipeline
2. Add schema validation, prompt versioning, and request logging
3. Persist recent generations so the demo has a history view
4. Add a company enrichment source for stronger summaries

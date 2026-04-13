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
2. Copy `backend/.env.example` to `backend/.env`
3. Add your `OPENAI_API_KEY`
4. Run `npm run dev`
5. Open `http://localhost:5173`

The backend now calls OpenAI directly and returns structured JSON to the frontend, so the UI keeps the same API contract while the generated content becomes genuinely model-backed.

## Suggested next steps

1. Add a lightweight research/enrichment step before drafting so the outputs feel more company-specific
2. Add request logging, prompt versioning, and response persistence for stronger product storytelling
3. Introduce loading states and artifact copy buttons in the UI
4. Add evaluation examples so you can talk about prompt quality and iteration during interviews

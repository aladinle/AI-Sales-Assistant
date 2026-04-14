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

## Production deployment

This repo is configured to run as a single Render web service:

- Render builds both apps with `npm run build`
- The Express backend serves the built frontend from `frontend/dist`
- Render should run the root `npm start` command

### Render environment variables

- `OPENAI_API_KEY`: required
- `OPENAI_MODEL`: optional, defaults to `gpt-5-mini`
- `NODE_ENV`: set to `production`

### Deploy flow on Render

1. Create a new Web Service from this repo
2. Use `npm install && npm run build` as the build command if Render does not read `render.yaml`
3. Use `npm start` as the start command
4. Set `OPENAI_API_KEY` in Render
5. Deploy and open your Render URL

After deploy:

- the app UI is served from `/`
- the health endpoint is `/api/health`
- the generation endpoint is `/api/prospects/generate`

## Suggested next steps

1. Add a lightweight research/enrichment step before drafting so the outputs feel more company-specific
2. Add request logging, prompt versioning, and response persistence for stronger product storytelling
3. Introduce loading states and artifact copy buttons in the UI
4. Add evaluation examples so you can talk about prompt quality and iteration during interviews

## Sources

- [Render Node web service quickstart](https://render.com/docs/deploy-node-hapi-app)
- [OpenAI models overview](https://developers.openai.com/api/docs/models)

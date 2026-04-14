import { performance } from "node:perf_hooks";

import { Router } from "express";

import { buildProspectResponse } from "../services/prospectService.js";

type GenerateProspectBody = {
  companyName?: string;
};

export const prospectRouter = Router();

prospectRouter.post("/generate", async (request, response) => {
  const requestStartedAt = performance.now();

  try {
    const { companyName } = request.body as GenerateProspectBody;
    const normalizedCompanyName = companyName?.trim();

    if (!normalizedCompanyName) {
      response.status(400).json({
        error: "Please provide a company name."
      });
      console.info(
        `[timing] POST /api/prospects/generate status=400 durationMs=${Math.round(
          performance.now() - requestStartedAt
        )}`
      );
      return;
    }

    const prospect = await buildProspectResponse(normalizedCompanyName);

    response.json({ prospect });
    console.info(
      `[timing] POST /api/prospects/generate company="${normalizedCompanyName}" status=200 durationMs=${Math.round(
        performance.now() - requestStartedAt
      )}`
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to generate prospect materials.";

    response.status(500).json({
      error: message
    });
    console.info(
      `[timing] POST /api/prospects/generate status=500 durationMs=${Math.round(
        performance.now() - requestStartedAt
      )}`
    );
  }
});

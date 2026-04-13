import { Router } from "express";

import { buildProspectResponse } from "../services/prospectService.js";

type GenerateProspectBody = {
  companyName?: string;
};

export const prospectRouter = Router();

prospectRouter.post("/generate", async (request, response) => {
  try {
    const { companyName } = request.body as GenerateProspectBody;
    const normalizedCompanyName = companyName?.trim();

    if (!normalizedCompanyName) {
      response.status(400).json({
        error: "Please provide a company name."
      });
      return;
    }

    const prospect = await buildProspectResponse(normalizedCompanyName);

    response.json({ prospect });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to generate prospect materials.";

    response.status(500).json({
      error: message
    });
  }
});

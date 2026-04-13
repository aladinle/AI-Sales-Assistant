import { Router } from "express";

import { buildProspectResponse } from "../services/prospectService.js";

type GenerateProspectBody = {
  companyName?: string;
};

export const prospectRouter = Router();

prospectRouter.post("/generate", async (request, response) => {
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
});


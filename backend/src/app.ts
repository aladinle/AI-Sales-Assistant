import { fileURLToPath } from "node:url";
import path from "node:path";

import cors from "cors";
import express from "express";

import { prospectRouter } from "./routes/prospectRoutes.js";

export const app = express();
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const frontendDistDirectory = path.resolve(currentDirectory, "../../frontend/dist");
const isProduction = process.env.NODE_ENV === "production";

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    message: "Backend is running"
  });
});

app.use("/api/prospects", prospectRouter);

if (isProduction) {
  app.use(express.static(frontendDistDirectory));

  app.get("*", (request, response, next) => {
    if (request.path.startsWith("/api")) {
      next();
      return;
    }

    response.sendFile(path.join(frontendDistDirectory, "index.html"));
  });
}

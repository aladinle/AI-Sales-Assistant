import cors from "cors";
import express from "express";

import { prospectRouter } from "./routes/prospectRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
    response.json({
        status: "ok",
        message: "Backend is running"
    });
});

app.use("/api/prospects", prospectRouter);


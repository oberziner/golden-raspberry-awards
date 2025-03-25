import express from "express";
import getAwardIntervalsRoute from "../routes/award-intervals";

export async function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/awards", getAwardIntervalsRoute);
  return app;
}

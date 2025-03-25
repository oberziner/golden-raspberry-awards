import express from "express";
import getAwardIntervalsRoute from "../routes/award-intervals";
import getDBConnection from "../db/sqlite-connection";

export async function buildApp() {
  await getDBConnection(); // Initialize database
  const app = express();
  app.use(express.json());
  app.use("/awards", getAwardIntervalsRoute);
  return app;
}

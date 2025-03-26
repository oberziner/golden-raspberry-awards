import express, { Request, Response } from "express";
import {
  getMaxAwardInterval,
  getMinAwardInterval,
} from "../repository/awards-repository";

async function getAwardIntervalsRoute(_: Request, res: Response) {
  const maxAward = await getMaxAwardInterval();
  const minAward = await getMinAwardInterval();

  res.status(200).json({
    min: minAward,
    max: maxAward,
  });
}

const route = express.Router();
route.get("/", getAwardIntervalsRoute);

export default route;

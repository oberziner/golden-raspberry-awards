import express, { Request, Response } from "express";
import { getAwardIntervals } from "../repository/awards-repository";

async function getAwardIntervalsRoute(req: Request, res: Response) {
  const awards = await getAwardIntervals();
  const awardIntervals = {
    min: [
      {
        producer: "Producer 1",
        interval: 1,
        previousWin: 2008,
        followingWin: 2009,
      },
      {
        producer: "Producer 2",
        interval: 1,
        previousWin: 2018,
        followingWin: 2019,
      },
    ],
    max: [
      {
        producer: "Producer 1",
        interval: 99,
        previousWin: 1900,
        followingWin: 1999,
      },
      {
        producer: "Producer 2",
        interval: 99,
        previousWin: 2000,
        followingWin: 2099,
      },
    ],
  };
  res.status(200).json(awards);
}

const route = express.Router();
route.get("/", getAwardIntervalsRoute);

export default route;

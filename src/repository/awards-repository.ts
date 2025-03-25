import getDBConnection from "../db/sqlite-connection";

type Award = {
  year: number;
};

export async function getAwardIntervals() {
  const db = await getDBConnection();
  const awards = (await db.all("SELECT * FROM movies")) as Award[];
  return awards.map((award) => ({
    followingWin: award.year,
  }));
}

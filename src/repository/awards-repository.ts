import getDBConnection from "../db/sqlite-connection";

type Award = {
  year: number;
};

export async function getAwardIntervals() {
  const db = await getDBConnection();
  const testSql = await db.all(`
    SELECT p.id, p.name AS producer_name, m.id, m.title AS movie_title, m.year, m.winner
    FROM producers p
    LEFT JOIN producer_movies mp ON p.id = mp.producer_id
    LEFT JOIN movies m ON mp.movie_id = m.id
    WHERE p.name = "Jerry Bruckheimer";
	`);
  console.log(JSON.stringify(testSql, null, 2));
  const testSql2 = await db.all(`
    SELECT p.id, p.name AS producer_name, m.id, m.title AS movie_title, m.year, m.winner
    FROM producers p
    LEFT JOIN producer_movies mp ON p.id = mp.producer_id
    LEFT JOIN movies m ON mp.movie_id = m.id
    WHERE m.title = "Armageddon";
	`);
  console.log(JSON.stringify(testSql2, null, 2));
  const awards = (await db.all("SELECT * FROM movies")) as Award[];
  return awards.map((award) => ({
    followingWin: award.year,
  }));
}

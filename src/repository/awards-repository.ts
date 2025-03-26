import getDBConnection from "../db/sqlite-connection";

export type ProducerAwardInterval = {
  producer_name: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

export async function getMaxAwardInterval(): Promise<ProducerAwardInterval[]> {
  const db = await getDBConnection();
  const results = (await db.all(`
    WITH winner_producer_years AS (
      SELECT p.id, p.name AS producer_name, m.id, m.title AS movie_title, m.year, m.winner
      FROM producers p
      LEFT JOIN producer_movies mp ON p.id = mp.producer_id
      LEFT JOIN movies m ON mp.movie_id = m.id
      WHERE m.winner = True
    ),
    award_differences AS (
        SELECT 
            a.id,
            a.producer_name,
            a.year,
            b.year AS previous_award_year
        FROM winner_producer_years a
        LEFT JOIN winner_producer_years b
        ON a.id = b.id AND a.year > b.year
				WHERE b.year IS NOT NULL
    )
    SELECT producer_name,
           MAX(year - previous_award_year) AS interval,
           year AS followingWin,
           previous_award_year AS previousWin
    FROM award_differences
    GROUP BY producer_name
    HAVING interval = (
        SELECT MAX(year - previous_award_year)
        FROM award_differences
    )
    ORDER BY interval DESC;

  `)) as ProducerAwardInterval[];
  return results;
}

export async function getMinAwardInterval(): Promise<ProducerAwardInterval[]> {
  const db = await getDBConnection();
  const results = (await db.all(`
    WITH winner_producer_years AS (
      SELECT p.id, p.name AS producer_name, m.id, m.title AS movie_title, m.year, m.winner
      FROM producers p
      LEFT JOIN producer_movies mp ON p.id = mp.producer_id
      LEFT JOIN movies m ON mp.movie_id = m.id
      WHERE m.winner = True
    ),
    award_differences AS (
        SELECT 
            a.id,
            a.producer_name,
            a.year,
            b.year AS previous_award_year
        FROM winner_producer_years a
        LEFT JOIN winner_producer_years b
        ON a.id = b.id AND a.year > b.year
				WHERE b.year IS NOT NULL
    )
    SELECT producer_name,
           MIN(year - previous_award_year) AS interval,
           year AS followingWin,
           previous_award_year AS previousWin
    FROM award_differences
    GROUP BY producer_name
    HAVING interval = (
        SELECT MIN(year - previous_award_year)
        FROM award_differences
    )
    ORDER BY interval DESC;

  `)) as ProducerAwardInterval[];
  return results;
}

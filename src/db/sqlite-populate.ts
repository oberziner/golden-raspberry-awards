import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import { Database } from "sqlite";

function loadMovieList() {
  const movieListCSV = readFileSync("movielist.csv", {
    encoding: "utf8",
    flag: "r",
  });
  return movieListCSV
    .split("\n")
    .filter((line) => line.length > 0);
}

async function insertMovie(
  db: Database,
  year: string,
  title: string,
  studios: string,
  winner: string,
) {
  const movieId = randomUUID();
  await db.run("INSERT INTO movies VALUES (?, ?, ?, ?, ?)", [
    movieId,
    year,
    title,
    studios,
    winner === "yes",
  ]);
  return movieId;
}

async function insertProducers(
  db: Database,
  movieId: string,
  producers: string,
) {
  const producerList = producers
    .split(/ and |,/)
    .filter((p) => p.length > 0)
    .map((p) => p.trim());

  for (const producer of producerList) {
    const producerRow = await db.get(
      "INSERT INTO producers VALUES (?, ?) ON CONFLICT(name) DO UPDATE SET name = EXCLUDED.name RETURNING *",
      [randomUUID(), producer],
    );
    await db.run("INSERT INTO producer_movies VALUES (?, ?)", [
      movieId,
      producerRow.id,
    ]);
  }
}

export async function seedDatabase(db: Database) {
  const movieList = loadMovieList();
  for (const line of movieList) {
    const [year, title, studios, producers, winner] = line.split(";");

    const movieId = await insertMovie(db, year, title, studios, winner);
    await insertProducers(db, movieId, producers);
  }

  return db;
}

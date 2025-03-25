import { randomUUID } from "crypto";
import { Database } from "sqlite";

const moviesCreateTable = `CREATE TABLE movies (
    id VARCHAR(36) PRIMARY KEY,
    year INT,
    title VARCHAR(255),
    studios VARCHAR(255),
    winner BOOLEAN
);`;

const producersCreateTable = `CREATE TABLE producers (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255)
);`;

const producerMoviesCreateTable = `CREATE TABLE producer_movies (
    movie_id VARCHAR(36),
    producer_id VARCHAR(36),
    PRIMARY KEY (movie_id, producer_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id)
);`;

async function migrateDatabase(db: Database) {
  await db.run(moviesCreateTable);
  await db.run(producersCreateTable);
  await db.run(producerMoviesCreateTable);
  return db;
}

async function seedDatabase(db: Database) {
  const movieParams = [randomUUID(), 2002, "Title", "Studios", true];
  await db.run("INSERT INTO movies values (?, ?, ?, ?, ?)", movieParams);

  const producerParams = [randomUUID(), "Producer Name"];
  await db.run("INSERT INTO producers values (?, ?)", producerParams);

  const producerMovieParams = [movieParams[0], producerParams[0]];
  await db.run(
    "INSERT INTO producer_movies values (?, ?)",
    producerMovieParams,
  );
}

export async function populateDatabase(db: Database) {
  console.log("Initializing database");
  await migrateDatabase(db);
  await seedDatabase(db);
  console.log("Database initialized");
}

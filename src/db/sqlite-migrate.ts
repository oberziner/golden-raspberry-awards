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
    name VARCHAR(255) NOT NULL UNIQUE
);`;

const producerMoviesCreateTable = `CREATE TABLE producer_movies (
    movie_id VARCHAR(36),
    producer_id VARCHAR(36),
    PRIMARY KEY (movie_id, producer_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (producer_id) REFERENCES producers(id)
);`;

export async function migrateDatabase(db: Database) {
  await db.run("PRAGMA foreign_keys = ON");
  await db.run(moviesCreateTable);
  await db.run(producersCreateTable);
  await db.run(producerMoviesCreateTable);
  return db;
}

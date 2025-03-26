import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import { seedDatabase } from "./sqlite-populate";
import { migrateDatabase } from "./sqlite-migrate";

let memoryDatabase: Database | null = null;

async function populateDatabase(db: Database) {
  console.log("Initializing database");
  await migrateDatabase(db);
  await seedDatabase(db);
  console.log("Database initialized");
}

async function getDBConnection() {
  if (memoryDatabase !== null) {
    return memoryDatabase;
  }
  const db = await open({
    filename: ":memory:",
    driver: sqlite3.Database,
  });
  await populateDatabase(db);
  memoryDatabase = db;

  return db;
}

export default getDBConnection;

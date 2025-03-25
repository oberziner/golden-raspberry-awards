import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import { populateDatabase } from "./sqlite-populate";

let memoryDatabase: Database | null = null;

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

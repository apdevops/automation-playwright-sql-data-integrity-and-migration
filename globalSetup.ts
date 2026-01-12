import { waitForDb } from "./src/db/dbClient";
import { runMigrations } from "./src/db/migrationRunner";

export default async function globalSetup() {
  console.log("Waiting for database...");
  await waitForDb();

  console.log("Running migrations...");
  await runMigrations();

  console.log("Database ready for tests");
}

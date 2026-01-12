import * as fs from "fs";
import * as path from "path";
import { pool } from "./dbClient";

const MIGRATIONS_DIR = "src/sql/migrations";

export async function runMigrations(): Promise<void> {
  const migrationsPath = path.resolve(process.cwd(), MIGRATIONS_DIR);

  const files = fs
    .readdirSync(migrationsPath)
    .filter(file => file.endsWith(".sql"))
    .sort(); // ENFORCES ORDER: 001_, 002_, ...

  for (const file of files) {
    const fullPath = path.join(migrationsPath, file);
    const sql = fs.readFileSync(fullPath, "utf-8");

    console.log(`Applying migration: ${file}`);
    await pool.query(sql);
  }
}

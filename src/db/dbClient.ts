import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

export async function waitForDb(
  retries = 10,
  delayMs = 2000
): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query("SELECT 1");
      return;
    } catch {
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
  throw new Error("Database not ready after retries");
}

export { pool };

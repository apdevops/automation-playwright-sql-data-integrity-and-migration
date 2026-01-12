import { pool } from "./dbClient";

export async function withTransaction<T>(fn: (client: any) => Promise<T>) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("ROLLBACK");
    return result;
  } finally {
    client.release();
  }
}

import { test, expect } from "@playwright/test";
import { pool } from "../src/db/dbClient";

type ColumnRow = {
  email: string;
};

test("users table should exist with correct columns", async () => {
  const result = await pool.query<ColumnRow>(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'users'
  `);

  const columns = result.rows.map(r => r.column_name);

  expect(columns).toContain("email");
  expect(columns).toContain("created_at");
});

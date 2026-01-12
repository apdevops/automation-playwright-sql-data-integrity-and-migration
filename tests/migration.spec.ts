import { test, expect } from "@playwright/test";
import { pool } from "../src/db/dbClient";
import { loadSql } from "../src/utils/sqlRunner";

test("migration should apply cleanly", async () => {
  const exists = await pool.query(`
    SELECT to_regclass('public.users') IS NOT NULL AS exists
  `);

  expect(exists.rows[0].exists).toBe(true);
});

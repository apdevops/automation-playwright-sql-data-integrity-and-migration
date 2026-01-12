import { test, expect } from "@playwright/test";
import { withTransaction } from "../src/db/transaction";

test("insert user should persist within transaction", async () => {
  await withTransaction(async (client) => {
    await client.query(
      "INSERT INTO users (email) VALUES ($1)",
      ["test@example.com"]
    );

    const res = await client.query("SELECT count(*) FROM users");
    expect(Number(res.rows[0].count)).toBe(1);
  });
});

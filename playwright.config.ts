import * as dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "@playwright/test";

export default defineConfig({
  globalSetup: "./globalSetup.ts",
  testDir: "./tests",
  timeout: 30000,
  reporter: [["html"], ["list"]],
  use: {
    trace: "on-first-retry"
  }
});

import * as fs from "fs";
import * as path from "path";

/**
 * Loads a SQL file from disk and returns its contents as a string.
 * Fails fast if the file cannot be found or read.
 */
export function loadSql(filePath: string): string {
  const absolutePath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`SQL file not found: ${absolutePath}`);
  }

  return fs.readFileSync(absolutePath, { encoding: "utf-8" });
}

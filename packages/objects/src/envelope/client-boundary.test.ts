import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("Next.js client boundary packaging", () => {
  it("marks both distributable JS entrypoints as client modules", () => {
    for (const file of ["dist/index.js", "dist/index.cjs"]) {
      const content = readFileSync(file, "utf8");
      expect(content.trimStart().startsWith('"use client"')).toBe(true);
    }
  });
});

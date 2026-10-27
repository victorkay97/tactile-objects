import { readFileSync, writeFileSync, copyFileSync } from "node:fs";

for (const output of ["dist/index.js", "dist/index.cjs"]) {
  const compiled = readFileSync(output, "utf8");
  if (!compiled.trimStart().startsWith('"use client"')) {
    writeFileSync(output, '"use client";\n' + compiled);
  }
}
copyFileSync("src/styles.css", "dist/styles.css");

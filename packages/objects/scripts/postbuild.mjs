import { readFileSync, writeFileSync } from "node:fs";

for (const output of ["dist/index.js", "dist/index.cjs"]) {
  const compiled = readFileSync(output, "utf8");
  if (!compiled.trimStart().startsWith('"use client"')) {
    writeFileSync(output, '"use client";\n' + compiled);
  }
}
writeFileSync("dist/styles.css", readFileSync("src/styles.css", "utf8") + "\n" + readFileSync("src/new-objects.css", "utf8"));

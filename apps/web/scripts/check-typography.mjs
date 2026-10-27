import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
for (const token of ["archivo", "geist", "mono"]) {
  assert(!css.includes("var(--" + token + ")"), "Invalid font alias: --" + token);
}
for (const name of ["font-archivo", "font-geist", "font-geist-mono"]) {
  assert(css.includes("var(--" + name), "CSS does not use registered font: " + name);
  assert(layout.includes("variable: \"--" + name + "\""), "Next.js is not registering: " + name);
}
assert(home.includes("homeCodeExample"), "The homepage code sample must use a preserved multiline string");
assert(home.includes("<pre><code>{homeCodeExample}</code></pre>"), "The homepage code sample must preserve actual line breaks");
console.log("Typography tokens and code sample guard passed.");

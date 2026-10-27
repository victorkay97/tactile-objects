/**
 * No-browser startup behavior tests for the inline pre-paint theme script.
 * The script is intentionally dependency-free so theme choice happens before
 * React hydration; these tests execute the actual script in an isolated VM.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const src = readFileSync(new URL("../lib/theme-script.ts", import.meta.url), "utf8");
const match = src.match(/export const themeInitScript = `([\s\S]*?)`;/);
assert(match, "Unable to locate the production pre-paint theme initialization script");
const initializer = match[1];

function startup(saved, prefersDark, storageUnavailable = false) {
  const attributes = {};
  const root = {
    style: {},
    setAttribute(name, value) { attributes[name] = value; },
  };
  runInNewContext(initializer, {
    localStorage: {
      getItem(name) {
        assert.equal(name, "tactile-objects:theme");
        if (storageUnavailable) throw new Error("Storage disabled");
        return saved;
      },
    },
    matchMedia(query) {
      assert.equal(query, "(prefers-color-scheme: dark)");
      return { matches: prefersDark };
    },
    document: { documentElement: root },
  });
  return { resolved: attributes["data-theme"], preference: attributes["data-theme-preference"], scheme: root.style.colorScheme };
}

assert.deepEqual(startup("light", true), { resolved: "light", preference: "light", scheme: "light" });
assert.deepEqual(startup("dark", false), { resolved: "dark", preference: "dark", scheme: "dark" });
assert.deepEqual(startup("system", false), { resolved: "light", preference: "system", scheme: "light" });
assert.deepEqual(startup("system", true), { resolved: "dark", preference: "system", scheme: "dark" });
assert.deepEqual(startup(null, true), { resolved: "dark", preference: "system", scheme: "dark" });
assert.deepEqual(startup("invalid", false), { resolved: "light", preference: "system", scheme: "light" });
assert.deepEqual(startup(null, true, true), { resolved: "dark", preference: "system", scheme: "dark" });
console.log("Theme startup behavior passed (explicit, system, invalid and storage-unavailable preferences).");

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

// These timing guards make the envelope's physical sequence explicit.
// Appearance still requires visual and interaction QA in a real browser.
const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

function rule(selector: string) {
  const start = styles.indexOf(selector + " {");
  expect(start, `Missing CSS selector ${selector}`).toBeGreaterThanOrEqual(0);
  const bodyStart = styles.indexOf("{", start) + 1;
  return styles.slice(bodyStart, styles.indexOf("}", bodyStart));
}

describe("Envelope physical motion sequence", () => {
  it("keeps the letter physically behind the front pocket", () => {
    expect(rule(".to-envelope__paper")).toMatch(/z-index:\s*3/);
    expect(rule(".to-envelope[data-state=\"open\"] .to-envelope__paper")).toMatch(/z-index:\s*3/);
    expect(rule(".to-envelope__pocket")).toMatch(/z-index:\s*4/);
  });

  it("opens the flap before the paper extracts", () => {
    const flap = rule('.to-envelope[data-state="open"] .to-envelope__flap');
    const letter = rule('.to-envelope[data-state="open"] .to-envelope__paper');
    expect(flap).toContain("590ms");
    expect(letter).toContain("640ms");
    expect(letter).toContain("translateY(-156px)");
  });

  it("retracts the paper before sealing the flap", () => {
    const closedFlap = rule('.to-envelope[data-state="closed"] .to-envelope__flap');
    const closedPaper = rule(".to-envelope__paper");
    expect(closedPaper).toContain("630ms");
    expect(closedFlap).toContain("670ms");
  });

  it("offers an instant state change for reduced-motion users", () => {
    const reduced = styles.slice(styles.lastIndexOf("@media (prefers-reduced-motion: reduce)"));
    expect(reduced).toContain(".to-envelope__paper,.to-envelope__flap");
    expect(reduced).toContain("transition: none !important");
  });
});

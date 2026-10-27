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
assert(home.includes("const example = ["), "The homepage code sample must use a preserved multiline string");
assert(home.includes("<pre><code>{example}</code></pre>"), "The homepage code sample must preserve actual line breaks");
const landingCSS = readFileSync(new URL("../app/landing.css", import.meta.url), "utf8");
assert(home.includes('className="landing-hero"'), "Homepage is missing its hero");
assert(!home.includes("EnvelopeStage"), "Hero must not depend on a single component illustration");
assert(landingCSS.includes("text-align: center"), "Homepage must retain its centered hero layout");
assert(landingCSS.includes("var(--font-archivo"), "Homepage headings must use registered Archivo");
assert(home.includes("ArrowUpRightIcon") && home.includes("GithubIcon"), "Use the MingCute icon system for actions");
const sharedCSS = readFileSync(new URL("../app/platform.css", import.meta.url), "utf8");
assert(/body\s*\{\s*--site-display:\s*var\(--font-archivo/.test(sharedCSS), "Shared font aliases must be evaluated on body where Next.js font classes are installed");
assert(landingCSS.includes("min-height: calc(100svh - var(--site-header-height"), "Hero should fill available viewport");
const header = readFileSync(new URL("../components/site-header.tsx", import.meta.url), "utf8");
assert(header.includes('href="/docs"'), "Documentation must be in shared navigation");
const catalog = readFileSync(new URL("../app/components/page.tsx", import.meta.url), "utf8");
assert(catalog.includes("<ObjectCard"), "Catalog must reuse the shared object card");
assert(home.includes("<ObjectCard"), "Homepage must reuse the shared object card");
for(const path of ["../app/docs/page.tsx","../app/docs/getting-started/page.tsx","../app/docs/accessibility/page.tsx","../app/docs/design-principles/page.tsx"]){
  assert(readFileSync(new URL(path, import.meta.url), "utf8").length > 100, "Missing documentation content: " + path);
}
const heroScene = readFileSync(new URL("../components/hero-playground.tsx", import.meta.url), "utf8");
const heroStyles = readFileSync(new URL("../app/hero-playground.css", import.meta.url), "utf8");
const reveal = readFileSync(new URL("../components/reveal-on-scroll.tsx", import.meta.url), "utf8");
assert(home.includes("<HeroPlayground />"), "Hero is missing its interactive paper playground");
assert(!home.includes("AmbientPaperScene"), "Remove the autoplay paper plane scene");
assert(!landingCSS.includes("@keyframes to-paper-flight"), "No continuously flying plane should remain");
assert(heroScene.startsWith('"use client"'), "Draggable papers must be interactive client components");
for (const event of ["onPointerDown", "onPointerMove", "onPointerUp", "onPointerCancel", "onLostPointerCapture", "setPointerCapture"]) {
  assert(heroScene.includes(event), "Paper drag is missing " + event);
}
assert(heroStyles.includes("@keyframes hero-enter"), "Hero needs its reload entrance");
assert(heroStyles.includes("prefers-reduced-motion: reduce"), "Hero must support reduced motion");
assert(reveal.includes("IntersectionObserver") && reveal.includes("prefers-reduced-motion"), "Scroll reveals must be progressive and motion-aware");
const polish = readFileSync(new URL("../app/tactile-refinements.css", import.meta.url), "utf8");
assert(layout.includes('import "./tactile-refinements.css"'), "Sitewide interaction polish must be loaded");
assert(layout.includes("<RevealOnScroll />"), "Scroll reveals belong to the shared layout");
assert(reveal.includes("usePathname") && reveal.includes("[pathname]"), "Scroll reveals must reset for client navigation");
assert(heroScene.includes('kind === "card"') && heroScene.includes("setFlipped"), "Specimen card must be reversible");
assert(heroScene.includes("aria-pressed") && heroScene.includes("aria-label"), "Interactive specimens require accessible semantics");
assert(heroStyles.includes(".specimen__card-back") && heroStyles.includes(".specimen__memo"), "Hero specimens require complete front/back visual treatments");
assert(heroStyles.includes("@media (prefers-reduced-motion: reduce)"), "Tactile objects must respect reduced motion");
assert(polish.includes(".object-showcase__envelope-flap"), "Gallery must have object-specific interaction feedback");
assert(!home.includes("<AmbientPaperScene"), "Never reintroduce the automatic flying plane");
console.log("Typography, tactile hero, route reveals, accessible input and docs guards passed.");

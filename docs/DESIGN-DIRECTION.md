# Tactile Objects — Platform Design Direction

**Draft review · October 27, 2026**

## Platform-wide identity

The editorial style established for the homepage is now a shared design system:

- Compact Archivo headings with clear hierarchy, Geist body copy, Geist Mono metadata and code.
- Warm ivory / off-white, near-black text, calm dividers and restrained indigo.
- MingCute icons for navigation, buttons and interactive controls.
- A compact, centered landing hero that takes the available viewport below the header. It **does not** feature an envelope.
- Consistent shell across `/`, `/components`, `/about`, `/components/envelope` and `/docs/*`.
- Good whitespace without oversized headings or filler marketing sections.

## Component catalogue

`apps/web/lib/objects.ts` is the source of truth for inventory, status, and selected material palette.

`apps/web/components/object-card.tsx` renders each object consistently in the homepage gallery and catalog.

### Colour assignment

A component does *not* require a new random color. Colours come from a curated system with semantic roles: paper (warm), botanical (sage), lilac (cool photographic), butter (warm note). Future objects can reuse one of these families, adjust hue/tone purposefully, or introduce a new family through a visual design review.

Physical object materials are independent of the site brand accent. Cards should stay recognizably related as the library grows.

## Routes

- Landing `/`: hero, idea, selected objects, principles, developer teaser + documentation link, close.
- Catalog `/components`: full object index with planned/available states.
- Playground `/components/envelope`: the interactive component and its API.
- Documentation `/docs`: overview; `/docs/getting-started`, `/docs/accessibility`, `/docs/design-principles`.
- About `/about`: philosophy, values, and pathways to components and docs.

## Validation and promotion policy

Do not merge to main or promote preview to production before:

1. Build passes and all expected routes are prerendered.
2. Fonts are visually verified after build.
3. Hero occupies the available first viewport at normal desktop/mobile sizes.
4. Shared cards are consistent and responsive.
5. Navigation links work on desktop/mobile.
6. Documentation content is accurate and doesn't claim an npm release.
7. Component interactions are checked on keyboard, touch, pointer and reduced-motion settings.

The flagship Envelope remains its own quality workstream; these changes improve the surrounding product without claiming to have solved paper physics.

## Motion direction — interaction, not autoplay

The site should feel alive when it loads and respond to people without becoming a looping screensaver.

- **Hero:** a quiet, centered editorial message and just two bespoke artifacts at the outer edges—a folded memo and a reversible specimen card. No paper plane, no rotating carousel of objects, and no envelope implying the library only makes envelopes.
- **Entrance:** a one-time staggered fade/up reveal for the eyebrow, two headline lines, description, actions, and footer. Approximately 0.8s per element with staggered starts. No permanent autoplay animations.
- **Direct manipulation:** both artifacts are keyboard-focusable, draggable with pointer/touch, tilt slightly under drag, lift with a shadow, and spring back when released. The memo nudges when activated; the specimen card flips to reveal a reverse message (and can flip back). Paper gestures should never block the center CTA.
- **Gallery:** the available envelope opens its flap slightly and lifts the letter on hover/focus rather than simply lifting a rectangular card; planned objects remain clearly non-interactive.
- **Scroll:** use the shared, route-aware one-time IntersectionObserver reveals for below-the-fold sections on the homepage, catalog, About and documentation pages. Content remains present by default so no-JS and motion-reduced modes do not lose visibility.
- **Accessibility:** descriptive button labels, visible focus state, reduced-motion support, touch capture confined to the paper controls.
- **Performance:** prefer transform and opacity, pointer capture on only two small interactive elements, no physics framework needed in this iteration.

The model for this interaction comes from the restrained physical details used in the user's portfolio: a purposeful entrance, small lift while dragging, and a return to rest after release.

### Implementation

- `apps/web/components/hero-playground.tsx` — pointer and keyboard interaction.
- `apps/web/app/hero-playground.css` — material, snap-back transition, entrance and breakpoints.
- `apps/web/components/reveal-on-scroll.tsx` — shared, route-aware progressive scroll enhancement.
- `apps/web/app/tactile-refinements.css` — coherent navigation feedback, object-specific gallery responses and a small hand-drawn headline accent.

The result is a **review prototype**, not a claim of completed visual QA or a full paper-physics simulation. Run a real browser interaction test on mobile and desktop before promoting to production.

## Craftsmanship review: envelope and gallery (iteration)

- The flagship envelope keeps the paper below the front pocket throughout opening and closing; its flap clears first, then the paper extracts. Closing reverses that order. The seal stays physically connected to the flap.
- Component package CSS includes coherent material grain, fine edge shadows, subtle paper emboss and a denser wax seal.
- The homepage and catalog use the **real** `Envelope` React component as a playable preview. Its own button remains independent of the documentation links below the preview: no nested buttons/links.
- Planned objects are non-interactive material studies. The journal shows a real binding/spine and page stack; the Polaroid uses layered prints. No planned item pretends to be available.
- Hero release uses requestAnimationFrame damped spring integration (distance-dependent) rather than a fixed timing curve. Reduced-motion skips the simulation.
- Tests assert timing and layer invariants for the flagship and run in Vercel's preview build, alongside TypeScript compilation and the existing static checks.
- These are implementation and build gates. Rendered-browser QA must still examine flap shape, paper overlap, mobile tap targets, and the actual feeling of spring motion before production promotion.

## Envelope Studio — configurator milestone

Reference explored: Isocons' isometric icon editor (https://www.isocons.app/). The inspiration is a dotted preview workspace, controls that immediately affect a real asset, and an exportable result—not Isocons' dark UI or icon-specific sliders.

### Studio layout
- Dedicated **dotted canvas**, default on; toggle dots on/off without changing the component itself.
- Object-centered preview, toolbar with **open/close, reset and zoom**. Zoom changes only the camera/view.
- Inspector includes three useful presets, envelope colorway, letter paper finish, decorative wax seal, and fully editable recipient, signature, heading and message.
- **Preview / Code / Props** modes within the same workspace; copying React code serializes live settings and escapes arbitrary user text using JS string expressions.
- Code and controls refer to *real React props*, not visual-only website tricks. Additional public props added: `paper?: "ivory" | "white"` and `seal?: "wax" | "none"`.
- The library remains private to the monorepo, so no misleading public npm install or fake PNG export.
- Neutral, compact, editorial UI with MingCute icons and responsive inspector/canvas layouts.

### Verification
- Package tests cover actual visual prop wiring for paper and seal, in addition to state, layering and sequence checks.
- Static build guards confirm dotted canvas presence, functional toggle and actions, props wired into the preview, and code generation sourced from editing values.
- Browser QA still required for paper composition, mobile clipping, controls, and clipboard behavior. Never equate a successful build with visual approval.

## Approved visual reference — Envelope Studio

**Latest decision (October 27, 2026):** the preferred visual reference is the deployed studio at
`https://tactile-objects-cjuzp2ugg-vkalu2266-3185s-projects.vercel.app/components/envelope`,
from Git commit `b980a3c70aad8823f6a7cd20537b216a368ce26f`.

The user specifically rejected the later wide, compacted, grouped-editor reinterpretations. Do **not** redesign or approximate this layout.

### Required fidelity
- `apps/web/app/components/envelope/workbench.css` is restored **byte-for-byte** from the preferred reference commit.
- `apps/web/components/envelope-playground.tsx` uses the original markup and control order; the textarea alone retains an increased `maxLength={500}` rather than the reference's 160.
- The root font layout is restored to Archivo, Geist and Geist Mono as in the reference.
- The library's paper/ink material CSS is restored from the reference. Only narrow **open-state** scrolling rules remain appended to preserve access to longer note content, without altering the closed envelope appearance.
- The workbench's preview, presets, colours, dotted canvas, inspector and code/props tabs must keep the same dimensions, gaps and arrangement as the linked example.
- Do not introduce a 1,536px page-only container, a fixed 555px preview or paired controls. The original inspector deliberately has its own bounded scroll.
- Future material or content enhancements must not modify the approved studio proportions without explicit user approval.

### Release and acceptance
- The source-based visual comparison is exact for the page-level styling, but a final rendered desktop/mobile side-by-side browser check is still recommended.
- Automated tests and preview builds remain mandatory.
- Keep production and `main` unchanged until user approval.

## Website appearance — light, dark and system (October 2026)

The website has a global, accessible appearance selector in the shared header. These guidelines apply to all product pages and documentation.

- **Light** preserves the approved original layout, colour treatments and the previously approved Envelope Studio proportions.
- **Dark** is an independently art-directed deep-charcoal palette with lavender accents, not a CSS inversion filter. Surfaces, cards, controls, text, buttons, borders, documentation, dotted preview and the surrounding workshop chrome all adapt.
- **System** follows the OS `prefers-color-scheme` setting, including live device preference changes.
- The chosen preference is stored under `tactile-objects:theme` in localStorage. A small script in the root HTML head applies the resolved theme before React hydration to avoid a light/dark flash. Blocking storage must not break the selector. `storage` events sync changes between tabs.
- The popover uses MingCute Sun, Moon, Computer and Check icons. It is keyboard and pointer accessible, uses `aria-pressed` and `aria-expanded`, closes with Escape/outside click, and returns focus to the trigger on selection.
- **Object material independence:** wax, paper, envelope, journal, Polaroid and draggable stationery keep their own physical material colours when the surrounding website switches themes. The dotted `workbench__canvas` adjusts dot and background contrast but does not recolour the actual Envelope.
- The theme system is contained in `apps/web/app/themes.css` (dark selectors and shared tokens) plus `apps/web/components/theme-switcher.tsx` and `apps/web/lib/theme-script.ts`. Avoid adding per-component inversion filters.
- Avoid introducing layout changes in a theme refinement. The preferred Envelope Studio is still anchored to commit `b980a3c`.
- **Acceptance:** verify home, catalog, About, docs and Envelope Studio in both modes; keyboard operation; persistence after reload; OS changes in System mode; responsiveness at 390px; reduced-motion preference. Build guards are useful but are not a substitute for real browser QA.

This milestone deliberately does not change the public Envelope props or add new component physics. Envelope craftsmanship remains the next focused workstream after the visual theme review.

## Four-object interaction milestone — October 27, 2026

The user explicitly paused Envelope realism iterations. **Do not touch the approved Envelope Studio geometry or reopen the flagship animation workstream without a separate request.** Instead, build breadth with the same standard of craft and then return for deeper refinement.

### Homepage experience
- The old detached memo/specimen-paper hero was removed, including unused runtime sources. The hero is still centered and fills the available viewport below the navigation.
- The hero now has a subtle masked **line grid**, a restrained radial highlight, one-time type entrance and a three-object discovery shelf. Journal, Polaroid and Sticky Note are linked from tactile specimens. These are links, not fake simulated interactions.
- The collection now has four genuine live objects in large 2×2 editorial cards, instead of three unavailable placeholders. Each card renders the reusable React component with its own controls, separated from documentation navigation.
- The collection grid receives a quieter version of the grid treatment. Hover affordances are precise; motion respects reduced-motion settings and never runs an automatic flight or perpetual loop.
- Dark mode applies to the surrounding UI and the grid. **Object material palettes stay independent of the website theme.**

### New public package components
- `Journal`: hardcover tone and title, typed customizable pages, controlled and uncontrolled opening/page index, bounded navigation and keyboard arrow support. A CSS transform reveals the contents and a newly keyed leaf animates page turns. It does not auto-advance.
- `Polaroid`: frame finish, caption/date, three self-contained illustrated scenes, deliberate developing effect, reversible front/back and controlled/uncontrolled state. There are no external stock-photo dependencies, and the photograph never develops on its own.
- `StickyNote`: paper tone, controlled/uncontrolled content and pinned state, direct editing, pointer-captured movement, bounded placement, keyboard arrows and Escape centering. Pinning returns the note home. There is no autoplay or forced drag.
- All three are exported by `@tactile/objects`; their physical CSS is merged into the same `@tactile/objects/styles.css` produced by `packages/objects/scripts/postbuild.mjs`.
- Dedicated studios: `/components/journal`, `/components/polaroid` and `/components/sticky-note`, sharing Preview / Code / Props, dotted canvases, functional controls, live React code and theme-responsive chrome. The Envelope Studio remains as approved.

### Verification and release
- The **package build succeeded with 23/23 automated component tests** in the latest available Vercel build attempt, including the new object state/keyboard tests.
- That attempt stopped in the pre-existing homepage source guard, which still expected the removed side-paper hero. The guard was corrected in a subsequent commit to require the new shelf and all three studios.
- **Vercel subsequently reported `api-deployments-free-per-day` (HTTP 402).** As a result, a fresh full Next.js compile and rendered visual QA for the current complete site are still blocked. Do not claim those passed.
- The changes are on the draft development PR; `main` and production remain untouched.
- When deployment capacity returns, verify every new route, pointer/keyboard/touch behaviour, gallery click targets, responsiveness and dark mode. Review screenshots before considering the experience complete.

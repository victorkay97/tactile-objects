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

## Envelope Studio craftsmanship refinement — late October 2026

This iteration directly addresses issues found in the recorded browser review:

- **Letter typography:** Newsreader is self-hosted with Next.js on the website, while the reusable React package falls back gracefully to Georgia. The body and heading are now larger, with an editorial signature rather than default system serif text. Archivo and Geist still drive the surrounding UI.
- **Long letter handling:** real letter content remains intact. Open letter content is a labeled, keyboard-focusable scroll region; closed content is inert and removed from the tab order. The Studio shows a 160-character budget and clarifies that longer notes can scroll inside the paper. The package itself does not arbitrarily truncate arbitrary React children.
- **Desktop composition:** the Envelope Studio overrides the standard docs max-width and occupies a larger stage with a slimmer docs sidebar.
- **Inspector:** no nested scroll area; users scroll the page naturally. Controls receive more legible type sizes, whitespace, and grouping.
- **Contextual previews:** editing content or paper finish reveals the open letter; toggling the wax seal returns to the closed flap, where the change is visible.
- **Material details:** denser paper grain, subtle creases, folds, pocket seams and wax depth without adding unmotivated decoration.
- **Regression gates:** source checks cover letter font registration, overflow handling, and inspector height; component tests cover focus/semantics and preservation of longer React children.

Do not publish to production or merge the draft PR until rendered desktop/mobile QA confirms that lettering fits, focus/scroll interactions work, and the wider layout is balanced. The test environment cannot certify the visual quality of paper folds.

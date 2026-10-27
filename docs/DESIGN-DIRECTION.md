# Visual direction — Tactile Objects

**Status:** Implementation candidate, pending local browser and interaction review.

## Positioning
A digital workshop: expressive, tactile, visually rich. Still useful and precise for React developers.

We are not copying the visuals of shadcn/ui or React Bits. Instead, we borrow their discipline around readable component documentation and working live previews.

## Key decision: separate product from documentation

- `/` is a landing experience. Large, expressive Archivo headlines; signature purple, coral and mint; a hero envelope you can interact with; collection highlights; philosophy; one small technical teaser and CTA. **No prop tables, color swatches or tabbed code editor here.**
- `/components` is the collection catalog. Objects can be browsed; incomplete components are marked as planned.
- `/components/envelope` is the production-minded component playground with Preview / Code / Props, variants, typed API and source links.
- `/about` documents the motivation and philosophy.

## Type
- Archivo: impact headlines and selected section headings.
- Geist: copy, navigation and controls.
- Geist Mono: metadata, code and tiny functional labels.

Body type and controls must be comfortably readable; micro-labels are supplementary.

## Colours
- Off-white #fffefa for warmth and breathing room.
- Near-black #1d1b28 for text.
- Electric indigo #635bff as the product signature.
- Coral #ff816b for playful warmth.
- Pale mint #d8f3e8 as a supportive accent.
- Object materials retain their own believable natural colours.

## Motion
Large site elements should mostly remain still. The interactivity lives in the objects. Avoid distracting scroll effects that compete with component motion. Respect reduced-motion preferences.

## Envelope iteration
The new CSS positions the closed paper behind the pocket rather than below it, keeps the seal attached to the folding flap, and stages the letter after flap rotation. The envelope is still a stylized physical metaphor and needs frame-by-frame browser QA.

## Review
- Test at 1440px, 1024px, 768px, 390px and 320px.
- Inspect clipping, focus rings, letter movement, reduced motion, and contrast.
- Run `corepack pnpm test`, `corepack pnpm typecheck`, `corepack pnpm build`.
- Verify browser source/code clipboard and all navigation routes.
- Do not deploy or merge to main until reviewed and approved.

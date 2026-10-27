# Tactile Objects — Design Direction

**Landing page revision · October 2026.** Preview-only until visual approval.

## Editorial direction

A creative, premium React library should feel intentional and confident without shouting. We are using the user's portfolio sensibilities and the structural discipline of polished component-library sites, not copying either.

- The **homepage hero is centered and text-led**. There is **no envelope, mockup or illustration in the hero**. The library is larger than its first component.
- Typography is quieter: Archivo for compact-but-confident headlines, Geist for navigation and body copy, Geist Mono for functional metadata and code.
- Use colour sparingly: near-black, warm ivory and cool gray dominate; signature indigo is an accent, not a wall-to-wall purple banner.
- More intentional whitespace, hairline dividers and strong alignment.
- Avoid filler, oversized section banners, generic three-card feature templates, and decorative marquee strips.
- All functional icons come from MingCute Core Regular. No Unicode arrows on actions.
- The collection is below the hero. One live object and upcoming objects are labeled honestly.
- The developer example is preformatted code. The homepage remains marketing/editorial content; the real playground stays at `/components/envelope`.
- Minimal closing invitation; no unnecessary hero illustration.

## Interaction guidelines

- Retain subtle hover feedback for links, buttons and gallery cards.
- Keep functionality for touch, keyboard and reduced-motion.
- No fake interactions for components that aren't implemented.
- Respect the user-approved decision to refine the flagship Envelope separately after the website is acceptable.

## Acceptance checklist

- View homepage at desktop, tablet and 390px mobile.
- Verify text sizing, font loading, wrapping, spacing and contrast, particularly the centered hero.
- Verify the hero has zero component graphics.
- Check all routes, links and MingCute icons.
- Check code example line breaks and sideways overflow.
- Run the typography/layout static guard, tests, typecheck and production build.
- **Preview only**. Do not promote the current revision to production or merge the draft PR until the user reviews it.

## Prior iteration
# Visual direction — Tactile Objects

**Status:** Implementation candidate, pending local browser and interaction review.

## Positioning
A digital workshop: expressive, tactile, visually rich. Still useful and precise for React developers.

We are not copying the visuals of shadcn/ui or React Bits. Instead, we borrow their discipline around readable component documentation and working live previews.

## Key decision: separate product from documentation

- `/` is a landing experience. Large, expressive Archivo headlines; signature purple, coral and mint; a hero envelope you can interact with; collection highlights; philosophy; one small technical teaser and CTA. **No prop tables, color swatc

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

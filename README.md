# Tactile Objects

**The internet, with feeling.** An open-source experiment in beautifully crafted, realistic interactive digital objects for React.

We build familiar objects that respond with personality, care, and useful interaction—not just decorative animations.

**Status:** early alpha. Four real React components (Envelope, Journal, Polaroid and Sticky Note) are available inside this monorepo. Nothing is published to npm. Production remains separate from development previews.

## Product routes

| Route | Purpose |
| --- | --- |
| `/` | Centered grid-backed workshop hero, subtle entrance motion and three new object discovery studies |
| `/components` | Play with all four available interactive objects |
| `/components/envelope` | Original approved envelope playground (development paused) |\n| `/components/journal` | Turn pages, edit entries and customize the hardcover |\n| `/components/polaroid` | Develop photos, flip the print and customize the moment |\n| `/components/sticky-note` | Peel, drag, pin, recolour and edit the note |
| `/about` | Philosophy and project purpose |
| `/docs` | Documentation index and component guides |
| `/docs/getting-started` | Local setup and first React component |
| `/docs/accessibility` | Accessibility expectations |
| `/docs/design-principles` | The product quality and interaction standards |

## Repository structure

- `apps/web` — Next.js 16 site, built with Archivo and Geist typography.
- `packages/objects` — framework-independent React component package.
- `docs` — roadmap, interaction quality standards, and design direction.

## Run locally

Node.js 22 or newer and Corepack are recommended.

```powershell
git clone https://github.com/victorkay97/tactile-objects.git
cd tactile-objects
git switch feat/foundation-and-envelope-prototype
corepack pnpm install
corepack pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The root scripts use `corepack pnpm` explicitly to avoid multiple installed pnpm versions on Windows.

Run individual checks:

```powershell
corepack pnpm test
corepack pnpm typecheck
corepack pnpm build
```

The documentation route is interactive; hover, click, keyboard activation and reduced-motion behavior should all be reviewed.

## Using the components

```tsx
import { Envelope } from "@tactile/objects";
import "@tactile/objects/styles.css";

<Envelope tone="sage" recipient="A curious mind">
  <h3>A little note</h3>
  <p>Something worth opening.</p>
</Envelope>
```

Other examples:

```tsx
import { Journal, Polaroid, StickyNote } from "@tactile/objects";
import "@tactile/objects/styles.css";

// Interactive by default; import once inside a client component.
<Journal tone="sage" pages={[{ title: "Hello", body: "Something worth remembering." }]} />
<Polaroid scene="sunset" caption="An afternoon to keep" />
<StickyNote tone="butter" defaultText="Keep making things." editable />
```

This package currently resolves only from the pnpm workspace. It is not yet publicly installable.

## Our quality bar

We prioritize visual fidelity, interaction fidelity, accessibility, and developer ergonomics. Four carefully made components are more valuable than forty mediocre animations.

See `docs/DESIGN-DIRECTION.md`, `docs/QUALITY.md`, and `docs/ROADMAP.md`.

MIT licensed.

## Site design and material palettes

The frontend uses shared platform styling in `apps/web/app/platform.css`, with documentation styling in `apps/web/app/docs/docs.css`.

The homepage and catalog use the same `ObjectCard` component, drawing data from `apps/web/lib/objects.ts`. Object surfaces are selected from a curated family of material palettes: paper, botanical, lilac and butter. **More objects do not require new unrelated UI colours** — reuse an established family or add one through design review.

The landing hero fills the available viewport beneath the site header. A subtle reference grid gives it visual depth, while a three-object discovery shelf links directly to Journal, Polaroid and Sticky Note. The original two floating paper decorations have been removed. All four components are playable in the shared catalog and dedicated studios.

MingCute Core Regular icons are centralized in `apps/web/components/ui/icons.ts`. Functional actions should use these rather than text arrows.

## Motion and interaction

The homepage enters with a short, one-time, staggered text reveal. Journal pages turn, Polaroid photos develop/flip, and Sticky Notes peel/pin/drag. The hero shelf is a navigation surface and never pretends to simulate physics. Animations respect reduced-motion preferences, and the page no longer runs a perpetual flying plane.
\n## Current preview restriction\n\nThe feature branch is ready for a fresh Vercel preview, but Vercel reported the free team's daily deployment limit on October 27, 2026. The newest site changes have not yet passed a complete Next.js deployment; do not treat earlier preview URLs as including the new three objects. The package build and 23 automated component tests passed in the last available deployment run.\n
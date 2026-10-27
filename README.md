# Tactile Objects

**The internet, with feeling.** An open-source experiment in beautifully crafted, realistic interactive digital objects for React.

We build familiar objects that respond with personality, care, and useful interaction—not just decorative animations.

**Status:** early alpha. One component (Envelope) is available inside this monorepo. It has **not** been published to npm or deployed.

## Product routes

| Route | Purpose |
| --- | --- |
| `/` | Expressive landing page featuring the first interactive object |
| `/components` | Browse available and planned objects |
| `/components/envelope` | Dedicated playground, colourways, code and typed API |
| `/about` | Philosophy and project purpose |

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

## Using Envelope

```tsx
import { Envelope } from "@tactile/objects";
import "@tactile/objects/styles.css";

<Envelope tone="sage" recipient="A curious mind">
  <h3>A little note</h3>
  <p>Something worth opening.</p>
</Envelope>
```

This package currently resolves only from the pnpm workspace. It is not yet publicly installable.

## Our quality bar

We prioritize visual fidelity, interaction fidelity, accessibility, and developer ergonomics. Three excellent components are more valuable than thirty mediocre animations.

See `docs/DESIGN-DIRECTION.md`, `docs/QUALITY.md`, and `docs/ROADMAP.md`.

MIT licensed.

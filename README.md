# Tactile Objects

**Interfaces you can feel.** A growing collection of tactile, interactive digital objects for React.

We build familiar objects with intentional motion, detailed materials, and a small, typed integration surface. This is an experimental, open-source project in active development.

**Status:** v0.1 prototype — not published to npm or deployed. The first component is Envelope.

## Repository

- `packages/objects` — reusable React + TypeScript component package, independent of Next.js.
- `apps/web` — Next.js library website, interactive preview and documentation.
- `docs` — design direction, roadmap and quality standards.

## Local development

Requires Node.js 22+ and Corepack.

```powershell
git clone https://github.com/victorkay97/tactile-objects.git
cd tactile-objects
corepack pnpm install
corepack pnpm dev
```

If working from the open feature branch, switch to `feat/foundation-and-envelope-prototype` before installation.

Open http://localhost:3000.

The root script uses `corepack pnpm` explicitly to prevent a Windows PATH pnpm-version mismatch. If running the package and website separately:

```powershell
corepack pnpm --filter @tactile/objects build
corepack pnpm --filter @tactile/web dev
```

## Tests

```powershell
corepack pnpm test
corepack pnpm typecheck
corepack pnpm build
```

## Envelope API

```tsx
import { Envelope } from "@tactile/objects";
import "@tactile/objects/styles.css";

<Envelope recipient="A curious mind" tone="sage">
  <h3>A little note</h3>
  <p>Something worth opening.</p>
</Envelope>
```

The package currently resolves through the pnpm workspace. The public npm release will follow accessibility, visual and integration review.

## Principles

Real interaction · intentional motion · useful defaults · accessible controls · honest documentation.

See `docs/DESIGN-DIRECTION.md`, `docs/QUALITY.md`, and `docs/ROADMAP.md`.

MIT licensed.

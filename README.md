# Tactile Objects

A growing collection of realistic, interactive digital objects for React.

The goal is simple: make familiar objects on the web feel considered, tangible, and enjoyable to use. Every object should be visually convincing, accessible, customizable, and useful in a real interface.

**Status:** pre-release, first object in development. Not published to npm yet.

## What's inside

- packages/objects — framework-independent React components.
- apps/web — a Next.js showcase and interactive playground.
- docs/ — the product roadmap and quality standards.

## Getting started

Requires Node.js 22+, pnpm 10+.

    corepack enable
    pnpm install
    pnpm dev

Then open http://localhost:3000.

The dev command builds the objects package once before starting the showcase. After changing the library source, run:

    pnpm --filter @tactile/objects build

In a new terminal, run the site again to pick up changes.

## Using the envelope

In this monorepo, import the component and its stylesheet:

    import { Envelope } from "@tactile/objects";
    import "@tactile/objects/styles.css";

    <Envelope recipient="You" tone="rose">
      <p>Something worth opening.</p>
    </Envelope>

The package is local-only for now. Publishing to npm will happen after visual, interaction, accessibility, and packaging review.

## Commands

- pnpm dev — build the package and run the website.
- pnpm build — build the package and the website.
- pnpm typecheck — typecheck every workspace package.
- pnpm test — run component tests.

## Philosophy

This isn't a collection of generic UI primitives. It's a collection of distinct digital objects, built with careful layering, motion, input feedback, and strong developer ergonomics.

See docs/QUALITY.md and docs/ROADMAP.md.

MIT licensed. Contributions are welcome after the initial API stabilizes.

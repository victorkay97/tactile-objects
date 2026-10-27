# Icon system

We use the official **MingCute Core Regular** React icons for interface controls.

- Package: `@mingcute/react@3.0.2` (Apache-2.0)
- Import surface: `apps/web/components/ui/icons.ts`, which centralizes names and consistent variants.
- Design intent: actionable buttons, navigation, source links, copy/reset interactions, and documentation navigation must use icons rather than textual arrows or placeholder glyphs.
- Do not scatter Unicode arrows such as `↗` and `↺` in functional controls.
- Default actions: 15–18px icons beside labels, aria-hidden when text names the action. Icon-only controls require accessible labels.
- Decorative symbolic typography is acceptable when clearly decorative, but prefer genuine imagery and branded vector artwork.

The *objects themselves* are custom illustrations or geometry, not a pile of icons.

Install workspace dependencies after pulling changes:

```powershell
corepack pnpm install
```

React exports verified against the official MingCute Core Regular icon metadata.

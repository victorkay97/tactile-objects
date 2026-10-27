# Design direction — V0.2

We are developing a component library, not a decorative portfolio landing page.

## References and lessons
- shadcn/ui: disciplined type, hierarchy, simple navigation and previews immediately accessible.
- React Bits: component-focused interaction pages with previews and inspectable code.
- Motion Primitives: make motion discoverable, configurable and genuinely useful.

These references inform interaction and presentation patterns; Tactile Objects should not imitate their branding.

## Decisions
- Neutral, high-contrast developer interface with thin borders, restrained radii and readable type.
- Hero communicates the concept; product takes over immediately afterward.
- Real documentation surfaces: component navigation, Preview / Code / Props, color controls, source link and copyable usage.
- No fictitious download counts, testimonials or published npm commands.
- Planned objects are explicitly labelled planned.
- Component demo panel uses a neutral dotted canvas, avoiding decorative website treatments that compete with the object.
- Dark about section adds contrast at the end of the page, not across the component workspace.

## Envelope
- Paper starts within the envelope, not sticking out beneath it.
- Flap retains its wax seal during the fold.
- Paper extracts after flap movement begins; closing happens in reverse order.
- Motion reverses cleanly; keyboard/touch/reduced motion are preserved.
- This is a better prototype, not yet a physically accurate envelope or full draggable-letter interaction.

## Release gates
Run install, unit tests, typecheck and Next.js production build. Review desktop/mobile recordings, particularly paper readability and layering in open and closed states. Do not deploy until the user approves the visual and interaction quality.

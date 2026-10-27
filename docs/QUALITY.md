# Object quality contract

A Tactile Object is a functioning interface, not an animation GIF.

## Visual fidelity
- Geometry, perspective, stacking, light and occlusion tell a consistent story.
- Assets are authored or used under suitable licenses.
- The component works at responsive sizes without clipping or unreadable content.

## Interaction fidelity
- Pointer, keyboard and touch interactions are deliberate.
- Motion has continuity; reversed transitions do not jump.
- Reduced-motion preferences are respected.
- A decorative affordance never blocks a functional control.

## Developer experience
- Typed properties; controlled and uncontrolled state when appropriate.
- Useful defaults, overridable styling, and no dependency on Next.js.
- Peer React dependency; heavy 3D libraries only where needed.
- Test critical state changes and report limitations honestly.

## Release gate
A component is release-ready only after visual QA across breakpoints, accessibility checks, keyboard and touch testing, build tests in a consumer app and documentation. The envelope in M0 is a prototype, not a promise of physically accurate simulation.

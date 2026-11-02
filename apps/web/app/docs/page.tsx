import Link from "next/link";

export const metadata = {title: "Introduction", description: "An introduction to Tactile Objects, a library of interactive React objects."};

export default function DocsHome() {
 return <main className="docs-article ref-doc-intro">
   <h1>Introduction</h1>
   <p>Tactile Objects is an open-source collection of interactive digital objects for React. Each one is inspired by something familiar: an envelope, a journal, a photograph, or a sticky note.</p>
   <section><h2>What is this?</h2>
     <p>We're exploring what interfaces feel like when everyday objects behave as you'd expect. Rather than playing a video of an envelope opening, you can open it yourself. Rather than looking at a notebook illustration, you can turn the pages.</p>
     <p>The objects are actual, reusable React components. Their state, appearance, and content can be configured through typed props. Every component has a working playground and a code example.</p>
   </section>
   <section><h2>Four objects to explore</h2>
     <p><Link href="/components/envelope">Envelope</Link> opens a letter. <Link href="/components/journal">Journal</Link> turns the pages. <Link href="/components/polaroid">Polaroid</Link> develops and flips a photograph. <Link href="/components/sticky-note">Sticky Note</Link> peels, moves, and accepts text.</p>
   </section>
   <section><h2>React and TypeScript</h2>
     <p>The collection is built with React and TypeScript. Each component exposes a small API for its interaction and materials. Components are independent, so you can choose only what fits your design.</p>
   </section>
   <section><h2>About installation</h2>
     <p>This library is in early alpha. The source is available in our repository's pnpm workspace, but a public npm release is not available yet. <Link href="/docs/getting-started">Read the getting-started guide</Link> to run the workspace locally.</p>
   </section>
   <section><h2>Accessibility</h2>
     <p>Keyboard access, meaningful labels, and reduced-motion behavior are part of the component work. Check the <Link href="/docs/accessibility">accessibility guide</Link> for details and current limitations.</p>
   </section>
   <section><h2>You own your experience</h2>
     <p>The goal is to make the web feel more considered without making it harder to use. Start with a component, change the details, and build an interaction that serves your content.</p>
   </section>
   <div className="docs-site__next"><Link href="/docs/getting-started">Next: Getting started →</Link></div>
 </main>;
}

import Link from "next/link";
import { EnvelopePlayground } from "../../../components/envelope-playground";

export const metadata = {
  title: "Envelope — Interactive React Object",
  description: "Explore the interactive envelope, customize its material, view its API and copy React code.",
};

export default function EnvelopePage() {
  return (
    <main className="docs-page">
      <div className="layout-container docs-layout">
        <aside className="docs-sidebar" aria-label="Component navigation">
          <Link className="docs-sidebar-back" href="/components">← All components</Link>
          <div className="docs-sidebar-label">OBJECTS <span>04</span></div>
          <Link href="/components/envelope" aria-current="page" className="docs-sidebar-item active"><span>✉</span> Envelope <i>01</i></Link>
          <div className="docs-sidebar-item disabled"><span>▤</span> Journal <small>SOON</small></div>
          <div className="docs-sidebar-item disabled"><span>▧</span> Sticky Note <small>SOON</small></div>
          <div className="docs-sidebar-item disabled"><span>▣</span> Polaroid <small>SOON</small></div>
          <div className="docs-sidebar-divider" />
          <div className="docs-sidebar-label">ON THIS PAGE</div>
          <a className="docs-sidebar-link" href="#playground">Playground</a>
          <a className="docs-sidebar-link" href="#usage">Using the component</a>
          <a className="docs-sidebar-link" href="#philosophy">Design notes</a>
          <div className="docs-sidebar-footer">MORE THAN A UI KIT. <span>✳</span></div>
        </aside>
        <div className="docs-main">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/components">Components</Link><span>/</span><b>Envelope</b></nav>
          <div className="docs-heading" id="playground"><div><span className="section-label">OBJECT 001 / PAPER</span><h1>The Envelope<span>.</span></h1><p>A little note worth opening. An interactive paper object with a folding flap, emerging letter, and material colourways.</p></div><a className="docs-source-link" href="https://github.com/victorkay97/tactile-objects/blob/feat/foundation-and-envelope-prototype/packages/objects/src/envelope/Envelope.tsx" target="_blank" rel="noopener noreferrer">View source ↗</a></div>
          <EnvelopePlayground />
          <section className="docs-design-notes" id="philosophy"><span className="section-label">DESIGN NOTES</span><h2>Deliberately tactile.</h2><div className="docs-design-grid"><div><h3>Physical layers</h3><p>The envelope uses overlapping surfaces, a folding flap and a paper note to suggest depth.</p></div><div><h3>Thoughtful interaction</h3><p>Mouse, touch and keyboard can open and close the note. Reduced-motion preferences are respected.</p></div></div></section>
          <div className="docs-bottom-nav"><Link href="/components">← All objects</Link><Link href="/about">Our philosophy ↗</Link></div>
        </div>
      </div>
    </main>
  );
}

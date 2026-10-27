import "./workbench.css";
import { ArrowUpRightIcon, ArrowLeftIcon, MailIcon, BookIcon, PaperIcon, CameraIcon, SparklesIcon } from "../../../components/ui/icons";
import Link from "next/link";
import { EnvelopePlayground } from "../../../components/envelope-playground";

export const metadata = {
  title: "Envelope — Interactive React Object",
  description: "An interactive envelope studio: try the object, change real component properties, and copy React code.",
};

export default function EnvelopePage() {
  return (
    <main className="docs-page">
      <div className="layout-container docs-layout">
        <aside className="docs-sidebar" aria-label="Component navigation">
          <Link className="docs-sidebar-back" href="/components"><ArrowLeftIcon size={15} aria-hidden="true" /> All components</Link>
          <div className="docs-sidebar-label">OBJECTS <span>04</span></div>
          <Link href="/components/envelope" aria-current="page" className="docs-sidebar-item active"><span><MailIcon size={17} aria-hidden="true" /></span> Envelope <i>01</i></Link>
          <Link href="/components/journal" className="docs-sidebar-item"><span><BookIcon size={17} aria-hidden="true" /></span> Journal <small>02</small></Link>
          <Link href="/components/sticky-note" className="docs-sidebar-item"><span><PaperIcon size={17} aria-hidden="true" /></span> Sticky Note <small>04</small></Link>
          <Link href="/components/polaroid" className="docs-sidebar-item"><span><CameraIcon size={17} aria-hidden="true" /></span> Polaroid <small>03</small></Link>
          <div className="docs-sidebar-divider" />
          <div className="docs-sidebar-label">ON THIS PAGE</div>
          <a className="docs-sidebar-link" href="#playground">Playground</a>
          <a className="docs-sidebar-link" href="#usage">Using the component</a>
          <a className="docs-sidebar-link" href="#philosophy">Design notes</a>
          <div className="docs-sidebar-footer">MORE THAN A UI KIT. <span><SparklesIcon size={16} aria-hidden="true" /></span></div>
        </aside>
        <div className="docs-main">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/components">Components</Link><span>/</span><b>Envelope</b></nav>
          <div className="docs-heading" id="playground"><div><span className="section-label">OBJECT 001 / PAPER COLLECTION</span><h1>Envelope<span>.</span></h1><p>Open a little note. Change the paper, colour, seal and message. Every adjustment is reflected in the live React component.</p></div><a className="docs-source-link" href="https://github.com/victorkay97/tactile-objects/blob/feat/foundation-and-envelope-prototype/packages/objects/src/envelope/Envelope.tsx" target="_blank" rel="noopener noreferrer">View source <ArrowUpRightIcon size={15} aria-hidden="true" /></a></div>
          <EnvelopePlayground />
          <section className="docs-design-notes" id="philosophy"><span className="section-label">DESIGN NOTES</span><h2>Deliberately tactile.</h2><div className="docs-design-grid"><div><h3>Layered materials</h3><p>The front pocket, note, flap and wax seal are composed as separate physical layers.</p></div><div><h3>A real component</h3><p>The preview uses the same typed React component as the library. You can customize it without learning a separate editor-only API.</p></div></div></section>
          <div className="docs-bottom-nav"><Link href="/components"><ArrowLeftIcon size={16} aria-hidden="true" /> All objects</Link><Link href="/about">Our philosophy <ArrowUpRightIcon size={16} aria-hidden="true" /></Link></div>
        </div>
      </div>
    </main>
  );
}

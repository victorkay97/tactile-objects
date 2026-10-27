import { ArrowUpRightIcon, GithubIcon, SparklesIcon, CursorIcon, HandIcon, CodeIcon } from "../components/ui/icons";
import Link from "next/link";
import { EnvelopeStage } from "../components/envelope-stage";

const homeCodeExample = [
  'import { Envelope } from "@tactile/objects";',
  'import "@tactile/objects/styles.css";',
  '',
  '// Good things come in small packages.',
  'export default function Hello() {',
  '  return (',
  '    <Envelope tone="rose">',
  '      <h3>Hello, world. ♡</h3>',
  '    </Envelope>',
  '  );',
  '}',
].join("\\n");

export default function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <div className="layout-container hero-layout">
          <div className="hero-content">
            <div className="eyebrow"><span className="eyebrow-star" aria-hidden="true"><SparklesIcon size={17} /></span> OPEN SOURCE. MADE WITH FEELING.</div>
            <h1>Give the web <span className="hero-underline">something</span> to <span className="hero-emphasis">feel.</span></h1>
            <p className="hero-lede">A collection of beautifully crafted interactive objects for React. Familiar things, reimagined with personality, detail, and a little bit of magic.</p>
            <div className="hero-ctas">
              <Link href="/components" className="button button-dark">Explore components <ArrowUpRightIcon size={18} aria-hidden="true" /></Link>
              <a className="button button-outline" href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer">Star on GitHub <GithubIcon size={18} aria-hidden="true" /></a>
            </div>
            <div className="hero-bottom-note"><span className="note-spark"><SparklesIcon size={17} aria-hidden="true" /></span> REAL INTERACTIONS. NOT ANIMATED PLACEHOLDERS.</div>
          </div>
          <div className="hero-visual">
            <EnvelopeStage variant="hero" />
            <div className="visual-footline"><span><i /> LIVE INTERACTIVE OBJECT</span><span>001 / ENVELOPE</span></div>
          </div>
        </div>
      </section>

      <section className="intro-ticker" aria-label="Our approach">
        <div className="layout-container ticker-row">
          <span>FEEL THE DETAILS <b><SparklesIcon size={15} aria-hidden="true" /></b></span>
          <span>MADE FOR THE CURIOUS <b><SparklesIcon size={15} aria-hidden="true" /></b></span>
          <span>BUILT WITH REACT <b><SparklesIcon size={15} aria-hidden="true" /></b></span>
          <span>CRAFTED, NOT GENERATED</span>
        </div>
      </section>

      <section className="home-collection section-pad" id="objects">
        <div className="layout-container">
          <div className="section-heading heading-split">
            <div><span className="section-label">01 / THE COLLECTION</span><h2>Small objects.<br /><span>Big feelings.</span></h2></div>
            <div className="heading-description"><p>A growing collection of objects that do more than look good. Pick one up, open it, move it, make it yours.</p><Link className="text-arrow" href="/components">Browse the collection <ArrowUpRightIcon size={18} aria-hidden="true" /></Link></div>
          </div>

          <div className="collection-grid">
            <Link className="object-tile object-tile--envelope" href="/components/envelope">
              <div className="tile-top"><span>001 — PAPER</span><span className="live-badge"><i /> AVAILABLE TO EXPLORE</span></div>
              <div className="object-art object-art-envelope" aria-hidden="true"><span className="art-envelope"><i /><i /></span><span className="art-letter" /></div>
              <div className="tile-bottom"><div><h3>The Envelope</h3><p>A little note worth opening.</p></div><span className="tile-arrow"><ArrowUpRightIcon size={20} aria-hidden="true" /></span></div>
            </Link>
            <article className="object-tile object-tile--journal">
              <div className="tile-top"><span>002 — PAPER</span><span className="planned-badge">IN THE WORKSHOP</span></div>
              <div className="object-art object-art-journal" aria-hidden="true"><span className="art-journal"><i /></span></div>
              <div className="tile-bottom"><div><h3>The Journal</h3><p>Pages you can actually turn.</p></div><span className="tile-muted-arrow">SOON</span></div>
            </article>
            <article className="object-tile object-tile--polaroid">
              <div className="tile-top"><span>003 — MEMORIES</span><span className="planned-badge">IN THE WORKSHOP</span></div>
              <div className="object-art object-art-polaroid" aria-hidden="true"><span className="art-photo"><i /></span></div>
              <div className="tile-bottom"><div><h3>The Polaroid</h3><p>Watch a moment come to life.</p></div><span className="tile-muted-arrow">SOON</span></div>
            </article>
          </div>
        </div>
      </section>

      <section className="manifesto-section section-pad">
        <div className="layout-container">
          <div className="manifesto-intro"><span className="section-label">02 / WHY WE MAKE THESE</span><h2>Because details<br />make things <span>human.</span></h2></div>
          <div className="manifesto-grid">
            <article className="manifesto-card">
              <div className="manifesto-icon"><CursorIcon size={30} aria-hidden="true" /></div>
              <span className="feature-index">01 /</span><h3>Motion with meaning.</h3>
              <p>Every fold, bounce, and transition should feel deliberate. An interaction is a conversation, not a loading screen.</p>
            </article>
            <article className="manifesto-card manifesto-card--color">
              <div className="manifesto-icon"><SparklesIcon size={30} aria-hidden="true" /></div>
              <span className="feature-index">02 /</span><h3>Beautiful from every angle.</h3>
              <p>Material, depth, shadows, and tiny details work together to make digital objects feel familiar and surprising.</p>
            </article>
            <article className="manifesto-card">
              <div className="manifesto-icon"><CodeIcon size={30} aria-hidden="true" /></div>
              <span className="feature-index">03 /</span><h3>Made for real projects.</h3>
              <p>Thoughtful React APIs, accessible interactions, and customisable styling. Gorgeous shouldn't mean difficult.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="developer-section section-pad">
        <div className="layout-container developer-layout">
          <div className="developer-copy">
            <span className="section-label">03 / FOR THE MAKERS</span>
            <h2>Bring a little<br /><span>feeling</span> to your UI.</h2>
            <p>These aren't videos or decorative GIFs. They're real React components with working interactions, controllable state, and your content inside.</p>
            <Link href="/components/envelope" className="button button-dark">Meet your first object <ArrowUpRightIcon size={18} aria-hidden="true" /></Link>
            <span className="alpha-disclaimer">EARLY ALPHA · WORKSPACE PACKAGE · NOT YET ON NPM</span>
          </div>
          <div className="developer-code">
            <div className="code-window-top"><div className="window-dots"><i /><i /><i /></div><span>letter.tsx</span><span>REACT + TYPESCRIPT</span></div>
            <pre><code>{homeCodeExample}</code></pre>
            <div className="code-window-bottom">ONE IMPORT. A WHOLE LITTLE EXPERIENCE. <span><SparklesIcon size={18} aria-hidden="true" /></span></div>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="layout-container cta-inner"><div><span className="cta-kicker">A NEW KIND OF COMPONENT LIBRARY</span><h2>Let's make the web<br />feel <em>alive.</em></h2><p>One little object at a time. Come see what we're making.</p></div><Link href="/components" className="button button-white">Explore the collection <ArrowUpRightIcon size={18} aria-hidden="true" /></Link><div className="cta-doodle" aria-hidden="true"><SparklesIcon size={360} /></div></div>
      </section>
    </main>
  );
}

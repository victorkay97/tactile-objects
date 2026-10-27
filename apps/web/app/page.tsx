"use client";

import { useState } from "react";
import { Envelope } from "@tactile/objects";
import type { EnvelopeTone } from "@tactile/objects";

type Tab = "preview" | "code" | "props";

const variants: { id: EnvelopeTone; name: string; hex: string }[] = [
  { id: "clay", name: "Sandstone", hex: "#cda381" },
  { id: "sage", name: "Sage", hex: "#a1b29e" },
  { id: "rose", name: "Blush", hex: "#d2aaa6" },
];

const upcoming = [
  { number: "02", name: "Journal", category: "Paper", detail: "Pages worth turning.", visual: "journal" },
  { number: "03", name: "Sticky Note", category: "Paper", detail: "A note with a little personality.", visual: "note" },
  { number: "04", name: "Polaroid", category: "Objects", detail: "A moment that develops.", visual: "photo" },
];

function Icon({ name, size = 16 }: { name: "arrow" | "github" | "copy" | "check" | "reset" | "code" | "spark"; size?: number }) {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    github: <><path d="M9 19c-4.5 1.5-4.5-2.5-6-3" /><path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" /></>,
    copy: <><rect width="13" height="13" x="8" y="8" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    reset: <><path d="M3 12a9 9 0 1 0 2.65-6.35L3 8" /><path d="M3 3v5h5" /></>,
    code: <><path d="m8 17-5-5 5-5" /><path d="m16 7 5 5-5 5" /><path d="m14 4-4 16" /></>,
    spark: <><path d="m12 2 1.9 7.1L21 11l-7.1 1.9L12 20l-1.9-7.1L3 11l7.1-1.9L12 2Z" /><path d="m19 18 .6 1.4L21 20l-1.4.6L19 22l-.6-1.4L17 20l1.4-.6L19 18Z" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const props = [
  ["tone", '"clay" | "sage" | "rose"', '"clay"'],
  ["recipient", "string", '"A curious mind"'],
  ["sender", "string", '"Tactile Objects"'],
  ["open", "boolean", "undefined"],
  ["defaultOpen", "boolean", "false"],
  ["onOpenChange", "(open: boolean) => void", "—"],
  ["children", "ReactNode", "Default note"],
];

export default function HomePage() {
  const [tab, setTab] = useState<Tab>("preview");
  const [tone, setTone] = useState<EnvelopeTone>("clay");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const snippet = `import { Envelope } from "@tactile/objects";
import "@tactile/objects/styles.css";

export function Letter() {
  return (
    <Envelope
      tone="${tone}"
      recipient="A curious mind"
      sender="— Tactile Objects"
    >
      <h3>A little note, just for you.</h3>
      <p>Thoughtful objects make better interfaces.</p>
    </Envelope>
  );
}`;

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a href="#top" className="brand" aria-label="Tactile Objects home">
            <span className="brand-symbol" aria-hidden="true"><span /><span /><span /><span /></span>
            <span className="brand-word">tactile<span>objects</span><b>.</b></span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a className="nav-current" href="#library">Components</a>
            <a href="#up-next">Roadmap</a>
            <a href="#principles">About</a>
          </nav>

          <div className="topbar-actions">
            <span className="version-tag">v0.1 alpha</span>
            <a className="github-button" href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noreferrer noopener">
              <Icon name="github" size={17} />
              <span>GitHub</span>
              <Icon name="arrow" size={14} />
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero wrap" aria-labelledby="hero-heading">
          <div className="hero-overline"><span className="hero-dot" /> OPEN-SOURCE REACT COMPONENTS <span className="hero-overline-divider" /> VOL. 01</div>
          <div className="hero-columns">
            <div className="hero-head">
              <h1 id="hero-heading">Interfaces you can <span>feel.</span></h1>
            </div>
            <div className="hero-aside">
              <p>Beautifully crafted, interactive digital objects. Inspired by familiar things, designed to make the web feel a little more human.</p>
              <div className="hero-links">
                <a className="btn btn-primary" href="#library">Explore components <Icon name="arrow" size={17} /></a>
                <a className="btn btn-quiet" href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer"><Icon name="github" size={17} /> View on GitHub</a>
              </div>
            </div>
          </div>
          <div className="hero-footnote">
            <span>NOT JUST ANIMATED. INTERACTIVE BY DESIGN.</span>
            <span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>
          </div>
        </section>

        <section className="library-section" id="library">
          <div className="wrap">
            <div className="section-topline"><div><span className="section-count">01 /</span> COMPONENT LIBRARY</div><span className="section-topline-right">ONE OBJECT, BUILT WITH INTENTION</span></div>
            <div className="library-layout">
              <aside className="sidebar" aria-label="Component navigation">
                <div className="sidebar-group-title">COMPONENTS <span>04</span></div>
                <a href="#component-envelope" className="sidebar-item selected"><span className="sidebar-item-icon">✉</span><span>Envelope</span><span className="sidebar-badge">NEW</span></a>
                <div className="sidebar-item sidebar-item-disabled" aria-disabled="true"><span className="sidebar-item-icon">▣</span><span>Journal</span><span className="sidebar-coming">SOON</span></div>
                <div className="sidebar-item sidebar-item-disabled" aria-disabled="true"><span className="sidebar-item-icon">▧</span><span>Sticky Note</span><span className="sidebar-coming">SOON</span></div>
                <div className="sidebar-item sidebar-item-disabled" aria-disabled="true"><span className="sidebar-item-icon">▤</span><span>Polaroid</span><span className="sidebar-coming">SOON</span></div>
                <div className="sidebar-divider" />
                <div className="sidebar-group-title">RESOURCES</div>
                <a href="#installation" className="sidebar-resource">Getting started <span>↗</span></a>
                <a href="#principles" className="sidebar-resource">Design principles <span>↗</span></a>
                <a href="https://github.com/victorkay97/tactile-objects" className="sidebar-resource" target="_blank" rel="noopener noreferrer">Source on GitHub <span>↗</span></a>
                <div className="sidebar-foot">Made slowly. Made carefully.<br />Made to be played with.</div>
              </aside>

              <div className="component-details" id="component-envelope">
                <div className="detail-overline"><span className="live-indicator" /> INTERACTIVE OBJECT <span className="overline-slash">/</span> PAPER COLLECTION <span className="overline-slash">/</span> 001</div>
                <div className="detail-heading-row">
                  <div><h2>Envelope<span className="detail-period">.</span></h2><p>An envelope that folds open to reveal a note. Click it, close it, make it yours.</p></div>
                  <a className="source-link" href="https://github.com/victorkay97/tactile-objects/blob/feat/foundation-and-envelope-prototype/packages/objects/src/envelope/Envelope.tsx" target="_blank" rel="noopener noreferrer">Source <Icon name="arrow" size={15} /></a>
                </div>

                <div className="playground">
                  <div className="playground-header">
                    <div className="tabs" role="tablist" aria-label="Envelope documentation">
                      {(["preview","code","props"] as Tab[]).map((item) => (
                        <button
                          key={item}
                          id={`tab-${item}`}
                          className={"tab" + (tab === item ? " active" : "")}
                          role="tab"
                          aria-selected={tab === item}
                          aria-controls={`panel-${item}`}
                          type="button"
                          onClick={() => setTab(item)}
                        >
                          {item === "preview" ? "Preview" : item === "code" ? "Code" : "Props"}
                        </button>
                      ))}
                    </div>
                    <div className="playground-tag"><span /> LIVE PREVIEW</div>
                  </div>

                  {tab === "preview" && (
                    <div className="playground-stage" id="panel-preview" role="tabpanel" aria-labelledby="tab-preview">
                      <div className="canvas-label canvas-label-left">FIG. 001 — ENVELOPE</div>
                      <Envelope
                        tone={tone}
                        open={open}
                        onOpenChange={setOpen}
                        recipient="A curious mind"
                        sender="— Tactile Objects"
                      >
                        <h3>A little note, just for you.</h3>
                        <p>Thoughtful objects make better interfaces.</p>
                      </Envelope>
                      <div className="canvas-label canvas-label-right">MADE OF PIXELS &amp; CARE</div>
                    </div>
                  )}
                  {tab === "code" && (
                    <div className="code-pane" id="panel-code" role="tabpanel" aria-labelledby="tab-code">
                      <div className="code-pane-top"><span>Envelope.tsx</span><button type="button" onClick={copySnippet} className="copy-small"><Icon name={copied ? "check" : "copy"} size={15} /> {copied ? "Copied" : "Copy code"}</button></div>
                      <pre><code>{snippet}</code></pre>
                    </div>
                  )}
                  {tab === "props" && (
                    <div className="props-pane" id="panel-props" role="tabpanel" aria-labelledby="tab-props">
                      <table><thead><tr><th>Prop</th><th>Type</th><th>Default</th></tr></thead><tbody>
                        {props.map(([name,type,defaultValue]) => <tr key={name}><td><code>{name}</code></td><td><code>{type}</code></td><td><code>{defaultValue}</code></td></tr>)}
                      </tbody></table>
                    </div>
                  )}

                  <div className="playground-options">
                    <div className="option-set"><span className="option-label">Colorway</span><div className="swatches">{variants.map((variant) =>
                      <button
                        key={variant.id}
                        type="button"
                        className={"swatch" + (variant.id === tone ? " swatch-active" : "")}
                        title={variant.name}
                        aria-label={`Use ${variant.name} envelope`}
                        aria-pressed={variant.id === tone}
                        onClick={() => setTone(variant.id)}
                      ><span style={{ backgroundColor: variant.hex }} /></button>
                    )}</div><span className="swatch-name">{variants.find((v) => v.id === tone)?.name}</span></div>
                    <div className="option-set"><span className="option-label">Interaction</span><button className="option-reset" type="button" onClick={() => setOpen(false)}><Icon name="reset" size={15} /> Reset object</button></div>
                  </div>
                </div>

                <div className="component-meta"><div><span>01</span> TOUCH / CLICK</div><div><span>02</span> KEYBOARD SUPPORT</div><div><span>03</span> REDUCED-MOTION AWARE</div></div>

                <div className="usage-section" id="installation">
                  <div className="usage-top"><div><span className="section-eyebrow">DEVELOPER EXPERIENCE</span><h3>Make it yours.</h3></div><span className="local-badge">Local workspace · not yet on npm</span></div>
                  <p>Import the component from the workspace package, include its styles, and put any React content inside the letter. The public package API is still being refined.</p>
                  <div className="snippet-card"><div className="snippet-top"><span>React / TSX</span><button type="button" className="copy-small" onClick={copySnippet}><Icon name={copied ? "check" : "copy"} size={14} /> {copied ? "Copied" : "Copy"}</button></div><pre><code>{snippet}</code></pre></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="coming-section wrap" id="up-next">
          <div className="section-topline"><div><span className="section-count">02 /</span> COMING NEXT</div><span className="section-topline-right">WORK IN PROGRESS</span></div>
          <div className="coming-heading"><h2>Just getting <span>started.</span></h2><p>Small, familiar objects. Unexpectedly good interactions. These are the pieces we're exploring next.</p></div>
          <div className="coming-grid">{upcoming.map(item => (
            <article className="coming-card" key={item.number}>
              <div className="coming-card-top"><span>OBJECT / {item.number}</span><span className="soon-pill">PLANNED</span></div>
              <div className={`coming-visual coming-visual-${item.visual}`} aria-hidden="true"><span className="visual-shadow" /><span className="visual-object" /></div>
              <div className="coming-card-bottom"><div><span className="coming-category">{item.category}</span><h3>{item.name}</h3><p>{item.detail}</p></div><span className="coming-arrow" aria-hidden="true">↗</span></div>
            </article>
          ))}</div>
        </section>

        <section className="principles-section" id="principles">
          <div className="wrap">
            <div className="section-topline"><div><span className="section-count">03 /</span> OUR APPROACH</div></div>
            <div className="principles-heading"><h2>Details make<br />the difference.</h2><p>The goal isn't more animation. It's a better relationship between people and the things they use on screen.</p></div>
            <div className="principles-grid">
              <article><span>01 —</span><h3>Thoughtful motion</h3><p>Every fold, shift, and transition exists for a reason. Movement should communicate, not distract.</p></article>
              <article><span>02 —</span><h3>Real interaction</h3><p>Objects respond to people, not just timers. Pointer, touch, keyboard, and reduced-motion use all matter.</p></article>
              <article><span>03 —</span><h3>Developer-first</h3><p>Reusable React components, typed APIs, and sensible defaults. Good craft shouldn't be difficult to adopt.</p></article>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="wrap footer-inner"><a href="#top" className="footer-brand">tactileobjects<span>.</span></a><span>MADE FOR THE CURIOUS. © 2026</span><a href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer">VIEW SOURCE ↗</a></div></footer>
    </div>
  );
}

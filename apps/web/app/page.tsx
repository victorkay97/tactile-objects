"use client";

import { useState } from "react";
import { Envelope } from "@tactile/objects";
import type { EnvelopeTone } from "@tactile/objects";

const tones: { id: EnvelopeTone; label: string }[] = [
  { id: "clay", label: "Terracotta" },
  { id: "sage", label: "Sage" },
  { id: "rose", label: "Dusty rose" },
];

const upcomingObjects = [
  { index: "002", title: "The Journal", tag: "Page-turn interaction", symbol: "↗" },
  { index: "003", title: "The Sticky Note", tag: "Peel, move, place", symbol: "↗" },
  { index: "004", title: "The Polaroid", tag: "A photograph developing", symbol: "↗" },
];

export default function HomePage() {
  const [tone, setTone] = useState<EnvelopeTone>("clay");
  const [open, setOpen] = useState(false);

  return (
    <main className="site">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Tactile Objects, home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>tactile<span className="brand-light">objects.</span></span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#objects">Objects</a>
          <a href="#approach">Approach</a>
          <a className="nav-github" href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> An open-source experiment in interaction</div>
          <h1 id="hero-title">Digital things.<br /><em>Real feelings.</em></h1>
          <p className="hero-description">A collection of beautifully crafted interactive objects for React. Familiar things, thoughtfully reimagined for the screen.</p>
          <div className="hero-actions">
            <a className="primary-link" href="#objects">Explore the first object <span aria-hidden="true">↘</span></a>
            <a className="text-link" href="#approach">What we're making <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-bottom"><span>NOT ANOTHER UI KIT</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>

        <div className="demo-card" id="objects">
          <div className="demo-header">
            <div className="demo-id"><span className="tiny-square" /> OBJECT / 001</div>
            <span className="demo-state"><span className="live-dot" /> INTERACTIVE DEMO</span>
          </div>
          <Envelope
            tone={tone}
            recipient="A curious mind"
            sender="— the Tactile team"
            open={open}
            onOpenChange={setOpen}
          >
            <h3>Some things deserve to be opened.</h3>
            <p>We're building a more human feeling web, one little object at a time.</p>
          </Envelope>
          <div className="demo-footer">
            <div className="demo-details">
              <span className="demo-number">01 <span>/ 01</span></span>
              <div><strong>The Envelope</strong><p>Flip. Unfold. Discover.</p></div>
            </div>
            <div className="demo-controls" role="group" aria-label="Choose envelope color">
              {tones.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={["tone-chip", "tone-chip--" + item.id, tone === item.id ? "is-active" : ""].join(" ")}
                  onClick={() => setTone(item.id)}
                  aria-label={"Use " + item.label + " envelope"}
                  aria-pressed={tone === item.id}
                  title={item.label}
                />
              ))}
            </div>
          </div>
          <div className="demo-control-row">
            <span>CLICK THE OBJECT TO {open ? "CLOSE" : "OPEN"}</span>
            <button type="button" className="reset-button" onClick={() => setOpen(false)}>Reset ↺</button>
          </div>
        </div>
      </section>

      <section className="collection" aria-labelledby="collection-heading">
        <div className="section-kicker"><span>01 —</span> THE COLLECTION</div>
        <div className="collection-heading">
          <h2 id="collection-heading">Made to be<br /><em>played with.</em></h2>
          <p>Not just things to look at. Objects with intention, personality, and tiny moments of delight.</p>
        </div>
        <div className="object-grid">
          {upcomingObjects.map((item) => (
            <article className="object-card" key={item.index}>
              <div className="object-card-top"><span>OBJECT / {item.index}</span><span>COMING SOON</span></div>
              <div className="object-card-glyph" aria-hidden="true">{item.index === "002" ? "▤" : item.index === "003" ? "▧" : "▣"}</div>
              <div className="object-card-bottom"><div><h3>{item.title}</h3><p>{item.tag}</p></div><span aria-hidden="true">{item.symbol}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="approach" id="approach" aria-labelledby="approach-heading">
        <div className="section-kicker"><span>02 —</span> THE APPROACH</div>
        <div className="approach-content">
          <h2 id="approach-heading">The little details<br />make it <em>feel real.</em></h2>
          <div className="approach-right">
            <p>We don't believe every interaction needs to be fast, flat, or forgettable. Sometimes a small, thoughtful moment is worth the extra craft.</p>
            <div className="principles">
              <span>01 / VISUAL FIDELITY</span>
              <span>02 / MEANINGFUL MOTION</span>
              <span>03 / BUILT FOR DEVELOPERS</span>
            </div>
            <a href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer" className="approach-link">See the source code <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <footer className="footer"><span>© 2026 TACTILE OBJECTS</span><span>CRAFTED FOR CURIOUS MINDS.</span><a href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer">VIEW ON GITHUB ↗</a></footer>
    </main>
  );
}

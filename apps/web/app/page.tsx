import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon, CodeIcon } from "../components/ui/icons";
import { ObjectCard } from "../components/object-card";
import { objects } from "../lib/objects";
import "./landing.css";

const availableObjects = objects.filter((object) => object.status === "available");

const example = [
  'import { Envelope } from "@tactile/objects";',
  'import "@tactile/objects/styles.css";',
  "",
  "export default function AShortNote() {",
  "  return (",
  '    <Envelope tone="clay" recipient="You">',
  "      <h3>A little more human.</h3>",
  "    </Envelope>",
  "  );",
  "}",
].join("\n");

export default function HomePage() {
  return (
    <main className="landing">
      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="layout-container landing-hero__inner">
          <div className="landing-hero__eyebrow">
            <span className="landing-live-dot" aria-hidden="true" />
            Open-source components for React
          </div>
          <h1 id="landing-title">Digital objects.<br />Real interactions.</h1>
          <p className="landing-hero__lede">
            A growing collection of tactile React components inspired by familiar
            things. Open an envelope. Turn a page. Make the web feel a little more human.
          </p>
          <div className="landing-hero__actions">
            <Link className="landing-btn landing-btn--dark" href="/components">
              Explore components <ArrowRightIcon size={16} aria-hidden="true" />
            </Link>
            <a className="landing-btn landing-btn--subtle"
              href="https://github.com/victorkay97/tactile-objects"
              target="_blank" rel="noopener noreferrer">
              <GithubIcon size={16} aria-hidden="true" /> View on GitHub
            </a>
          </div>
          <div className="landing-hero__facts" aria-label="Library at a glance">
            <div><strong>{String(availableObjects.length).padStart(2, "0")}</strong><span>Interactive objects</span></div>
            <div><strong>100%</strong><span>Open source</span></div>
            <div><strong>React</strong><span>TypeScript ready</span></div>
          </div>
        </div>
      </section>

      <section className="landing-collection" id="collection" aria-labelledby="collection-title">
        <div className="layout-container">
          <div className="landing-section-heading">
            <div>
              <span className="landing-eyebrow">The library</span>
              <h2 id="collection-title">Little objects, big personality.</h2>
              <p>Not videos or mockups. Real components you can interact with.</p>
            </div>
            <Link href="/components" className="landing-inline-link">
              Browse all <ArrowUpRightIcon size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="landing-grid">
            {availableObjects.map((object) => (
              <ObjectCard key={object.id} object={object} featured />
            ))}
          </div>
          <p className="landing-gallery-note">Try the objects above, or open a playground to explore their controls and code.</p>
        </div>
      </section>

      <section className="landing-developer" aria-labelledby="developer-title">
        <div className="layout-container landing-developer__inner">
          <div className="landing-developer__intro">
            <span className="landing-eyebrow">Built to be used</span>
            <h2 id="developer-title">A little code.<br />A lot of character.</h2>
            <p>
              Each object has real interactions, customizable content, and a typed
              React API. They are designed to be part of your interface, not just
              something you watch.
            </p>
            <div className="landing-developer__links">
              <Link href="/docs/getting-started" className="landing-inline-link">
                Read the docs <ArrowUpRightIcon size={16} aria-hidden="true" />
              </Link>
              <Link href="/components/envelope" className="landing-inline-link landing-inline-link--muted">
                Try the envelope <ArrowUpRightIcon size={16} aria-hidden="true" />
              </Link>
            </div>
            <p className="landing-alpha-note">Early alpha. The source is available on GitHub; npm publishing is still ahead.</p>
          </div>
          <div className="landing-code">
            <div className="landing-code__header">
              <span className="landing-code__filename"><CodeIcon size={15} aria-hidden="true" /> example.tsx</span>
              <span>React + TypeScript</span>
            </div>
            <pre><code>{example}</code></pre>
            <div className="landing-code__footer">Example using the workspace package · not yet published to npm</div>
          </div>
        </div>
      </section>

      <section className="landing-end" aria-labelledby="closing-title">
        <div className="layout-container landing-end__inner">
          <div>
            <span className="landing-eyebrow">Made to be explored</span>
            <h2 id="closing-title">See what a little interaction can do.</h2>
          </div>
          <Link href="/components" className="landing-btn landing-btn--dark">
            Explore the library <ArrowRightIcon size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

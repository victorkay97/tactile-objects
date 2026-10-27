import Link from "next/link";
import {
  ArrowUpRightIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  GithubIcon,
  SparklesIcon,
  CursorIcon,
  CodeIcon,
} from "../components/ui/icons";
import { ObjectCard } from "../components/object-card";
import { objects } from "../lib/objects";
import { AmbientPaperScene } from "../components/ambient-paper-scene";
import { RevealOnScroll } from "../components/reveal-on-scroll";
import "./landing.css";

const example = [
  'import { Envelope } from "@tactile/objects";',
  'import "@tactile/objects/styles.css";',
  "",
  "export default function Letter() {",
  "  return (",
  '    <Envelope tone="clay">',
  '      <h3>Hello, you.</h3>',
  '      <p>Some things deserve a little more care.</p>',
  "    </Envelope>",
  "  );",
  "}",
].join("\n");

export default function HomePage() {
  return (
    <main className="landing">
      <RevealOnScroll />
      <section className="landing-hero" aria-labelledby="landing-title">
        <AmbientPaperScene />
        <div className="layout-container landing-hero__inner">
          <div className="landing-hero__eyebrow">
            <span className="landing-live-dot" aria-hidden="true" />
            <span>AN OPEN-SOURCE COLLECTION</span>
            <span className="landing-hero__divider" aria-hidden="true" />
            <span>VOL. 001</span>
          </div>

          <h1 id="landing-title">
            A little more <em>feeling</em><br />
            for the web.
          </h1>
          <p className="landing-hero__lede">
            Familiar objects, thoughtfully reimagined as interactive React components.
            Not just something to look at. Something to experience.
          </p>
          <div className="landing-hero__actions">
            <Link className="landing-btn landing-btn--dark" href="/components">
              Explore components
              <ArrowUpRightIcon size={17} aria-hidden="true" />
            </Link>
            <a
              className="landing-btn landing-btn--subtle"
              href="https://github.com/victorkay97/tactile-objects"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={17} aria-hidden="true" />
              View on GitHub
            </a>
          </div>
          <div className="landing-hero__signature">Small details. Real interactions. A more human web.</div>
          <div className="landing-hero__foot" aria-hidden="true">
            <span>BUILT WITH CURIOSITY</span>
            <span>SCROLL TO EXPLORE <ArrowDownIcon size={14} /></span>
            <span>REACT + TYPESCRIPT</span>
          </div>
        </div>
      </section>

      <section className="landing-intro" aria-labelledby="intro-heading">
        <div className="layout-container landing-intro__inner" data-motion-reveal>
          <span className="landing-eyebrow">01 / THE IDEA</span>
          <div className="landing-intro__content">
            <h2 id="intro-heading">
              The best interactions don't<br className="landing-desktop-br" /> feel like interfaces.
            </h2>
            <p>
              They feel familiar. An envelope that opens, a journal that turns,
              a note that moves with you. We're building a collection around
              those little moments.
            </p>
          </div>
          <span className="landing-intro__mark" aria-hidden="true"><SparklesIcon size={30} /></span>
        </div>
      </section>

      <section className="landing-collection" id="collection" aria-labelledby="collection-title">
        <div className="layout-container">
          <div className="landing-section-heading" data-motion-reveal>
            <div>
              <span className="landing-eyebrow">02 / OBJECT LIBRARY</span>
              <h2 id="collection-title">The collection<span className="landing-dot">.</span></h2>
            </div>
            <div className="landing-section-heading__right">
              <p>One live object. More in the workshop. Every piece gets the time and care it deserves.</p>
              <Link href="/components" className="landing-inline-link">
                All components <ArrowUpRightIcon size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="landing-grid" data-motion-reveal>
            {objects.slice(0,3).map((object) => (
              <ObjectCard key={object.id} object={object} featured />
            ))}
          </div>
          <div className="landing-collection__foot" data-motion-reveal>
            <span>STICKY NOTE AND OTHER OBJECTS ARE IN DEVELOPMENT</span>
            <Link href="/components">Explore the roadmap <ArrowUpRightIcon size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="landing-principles" aria-labelledby="principles-title">
        <div className="layout-container landing-principles__inner">
          <div className="landing-principles__intro" data-motion-reveal>
            <span className="landing-eyebrow">03 / OUR APPROACH</span>
            <h2 id="principles-title">Made to be<br /><em>interacted with.</em></h2>
            <p>Less decorative motion. More thoughtful, tactile experiences that earn their place on the screen.</p>
          </div>
          <div className="landing-principles__list" data-motion-reveal>
            <div className="landing-principle">
              <span className="landing-principle__icon"><CursorIcon size={20} aria-hidden="true" /></span>
              <div><h3>Interaction first</h3><p>Objects respond to input, not just an animation timer.</p></div>
              <span className="landing-principle__index">01</span>
            </div>
            <div className="landing-principle">
              <span className="landing-principle__icon"><SparklesIcon size={20} aria-hidden="true" /></span>
              <div><h3>Care in the details</h3><p>Material, timing, depth, and movement matter.</p></div>
              <span className="landing-principle__index">02</span>
            </div>
            <div className="landing-principle">
              <span className="landing-principle__icon"><CodeIcon size={20} aria-hidden="true" /></span>
              <div><h3>Useful by design</h3><p>Typed React components that belong in real projects.</p></div>
              <span className="landing-principle__index">03</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-developer" aria-labelledby="developer-title">
        <div className="layout-container landing-developer__inner">
          <div className="landing-developer__intro" data-motion-reveal>
            <span className="landing-eyebrow">04 / FOR DEVELOPERS</span>
            <h2 id="developer-title">Made for the<br />things you build.</h2>
            <p>Real React components with flexible content and thoughtful defaults. Take one apart, make it yours, and give your next project a little more character.</p>
            <div className="landing-developer__links">
              <Link href="/docs/getting-started" className="landing-inline-link">
                Read the documentation <ArrowUpRightIcon size={16} aria-hidden="true" />
              </Link>
              <Link href="/components/envelope" className="landing-inline-link landing-inline-link--muted">
                Try an object <ArrowUpRightIcon size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="landing-code" data-motion-reveal>
            <div className="landing-code__header">
              <div className="landing-code__filename"><CodeIcon size={16} aria-hidden="true" /> example.tsx</div>
              <span>REACT / TYPESCRIPT</span>
            </div>
            <pre><code>{example}</code></pre>
            <div className="landing-code__footer"><span className="landing-code__status"><i /> EARLY ALPHA</span><span>NOT YET PUBLISHED TO NPM</span></div>
          </div>
        </div>
      </section>

      <section className="landing-end">
        <div className="layout-container landing-end__inner" data-motion-reveal>
          <div><span className="landing-eyebrow">THE COLLECTION IS JUST BEGINNING</span><h2>A more <em>tactile</em> web starts here.</h2></div>
          <Link href="/components" className="landing-btn landing-btn--light">See the objects <ArrowRightIcon size={17} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}

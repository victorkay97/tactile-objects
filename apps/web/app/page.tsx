import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon, CodeIcon } from "../components/ui/icons";
import { ObjectCard } from "../components/object-card";
import { objects } from "../lib/objects";
import "./landing.css";

const availableObjects = objects.filter(object => object.status === "available");
const envelope = objects.find(object => object.id === "001")!;

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

const questions = [
  {
    question: "Are these real, interactive components?",
    answer: "Yes. Each object is built with React and has its own interaction, from opening a letter to turning pages, developing a photograph, or moving a note. Try them in the library.",
  },
  {
    question: "Can I install Tactile Objects from npm?",
    answer: "Not yet. Tactile Objects is currently an early alpha. The source code and local workspace are available on GitHub, and publishing is planned for a later release.",
  },
  {
    question: "Can I customize the objects?",
    answer: "Yes. The components have typed properties, configurable content, and multiple material styles. Open a playground to try the options and inspect the generated React code.",
  },
  {
    question: "Does it work with TypeScript?",
    answer: "Yes. The components are built with React and TypeScript. Each playground includes a working code example and an interactive preview.",
  },
  {
    question: "Is Tactile Objects production-ready?",
    answer: "The library is in active development. Explore the source and test the components for your requirements before using them in production. Accessibility and reduced-motion behavior are part of the ongoing work.",
  },
];

function Boundary() {
  return <div className="landing-boundary" aria-hidden="true"><span>×</span><span>×</span></div>;
}

export default function HomePage() {
  return (
    <main className="landing">
      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="layout-container landing-hero__inner">
          <div className="landing-hero__copy">
            <h1 id="landing-title">Digital objects,<br/>made to feel real.</h1>
            <p className="landing-hero__lede">
              An open-source collection of thoughtful, interactive objects for React.
              Familiar things, with a little more feeling.
            </p>
            <div className="landing-hero__actions">
              <Link className="landing-btn landing-btn--dark" href="/docs/getting-started">
                Get started <ArrowRightIcon size={16} aria-hidden="true" />
              </Link>
              <Link className="landing-btn landing-btn--subtle" href="/components">
                Browse components
              </Link>
            </div>
          </div>
          <div className="landing-showcase" aria-label="Tactile Objects library at a glance">
            <div className="landing-showcase__texture" aria-hidden="true"><i/><i/><i/></div>
            <div className="landing-showcase__contents">
              <div className="landing-showcase__facts">
                <div className="landing-showcase__fact">
                  <span>Components</span>
                  <strong>{String(availableObjects.length).padStart(2, "0")}</strong>
                  <small>AND GROWING</small>
                </div>
                <div className="landing-showcase__fact">
                  <span>Open source</span>
                  <strong>100%</strong>
                  <small>MADE TO SHARE</small>
                </div>
              </div>
              <Link href="/components/envelope" className="landing-showcase__install">
                <span className="landing-showcase__install-head"><b>Explore the collection</b><small>LIVE PLAYGROUND</small></span>
                <span className="landing-showcase__install-code">Open an envelope, turn a page, leave a note.<ArrowUpRightIcon size={17} aria-hidden="true" /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section landing-collection" id="collection" aria-labelledby="collection-title">
        <div className="layout-container">
          <div className="landing-section-heading">
            <div>
              <span className="landing-eyebrow">THE LIBRARY</span>
              <h2 id="collection-title">Every object, made to interact.</h2>
            </div>
            <Link href="/components" className="landing-inline-link">Browse all <ArrowRightIcon size={16} aria-hidden="true"/></Link>
          </div>
          <div className="landing-grid">
            {availableObjects.map(object => <ObjectCard key={object.id} object={object} featured />)}
          </div>
          <p className="landing-gallery-note">Interact with the previews, then open any object to explore its controls and code.</p>
          <Boundary />
        </div>
      </section>

      <section className="landing-section landing-studio" aria-labelledby="studio-title">
        <div className="layout-container">
          <span className="landing-eyebrow">IN THE STUDIO</span>
          <h2 id="studio-title" className="landing-section-title">Familiar things. New possibilities.</h2>
          <p className="landing-section-lede">Small details change how an interface feels. These are components with movement, material, and a reason to exist.</p>
          <div className="landing-studio__grid">
            <div className="landing-studio__demo"><ObjectCard object={envelope} featured /></div>
            <div className="landing-studio__notes">
              <div className="landing-studio__note"><span>01 / INTERACTION</span><h3>Open, don't just click.</h3><p>Objects respond to people, rather than playing a decorative animation on a timer.</p></div>
              <div className="landing-studio__note"><span>02 / MATERIAL</span><h3>A little depth goes a long way.</h3><p>Paper, shadows, movement, and timing bring a familiar quality to digital surfaces.</p></div>
              <Link className="landing-inline-link" href="/components/envelope">Try the envelope <ArrowUpRightIcon size={16} aria-hidden="true" /></Link>
            </div>
          </div>
          <Boundary />
        </div>
      </section>

      <section className="landing-section landing-how" aria-labelledby="how-title">
        <div className="layout-container">
          <span className="landing-eyebrow">HOW IT WORKS</span>
          <h2 id="how-title" className="landing-section-title">Explore, customize, create.</h2>
          <div className="landing-split landing-how__content">
            <div className="landing-steps">
              <details name="tactile-steps"><summary><small>01</small><strong>Pick an object</strong></summary><p>Browse the gallery and choose the interaction that fits your idea. Each preview is a real component.</p></details>
              <details name="tactile-steps" open><summary><small>02</small><strong>Try it in the playground</strong></summary><p>Experiment with colors, materials, content, and controls. Your changes appear in the live preview.</p></details>
              <details name="tactile-steps"><summary><small>03</small><strong>Make it your own</strong></summary><p>Review the generated TypeScript and use the open-source workspace as a starting point for your project.</p></details>
            </div>
            <div className="landing-terminal">
              <div className="landing-terminal__chrome"><i/><i/><i/><span>example.tsx</span></div>
              <pre><code>{example}</code></pre>
            </div>
          </div>
          <Boundary />
        </div>
      </section>

      <section className="landing-section landing-developer" aria-labelledby="developer-title">
        <div className="layout-container landing-split">
          <div className="landing-developer__intro">
            <span className="landing-eyebrow">REACT + TYPESCRIPT</span>
            <h2 id="developer-title" className="landing-section-title">Built to fit your project.</h2>
            <p className="landing-section-lede">The objects have typed APIs, customizable content, and thoughtful defaults. You bring the idea; the components bring the feeling.</p>
            <Link href="/docs" className="landing-inline-link">Explore documentation <ArrowRightIcon size={16} aria-hidden="true" /></Link>
          </div>
          <div className="landing-code">
            <div className="landing-code__header"><span className="landing-code__filename"><CodeIcon size={15} aria-hidden="true" /> example.tsx</span><span>REACT</span></div>
            <pre><code>{example}</code></pre>
            <div className="landing-code__footer">Early alpha · workspace source available on GitHub · not yet published to npm</div>
          </div>
        </div>
        <div className="layout-container"><Boundary /></div>
      </section>

      <section className="landing-section landing-material" aria-labelledby="material-title">
        <div className="layout-container landing-split landing-material__inner">
          <div className="landing-material__demo" aria-label="Material study with layers of paper">
            <div className="landing-material__sheet landing-material__sheet--back"/><div className="landing-material__sheet landing-material__sheet--mid"/><div className="landing-material__sheet landing-material__sheet--front"><span>Some things<br/>deserve a little<br/><em>more care.</em></span></div>
            <span className="landing-material__caption">A STUDY IN DIGITAL MATERIALS</span>
          </div>
          <div>
            <span className="landing-eyebrow">CRAFTED WITH INTENTION</span>
            <h2 id="material-title" className="landing-section-title">Every detail matters.</h2>
            <p className="landing-section-lede">Not just beautiful frames. Movement that makes sense, interactions that respond to you, and little moments that feel surprisingly familiar.</p>
            <Link href="/about" className="landing-inline-link">Our approach <ArrowRightIcon size={16} aria-hidden="true"/></Link>
          </div>
        </div>
        <div className="layout-container"><Boundary /></div>
      </section>

      <section className="landing-section landing-faq" aria-labelledby="faq-title">
        <div className="layout-container landing-split">
          <div><span className="landing-eyebrow">FAQ</span><h2 id="faq-title" className="landing-section-title">Good questions.</h2></div>
          <div className="landing-faq__list">
            {questions.map((item, index) => (
              <details key={item.question} name="tactile-faq" open={index === 0 ? true : undefined}>
                <summary>{item.question}<span className="landing-faq__indicator" aria-hidden="true"/></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="layout-container"><Boundary /></div>
      </section>

      <section className="landing-section landing-follow" aria-labelledby="follow-title">
        <div className="layout-container landing-split">
          <div>
            <span className="landing-eyebrow">OPEN SOURCE</span>
            <h2 id="follow-title" className="landing-section-title">See what we're making next.</h2>
            <p className="landing-section-lede">Follow the experiments, browse the source, and explore the growing collection. No newsletter to subscribe to. Just the work, out in the open.</p>
          </div>
          <div className="landing-follow__card">
            <span className="landing-follow__card-label"><GithubIcon size={17} aria-hidden="true"/> TACTILE OBJECTS / GITHUB</span>
            <h3>Made for curious people.</h3>
            <p>The library is still in early alpha. Take a look around and follow along as we keep building.</p>
            <a className="landing-btn landing-btn--dark" href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer">View on GitHub <ArrowUpRightIcon size={16} aria-hidden="true"/></a>
          </div>
        </div>
      </section>

      <section className="landing-end" aria-labelledby="closing-title">
        <div className="layout-container landing-end__inner">
          <h2 id="closing-title">Make the web feel something.</h2>
          <p>Pick an object, try it out, and make something memorable.</p>
          <div className="landing-end__actions">
            <Link href="/docs/getting-started" className="landing-btn landing-btn--light">Get started <ArrowRightIcon size={16} aria-hidden="true"/></Link>
            <Link href="/components" className="landing-btn landing-btn--outline">Browse components</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

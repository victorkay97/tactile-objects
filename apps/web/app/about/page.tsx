import Link from "next/link";
import {
  ArrowUpRightIcon, SparklesIcon, CursorIcon, CodeIcon,
} from "../../components/ui/icons";

export const metadata = { title: "About", description: "The thinking behind Tactile Objects." };

const values = [
  { num: "01", title: "Craft over quantity", description: "Every interaction gets the attention it deserves. We'd rather have three delightful objects than thirty forgettable effects.", Icon: SparklesIcon },
  { num: "02", title: "Behaviour, not decoration", description: "Folds, gestures, depth, and timing should communicate how something works. Motion is part of the interface.", Icon: CursorIcon },
  { num: "03", title: "Open and usable", description: "Real React components, deliberate APIs, accessibility, and the freedom to make them your own.", Icon: CodeIcon },
];

export default function AboutPage() {
  return (
    <main className="story-page">
      <section className="layout-container story-page__hero">
        <span className="platform-overline">THE IDEA BEHIND TACTILE OBJECTS</span>
        <h1>Small interactions.<br /><span>Lasting impressions.</span></h1>
        <p>We're interested in the moments that make the digital world feel less like a screen and more like something you can actually interact with.</p>
        <div className="story-page__hero-foot"><span>AN OPEN-SOURCE EXPERIMENT</span><span>CRAFTED IN REACT</span></div>
      </section>
      <section className="story-page__manifesto">
        <div className="layout-container story-page__manifesto-inner">
          <span className="platform-overline">01 / THE BELIEF</span>
          <div><h2>Interfaces don't have to feel <em>flat.</em></h2><p>Real objects teach us through movement, weight, resistance, and touch. We're translating those familiar qualities into interactive React components that are both expressive and useful.</p><p>Our goal isn't to simulate everything perfectly. It's to make each interaction feel thoughtful, believable, and memorable.</p></div>
        </div>
      </section>
      <section className="layout-container story-page__values">
        <div className="story-page__section-heading"><span className="platform-overline">02 / THE PRINCIPLES</span><h2>What we're building toward.</h2></div>
        <div className="story-page__value-list">
          {values.map(({num,title,description,Icon}) => (
            <article key={num} className="story-page__value">
              <span className="story-page__value-num">{num}</span>
              <div className="story-page__value-icon"><Icon size={19} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="layout-container story-page__closing">
        <div><span className="platform-overline">03 / JOIN THE JOURNEY</span><h2>Explore what's taking shape.</h2><p>See the objects, inspect the source, and learn how they work.</p></div>
        <div className="story-page__closing-actions">
          <Link href="/components" className="platform-button">Explore objects <ArrowUpRightIcon size={16} aria-hidden="true" /></Link>
          <Link href="/docs" className="platform-text-link">Read the docs <ArrowUpRightIcon size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}

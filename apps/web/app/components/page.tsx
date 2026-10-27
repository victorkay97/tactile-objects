import Link from "next/link";
import { ObjectCard } from "../../components/object-card";
import { objects } from "../../lib/objects";
import { ArrowUpRightIcon, SparklesIcon } from "../../components/ui/icons";

export const metadata = {
  title: "Components",
  description: "Discover realistic interactive React objects from Tactile Objects.",
};

export default function ComponentsPage() {
  return (
    <main className="collection-page">
      <header className="layout-container collection-page__hero" data-motion-reveal>
        <div className="collection-page__overline"><span className="platform-overline">THE OBJECT COLLECTION</span><span className="collection-page__volume">VOL. 001 / EARLY ALPHA</span></div>
        <div className="collection-page__heading">
          <h1>Little objects.<br /><span>Considered details.</span></h1>
          <p>Four interactive objects, each with its own character. Open a note, turn a page, develop a memory, or peel something loose.</p>
        </div>
        <div className="collection-page__filters"><span>ALL OBJECTS <span className="collection-page__counter">04</span></span><span>04 LIVE OBJECTS · INTERACT TO EXPLORE</span></div>
      </header>
      <section data-motion-reveal className="layout-container collection-page__grid" aria-label="Available and planned objects">
        {objects.map((object) => <ObjectCard key={object.id} object={object} />)}
      </section>
      <aside data-motion-reveal className="layout-container collection-page__footnote">
        <div className="collection-page__footnote-icon"><SparklesIcon size={21} aria-hidden="true" /></div>
        <div><strong>The workshop is open.</strong><p>Four tangible React components are ready to play with. Each has a dedicated configurator, source, and typed API.</p></div>
        <Link href="/docs/design-principles">How we make things <ArrowUpRightIcon size={17} aria-hidden="true" /></Link>
      </aside>
    </main>
  );
}

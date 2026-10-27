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
      <header className="layout-container collection-page__hero">
        <div className="collection-page__overline"><span className="platform-overline">THE OBJECT COLLECTION</span><span className="collection-page__volume">VOL. 001 / EARLY ALPHA</span></div>
        <div className="collection-page__heading">
          <h1>Little objects.<br /><span>Considered details.</span></h1>
          <p>Explore the first interactive object and discover what's taking shape in our workshop. Built slowly, with attention to the things you can feel.</p>
        </div>
        <div className="collection-page__filters"><span>ALL OBJECTS <span className="collection-page__counter">04</span></span><span>01 AVAILABLE · 03 IN THE WORKSHOP</span></div>
      </header>
      <section className="layout-container collection-page__grid" aria-label="Available and planned objects">
        {objects.map((object) => <ObjectCard key={object.id} object={object} />)}
      </section>
      <aside className="layout-container collection-page__footnote">
        <div className="collection-page__footnote-icon"><SparklesIcon size={21} aria-hidden="true" /></div>
        <div><strong>More objects are on their way.</strong><p>We'll only add components when they're ready to be used, not just admired.</p></div>
        <Link href="/docs/design-principles">How we make things <ArrowUpRightIcon size={17} aria-hidden="true" /></Link>
      </aside>
    </main>
  );
}

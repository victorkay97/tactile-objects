import Link from "next/link";
import { ObjectCard } from "../../components/object-card";
import { objects } from "../../lib/objects";

export const metadata = {
 title: "Components",
 description: "Four interactive React components, ready to explore.",
};

export default function ComponentsPage() {
 return <main className="collection-page ref-collection">
   <header className="collection-page__hero">
     <div className="collection-page__heading">
       <h1>Components</h1>
       <p>Interactive objects you can bring into your project. Explore the collection, change the details, and make them your own. More on the way.</p>
     </div>
   </header>
   <section className="collection-page__grid" aria-label="Interactive components">
     {objects.map(object => <ObjectCard key={object.id} object={object} />)}
   </section>
   <div className="collection-page__footnote">
     <p>Early alpha · All four previews are interactive. Open a component for the full playground.</p>
     <Link href="/docs/getting-started">Getting started ↗</Link>
   </div>
 </main>;
}

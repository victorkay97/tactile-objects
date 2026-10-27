import Link from "next/link";
import { ArrowUpRightIcon } from "../../../components/ui/icons";

export const metadata={title:"Design Principles",description:"Interaction fidelity, craftsmanship and developer experience at Tactile Objects."};

const principles=[
  ["01","Look the part","Objects should have coherent geometry, perspective, texture, occlusion and light. A closed object must still look carefully designed."],
  ["02","Move with intention","Gestures and transitions should feel connected. Reversing an animation shouldn't teleport its pieces into place."],
  ["03","Respond to people","We design for keyboard, mouse, touch, and reduced-motion preferences rather than assuming everybody clicks with a cursor."],
  ["04","Stay genuinely reusable","An object should expose a small, typed API, accept real content and avoid framework-specific assumptions or heavy dependencies without a reason."],
];

export default function DesignPrinciples() {
  return <main className="docs-article">
    <span className="docs-site__eyebrow">03 / GUIDE</span><h1>Design principles<span className="docs-site__period">.</span></h1>
    <p className="docs-site__lead">A component library where the objects matter more than the number of components. These principles define what earns a place in the collection.</p>
    <div className="docs-site__principle-list">{principles.map(([num,title,description])=><section key={num} className="docs-site__principle"><span>{num}</span><div><h2>{title}</h2><p>{description}</p></div></section>)}</div>
    <section><h2>How new objects are added</h2><p>Start with a real-world reference and a genuine product use case. Prototype the geometry and interaction, test it across input modes, then refine the developer API. We publish when the result is useful—not because a roadmap needs another checkmark.</p></section>
    <div className="docs-site__next"><Link href="/components">Browse components <ArrowUpRightIcon size={16} aria-hidden="true" /></Link></div>
  </main>;
}

import Link from "next/link";
import { ArrowUpRightIcon, BookIcon, CodeIcon, CursorIcon, SparklesIcon } from "../../components/ui/icons";

export const metadata = {title: "Documentation", description: "Getting started, accessibility and design principles for Tactile Objects."};

const sections = [
  {href:"/docs/getting-started",num:"01",title:"Getting started",description:"Set up the monorepo, render your first object, and run the development server.",Icon:CodeIcon},
  {href:"/docs/accessibility",num:"02",title:"Accessibility",description:"How we approach keyboard, touch, semantics, and reduced motion.",Icon:CursorIcon},
  {href:"/docs/design-principles",num:"03",title:"Design principles",description:"The quality expectations guiding every new interactive object.",Icon:SparklesIcon},
];

export default function DocsHome() {
  return (
    <main>
      <div className="docs-site__eyebrow">DOCUMENTATION / OVERVIEW</div>
      <h1 className="docs-site__title">Build with <em>feeling.</em></h1>
      <p className="docs-site__lead">Everything you need to start exploring and using Tactile Objects. This library is in early alpha, so the docs clearly distinguish what's available from what's still being developed.</p>
      <div className="docs-site__notice"><BookIcon size={19} aria-hidden="true" /><span><strong>Early access.</strong> Components currently resolve through this repository's pnpm workspace. We haven't released an npm package yet.</span></div>
      <div className="docs-site__cards">
        {sections.map(({href,num,title,description,Icon}) => <Link key={href} href={href} className="docs-site__card"><div className="docs-site__card-top"><Icon size={21} aria-hidden="true" /><span>{num} / GUIDE</span></div><h2>{title}</h2><p>{description}</p><span className="docs-site__card-arrow"><ArrowUpRightIcon size={17} aria-hidden="true" /></span></Link>)}
      </div>
      <section className="docs-site__section"><span className="docs-site__eyebrow">OBJECTS / 001—004</span><h2>Four little objects.</h2><p>The Envelope opens. The Journal turns. The Polaroid develops. The Sticky Note moves. Every one has a live preview, controls and a typed React API.</p><Link className="docs-site__text-link" href="/components/envelope">Explore all four <ArrowUpRightIcon size={16} aria-hidden="true" /></Link></section>
    </main>
  );
}

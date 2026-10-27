import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectLab } from "../../../components/object-lab";
import type { LabKind } from "../../../components/object-lab";
import { ArrowLeftIcon, ArrowUpRightIcon, MailIcon, BookIcon, CameraIcon, PaperIcon, SparklesIcon } from "../../../components/ui/icons";
import "./object-lab.css";

const entries=[
  {slug:"journal" as const,name:"Journal",number:"002",collection:"PAPER",subtitle:"A little book that opens. Pages worth turning. Write something of your own.",Icon:BookIcon,source:"journal/Journal.tsx"},
  {slug:"polaroid" as const,name:"Polaroid",number:"003",collection:"MEMORIES",subtitle:"Give a moment time to develop. Then turn it over to keep the story.",Icon:CameraIcon,source:"polaroid/Polaroid.tsx"},
  {slug:"sticky-note" as const,name:"Sticky Note",number:"004",collection:"PAPER",subtitle:"A thought you can peel, place and return. Make it yours.",Icon:PaperIcon,source:"sticky-note/StickyNote.tsx"},
];
const nav=[
  {id:"01",slug:"envelope",name:"Envelope",Icon:MailIcon},
  {id:"02",slug:"journal",name:"Journal",Icon:BookIcon},
  {id:"03",slug:"polaroid",name:"Polaroid",Icon:CameraIcon},
  {id:"04",slug:"sticky-note",name:"Sticky Note",Icon:PaperIcon},
];

export function generateStaticParams(){return entries.map(entry=>({slug:entry.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const entry=entries.find(item=>item.slug===slug);
  if(!entry)return {title:"Component not found"};
  return {title:entry.name+" — Tactile Objects",description:entry.subtitle};
}
export default async function ObjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const entry=entries.find(item=>item.slug===slug);
  if(!entry)notFound();
  return <main className="docs-page object-page">
    <div className="layout-container docs-layout">
      <aside className="docs-sidebar" aria-label="Component navigation">
        <Link className="docs-sidebar-back" href="/components"><ArrowLeftIcon size={15} aria-hidden="true"/> All components</Link>
        <div className="docs-sidebar-label">OBJECTS <span>04</span></div>
        {nav.map(({id,slug:href,name,Icon})=><Link key={href} href={"/components/"+href} aria-current={href===slug?"page":undefined} className={href===slug?"docs-sidebar-item active":"docs-sidebar-item"}>
          <span><Icon size={17} aria-hidden="true"/></span>{name}<i>{id}</i>
        </Link>)}
        <div className="docs-sidebar-divider"/>
        <div className="docs-sidebar-label">ON THIS PAGE</div>
        <a className="docs-sidebar-link" href="#playground">Playground</a>
        <a className="docs-sidebar-link" href="#usage">Using the component</a>
        <a className="docs-sidebar-link" href="#philosophy">Design notes</a>
        <div className="docs-sidebar-footer">MORE THAN A UI KIT. <span><SparklesIcon size={16} aria-hidden="true"/></span></div>
      </aside>
      <div className="docs-main">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/components">Components</Link><span>/</span><b>{entry.name}</b></nav>
        <div className="docs-heading" id="playground">
          <div><span className="section-label">OBJECT {entry.number} / {entry.collection} COLLECTION</span>
            <h1>{entry.name}<span>.</span></h1><p>{entry.subtitle}</p>
          </div>
          <a className="docs-source-link" href={"https://github.com/victorkay97/tactile-objects/blob/feat/foundation-and-envelope-prototype/packages/objects/src/"+entry.source} target="_blank" rel="noopener noreferrer">
            View source <ArrowUpRightIcon size={15} aria-hidden="true"/>
          </a>
        </div>
        <ObjectLab kind={entry.slug as LabKind}/>
        <section id="usage" className="object-page__usage">
          <span className="section-label">FOR THE MAKERS</span>
          <h2>Small object. Real possibilities.</h2>
          <p>Customize the object above, then switch to <strong>Code</strong> to copy the matching React example. These are actual components from the local `@tactile/objects` workspace package; public npm publishing is still planned.</p>
        </section>
        <section className="docs-design-notes" id="philosophy">
          <span className="section-label">DESIGN NOTES</span><h2>Interaction comes first.</h2>
          <div className="docs-design-grid">
            <div><h3>Meaningful movement</h3><p>Every motion has a purpose. An open cover reveals a page, a photo develops, a note can be placed.</p></div>
            <div><h3>Built to be used</h3><p>Type-safe component props, keyboard controls, reduced-motion support, and no imaginary features.</p></div>
          </div>
        </section>
        <div className="docs-bottom-nav"><Link href="/components"><ArrowLeftIcon size={16} aria-hidden="true"/> All objects</Link><Link href="/about">Our philosophy <ArrowUpRightIcon size={16} aria-hidden="true"/></Link></div>
      </div>
    </div>
  </main>;
}

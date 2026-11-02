import Link from "next/link";
import { EnvelopePlayground } from "../../components/envelope-playground";
import { ObjectLab } from "../../components/object-lab";
import type { LabKind } from "../../components/object-lab";
import "../components/envelope/workbench.css";
import "../components/[slug]/object-lab.css";
import "./playground.css";

const components = [
 {slug:"envelope",label:"Envelope"},
 {slug:"journal",label:"Journal"},
 {slug:"polaroid",label:"Polaroid"},
 {slug:"sticky-note",label:"Sticky Note"},
] as const;

export const metadata = {
 title:"Playground",
 description:"Experiment with real interactive Tactile Objects and copy React code.",
};

export default async function PlaygroundPage({searchParams}:{searchParams:Promise<{component?:string}>}) {
 const query = await searchParams;
 const choice = components.find(item => item.slug === query.component) ?? components[0];
 return <main className="playground-page">
   <div className="playground-page__inner">
     <div className="playground-page__heading">
       <span>PLAYGROUND</span>
       <h1>Try an object.</h1>
       <p>Choose an object and explore its controls. Everything below is a live React component.</p>
     </div>
     <nav className="playground-page__selector" aria-label="Choose an object to customize">
       {components.map(item => <Link key={item.slug}
        href={"/playground?component="+item.slug}
        aria-current={choice.slug===item.slug?"page":undefined}
        className={choice.slug===item.slug?"is-current":""}>{item.label}</Link>)}
     </nav>
     <div className="playground-page__studio" key={choice.slug}>
       {choice.slug === "envelope" ? <EnvelopePlayground/> : <ObjectLab kind={choice.slug as LabKind}/>}
     </div>
   </div>
 </main>;
}

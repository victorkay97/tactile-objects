"use client";

import { useState, useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import { Journal, Polaroid, StickyNote } from "@tactile/objects";
import type { JournalTone, JournalPage, PolaroidScene, PolaroidFrame, StickyTone } from "@tactile/objects";
import {
  ArrowUpRightIcon, BookIcon, CameraIcon, PaperIcon, CopyIcon,
  CheckIcon, DotGridIcon, ZoomInIcon, ZoomOutIcon, RefreshIcon, PlaygroundIcon,
} from "./ui/icons";

export type LabKind = "journal" | "polaroid" | "sticky-note";
type View = "preview" | "code" | "props";
const initialPages: JournalPage[] = [
  { eyebrow:"01 / BEGINNINGS", title:"A little field note.",body:"Some ideas deserve a place to grow. Start small. Follow what feels interesting." },
  { eyebrow:"02 / OBSERVATIONS",title:"Look a little closer.",body:"An ordinary afternoon can contain extraordinary details. Notice the quiet parts." },
  { eyebrow:"03 / REMINDERS",title:"Make room for wonder.",body:"A good notebook keeps the moments you might otherwise forget." },
];
type LabSettings = {
  journalTone: JournalTone; cover: string; pages: JournalPage[];
  scene: PolaroidScene; frame: PolaroidFrame; caption: string; date: string;
  stickyTone: StickyTone; note: string;
};
const initial: LabSettings = {
  journalTone:"sage", cover:"Field Notes",pages:initialPages.map(p=>({...p})),
  scene:"coast",frame:"ivory",caption:"somewhere quiet",date:"OCT · 2026",
  stickyTone:"butter",note:"Remember the little things.",
};
const definitions: Record<LabKind,{id:string;label:string;collection:string;Icon:typeof BookIcon;hint:string}> = {
  journal:{id:"002",label:"Journal",collection:"PAPER STUDY",Icon:BookIcon,hint:"Open the cover and turn a real page."},
  polaroid:{id:"003",label:"Polaroid",collection:"MEMORY STUDY",Icon:CameraIcon,hint:"Develop the image, then turn it over."},
  "sticky-note":{id:"004",label:"Sticky Note",collection:"PAPER STUDY",Icon:PaperIcon,hint:"Peel it free. Move it. Pin it back."},
};
const propInfo:Record<LabKind,[string,string,string][]> = {
  journal:[
    ["pages","JournalPage[]","Titles, text and eyebrow on each page."],
    ["coverTitle","string","The hardcover title."],
    ["tone","sage | clay | midnight","Binding colour."],
    ["open, defaultOpen","boolean","Controlled or initial cover state."],
    ["page, defaultPage","number","Zero-based displayed page."],
    ["onOpenChange, onPageChange","callbacks","State change notifications."],
  ],
  polaroid:[
    ["scene","coast | sunset | garden","An illustrated landscape."],
    ["frame","ivory | cream","Print frame colour."],
    ["caption, date","string","Handwritten caption and reverse-side date."],
    ["developed, defaultDeveloped","boolean","Controlled or initial photo development."],
    ["flipped, defaultFlipped","boolean","Controlled or initial reverse side."],
    ["onDevelopChange, onFlipChange","callbacks","State change notifications."],
  ],
  "sticky-note":[
    ["tone","butter | mint | lilac | rose","Note paper colour."],
    ["text, defaultText","string","Controlled or initial note content."],
    ["editable","boolean","Enables direct writing on the paper."],
    ["pinned, defaultPinned","boolean","Whether the note can be moved."],
    ["onPinnedChange","callback","Pin state notification."],
    ["onTextChange","callback","Direct-editing notification."],
  ],
};

function codeFor(kind:LabKind,s:LabSettings):string {
  const head = ['import { '+(kind==="journal"?"Journal":kind==="polaroid"?"Polaroid":"StickyNote")+' } from "@tactile/objects";','import "@tactile/objects/styles.css";',''];
  if(kind==="journal") {
    const pages=s.pages.map(p=>'    { title: '+JSON.stringify(p.title)+', body: '+JSON.stringify(p.body)+', eyebrow: '+JSON.stringify(p.eyebrow ?? "")+' },');
    return [...head,'const pages = [',...pages,'];','','export default function MyJournal() {','  return (','    <Journal', '      tone='+JSON.stringify(s.journalTone),'      coverTitle={'+JSON.stringify(s.cover)+'}', '      pages={pages}', '    />','  );','}'].join("\n");
  }
  if(kind==="polaroid")return [...head,'export default function MyPolaroid() {','  return (','    <Polaroid','      scene='+JSON.stringify(s.scene),'      frame='+JSON.stringify(s.frame),'      caption={'+JSON.stringify(s.caption)+'}', '      date={'+JSON.stringify(s.date)+'}', '    />','  );','}'].join("\n");
  return [...head,'export default function MyStickyNote() {','  return (','    <StickyNote','      tone='+JSON.stringify(s.stickyTone),'      defaultText={'+JSON.stringify(s.note)+'}', '      editable','    />','  );','}'].join("\n");
}
const tones: Record<string,string>={sage:"#9eb4a3",clay:"#caa48e",midnight:"#575c77",butter:"#f2e4a9",mint:"#c8e5d0",lilac:"#e1d7f3",rose:"#f2d3d1"};
const useInitial=()=>({...initial,pages:initial.pages.map(p=>({...p}))});
export function ObjectLab({kind}:{kind:LabKind}) {
  const [settings,setSettings]=useState<LabSettings>(useInitial);
  const [view,setView]=useState<View>("preview");
  const [dots,setDots]=useState(true);
  const [zoom,setZoom]=useState(100);
  const [journalOpen,setJournalOpen]=useState(false);
  const [page,setPage]=useState(0);
  const [developed,setDeveloped]=useState(false);
  const [flipped,setFlipped]=useState(false);
  const [pinned,setPinned]=useState(true);
  const [copied,setCopied]=useState<"idle"|"yes"|"error">("idle");
  const timeout=useRef<ReturnType<typeof setTimeout>|null>(null);
  const spec=definitions[kind];
  const Icon=spec.Icon;
  const code=codeFor(kind,settings);
  useEffect(()=>()=>{if(timeout.current)clearTimeout(timeout.current)},[]);
  const change=<K extends keyof LabSettings>(key:K,value:LabSettings[K])=>
    setSettings(previous=>({...previous,[key]:value}));
  function changePage<K extends keyof JournalPage>(key:K,value:JournalPage[K]){
    setSettings(prev=>({...prev,pages:prev.pages.map((p,i)=>i===page?{...p,[key]:value}:p)}));
  }
  function reset() {
    setSettings(useInitial());setJournalOpen(false);setPage(0);setDeveloped(false);
    setFlipped(false);setPinned(true);setDots(true);setZoom(100);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(code);setCopied("yes"); }
    catch { setCopied("error"); }
    if(timeout.current)clearTimeout(timeout.current);
    timeout.current=setTimeout(()=>setCopied("idle"),2400);
  }
  return <section className="object-lab" aria-label={spec.label+" interactive customization playground"}>
    <header className="object-lab__header">
      <div className="object-lab__identity">
        <span className="object-lab__icon"><Icon size={18} aria-hidden="true"/></span>
        <div><strong>Object playground</strong><span>{spec.id} / {spec.label.toUpperCase()}</span></div>
      </div>
      <div className="object-lab__header-actions">
        <nav className="object-lab__tabs" aria-label="Object workspace views">
          {(["preview","code","props"] as const).map(tab=>
            <button key={tab} type="button" className={view===tab?"is-selected":""}
              aria-pressed={view===tab} onClick={()=>setView(tab)}>{tab==="preview"?"Preview":tab==="code"?"Code":"Props"}</button>
          )}
        </nav>
        <button type="button" className="object-lab__copy" onClick={copy}>{copied==="yes"?<CheckIcon size={15} aria-hidden="true"/>:<CopyIcon size={15} aria-hidden="true"/>}{copied==="yes"?"Copied":"Copy React"}</button>
      </div>
    </header>
    {view==="preview"?<div className="object-lab__columns">
      <div className="object-lab__stage">
        <div className={dots?"object-lab__canvas has-dots":"object-lab__canvas"}>
          <div className="object-lab__canvas-top">
            <span>FIG. {spec.id} / {spec.collection}</span>
            <span className="object-lab__live"><i/>LIVE REACT OBJECT</span>
          </div>
          <div className={"object-lab__mount object-lab__mount--"+kind} style={{"--lab-zoom":zoom/100} as CSSProperties}>
            {kind==="journal"&&
              <Journal tone={settings.journalTone} coverTitle={settings.cover} pages={settings.pages}
                open={journalOpen} onOpenChange={setJournalOpen} page={page} onPageChange={setPage}/>}
            {kind==="polaroid"&&
              <Polaroid scene={settings.scene} frame={settings.frame} caption={settings.caption} date={settings.date}
                developed={developed} onDevelopChange={setDeveloped} flipped={flipped} onFlipChange={setFlipped}/>}
            {kind==="sticky-note"&&
              <StickyNote tone={settings.stickyTone} text={settings.note} onTextChange={value=>change("note",value)}
                editable pinned={pinned} onPinnedChange={setPinned}/>}
          </div>
          <div className="object-lab__canvas-bottom"><span>{spec.hint}</span><span>TOUCH · CLICK · KEYBOARD</span></div>
        </div>
        <div className="object-lab__toolbar">
          <button type="button" aria-pressed={dots} onClick={()=>setDots(!dots)} className={dots?"is-active":""}><DotGridIcon size={16} aria-hidden="true"/> Dots</button>
          <div className="object-lab__zoom">
            <button type="button" aria-label="Zoom out" disabled={zoom<=80} onClick={()=>setZoom(x=>Math.max(80,x-10))}><ZoomOutIcon size={16} aria-hidden="true"/></button>
            <span>{zoom}%</span>
            <button type="button" aria-label="Zoom in" disabled={zoom>=110} onClick={()=>setZoom(x=>Math.min(110,x+10))}><ZoomInIcon size={16} aria-hidden="true"/></button>
          </div>
          <button type="button" className="object-lab__reset" onClick={reset}><RefreshIcon size={16} aria-hidden="true"/> Reset</button>
        </div>
      </div>
      <aside className="object-lab__inspector" aria-label={spec.label+" properties"}>
        <div className="object-lab__inspector-intro"><span className="object-lab__eyebrow">MADE TO BE YOURS</span><h2>Make it yours<span>.</span></h2><p>Try a material. Change the words. See what happens.</p></div>
        {kind==="journal"&&<>
          <fieldset className="object-lab__group"><legend>Cover material</legend><div className="object-lab__choices">
            {(["sage","clay","midnight"] as const).map(t=><button type="button" key={t} aria-pressed={settings.journalTone===t} className={settings.journalTone===t?"is-active":""} onClick={()=>change("journalTone",t)}><i style={{background:tones[t]}}/>{t}</button>)}
          </div></fieldset>
          <div className="object-lab__group"><label>Cover title<input maxLength={30} value={settings.cover} onChange={e=>change("cover",e.target.value)}/></label></div>
          <div className="object-lab__group">
            <span className="object-lab__group-title">Write the page <small>PAGE {page+1} / {settings.pages.length}</small></span>
            <div className="object-lab__page-select">
              {settings.pages.map((_,i)=><button type="button" key={i} aria-pressed={page===i} className={page===i?"is-active":""} onClick={()=>{setPage(i);setJournalOpen(true)}}>{String(i+1).padStart(2,"0")}</button>)}
            </div>
            <label>Heading<input maxLength={46} value={settings.pages[page]?.title??""} onChange={e=>changePage("title",e.target.value)}/></label>
            <label>Body<textarea rows={4} maxLength={250} value={settings.pages[page]?.body??""} onChange={e=>changePage("body",e.target.value)}/></label>
          </div>
          <p className="object-lab__note">Use the arrows under the journal to turn pages, or choose a page here.</p>
        </>}
        {kind==="polaroid"&&<>
          <fieldset className="object-lab__group"><legend>Captured moment</legend><div className="object-lab__choices">
            {(["coast","sunset","garden"] as const).map(scene=><button key={scene} type="button" aria-pressed={settings.scene===scene} className={settings.scene===scene?"is-active":""} onClick={()=>change("scene",scene)}>{scene}</button>)}
          </div></fieldset>
          <fieldset className="object-lab__group"><legend>Photo paper</legend><div className="object-lab__choices">
            {(["ivory","cream"] as const).map(frame=><button key={frame} type="button" aria-pressed={settings.frame===frame} className={settings.frame===frame?"is-active":""} onClick={()=>change("frame",frame)}>{frame}</button>)}
          </div></fieldset>
          <div className="object-lab__group"><label>Caption<input maxLength={37} value={settings.caption} onChange={e=>change("caption",e.target.value)}/></label>
            <label>Back of the photo<input maxLength={30} value={settings.date} onChange={e=>change("date",e.target.value)}/></label>
          </div>
          <p className="object-lab__note">Developing is deliberate: the picture won't animate on its own. Flip to see the reverse.</p>
        </>}
        {kind==="sticky-note"&&<>
          <fieldset className="object-lab__group"><legend>Note paper</legend><div className="object-lab__choices object-lab__choices--four">
            {(["butter","mint","lilac","rose"] as const).map(t=><button key={t} type="button" aria-pressed={settings.stickyTone===t} className={settings.stickyTone===t?"is-active":""} onClick={()=>change("stickyTone",t)}><i style={{background:tones[t]}}/>{t}</button>)}
          </div></fieldset>
          <div className="object-lab__group"><label>What should it say?
            <textarea rows={5} maxLength={260} value={settings.note} onChange={e=>change("note",e.target.value)}/>
            <small>{settings.note.length}/260 characters</small>
          </label></div>
          <p className="object-lab__note">Peel to unlock. Move the paper by its top edge, or focus the handle and use arrow keys. Pin it to return home.</p>
        </>}
      </aside>
    </div>:view==="code"?<div className="object-lab__detail">
      <div><span className="object-lab__eyebrow">LIVE REACT SOURCE</span><h2>Take it into your project.</h2><p>Every control updates this real typed React example.</p></div>
      <pre><code>{code}</code></pre>
      <button type="button" onClick={copy}><CopyIcon size={15} aria-hidden="true"/> Copy React</button>
    </div>:<div className="object-lab__detail">
      <div><span className="object-lab__eyebrow">TYPED API</span><h2>Made for real projects.</h2><p>The component's configurable props, not website-only knobs.</p></div>
      <div className="object-lab__table-wrap"><table><thead><tr><th>Prop</th><th>Type</th><th>Purpose</th></tr></thead>
      <tbody>{propInfo[kind].map(([name,type,description])=><tr key={name}><td><code>{name}</code></td><td><code>{type}</code></td><td>{description}</td></tr>)}</tbody></table></div>
    </div>}
    <footer className="object-lab__footer"><span><i/> INTERACTIVE COMPONENT · EARLY ALPHA</span><span aria-live="polite">{copied==="error"?"Clipboard unavailable. Select code in the Code tab.":copied==="yes"?"React example copied.":"WORKSPACE PACKAGE · NOT YET ON NPM"}</span></footer>
  </section>;
}

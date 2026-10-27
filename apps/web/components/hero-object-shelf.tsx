import Link from "next/link";
import { ArrowUpRightIcon } from "./ui/icons";

/**
 * A tactile collection sampler, not a looping slideshow.
 * Every piece has a real destination and a corresponding playable component.
 */
const studies = [
  {href:"/components/journal",kind:"journal",label:"Journal",subtitle:"Turn the pages",number:"02"},
  {href:"/components/polaroid",kind:"polaroid",label:"Polaroid",subtitle:"Watch it develop",number:"03"},
  {href:"/components/sticky-note",kind:"sticky",label:"Sticky Note",subtitle:"Peel and place",number:"04"},
] as const;
export function HeroObjectShelf() {
  return <div className="hero-shelf" aria-label="Explore interactive objects">
    <div className="hero-shelf__eyebrow"><span aria-hidden="true">✳</span> THREE OBJECTS · READY TO TOUCH <span className="hero-shelf__rule"/></div>
    <nav className="hero-shelf__objects" aria-label="Interactive objects">
      {studies.map(({href,kind,label,subtitle,number})=>(
        <Link href={href} key={kind} className={"hero-shelf__object hero-shelf__object--"+kind}
          aria-label={label+": "+subtitle}>
          <span className="hero-shelf__drawing" aria-hidden="true">
            {kind==="journal"&&<span className="hero-shelf__book"><i/><strong>field<br/>notes.</strong><b>✳</b></span>}
            {kind==="polaroid"&&<span className="hero-shelf__photo"><i><b/><em/><small/></i><strong>remember this.</strong></span>}
            {kind==="sticky"&&<span className="hero-shelf__note"><strong>make<br/>something<br/>lovely.</strong><i/></span>}
          </span>
          <span className="hero-shelf__detail"><span><small>{number} / LIVE OBJECT</small><strong>{label}</strong><em>{subtitle}</em></span><ArrowUpRightIcon size={17} aria-hidden="true"/></span>
        </Link>
      ))}
    </nav>
  </div>;
}

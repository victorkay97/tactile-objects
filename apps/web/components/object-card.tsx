import Link from "next/link";
import type { ReactNode } from "react";
import { Envelope } from "@tactile/objects";
import type { ObjectEntry } from "../lib/objects";
import {
  ArrowUpRightIcon,
  MailIcon,
  BookIcon,
  CameraIcon,
  PaperIcon,
} from "./ui/icons";

const icons = {
  envelope: MailIcon,
  journal: BookIcon,
  polaroid: CameraIcon,
  sticky: PaperIcon,
};

/**
 * The same curated showcase appears in the homepage and catalog.
 * The live object is the real reusable React component; planned objects
 * remain honest, non-clickable material studies.
 */
export function ObjectCard({ object, featured = false }: { object: ObjectEntry; featured?: boolean }) {
  const Icon = icons[object.art];
  const isAvailable = object.status === "available";
  const content: ReactNode = (
    <>
      <div className="object-showcase__media">
        <div className="object-showcase__meta">
          <span>{object.id} / {object.collection.toUpperCase()}</span>
          <span className={isAvailable ? "object-showcase__status is-live" : "object-showcase__status"}>
            {isAvailable && <i aria-hidden="true" />}
            {isAvailable ? "TRY IT HERE" : "IN THE WORKSHOP"}
          </span>
        </div>

        {object.art === "envelope" && isAvailable ? (
          <div className="object-showcase__live-envelope" aria-label="Interactive envelope demonstration">
            <Envelope tone="clay" recipient="A curious mind" sender="— Tactile Objects">
              <h3>Worth opening.</h3>
              <p>Small moments make the web feel more human.</p>
            </Envelope>
          </div>
        ) : (
          <div className={"object-showcase__scene object-showcase__scene--" + object.art} aria-hidden="true">
            <div className="object-showcase__light" />
            {object.art === "journal" && (
              <>
                <span className="object-showcase__journal-underpage" />
                <div className="object-showcase__journal"><span className="object-showcase__journal-spine" /><span className="object-showcase__journal-mark" /><span className="object-showcase__journal-emboss">FIELD NOTES</span></div>
              </>
            )}
            {object.art === "polaroid" && (
              <>
                <span className="object-showcase__polaroid-back" />
                <div className="object-showcase__polaroid"><div className="object-showcase__polaroid-image"><span /></div><span className="object-showcase__polaroid-date">A MEMORY / 001</span></div>
              </>
            )}
            {object.art === "sticky" && <div className="object-showcase__sticky"><span /><i /><strong>remember<br />the little things.</strong></div>}
          </div>
        )}
        <span className="object-showcase__visual-caption">STUDY {object.id} / {object.name.toUpperCase()}</span>
      </div>

      <div className="object-showcase__info">
        <div>
          <span className="object-showcase__category"><Icon size={15} aria-hidden="true" /> {object.collection}</span>
          <h3>{isAvailable && object.href ? <Link href={object.href}>{object.name}</Link> : object.name}</h3>
          <p>{object.description}</p>
        </div>
        {isAvailable && object.href ? (
          <Link href={object.href} className="object-showcase__action" aria-label={"Explore " + object.name + " component documentation"}>
            <ArrowUpRightIcon size={19} aria-hidden="true" />
          </Link>
        ) : <span className="object-showcase__planned">PLANNED</span>}
      </div>
    </>
  );
  const className = "object-showcase object-showcase--" + object.palette
    + (featured ? " object-showcase--featured" : "")
    + (isAvailable ? " object-showcase--available" : "");
  return <article className={className}>{content}</article>;
}

import Link from "next/link";
import type { ReactNode } from "react";
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
 * Shared visual component for both the landing-page gallery and the catalog.
 * Each object has an explicit curated material palette; future objects can reuse
 * an established family rather than inventing a new arbitrary UI accent.
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
            {isAvailable ? "LIVE PREVIEW" : "IN THE WORKSHOP"}
          </span>
        </div>
        <div className={"object-showcase__scene object-showcase__scene--" + object.art} aria-hidden="true">
          <div className="object-showcase__light" />
          {object.art === "envelope" && <div className="object-showcase__envelope"><div className="object-showcase__envelope-paper" /><span className="object-showcase__envelope-back" /><span className="object-showcase__envelope-pocket" /><span className="object-showcase__envelope-flap" /><span className="object-showcase__envelope-seal" /></div>}
          {object.art === "journal" && <div className="object-showcase__journal"><span className="object-showcase__journal-spine" /><span className="object-showcase__journal-mark" /></div>}
          {object.art === "polaroid" && <div className="object-showcase__polaroid"><div className="object-showcase__polaroid-image"><span /></div></div>}
          {object.art === "sticky" && <div className="object-showcase__sticky"><span /><i /></div>}
        </div>
        <span className="object-showcase__visual-caption">FIG. {object.id} — {object.name.toUpperCase()}</span>
      </div>
      <div className="object-showcase__info">
        <div>
          <span className="object-showcase__category"><Icon size={15} aria-hidden="true" /> {object.collection}</span>
          <h3>{object.name}</h3>
          <p>{object.description}</p>
        </div>
        {isAvailable ? (
          <span className="object-showcase__action"><ArrowUpRightIcon size={19} aria-hidden="true" /></span>
        ) : <span className="object-showcase__planned">PLANNED</span>}
      </div>
    </>
  );
  const className = "object-showcase object-showcase--" + object.palette + (featured ? " object-showcase--featured" : "");
  return isAvailable && object.href ? (
    <Link href={object.href} className={className} aria-label={"Explore the " + object.name + " component"}>{content}</Link>
  ) : <article className={className}>{content}</article>;
}

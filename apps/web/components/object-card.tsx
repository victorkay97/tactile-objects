import Link from "next/link";
import type { ReactNode } from "react";
import { Envelope, Journal, Polaroid, StickyNote } from "@tactile/objects";
import type { ObjectEntry } from "../lib/objects";
import { ArrowUpRightIcon, MailIcon, BookIcon, CameraIcon, PaperIcon } from "./ui/icons";

const icons = {
  envelope: MailIcon,
  journal: BookIcon,
  polaroid: CameraIcon,
  sticky: PaperIcon,
};

/**
 * Actual, independently interactive React components live in the catalog.
 * The documentation link is separate from component controls: no nested links.
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
            {isAvailable ? "LIVE OBJECT" : "IN THE WORKSHOP"}
          </span>
        </div>
        {object.art === "envelope" && isAvailable && (
          <div className="object-showcase__live-envelope" aria-label="Interactive envelope demonstration">
            <Envelope tone="clay" recipient="A curious mind" sender="— Tactile Objects">
              <h3>Worth opening.</h3><p>Small moments make the web feel more human.</p>
            </Envelope>
          </div>
        )}
        {object.art === "journal" && isAvailable && (
          <div className="object-showcase__live-object object-showcase__live-object--journal" aria-label="Playable journal preview">
            <Journal coverTitle="Field Notes" tone="sage" />
          </div>
        )}
        {object.art === "polaroid" && isAvailable && (
          <div className="object-showcase__live-object object-showcase__live-object--polaroid" aria-label="Develop and flip the miniature photo">
            <Polaroid scene="coast" caption="somewhere quiet" />
          </div>
        )}
        {object.art === "sticky" && isAvailable && (
          <div className="object-showcase__live-object object-showcase__live-object--sticky" aria-label="Peel and move the miniature note">
            <StickyNote defaultText={"A little more\nfeeling."} tone="butter" />
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
          <Link href={object.href} className="object-showcase__action" aria-label={"Explore " + object.name + " playground"}>
            <ArrowUpRightIcon size={19} aria-hidden="true" />
          </Link>
        ) : <span className="object-showcase__planned">PLANNED</span>}
      </div>
    </>
  );
  return <article className={"object-showcase object-showcase--" + object.palette + (featured ? " object-showcase--featured" : "") + (isAvailable ? " object-showcase--available" : "")}>{content}</article>;
}

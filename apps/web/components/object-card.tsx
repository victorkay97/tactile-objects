import Link from "next/link";
import { Envelope, Journal, Polaroid, StickyNote } from "@tactile/objects";
import type { ObjectEntry } from "../lib/objects";

/**
 * One quiet, uniform visual frame for the collection and library.
 * The object is the artwork. The actual interactive components are rendered,
 * never screenshots or looping stand-ins.
 */
export function ObjectCard({ object, featured = false }: { object: ObjectEntry; featured?: boolean }) {
  const available = object.status === "available";
  return (
    <article className={"object-showcase tactile-card tactile-card--" + object.art + (featured ? " object-showcase--featured" : "")}>
      <div className="object-showcase__media tactile-card__media">
        <div className="tactile-card__preview">
          {object.art === "envelope" && available && (
            <div className="object-showcase__live-envelope" aria-label="Open the interactive Envelope">
              <Envelope tone="clay" recipient="A curious mind" sender="— Tactile Objects">
                <h3>Worth opening.</h3><p>Small moments make the web feel more human.</p>
              </Envelope>
            </div>
          )}
          {object.art === "journal" && available && (
            <div className="object-showcase__live-object object-showcase__live-object--journal" aria-label="Open and turn the Journal">
              <Journal coverTitle="Field Notes" tone="sage" />
            </div>
          )}
          {object.art === "polaroid" && available && (
            <div className="object-showcase__live-object object-showcase__live-object--polaroid" aria-label="Develop and flip a Polaroid">
              <Polaroid scene="coast" caption="somewhere quiet" />
            </div>
          )}
          {object.art === "sticky" && available && (
            <div className="object-showcase__live-object object-showcase__live-object--sticky" aria-label="Peel and move a Sticky Note">
              <StickyNote defaultText={"A little more\nfeeling."} tone="butter" />
            </div>
          )}
        </div>
      </div>
      <div className="object-showcase__info tactile-card__info">
        <div>
          <h3>{available && object.href ? <Link href={object.href}>{object.name}</Link> : object.name}</h3>
          <p>{object.description}</p>
        </div>
      </div>
    </article>
  );
}

"use client";

import { useId, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";

export type EnvelopeTone = "clay" | "sage" | "rose";

export interface EnvelopeProps {
  /** Content shown on the letter. */
  children?: ReactNode;
  /** Address printed on the front. */
  recipient?: string;
  /** Signature on the letter. */
  sender?: string;
  /** Envelope material palette. */
  tone?: EnvelopeTone;
  /** Initial uncontrolled state. */
  defaultOpen?: boolean;
  /** Controlled state. */
  open?: boolean;
  /** Called when the object is opened or closed. */
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * An interactive paper envelope with a folding flap and extractable note.
 * Import "@tactile/objects/styles.css" once in the consuming application.
 *
 * The flap completes its fold before the letter is extracted; closing reverses
 * that order. This is a stylized paper interaction, not a full physics engine.
 */
export function Envelope({
  children,
  recipient = "A curious mind",
  sender = "Tactile Objects",
  tone = "clay",
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  style,
}: EnvelopeProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const letterId = useId();

  function toggle() {
    const next = !isOpen;
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || isOpen) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--to-rotate-x", `${-y * 3}deg`);
    event.currentTarget.style.setProperty("--to-rotate-y", `${x * 4}deg`);
  }

  function onLeave(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--to-rotate-x");
    event.currentTarget.style.removeProperty("--to-rotate-y");
  }

  return (
    <div
      className={["to-envelope", className].filter(Boolean).join(" ")}
      data-state={isOpen ? "open" : "closed"}
      data-tone={tone}
      style={style}
    >
      <div className="to-envelope__scene">
        <div
          className="to-envelope__object"
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <div className="to-envelope__shadow" aria-hidden="true" />
          <div className="to-envelope__back" aria-hidden="true" />

          <article
            id={letterId}
            className="to-envelope__paper"
            aria-hidden={!isOpen}
            inert={!isOpen}
          >
            <div className="to-envelope__paper-rule" aria-hidden="true" />
            <span className="to-envelope__kicker">A LITTLE NOTE</span>
            <div className="to-envelope__message">
              {children ?? (
                <>
                  <h3>Made to feel a little more human.</h3>
                  <p>Some things are better when you can actually interact with them.</p>
                </>
              )}
            </div>
            <span className="to-envelope__signature">{sender}</span>
          </article>

          <div className="to-envelope__flap" aria-hidden="true">
            <div className="to-envelope__flap-face" />
            <div className="to-envelope__wax"><span>t</span></div>
          </div>

          <div className="to-envelope__pocket" aria-hidden="true">
            <span className="to-envelope__side to-envelope__side--left" />
            <span className="to-envelope__side to-envelope__side--right" />
            <span className="to-envelope__bottom-fold" />
          </div>

          <div className="to-envelope__address" aria-hidden="true">
            <span>TO</span>
            <strong>{recipient}</strong>
          </div>

          <button
            type="button"
            className="to-envelope__trigger"
            aria-expanded={isOpen}
            aria-controls={letterId}
            aria-label={isOpen ? "Close envelope" : "Open envelope"}
            onClick={toggle}
          />
        </div>
      </div>

      <p className="to-envelope__instruction" aria-live="polite">
        <svg className="to-envelope__instruction-icon" aria-hidden="true" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <><path d="M9 5 4 10l5 5" /><path d="M4 10h10a6 6 0 0 1 0 12" /></>
          ) : (
            <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>
          )}
        </svg>
        {isOpen ? "Click the envelope to close" : "Click the envelope to open"}
      </p>
    </div>
  );
}

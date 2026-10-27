"use client";

import { useId, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";

export type EnvelopeTone = "clay" | "sage" | "rose";

export interface EnvelopeProps {
  /** The contents of the letter. Keep interactive content near the top of the paper. */
  children?: ReactNode;
  /** The name printed on the front of the envelope. */
  recipient?: string;
  /** Signature displayed inside the letter. */
  sender?: string;
  /** Paper and envelope material palette. */
  tone?: EnvelopeTone;
  /** Initial state when open is not controlled. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Called when an interaction requests a new state. */
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * A stylized envelope with a 3D-folding flap and an emerging letter.
 *
 * Version 0 is a visual interaction prototype, not a physical simulation.
 * Import @tactile/objects/styles.css in your application.
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

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    event.currentTarget.style.setProperty("--to-tilt-x", String(-y * 3) + "deg");
    event.currentTarget.style.setProperty("--to-tilt-y", String(x * 4) + "deg");
  }

  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--to-tilt-x");
    event.currentTarget.style.removeProperty("--to-tilt-y");
  }

  return (
    <div
      className={["to-envelope", className].filter(Boolean).join(" ")}
      data-open={isOpen ? "true" : "false"}
      data-tone={tone}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={style}
    >
      <div className="to-envelope__scene">
        <div className="to-envelope__stage">
          <div className="to-envelope__back" aria-hidden="true" />
          <div className="to-envelope__flap" aria-hidden="true" />
          <article
            id={letterId}
            className="to-envelope__letter"
            aria-hidden={!isOpen}
            inert={!isOpen}
          >
            <span className="to-envelope__eyebrow">A note for you</span>
            <div className="to-envelope__content">
              {children ?? (
                <>
                  <h3>Some things deserve to be opened.</h3>
                  <p>Not everything on the web has to feel flat.</p>
                </>
              )}
            </div>
            <span className="to-envelope__signature">{sender}</span>
          </article>
          <div className="to-envelope__pocket" aria-hidden="true">
            <span className="to-envelope__crease to-envelope__crease--left" />
            <span className="to-envelope__crease to-envelope__crease--right" />
          </div>
          <div className="to-envelope__address" aria-hidden="true">To: {recipient}</div>
          <div className="to-envelope__seal" aria-hidden="true">t.</div>
          <button
            className="to-envelope__trigger"
            type="button"
            aria-expanded={isOpen}
            aria-controls={letterId}
            aria-label={isOpen ? "Close envelope" : "Open envelope"}
            onClick={toggle}
          />
        </div>
      </div>
      <p className="to-envelope__hint" aria-live="polite">
        {isOpen ? "A little note, just for you." : "Tap the envelope to open it."}
      </p>
    </div>
  );
}

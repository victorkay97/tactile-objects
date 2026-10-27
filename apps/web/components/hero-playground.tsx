"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, MouseEvent, KeyboardEvent } from "react";
import { ArrowUpRightIcon, RefreshIcon, SparklesIcon } from "./ui/icons";

type SpecimenKind = "memo" | "card";

interface DragSession {
  pointerId: number;
  startX: number;
  startY: number;
  travelled: boolean;
}

function PlayableSpecimen({ kind }: { kind: SpecimenKind }) {
  const object = useRef<HTMLButtonElement>(null);
  const draggingRef = useRef<DragSession | null>(null);
  const returnFrame = useRef<number | null>(null);
  const nudgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => () => {
    if (returnFrame.current !== null) cancelAnimationFrame(returnFrame.current);
    if (nudgeTimer.current !== null) clearTimeout(nudgeTimer.current);
  }, []);

  function setPosition(x: number, y: number, turn: number) {
    const node = object.current;
    if (!node) return;
    node.style.setProperty("--drag-x", `${x}px`);
    node.style.setProperty("--drag-y", `${y}px`);
    node.style.setProperty("--drag-angle", `${turn}deg`);
  }

  function startDrag(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (returnFrame.current !== null) cancelAnimationFrame(returnFrame.current);
    if (nudgeTimer.current !== null) clearTimeout(nudgeTimer.current);
    suppressClick.current = false;
    draggingRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, travelled: false };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function drag(event: PointerEvent<HTMLButtonElement>) {
    const active = draggingRef.current;
    if (!active || active.pointerId !== event.pointerId) return;
    const x = event.clientX - active.startX;
    const y = event.clientY - active.startY;
    if (Math.hypot(x, y) > 7) active.travelled = true;

    // Keep the paper near the visitor's pointer, within a generous safe range.
    const maxX = Math.min(window.innerWidth * 0.48, 590);
    const maxY = Math.min(window.innerHeight * 0.45, 380);
    const dx = Math.max(-maxX, Math.min(maxX, x));
    const dy = Math.max(-maxY, Math.min(maxY, y));
    const rotation = Math.max(-12, Math.min(12, dx * 0.028));
    setPosition(dx, dy, rotation);
  }

  function finishDrag(event?: PointerEvent<HTMLButtonElement>) {
    const active = draggingRef.current;
    if (!active) return;
    draggingRef.current = null;
    suppressClick.current = active.travelled;
    setDragging(false);
    // Animate only after React has removed the drag-mode class.
    returnFrame.current = requestAnimationFrame(() => setPosition(0, 0, 0));
    if (event?.currentTarget.hasPointerCapture(active.pointerId)) {
      event.currentTarget.releasePointerCapture(active.pointerId);
    }
  }

  function activate(event: MouseEvent<HTMLButtonElement>) {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    if (kind === "card") {
      setFlipped(current => !current);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPosition(0, -13, -4);
    if (nudgeTimer.current !== null) clearTimeout(nudgeTimer.current);
    nudgeTimer.current = setTimeout(() => setPosition(0, 0, 0), 170);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "Escape") return;
    setFlipped(false);
    setPosition(0, 0, 0);
  }

  const label = kind === "memo"
    ? "Paper memo. Drag it, release it and it returns to its position."
    : `Specimen card. Drag and release to return it, or activate it to ${flipped ? "show the front" : "flip it over"}.`;

  return (
    <div className={`specimen-position specimen-position--${kind}`}>
      <button
        ref={object}
        type="button"
        className={`specimen specimen--${kind}${dragging ? " is-dragging" : ""}${flipped ? " is-flipped" : ""}`}
        style={{ "--drag-x": "0px", "--drag-y": "0px", "--drag-angle": "0deg" } as CSSProperties}
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={() => { if (draggingRef.current) finishDrag(); }}
        onClick={activate}
        onKeyDown={handleKeyDown}
        aria-label={label}
        aria-pressed={kind === "card" ? flipped : undefined}
      >
        <span className="specimen__depth">
          {kind === "memo" ? (
            <span className="specimen__surface specimen__memo">
              <span className="specimen__paper-grain" aria-hidden="true" />
              <span className="specimen__tape" aria-hidden="true" />
              <span className="specimen__micro">A LITTLE REMINDER / 001</span>
              <span className="specimen__scribble">Ideas are<br /><i>meant to move.</i></span>
              <span className="specimen__rule" />
              <span className="specimen__signature">made to be felt <SparklesIcon size={13} aria-hidden="true" /></span>
              <span className="specimen__fold" aria-hidden="true" />
            </span>
          ) : (
            <span className="specimen__rotator">
              <span className="specimen__surface specimen__card-front">
                <span className="specimen__paper-grain" aria-hidden="true" />
                <span className="specimen__index">T.O. / STUDY Nº 02</span>
                <span className="specimen__card-icon"><SparklesIcon size={32} aria-hidden="true" /></span>
                <strong>Curiosity<br />is a feature.</strong>
                <span className="specimen__reverse-label">TURN ME OVER <ArrowUpRightIcon size={13} aria-hidden="true" /></span>
              </span>
              <span className="specimen__surface specimen__card-back">
                <span className="specimen__paper-grain" aria-hidden="true" />
                <span className="specimen__index">A NOTE FROM THE WORKSHOP</span>
                <span className="specimen__back-message">The internet should feel a little more <i>human.</i></span>
                <span className="specimen__reverse-label">ONE MORE TURN <RefreshIcon size={14} aria-hidden="true" /></span>
              </span>
            </span>
          )}
        </span>
      </button>
      <span className="specimen-position__hint" aria-hidden="true">
        {kind === "memo" ? "PICK UP & RELEASE" : "DRAG OR FLIP"}
      </span>
    </div>
  );
}

export function HeroPlayground() {
  return (
    <div className="hero-playground">
      <PlayableSpecimen kind="memo" />
      <PlayableSpecimen kind="card" />
    </div>
  );
}

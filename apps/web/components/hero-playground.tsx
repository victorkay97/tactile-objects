"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, MouseEvent } from "react";

type PaperKind = "letter" | "note";

interface DragSession {
  pointerId: number;
  originX: number;
  originY: number;
}

function DraggablePaper({ kind }: { kind: PaperKind }) {
  const paperRef = useRef<HTMLButtonElement>(null);
  const session = useRef<DragSession | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => () => {
    if (timer.current !== null) clearTimeout(timer.current);
  }, []);

  function moveTo(x: number, y: number, angle: number) {
    const node = paperRef.current;
    if (!node) return;
    node.style.setProperty("--paper-x", x + "px");
    node.style.setProperty("--paper-y", y + "px");
    node.style.setProperty("--paper-turn", angle + "deg");
  }

  function release(event?: PointerEvent<HTMLButtonElement>) {
    if (!session.current) return;
    const pointerId = session.current.pointerId;
    session.current = null;
    setDragging(false);
    moveTo(0, 0, 0);
    if (event?.currentTarget.hasPointerCapture(pointerId)) {
      event.currentTarget.releasePointerCapture(pointerId);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (timer.current) clearTimeout(timer.current);
    session.current = {
      pointerId: event.pointerId,
      originX: event.clientX,
      originY: event.clientY,
    };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    const active = session.current;
    if (!active || active.pointerId !== event.pointerId) return;
    const maxX = Math.min(window.innerWidth * 0.46, 560);
    const maxY = Math.min(window.innerHeight * 0.4, 320);
    const x = Math.max(-maxX, Math.min(maxX, event.clientX - active.originX));
    const y = Math.max(-maxY, Math.min(maxY, event.clientY - active.originY));
    const tilt = Math.max(-11, Math.min(11, x * 0.027));
    moveTo(x, y, tilt);
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    // Keyboard and assistive-technology activation should be playful too.
    if (event.detail !== 0 || session.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    moveTo(kind === "letter" ? 17 : -17, -13, kind === "letter" ? 5 : -5);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => moveTo(0, 0, 0), 210);
  }

  return (
    <div className={"hero-paper-slot hero-paper-slot--" + kind}>
      <button
        ref={paperRef}
        type="button"
        className={"hero-play-paper hero-play-paper--" + kind + (dragging ? " is-dragging" : "")}
        style={{ "--paper-x": "0px", "--paper-y": "0px", "--paper-turn": "0deg" } as CSSProperties}
        aria-label={kind === "letter"
          ? "Folded paper. Drag it around and release to let it spring back, or press Enter to nudge."
          : "Little paper note. Drag it around and release to let it spring back, or press Enter to nudge."}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={() => { if (session.current) { session.current = null; setDragging(false); moveTo(0, 0, 0); } }}
        onClick={handleClick}
      >
        <span className="hero-play-paper__grain" aria-hidden="true" />
        {kind === "letter" ? (
          <>
            <span className="hero-play-paper__small-label" aria-hidden="true">AN IDEA, UNFOLDED</span>
            <span className="hero-play-paper__lines" aria-hidden="true"><i /><i /><i /></span>
            <span className="hero-play-paper__fold" aria-hidden="true" />
          </>
        ) : (
          <>
            <span className="hero-play-paper__pin" aria-hidden="true" />
            <span className="hero-play-paper__scribble" aria-hidden="true"><i /><i /><i /></span>
            <span className="hero-play-paper__corner" aria-hidden="true" />
          </>
        )}
      </button>
      <span className="hero-paper-slot__hint" aria-hidden="true">DRAG &amp; RELEASE</span>
    </div>
  );
}

/** Interactive scene is optional enhancement: hero copy always stays real HTML. */
export function HeroPlayground() {
  return (
    <div className="hero-playground">
      <DraggablePaper kind="letter" />
      <DraggablePaper kind="note" />
    </div>
  );
}

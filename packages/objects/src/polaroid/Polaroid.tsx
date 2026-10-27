"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

export type PolaroidScene = "coast" | "sunset" | "garden";
export type PolaroidFrame = "ivory" | "cream";
export interface PolaroidProps {
  caption?: string;
  date?: string;
  scene?: PolaroidScene;
  frame?: PolaroidFrame;
  /** Photo starts undeveloped unless overridden. */
  defaultDeveloped?: boolean;
  developed?: boolean;
  onDevelopChange?: (developed: boolean) => void;
  defaultFlipped?: boolean;
  flipped?: boolean;
  onFlipChange?: (flipped: boolean) => void;
  className?: string;
  style?: CSSProperties;
}
/**
 * A tangible instant photograph. It develops once when prompted, and the card
 * can be flipped to read the handwriting on the reverse.
 */
export function Polaroid({
  caption = "a moment worth keeping", date = "OCT · 2026",
  scene = "coast", frame = "ivory", defaultDeveloped = false, developed,
  onDevelopChange, defaultFlipped = false, flipped, onFlipChange, className, style,
}: PolaroidProps) {
  const [internalDeveloped, setInternalDeveloped] = useState(defaultDeveloped);
  const [internalFlipped, setInternalFlipped] = useState(defaultFlipped);
  const isDeveloped = developed ?? internalDeveloped;
  const isFlipped = flipped ?? internalFlipped;
  const setDeveloped = (value: boolean) => {
    if (developed === undefined) setInternalDeveloped(value);
    onDevelopChange?.(value);
  };
  const setFlipped = (value: boolean) => {
    if (flipped === undefined) setInternalFlipped(value);
    onFlipChange?.(value);
  };
  const reset = () => {
    setFlipped(false);
    setDeveloped(false);
  };
  return (
    <div className={["to-polaroid",className].filter(Boolean).join(" ")} data-scene={scene} data-frame={frame} data-developed={isDeveloped} data-flipped={isFlipped} style={style}>
      <div className="to-polaroid__scene">
        <div className="to-polaroid__cast-shadow" aria-hidden="true" />
        <div className="to-polaroid__card">
          <div className="to-polaroid__front">
            <div className="to-polaroid__picture">
              <div className="to-polaroid__picture-content" role="img" aria-label={`Illustrated ${scene} landscape`}>
                <span className="to-polaroid__sun" />
                <span className="to-polaroid__far" />
                <span className="to-polaroid__near" />
                <span className="to-polaroid__detail" />
              </div>
              <div className="to-polaroid__developer" aria-hidden="true" />
            </div>
            <span className="to-polaroid__front-caption">{caption}</span>
          </div>
          <div className="to-polaroid__back">
            <span>THE MOMENTS WE KEEP</span>
            <strong>{caption}</strong>
            <i aria-hidden="true">✳</i>
            <span>{date}</span>
          </div>
        </div>
      </div>
      <div className="to-polaroid__controls" aria-label="Instant photo controls">
        <button type="button" className="to-polaroid__primary" onClick={() => isDeveloped ? reset() : setDeveloped(true)}>
          {isDeveloped ? "Develop again" : "Develop photo"}
        </button>
        <button type="button" className="to-polaroid__secondary" aria-pressed={isFlipped} onClick={() => setFlipped(!isFlipped)}>
          {isFlipped ? "Show front" : "Flip photo"}
        </button>
      </div>
      <p className="to-polaroid__hint" aria-live="polite">{isFlipped ? "A memory on the back." : isDeveloped ? "The picture is ready to keep." : "A picture, waiting to appear."}</p>
    </div>
  );
}

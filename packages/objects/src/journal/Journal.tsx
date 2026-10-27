"use client";

import { useId, useState } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

export type JournalTone = "sage" | "clay" | "midnight";
export type JournalPage = { title: string; body: string; eyebrow?: string };
export const DEFAULT_JOURNAL_PAGES: JournalPage[] = [
  { eyebrow: "01 / BEGINNINGS", title: "A little field note.", body: "Some ideas deserve a place to grow. Start small. Follow what feels interesting." },
  { eyebrow: "02 / OBSERVATIONS", title: "Look a little closer.", body: "An ordinary afternoon can contain extraordinary details. Notice the quiet parts." },
  { eyebrow: "03 / REMINDERS", title: "Make room for wonder.", body: "A good notebook keeps the moments you might otherwise forget." },
];
export interface JournalProps {
  /** The actual pages inside the book. */
  pages?: JournalPage[];
  /** Title embossed on the hardcover. */
  coverTitle?: string;
  /** Hardcover material colour. */
  tone?: JournalTone;
  /** Initially opened, when not controlled. */
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Zero-based page index. */
  defaultPage?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  style?: CSSProperties;
}
function clamp(value: number, count: number) {
  return Math.min(Math.max(0, Math.floor(Number.isFinite(value) ? value : 0)), count - 1);
}
/** A physical-feeling hardcover with a turnable page leaf, real content, and full keyboard controls. */
export function Journal({
  pages = DEFAULT_JOURNAL_PAGES, coverTitle = "Field Notes", tone = "sage",
  defaultOpen = false, open, onOpenChange,
  defaultPage = 0, page, onPageChange, className, style,
}: JournalProps) {
  const pagesToShow = pages.length ? pages : DEFAULT_JOURNAL_PAGES;
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const [localPage, setLocalPage] = useState(defaultPage);
  const isOpen = open ?? localOpen;
  const index = clamp(page ?? localPage, pagesToShow.length);
  const active = pagesToShow[index];
  const id = useId();
  const setBookOpen = (value: boolean) => {
    if (open === undefined) setLocalOpen(value);
    onOpenChange?.(value);
  };
  const turn = (direction: number) => {
    const next = clamp(index + direction, pagesToShow.length);
    if (next === index) return;
    if (page === undefined) setLocalPage(next);
    onPageChange?.(next);
  };
  const onKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight") { event.preventDefault(); turn(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); turn(-1); }
  };
  return (
    <div className={["to-journal",className].filter(Boolean).join(" ")} data-tone={tone} data-state={isOpen ? "open" : "closed"} style={style}>
      <div className="to-journal__scene" onKeyDown={onKeyboard}>
        <div className="to-journal__shadow" aria-hidden="true" />
        <div className="to-journal__book">
          <div className="to-journal__page-stack" aria-hidden="true" />
          <div className="to-journal__inner" id={id} inert={!isOpen}>
            <div className="to-journal__left">
              <div className="to-journal__left-label">THE LITTLE THINGS</div>
              <span className="to-journal__left-ornament" aria-hidden="true">✳</span>
              <div className="to-journal__left-footer">EST. IN CURIOSITY<br />VOL. 001</div>
            </div>
            <div key={index} className="to-journal__leaf" role="group" aria-label={`Page ${index + 1} of ${pagesToShow.length}`}>
              <span className="to-journal__eyebrow">{active.eyebrow || `PAGE ${String(index + 1).padStart(2,"0")}`}</span>
              <h3>{active.title}</h3>
              <p>{active.body}</p>
              <span className="to-journal__leaf-number">{String(index + 1).padStart(2,"0")} <i /> {String(pagesToShow.length).padStart(2,"0")}</span>
            </div>
          </div>
          <div className="to-journal__cover" aria-hidden="true">
            <span className="to-journal__binding" />
            <span className="to-journal__emboss">TO / OBJECTS</span>
            <strong>{coverTitle}</strong>
            <span className="to-journal__cover-mark">✳</span>
            <span className="to-journal__edition">A PLACE FOR SMALL THOUGHTS</span>
          </div>
        </div>
      </div>
      <div className="to-journal__controls">
        <button type="button" className="to-journal__main-action" onClick={() => setBookOpen(!isOpen)} aria-expanded={isOpen} aria-controls={id}>
          {isOpen ? "Close journal" : "Open journal"}
        </button>
        <div className="to-journal__paging" aria-label="Journal navigation">
          <button type="button" disabled={!isOpen || index === 0} onClick={() => turn(-1)} aria-label="Previous page">←</button>
          <span aria-live="polite">{String(index + 1).padStart(2,"0")} / {String(pagesToShow.length).padStart(2,"0")}</span>
          <button type="button" disabled={!isOpen || index >= pagesToShow.length - 1} onClick={() => turn(1)} aria-label="Next page">→</button>
        </div>
      </div>
      <p className="to-journal__hint">Open it. Turn a page. Keep a thought.</p>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { objects } from "../lib/objects";

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const searchItems = [
    ...objects.filter(item => item.href).map(item => ({ label: item.name, detail: "Interactive object", href: item.href! })),
    { label: "Documentation", detail: "Guides", href: "/docs" },
    { label: "Getting started", detail: "Guides", href: "/docs/getting-started" },
    { label: "About Tactile Objects", detail: "Project", href: "/about" },
  ];
  const results = searchItems.filter(item => (item.label + " " + item.detail).toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(value => !value);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => input.current?.focus());
    }
  }, [open]);

  return <>
    <button className="ref-icon-button ref-search-trigger" type="button" aria-label="Search components" title="Search (Ctrl+K)" onClick={() => setOpen(true)}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="10.7" cy="10.7" r="6.8"/><path d="m16 16 4.5 4.5"/></svg>
    </button>
    {open && <div className="ref-search-overlay" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="ref-search-dialog" role="dialog" aria-modal="true" aria-label="Search Tactile Objects">
        <div className="ref-search-input-row">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg>
          <input ref={input} aria-label="Search objects and documentation" placeholder="Search objects and docs..." value={query} onChange={e => setQuery(e.target.value)} />
          <button type="button" onClick={() => setOpen(false)} aria-label="Close search">Esc</button>
        </div>
        <div className="ref-search-results">
          {results.length ? results.map(item => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
            <span>{item.label}</span><small>{item.detail} ↗</small>
          </Link>) : <p>No results found.</p>}
        </div>
        <div className="ref-search-foot">Browse the interactive library or jump directly to documentation.</div>
      </section>
    </div>}
  </>;
}

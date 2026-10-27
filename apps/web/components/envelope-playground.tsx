"use client";

import { ArrowUpRightIcon, RefreshIcon, CopyIcon, CheckIcon, SparklesIcon } from "./ui/icons";

import { useState } from "react";
import { Envelope } from "@tactile/objects";
import type { EnvelopeTone } from "@tactile/objects";

type Tab = "preview" | "code" | "props";

const tones: { name: string; value: EnvelopeTone; color: string }[] = [
  { name: "Sandstone", value: "clay", color: "#cda381" },
  { name: "Sage", value: "sage", color: "#a1b29e" },
  { name: "Blush", value: "rose", color: "#d2aaa6" },
];

const propRows = [
  ["tone", '"clay" | "sage" | "rose"', '"clay"', "Envelope material palette."],
  ["recipient", "string", '"A curious mind"', "Address printed on the front."],
  ["sender", "string", '"Tactile Objects"', "Letter signature."],
  ["children", "ReactNode", "Default note", "The contents of the letter."],
  ["open", "boolean", "undefined", "Controlled open state."],
  ["defaultOpen", "boolean", "false", "Initial uncontrolled state."],
  ["onOpenChange", "(open: boolean) => void", "—", "Called when opening or closing."],
  ["className", "string", "undefined", "Optional wrapper class."],
  ["style", "CSSProperties", "undefined", "Optional wrapper styles."],
];

export function EnvelopePlayground() {
  const [tone, setTone] = useState<EnvelopeTone>("clay");
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("preview");
  const [copied, setCopied] = useState(false);

  const code = [
    'import { Envelope } from "@tactile/objects";',
    'import "@tactile/objects/styles.css";',
    "",
    "export default function Note() {",
    "  return (",
    '    <Envelope tone="' + tone + '" recipient="A curious mind">',
    "      <h3>A little more magic, please.</h3>",
    "      <p>The web can feel more human.</p>",
    "    </Envelope>",
    "  );",
    "}",
  ].join("\n");

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <div className="docs-playground">
        <div className="docs-playground-toolbar">
          <div role="tablist" aria-label="Component playground" className="docs-tabs">
            {(["preview", "code", "props"] as const).map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                id={"docs-tab-" + item}
                aria-selected={tab === item}
                aria-controls={"docs-panel-" + item}
                className={tab === item ? "docs-tab active" : "docs-tab"}
                onClick={() => setTab(item)}
              >
                {item[0].toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
          <span className="docs-live-pill"><i /> INTERACTIVE DEMO</span>
        </div>

        {tab === "preview" && (
          <div className="docs-preview" id="docs-panel-preview" role="tabpanel" aria-labelledby="docs-tab-preview">
            <span className="preview-coordinate preview-coordinate--top">FIG. 001 / THE ENVELOPE</span>
            <div className="preview-envelope">
              <Envelope
                tone={tone}
                open={open}
                onOpenChange={setOpen}
                recipient="A curious mind"
                sender="— Tactile Objects"
              >
                <h3>A little more magic, please.</h3>
                <p>The web can feel more human.</p>
              </Envelope>
            </div>
            <span className="preview-coordinate preview-coordinate--bottom">CLICK TO {open ? "CLOSE" : "OPEN"} <ArrowUpRightIcon size={15} aria-hidden="true" /></span>
          </div>
        )}

        {tab === "code" && (
          <div className="docs-code-pane" id="docs-panel-code" role="tabpanel" aria-labelledby="docs-tab-code">
            <div className="code-pane-title">Envelope.tsx <button type="button" onClick={copyCode}>{copied ? <><CheckIcon size={15} aria-hidden="true" /> Copied</> : <><CopyIcon size={15} aria-hidden="true" /> Copy code</>}</button></div>
            <pre><code>{code}</code></pre>
          </div>
        )}

        {tab === "props" && (
          <div className="docs-props-pane" id="docs-panel-props" role="tabpanel" aria-labelledby="docs-tab-props">
            <table>
              <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>{propRows.map(([name, type, fallback, description]) => (
                <tr key={name}><td><code>{name}</code></td><td><code>{type}</code></td><td><code>{fallback}</code></td><td>{description}</td></tr>
              ))}</tbody>
            </table>
          </div>
        )}

        <div className="docs-controls">
          <div className="docs-control-group"><span>COLORWAY</span><div className="docs-swatches">{tones.map(item => (
            <button
              key={item.value}
              type="button"
              className={item.value === tone ? "swatch active" : "swatch"}
              onClick={() => setTone(item.value)}
              aria-label={"Use " + item.name + " envelope"}
              aria-pressed={tone === item.value}
              title={item.name}
            ><i style={{ backgroundColor: item.color }} /></button>
          ))}</div><strong>{tones.find(item => item.value === tone)?.name}</strong></div>
          <button type="button" className="reset-control" onClick={() => setOpen(false)}><RefreshIcon size={16} aria-hidden="true" /> Reset</button>
        </div>
      </div>
      <div className="docs-notice"><span><SparklesIcon size={22} aria-hidden="true" /></span><p><strong>Early prototype.</strong> This component is still being refined. The motion, material fidelity, and interaction API may change before release.</p></div>
      <section className="docs-usage" id="usage">
        <span className="section-label">MAKE IT YOURS</span>
        <h2>Use it in your project.</h2>
        <p>Import the component and stylesheet from the local workspace package. It accepts your own React content and provides both controlled and uncontrolled interaction state.</p>
        <div className="docs-usage-code">
          <div className="code-pane-title">React / TSX <button type="button" onClick={copyCode}>{copied ? <><CheckIcon size={15} aria-hidden="true" /> Copied</> : <><CopyIcon size={15} aria-hidden="true" /> Copy code</>}</button></div>
          <pre><code>{code}</code></pre>
        </div>
        <p className="docs-usage-foot">This package is currently available only inside the repository workspace. It has not been published to npm.</p>
      </section>
    </>
  );
}

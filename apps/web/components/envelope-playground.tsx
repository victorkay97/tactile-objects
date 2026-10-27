"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Envelope } from "@tactile/objects";
import type { EnvelopePaper, EnvelopeSeal, EnvelopeTone } from "@tactile/objects";
import {
  ArrowUpRightIcon, RefreshIcon, CopyIcon, CheckIcon, SparklesIcon,
  DotGridIcon, ZoomInIcon, ZoomOutIcon, MailIcon, CodeIcon, PlaygroundIcon,
} from "./ui/icons";

type View = "preview" | "code" | "props";
type Preset = "hello" | "thankyou" | "personal" | "custom";
type Config = {
  tone: EnvelopeTone;
  paper: EnvelopePaper;
  seal: EnvelopeSeal;
  recipient: string;
  sender: string;
  heading: string;
  message: string;
};

const initial: Config = {
  tone: "clay",
  paper: "ivory",
  seal: "wax",
  recipient: "A curious mind",
  sender: "Tactile Objects",
  heading: "A little more magic, please.",
  message: "The web can feel more human.",
};

const presets: { id: Exclude<Preset, "custom">; label: string; values: Config }[] = [
  { id: "hello", label: "Hello", values: initial },
  { id: "thankyou", label: "Thank you", values: {
    tone: "sage", paper: "white", seal: "wax", recipient: "You, of course",
    sender: "With gratitude", heading: "A small thank you.",
    message: "For the little things that mean so much.",
  }},
  { id: "personal", label: "Personal", values: {
    tone: "rose", paper: "ivory", seal: "none", recipient: "Someone special",
    sender: "With love", heading: "Just because.",
    message: "Some notes are better when they're personal.",
  }},
];

const tones: { value: EnvelopeTone; name: string; colour: string }[] = [
  { value: "clay", name: "Sandstone", colour: "#cba07d" },
  { value: "sage", name: "Sage", colour: "#a4b6a1" },
  { value: "rose", name: "Rose", colour: "#d5aca6" },
];

const props: [string, string, string, string][] = [
  ["tone", '"clay" | "sage" | "rose"', '"clay"', "Envelope material colour."],
  ["paper", '"ivory" | "white"', '"ivory"', "Visible letter paper finish."],
  ["seal", '"wax" | "none"', '"wax"', "Wax stamp on the folding flap."],
  ["recipient", "string", '"A curious mind"', "Address on the front."],
  ["sender", "string", '"Tactile Objects"', "Letter signature."],
  ["children", "ReactNode", "Default letter", "Your heading, copy, or React content."],
  ["open", "boolean", "undefined", "Controlled open state."],
  ["defaultOpen", "boolean", "false", "Initial uncontrolled state."],
  ["onOpenChange", "(open: boolean) => void", "—", "Open/close callback."],
  ["className", "string", "undefined", "Custom wrapper class."],
  ["style", "CSSProperties", "undefined", "Custom wrapper styles."],
];

function snippet(config: Config) {
  // JSON string expressions inside JSX preserve quotes and arbitrary user input.
  return [
    'import { Envelope } from "@tactile/objects";',
    'import "@tactile/objects/styles.css";',
    "",
    "export default function MyLetter() {",
    "  return (",
    '    <Envelope',
    `      tone=${JSON.stringify(config.tone)}`,
    `      paper=${JSON.stringify(config.paper)}`,
    `      seal=${JSON.stringify(config.seal)}`,
    `      recipient={${JSON.stringify(config.recipient)}}`,
    `      sender={${JSON.stringify(config.sender)}}`,
    "    >",
    `      <h3>{${JSON.stringify(config.heading)}}</h3>`,
    `      <p>{${JSON.stringify(config.message)}}</p>`,
    "    </Envelope>",
    "  );",
    "}",
  ].join("\n");
}

export function EnvelopePlayground() {
  const [settings, setSettings] = useState<Config>(initial);
  const [preset, setPreset] = useState<Preset>("hello");
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("preview");
  const [showDots, setShowDots] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const code = snippet(settings);

  useEffect(() => () => {
    if (copyTimer.current !== null) clearTimeout(copyTimer.current);
  }, []);

  function change<K extends keyof Config>(key: K, value: Config[K]) {
    setSettings(previous => ({ ...previous, [key]: value }));
    setPreset("custom");
    // Reveal what changed: paper and letter details live inside the note,
    // while the seal is visible on the envelope's closed flap.
    if (key === "paper" || key === "heading" || key === "message" || key === "sender") {
      setOpen(true);
    } else if (key === "seal") {
      setOpen(false);
    }
  }

  function applyPreset(id: Exclude<Preset, "custom">) {
    const next = presets.find(item => item.id === id);
    if (!next) return;
    setSettings({ ...next.values });
    setPreset(id);
    setOpen(false);
  }

  function reset() {
    setSettings({ ...initial });
    setPreset("hello");
    setOpen(false);
    setZoom(100);
    setShowDots(true);
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }
    if (copyTimer.current !== null) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyStatus("idle"), 2000);
  }

  return (
    <>
      <section className="workbench" aria-label="Envelope customization workbench">
        <header className="workbench__header">
          <div className="workbench__heading">
            <span className="workbench__heading-icon"><PlaygroundIcon size={18} aria-hidden="true" /></span>
            <div><strong>Object playground</strong><span>01 / ENVELOPE</span></div>
          </div>
          <div className="workbench__header-actions">
            <nav className="workbench__views" aria-label="Workbench views">
              {(["preview", "code", "props"] as const).map(item => (
                <button
                  key={item}
                  type="button"
                  className={view === item ? "workbench__view is-selected" : "workbench__view"}
                  aria-pressed={view === item}
                  onClick={() => setView(item)}
                >
                  {item === "preview" ? "Preview" : item === "code" ? "Code" : "Props"}
                </button>
              ))}
            </nav>
            <button className="workbench__copy" type="button" onClick={copyCode}>
              {copyStatus === "success" ? <CheckIcon size={16} aria-hidden="true" /> : <CopyIcon size={16} aria-hidden="true" />}
              <span>{copyStatus === "success" ? "Copied" : "Copy React"}</span>
            </button>
          </div>
        </header>

        {view === "preview" ? (
          <div className="workbench__columns">
            <div className="workbench__stage">
              <div className={showDots ? "workbench__canvas has-dots" : "workbench__canvas"} aria-label="Live interactive envelope preview">
                <div className="workbench__canvas-top">
                  <span>FIG. 001 <span className="workbench__top-sep">/</span> PAPER STUDY</span>
                  <span className="workbench__live"><i aria-hidden="true" /> LIVE COMPONENT</span>
                </div>
                <div className="workbench__envelope-frame" style={{ "--stage-zoom": zoom / 100 } as CSSProperties}>
                  <Envelope
                    tone={settings.tone}
                    paper={settings.paper}
                    seal={settings.seal}
                    recipient={settings.recipient}
                    sender={settings.sender}
                    open={open}
                    onOpenChange={setOpen}
                  >
                    <h3>{settings.heading}</h3>
                    <p>{settings.message}</p>
                  </Envelope>
                </div>
                <div className="workbench__canvas-bottom">
                  <span>{open ? "THE NOTE IS OPEN" : "A LITTLE NOTE, UNOPENED"}</span>
                  <span>INTERACT WITH THE OBJECT <ArrowUpRightIcon size={13} aria-hidden="true" /></span>
                </div>
              </div>
              <div className="workbench__stage-toolbar">
                <button type="button" className={showDots ? "workbench__tool is-on" : "workbench__tool"} aria-pressed={showDots} onClick={() => setShowDots(value => !value)} title="Toggle dotted preview canvas">
                  <DotGridIcon size={17} aria-hidden="true" /> <span>Dots</span>
                </button>
                <span className="workbench__toolbar-divider" />
                <div className="workbench__zoom" aria-label="Preview zoom">
                  <button type="button" aria-label="Zoom out" title="Zoom out" disabled={zoom <= 80} onClick={() => setZoom(value => Math.max(80, value - 10))}><ZoomOutIcon size={17} aria-hidden="true" /></button>
                  <span aria-live="off">{zoom}%</span>
                  <button type="button" aria-label="Zoom in" title="Zoom in" disabled={zoom >= 110} onClick={() => setZoom(value => Math.min(110, value + 10))}><ZoomInIcon size={17} aria-hidden="true" /></button>
                </div>
                <div className="workbench__stage-actions">
                  <button className="workbench__tool" type="button" onClick={() => setOpen(value => !value)}>
                    <MailIcon size={17} aria-hidden="true" /> <span>{open ? "Close letter" : "Open letter"}</span>
                  </button>
                  <button className="workbench__tool workbench__tool--reset" type="button" onClick={reset} title="Reset all settings and preview">
                    <RefreshIcon size={17} aria-hidden="true" /> <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>

            <aside className="workbench__inspector" aria-label="Envelope properties">
              <div className="workbench__inspector-intro"><span className="workbench__mini-label">MAKE IT YOURS</span><h2>Customize<span>.</span></h2><p>Change a detail. See it happen.</p></div>

              <fieldset className="workbench__group">
                <legend>Start with a feeling</legend>
                <div className="workbench__preset-row">
                  {presets.map(item => (
                    <button key={item.id} type="button" aria-pressed={preset === item.id} className={preset === item.id ? "workbench__preset is-selected" : "workbench__preset"} onClick={() => applyPreset(item.id)}>{item.label}</button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="workbench__group">
                <legend>Envelope colour</legend>
                <div className="workbench__swatches">
                  {tones.map(item => (
                    <button
                      key={item.value}
                      type="button"
                      className={settings.tone === item.value ? "workbench__swatch is-selected" : "workbench__swatch"}
                      aria-pressed={settings.tone === item.value}
                      onClick={() => change("tone", item.value)}
                    >
                      <span className="workbench__swatch-dot" style={{ background: item.colour }} aria-hidden="true" />{item.name}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="workbench__group">
                <legend>Paper finish</legend>
                <div className="workbench__option-row">
                  {(["ivory", "white"] as const).map(item => (
                    <button key={item} type="button" aria-pressed={settings.paper === item} className={settings.paper === item ? "workbench__option is-selected" : "workbench__option"} onClick={() => change("paper", item)}>{item === "ivory" ? "Warm ivory" : "Bright white"}</button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="workbench__group">
                <legend>Wax seal</legend>
                <div className="workbench__option-row">
                  {(["wax", "none"] as const).map(item => (
                    <button key={item} type="button" aria-pressed={settings.seal === item} className={settings.seal === item ? "workbench__option is-selected" : "workbench__option"} onClick={() => change("seal", item)}>{item === "wax" ? "With seal" : "No seal"}</button>
                  ))}
                </div>
              </fieldset>

              <div className="workbench__group workbench__group--fields">
                <span className="workbench__group-title">Write a little note</span>
                <label className="workbench__field">Recipient<input maxLength={45} value={settings.recipient} onChange={event => change("recipient", event.target.value)} /></label>
                <label className="workbench__field">Letter heading<input maxLength={60} value={settings.heading} onChange={event => change("heading", event.target.value)} /></label>
                <label className="workbench__field">Message
                  <textarea id="envelope-message" maxLength={160} rows={3} aria-describedby="envelope-message-help" value={settings.message} onChange={event => change("message", event.target.value)} />
                  <span className="workbench__field-help" id="envelope-message-help">
                    <span>Longer notes scroll inside the open letter.</span>
                    <span className="workbench__character-count">{settings.message.length}/160</span>
                  </span>
                </label>
                <label className="workbench__field">Signature<input maxLength={45} value={settings.sender} onChange={event => change("sender", event.target.value)} /></label>
              </div>
              <p className="workbench__inspector-foot"><SparklesIcon size={15} aria-hidden="true" /> Letter edits reveal the note; seal changes show the closed flap. Code stays in sync.</p>
            </aside>
          </div>
        ) : view === "code" ? (
          <div className="workbench__detail" aria-label="Generated React source">
            <div className="workbench__detail-header"><div><span className="workbench__mini-label">GENERATED FROM YOUR SETTINGS</span><h2>Take it with you.</h2></div><button type="button" className="workbench__detail-copy" onClick={copyCode}><CopyIcon size={16} aria-hidden="true" /> Copy code</button></div>
            <pre className="workbench__code"><code>{code}</code></pre>
            <p>This example uses the actual Envelope props and your current content. The package is available inside this repository workspace; an npm release is still planned.</p>
          </div>
        ) : (
          <div className="workbench__detail" aria-label="Envelope React properties">
            <div className="workbench__detail-header"><div><span className="workbench__mini-label">TYPED COMPONENT API</span><h2>Know every detail.</h2></div><CodeIcon size={21} aria-hidden="true" /></div>
            <div className="workbench__props-scroll"><table className="workbench__props"><thead><tr><th>Property</th><th>Type</th><th>Default</th><th>What it changes</th></tr></thead><tbody>{props.map(([name, type, defaultValue, description]) => <tr key={name}><td><code>{name}</code></td><td><code>{type}</code></td><td><code>{defaultValue}</code></td><td>{description}</td></tr>)}</tbody></table></div>
          </div>
        )}
        <footer className="workbench__footer">
          <div><span className="workbench__foot-dot" aria-hidden="true" /> LIVE REACT PREVIEW <span aria-hidden="true">/</span> NO PLACEHOLDER CONTROLS</div>
          <span aria-live="polite">{copyStatus === "error" ? "Clipboard unavailable. Select code in the Code tab." : copyStatus === "success" ? "React example copied." : "LOCAL WORKSPACE PACKAGE · EARLY ALPHA"}</span>
        </footer>
      </section>

      <div className="docs-notice"><span><SparklesIcon size={22} aria-hidden="true" /></span><p><strong>A real component, still being refined.</strong> Colour, paper, seal, letter content and open state use the actual Envelope API. Zoom and canvas dots change only your preview. The library is not yet published to npm.</p></div>
      <section className="docs-usage" id="usage">
        <span className="section-label">FOR THE MAKERS</span>
        <h2>From playground to project.</h2>
        <p>Every adjustment to the envelope is reflected in usable React code. Import the component and stylesheet from the local workspace, and put your own React content inside the letter.</p>
        <div className="docs-usage-code">
          <div className="code-pane-title">React / TSX <button type="button" onClick={copyCode}>{copyStatus === "success" ? <><CheckIcon size={15} aria-hidden="true" /> Copied</> : <><CopyIcon size={15} aria-hidden="true" /> Copy code</>}</button></div>
          <pre><code>{code}</code></pre>
        </div>
        <p className="docs-usage-foot">Workspace package only for now. Component props are typed, and keyboard and reduced-motion behaviours are supported.</p>
      </section>
    </>
  );
}

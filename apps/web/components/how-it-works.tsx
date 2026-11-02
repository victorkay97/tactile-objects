"use client";

import { useEffect, useState } from "react";

const steps = [
  {
    title: "Pick a component",
    description: "Browse the library and choose a familiar object. Every preview is the real, interactive component.",
    label: "library",
    lines: ["$ browse tactile-objects", "", "✓ Envelope", "✓ Journal", "✓ Polaroid", "✓ Sticky Note"],
  },
  {
    title: "Make it yours",
    description: "Adjust the materials, content, and interaction. Changes appear immediately in the live playground.",
    label: "playground",
    lines: ["// Envelope playground", "tone         clay", "paper        ivory", "seal         wax", "recipient    A curious mind", "", "✓ Live preview updated"],
  },
  {
    title: "Use the code",
    description: "Copy the matching React example. The components are available from the source workspace while npm publishing is being prepared.",
    label: "example.tsx",
    lines: ['import { Envelope } from "@tactile/objects";', "", "export default function Note() {", "  return (", '    <Envelope tone="clay">', "      Something worth opening.", "    </Envelope>", "  );", "}"],
  },
];

export function HowItWorks() {
  const [active,setActive] = useState(0);
  const [paused,setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActive(current => (current+1)%steps.length), 6500);
    return () => window.clearTimeout(timer);
  }, [active,paused]);
  return <div className="landing-split landing-how__content how-demo" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    <div className="how-demo__steps">
      {steps.map((step,index) => <button type="button" key={step.title}
        className={"how-demo__step"+(active===index?" is-active":"")}
        onClick={() => setActive(index)} aria-pressed={active===index}>
        <span className="how-demo__number">0{index+1}</span>
        <strong>{step.title}</strong>
        {active===index && <span className="how-demo__description">{step.description}</span>}
        {active===index && !paused && <span className="how-demo__progress" aria-hidden="true"/>}
      </button>)}
    </div>
    <div className="how-demo__terminal" aria-label={"Live demonstration: "+steps[active].title}>
      <div className="how-demo__chrome"><span className="how-demo__lights"><i/><i/><i/></span><span>{steps[active].label}</span></div>
      <div className="how-demo__surface" key={active}>
        {steps[active].lines.map((line,index) => <div key={index} className={"how-demo__line"+(!line?" is-blank":"")} style={{animationDelay:(index*120)+"ms"}}>{line || "\u00a0"}</div>)}
        <span className="how-demo__cursor" aria-hidden="true"/>
      </div>
    </div>
  </div>;
}

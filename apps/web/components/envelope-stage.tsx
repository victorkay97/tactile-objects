"use client";

import { useState } from "react";
import { Envelope } from "@tactile/objects";
import type { EnvelopeTone } from "@tactile/objects";

type EnvelopeStageProps = {
  variant?: "hero" | "feature";
  tone?: EnvelopeTone;
};

export function EnvelopeStage({ variant = "hero", tone = "clay" }: EnvelopeStageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={"envelope-stage envelope-stage--" + variant}>
      <div className="stage-orb stage-orb--one" aria-hidden="true" />
      <div className="stage-orb stage-orb--two" aria-hidden="true" />
      <span className="stage-corner stage-corner--top" aria-hidden="true">OBJECT NO. 001 / THE ENVELOPE</span>
      <span className="stage-corner stage-corner--bottom" aria-hidden="true">CRAFTED IN REACT ✳</span>
      <div className="stage-envelope">
        <Envelope
          tone={tone}
          open={isOpen}
          onOpenChange={setIsOpen}
          recipient="The curious"
          sender="— Tactile Objects"
        >
          <h3>A little more magic, please.</h3>
          <p>The internet can feel like something you can hold.</p>
        </Envelope>
      </div>
      <span className="stage-status" aria-hidden="true">{isOpen ? "OPENED" : "TRY ME"} <span>↗</span></span>
    </div>
  );
}

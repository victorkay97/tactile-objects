import Link from "next/link";
import { ArrowUpRightIcon } from "../../../components/ui/icons";

export const metadata={title:"Accessibility",description:"Accessibility expectations for Tactile Objects."};

export default function AccessibilityDocs() {
  return <main className="docs-article">
    <span className="docs-site__eyebrow">02 / GUIDE</span><h1>Accessibility<span className="docs-site__period">.</span></h1>
    <p className="docs-site__lead">Tactile interactions should still make sense when movement, pointers, or visual details aren't available. Accessibility is part of the component architecture.</p>
    <section><h2>Keyboard and focus</h2><p>Every meaningful interaction needs a keyboard path and visible focus. Envelope currently uses a native button with an accessible open/close label and <code>aria-expanded</code> state. Mouse and touch input must not be the only way to operate an object.</p></section>
    <section><h2>Reduced motion</h2><p>Animations should respect <code>prefers-reduced-motion: reduce</code>. The Envelope removes transition durations when that preference is enabled, instead of making content inaccessible.</p></section>
    <section><h2>Content and semantics</h2><p>Important text should remain real text rather than baked into an image. Decorative layers should be hidden from assistive technology. Controls need clear labels, and revealed content must not be keyboard-focusable when hidden.</p></section>
    <section><h2>Testing expectations</h2><p>We review keyboard navigation, touch interaction, screen-reader semantics, contrast, responsive layouts, and motion preferences. These are release criteria, not a claim that every future component has passed every audit already.</p></section>
    <div className="docs-site__next"><Link href="/docs/design-principles">Next: Design principles <ArrowUpRightIcon size={16} aria-hidden="true" /></Link></div>
  </main>;
}

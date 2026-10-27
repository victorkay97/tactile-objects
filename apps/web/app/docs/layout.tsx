import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, BookIcon, CodeIcon, CursorIcon, SparklesIcon } from "../../components/ui/icons";
import "./docs.css";

const nav = [
  {href: "/docs", label: "Overview", Icon: BookIcon},
  {href: "/docs/getting-started", label: "Getting started", Icon: CodeIcon},
  {href: "/docs/accessibility", label: "Accessibility", Icon: CursorIcon},
  {href: "/docs/design-principles", label: "Design principles", Icon: SparklesIcon},
];

export default function DocsLayout({children}: {children: ReactNode}) {
  return (
    <div className="docs-site">
      <div className="layout-container docs-site__grid">
        <aside className="docs-site__sidebar" aria-label="Documentation navigation">
          <div className="docs-site__sidebar-title">DOCUMENTATION <span>VOL. 001</span></div>
          <nav className="docs-site__nav">{nav.map(({href, label, Icon}) => <Link href={href} key={href}><Icon size={16} aria-hidden="true" />{label}</Link>)}</nav>
          <div className="docs-site__sidebar-divider" />
          <span className="docs-site__nav-caption">COMPONENTS</span>
          <Link href="/components/envelope" className="docs-site__component-link">Envelope <ArrowUpRightIcon size={15} aria-hidden="true" /></Link>
          <Link href="/components" className="docs-site__component-link">All objects <ArrowUpRightIcon size={15} aria-hidden="true" /></Link>
          <div className="docs-site__sidebar-note">Built with care.<br/>Documented with honesty.</div>
        </aside>
        <div className="docs-site__main">{children}</div>
      </div>
    </div>
  );
}

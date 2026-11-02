"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteSearch } from "./site-search";
import { ThemeSwitcher } from "./theme-switcher";
import { GithubIcon } from "./ui/icons";

const guides = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/getting-started", label: "Getting started" },
  { href: "/docs/accessibility", label: "Accessibility" },
  { href: "/docs/design-principles", label: "Design principles" },
];
const components = [
  { href: "/components/envelope", label: "Envelope" },
  { href: "/components/journal", label: "Journal" },
  { href: "/components/polaroid", label: "Polaroid" },
  { href: "/components/sticky-note", label: "Sticky Note" },
];

function WorkspaceNavigation({ pathname }: { pathname: string }) {
  return <>
    <Link href="/" className="workspace-logo" aria-label="Tactile Objects home">
      <span className="ref-brand-mark" aria-hidden="true"><i/><i/><i/><i/></span>Tactile Objects
    </Link>
    <nav className="workspace-links" aria-label="Docs and component navigation">
      <span className="workspace-label">Getting started</span>
      {guides.map(item => <Link key={item.href} href={item.href} className={pathname === item.href ? "is-current" : ""} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
      <span className="workspace-label">Components</span>
      <Link href="/components" className={pathname === "/components" ? "is-current" : ""} aria-current={pathname === "/components" ? "page" : undefined}>Browse all</Link>
      {components.map(item => <Link key={item.href} href={item.href} className={pathname === item.href ? "is-current" : ""} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
    </nav>
    <Link href="/playground" className="workspace-playground">◇ &nbsp; Playground</Link>
  </>;
}

export function WorkspaceChrome() {
  const pathname = usePathname();
  const active = pathname === "/playground" || pathname.startsWith("/docs") || pathname.startsWith("/components");
  if (!active) return null;
  return <div className="workspace-chrome">
    <aside className="workspace-sidebar"><WorkspaceNavigation pathname={pathname} /></aside>
    <div className="workspace-topbar" aria-label="Workspace controls">
      <Link href="/" className="workspace-mobile-logo"><span className="ref-brand-mark" aria-hidden="true"><i/><i/><i/><i/></span>Tactile Objects</Link>
      <a className="workspace-topbar__mail" href="https://github.com/victorkay97/tactile-objects/issues" aria-label="Report an issue" title="Report an issue" target="_blank" rel="noopener noreferrer">✉</a>
      <SiteSearch /><ThemeSwitcher />
      <a className="workspace-topbar__github" href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer" aria-label="Visit Tactile Objects GitHub"><GithubIcon size={16} aria-hidden="true"/><span>GitHub</span></a>
      <details className="workspace-mobile-menu"><summary aria-label="Open docs navigation">☰</summary><div><WorkspaceNavigation pathname={pathname}/></div></details>
    </div>
  </div>;
}

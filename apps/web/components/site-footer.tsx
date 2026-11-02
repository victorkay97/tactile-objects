import Link from "next/link";
import { GithubIcon } from "./ui/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer ref-footer">
      <div className="layout-container ref-footer__grid">
        <div className="ref-footer__brand">
          <Link className="ref-footer__logo" href="/">
            <span className="ref-brand-mark" aria-hidden="true"><i/><i/><i/><i/></span>
            Tactile Objects
          </Link>
          <p>Interactive digital objects for React.<br/>Familiar by nature, thoughtful in every detail.</p>
        </div>
        <nav className="ref-footer__links" aria-label="Footer navigation">
          <strong>Navigate</strong>
          <Link href="/docs">Docs</Link>
          <Link href="/components">Components</Link>
          <Link href="/components/envelope">Playground</Link>
        </nav>
        <nav className="ref-footer__links" aria-label="Project links">
          <strong>The project</strong>
          <Link href="/about">About</Link>
          <Link href="/docs/getting-started">Getting started</Link>
          <a href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer">GitHub <GithubIcon size={14} aria-hidden="true" /></a>
        </nav>
      </div>
      <div className="layout-container ref-footer__bottom">
        <span>© 2026 Tactile Objects. Made with care.</span>
        <span>Open-source experiments in interaction.</span>
      </div>
    </footer>
  );
}

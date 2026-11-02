import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { SiteSearch } from "./site-search";
import { GithubIcon } from "./ui/icons";

export function SiteHeader() {
  return (
    <header className="site-header ref-header">
      <div className="header-inner ref-nav-wrap">
        <Link className="wordmark ref-brand" href="/" aria-label="Tactile Objects home">
          <span className="ref-brand-mark" aria-hidden="true"><i/><i/><i/><i/></span>
          <span>Tactile Objects</span>
        </Link>
        <nav className="header-nav ref-nav-links" aria-label="Main navigation">
          <Link href="/docs">Docs</Link>
          <Link href="/components">Components</Link>
          <Link href="/components/envelope">Playground</Link>
        </nav>
        <div className="ref-nav-actions">
          <SiteSearch />
          <ThemeSwitcher />
          <a className="ref-github-link" href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer" aria-label="Tactile Objects on GitHub" title="GitHub">
            <GithubIcon size={16} aria-hidden="true" /><span>GitHub</span>
          </a>
          <details className="ref-mobile-menu">
            <summary aria-label="Open navigation menu" title="Menu">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </summary>
            <nav aria-label="Mobile navigation">
              <Link href="/docs">Docs</Link>
              <Link href="/components">Components</Link>
              <Link href="/components/envelope">Playground</Link>
              <Link href="/about">About</Link>
              <a href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

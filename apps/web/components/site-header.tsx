import Link from "next/link";
import { ArrowUpRightIcon, GithubIcon } from "./ui/icons";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="layout-container header-inner">
        <Link className="wordmark" href="/" aria-label="Tactile Objects home">
          <span className="brand-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>tactile<span className="wordmark-light">objects</span><span className="brand-period">.</span></span>
        </Link>
        <nav className="header-nav" aria-label="Main navigation">
          <Link href="/components">Components</Link>
          <Link href="/about">About</Link>
          <a href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer">
            GitHub <GithubIcon size={15} aria-hidden="true" />
          </a>
        </nav>
        <Link href="/components" className="header-action">
          Browse objects <ArrowUpRightIcon size={16} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}

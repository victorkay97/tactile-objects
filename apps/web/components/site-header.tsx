import Link from "next/link";

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
          <Link href="/about">Our story</Link>
          <a href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </nav>
        <Link href="/components/envelope" className="header-action">
          Explore the library <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}

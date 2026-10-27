import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="layout-container footer-grid">
        <div>
          <Link className="wordmark footer-wordmark" href="/">tactile<span className="wordmark-light">objects</span><span className="brand-period">.</span></Link>
          <p>Little objects. A more human web.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/components">Components</Link>
          <Link href="/about">About</Link>
          <a href="https://github.com/victorkay97/tactile-objects" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </nav>
        <div className="footer-note">MADE TO BE FELT <span aria-hidden="true">✳</span> 2026</div>
      </div>
    </footer>
  );
}

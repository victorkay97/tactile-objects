import Link from "next/link";
import { ArrowUpRightIcon } from "../../../components/ui/icons";

export const metadata={title:"Getting Started",description:"Set up Tactile Objects locally and render the first component."};

const setup = ["git clone https://github.com/victorkay97/tactile-objects.git","cd tactile-objects","git switch feat/foundation-and-envelope-prototype","corepack pnpm install","corepack pnpm dev"].join("\n");
const sample = [
  'import { Envelope } from "@tactile/objects";',
  'import "@tactile/objects/styles.css";',
  "",
  "export function FirstLetter() {",
  "  return (",
  '    <Envelope tone="sage" paper="white" seal="wax" recipient="A curious mind">',
  "      <h3>Hello, there.</h3>",
  "      <p>A little note to get started.</p>",
  "    </Envelope>",
  "  );",
  "}",
].join("\n");

export default function GettingStarted() {
  return <main className="docs-article">
    <span className="docs-site__eyebrow">01 / GUIDE</span><h1>Getting started<span className="docs-site__period">.</span></h1>
    <p className="docs-site__lead">The quickest way to run the collection locally, see four interactive objects, and understand how the real React components are organized.</p>
    <section><h2>Before you begin</h2><p>You'll need Node.js 22 or newer and Corepack. The project uses pnpm 10.18.0. Until the first npm release, use the component from inside this monorepo.</p></section>
    <section><h2>Run the website</h2><p>Clone the repository and open the development branch, then start the showcase:</p><pre><code>{setup}</code></pre><p>Open <code>http://localhost:3000</code>. The app includes a homepage, collection catalog, and individual playground pages.</p></section>
    <section><h2>Use your first object</h2><p>The objects package is framework-independent React. Import the component and its stylesheet once in the consuming app, then pass content as children:</p><pre><code>{sample}</code></pre><p>Try <code>tone="clay"</code>, <code>tone="sage"</code> or <code>tone="rose"</code>, choose <code>paper="ivory"</code> or <code>paper="white"</code>, and use <code>seal="none"</code> to remove the wax stamp. The <Link href="/components/envelope">live Envelope studio</Link> lets you change these real props and copy matching React code.</p></section>
    <section><h2>Other interactive objects</h2><p>Explore the <Link href="/components/journal">Journal</Link>, <Link href="/components/polaroid">Polaroid</Link>, and <Link href="/components/sticky-note">Sticky Note</Link>. Their interactive studios generate copyable React examples using actual public component props.</p></section>\n    <section><h2>Validate locally</h2><pre><code>{["corepack pnpm test","corepack pnpm typecheck","corepack pnpm build"].join("\n")}</code></pre><p>The code is still under active development. Building successfully doesn't substitute for checking the interaction on desktop and mobile.</p></section>
    <div className="docs-site__next"><Link href="/docs/accessibility">Next: Accessibility <ArrowUpRightIcon size={16} aria-hidden="true" /></Link></div>
  </main>;
}

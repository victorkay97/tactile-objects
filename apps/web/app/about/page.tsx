import Link from "next/link";

export const metadata = { title: "About", description: "Why we're making Tactile Objects." };

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="layout-container about-hero">
        <div className="eyebrow"><span className="eyebrow-star">✳</span> A LITTLE ABOUT US</div>
        <h1>The internet deserves a little <em>more feeling.</em></h1>
        <p>We believe the smallest interactions can leave the biggest impression. Tactile Objects is an open-source experiment in making familiar things feel wonderfully real on the web.</p>
      </section>
      <section className="about-feature">
        <div className="layout-container about-feature-inner"><div className="about-symbol" aria-hidden="true">✳</div><div><span className="section-label">THE IDEA</span><h2>Less decoration.<br />More <span>interaction.</span></h2><p>An envelope should open. A journal should turn. A sticky note should peel. We want to bring those familiar physical moments to the screen with care and purpose—not as gimmicks, but as useful React components.</p></div></div>
      </section>
      <section className="layout-container about-values">
        <article><span>01 /</span><h3>Craft is the point.</h3><p>We take time with movement, depth, light, and materials. The details make an object believable.</p></article>
        <article><span>02 /</span><h3>Everyone should be able to use it.</h3><p>Keyboard input, touch, readable content, and reduced-motion preferences belong in the design from the start.</p></article>
        <article><span>03 /</span><h3>Build it. Share it.</h3><p>Our components are designed to be reusable and open source, with accessible APIs and honest documentation.</p></article>
      </section>
      <section className="layout-container about-end"><h2>Curious what we're making?</h2><Link href="/components" className="button button-dark">Explore the objects <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}

import Link from "next/link";

export const metadata = { title: "Components", description: "Browse beautifully crafted interactive React objects." };

const planned = [
  { id: "002", name: "Journal", description: "A book with page-turning interactions.", type: "paper", art: "journal" },
  { id: "003", name: "Sticky Note", description: "Notes to peel, fold, and reposition.", type: "paper", art: "sticky" },
  { id: "004", name: "Polaroid", description: "A picture that develops before your eyes.", type: "memories", art: "polaroid" },
];

export default function ComponentsPage() {
  return (
    <main className="catalog-page">
      <section className="layout-container catalog-hero">
        <div className="eyebrow"><span className="eyebrow-star">✳</span> THE OBJECT COLLECTION</div>
        <div className="catalog-title-row"><h1>Find your next<br /><span>little delight.</span></h1><p>Some things are better when you can interact with them. Explore the first object and take a peek inside the workshop.</p></div>
        <div className="catalog-filter"><span>ALL OBJECTS</span><span className="catalog-count">01 AVAILABLE / 03 PLANNED</span></div>
      </section>
      <section className="layout-container catalog-grid" aria-label="Object collection">
        <Link className="catalog-card catalog-card--envelope" href="/components/envelope">
          <div className="catalog-card-top"><span>001 / PAPER</span><span className="live-badge"><i /> EXPLORE</span></div>
          <div className="catalog-art catalog-art--envelope" aria-hidden="true"><span className="art-envelope"><i /><i /></span><span className="art-letter" /></div>
          <div className="catalog-card-bottom"><div><h2>The Envelope</h2><p>A little note worth opening.</p></div><span className="catalog-card-arrow">↗</span></div>
        </Link>
        {planned.map(item => (
          <article key={item.id} className={"catalog-card catalog-card--" + item.art}>
            <div className="catalog-card-top"><span>{item.id} / {item.type.toUpperCase()}</span><span className="planned-badge">COMING SOON</span></div>
            <div className={"catalog-art catalog-art--" + item.art} aria-hidden="true"><span className={"art-" + item.art}><i /></span></div>
            <div className="catalog-card-bottom"><div><h2>The {item.name}</h2><p>{item.description}</p></div><span className="catalog-card-soon">IN PROGRESS</span></div>
          </article>
        ))}
      </section>
      <section className="layout-container catalog-endnote"><span>✳</span> A small collection, made carefully. More interactive objects are on the way. <Link href="/about">Our approach ↗</Link></section>
    </main>
  );
}

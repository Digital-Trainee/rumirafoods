import React from 'react';

export default function About({ navigate }) {
  const link = (path, label) => <a className="r-btn" href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>{label} ↗</a>;
  return <>
    <section className="r-page-hero r-about-hero">
      <small>ABOUT RUMIRA</small>
      <h1>From farm to food.<br /><em>From women to change.</em></h1>
      <p>Rumira Group of Companies connects farmer-led sourcing with food processing to make convenient, quality-driven food products. Our work links farmers, processing, packaging and markets in one ecosystem.</p>
    </section>
    <section className="r-about-stats" aria-label="Rumira at a glance">
      <div><strong>500+</strong><span>associated farmers</span></div>
      <div><strong>In-house</strong><span>processing and packaging</span></div>
      <div><strong>Modern</strong><span>fruit and vegetable dehydration</span></div>
      <div><strong>B2B</strong><span>and HORECA supply</span></div>
    </section>
    <section className="r-about-chapters">
      <article><div className="r-about-image"><img src="/about-farmers.jpg" alt="Illustrative image of women harvesting produce" loading="lazy" /></div><div><small>OUR AGRICULTURAL BACKBONE</small><h2>Rooted in the <em>farming community.</em></h2><p>Rumira Farmer Producer Company in Amba, Kolhapur, is associated with more than 500 farmers. It focuses on sourcing and processing seasonal fruits and vegetables while creating value for farming communities, including women farmers.</p></div></article>
      <article><div className="r-about-image"><img src="/about-processing.jpg" alt="Illustrative image of fruit and vegetable processing" loading="lazy" /></div><div><small>RUMIRA FOODS · PUNE</small><h2>Processing with <em>purpose.</em></h2><p>Our Pune-based processing arm works across fruit and vegetable dehydration, chips and snack processing, packaging and batch-wise third-party production. Heat-pump and solar dehydration equipment support controlled preparation, hygiene and consistent output.</p></div></article>
    </section>
    <section className="r-about-values"><small>OUR VISION</small><h2>Women led. Women run. <em>Women grown.</em></h2><p>Women are part of the story from farms and entrepreneurship to food innovation. We connect that vision with convenient food alternatives made from agricultural produce.</p><div><span>Women in farming</span><span>Women in enterprise</span><span>Women in food innovation</span></div></section>
    <section className="r-about-flow"><small>ONE CONNECTED ECOSYSTEM</small><h2>From the farm to your table</h2><ol><li>Farmers</li><li>Processing</li><li>Packaging</li><li>Markets</li></ol><p>Farmer-linked sourcing, careful handling and practical food formats help us bring ingredients and finished products to B2B, HORECA and everyday buyers.</p>{link('/process', 'See our process')}</section>
    <section className="r-about-difference"><small>WHAT SETS US APART</small><div><article><h3>Farm-to-food integration</h3><p>Greater visibility from sourcing through finished products.</p></article><article><h3>Hygiene-first processing</h3><p>Careful handling and product-specific quality checks.</p></article><article><h3>Clean-label approach</h3><p>Simple ingredients and fewer unnecessary additives wherever possible; confirm each product's final specification.</p></article><article><h3>Better food alternatives</h3><p>Convenient formats based on fruits, vegetables, millets and other agricultural produce.</p></article></div></section>
  </>;
}

import React from 'react';

export default function About({ navigate }) {
  const link = (path, label) => <a className="r-btn" href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>{label} ↗</a>;
  return <>
    <section className="r-about-chapters">
      <article className="r-about-intro"><div className="r-about-image"><img src="/about-farmers.jpg" alt="Illustrative image of women harvesting produce" loading="lazy" /></div><div><small>ABOUT RUMIRA</small><h1>Rooted in the <em>farming community.</em></h1><p>Rumira Group of Companies connects farmer-led sourcing with thoughtful food processing. Our work begins with more than 500 associated farmers and 50+ village enterprises across India, creating value for farming communities and bringing honest food closer to every home.</p><p>Rooted in nature and shaped by the care and creativity of women, Rumira brings people, produce and purpose together.</p></div></article>
      <article><div className="r-about-image"><img src="/about-processing.jpg" alt="Illustrative image of fruit and vegetable processing" loading="lazy" /></div><div><small>RUMIRA FOODS · PUNE</small><h2>Processing with <em>purpose.</em></h2><p>Our Pune-based processing arm works across fruit and vegetable dehydration, chips and snack processing, packaging and batch-wise third-party production. Heat-pump and solar dehydration equipment support controlled preparation, hygiene and consistent output.</p></div></article>
    </section>
    <section className="r-about-flow"><small>ONE CONNECTED ECOSYSTEM</small><h2>From the farm to your table</h2><ol><li>Farmers</li><li>Village enterprises</li><li>Processing &amp; quality</li><li>Your home</li></ol><p>Farmers and village enterprises help source seasonal produce. Our Pune unit turns ingredients into practical food formats through batch-wise processing, quality checks and packaging, ready for families and commercial buyers.</p>{link('/process', 'See our process')}</section>
  </>;
}

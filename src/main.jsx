import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './app.css';
import './product-experience.css';
import './theme.css';
import ProductCatalogue from './ProductCatalogue.jsx';
import ContactFloat from './ContactFloat.jsx';
import ContactForm from './ContactForm.jsx';
import ThankYou from './ThankYou.jsx';
import About from './About.jsx';
import FeaturedCarousel from './FeaturedCarousel.jsx';
import { setupScrollReveal } from './scrollReveal.js';
import { catalog, groups, groupImage } from './catalog.js';

const phone = '919821809292';
const email = 'rumira2025@gmail.com';
const wa = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
const go = (path) => {
  history.pushState({}, '', path);
  dispatchEvent(new PopStateEvent('popstate'));
  scrollTo({ top: 0, behavior: 'smooth' });
};

function Logo() {
  return <a className="r-logo" href="/" onClick={(event) => { event.preventDefault(); go('/'); }}><b>R</b><span>RUMIRA <i>FOODS</i></span></a>;
}

function Btn({ href, children, green = false }) {
  const external = href.startsWith('http');
  return <a className={`r-btn${green ? ' green' : ''}`} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} onClick={(event) => { if (href.startsWith('/')) { event.preventDefault(); go(href); } }}>{children} ↗</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['/', 'Home'], ['/about', 'About Us'], ['/products', 'Our Products'], ['/process', 'Process & Production'], ['/contact', 'Contact Us']];
  return <header className="r-header"><Logo /><button className="r-menu" type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '×' : '☰'}</button><nav className={open ? 'r-nav open' : 'r-nav'}>{links.map(([path, name]) => <a className={location.pathname === path ? 'active' : ''} href={path} key={path} onClick={(event) => { event.preventDefault(); setOpen(false); go(path); }}>{name}</a>)}</nav><a className="r-header-cta" href={wa('Hello Rumira Foods, I would like to know more about your products.')} target="_blank" rel="noreferrer">WhatsApp us ↗</a></header>;
}

function Footer() {
  return <footer className="r-footer"><div><Logo /><p>Healthy food everyday.<br />Your go-to clean label food brand.</p></div><div><small>EXPLORE</small><a href="/about" onClick={(event) => { event.preventDefault(); go('/about'); }}>About Rumira</a><a href="/products" onClick={(event) => { event.preventDefault(); go('/products'); }}>Our products</a><a href="/process" onClick={(event) => { event.preventDefault(); go('/process'); }}>Our approach</a></div><div><small>CONNECT</small><a href={`mailto:${email}`}>{email}</a><a href={wa('Hello Rumira Foods')} target="_blank" rel="noreferrer">+91 98218 09292 · WhatsApp</a></div><p className="copyright">© 2026 Rumira Foods <span>Made with care in India</span></p></footer>;
}

function Home() {
  return <>
    <section className="r-hero"><div><small>WOMEN LED · WOMEN RUN · WOMEN GROWN</small><h1>Healthy food <em>everyday.</em></h1><p>Your go-to clean label food brand. Rumira brings farmer-linked sourcing and thoughtful processing together for convenient food made with care.</p><div className="r-actions"><Btn href="/products">Explore our products</Btn><Btn green href={wa('Hello Rumira Foods, I would like to know more about your products.')}>WhatsApp us</Btn></div><div className="r-promise">✳ <span>From farm to food.<br /><b>From women to change.</b></span></div></div><FeaturedCarousel navigate={go} /></section>
    <section className="r-stats"><div><b>500+</b><span>associated farmers</span></div><div><b>{groups.length}</b><span>product categories</span></div><div><b>{catalog.length}</b><span>products to explore</span></div><p>Farmer-linked sourcing · In-house processing · B2B and HORECA supply</p></section>
    <section className="r-section"><div className="r-heading"><div><small>OUR PORTFOLIO</small><h2>Ingredients and foods<br /><em>for different needs.</em></h2></div><Btn href="/products">View all products</Btn></div><div className="r-grid">{groups.map((group, index) => <a key={group.id} href={`/products#${group.id}`} onClick={(event) => { event.preventDefault(); go('/products'); setTimeout(() => document.getElementById(group.id)?.scrollIntoView({ behavior: 'smooth' }), 50); }} style={{ backgroundImage: `linear-gradient(180deg,rgba(23,59,55,.08),rgba(23,59,55,.82)),url(${groupImage(group.id)})` }}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{group.audience}</small><h3>{group.title}</h3><b>↗</b></div></a>)}</div></section>
    <section className="r-story"><figure><img src="/about-farmers.jpg" alt="Illustrative image of women harvesting produce" loading="lazy" /><figcaption>Illustrative image</figcaption></figure><article><small>THE PEOPLE BEHIND RUMIRA</small><h2>Women led.<br /><em>Women run. Women grown.</em></h2><p>Our work connects more than 500 associated farmers with processing and markets. Women in farming, enterprise and food innovation are central to that vision.</p><Btn href="/about">Discover our story</Btn></article></section>
    <section className="r-quote">“<blockquote>From farm to food.<br />From women to change.</blockquote><small>RUMIRA FOODS</small></section>
  </>;
}

function Process() {
  const steps = [
    ['01', 'Sourcing', 'Our farmer-linked network in Amba, Kolhapur, supports sourcing of seasonal produce. Raw-material identity and requirements are confirmed for each product.'],
    ['02', 'Processing', 'Our Pune unit uses heat-pump and solar dehydration equipment alongside chips and snack processing. Methods vary by ingredient and intended format.'],
    ['03', 'Quality checks', 'Hygienic handling, process control and batch consistency guide production. Ask which moisture, microbiological and other checks apply to your product.'],
    ['04', 'Packaging', 'In-house B2B packaging and batch-wise third-party production support different supply needs. Pack formats and shelf life are product-specific.']
  ];
  return <>
    <section className="r-page-hero dark"><small>PROCESS & PRODUCTION</small><h1>From farmers to <em>finished food.</em></h1><p>Rumira connects sourcing, processing, packaging and markets through one farm-to-food ecosystem.</p></section>
    <section className="r-process-intro"><figure className="r-process-image"><img src="/about-processing.jpg" alt="Illustrative image of fruit and vegetable dehydration" loading="lazy" /><figcaption>Illustrative image</figcaption></figure><article><small>IN-HOUSE CAPABILITIES</small><h2>Thoughtful processing,<br /><em>batch by batch.</em></h2><p>Our Pune-based unit works with fruit and vegetable dehydration, chips and snacks, and packaging. Heat-pump and solar dehydration equipment support controlled processing. Specifications, testing and documentation depend on the final product and application.</p></article></section>
    <section className="r-steps">{steps.map(([number, title, description]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{description}</p></article>)}</section>
    <section className="r-process-benefits"><div><small>WHY DEHYDRATE?</small><h2>Food that fits <em>everyday life.</em></h2><p>Dehydration can make produce easier to store, carry and use in powders, snacks and mixes. Fiber, antioxidant and mineral content varies by ingredient and process; request the product-specific nutritional and ingredient details for any claim or application.</p></div><ul><li>Convenient formats for cooking and snacking</li><li>Portable options with product-specific shelf life</li><li>Clean-label formulations where possible</li><li>Defined specifications for commercial supply</li></ul></section>
    <section className="r-process-note"><h2>Ask for the details that matter</h2><p>Ingredient declarations, allergens, testing, pack formats and permitted applications should be confirmed against the final product specification. Botanical ingredients may be sourced through qualified suppliers; their production process is not represented as in-house.</p><Btn href="/contact">Request a specification</Btn></section>
  </>;
}

function App() {
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    const listener = () => setPath(location.pathname);
    addEventListener('popstate', listener);
    return () => removeEventListener('popstate', listener);
  }, []);
  useEffect(setupScrollReveal, []);

  if (path === '/products' || path.startsWith('/products/')) return <ProductCatalogue path={path} navigate={go} />;
  const page = path === '/about' ? <About navigate={go} /> : path === '/process' ? <Process /> : path === '/contact' ? <ContactForm navigate={go} /> : path === '/thank-you' ? <ThankYou navigate={go} /> : <Home />;
  return <><Header /><main>{page}</main><Footer /><ContactFloat /></>;
}

createRoot(document.getElementById('rumira-app')).render(<App />);

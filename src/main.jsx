import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './app.css';
import './product-experience.css';
import './theme.css';
import ProductCatalogue from './ProductCatalogue.jsx';
import ContactFloat from './ContactFloat.jsx';
import { setupScrollReveal } from './scrollReveal.js';
import { catalog, groups, groupImage } from './catalog.js';

const phone = '919821809292';
const email = 'rumira2025@gmail.com';
const wa = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
const go = (path) => { history.pushState({}, '', path); dispatchEvent(new PopStateEvent('popstate')); scrollTo({ top: 0, behavior: 'smooth' }); };

function Logo() { return <a className="r-logo" href="/" onClick={(event) => { event.preventDefault(); go('/'); }}><b>R</b><span>RUMIRA <i>FOODS</i></span></a>; }
function Btn({ href, children, green = false }) { const external = href.startsWith('http'); return <a className={`r-btn${green ? ' green' : ''}`} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} onClick={(event) => { if (href.startsWith('/')) { event.preventDefault(); go(href); } }}>{children} ↗</a>; }
function Header() { const [open, setOpen] = useState(false); const links = [['/', 'Home'], ['/products', 'Our Products'], ['/process', 'Process & Production'], ['/contact', 'Contact Us']]; return <header className="r-header"><Logo /><button className="r-menu" type="button" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? '×' : '☰'}</button><nav className={open ? 'r-nav open' : 'r-nav'}>{links.map(([path, name]) => <a className={location.pathname === path ? 'active' : ''} href={path} key={path} onClick={(event) => { event.preventDefault(); setOpen(false); go(path); }}>{name}</a>)}</nav><a className="r-header-cta" href={wa('Hello Rumira Foods, I would like to know more about your products.')} target="_blank" rel="noreferrer">WhatsApp us ↗</a></header>; }
function Footer() { return <footer className="r-footer"><div><Logo /><p>Quality in every ingredient.<br />Care in every process.</p></div><div><small>EXPLORE</small><a href="/products" onClick={(event) => { event.preventDefault(); go('/products'); }}>Our products</a><a href="/process" onClick={(event) => { event.preventDefault(); go('/process'); }}>Our approach</a></div><div><small>CONNECT</small><a href={`mailto:${email}`}>{email}</a><a href={wa('Hello Rumira Foods')} target="_blank" rel="noreferrer">+91 98218 09292 · WhatsApp</a></div><p className="copyright">© 2026 Rumira Foods <span>Made with care in India</span></p></footer>; }

function Home() {
  return <><section className="r-hero"><div><small>FARM TO FACTORY · THOUGHTFUL PROCESSING · QUALITY-LED FOODS</small><h1>From carefully sourced ingredients to <em>thoughtfully processed foods.</em></h1><p>Rumira Foods brings together responsible sourcing, considered processing and modern food convenience for households, food-service businesses and manufacturing partners.</p><div className="r-actions"><Btn href="/products">Explore our products</Btn><Btn green href={wa('Hello Rumira Foods, I would like to know more about your products.')}>WhatsApp us</Btn></div><div className="r-promise">✳ <span>Ingredient transparency.<br /><b>Practical food solutions.</b></span></div></div><div className="r-hero-photo"><span>Rumira<br /><b>Foods</b></span></div></section><section className="r-stats"><div><b>6</b><span>product categories</span></div><div><b>{catalog.length}</b><span>products to explore</span></div><p>Dehydrated ingredients, fruit snacks, millet foods, savoury snacks, seasonings and selected botanicals.</p></section><section className="r-section"><div className="r-heading"><div><small>OUR PORTFOLIO</small><h2>Ingredients and foods<br /><em>for different needs.</em></h2></div><Btn href="/products">View all products</Btn></div><div className="r-grid">{groups.map((group, index) => <a key={group.id} href={`/products#${group.id}`} onClick={(event) => { event.preventDefault(); go('/products'); setTimeout(() => document.getElementById(group.id)?.scrollIntoView({ behavior: 'smooth' }), 50); }} style={{ backgroundImage: `linear-gradient(180deg,rgba(48,36,56,.08),rgba(48,36,56,.78)),url(${groupImage(group.id)})` }}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{group.audience}</small><h3>{group.title}</h3><b>↗</b></div></a>)}</div></section><section className="r-story"><div></div><article><small>THE RUMIRA APPROACH</small><h2>Care from selection<br /><em>to specification.</em></h2><p>Our portfolio is built around clear ingredient information, appropriate processing and product-specific quality requirements. Ask our team for the specifications relevant to your application.</p><Btn href="/process">Explore our approach</Btn></article></section><section className="r-quote">“<blockquote>Quality in every ingredient.<br />Care in every process.</blockquote><small>RUMIRA FOODS</small></section></>;
}

function Process() {
  const steps = [
    ['01', 'Sourcing', 'Confirm supplier traceability, raw-material identity and inspection requirements for the product.'],
    ['02', 'Processing', 'Drying, milling, roasting or blending parameters depend on the ingredient and intended format.'],
    ['03', 'Quality checks', 'Ask which moisture, microbiological and other checks apply to the product and batch.'],
    ['04', 'Packaging', 'Confirm food-contact packaging and validated shelf-life requirements for the final product.']
  ];
  return <><section className="r-page-hero dark"><small>PROCESS & PRODUCTION</small><h1>Care in every <em>process.</em></h1><p>From raw-material selection to finished-product packaging, quality requirements should match each ingredient, process and application.</p></section><section className="r-process-intro"><div></div><article><small>PRODUCT-SPECIFIC STANDARDS</small><h2>Quality starts with<br /><em>clear specifications.</em></h2><p>Our range includes dehydrated foods, formulated products and sourced botanical ingredients. Processing, documentation and testing vary by product. Contact us for current product specifications and the checks available for your order.</p></article></section><section className="r-steps">{steps.map(([number, title, description]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{description}</p></article>)}</section><section className="r-process-note"><h2>Ask for the details that matter</h2><p>Ingredient declarations, allergens, testing, pack formats and permitted applications should be confirmed against the final product specification. Botanical ingredients may be sourced through qualified suppliers; their production process is not represented as in-house.</p><Btn href="/contact">Request a specification</Btn></section></>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  return <section className="r-contact"><div><small>LET’S TALK FOOD</small><h1>Tell us what<br /><em>you need.</em></h1><p>Share the products, quantities and application you have in mind. We can discuss current specifications, pack formats and availability.</p><div className="r-details"><div><small>Email</small><a href={`mailto:${email}`}>{email}</a></div><div><small>WhatsApp</small><a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">+91 98218 09292</a></div></div></div><form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCategory: ${data.get('category')}\nMessage: ${data.get('message')}`; setSent(true); location.href = `mailto:${email}?subject=${encodeURIComponent('Rumira Foods enquiry')}&body=${encodeURIComponent(body)}`; }}><label>Your name<input required name="name" placeholder="How should we call you?" /></label><label>Email address<input required name="email" type="email" placeholder="you@company.com" /></label><label>What are you interested in?<select name="category"><option>Choose a category</option>{groups.map((group) => <option key={group.id}>{group.title}</option>)}</select></label><label>Your message<textarea required name="message" rows="4" placeholder="Tell us about the products and quantities you need..." /></label><div className="r-actions"><button className="r-btn" type="submit">Continue by email ↗</button><Btn green href={wa('Hello Rumira Foods, I would like to make an enquiry.')}>WhatsApp us</Btn></div>{sent && <p className="success">Please send the draft in your email app so our team receives your enquiry.</p>}</form></section>;
}

function App() {
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    const listener = () => setPath(location.pathname);
    addEventListener('popstate', listener);
    return () => removeEventListener('popstate', listener);
  }, []);
  useEffect(setupScrollReveal, []);

  if (path === '/products' || path.startsWith('/products/')) {
    return <ProductCatalogue path={path} navigate={go} />;
  }
  const page = path === '/process' ? <Process /> : path === '/contact' ? <Contact /> : <Home />;
  return <><Header /><main>{page}</main><Footer /><ContactFloat /></>;
}

createRoot(document.getElementById('rumira-app')).render(<App />);

import React, { useEffect, useState } from 'react';
import { catalog } from './catalog.js';

const featuredIds = [
  'fruits-apple-slices',
  'millets-ragi-chips',
  'snacks-beetroot-chips',
  'powders-beetroot-powder'
];
const slides = featuredIds.map((id) => catalog.find((product) => product.id === id)).filter(Boolean);

export default function FeaturedCarousel({ navigate }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches || slides.length < 2) return undefined;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const product = slides[index];
  if (!product) return null;

  return <div className="r-featured" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }} aria-label="Featured product images">
    <div className="r-featured-frame" key={product.id}>
      <img src={product.image} alt={product.name} />
      <a href={`/products/${product.id}`} onClick={(event) => { event.preventDefault(); navigate(`/products/${product.id}`); }}><small>FEATURED FROM THE COLLECTION</small><strong>{product.name}</strong><span>Explore product ↗</span></a>
    </div>
    <div className="r-featured-controls" aria-label="Choose a featured product">
      {slides.map((slide, position) => <button key={slide.id} type="button" className={position === index ? 'active' : ''} aria-label={`Show ${slide.name}`} aria-current={position === index ? 'true' : undefined} onClick={() => setIndex(position)} />)}
    </div>
  </div>;
}

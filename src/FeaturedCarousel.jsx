import React, { useEffect, useRef, useState } from 'react';

const slides = [
  {
    id: 'nutraceuticals',
    name: 'Nutraceutical powders',
    target: '/products#botanicals',
    image: '/hero-banners/nutraceuticals.jpg',
    alt: 'Illustrative assortment of botanical ingredient powders'
  },
  {
    id: 'dehydrated',
    name: 'Dehydrated veg & fruits',
    target: '/products',
    image: '/hero-banners/dehydrated.jpg',
    alt: 'Illustrative assortment of dehydrated fruit and vegetable pieces'
  },
  {
    id: 'snacks',
    name: 'Healthy snacks',
    target: '/products#snacks',
    image: '/hero-banners/snacks.jpg',
    alt: 'Illustrative assortment of makhana and vegetable chips'
  },
  {
    id: 'millets',
    name: 'Ready to eat millets',
    target: '/products#millets',
    image: '/hero-banners/millets.jpg',
    alt: 'Illustrative assortment of millet laddus and cookies'
  },
  {
    id: 'tea-coffee',
    name: 'Functional tea & coffee dips',
    target: '/products',
    image: '/hero-banners/tea-coffee.jpg',
    alt: 'Illustrative clear herbal tea and black coffee brewed with dip bags'
  },
  {
    id: 'seasonings',
    name: 'Masala & seasoning',
    target: '/products#seasonings',
    image: '/hero-banners/seasonings.jpg',
    alt: 'Illustrative assortment of masala and culinary seasoning flakes'
  }
];

export default function FeaturedCarousel({ navigate, children }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = slides[index];
  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY, captured: false };
    suppressClick.current = false;
    setPaused(true);
  };
  const handlePointerMove = (event) => {
    const start = pointerStart.current;
    if (!start || start.id !== event.pointerId || start.captured) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
      event.currentTarget.setPointerCapture(event.pointerId);
      start.captured = true;
    }
  };
  const handlePointerUp = (event) => {
    if (!pointerStart.current || pointerStart.current.id !== event.pointerId) return;
    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    pointerStart.current = null;
    if (Math.abs(dx) < 45 || Math.abs(dx) <= Math.abs(dy)) return;
    suppressClick.current = true;
    setIndex((current) => (current + (dx < 0 ? 1 : slides.length - 1)) % slides.length);
    setTimeout(() => { suppressClick.current = false; }, 250);
  };
  return <div className="r-featured" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }} onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }} aria-label="Featured food categories">
    <div className="r-featured-frame" key={slide.id} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={() => { pointerStart.current = null; }} onDragStart={(event) => event.preventDefault()}>
      <img className="r-featured-photo" src={slide.image} alt={slide.alt} draggable="false" />
      {children}
    </div>
    <button className="r-featured-arrow r-featured-prev" type="button" aria-label="Previous featured category" onClick={() => setIndex((current) => (current + slides.length - 1) % slides.length)}>‹</button>
    <button className="r-featured-arrow r-featured-next" type="button" aria-label="Next featured category" onClick={() => setIndex((current) => (current + 1) % slides.length)}>›</button>
    <a className="r-hero-product-cta" href="/products" onClick={(event) => { event.preventDefault(); navigate('/products'); }}>Explore our products <span aria-hidden="true">↗</span></a>
    <div className="r-featured-controls" aria-label="Choose a featured category">
      {slides.map((item, position) => <button key={item.id} type="button" className={position === index ? 'active' : ''} aria-label={`Show ${item.name}`} aria-current={position === index ? 'true' : undefined} onClick={() => setIndex(position)} />)}
    </div>
  </div>;
}

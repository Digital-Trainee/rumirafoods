import React, { useEffect, useState } from 'react';

const slides = [
  {
    id: 'dehydrated',
    name: 'Dehydrated veg & fruits',
    target: '/products',
    images: [
      ['/product-images/fruits-pineapple-pieces.jpg', 'Dehydrated pineapple pieces'],
      ['/product-images/powders-tomato-powder.jpg', 'Dehydrated tomato powder'],
      ['/product-images/fruits-strawberry-slices.jpg', 'Dehydrated strawberry slices']
    ]
  },
  {
    id: 'snacks',
    name: 'Healthy snacks',
    target: '/products#snacks',
    images: [
      ['/product-images/snacks-flavoured-makhana-four-variants.jpg', 'Flavoured makhana'],
      ['/product-images/snacks-sweet-potato-chips.jpg', 'Sweet potato chips'],
      ['/product-images/snacks-beetroot-chips.jpg', 'Beetroot chips']
    ]
  },
  {
    id: 'millets',
    name: 'Ready to eat millets',
    target: '/products#millets',
    images: [
      ['/product-images/millets-millet-laddu.jpg', 'Millet laddus'],
      ['/product-images/millets-ragi-laddu.jpg', 'Ragi laddus'],
      ['/product-images/millets-millet-cookies-regular-gluten-free.jpg', 'Millet cookies']
    ]
  },
  {
    id: 'tea-coffee',
    name: 'Functional tea & coffee dips',
    target: '/products',
    images: [
      ['/category-images/functional-coffee.jpg', 'Functional coffee dip'],
      ['/category-images/herbal-tea.jpg', 'Herbal dip tea'],
      ['/dip-product-images/herbal-teas-chamomile-lavender.jpg', 'Chamomile lavender herbal tea dip']
    ]
  },
  {
    id: 'nutraceuticals',
    name: 'Nutraceutical powders',
    target: '/products#botanicals',
    images: [
      ['/product-images/botanicals-moringa-powder.jpg', 'Moringa powder'],
      ['/product-images/botanicals-spirulina.jpg', 'Spirulina'],
      ['/product-images/botanicals-lakadong-turmeric.jpg', 'Lakadong turmeric']
    ]
  },
  {
    id: 'seasonings',
    name: 'Masala & seasoning',
    target: '/products#seasonings',
    images: [
      ['/product-images/seasonings-black-masala-flakes.jpg', 'Black masala flakes'],
      ['/product-images/seasonings-chilli-flakes.jpg', 'Chilli flakes'],
      ['/product-images/seasonings-oregano-flakes.jpg', 'Oregano flakes']
    ]
  }
];

export default function FeaturedCarousel({ navigate }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = slides[index];
  const openCategory = (event) => {
    event.preventDefault();
    navigate(slide.target.split('#')[0]);
    const sectionId = slide.target.split('#')[1];
    if (sectionId) setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return <div className="r-featured" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }} aria-label="Featured food categories">
    <div className="r-featured-frame" key={slide.id}>
      <div className="r-featured-collage" aria-hidden="true">
        {slide.images.map(([src, alt]) => <img key={src} src={src} alt={alt} />)}
      </div>
      <a href={slide.target} onClick={openCategory}><small>EXPLORE THE COLLECTION</small><strong>{slide.name}</strong><span>Explore category ↗</span></a>
    </div>
    <div className="r-featured-controls" aria-label="Choose a featured category">
      {slides.map((item, position) => <button key={item.id} type="button" className={position === index ? 'active' : ''} aria-label={`Show ${item.name}`} aria-current={position === index ? 'true' : undefined} onClick={() => setIndex(position)} />)}
    </div>
  </div>;
}

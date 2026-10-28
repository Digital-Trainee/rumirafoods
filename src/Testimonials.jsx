import React, { useRef } from 'react';
import { testimonials, testimonialForProduct } from './testimonials.js';

export function TestimonialCard({ testimonial, navigate, showProduct = true }) {
  const href = `/products/${testimonial.productId}`;
  return <blockquote className="rumira-testimonial-card">
    <div className="rumira-testimonial-rating" aria-label={`${testimonial.rating} out of 5 stars`}>
      <span aria-hidden="true">{'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}</span>
      <b>{testimonial.rating}/5</b>
    </div>
    <p>“{testimonial.quote}”</p>
    <footer>
      <strong>{testimonial.reviewer}</strong>
      {showProduct && <a href={href} onClick={(event) => { event.preventDefault(); navigate(href); }}>{testimonial.productName} ↗</a>}
    </footer>
  </blockquote>;
}

export default function Testimonials({ navigate }) {
  const track = useRef(null);
  const move = (direction) => {
    if (!track.current) return;
    track.current.scrollBy({
      left: direction * Math.round(track.current.clientWidth * .85),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  };

  return <section className="rumira-testimonials" aria-labelledby="rumira-testimonials-title">
    <div className="rumira-testimonials-heading">
      <div><small>WORDS FROM OUR CUSTOMERS</small><h2 id="rumira-testimonials-title">Loved in <em>everyday kitchens.</em></h2><p>Explore what customers shared about their favourite Rumira foods.</p></div>
      <div className="rumira-testimonials-controls">
        <button type="button" aria-label="Previous testimonials" onClick={() => move(-1)}>←</button>
        <button type="button" aria-label="Next testimonials" onClick={() => move(1)}>→</button>
      </div>
    </div>
    <div className="rumira-testimonials-track" ref={track} aria-label="Customer testimonials">
      {testimonials.map((testimonial) => <TestimonialCard key={testimonial.productId} testimonial={testimonial} navigate={navigate} />)}
    </div>
  </section>;
}

export function ProductReview({ productId }) {
  const testimonial = testimonialForProduct(productId);
  if (!testimonial) return null;

  return <section className="px-product-review" aria-labelledby="px-product-review-title">
    <div><small>CUSTOMER REVIEW</small><h2 id="px-product-review-title">What customers are saying</h2></div>
    <TestimonialCard testimonial={testimonial} showProduct={false} />
  </section>;
}

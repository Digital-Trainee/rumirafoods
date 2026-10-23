import React, { useState } from 'react';
import { catalog } from './catalog.js';
import { submitLead } from './submitLead.js';

export default function ProductEnquiryForm({ basket, product, onSuccess }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    const data = new FormData(event.currentTarget);
    const products = basket.length
      ? basket.map((entry) => `${catalog.find((item) => item.id === entry.id)?.name} x${entry.qty}`).join(', ')
      : product?.name || '';
    setSubmitting(true);
    setError('');
    try {
      await submitLead({
        name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email'),
        message: data.get('message'),
        interest: product?.group.title || '',
        products,
        website: data.get('website'),
        source: 'Product enquiry'
      });
      onSuccess();
    } catch (submissionError) {
      setError(submissionError.message || 'We could not send your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return <form onSubmit={handleSubmit}><label>Name<input required name="name" autoComplete="name" placeholder="Your name" /></label><label>Phone<input required name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" /></label><label>Email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" /></label><label>What are you looking for?<textarea required name="message" rows="4" placeholder="Products, quantities, pack sizes or questions…" /></label><label className="lead-honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" /></label><button className="px-primary" type="submit" disabled={submitting}>{submitting ? 'Sending enquiry…' : 'Send enquiry ↗'}</button>{error && <p className="lead-error" role="alert">{error}</p>}</form>;
}

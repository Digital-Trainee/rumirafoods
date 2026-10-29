import React, { useState } from 'react';
import { groups } from './catalog.js';
import { submitLead } from './submitLead.js';

const phone = '919999179434';
const email = 'rumira2025@gmail.com';

export default function ContactForm({ navigate }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    const data = new FormData(event.currentTarget);
    setSubmitting(true);
    setError('');
    try {
      await submitLead({
        name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email'),
        interest: data.get('category'),
        message: data.get('message'),
        website: data.get('website'),
        source: 'Contact page'
      });
      navigate('/thank-you');
    } catch (submissionError) {
      setError(submissionError.message || 'We could not send your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return <section className="r-contact"><div><small>LET’S TALK FOOD</small><h1>Tell us what<br /><em>you need.</em></h1><p>Share the products, quantities and application you have in mind. We can discuss current specifications, pack formats and availability.</p><div className="r-details"><div><small>Email</small><a href={`mailto:${email}`}>{email}</a></div><div><small>WhatsApp</small><a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">+91 99991 79434</a></div></div></div><form onSubmit={handleSubmit}><label>Your name<input required name="name" autoComplete="name" placeholder="How should we call you?" /></label><label>Phone number<input required name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@company.com" /></label><label>What are you interested in?<select name="category" defaultValue=""><option value="">Choose a category</option>{groups.map((group) => <option key={group.id} value={group.title}>{group.title}</option>)}</select></label><label>Your message<textarea required name="message" rows="4" placeholder="Tell us about the products and quantities you need..." /></label><label className="lead-honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" /></label><div className="r-actions"><button className="r-btn" type="submit" disabled={submitting}>{submitting ? 'Sending enquiry…' : 'Send enquiry ↗'}</button><a className="r-btn green" href={`https://wa.me/${phone}?text=${encodeURIComponent('Hello Rumira Foods, I would like to make an enquiry.')}`} target="_blank" rel="noreferrer">WhatsApp us ↗</a></div>{error && <p className="lead-error" role="alert">{error}</p>}</form></section>;
}

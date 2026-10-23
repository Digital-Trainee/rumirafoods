import React from 'react';

const PHONE = '919821809292';

export default function ContactFloat({ productName }) {
  const message = productName
    ? `Hello Rumira Foods, I would like to enquire about ${productName}.`
    : 'Hello Rumira Foods, I would like to know more about your products.';

  return <div className="rumira-contact-float" role="group" aria-label="Quick contact options">
    <a className="rumira-contact-link rumira-contact-phone" href={`tel:+${PHONE}`} aria-label="Call Rumira Foods at +91 98218 09292">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16.4v3a2 2 0 0 1-2.2 2A18.8 18.8 0 0 1 2.6 5.2 2 2 0 0 1 4.6 3h3a2 2 0 0 1 2 1.7l.4 2.6a2 2 0 0 1-.6 1.7l-1.1 1.1a15 15 0 0 0 5.6 5.6l1.1-1.1a2 2 0 0 1 1.7-.6l2.6.4a2 2 0 0 1 1.7 2Z" /></svg>
      <span>Call us</span>
    </a>
    <a className="rumira-contact-link rumira-contact-whatsapp" href={`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" aria-label="Message Rumira Foods on WhatsApp">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.3 7.6L3 21l1.8-5.1a8.5 8.5 0 1 1 15.7-4.2Z" /><path d="M9 8.2c.3-.3.6-.3.8.1l.9 1.7c.1.3.1.5-.1.7l-.7.8a7.1 7.1 0 0 0 2.7 2.7l.8-.7c.2-.2.4-.2.7-.1l1.7.9c.4.2.4.5.1.8-.5.6-1.1 1-1.8 1-2.6-.1-5.4-2.9-5.5-5.5 0-.7.4-1.3 1-1.8Z" /></svg>
      <span>WhatsApp</span>
    </a>
  </div>;
}

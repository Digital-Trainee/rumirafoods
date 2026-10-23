import React from 'react';

export default function ThankYou({ navigate }) {
  return <section className="rumira-thank-you"><div className="rumira-thank-you-card"><span className="rumira-thank-you-icon" aria-hidden="true">✓</span><small>ENQUIRY SENT</small><h1>Thank you for <em>reaching out.</em></h1><p>We’ve received your enquiry. The Rumira Foods team will get back to you soon.</p><div className="r-actions"><a className="r-btn" href="/products" onClick={(event) => { event.preventDefault(); navigate('/products'); }}>Explore products ↗</a><a className="r-btn green" href="/" onClick={(event) => { event.preventDefault(); navigate('/'); }}>Back to home ↗</a></div></div></section>;
}

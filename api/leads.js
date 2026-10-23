const MAX_BODY_BYTES = 16_384;

function send(res, status, message) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify({ success: status === 200, message }));
}

async function readBody(req) {
  if (req.body !== undefined) return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) throw new Error('Payload too large');
  }
  return JSON.parse(body);
}

const clean = (value, limit) => typeof value === 'string' ? value.trim().slice(0, limit) : '';

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, 'Method not allowed.');
  if (!req.headers['content-type']?.startsWith('application/json')) return send(res, 415, 'Expected JSON.');
  if (Number(req.headers['content-length']) > MAX_BODY_BYTES) return send(res, 413, 'Request too large.');

  let data;
  try {
    data = await readBody(req);
  } catch {
    return send(res, 400, 'Invalid request.');
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return send(res, 400, 'Invalid request.');
  if (data.website) return send(res, 200, 'Enquiry received.');

  const name = clean(data.name, 120);
  const phone = clean(data.phone, 30);
  const email = clean(data.email, 254);
  const message = clean(data.message, 2000);
  const interest = clean(data.interest, 150);
  const source = clean(data.source, 80);
  const products = clean(data.products, 1500);
  if (!name || !phone || !message || !/^[+\d][\d\s()+-]{6,29}$/.test(phone) || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return send(res, 400, 'Please enter your name, valid phone number and enquiry details.');
  }

  const configuredUrl = process.env.PRIVYR_WEBHOOK_URL;
  if (!configuredUrl) return send(res, 503, 'Enquiries are temporarily unavailable. Please contact us by phone or WhatsApp.');

  let webhookUrl;
  try {
    webhookUrl = new URL(configuredUrl);
    if (webhookUrl.protocol !== 'https:' || webhookUrl.hostname !== 'www.privyr.com' || !webhookUrl.pathname.startsWith('/api/v1/incoming-leads/')) throw new Error('Invalid webhook URL');
    webhookUrl.hash = '';
  } catch {
    return send(res, 503, 'Enquiries are temporarily unavailable. Please contact us by phone or WhatsApp.');
  }

  const other_fields = { Message: message, Source: source || 'Rumira Foods website' };
  if (interest && interest !== 'Choose a category') other_fields.Interest = interest;
  if (products) other_fields.Products = products;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, ...(email ? { email } : {}), other_fields }),
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) throw new Error(`Privyr returned ${response.status}`);
    const result = await response.json();
    if (result.success !== true) throw new Error('Privyr did not confirm the lead');
    return send(res, 200, 'Enquiry received.');
  } catch (error) {
    console.error('Privyr lead delivery failed:', error.message);
    return send(res, 502, 'We could not send your enquiry. Please try again or contact us by phone or WhatsApp.');
  }
}

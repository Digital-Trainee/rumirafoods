import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import handler from '../api/leads.js';

const validLead = { name: 'Test Buyer', phone: '+919876543210', email: 'buyer@example.com', message: 'Please share pack sizes.', interest: 'Millet products', products: 'Ragi Chips x2', source: 'Product enquiry' };

async function request(payload, method = 'POST') {
  const req = Readable.from([JSON.stringify(payload)]);
  req.method = method;
  req.headers = { 'content-type': 'application/json' };
  const res = {
    statusCode: 200,
    setHeader() {},
    end(body) { this.body = JSON.parse(body); }
  };
  await handler(req, res);
  return res;
}

test('maps a valid enquiry to the Privyr webhook', async () => {
  const previousUrl = process.env.PRIVYR_WEBHOOK_URL;
  const previousFetch = globalThis.fetch;
  process.env.PRIVYR_WEBHOOK_URL = 'https://www.privyr.com/api/v1/incoming-leads/test/token#generic-webhook';
  let sent;
  globalThis.fetch = async (url, options) => {
    sent = { url: String(url), options };
    return { ok: true, json: async () => ({ success: true, lead_id: 'test-id' }) };
  };
  try {
    const response = await request(validLead);
    assert.equal(response.statusCode, 200);
    assert.equal(sent.url, 'https://www.privyr.com/api/v1/incoming-leads/test/token');
    assert.deepEqual(JSON.parse(sent.options.body), {
      name: 'Test Buyer', phone: '+919876543210', email: 'buyer@example.com',
      other_fields: { Message: 'Please share pack sizes.', Source: 'Product enquiry', Interest: 'Millet products', Products: 'Ragi Chips x2' }
    });
  } finally {
    globalThis.fetch = previousFetch;
    if (previousUrl === undefined) delete process.env.PRIVYR_WEBHOOK_URL;
    else process.env.PRIVYR_WEBHOOK_URL = previousUrl;
  }
});

test('rejects incomplete enquiries before delivery', async () => {
  const response = await request({ name: 'Test Buyer', message: 'Hello' });
  assert.equal(response.statusCode, 400);
});

test('does not report success when Privyr rejects a lead', async () => {
  const previousUrl = process.env.PRIVYR_WEBHOOK_URL;
  const previousFetch = globalThis.fetch;
  const previousLog = console.error;
  process.env.PRIVYR_WEBHOOK_URL = 'https://www.privyr.com/api/v1/incoming-leads/test/token';
  globalThis.fetch = async () => ({ ok: false, status: 403 });
  console.error = () => {};
  try {
    const response = await request(validLead);
    assert.equal(response.statusCode, 502);
    assert.equal(response.body.success, false);
  } finally {
    console.error = previousLog;
    globalThis.fetch = previousFetch;
    if (previousUrl === undefined) delete process.env.PRIVYR_WEBHOOK_URL;
    else process.env.PRIVYR_WEBHOOK_URL = previousUrl;
  }
});

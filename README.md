# Rumira Foods website

React and Vite website with catalogue and enquiry forms.

## Lead delivery

The contact page and product enquiry form send a JSON request to `/api/leads`. The server-side endpoint forwards it to Privyr and returns success only when Privyr confirms receipt. The webhook URL must stay in a server-side environment variable; it must never be prefixed with `VITE_` or placed in frontend source.

For local development, copy `.env.example` to `.env.local`, set `PRIVYR_WEBHOOK_URL` to the Privyr incoming-leads URL, and run `npm run dev`. The Vite development server handles `/api/leads` locally.

For Vercel, import this GitHub repository, add `PRIVYR_WEBHOOK_URL` under Project Settings → Environment Variables for Production, Preview, and Development as needed, then deploy. The `/api/leads` serverless function and `vercel.json` route rewrites are included. Use the webhook URL without the `#generic-webhook` fragment.

Run `npm run build` to verify the frontend and `node --test tests/leads.test.js` to verify the lead endpoint without creating a real Privyr lead.

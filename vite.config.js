import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const siteUrl = process.env.RUMIRA_SITE_URL?.trim();
const socialBase = siteUrl ? new URL(siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`) : null;
if (socialBase && !['http:', 'https:'].includes(socialBase.protocol)) {
  throw new Error('RUMIRA_SITE_URL must be an HTTP or HTTPS URL');
}

export default defineConfig({
  appType: 'spa',
  plugins: [react(), {
    name: 'rumira-social-url',
    transformIndexHtml(html) {
      if (!socialBase) return html;
      const imageUrl = new URL('og-rumira-foods.png', socialBase).href;
      return html
        .replaceAll('content="/og-rumira-foods.png"', `content="${imageUrl}"`)
        .replace('</head>', `  <meta property="og:url" content="${socialBase.href}" />\n  <link rel="canonical" href="${socialBase.href}" />\n</head>`);
    }
  }, {
    name: 'rumira-route-fallback',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (['/products', '/process', '/contact'].includes(req.url)) req.url = '/index.html';
        next();
      });
    }
  }]
});

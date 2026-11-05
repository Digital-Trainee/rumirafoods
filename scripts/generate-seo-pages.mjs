import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pageSeo, defaultSiteUrl } from '../src/seo-config.js';

const dist = join(process.cwd(), 'dist');
const template = await readFile(join(dist, 'index.html'), 'utf8');
const products = [
  ...JSON.parse(await readFile('src/catalog-data.json', 'utf8')),
  ...JSON.parse(await readFile('src/dip-products.json', 'utf8'))
];
const siteUrl = process.env.RUMIRA_SITE_URL?.trim() || defaultSiteUrl;
const base = new URL(siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`);
if (!['http:', 'https:'].includes(base.protocol)) throw new Error('RUMIRA_SITE_URL must be an HTTP or HTTPS URL');

const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function setMeta(html, attribute, name, value) {
  const tag = `<meta ${attribute}="${name}" content="${escapeHtml(value)}" />`;
  const pattern = new RegExp(`<meta\\s+${attribute}="${escapeRegex(name)}"[^>]*\\/?>`);
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `  ${tag}\n</head>`);
}

function render(path) {
  const seo = pageSeo(path, products, base.href);
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
  for (const [attribute, name, value] of [
    ['name', 'description', seo.description],
    ['name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow'],
    ['property', 'og:type', seo.type],
    ['property', 'og:title', seo.title],
    ['property', 'og:description', seo.description],
    ['property', 'og:url', seo.url],
    ['property', 'og:image', seo.imageUrl],
    ['property', 'og:image:type', seo.product ? 'image/jpeg' : 'image/png'],
    ['property', 'og:image:alt', seo.imageAlt],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', seo.title],
    ['name', 'twitter:description', seo.description],
    ['name', 'twitter:image', seo.imageUrl]
  ]) html = setMeta(html, attribute, name, value);
  html = html.replace(/<meta property="og:image:(?:width|height)"[^>]*\/?>\s*/g, '');
  const canonical = `<link rel="canonical" href="${escapeHtml(seo.url)}" />`;
  html = /<link rel="canonical"[^>]*\/?>/.test(html)
    ? html.replace(/<link rel="canonical"[^>]*\/?>/, canonical)
    : html.replace('</head>', `  ${canonical}\n</head>`);
  if (seo.product) {
    const structured = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: seo.product.name,
      description: seo.product.description,
      image: seo.imageUrl,
      brand: { '@type': 'Brand', name: 'Rumira Foods' }
    };
    html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(structured).replaceAll('<', '\\u003c')}</script>\n</head>`);
  } else if (path === '/') {
    const structured = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Rumira Foods',
      url: base.href,
      logo: new URL('favicon.svg', base).href
    };
    html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(structured)}</script>\n</head>`);
  }
  return html;
}

const routes = ['/', '/about', '/products', '/process', '/contact', '/thank-you', ...products.map((item) => `/products/${item.id}`)];
await writeFile(join(dist, 'index.html'), render('/'));
for (const path of routes.slice(1)) {
  const destination = join(dist, 'meta', `${path.slice(1)}.html`);
  await mkdir(join(destination, '..'), { recursive: true });
  await writeFile(destination, render(path));
}
const indexedRoutes = routes.filter((path) => path !== '/thank-you');
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexedRoutes.map((path) => `  <url><loc>${escapeHtml(new URL(path.slice(1), base).href)}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', base).href}\n`);
console.log(`Generated metadata for ${routes.length} routes and ${indexedRoutes.length} sitemap URLs.`);

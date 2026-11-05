import { readFile, readdir, access } from 'node:fs/promises';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const productFiles = (await readdir(join(dist, 'meta/products'))).map((name) => `meta/products/${name}`);
const pages = ['index.html', 'meta/about.html', 'meta/products.html', 'meta/process.html', 'meta/contact.html', 'meta/thank-you.html', ...productFiles];
const required = [/<title>[^<]+<\/title>/, /<meta name="description" content="[^"]+"/, /<meta property="og:title" content="[^"]+"/, /<meta property="og:description" content="[^"]+"/, /<meta property="og:image" content="https:\/\/[^\"]+"/, /<meta property="og:url" content="https:\/\/[^\"]+"/, /<link rel="canonical" href="https:\/\/[^\"]+"/];
const errors = [];
for (const page of pages) {
  const html = await readFile(join(dist, page), 'utf8');
  for (const pattern of required) if (!pattern.test(html)) errors.push(`${page}: missing ${pattern}`);
  if ((html.match(/rel="canonical"/g) || []).length !== 1) errors.push(`${page}: canonical count`);
  const image = html.match(/<meta property="og:image" content="([^"]+)"/)[1];
  await access(join(dist, new URL(image).pathname)).catch(() => errors.push(`${page}: missing image ${image}`));
  if (page === 'meta/thank-you.html' && !html.includes('content="noindex, nofollow"')) errors.push('Thank-you page must be noindex');
}
const ashwagandha = await readFile(join(dist, 'meta/products/botanicals-ashwagandha.html'), 'utf8');
if (!ashwagandha.includes('/product-images/botanicals-ashwagandha.jpg')) errors.push('Ashwagandha image metadata is incorrect');
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
if ((sitemap.match(/<loc>/g) || []).length !== pages.length - 1) errors.push('Sitemap URL count does not match indexable pages');
console.log(`Checked ${pages.length} page metadata files and ${pages.length - 1} sitemap URLs: ${errors.length} errors.`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }

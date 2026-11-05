import { pageSeo } from './seo-config.js';

function setMeta(attribute, key, value) {
  let tag = [...document.querySelectorAll('meta')].find((item) => item.getAttribute(attribute) === key);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.append(tag);
  }
  tag.setAttribute('content', value);
}

export function updatePageSeo(path, products) {
  const seo = pageSeo(path, products, location.origin);
  document.title = seo.title;
  setMeta('name', 'description', seo.description);
  setMeta('name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow');
  setMeta('property', 'og:type', seo.type);
  setMeta('property', 'og:title', seo.title);
  setMeta('property', 'og:description', seo.description);
  setMeta('property', 'og:url', seo.url);
  setMeta('property', 'og:image', seo.imageUrl);
  setMeta('property', 'og:image:type', seo.product ? 'image/jpeg' : 'image/png');
  setMeta('property', 'og:image:alt', seo.imageAlt);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', seo.title);
  setMeta('name', 'twitter:description', seo.description);
  setMeta('name', 'twitter:image', seo.imageUrl);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  canonical.href = seo.url;
  for (const property of ['og:image:width', 'og:image:height']) {
    document.querySelector(`meta[property="${property}"]`)?.remove();
  }
}

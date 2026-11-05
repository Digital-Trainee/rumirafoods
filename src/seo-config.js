export const defaultSiteUrl = 'https://rumirafoods.vercel.app';

const pageDetails = {
  '/': {
    title: 'Rumira Foods | Healthy Food Everyday',
    description: 'Rumira Group brings you thoughtfully processed, clean label food. Explore fruits, vegetable powders, millets, snacks, coffee dips and teas from harvest to home.'
  },
  '/about': {
    title: 'About Rumira Foods | From Farm to Food',
    description: 'Learn how Rumira connects farming communities, careful processing and packaging to bring quality food from harvest to home.'
  },
  '/products': {
    title: 'Our Products | Rumira Foods',
    description: 'Explore Rumira Foods vegetable powders, dehydrated fruits, Millet & You products, savoury snacks, seasonings, botanical ingredients, coffee dips and teas.'
  },
  '/process': {
    title: 'Process & Production | Rumira Foods',
    description: 'See how Rumira connects farmer-linked sourcing with fruit and vegetable dehydration, quality checks and in-house packaging.'
  },
  '/contact': {
    title: 'Contact Rumira Foods | Product Enquiries',
    description: 'Contact Rumira Foods for product specifications, availability, pack formats and B2B or HORECA enquiries.'
  },
  '/thank-you': {
    title: 'Thank You | Rumira Foods',
    description: 'Thank you for contacting Rumira Foods. Our team will review your enquiry.',
    noindex: true
  }
};

function shorten(text, limit = 160) {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 1).replace(/\s+\S*$/, '')}…`;
}

export function pageSeo(path, products, siteUrl = defaultSiteUrl) {
  const base = new URL(siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`);
  const cleanPath = path === '/' ? '/' : path.replace(/\/$/, '');
  const product = products.find((item) => `/products/${item.id}` === cleanPath);
  const details = product ? {
    title: `${product.id === 'botanicals-ashwagandha' ? 'Ashwagandha Powder' : product.name} | Rumira Foods`,
    description: product.id === 'botanicals-ashwagandha'
      ? 'Explore Rumira Foods Ashwagandha Powder, made from selected ashwagandha roots. Ask our team for botanical identity, quality and supply specifications.'
      : shorten(product.description),
    image: product.image,
    imageAlt: product.imageAlt || `${product.name} from Rumira Foods`,
    type: 'product',
    product
  } : pageDetails[cleanPath] || { ...pageDetails['/'], noindex: true };
  return {
    ...details,
    url: new URL(cleanPath.replace(/^\//, ''), base).href,
    imageUrl: new URL((details.image || '/og-rumira-foods.png').replace(/^\//, ''), base).href,
    imageAlt: details.imageAlt || 'Rumira Foods food and ingredient collection',
    type: details.type || 'website'
  };
}

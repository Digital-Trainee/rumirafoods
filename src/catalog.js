import productData from './catalog-data.json';

export const groups = [
  { id: 'powders', name: 'Vegetable powders', title: 'Dehydrated vegetable powders', audience: 'Food ingredients', intro: 'Controlled dehydration · Fine milling · Versatile food ingredients' },
  { id: 'fruits', name: 'Dehydrated fruits', title: 'Dehydrated fruits', audience: 'Ready to eat', intro: 'Fruit-led snacking · Carefully processed · Convenient formats' },
  { id: 'millets', name: 'Millet products', title: 'Millet products', audience: 'Ready to cook / eat', intro: 'Grain-based innovation · Recipe consistency · Convenient preparation' },
  { id: 'snacks', name: 'Savoury snacks', title: 'Savoury snacks', audience: 'Retail snacks', intro: 'Ingredient transparency · Controlled processing · Flavour innovation' },
  { id: 'seasonings', name: 'Seasonings & masalas', title: 'Seasonings & masala products', audience: 'Everyday flavour', intro: 'Aromatic ingredients · Controlled blending · Consistent seasoning performance' },
  { id: 'botanicals', name: 'Botanical ingredients', title: 'Botanical powders & nutraceutical ingredients', audience: 'Qualified applications', intro: 'Verified sourcing · Identity testing · Defined specifications' }
];

export const catalog = productData.map((product) => ({ ...product, group: groups.find((group) => group.id === product.groupId) }));
export const groupImage = (id) => catalog.find((product) => product.groupId === id)?.image;

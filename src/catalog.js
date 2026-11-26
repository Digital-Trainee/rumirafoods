import productData from './catalog-data.json';
import dipProducts from './dip-products.json';

export const groups = [
  { id: 'powders', name: 'Vegetable powders', title: 'Dehydrated vegetable powders', audience: 'Food ingredients', intro: 'Controlled dehydration · Fine milling · Versatile food ingredients' },
  { id: 'fruits', name: 'Dehydrated fruits', title: 'Dehydrated fruits', audience: 'Ready to eat', intro: 'Fruit-led snacking · Carefully processed · Convenient formats' },
  { id: 'millets', name: 'Millet & You', title: 'Millet & You', audience: 'Millet products', intro: 'Millet-led snacks, mixes and everyday foods · Ready to cook or enjoy' },
  { id: 'snacks', name: 'Savoury snacks', title: 'Savoury snacks', audience: 'Retail snacks', intro: 'Ingredient transparency · Controlled processing · Flavour innovation' },
  { id: 'seasonings', name: 'Seasonings & masalas', title: 'Seasonings & masala products', audience: 'Everyday flavour', intro: 'Aromatic ingredients · Controlled blending · Consistent seasoning performance' },
  { id: 'botanicals', name: 'Nutraceuticals', title: 'Nutraceuticals', audience: '', intro: 'Verified sourcing · Identity testing · Defined specifications' },
  { id: 'herbal-teas', name: 'Tea', title: 'Tea collection', audience: 'Tea and infusions', intro: 'Botanical blends · Everyday rituals · Nine distinctive teas' },
  { id: 'coffee-dips', name: 'Coffee', title: 'Coffee collection', audience: 'Coffee blends', intro: 'Aromatic coffee · Botanical ingredients · Five distinctive blends' },
  { id: 'flavoured-coffee', name: 'Flavoured coffee', title: 'Flavoured coffee dips', audience: 'Easy-brew coffee', intro: 'Berry · Orange · Cardamom · Chocolate' }
];

export const catalog = [...productData, ...dipProducts].map((product) => ({ ...product, group: groups.find((group) => group.id === product.groupId) }));
const categoryImages = {
  'coffee-dips': '/product-images/coffee-ashwagandha.jpg',
  'flavoured-coffee': '/product-images/flavoured-coffee-cardamom-client.jpg',
  'herbal-teas': '/product-images/tea-ashwagandha-calm.jpg'
};

export const groupImage = (id) => categoryImages[id] || catalog.find((product) => product.groupId === id)?.image;

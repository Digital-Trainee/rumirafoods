import productData from './catalog-data.json';
import dipProducts from './dip-products.json';

export const groups = [
  { id: 'powders', name: 'Vegetable powders', title: 'Dehydrated vegetable powders', audience: 'Food ingredients', intro: 'Controlled dehydration · Fine milling · Versatile food ingredients' },
  { id: 'fruits', name: 'Dehydrated fruits', title: 'Dehydrated fruits', audience: 'Ready to eat', intro: 'Fruit-led snacking · Carefully processed · Convenient formats' },
  { id: 'millets', name: 'Millet & You', title: 'Millet & You', audience: 'Millet products', intro: 'Millet-led snacks, mixes and everyday foods · Ready to cook or enjoy' },
  { id: 'snacks', name: 'Savoury snacks', title: 'Savoury snacks', audience: 'Retail snacks', intro: 'Ingredient transparency · Controlled processing · Flavour innovation' },
  { id: 'seasonings', name: 'Seasonings & masalas', title: 'Seasonings & masala products', audience: 'Everyday flavour', intro: 'Aromatic ingredients · Controlled blending · Consistent seasoning performance' },
  { id: 'botanicals', name: 'Botanical ingredients', title: 'Botanical powders & nutraceutical ingredients', audience: 'Qualified applications', intro: 'Verified sourcing · Identity testing · Defined specifications' },
  { id: 'coffee-dips', name: 'Coffee easy dips', title: 'Functional coffee dips', audience: 'Easy-brew coffee', intro: 'Ingredient-led blends · Convenient dip bags · Everyday brewing' },
  { id: 'flavoured-coffee', name: 'Flavoured coffee', title: 'Flavoured coffee dips', audience: 'Easy-brew coffee', intro: 'Familiar flavours · Aromatic coffee · Convenient dip bags' },
  { id: 'herbal-teas', name: 'Herbal dip teas', title: 'Herbal dip teas & green teas', audience: 'Tea and infusions', intro: 'Botanical blends · Easy-to-prepare dips · Gentle everyday rituals' }
];

export const catalog = [...productData, ...dipProducts].map((product) => ({ ...product, group: groups.find((group) => group.id === product.groupId) }));
export const groupImage = (id) => catalog.find((product) => product.groupId === id)?.image;

const categories = [
  ['all', 'All products'], ['powders', 'Vegetable powders'], ['fruits', 'Dehydrated fruits'], ['millets', 'Millet products'], ['snacks', 'Healthy snacks'], ['seasonings', 'Seasonings & masalas']
];
const basketKey = 'rumira-enquiry-basket';
const readBasket = () => JSON.parse(localStorage.getItem(basketKey) || '[]');
const saveBasket = (items) => localStorage.setItem(basketKey, JSON.stringify(items));

function initProductTools() {
  const list = document.querySelector('.r-products');
  if (!list || list.dataset.toolsReady) return;
  list.dataset.toolsReady = 'true';
  const toolbar = document.createElement('div');
  toolbar.className = 'product-tools';
  toolbar.innerHTML = `<div><strong>Explore our range</strong><span>Choose a category or add products to your enquiry.</span></div><div class="catalogue-controls"><div class="product-filters">${categories.map(([id, label], i) => `<button class="${i === 0 ? 'selected' : ''}" data-filter="${id}">${label}</button>`).join('')}</div><label class="product-search">⌕<input type="search" placeholder="Find a product" aria-label="Find a product" /></label></div>`;
  list.prepend(toolbar);
  const rows = [...list.querySelectorAll(':scope > article')];
  rows.forEach((row) => {
    const title = row.querySelector('h2')?.textContent || 'Rumira Foods product';
    const button = document.createElement('button');
    button.className = 'enquiry-add';
    button.type = 'button';
    button.textContent = '＋ Add to enquiry';
    button.addEventListener('click', () => {
      const basket = readBasket();
      if (!basket.includes(title)) basket.push(title);
      saveBasket(basket);
      updateBasket();
      button.textContent = '✓ Added to enquiry';
      button.classList.add('added');
      const modal = document.querySelector('.enquiry-modal');
      const message = modal?.querySelector('textarea[name="message"]');
      if (message && !message.value.includes(title)) message.value = `${title} - please share details and available options.`;
      modal?.classList.add('visible');
    });
    row.querySelector('main')?.appendChild(button);
    const productList = row.querySelector('section');
    productList?.querySelectorAll('span').forEach((item) => {
      const productButton = document.createElement('button');
      productButton.className = 'product-item';
      productButton.type = 'button';
      const categoryImage = row.querySelector(':scope > div')?.style.backgroundImage;
      if (categoryImage) productButton.style.setProperty('--product-image', categoryImage);
      productButton.innerHTML = `<i aria-hidden="true"></i><span>${item.textContent}</span><b>＋</b>`;
      productButton.addEventListener('click', () => {
        const product = item.textContent;
        const basket = readBasket();
        if (!basket.includes(product)) basket.push(product);
        saveBasket(basket);
        updateBasket();
        productButton.classList.add('added');
        productButton.querySelector('b').textContent = '✓';
        const modal = document.querySelector('.enquiry-modal');
        const message = modal?.querySelector('textarea[name="message"]');
        if (message && !message.value.includes(product)) message.value = `${product} - please share details and available options.`;
        modal?.classList.add('visible');
      });
      item.replaceWith(productButton);
    });
  });
  const grid = document.createElement('div');
  grid.className = 'catalogue-grid';
  rows.forEach((row) => {
    const category = row.id;
    const categoryLabel = row.querySelector('main>small')?.textContent || 'Rumira collection';
    const image = row.querySelector(':scope > div')?.style.backgroundImage || '';
    row.querySelectorAll('.product-item').forEach((source) => {
      const title = source.querySelector('span')?.textContent || 'Rumira product';
      const card = document.createElement('article');
      card.className = 'catalogue-card';
      card.dataset.category = category;
      card.dataset.search = title.toLowerCase();
      card.innerHTML = `<div class="catalogue-image" style="background-image:${image}"><span>Rumira Foods</span></div><div class="catalogue-meta"><small>${categoryLabel}</small><div class="catalogue-title"><h3>${title}</h3><button type="button" aria-label="Add ${title} to enquiry">＋</button></div><div class="catalogue-rating"><b>★★★★★</b><strong>New Rumira rating</strong></div><p>Thoughtfully made for better everyday choices.</p></div>`;
      card.querySelector('button').addEventListener('click', () => source.click());
      grid.appendChild(card);
    });
  });
  list.appendChild(grid);
  rows.forEach((row) => { row.hidden = true; });
  toolbar.querySelectorAll('[data-filter]').forEach((filter) => filter.addEventListener('click', () => {
    toolbar.querySelectorAll('button').forEach((item) => item.classList.remove('selected'));
    filter.classList.add('selected');
    const value = filter.dataset.filter;
    rows.forEach((row) => { row.hidden = true; });
    grid.querySelectorAll('.catalogue-card').forEach((card) => { card.hidden = value !== 'all' && card.dataset.category !== value; });
  }));
  toolbar.querySelector('input').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase().trim();
    grid.querySelectorAll('.catalogue-card').forEach((card) => { card.hidden = query && !card.dataset.search.includes(query); });
  });
  const basketPanel = document.createElement('aside');
  basketPanel.className = 'enquiry-panel';
  basketPanel.innerHTML = '<strong>My enquiry</strong><span class="enquiry-count">0 products</span><div class="enquiry-items"></div><a class="enquiry-send" target="_blank" rel="noreferrer">Send on WhatsApp ↗</a>';
  document.body.appendChild(basketPanel);
  updateBasket();
}

function initPageCtas() {
  const headerCta = document.querySelector('.r-header-cta');
  if (headerCta && !headerCta.dataset.enquiryReady) {
    headerCta.dataset.enquiryReady = 'true';
    headerCta.textContent = 'Enquire now ↗';
    headerCta.href = '#enquire';
    headerCta.addEventListener('click', (event) => { event.preventDefault(); document.querySelector('.enquiry-modal')?.classList.add('visible'); });
  }
  if (document.querySelector('.r-steps') && !document.querySelector('.r-process-cta')) {
    const cta = document.createElement('section');
    cta.className = 'r-process-cta';
    cta.innerHTML = '<div><small>LET’S WORK TOGETHER</small><h2>Looking for a reliable<br /><em>food partner?</em></h2></div><a class="r-btn green" href="#enquire">Send an enquiry ↗</a>';
    cta.querySelector('a').addEventListener('click', (event) => { event.preventDefault(); document.querySelector('.enquiry-modal')?.classList.add('visible'); });
    document.querySelector('.r-steps').after(cta);
  }
}

function initReferenceSections() {
  const homeGrid = document.querySelector('.r-grid');
  if (homeGrid && !document.querySelector('.r-quality')) {
    const quality = document.createElement('section');
    quality.className = 'r-quality';
    quality.innerHTML = '<div class="r-quality-heading"><small>WHY CHOOSE RUMIRA?</small><h2>Quality you can<br /><em>feel good about.</em></h2></div><div class="r-quality-grid"><article><b>✳</b><h3>Carefully sourced</h3><p>We choose ingredients for freshness, flavour, and dependable quality across every category.</p></article><article><b>◌</b><h3>Hygiene first</h3><p>Our process is designed around clean handling, careful preparation, and consistent production.</p></article><article><b>◇</b><h3>Made for freshness</h3><p>Thoughtful processing and practical packs help protect flavour, texture, and everyday convenience.</p></article><article><b>✓</b><h3>Built for business</h3><p>Flexible product categories make Rumira a useful partner for retail, food service, and bulk requirements.</p></article></div>';
    homeGrid.after(quality);
  }
  const productsList = document.querySelector('.r-products');
  if (productsList && !document.querySelector('.r-pack-note')) {
    const note = document.createElement('div');
    note.className = 'r-pack-note';
    note.innerHTML = '<div><small>PACKED FOR YOUR REQUIREMENTS</small><h2>From everyday packs<br /><em>to bulk supply.</em></h2></div><p>Ask our team about retail-ready packs, food-service quantities, private label opportunities, and B2B supply requirements.</p><a class="r-btn green" href="#enquire">Discuss your requirement ↗</a>';
    note.querySelector('a').addEventListener('click', (event) => { event.preventDefault(); document.querySelector('.enquiry-modal')?.classList.add('visible'); });
    productsList.prepend(note);
  }
}

function updateBasket() {
  const basket = readBasket();
  const count = document.querySelector('.enquiry-count');
  const items = document.querySelector('.enquiry-items');
  const send = document.querySelector('.enquiry-send');
  if (!count || !items || !send) return;
  count.textContent = `${basket.length} product${basket.length === 1 ? '' : 's'}`;
  items.innerHTML = basket.length ? basket.map((item) => `<span>${item}</span>`).join('') : '<em>Add products to build your enquiry list.</em>';
  send.href = `https://wa.me/919999179434?text=${encodeURIComponent(`Hello Rumira Foods, I am interested in: ${basket.join(', ') || 'your product range'}.`)}`;
}

const observer = new MutationObserver(() => { initProductTools(); initPageCtas(); initReferenceSections(); });
observer.observe(document.body, { childList: true, subtree: true });
setTimeout(initProductTools, 250);

function initEnquiryPopup() {
  if (document.querySelector('.enquiry-modal')) return;
  const modal = document.createElement('div');
  modal.className = 'enquiry-modal';
  modal.innerHTML = `<div class="enquiry-backdrop"></div><section class="enquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="enquiry-title"><button class="enquiry-close" type="button" aria-label="Close enquiry form">×</button><small>LET’S GROW TOGETHER</small><h2 id="enquiry-title">Tell us what you’re<br /><em>looking for.</em></h2><p>Share your requirements and our team will connect with you on WhatsApp.</p><form><div class="enquiry-fields"><label>Name<input name="name" required placeholder="Your name" /></label><label>Phone<input name="phone" required type="tel" placeholder="+91 00000 00000" /></label></div><label>Email<input name="email" type="email" placeholder="you@company.com" /></label><label>Interested in<select name="interest"><option>Choose a category</option><option>Vegetable powders · B2B</option><option>Dehydrated fruits</option><option>Millet products</option><option>Healthy snacks</option><option>Seasonings & masalas</option><option>Bulk / private label enquiry</option></select></label><label>Message<textarea name="message" rows="3" placeholder="Tell us about your requirement..."></textarea></label><button class="enquiry-submit" type="submit">Send enquiry on WhatsApp ↗</button></form></section>`;
  document.body.appendChild(modal);
  const close = () => { modal.classList.remove('visible'); sessionStorage.setItem('rumira-popup-closed', '1'); };
  modal.querySelector('.enquiry-close').addEventListener('click', close);
  modal.querySelector('.enquiry-backdrop').addEventListener('click', close);
  modal.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hello Rumira Foods, I would like to enquire. Name: ${data.get('name')}; Phone: ${data.get('phone')}; Email: ${data.get('email') || 'Not provided'}; Interest: ${data.get('interest')}; Message: ${data.get('message') || 'Not provided'}`;
    window.open(`https://wa.me/919999179434?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    close();
  });
  if (!sessionStorage.getItem('rumira-popup-closed')) setTimeout(() => modal.classList.add('visible'), 3200);
}
setTimeout(initEnquiryPopup, 700);
setTimeout(initPageCtas, 900);
setTimeout(initReferenceSections, 1000);

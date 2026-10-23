sessionStorage.setItem('rumira-popup-closed', '1');

function repairCatalogue() {
  const list = document.querySelector('.r-products');
  if (!list) return;

  const header = document.querySelector('.r-header');
  if (header && !header.dataset.stripReady) {
    header.dataset.stripReady = 'true';
    const strip = document.createElement('div');
    strip.className = 'site-strip';
    strip.textContent = 'Naturally better ingredients. Thoughtfully made for today.';
    header.before(strip);
  }

  const hero = document.querySelector('.r-page-hero');
  if (hero && !hero.dataset.catalogueHeroReady) {
    hero.dataset.catalogueHeroReady = 'true';
    const label = hero.querySelector('small');
    const heading = hero.querySelector('h1');
    const copy = hero.querySelector('p');
    if (label) label.textContent = 'THE RUMIRA FOODS COLLECTION';
    if (heading) heading.innerHTML = 'Find your kind of <em>goodness.</em>';
    if (copy) copy.textContent = 'From functional ingredients for food makers to delicious everyday snacks, explore the Rumira range.';
  }

  const packNote = list.querySelector('.r-pack-note');
  if (packNote && !packNote.dataset.referenceReady) {
    packNote.dataset.referenceReady = 'true';
    packNote.innerHTML = '<div class="pack-sizes"><strong>100 g</strong><span>|</span><strong>200 g</strong><span>|</span><strong>500 g</strong><span>|</span><strong>1 kg</strong></div><p>From a small everyday pack to larger food-service quantities, ask us about the right format for your requirement.</p><a class="pack-enquire" href="#enquire">Ask about bulk supply ↗</a>';
    packNote.querySelector('.pack-enquire').addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('.enquiry-modal')?.classList.add('visible');
    });
  }

  const rows = [...list.querySelectorAll(':scope > article[hidden]')];
  rows.forEach((row) => {
    row.style.display = 'none';
  });

  const images = new Map(
    rows.map((row) => [row.id, row.querySelector(':scope > div')?.style.backgroundImage || ''])
  );

  const imagePools = {
    powders: [
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1525059696034-4967a729002d?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=85'
    ],
    fruits: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=900&q=85'
    ],
    millets: [
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=900&q=85'
    ],
    snacks: [
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85'
    ],
    seasonings: [
      'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=900&q=85'
    ]
  };
  const imageIndexes = {};

  list.querySelectorAll('.catalogue-card').forEach((card) => {
    if (card.dataset.cardReady === 'true') return;
    card.dataset.cardReady = 'true';
    const category = card.dataset.category;
    const pool = imagePools[category] || [];
    const index = imageIndexes[category] || 0;
    imageIndexes[category] = index + 1;
    const image = pool[index % pool.length] ? `url("${pool[index % pool.length]}")` : images.get(category);
    const imagePanel = card.querySelector('.catalogue-image');
    if (image && imagePanel) imagePanel.style.backgroundImage = image;
    const rating = card.querySelector('.catalogue-rating strong');
    if (rating) rating.textContent = 'Thoughtfully made';
    const description = card.querySelector('.catalogue-meta p');
    if (description) description.textContent = category === 'powders'
      ? 'Clean, versatile ingredients for everyday food making.'
      : category === 'fruits'
        ? 'Naturally sweet, convenient fruit goodness.'
        : category === 'millets'
          ? 'Wholesome millet favourites made for modern routines.'
          : category === 'snacks'
            ? 'Crispy, satisfying snacks with a better ingredient story.'
            : 'Aromatic blends to finish everyday dishes beautifully.';
  });

  const toolbar = list.querySelector('.product-tools');
  const grid = list.querySelector('.catalogue-grid');
  if (toolbar && grid && !toolbar.dataset.filterFixReady) {
    toolbar.dataset.filterFixReady = 'true';
    const cards = [...grid.querySelectorAll('.catalogue-card')];
    const applyFilter = (value, query = '') => {
      toolbar.querySelectorAll('[data-filter]').forEach((button) => {
        button.classList.toggle('selected', button.dataset.filter === value);
      });
      cards.forEach((card) => {
        const matchesCategory = value === 'all' || card.dataset.category === value;
        const matchesSearch = !query || card.dataset.search.includes(query);
        card.hidden = !(matchesCategory && matchesSearch);
      });
    };
    toolbar.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      event.preventDefault();
      applyFilter(button.dataset.filter, toolbar.querySelector('input')?.value.toLowerCase().trim() || '');
    });
    toolbar.querySelector('input')?.addEventListener('input', (event) => {
      const selected = toolbar.querySelector('[data-filter].selected')?.dataset.filter || 'all';
      applyFilter(selected, event.target.value.toLowerCase().trim());
    });
  }

  const basket = document.querySelector('.enquiry-panel');
  if (basket && !basket.dataset.compactReady) {
    basket.dataset.compactReady = 'true';
    basket.classList.add('compact');
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'drawer-close';
    close.setAttribute('aria-label', 'Close enquiry basket');
    close.textContent = '×';
    basket.prepend(close);
    close.addEventListener('click', (event) => {
      event.stopPropagation();
      basket.classList.remove('open');
    });
    basket.addEventListener('click', (event) => {
      if (!basket.classList.contains('open') && !event.target.closest('.enquiry-send')) {
        basket.classList.add('open');
      }
    });
  }
}

const catalogueObserver = new MutationObserver(repairCatalogue);
catalogueObserver.observe(document.body, { childList: true, subtree: true });
setTimeout(repairCatalogue, 350);
setTimeout(() => {
  document.querySelector('.enquiry-modal')?.classList.remove('visible');
}, 1400);

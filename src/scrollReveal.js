const SELECTOR = [
  '.r-grid > a',
  '.r-story article',
  '.r-steps article',
  '.r-process-note',
  '.r-quote blockquote',
  '.px-group-heading',
  '.px-card',
  '.px-banner > .px-container',
  '.px-related-title'
].join(',');

export function setupScrollReveal() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;

  const root = document.getElementById('rumira-app');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  const scan = () => {
    root.querySelectorAll(SELECTOR).forEach((element, index) => {
      if (element.classList.contains('rumira-reveal')) return;
      element.style.setProperty('--rumira-delay', `${(index % 3) * 80}ms`);
      element.classList.add('rumira-reveal');
      observer.observe(element);
    });
  };

  scan();
  const changes = new MutationObserver(scan);
  changes.observe(root, { childList: true, subtree: true });
  return () => { changes.disconnect(); observer.disconnect(); };
}

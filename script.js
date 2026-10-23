document.querySelector('.menu-toggle')?.addEventListener('click',()=>document.querySelector('.site-header').classList.toggle('menu-open'));
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>document.querySelector('.site-header')?.classList.remove('menu-open')));

// Contact details and conversion CTAs are kept in one place so every page stays in sync.
const rumiraEmail = 'rumira2025@gmail.com';
const rumiraWhatsApp = '919821809292';
const whatsappMessage = encodeURIComponent("Hello Rumira Foods, I'd like to know more about your products.");
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.href = `mailto:${rumiraEmail}`;
  link.textContent = rumiraEmail;
});
document.querySelectorAll('.footer-title').forEach(title => {
  if (title.textContent.trim().toLowerCase() === 'connect' && !title.parentElement.querySelector('.footer-whatsapp')) {
    const link = document.createElement('a');
    link.className = 'footer-whatsapp';
    link.href = `https://wa.me/${rumiraWhatsApp}`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = '+91 98218 09292 · WhatsApp';
    title.parentElement.appendChild(link);
  }
});
if (document.querySelector('.contact-details') && !document.querySelector('.contact-phone')) {
  const phone = document.createElement('div');
  phone.className = 'contact-phone';
  phone.innerHTML = `<span>WhatsApp</span><a href="https://wa.me/${rumiraWhatsApp}" target="_blank" rel="noopener">+91 98218 09292</a>`;
  document.querySelector('.contact-details').appendChild(phone);
}
document.querySelectorAll('.nav-cta').forEach(link => {
  link.href = `https://wa.me/${rumiraWhatsApp}`;
  link.target = '_blank';
  link.rel = 'noopener';
  link.innerHTML = 'WhatsApp us <span>↗</span>';
});
if (!document.querySelector('.floating-whatsapp')) {
  const chat = document.createElement('a');
  chat.className = 'floating-whatsapp';
  chat.href = `https://wa.me/${rumiraWhatsApp}?text=${whatsappMessage}`;
  chat.target = '_blank';
  chat.rel = 'noopener';
  chat.setAttribute('aria-label', 'Chat with Rumira Foods on WhatsApp');
  chat.innerHTML = '<span class="whatsapp-icon">◔</span><span>Chat with us</span>';
  document.body.appendChild(chat);
}
if (document.querySelector('.contact-form') && !document.querySelector('.contact-whatsapp')) {
  const button = document.createElement('a');
  button.className = 'button button-whatsapp contact-whatsapp';
  button.href = `https://wa.me/${rumiraWhatsApp}?text=${whatsappMessage}`;
  button.target = '_blank';
  button.rel = 'noopener';
  button.innerHTML = 'WhatsApp us <span>↗</span>';
  document.querySelector('.contact-form .button')?.after(button);
}
const injectedStyles = document.createElement('style');
injectedStyles.textContent = `.button-whatsapp{color:#fff;background:#218c58}.contact-whatsapp{display:inline-flex;margin-top:8px}.floating-whatsapp{position:fixed;right:24px;bottom:24px;z-index:10;display:flex;align-items:center;gap:9px;padding:13px 17px;border-radius:30px;background:#218c58;color:#fff;box-shadow:0 8px 25px rgba(33,140,88,.3);font-size:13px;font-weight:700}.floating-whatsapp:hover{transform:translateY(-3px)}.whatsapp-icon{font-size:21px}.hero-actions{display:flex;flex-wrap:wrap;gap:14px}.form-actions{display:flex;flex-wrap:wrap;gap:10px}@media(max-width:800px){.floating-whatsapp{right:15px;bottom:15px;padding:12px 14px}.floating-whatsapp>span:last-child{display:none}}`;
document.head.appendChild(injectedStyles);

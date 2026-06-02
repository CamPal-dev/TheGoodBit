const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (navbar) {
  navbar.classList.add('is-visible');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;

    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const wasOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

const revealTargets = document.querySelectorAll('main > section');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -8% 0px'
  });

  revealTargets.forEach(target => revealObserver.observe(target));
} else {
  revealTargets.forEach(target => target.classList.add('is-visible'));
}

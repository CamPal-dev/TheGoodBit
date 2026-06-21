// Nav
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

// Smooth scroll
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

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');

    const icon = button.querySelector('.faq-icon');
    if (icon) {
      icon.classList.remove('icon-pop');
      void icon.offsetWidth;
      icon.classList.add('icon-pop');
      icon.addEventListener('animationend', () => icon.classList.remove('icon-pop'), { once: true });
    }
  });
});

// Case card carousel + flip
const caseCarousel = document.getElementById('caseCarousel');
const casePrev     = document.getElementById('casePrev');
const caseNext     = document.getElementById('caseNext');

if (caseCarousel && casePrev && caseNext) {
  const gap = () => {
    const s = getComputedStyle(caseCarousel);
    return parseFloat(s.columnGap) || 14;
  };
  const cardWidth = () => {
    const card = caseCarousel.querySelector('.case-card');
    return card ? card.offsetWidth + gap() : 220;
  };

  casePrev.addEventListener('click', () => {
    caseCarousel.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
  });
  caseNext.addEventListener('click', () => {
    caseCarousel.scrollBy({ left: cardWidth(), behavior: 'smooth' });
  });

  caseCarousel.querySelectorAll('.case-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.btn')) return;
      card.querySelector('.case-card-inner').classList.toggle('flipped');
    });
  });
}

// Quote / testimonial carousel
const quoteCarousel = document.getElementById('quoteCarousel');
const quotePrev     = document.getElementById('quotePrev');
const quoteNext     = document.getElementById('quoteNext');

if (quoteCarousel && quotePrev && quoteNext) {
  const quoteCardWidth = () => {
    const card = quoteCarousel.querySelector('.quote-card');
    const gap  = parseFloat(getComputedStyle(quoteCarousel).columnGap) || 14;
    return card ? card.offsetWidth + gap : 300;
  };
  quotePrev.addEventListener('click', () => {
    quoteCarousel.scrollBy({ left: -quoteCardWidth(), behavior: 'smooth' });
  });
  quoteNext.addEventListener('click', () => {
    quoteCarousel.scrollBy({ left: quoteCardWidth(), behavior: 'smooth' });
  });
}

// GSAP scroll reveals
gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  // Hero copy — stagger in on load
  gsap.from('.hero-copy > *', {
    opacity: 0,
    y: 36,
    duration: 1,
    stagger: 0.14,
    ease: 'power3.out',
    delay: 0.15,
  });

  // Hero collage elements
  gsap.from('.hero-collage > *', {
    opacity: 0,
    y: 28,
    scale: 0.94,
    duration: 1.1,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.35,
  });

  // Marker swipe on hero headline (triggered after hero animates in)
  gsap.fromTo('.hero .marker',
    { backgroundSize: '0% 88%' },
    { backgroundSize: '107% 88%', duration: 0.7, ease: 'power2.out', delay: 0.7 }
  );

  // Staggered card grids
  const cardGrids = [
    { selector: '.what-grid',      children: '.mini-card' },
    { selector: '.service-grid',   children: '.service-tile' },
    { selector: '.promise-cards',  children: '.dark-card' },
    { selector: '.step-row',       children: '.step-card' },
    { selector: '.price-grid',     children: '.price-card' },
    { selector: '.case-carousel',   children: '.case-card' },
    { selector: '.quote-grid',     children: '.quote-card' },
    { selector: '.stats-grid',     children: 'article' },
  ];

  cardGrids.forEach(({ selector, children }) => {
    const grid = document.querySelector(selector);
    if (!grid) return;
    gsap.from(grid.querySelectorAll(children), {
      scrollTrigger: {
        trigger: grid,
        start: 'top 82%',
      },
      opacity: 0,
      y: 42,
      scale: 0.96,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power3.out',
    });
  });

  // Section headings and prose blocks
  const textBlocks = [
    '.promise-main',
    '.process-intro',
    '.pricing-head > div',
    '.work-hero > div',
    '.about-grid > div',
    '.faq-grid > div:first-child',
    '.cta-banner > div',
  ];

  textBlocks.forEach(selector => {
    const el = document.querySelector(selector);
    if (!el) return;
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 84%',
      },
      opacity: 0,
      y: 36,
      duration: 0.9,
      ease: 'power3.out',
    });
  });

  // Process SVG line draw
  const processPath = document.querySelector('.process-line path');
  if (processPath) {
    gsap.from(processPath, {
      scrollTrigger: {
        trigger: '.process-line',
        start: 'top 80%',
      },
      strokeDashoffset: 720,
      duration: 1.1,
      ease: 'power2.inOut',
    });
  }

  // Marker swipe on section headings
  document.querySelectorAll('main .marker').forEach(marker => {
    if (marker.closest('.hero')) return;
    gsap.fromTo(marker,
      { backgroundSize: '0% 88%' },
      {
        backgroundSize: '107% 88%',
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: marker, start: 'top 88%' },
      }
    );
  });

  // Hand-drawn annotation doodles — draw in on scroll
  document.querySelectorAll('.doodle-path').forEach(path => {
    const svg = path.closest('svg');
    if (svg.closest('.hero')) return; // hero handled on load below
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.85,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: svg, start: 'top 88%' },
    });
  });

  // Hero doodle paths draw in after hero animations
  document.querySelectorAll('.hero .doodle-path').forEach((path, i) => {
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 1.1 + i * 0.18,
    });
  });

  // Trusted bar
  const trusted = document.querySelector('.trusted');
  if (trusted) {
    gsap.from(trusted.children, {
      scrollTrigger: { trigger: trusted, start: 'top 84%' },
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
    });
  }
}

// Nav
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const starMenuBtn = document.getElementById('starMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (navbar) {
  navbar.classList.add('is-visible');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

function setMenuOpen(isOpen) {
  if (hamburger)   hamburger.setAttribute('aria-expanded', String(isOpen));
  if (starMenuBtn) {
    starMenuBtn.setAttribute('aria-expanded', String(isOpen));
    starMenuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }
}

if (mobileMenu) {
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      setMenuOpen(mobileMenu.classList.toggle('open'));
    });
  }
  if (starMenuBtn) {
    starMenuBtn.addEventListener('click', () => {
      setMenuOpen(mobileMenu.classList.toggle('open'));
    });
  }
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      setMenuOpen(false);
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
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(faq => {
      const open = faq === item && !wasOpen;
      faq.classList.toggle('open', open);
      faq.querySelector('button').setAttribute('aria-expanded', String(open));
      faq.querySelector('.faq-answer').hidden = !open;
    });

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
    caseCarousel.scrollBy({ left: -cardWidth(), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
  caseNext.addEventListener('click', () => {
    caseCarousel.scrollBy({ left: cardWidth(), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });

  caseCarousel.querySelectorAll('.case-card').forEach(card => {
    const front = card.querySelector('.case-card-front');
    const back = card.querySelector('.case-card-back');
    const openButton = card.querySelector('.case-flip-hint');
    const closeButton = card.querySelector('.case-close');
    function flip(open) {
      card.querySelector('.case-card-inner').classList.toggle('flipped', open);
      front.inert = open; back.inert = !open;
      openButton.setAttribute('aria-expanded', String(open));
      (open ? closeButton : openButton).focus({preventScroll: true});
    }
    openButton.addEventListener('click', () => flip(true));
    closeButton.addEventListener('click', () => flip(false));
    card.addEventListener('keydown', event => { if(event.key === 'Escape') flip(false); });
  });
}

// Close mobile navigation with Escape and keep hidden links out of the tab order.
function syncMenu() { if(mobileMenu) mobileMenu.inert = !mobileMenu.classList.contains('open'); }
if(mobileMenu) {
  syncMenu();
  new MutationObserver(syncMenu).observe(mobileMenu, {attributes:true, attributeFilter:['class']});
  document.addEventListener('keydown', event => {
    if(event.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open'); setMenuOpen(false);
      const trigger = hamburger && getComputedStyle(hamburger).display !== 'none' ? hamburger : starMenuBtn;
      if(trigger) trigger.focus();
    }
  });
}

// Feedback: auto-scroll pauses on hover/focus; native touch, wheel and keyboard scrolling remain available.
const quoteCarousel = document.getElementById('quoteCarousel');
if (quoteCarousel) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const originals = [...quoteCarousel.children];
  // Duplicate visual cards only; assistive technology reads each review once.
  originals.forEach(card => {
    const copy = card.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    copy.inert = true;
    copy.dataset.clone = 'true';
    quoteCarousel.append(copy);
  });
  let hovered = false;
  let focused = false;
  let visible = false;
  let holdUntil = 0;
  let previousTime = 0;
  const loopWidth = () => quoteCarousel.children[originals.length].offsetLeft - originals[0].offsetLeft;
  const hold = () => { holdUntil = performance.now() + 5000; };
  quoteCarousel.addEventListener('pointerenter', () => { hovered = true; });
  quoteCarousel.addEventListener('pointerleave', () => { hovered = false; });
  quoteCarousel.addEventListener('pointerdown', hold);
  quoteCarousel.addEventListener('wheel', hold, {passive: true});
  quoteCarousel.addEventListener('keydown', hold);
  quoteCarousel.addEventListener('focusin', () => { focused = true; });
  quoteCarousel.addEventListener('focusout', event => { focused = quoteCarousel.contains(event.relatedTarget); });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(quoteCarousel);
  let position = 0;
  function tick(time) {
    const elapsed = Math.min(time - previousTime, 50);
    previousTime = time;
    const width = loopWidth();
    if (visible && !document.hidden && !hovered && !focused && !reducedMotion.matches && time > holdUntil) {
      if (Math.abs(position - quoteCarousel.scrollLeft) > 2) position = quoteCarousel.scrollLeft;
      position += elapsed * 0.028;
      if (width > 0 && position >= width) position -= width;
      quoteCarousel.scrollLeft = position;
    } else {
      position = quoteCarousel.scrollLeft;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

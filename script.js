/* ============================================================
   NAVBAR — add .scrolled class on scroll
   ============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


/* ============================================================
   HAMBURGER — toggle mobile menu
   ============================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link inside it is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});


/* ============================================================
   FAQ — accordion (one open at a time)
   ============================================================ */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all items
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // If it wasn't open, open it
    if (!isOpen) item.classList.add('open');
  });
});


/* ============================================================
   TESTIMONIALS — dot-driven active card highlight
   ============================================================ */
const dots  = document.querySelectorAll('.dot');
const cards = document.querySelectorAll('.testimonial-card');

function setActiveTestimonial(index) {
  dots.forEach(d  => d.classList.remove('dot--active'));
  cards.forEach(c => c.classList.remove('testimonial-card--active'));
  dots[index].classList.add('dot--active');
  cards[index].classList.add('testimonial-card--active');
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    setActiveTestimonial(parseInt(dot.dataset.index, 10));
  });
});

// Also make the cards themselves clickable
cards.forEach(card => {
  card.addEventListener('click', () => {
    setActiveTestimonial(parseInt(card.dataset.index, 10));
  });
});

// Auto-rotate every 4 seconds
let autoRotate = setInterval(() => {
  const current = [...dots].findIndex(d => d.classList.contains('dot--active'));
  setActiveTestimonial((current + 1) % cards.length);
}, 4000);

// Pause auto-rotate on user interaction with the card area
document.querySelector('.testimonials-right').addEventListener('click', () => {
  clearInterval(autoRotate);
});


/* ============================================================
   SCROLL REVEAL — Intersection Observer on .reveal elements
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============================================================
   SMOOTH SCROLL for anchor links (belt-and-suspenders for
   older browsers that don't honour scroll-behavior: smooth)
   ============================================================ */
/* ============================================================
   TYPEWRITER — cycling phrases in the services headline
   ============================================================ */
(function () {
  const el = document.getElementById('typewriterTarget');
  if (!el) return;

  const phrases = [
    'say the right thing.',
    'show up consistently.',
    'build a real presence.',
    'stop sounding generic.',
    'make strategy stick.',
    'turn ideas into content.',
    'communicate clearly.',
  ];

  let phraseIndex  = 0;
  let charIndex    = 0;
  let isDeleting   = false;
  const SPEED      = 52;
  const DELETE     = 28;
  const PAUSE      = 2200;

  function tick() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 320);
        return;
      }
      setTimeout(tick, DELETE);
    } else {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        setTimeout(() => { isDeleting = true; tick(); }, PAUSE);
        return;
      }
      setTimeout(tick, SPEED);
    }
  }

  // Start after a short delay so page feels settled
  setTimeout(tick, 900);
}());


/* ============================================================
   TYPEWRITER — hero headline cycling client types
   ============================================================ */
(function () {
  const el = document.getElementById('heroTypewriter');
  if (!el) return;

  const words   = ['NGOs.', 'founders.', 'teams.', 'organizations.', 'startups.', 'people.'];
  let wIndex    = 0;
  let cIndex    = 0;
  let deleting  = false;
  const SPD     = 60;
  const DEL     = 35;
  const WAIT    = 2600;

  function heroTick() {
    const word = words[wIndex];
    if (deleting) {
      el.textContent = word.slice(0, cIndex - 1);
      cIndex--;
      if (cIndex === 0) {
        deleting = false;
        wIndex   = (wIndex + 1) % words.length;
        setTimeout(heroTick, 280);
        return;
      }
      setTimeout(heroTick, DEL);
    } else {
      el.textContent = word.slice(0, cIndex + 1);
      cIndex++;
      if (cIndex === word.length) {
        setTimeout(() => { deleting = true; heroTick(); }, WAIT);
        return;
      }
      setTimeout(heroTick, SPD);
    }
  }

  setTimeout(heroTick, 1800); // start after services typewriter
}());


/* ============================================================
   GRAVITY TAGS — Matter.js physics for the industry tag cloud
   ============================================================ */
function initGravityTags() {
  if (typeof Matter === 'undefined') return;

  const { Engine, Render, Runner, Bodies, Body, World, Mouse, MouseConstraint, Events, Query } = Matter;

  const container = document.getElementById('gravityTags');
  if (!container) return;

  const items = Array.from(container.querySelectorAll('.gravity-item'));
  if (!items.length) return;

  // Measure natural sizes before switching to absolute
  const sizes = items.map(el => ({ w: el.offsetWidth || 120, h: el.offsetHeight || 38 }));

  // Switch all tags to absolute + invisible so they drop in cleanly
  items.forEach(el => {
    el.style.position  = 'absolute';
    el.style.top       = '0';
    el.style.left      = '0';
    el.style.margin    = '0';
    el.style.opacity   = '0';
    el.style.pointerEvents = 'none';
    el.style.transformOrigin = 'center center';
  });

  const W = container.offsetWidth;
  const H = container.offsetHeight;

  // Engine
  const engine = Engine.create({ gravity: { y: 1.4 } });

  // Transparent render canvas (handles mouse events)
  const render = Render.create({
    element: container,
    engine,
    options: { width: W, height: H, wireframes: false, background: 'transparent' },
  });
  const cv = render.canvas;
  cv.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;';

  // Static walls
  const wallOpts = { isStatic: true, render: { visible: false }, friction: 0.5 };
  World.add(engine.world, [
    Bodies.rectangle(W / 2, H + 25,  W * 2, 50,   wallOpts), // floor
    Bodies.rectangle(-25,   H / 2,    50,    H * 2, wallOpts), // left
    Bodies.rectangle(W + 25, H / 2,   50,    H * 2, wallOpts), // right
  ]);

  // Physics body per tag — pill shape via chamfer
  const cols = Math.max(3, Math.floor(W / 160));
  const bodies = items.map((el, i) => {
    const { w, h } = sizes[i];
    const col  = i % cols;
    const row  = Math.floor(i / cols);
    // Start above the container, staggered
    const x = (col + 0.5) * (W / cols) + (Math.random() - 0.5) * 24;
    const y = -h * 0.8 - row * (h + 14) - Math.random() * 20;

    const body = Bodies.rectangle(x, y, w, h, {
      restitution:  0.22,
      friction:     0.45,
      frictionAir:  0.018,
      density:      0.003,
      chamfer:      { radius: h / 2 },
      render:       { visible: false },
    });
    World.add(engine.world, body);
    return { el, body, w, h };
  });

  // Mouse drag
  const mouse = Mouse.create(cv);
  const mc    = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.18, render: { visible: false } },
  });
  World.add(engine.world, mc);
  render.mouse = mouse;

  // Grab cursor
  Events.on(engine, 'beforeUpdate', () => {
    const touching = Query.point(bodies.map(b => b.body), mc.mouse.position).length > 0;
    cv.style.cursor = mc.mouse.button === 0 && touching ? 'grabbing' : touching ? 'grab' : 'default';
  });

  // Sync DOM elements → physics positions
  let revealed = false;
  function syncDOM() {
    bodies.forEach(({ el, body, w, h }) => {
      const { x, y } = body.position;
      const deg = body.angle * (180 / Math.PI);
      el.style.transform = `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${deg}deg)`;
    });
    // Fade in once bodies have moved (first meaningful frame)
    if (!revealed) {
      revealed = true;
      items.forEach((el, i) => {
        setTimeout(() => { el.style.opacity = '1'; el.style.transition = 'opacity 0.3s'; }, i * 40);
      });
    }
    requestAnimationFrame(syncDOM);
  }

  const runner = Runner.create();
  Runner.run(runner, engine);
  Render.run(render);
  syncDOM();
}

// Fire after fonts + layout are settled
window.addEventListener('load', () => setTimeout(initGravityTags, 200));


/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

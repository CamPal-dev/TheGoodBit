// Native <details> handles project information and FAQs, including keyboard access.
// Only the mobile navigation needs JavaScript. It remains visible if JS is unavailable.
const menuButton = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileViewport = window.matchMedia('(max-width: 640px)');

function setMenuOpen(open, restoreFocus = false) {
  mobileMenu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (restoreFocus) menuButton.focus();
}

if (menuButton && mobileMenu) {
  document.documentElement.classList.add('js');
  menuButton.hidden = false;
  setMenuOpen(false);
  menuButton.addEventListener('click', () => setMenuOpen(mobileMenu.hidden));
  mobileMenu.addEventListener('click', event => {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileMenu.hidden) setMenuOpen(false, true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('#navbar') && !mobileMenu.hidden) setMenuOpen(false);
  });
  mobileViewport.addEventListener('change', () => setMenuOpen(false));
}

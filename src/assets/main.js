// Minimal client behaviour: menu, reading progress, archive filter.
// The site is fully readable with JavaScript disabled.
const menuBtn = document.querySelector('[data-menu-btn]');
const menu = document.querySelector('[data-menu]');

if (menuBtn && menu) {
  const setOpen = (open) => {
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'CLOSE' : 'MENU';
    document.body.classList.toggle('menu-open', open);
  };
  menuBtn.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      menuBtn.focus();
    }
  });
}

// Reading progress on story pages.
const bar = document.querySelector('[data-progress]');
if (bar) {
  bar.hidden = false;
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Archive index filter.
const filters = document.querySelectorAll('[data-filter]');
if (filters.length) {
  const rows = document.querySelectorAll('.ar-row');
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', String(on));
      });
      const cat = btn.dataset.filter;
      rows.forEach((r) => {
        r.hidden = cat !== 'all' && r.dataset.cat !== cat;
      });
    });
  });
}

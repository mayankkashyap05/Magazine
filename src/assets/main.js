/* ENIAC — client behaviour.
   Progressive enhancement only: the magazine reads completely with JavaScript
   disabled. Nothing here is required for content, navigation or accessibility. */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersReduced = () => reduced.matches;

/* --- 1. measurement: exact scrollbar width, so bleed blocks never overflow -- */
function measureScrollbar() {
  const sw = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--sbw', `${Math.max(0, sw)}px`);
}
measureScrollbar();
window.addEventListener('resize', measureScrollbar, { passive: true });

/* --- 2. index menu --------------------------------------------------------- */
const menuBtn = document.querySelector('[data-menu-btn]');
const menu = document.querySelector('[data-menu]');

if (menuBtn && menu) {
  const setOpen = (open) => {
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'CLOSE ×' : 'INDEX +';
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) {
      const first = menu.querySelector('a');
      if (first) first.focus();
    }
  };
  menuBtn.addEventListener('click', () => {
    const open = menu.hidden;
    setOpen(open);
    if (!open) menuBtn.focus();
  });
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      menuBtn.focus();
      return;
    }
    // keep the keyboard inside the overlay while it covers the page
    if (e.key === 'Tab' && !menu.hidden) {
      const items = [...menu.querySelectorAll('a[href], button')];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === menuBtn)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        menuBtn.focus();
      }
    }
  });
  // never leave the overlay behind on desktop widths
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000 && !menu.hidden) setOpen(false);
  }, { passive: true });
}

/* --- 3. reading progress on story pages ----------------------------------- */
const bar = document.querySelector('[data-progress]');
if (bar) {
  bar.hidden = false;
  let queued = false;
  const paint = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = `${max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0}%`;
    queued = false;
  };
  document.addEventListener('scroll', () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(paint);
    }
  }, { passive: true });
  paint();
}

/* --- 4. editorial reveals --------------------------------------------------
   Applied from JS so that a script-less reading gets the finished page, not a
   blank one. One observer, transform/opacity only. */
const REVEAL_TARGETS = [
  '.band-title', '.band-dek', '.cover-statement', '.note-title', '.note-p',
  '.fig', '.statement', '.keynotes li', '.spec-cell', '.lrow', '.prow',
  '.roster-item', '.exhibit', '.six-item', '.mark', '.cmark', '.tease',
  '.tl-entry', '.runway', '.protocol', '.edge-i', '.miniref', '.fact',
  '.story-title', '.pull', '.lede', '.timeline',
].join(',');

function reveals() {
  const els = [...document.querySelectorAll(REVEAL_TARGETS)];
  if (!('IntersectionObserver' in window) || prefersReduced()) return;

  const groups = new Map();
  els.forEach((el) => {
    // stagger siblings inside the same parent so lists cascade rather than pop
    const key = el.parentElement;
    const i = (groups.get(key) ?? 0);
    groups.set(key, i + 1);
    el.classList.add('reveal');
    if (i === 1) el.classList.add('reveal-d1');
    else if (i === 2) el.classList.add('reveal-d2');
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.04 }
  );
  els.forEach((el) => io.observe(el));
}
reveals();

/* --- 5. figures settle into place -----------------------------------------
   Numbers tick up once, from 62% of their value, then hold. Editorial, not a
   slot machine: short, one pass, reduced-motion safe. */
function counters() {
  const els = [...document.querySelectorAll('[data-count]')];
  if (!els.length || !('IntersectionObserver' in window) || prefersReduced()) return;

  const run = (el) => {
    const raw = el.dataset.count;
    const target = Number(raw.replace(/[^0-9.]/g, ''));
    if (!Number.isFinite(target) || target === 0) return;
    const grouped = raw.includes(',');
    const decimals = (raw.split('.')[1] ?? '').length;
    const from = target * 0.62;
    const dur = 680;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (target - from) * eased;
      el.textContent = decimals
        ? v.toFixed(decimals)
        : Math.round(v).toLocaleString(grouped ? 'en-US' : 'en-US', { useGrouping: grouped });
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = raw;
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => io.observe(el));
}
counters();

/* --- 6. plate parallax ----------------------------------------------------
   A few pixels of drift on hero plates only. Disabled on small screens, on
   reduced motion, and when the page is long (cheap by default). */
function parallax() {
  const layers = [...document.querySelectorAll('[data-parallax]')];
  if (!layers.length || prefersReduced() || window.innerWidth < 900) return;

  let frame = null;
  const update = () => {
    frame = null;
    const vh = window.innerHeight;
    layers.forEach((layer) => {
      const r = layer.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const mid = r.top + r.height / 2 - vh / 2;
      const shift = Math.max(-16, Math.min(16, (mid / vh) * -22));
      const img = layer.querySelector('img');
      if (img) img.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(1.045)`;
    });
  };
  const onScroll = () => {
    if (frame === null) frame = requestAnimationFrame(update);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}
parallax();

/* --- 7. timeline scale control -------------------------------------------- */
const scaleBtns = [...document.querySelectorAll('[data-scale-btn]')];
if (scaleBtns.length) {
  const charts = [...document.querySelectorAll('.accelerator')];
  const apply = (mode) => {
    charts.forEach((c) => { c.dataset.mode = mode; });
    scaleBtns.forEach((b) => {
      const on = b.dataset.scaleBtn === mode;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    try { localStorage.setItem('eniac-scale', mode); } catch { /* private mode */ }
  };
  let stored = null;
  try { stored = localStorage.getItem('eniac-scale'); } catch { /* ignore */ }
  scaleBtns.forEach((b) => b.addEventListener('click', () => apply(b.dataset.scaleBtn)));
  if (stored) apply(stored);
}

/* On narrow screens only one scale fits legibly: show the log row by default,
   unless the reader has already chosen. */
if (window.innerWidth < 760) {
  document.querySelectorAll('.accelerator[data-mode="both"]').forEach((c) => { c.dataset.mode = 'log'; });
  document.querySelectorAll('.acc-hint').forEach((h) => { h.style.display = 'block'; });
}

/* --- 8. archive filter ---------------------------------------------------- */
const filters = [...document.querySelectorAll('[data-filter]')];
if (filters.length) {
  const rows = [...document.querySelectorAll('.ar-row')];
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', String(on));
      });
      const cat = btn.dataset.filter;
      let shown = 0;
      rows.forEach((r) => {
        const match = cat === 'all' || r.dataset.cat === cat;
        r.hidden = !match;
        if (match) shown++;
      });
      const head = document.querySelector('.ar-list');
      if (head) head.dataset.count = String(shown);
    });
  });
}

/* --- 9. sticky masthead: pull back on downward scroll --------------------
   More room to read the page; the masthead returns the moment you scroll up. */
const masthead = document.querySelector('[data-masthead]');
if (masthead && !prefersReduced()) {
  let last = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const down = y > last && y > 220;
      masthead.style.transform = down ? 'translateY(-100%)' : 'translateY(0)';
      masthead.style.transition = 'transform 0.35s cubic-bezier(0.22,0.61,0.36,1)';
      last = y;
      ticking = false;
    });
  };
  document.addEventListener('scroll', onScroll, { passive: true });
}

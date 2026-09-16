/* ===========================================================
   Ajusti — shared shell, cart state and product rendering.
   Header/footer are injected from here so every page stays
   in sync, and it works straight off the filesystem (no fetch).
   =========================================================== */

/* ---------- tiny icon set ---------- */
const ICON = {
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5S20 17 20 21"/>',
  bag: '<path d="M6 8h12l1 12H5L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/>',
  heart: '<path d="M12 20s-7-4.6-7-9.5A3.9 3.9 0 0112 8a3.9 3.9 0 017 2.5C19 15.4 12 20 12 20z"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.2 11h10.2L20 7H6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  shield: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
  truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>',
  refresh: '<path d="M4 10a8 8 0 0113.5-4.5L20 8"/><path d="M20 14a8 8 0 01-13.5 4.5L4 16"/><path d="M20 4v4h-4M4 20v-4h4"/>',
  medal: '<circle cx="12" cy="10" r="5"/><path d="M9 15l-2 6 5-2.5L17 21l-2-6"/>',
  gift: '<path d="M3 10h18v4H3zM5 14h14v7H5z"/><path d="M12 10v11M12 10S9.5 4 7.5 5.5 9 10 12 10zM12 10s2.5-6 4.5-4.5S15 10 12 10z"/>',
  percent: '<path d="M6 18L18 6"/><circle cx="8" cy="8" r="2"/><circle cx="16" cy="16" r="2"/>',
  headset: '<path d="M4 13v-1a8 8 0 0116 0v1"/><path d="M4 13h3v6H5.5A1.5 1.5 0 014 17.5zM20 13h-3v6h1.5a1.5 1.5 0 001.5-1.5z"/>',
  crown: '<path d="M4 8l3.5 4L12 5l4.5 7L20 8l-1.5 11h-13z"/>',
  ig: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.4"/><circle cx="17" cy="7" r="1"/>',
  fb: '<path d="M14 9h3V5h-3a4 4 0 00-4 4v2H8v4h2v6h4v-6h3l1-4h-4V9.5A.5.5 0 0114 9z"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1L4 20z"/><path d="M9 10c0 3 2 5 5 5 1.5 0 1.5-2 1-2.2l-1.4-.5-.8 1c-1-.4-1.7-1.1-2.1-2.1l1-.8-.5-1.4C11 8.5 9 8.5 9 10z"/>',
  x: '<path d="M5 5l14 14M19 5L5 19"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  waSolid: '<path fill="currentColor" stroke="none" d="M19.05 4.91A10 10 0 0012 2 10 10 0 003.4 17.05L2 22l5.07-1.33A10 10 0 0012 22 10 10 0 0019.05 4.91zM12 20.2a8.2 8.2 0 01-4.2-1.15l-.3-.18-3.1.81.83-3.02-.2-.31A8.2 8.2 0 1112 20.2zm4.5-6.15c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.53.06a6.7 6.7 0 01-1.98-1.22 7.4 7.4 0 01-1.37-1.7c-.14-.25-.01-.38.11-.5l.37-.44c.12-.14.16-.24.25-.4.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 00-.66.3c-.22.25-.87.85-.87 2.07s.9 2.4 1.02 2.56c.12.17 1.75 2.67 4.24 3.74.6.25 1.06.4 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.17-.47-.3z"/>'
};
const svg = (n, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[n]}</svg>`;

/* ---------- contact ---------- */
const WHATSAPP = '2347018317175';   // +234 701 831 7175
const waLink = msg =>
  `https://wa.me/${WHATSAPP}${msg ? '?text=' + encodeURIComponent(msg) : ''}`;

/* ---------- persisted state ---------- */
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem('ajusti.' + k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('ajusti.' + k, JSON.stringify(v)); } catch {} }
};
let cart = store.get('cart', []);
let wishlist = store.get('wishlist', []);

const cartCount = () => cart.reduce((n, l) => n + l.qty, 0);
const cartTotal = () => cart.reduce((n, l) => n + l.price * l.qty, 0);

function saveCart() {
  store.set('cart', cart);
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = cartCount();
    el.style.display = cartCount() ? 'grid' : 'none';
  });
}
function saveWish() {
  store.set('wishlist', wishlist);
  document.querySelectorAll('[data-wish-count]').forEach(el => {
    el.textContent = wishlist.length;
    el.style.display = wishlist.length ? 'grid' : 'none';
  });
}

function addToCart(id, opts = {}) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const size = opts.size || (SIZES[p.cat] || ['One size'])[0];
  const color = opts.color || p.colors[0];
  const qty = opts.qty || 1;
  const line = cart.find(l => l.id === id && l.size === size && l.color === color);
  if (line) line.qty += qty;
  else cart.push({ id, name: p.name, price: p.price, size, color, qty });
  saveCart();
  toast(`${p.name} added to bag`);
}

function toggleWish(id, btn) {
  const i = wishlist.indexOf(id);
  if (i > -1) { wishlist.splice(i, 1); toast('Removed from wishlist'); }
  else { wishlist.push(id); toast('Saved to wishlist'); }
  saveWish();
  if (btn) btn.classList.toggle('on', wishlist.includes(id));
}

let toastTimer;
function toast(msg) {
  let el = document.querySelector('.toast');
  if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
  el.innerHTML = `${svg('bag')}<span>${msg}</span>`;
  el.querySelector('svg').style.cssText = 'width:18px;height:18px;stroke:#fff;fill:none;stroke-width:1.7';
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

/* ---------- shell ---------- */
const LOGO = `
<a class="logo" href="index.html" aria-label="Ajusti home">
  <svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true">
    <g fill="#e9574e">
      <circle cx="24" cy="24" r="6"/>
      <ellipse cx="24" cy="11" rx="4.4" ry="8"/><ellipse cx="24" cy="37" rx="4.4" ry="8"/>
      <ellipse cx="11" cy="24" rx="8" ry="4.4"/><ellipse cx="37" cy="24" rx="8" ry="4.4"/>
    </g>
    <g fill="#c9a227" opacity=".85">
      <ellipse cx="14.8" cy="14.8" rx="6.5" ry="3.4" transform="rotate(45 14.8 14.8)"/>
      <ellipse cx="33.2" cy="33.2" rx="6.5" ry="3.4" transform="rotate(45 33.2 33.2)"/>
      <ellipse cx="33.2" cy="14.8" rx="6.5" ry="3.4" transform="rotate(-45 33.2 14.8)"/>
      <ellipse cx="14.8" cy="33.2" rx="6.5" ry="3.4" transform="rotate(-45 14.8 33.2)"/>
    </g>
  </svg>
  <span class="logo-text">Aju<span>sti</span><small class="logo-tag">Wear Your Culture</small></span>
</a>`;

const NAV_LINKS = [
  ['Home', 'index.html'], ['Shop', 'shop.html'], ['Deals', 'deals.html'],
  ['About Us', 'about.html'], ['Blog', 'blog.html'], ['Contact', 'contact.html']
];

function renderShell() {
  const page = document.body.dataset.page || '';
  const header = document.querySelector('[data-shell="header"]');
  if (header) {
    header.innerHTML = `
      <div class="topbar">Free delivery on orders above <strong>₦150,000</strong> · Nationwide shipping from Lagos</div>
      <header class="site-header">
        <div class="header-inner">
          ${LOGO}
          <nav class="nav" id="nav">
            <button class="icon-btn nav-close" id="navClose" aria-label="Close menu">${svg('close')}</button>
            ${NAV_LINKS.map(([t, h]) => `<a href="${h}"${h === page ? ' class="active"' : ''}>${t}</a>`).join('')}
          </nav>
          <div class="header-actions">
            <button class="icon-btn" id="searchToggle" aria-label="Search">${svg('search')}</button>
            <a class="icon-btn" href="account.html" aria-label="Account">${svg('user')}</a>
            <a class="icon-btn" href="wishlist.html" aria-label="Wishlist">${svg('heart')}<span class="badge" data-wish-count style="display:none">0</span></a>
            <a class="icon-btn" href="cart.html" aria-label="Cart">${svg('bag')}<span class="badge" data-cart-count style="display:none">0</span></a>
            <button class="icon-btn menu-toggle" id="menuToggle" aria-label="Menu">${svg('menu')}</button>
          </div>
        </div>
      </header>
      <div class="search-panel" id="searchPanel">
        <form action="shop.html" method="get">
          <input type="search" name="q" placeholder="Search Ankara gowns, bags, heels…" aria-label="Search products">
          <button class="btn btn-primary" type="submit">Search</button>
        </form>
      </div>`;
  }

  const footer = document.querySelector('[data-shell="footer"]');
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="wrap">
          <div class="foot-grid">
            <div>
              ${LOGO}
              <p class="muted" style="margin-top:1rem;max-width:34ch;font-size:.9rem">
                Ajusti brings Ankara, adire and locally made pieces from Nigerian tailors straight to your wardrobe — made to measure, shipped nationwide.
              </p>
              <div class="socials">
                <a href="#" aria-label="Instagram">${svg('ig')}</a>
                <a href="#" aria-label="Facebook">${svg('fb')}</a>
                <a href="${waLink('Hi Ajusti, I have a question.')}" target="_blank" rel="noopener" aria-label="WhatsApp">${svg('wa')}</a>
                <a href="#" aria-label="X">${svg('x')}</a>
              </div>
            </div>
            <div>
              <h4>Shop</h4>
              <ul>${CATEGORIES.map(c => `<li><a href="shop.html?cat=${c.slug}">${c.name}</a></li>`).join('')}
                <li><a href="deals.html">Deals</a></li></ul>
            </div>
            <div>
              <h4>Help</h4>
              <ul>
                <li><a href="contact.html">Contact us</a></li>
                <li><a href="contact.html#faq">Shipping &amp; returns</a></li>
                <li><a href="contact.html#faq">Size &amp; measurement guide</a></li>
                <li><a href="account.html">Track my order</a></li>
                <li><a href="about.html">Our tailors</a></li>
              </ul>
            </div>
            <div>
              <h4>Visit us</h4>
              <ul>
                <li class="muted">12 Adeniran Ogunsanya Street,<br>Surulere, Lagos</li>
                <li><a href="tel:+2347018317175">+234 701 831 7175</a></li>
                <li><a href="mailto:hello@ajusti.com">hello@ajusti.com</a></li>
                <li class="muted">Mon–Sat, 9am – 7pm WAT</li>
              </ul>
            </div>
          </div>
          <div class="foot-bottom">
            <span>© ${new Date().getFullYear()} Ajusti. All rights reserved.</span>
            <span>Pay with Paystack · Flutterwave · Bank transfer · Pay on delivery (Lagos)</span>
          </div>
        </div>
      </footer>`;
  }

  // header behaviour
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuToggle');
  const closeNav = () => {
    nav.classList.remove('open');
    document.querySelector('.nav-scrim')?.remove();
  };
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      nav.classList.add('open');
      const scrim = document.createElement('div');
      scrim.className = 'nav-scrim';
      scrim.addEventListener('click', closeNav);
      document.body.appendChild(scrim);
    });
    document.getElementById('navClose').addEventListener('click', closeNav);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  }
  const sBtn = document.getElementById('searchToggle');
  if (sBtn) sBtn.addEventListener('click', () => {
    const panel = document.getElementById('searchPanel');
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) panel.querySelector('input').focus();
  });

  saveCart();
  saveWish();
}

/* ---------- product card ---------- */
function starBar(r) {
  const full = Math.round(r);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function productCard(p) {
  const tags = (p.tags || []).map(t => `<span class="tag ${t}">${t}</span>`).join('');
  return `
  <article class="product-card" data-id="${p.id}">
    <div class="pc-media">
      <a href="product.html?id=${p.id}"><img src="${img(p)}" alt="${p.name}" loading="lazy"></a>
      <div class="pc-tags">${tags}</div>
      <button class="wish${wishlist.includes(p.id) ? ' on' : ''}" data-wish="${p.id}" aria-label="Save ${p.name}">${svg('heart')}</button>
    </div>
    <div class="pc-body">
      <span class="pc-cat">${catName(p.cat)}</span>
      <a class="pc-name" href="product.html?id=${p.id}">${p.name}</a>
      <span class="pc-rating">${`<span class="stars">${starBar(p.rating)}</span>`} ${p.rating} (${p.reviews})</span>
      <span class="pc-price">${money(p.price)}${p.was ? `<del>${money(p.was)}</del>` : ''}</span>
      <div class="pc-foot">
        <span class="swatches">${p.colors.map(c => `<i style="background:${c}"></i>`).join('')}</span>
        <button class="add-btn" data-add="${p.id}" aria-label="Add ${p.name} to bag">${svg('cart')}</button>
      </div>
    </div>
  </article>`;
}

function renderGrid(el, list) {
  if (!el) return;
  el.innerHTML = list.length
    ? list.map(productCard).join('')
    : `<p class="empty">No pieces match that search yet. Try another style or <a href="shop.html" style="color:var(--coral)">browse everything</a>.</p>`;
  if (typeof refreshMotion === 'function') refreshMotion();
}

/* delegated actions for add-to-bag / wishlist anywhere on the page */
document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) { addToCart(add.dataset.add); return; }
  const w = e.target.closest('[data-wish]');
  if (w) { toggleWish(w.dataset.wish, w); }
});

document.addEventListener('DOMContentLoaded', renderShell);

/* ===========================================================
   Motion
   Scroll reveals, a sticky-header state, a progress bar and a
   back-to-top button. All of it is skipped when the visitor
   asks for reduced motion.
   =========================================================== */
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Tag elements that should fade in, unless the page already marked them up. */
function markReveals() {
  const auto = [
    ['.sec-head', ''], ['.cat-card', 'zoom'], ['.product-card', ''], ['.quote', ''],
    ['.post', ''], ['.trust > div', ''], ['.perks > div', ''], ['.deal', 'zoom'],
    ['.newsletter', ''], ['.card', ''], ['.stat-row > div', ''], ['.page-head > .wrap', ''],
    ['.filters', 'left'], ['.split > *', ''], ['.pdp > *', '']
  ];
  auto.forEach(([sel, kind]) => {
    document.querySelectorAll(sel).forEach(el => {
      if (el.closest('.hero') || el.hasAttribute('data-reveal')) return;
      el.setAttribute('data-reveal', kind);
    });
  });
  // stagger siblings inside a row or grid so they arrive one after another
  document.querySelectorAll('.product-grid, .cat-grid, .quote-grid, .blog-grid, .trust, .perks, .stat-row')
    .forEach(grid => [...grid.children].forEach((el, i) =>
      el.style.setProperty('--d', Math.min(i, 7) * 70 + 'ms')));
}

let revealObserver;
function observeReveals() {
  if (REDUCED) return;
  revealObserver = revealObserver || new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      obs.unobserve(e.target);           // reveal once, then stop watching
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });

  document.querySelectorAll('[data-reveal]:not(.in)').forEach(el => {
    // anything already on screen at load shows immediately, no flash
    if (el.getBoundingClientRect().top < window.innerHeight * .92) el.classList.add('in');
    else revealObserver.observe(el);
  });
}

/* Re-run after a grid is rendered from JS. */
function refreshMotion() {
  markReveals();
  observeReveals();
}

function initChrome() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  const top = document.createElement('button');
  top.className = 'to-top';
  top.setAttribute('aria-label', 'Back to top');
  top.innerHTML = svg('up');
  top.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }));
  document.body.append(bar, top);

  // Floating WhatsApp button. Pages can set WA_MESSAGE before this runs to
  // prefill the chat — the product page names the piece you were looking at.
  const wa = document.createElement('a');
  wa.className = 'wa-fab';
  wa.href = waLink(window.WA_MESSAGE || 'Hi Ajusti, I saw your site and I have a question.');
  wa.target = '_blank';
  wa.rel = 'noopener';
  wa.setAttribute('aria-label', 'Chat with Ajusti on WhatsApp');
  wa.innerHTML = `${svg('waSolid')}<span>Chat with us</span>`;
  const syncWa = () =>
    wa.href = waLink(window.WA_MESSAGE || 'Hi Ajusti, I saw your site and I have a question.');
  wa.addEventListener('pointerdown', syncWa);
  wa.addEventListener('focus', syncWa);
  setTimeout(syncWa, 0);
  document.body.appendChild(wa);

  const header = document.querySelector('.site-header');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      header?.classList.toggle('stuck', y > 10);
      top.classList.toggle('show', y > window.innerHeight * .7);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Counts a number up when it scrolls into view (about page stats). */
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const run = el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    if (REDUCED) { el.textContent = target.toFixed(decimals) + suffix; return; }
    const start = performance.now(), dur = 1400;
    const step = now => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } });
  }, { threshold: .4 });
  els.forEach(el => io.observe(el));
}


/* ===========================================================
   PWA
   Registers the service worker and offers an install prompt.
   Both are skipped on file:// where they cannot work.
   =========================================================== */
function initPWA() {
  if (location.protocol === 'file:') return;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  // Chrome/Edge/Android fire this when the site is installable. iOS does not,
  // so Safari users add it from the Share sheet instead.
  let deferred;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferred = e;
    if (store.get('installDismissed', false)) return;
    showInstallBanner();
  });

  function showInstallBanner() {
    if (document.querySelector('.install-banner')) return;
    const el = document.createElement('div');
    el.className = 'install-banner';
    el.innerHTML = `
      <img src="assets/icons/icon-192.png" alt="" width="42" height="42">
      <div>
        <b>Install Ajusti</b>
        <small>Add the shop to your home screen — works offline too.</small>
      </div>
      <button class="btn btn-primary btn-sm" data-install>Install</button>
      <button class="install-close" aria-label="Dismiss">&times;</button>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));

    el.querySelector('[data-install]').addEventListener('click', async () => {
      el.classList.remove('show');
      if (!deferred) return;
      deferred.prompt();
      await deferred.userChoice;
      deferred = null;
    });
    el.querySelector('.install-close').addEventListener('click', () => {
      el.classList.remove('show');
      store.set('installDismissed', true);
      setTimeout(() => el.remove(), 300);
    });
  }

  window.addEventListener('appinstalled', () => {
    document.querySelector('.install-banner')?.remove();
    toast('Ajusti installed — find it on your home screen');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js');
  refreshMotion();
  initChrome();
  initCounters();
  initPWA();
  // grids rendered by page scripts land a tick later
  setTimeout(refreshMotion, 0);
});


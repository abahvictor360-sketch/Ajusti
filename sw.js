/* ===========================================================
   Ajusti service worker

   Three strategies, chosen by what the request is for:
   - pages      → network first, so prices and stock are never stale;
                  falls back to cache, then to the offline page
   - css / js   → stale-while-revalidate: instant load, quiet update
   - images     → cache first (they never change in place), kept in a
                  separate cache that is trimmed so it cannot grow forever
   =========================================================== */

const VERSION = 'v2';
const SHELL = `ajusti-shell-${VERSION}`;
const IMAGES = `ajusti-images-${VERSION}`;
const MAX_IMAGES = 80;

const PRECACHE = [
  './',
  'index.html', 'shop.html', 'product.html', 'deals.html', 'cart.html',
  'checkout.html', 'about.html', 'blog.html', 'contact.html',
  'wishlist.html', 'account.html', 'offline.html',
  'css/style.css', 'js/main.js', 'js/products.js',
  'manifest.webmanifest',
  'assets/site/hero-model.webp', 'assets/site/hero-couple.webp',
  'assets/site/hero-adire.webp', 'assets/site/hero-bag.webp',
  'assets/icons/icon-192.png', 'assets/icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(SHELL);
    // addAll fails the whole install if one file 404s, so add individually
    await Promise.all(PRECACHE.map(url =>
      cache.add(new Request(url, { cache: 'reload' })).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(k => k.startsWith('ajusti-') && k !== SHELL && k !== IMAGES)
      .map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= max) return;
  await Promise.all(keys.slice(0, keys.length - max).map(k => cache.delete(k)));
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // fonts, wa.me, etc.

  // Pages: network first.
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(SHELL);
        cache.put(req, fresh.clone());
        return fresh;
      } catch {
        return (await caches.match(req)) ||
               (await caches.match('offline.html')) ||
               Response.error();
      }
    })());
    return;
  }

  // Images: cache first, then network, and keep the cache bounded.
  if (req.destination === 'image') {
    e.respondWith((async () => {
      const hit = await caches.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        const cache = await caches.open(IMAGES);
        cache.put(req, res.clone());
        trim(IMAGES, MAX_IMAGES);
        return res;
      } catch {
        return hit || Response.error();
      }
    })());
    return;
  }

  // Everything else (css, js, manifest): stale-while-revalidate.
  e.respondWith((async () => {
    const cache = await caches.open(SHELL);
    const hit = await cache.match(req);
    const net = fetch(req).then(res => { cache.put(req, res.clone()); return res; })
                          .catch(() => null);
    return hit || (await net) || Response.error();
  })());
});

// Lets the page tell a waiting worker to take over immediately.
self.addEventListener('message', e => {
  if (e.data === 'skip-waiting') self.skipWaiting();
});

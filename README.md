# Ajusti: Wear Your Culture

Storefront for **Ajusti**, an e-commerce site selling Ankara dresses, bags, shoes,
men's native wear and locally made pieces (adire, aso-oke, lace) from Nigerian tailors.

Built as a static site: plain HTML, CSS and vanilla JavaScript. No build step,
no dependencies. Open `index.html` or serve the folder and it runs.

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Pages

| File | What it does |
| --- | --- |
| `index.html` | Home: four-slide hero carousel, categories, new arrivals, deal banner, best sellers, reviews |
| `shop.html` | Full catalogue with category/price/rating/offer filters, sorting and search (`?cat=`, `?q=`, `?sort=`) |
| `product.html` | Product detail (`?id=<product-id>`): gallery, colour and size pickers, quantity, accordions, related items |
| `deals.html` | Everything currently marked down, plus an under-₦40,000 rail |
| `cart.html` | Bag with quantity controls, promo code (`AJUSTI10` = 10% off), live totals |
| `checkout.html` | Delivery form, payment method choice, order confirmation |
| `wishlist.html` | Saved pieces |
| `about.html` | Brand story, stats, principles |
| `blog.html` | Journal: styling, fabric care, measurements |
| `contact.html` | Contact form, studio details, FAQ accordion |
| `account.html` | Sign in / register / track order |

## Hero carousel

Four slides, each selling a different category with its own copy, cut-out
image, disc colour and pair of calls to action. They are authored as static
markup in `index.html` (so the first slide is the LCP image and needs no JS
to appear) and driven by the script at the bottom of that file.

Slides share one CSS grid cell, so the section is as tall as the tallest
slide and nothing jumps on change. Autoplay runs every 6.5s and pauses on
hover, on focus, on touch, when the tab is hidden, and entirely under
`prefers-reduced-motion`. Arrows, dots, swipe and arrow keys all navigate;
inactive slides are `visibility: hidden` so their links stay out of the tab
order.

To edit a slide, change its `.hero-slide` block: `--disc` sets the disc
colour and `--art-h` the figure height.

## Installable (PWA)

The site is a progressive web app: `manifest.webmanifest` describes it,
`sw.js` caches it, and Android/desktop visitors get an install prompt.
iOS users add it from Safari's Share sheet.

The service worker picks a strategy per request type:

| Request | Strategy | Why |
| --- | --- | --- |
| Pages | Network first, cache fallback, then `offline.html` | Prices and stock are never served stale |
| CSS / JS | Stale-while-revalidate | Instant load, updates quietly in the background |
| Images | Cache first, capped at 80 files | They never change in place, so re-fetching wastes data |

Bump `VERSION` in `sw.js` when you need to force every client onto a fresh
shell; old caches are deleted on activate.

## Structure

```
css/style.css     all styling, one file, CSS custom properties at the top
js/products.js    catalogue data: 49 products across 5 categories, sizes, helpers
js/main.js        shared header/footer, cart + wishlist state, product card rendering
assets/products/  product photography (800×800)
assets/site/      hero cut-out, deal banner and about imagery
assets/icons/     PWA and home-screen icons
manifest.webmanifest, sw.js, offline.html   PWA files
```

The header and footer are injected by `js/main.js` so every page stays in sync.
Edit `NAV_LINKS` or the footer template there once and it applies everywhere.

Cart and wishlist state persist in `localStorage` under the `ajusti.*` keys.

## Adding a product

Drop an 800×800 JPEG into `assets/products/<id>.jpg`, then add an entry to
`PRODUCTS` in `js/products.js` using that same `<id>`:

```js
{ id: 'my-new-gown', name: 'My New Gown', cat: 'ankara-dresses', price: 55000,
  was: 65000, rating: 4.7, reviews: 12, tags: ['new'], colors: ['#b3282d', '#111'],
  desc: 'One or two sentences about the piece.' }
```

`tags` accepts `hot`, `new` and `sale`; `was` adds a strikethrough price and puts
the piece on the deals page. It appears across the site automatically.

## Responsive

Verified with a scripted sweep over 19 viewports across every page,
including portrait shapes (625×1100, 768×1280, 834×1194, 1080×1920,
1200×1920) as well as the usual landscape ones. The sweep checks for
horizontal scroll, elements past the viewport edge, the deal stamp
colliding with its heading, carousel controls sitting on hero text, and
product cards squeezed below 150px.

Breakpoints, widest first: 1040 (4→3 product columns), 880 (side-by-side
layouts stack), 760 (→2 product columns), 700 (carousel controls shrink),
620 (single-column grids, logo tagline hidden), 430 (compact header), 380
(trust strips and footer stack), 360 (→1 product column).

## Notes

- Prices are in naira and formatted through `money()` in `js/products.js`.
- Forms (newsletter, contact, account, checkout) are front-end only. They confirm
  on screen but post nowhere. Wire them to a backend or a form service before launch.
- Payment is not integrated; the checkout page collects no card details.

/* Ajusti — product catalogue.
   Every product image lives in assets/products/<id>.jpg */

const CATEGORIES = [
  { slug: 'ankara-dresses', name: 'Ankara Dresses', blurb: 'Bold prints, custom fit', tint: '#fde9e4' },
  { slug: 'bags',           name: 'Bags',           blurb: 'Leather & everyday carry', tint: '#f6e7d8' },
  { slug: 'shoes',          name: 'Shoes',          blurb: 'Heels, pumps & flats',     tint: '#eef0e6' },
  { slug: 'mens-native',    name: "Men's Native",   blurb: 'Senator, agbada & kaftan', tint: '#e6eef1' },
  { slug: 'locally-made',   name: 'Locally Made',   blurb: 'Adire, aso-oke & lace',    tint: '#f3e6ef' }
];

const PRODUCTS = [
  // ——— Ankara dresses ———
  { id: 'fuchsia-ruffle-highlow', name: 'Fuchsia Ruffle High-Low Gown', cat: 'ankara-dresses', price: 68000, was: 85000, rating: 4.9, reviews: 212, tags: ['hot', 'new'], colors: ['#d81f6a', '#111', '#c9a227'], desc: 'A statement high-low silhouette in hand-picked fuchsia Ankara, with sculpted ruffles down the skirt. Tailored in Aba and finished with a concealed back zip.' },
  { id: 'burgundy-ankara-gown', name: 'Burgundy Puff-Sleeve Ankara Gown', cat: 'ankara-dresses', price: 54000, rating: 4.8, reviews: 96, tags: ['new'], colors: ['#7b1f2b', '#2b3a67', '#c9a227'], desc: 'Midi gown with balloon sleeves and a full pleated skirt — the owambe staple that still works for church and brunch.' },
  { id: 'maroon-ankara-blazer-gown', name: 'Maroon Ankara Blazer Gown', cat: 'ankara-dresses', price: 72000, was: 89000, rating: 5.0, reviews: 58, tags: ['hot'], colors: ['#6d1b2c', '#c9a227'], desc: 'Structured shoulders, wrapped blazer bodice and a floor-sweeping swirl print. Lined throughout, boned at the waist.' },
  { id: 'ankara-peplum-mini', name: 'Ankara Peplum Mini Dress', cat: 'ankara-dresses', price: 39000, rating: 4.7, reviews: 143, colors: ['#b3282d', '#e8e2d5'], desc: 'Short, sharp and easy to move in. Flared peplum sleeves with a zip-front bodice.' },
  { id: 'ankara-boubou-maxi', name: 'Printed Boubou Maxi Set', cat: 'ankara-dresses', price: 47500, rating: 4.6, reviews: 74, colors: ['#b3282d', '#ffffff'], desc: 'A flowing two-piece boubou with a matching wrapper — cut generously for comfort in the heat.' },
  { id: 'sage-ankara-pencil-set', name: 'Sage Ankara Pencil Set', cat: 'ankara-dresses', price: 51000, rating: 4.8, reviews: 61, tags: ['new'], colors: ['#9bab8d', '#5b3d7a', '#c9a227'], desc: 'Soft sage bodice over a print pencil skirt with a front slit. Office by day, dinner by night.' },
  { id: 'indigo-adire-flare-dress', name: 'Indigo Adire Flare Dress', cat: 'ankara-dresses', price: 43000, rating: 4.7, reviews: 88, colors: ['#204a87', '#ffffff'], desc: 'Hand-dyed indigo adire, panelled into an asymmetric flare skirt. Every piece dyes slightly differently.' },
  { id: 'brown-ankara-bodycon', name: 'Cocoa Ankara Bodycon', cat: 'ankara-dresses', price: 45000, rating: 4.5, reviews: 52, colors: ['#6b4229', '#c9a227'], desc: 'A long-sleeve bodycon in warm cocoa print, with a hidden stretch panel for a clean fit.' },
  { id: 'magenta-capelet-dress', name: 'Magenta Capelet Midi', cat: 'ankara-dresses', price: 58000, rating: 4.9, reviews: 39, colors: ['#8e1b5b', '#111'], desc: 'Bead-trimmed capelet over a sculpted midi. Made to measure in 5 working days.' },
  { id: 'royal-blue-tulle-flare', name: 'Royal Blue Tulle Flare Dress', cat: 'ankara-dresses', price: 62000, was: 74000, rating: 4.8, reviews: 67, tags: ['sale'], colors: ['#1d4ed8', '#111'], desc: 'Grid-print bodice with a tulle-lined flare skirt that holds its shape all evening.' },
  { id: 'pink-puffsleeve-midi', name: 'Pink Puff-Sleeve Midi', cat: 'ankara-dresses', price: 41000, rating: 4.6, reviews: 120, colors: ['#e8437e', '#111'], desc: 'Off-shoulder neckline, dramatic puff sleeves and a swing skirt in candy-pink Ankara.' },
  { id: 'terracotta-ankara-peplum', name: 'Terracotta Peplum Dress', cat: 'ankara-dresses', price: 49000, rating: 4.7, reviews: 44, colors: ['#b5622f', '#111'], desc: 'Architectural peplum with a fold-over collar, cut from a rich terracotta geometric print.' },
  { id: 'red-ankara-mermaid-gown', name: 'Red Ankara Mermaid Gown', cat: 'ankara-dresses', price: 78000, was: 92000, rating: 4.9, reviews: 35, tags: ['hot'], colors: ['#b3282d', '#111'], desc: 'Off-shoulder mermaid gown with a flared hem — our most requested wedding-guest piece.' },
  { id: 'magenta-ankara-ruffle-dress', name: 'Magenta Tiered Ruffle Dress', cat: 'ankara-dresses', price: 46000, rating: 4.8, reviews: 91, tags: ['new'], colors: ['#a3216b', '#c9a227'], desc: 'Two-tier ruffle skirt with gold button detailing down the bodice.' },
  { id: 'ankara-fan-collar-gown', name: 'Fan-Collar Ankara Gown', cat: 'ankara-dresses', price: 83000, rating: 5.0, reviews: 28, tags: ['hot'], colors: ['#7b1f2b', '#c9a227'], desc: 'Our signature pleated fan collar over a column gown with a beaded centre panel.' },
  { id: 'ankara-bell-sleeve-gown', name: 'Bell-Sleeve Ankara Gown', cat: 'ankara-dresses', price: 57000, rating: 4.7, reviews: 49, colors: ['#c1652b', '#2b3a67'], desc: 'Floor-length gown with sweeping bell sleeves in a bright feather print.' },
  { id: 'copper-ankara-drape-dress', name: 'Copper Drape Dress', cat: 'ankara-dresses', price: 53000, rating: 4.6, reviews: 37, colors: ['#b5742f', '#1f6f5c'], desc: 'Bardot neckline with a cascading print drape across the skirt.' },
  { id: 'navy-ankara-ruffle-dress', name: 'Navy Ruffle Wrap Dress', cat: 'ankara-dresses', price: 50000, rating: 4.7, reviews: 42, colors: ['#1c2a4a', '#9bb7d4'], desc: 'Navy crepe body with a cascading adire ruffle down one side.' },
  { id: 'red-ankara-panel-dress', name: 'Red Panel Midi Dress', cat: 'ankara-dresses', price: 48000, rating: 4.8, reviews: 55, colors: ['#a51c25', '#c9a227'], desc: 'Layered ruffle sleeves and a diagonal Ankara panel across the skirt.' },
  { id: 'teal-tiedye-bubble-dress', name: 'Teal Tie-Dye Bubble Dress', cat: 'ankara-dresses', price: 44000, rating: 4.5, reviews: 33, colors: ['#1f7a72', '#ffffff'], desc: 'Long-sleeve bubble-hem dress in hand tie-dyed teal. No two are identical.' },
  { id: 'black-ribbed-ruffle-midi', name: 'Black Ribbed Ruffle Midi', cat: 'ankara-dresses', price: 42000, rating: 4.6, reviews: 66, colors: ['#111', '#ffffff'], desc: 'One-shoulder ruffle in white against a ribbed black midi. Quiet luxury, Lagos edition.' },
  { id: 'plum-tailored-midi', name: 'Plum Tailored Midi', cat: 'ankara-dresses', price: 52000, rating: 4.7, reviews: 24, colors: ['#5b2148', '#111'], desc: 'Sharp shawl collar and covered buttons in a deep plum textured weave.' },

  // ——— Bags ———
  { id: 'nude-pearl-handbag', name: 'Nude Pearl Charm Handbag', cat: 'bags', price: 34500, was: 42000, rating: 4.8, reviews: 154, tags: ['sale'], colors: ['#c9ab92', '#6b4229'], desc: 'Structured two-tone tote with a detachable pearl charm and adjustable shoulder strap.' },
  { id: 'yellow-buckle-mini-bag', name: 'Sunburst Buckle Mini Bag', cat: 'bags', price: 28000, rating: 4.7, reviews: 89, tags: ['new'], colors: ['#f2c230', '#111'], desc: 'A top-handle mini with a gold buckle flap — enough room for phone, cards and lipstick.' },
  { id: 'black-classic-tote', name: 'Classic Black Work Tote', cat: 'bags', price: 46000, rating: 4.9, reviews: 176, tags: ['hot'], colors: ['#111', '#6b4229'], desc: 'Fits a 14" laptop, a folder and your lunch. Reinforced base, gold hardware.' },
  { id: 'wine-structured-satchel', name: 'Wine Structured Satchel', cat: 'bags', price: 39500, rating: 4.6, reviews: 63, colors: ['#6d1b3a', '#111'], desc: 'Pebbled finish, three internal compartments and a crossbody strap.' },
  { id: 'sky-blue-boxy-tote', name: 'Sky Blue Boxy Tote', cat: 'bags', price: 41000, rating: 4.5, reviews: 47, colors: ['#8fb6d9', '#e8e2d5'], desc: 'Clean boxy lines with padlock detail — the easiest colour pop for a plain outfit.' },

  // ——— Shoes ———
  { id: 'nude-brown-stiletto-pair', name: 'Nude & Tan Stiletto', cat: 'shoes', price: 32000, rating: 4.7, reviews: 131, colors: ['#e0c3ae', '#a9642f'], desc: 'A 4-inch pointed stiletto with a padded insole. Sizes 36–44.' },
  { id: 'black-crystal-buckle-pump', name: 'Crystal Buckle Court Shoe', cat: 'shoes', price: 37500, was: 45000, rating: 4.9, reviews: 98, tags: ['sale'], colors: ['#111', '#c9a227'], desc: 'Satin-finish court shoe with a crystal buckle across the vamp.' },
  { id: 'mauve-pointed-pump', name: 'Mauve Pointed Pump', cat: 'shoes', price: 29500, rating: 4.6, reviews: 72, colors: ['#b79a94', '#111'], desc: 'Everyday pointed pump in soft mauve suede-touch finish.' },
  { id: 'black-bow-stiletto', name: 'Black Bow Stiletto', cat: 'shoes', price: 34000, rating: 4.8, reviews: 84, tags: ['hot'], colors: ['#111', '#e0c3ae'], desc: 'Jewelled bow on a slim black stiletto — made for the aisle and the after-party.' },
  { id: 'lemon-bow-stiletto', name: 'Lemon Bow Heel', cat: 'shoes', price: 33000, rating: 4.5, reviews: 41, tags: ['new'], colors: ['#f3e37c', '#111'], desc: 'Bright lemon patent heel with a folded bow toe.' },

  // ——— Men's native ———
  { id: 'kente-agbada-suit', name: 'Kente Print Agbada Set', cat: 'mens-native', price: 89000, was: 105000, rating: 4.9, reviews: 57, tags: ['hot'], colors: ['#c1652b', '#111'], desc: 'Long-line embroidered top with matching trousers, cut from woven kente-style print.' },
  { id: 'emerald-senator-suit', name: 'Emerald Senator Suit', cat: 'mens-native', price: 76000, rating: 4.8, reviews: 63, colors: ['#1f6f4a', '#c9a227'], desc: 'Two-piece senator in emerald wool-blend with gold buttons and a mandarin collar.' },
  { id: 'red-senator-shortsleeve', name: 'Red Short-Sleeve Senator', cat: 'mens-native', price: 52000, rating: 4.6, reviews: 88, colors: ['#c0202a', '#ffffff'], desc: 'Textured red senator with contrast piping — light enough for Lagos afternoons.' },
  { id: 'wine-embroidered-kaftan', name: 'Wine Embroidered Kaftan', cat: 'mens-native', price: 68000, rating: 4.7, reviews: 45, tags: ['new'], colors: ['#6d1b2c', '#c9a227'], desc: 'Asymmetric hem kaftan with hand-guided gold embroidery at the chest.' },
  { id: 'green-ankara-patch-kaftan', name: 'Green Ankara Patch Shirt', cat: 'mens-native', price: 44000, rating: 4.5, reviews: 39, colors: ['#1f6f4a', '#ffffff'], desc: 'Colour-blocked shirt with Ankara panels at the sleeve and chest pocket.' },
  { id: 'beige-strip-senator-set', name: 'Aso-Oke Strip Senator Set', cat: 'mens-native', price: 71000, rating: 4.7, reviews: 26, colors: ['#d8ceb8', '#b3282d'], desc: 'Hand-woven aso-oke strips appliquéd onto a beige kaftan set.' },
  { id: 'men-adire-monochrome-shirt', name: 'Monochrome Adire Shirt Set', cat: 'mens-native', price: 58000, rating: 4.8, reviews: 51, colors: ['#111', '#ffffff'], desc: 'Long-line adire shirt with matching trousers in a bold black-and-white stamp.' },
  { id: 'couple-ankara-set', name: 'His & Hers Ankara Set', cat: 'mens-native', price: 124000, was: 148000, rating: 5.0, reviews: 31, tags: ['sale'], colors: ['#1c2a4a', '#c1652b'], desc: 'Matching couple set — palazzo wrap top for her, senator for him. Sold as a pair.' },

  // ——— Locally made ———
  { id: 'monochrome-adire-handkerchief-dress', name: 'Adire Handkerchief Dress', cat: 'locally-made', price: 47000, rating: 4.8, reviews: 36, tags: ['new'], colors: ['#111', '#ffffff'], desc: 'Hand-stamped adire cut into a handkerchief hem with tie shoulders.' },
  { id: 'indigo-adire-evening-gown', name: 'Indigo Adire Evening Gown', cat: 'locally-made', price: 95000, rating: 5.0, reviews: 19, tags: ['hot'], colors: ['#204a87', '#1c2a4a'], desc: 'Couture indigo gown with sculpted adire wings. Made to order, 10–14 days.' },
  { id: 'turquoise-lace-boubou', name: 'Turquoise Lace Boubou', cat: 'locally-made', price: 87000, rating: 4.9, reviews: 22, colors: ['#1f9a97', '#c9a227'], desc: 'Beaded turquoise lace boubou with matching gele. A full owambe outfit in one order.' },
  { id: 'emerald-lace-ruffle-set', name: 'Emerald Lace Ruffle Set', cat: 'locally-made', price: 79000, rating: 4.8, reviews: 27, colors: ['#1f6f5c', '#ffffff'], desc: 'Victorian lace blouse over a ruffled emerald wrapper skirt.' },
  { id: 'rainbow-ankara-kimono', name: 'Rainbow Ankara Kimono', cat: 'locally-made', price: 38000, rating: 4.6, reviews: 58, colors: ['#c9a227', '#a3216b'], desc: 'Free-size kimono in a swirling multicolour print — throw it over anything.' },
  { id: 'navy-geometric-boubou', name: 'Navy Geometric Boubou', cat: 'locally-made', price: 56000, rating: 4.7, reviews: 34, colors: ['#1c2a4a', '#4fa3d1'], desc: 'Bell-sleeve boubou in a navy geometric weave, lined at the bodice.' },
  { id: 'ankara-kimono-two-piece', name: 'Earth-Tone Kimono Two-Piece', cat: 'locally-made', price: 52000, rating: 4.7, reviews: 43, colors: ['#8a5a2b', '#2b3a67'], desc: 'Chiffon kimono with wide-leg trousers in a marbled earth print.' },
  { id: 'brown-ankara-kaftan', name: 'Brown Aso-Oke Kaftan', cat: 'locally-made', price: 64000, rating: 4.8, reviews: 21, colors: ['#8a5a2b', '#d8ceb8'], desc: 'Straight-cut kaftan in woven brown aso-oke with a matching head-wrap.' },
  { id: 'adire-longline-shirt-set', name: 'Adire Longline Robe', cat: 'locally-made', price: 61000, rating: 4.6, reviews: 18, colors: ['#111', '#ffffff'], desc: 'Open-front longline robe in stamped adire — unisex, one size.' }
];

const SIZES = {
  'ankara-dresses': ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'Custom'],
  'locally-made':  ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'Free size', 'Custom'],
  'mens-native':   ['S', 'M', 'L', 'XL', '2XL', '3XL', 'Custom'],
  'shoes':         ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
  'bags':          ['One size']
};

const img = p => `assets/products/${p.id}.jpg`;
const money = n => '₦' + n.toLocaleString('en-NG');
const catName = slug => (CATEGORIES.find(c => c.slug === slug) || {}).name || slug;

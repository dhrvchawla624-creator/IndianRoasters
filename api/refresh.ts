import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

// --- Types ---
interface CoffeeBean {
  id: string;
  name: string;
  roaster: string;
  price?: number;
  currency?: string;
  weight?: string;
  roastLevel?: string;
  origin?: string;
  process?: string;
  tastingNotes?: string[];
  image?: string;
  url: string;
  inStock?: boolean;
}
interface ShopifyProduct {
  id: number;
  title: string;
  tags: string[];
  images: { src: string }[];
  handle: string;
  body_html?: string;
  variants: ShopifyVariant[];
}
interface ShopifyVariant {
  price: string;
  available: boolean;
  title: string;
}

// --- Tasting Notes ---
const TASTING_NOTE_LIST = [
  "chocolate", "cocoa", "dark chocolate", "berry", "strawberry", "raspberry", "blueberry", "blackcurrant", "cherry",
  "citrus", "lemon", "lime", "orange", "grapefruit", "vanilla", "caramel", "spices", "nutty", "hazelnut",
  "almond", "walnut", "pecan", "cashew", "fruity", "honey", "floral", "jasmine", "rose", "peach", "apricot",
  "plum", "molasses", "sweet", "papaya", "mango", "apple", "sugarcane", "earthy", "herbal", "woody", "smoky",
  "roasted almond", "stone fruit", "pineapple"
];

// --- Utility Functions ---
function cleanTitle(title: string): string {
  return title.replace(/\(.*?\)/g, '').replace(/\d{2,4}\s?g/gi, '').trim();
}
function cleanMatch(text: string, options: string[]): string | undefined {
  const txt = text.toLowerCase();
  for (const opt of options) {
    if (txt.includes(opt)) return opt;
  }
  return undefined;
}
function extractTastingNotes(title: string, tags: string[], body?: string): string[] {
  const notes: string[] = [];
  const allText = [title, ...tags, body || ""].join(" ").toLowerCase();
  for (const note of TASTING_NOTE_LIST) {
    if (allText.includes(note) && !notes.includes(note)) notes.push(note);
  }
  return notes;
}

// --- Shopify Fetcher ---
async function fetchShopifyCollection(collectionUrl: string, roasterName: string): Promise<CoffeeBean[]> {
  const jsonUrl = collectionUrl.endsWith('/') ?
    `${collectionUrl}products.json?limit=250`
    : `${collectionUrl}/products.json?limit=250`;
  const res = await fetch(jsonUrl);
  if (!res.ok) return [];
  const data = await res.json() as { products: ShopifyProduct[] };
  return data.products.filter((p: ShopifyProduct) => p.variants.length > 0)
    .map((p: ShopifyProduct) => {
      const variant = p.variants[0];
      const lowerTitle = p.title.toLowerCase();
      const tags = Array.isArray(p.tags) ? p.tags : [];
      const body = p.body_html || "";
      return {
        id: `${roasterName}-${p.id}`,
        name: cleanTitle(p.title),
        roaster: roasterName,
        price: parseFloat(variant.price),
        currency: "INR",
        weight: variant.title,
        roastLevel: cleanMatch(lowerTitle + " " + tags.join(" "), ["light", "medium", "dark", "filter", "espresso", "omni"]),
        origin: cleanMatch(lowerTitle + " " + tags.join(" "), [
          "coorg", "chikmagalur", "karnataka", "kerala", "tamil nadu", "sikkim", "nilgiris", "bababudangiri", "basarikatte", "ratnagiri",
          "andhra", "araku", "sidamo", "ethiopia", "yirgacheffe", "honduras", "colombia"
        ]),
        process: cleanMatch(lowerTitle + " " + tags.join(" "), [
          "washed", "natural", "anaerobic", "carbonic", "honey", "dry", "semi-washed", "experimental", "barrel-aged"
        ]),
        tastingNotes: extractTastingNotes(p.title, tags, body),
        image: p.images[0]?.src,
        url: `${collectionUrl}/products/${p.handle}`,
        inStock: variant.available,
      };
    });
}

// --- All Roasters & Collections ---
const ROASTER_COLLECTIONS: { roaster: string; collections: string[] }[] = [
  { roaster: 'Blue Tokai Coffee Roasters', collections: [ 'https://bluetokaicoffee.com/collections/roasted-and-ground-coffee-beans' ] },
  { roaster: 'Savourworks', collections: [ 'https://www.savorworksroasters.com/collections/coffee' ] },
  { roaster: 'Quick Brown Fox', collections: [ 'https://qbfcoffee.com/collections/all-coffees' ] },
  { roaster: 'GreySoul', collections: [ 'https://greysoul.coffee/collections/coffee' ] },
  { roaster: 'Home Blends', collections: [
    'https://homeblendcoffee.com/collections/ground',
    'https://homeblendcoffee.com/collections/whole-bean-coffee',
    'https://homeblendcoffee.com/collections/international-specialty-coffee'
  ] },
  { roaster: 'Kaapi Kottai', collections: [ 'https://kapikottai.coffee/collections/all' ] },
  { roaster: 'Tulum', collections: [ 'https://www.tulum.coffee/collections/roasted-coffees' ] },
  { roaster: 'Classic Coffees', collections: [
    'https://www.classiccoffees.in/collections/roast-ground-custom-grind',
    'https://www.classiccoffees.in/collections/micro-lots'
  ] },
  { roaster: 'Corridor Seven', collections: [ 'https://corridorseven.coffee/collections/all' ] },
  { roaster: 'Broot', collections: [ 'https://brootcoffee.com/collections/all-coffees' ] },
  { roaster: "Baarbara Coffee", collections: [
    "https://www.baarbaracoffee.com/collections/premium-blends",
    "https://www.baarbaracoffee.com/collections/signature-collection",
    "https://www.baarbaracoffee.com/collections/specialty-coffee"
  ] },
  { roaster: "Fraction9", collections: [ "https://www.fraction9coffee.com/collections/all" ] },
  { roaster: "Bloom Coffee", collections: [ "https://bloomcoffeeroasters.in/collections/coffee" ] },
  { roaster: "Devan's Coffee", collections: [ "https://www.devans.in/collections/coffee" ] },
  { roaster: "Korebi Coffee", collections: [ "https://korebi.coffee/collections/coffee" ] },
  { roaster: "Maverick & Farmer", collections: [ "https://www.maverickandfarmer.com/collections/shop-all" ] },
  { roaster: "Tariero", collections: [ "https://tariero.com/collections/all-gourmet-coffees" ] },
  { roaster: "Naked Coffee", collections: [ "https://nakedcoffee.in/collections/whole-beans-ground" ] },
  { roaster: "Caarabi Coffee", collections: [ "https://caarabicoffee.com/collections/shop-coffee" ] },
  { roaster: "Caffnary", collections: [
    "https://caffinary.com/collections/specialty-single-estate-origin",
    "https://caffinary.com/collections/freshly-roasted-ground-beans-freshly-roasted-whole-beans"
  ] },
  { roaster: "Hill Tiger", collections: [ "https://hilltiller.com/collections/hill-tiller-coffee-roaster" ] },
  { roaster: "Beachville", collections: [ "https://beachvillecoffee.com/collections/all" ] },
  { roaster: "Coffeeverse", collections: [ "https://coffeeverse.co.in/collections/shop-all" ] },
  { roaster: "Rossette", collections: [ "https://rossettecoffee.com/collections/coffee" ] },
  { roaster: "Black Baza", collections: [ "https://www.blackbazacoffee.com/collections/coffee" ] },
  { roaster: "Bombay Island", collections: [ "https://www.bombayisland.com/collections/coffee" ] },
  { roaster: "Half Light", collections: [ "https://halflightcoffee.com/collections/coffee" ] },
  { roaster: "Ikkis Coffee", collections: [ "https://ikkis.coffee/collections/roasted-coffees" ] },
  { roaster: "Kaffacerrado", collections: [
    "https://kaffacerrado.com/collections/international-coffee",
    "https://kaffacerrado.com/collections/indian-coffee",
    "https://kaffacerrado.com/collections/tasting-packs"
  ] },
  { roaster: "Capulus", collections: [ "https://capulusbeans.com/collections/roasted-coffee" ] },
  { roaster: "Genetics", collections: [ "https://genetics.coffee/collections/single-origins" ] },
  { roaster: "Roast Coffee", collections: [ "https://roastcoffee.in/collections/roasted-coffee-bean" ] }
];

// --- Aggregator ---
async function fetchAllCoffee(): Promise<CoffeeBean[]> {
  let allBeans: CoffeeBean[] = [];
  for (const roasterObj of ROASTER_COLLECTIONS) {
    for (const url of roasterObj.collections) {
      const beans = await fetchShopifyCollection(url, roasterObj.roaster);
      allBeans = allBeans.concat(beans);
    }
  }
  return allBeans;
}

// --- Shared cache ---
let cache: { data: CoffeeBean[] | null; timestamp: number } = { data: null, timestamp: 0 };

// --- Handler ---
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }
  try {
    const data: CoffeeBean[] = await fetchAllCoffee();
    cache = { data, timestamp: Date.now() };
    res.status(200).json({
      success: true,
      count: data.length,
      lastUpdate: new Date(cache.timestamp).toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Refresh failed', details: typeof error === 'object' && error?.message ? error.message : String(error) });
  }
}

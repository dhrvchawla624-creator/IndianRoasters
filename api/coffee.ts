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

function findRoastLevel(text: string): string | undefined {
  const lowerText = text.toLowerCase();
  const found = [];

  if (lowerText.includes('light')) found.push('Light');
  if (lowerText.includes('medium')) found.push('Medium');
  if (lowerText.includes('dark')) found.push('Dark');

  // Handle specific combinations
  if (found.includes('Medium') && found.includes('Light')) return 'Medium Light';
  if (found.includes('Medium') && found.includes('Dark')) return 'Medium Dark';

  // Return single roast level or other keywords
  if (found.length === 1) return found[0];
  if (lowerText.includes('filter')) return 'Filter';
  if (lowerText.includes('espresso')) return 'Espresso';
  if (lowerText.includes('omni')) return 'Omni';

  return undefined;
}

function findProcess(text: string): string | undefined {
  const lowerText = text.toLowerCase();
  const keywords = [
    "washed", "natural", "anaerobic", "carbonic", "honey", "dry", 
    "semi-washed", "experimental", "barrel aged", "fermentation", "yeast", "koji"
  ];
  const found: string[] = [];
  for (const keyword of keywords) {
    if (lowerText.includes(keyword) && !found.some(f => f.includes(keyword))) {
      found.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
    }
  }
  return found.length > 0 ? found.join(', ') : undefined;
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
  try {
    const jsonUrl = collectionUrl.endsWith('/') ?
      `${collectionUrl}products.json?limit=250`
      : `${collectionUrl}/products.json?limit=250`;
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const res = await fetch(jsonUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!res.ok) return [];
    
    const data = await res.json() as { products: ShopifyProduct[] };
    
    if (!data.products || !Array.isArray(data.products)) return [];
    
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
          roastLevel: findRoastLevel(lowerTitle + " " + tags.join(" ")),
          origin: cleanMatch(lowerTitle + " " + tags.join(" "), [ // cleanMatch is fine for single-word properties
            "coorg", "chikmagalur", "karnataka", "kerala", "tamil nadu", "sikkim", "nilgiris", "bababudangiri", "basarikatte", "ratnagiri",
            "andhra", "araku", "sidamo", "ethiopia", "yirgacheffe", "honduras", "colombia"
          ]),
          process: findProcess(lowerTitle + " " + tags.join(" ")),
          tastingNotes: extractTastingNotes(p.title, tags, body),
          image: p.images[0]?.src,
          url: `${collectionUrl}/products/${p.handle}`,
          inStock: variant.available,
        };
      });
  } catch (error: any) {
    return [];
  }
}

import { ROASTERS_DATA } from '../src/data/roastersData';

// --- All Roasters & Collections (Generated from single source of truth) ---
const ROASTER_COLLECTIONS: { roaster: string; collections: string[] }[] = ROASTERS_DATA.map(
  roaster => ({
    roaster: roaster.name,
    collections: roaster.collections,
  })
);

// --- Aggregator ---
async function fetchAllCoffee(): Promise<CoffeeBean[]> {
  console.log(`⏳ Starting parallel fetch from ${ROASTER_COLLECTIONS.length} roasters...`);
  const startTime = Date.now();
  
  // Create array of all fetch promises
  const allFetchPromises: Promise<{ roaster: string; url: string; beans: CoffeeBean[] }>[] = [];
  
  for (const roasterObj of ROASTER_COLLECTIONS) {
    for (const url of roasterObj.collections) {
      // Each fetch is a separate promise
      const fetchPromise = fetchShopifyCollection(url, roasterObj.roaster)
        .then(beans => ({
          roaster: roasterObj.roaster,
          url,
          beans
        }))
        .catch(() => ({
          roaster: roasterObj.roaster,
          url,
          beans: [] as CoffeeBean[]
        }));
      
      allFetchPromises.push(fetchPromise);
    }
  }
  
  // Fetch all roasters in parallel
  console.log(`🚀 Fetching ${allFetchPromises.length} collections in parallel...`);
  const results = await Promise.all(allFetchPromises);
  
  // Aggregate all beans
  let allBeans: CoffeeBean[] = [];
  for (const result of results) {
    allBeans = allBeans.concat(result.beans);
  }
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✅ Fetched ${allBeans.length} products in ${duration}s`);
  
  return allBeans;
}

// --- In-memory cache ---
type CacheType = { data: CoffeeBean[] | null; timestamp: number };
let cache: CacheType = { data: null, timestamp: 0 };
const CACHE_DURATION = 60 * 60 * 1000;

// --- Handler ---
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const now = Date.now();
  if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
    return res.status(200).json({
      data: cache.data,
      cached: true,
      lastUpdate: new Date(cache.timestamp).toISOString()
    });
  }
  try {
    const data: CoffeeBean[] = await fetchAllCoffee();
    cache = { data, timestamp: now };
    res.status(200).json({
      data: cache.data,
      cached: false,
      lastUpdate: new Date(cache.timestamp).toISOString(),
    });
  } catch (error) {
    if (cache.data) {
      return res.status(200).json({
        data: cache.data,
        cached: true,
        stale: true,
        lastUpdate: new Date(cache.timestamp).toISOString()
      });
    }
    res.status(500).json({ error: "Failed to fetch coffee data" });
  }
}

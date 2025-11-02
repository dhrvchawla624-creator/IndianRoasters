import fetch from 'node-fetch';
import { ROASTERS_DATA } from './_lib/roasters.js';
import type { CoffeeBean, ShopifyProduct } from './_lib/coffee.js';


/** Common coffee tasting notes */
const TASTING_NOTE_LIST = [
  "chocolate", "cocoa", "dark chocolate", "berry", "strawberry", "raspberry", "blueberry", "blackcurrant", "cherry",
  "citrus", "lemon", "lime", "orange", "grapefruit", "vanilla", "caramel", "spices", "nutty", "hazelnut",
  "almond", "walnut", "pecan", "cashew", "fruity", "honey", "floral", "jasmine", "rose", "peach", "apricot",
  "plum", "molasses", "sweet", "papaya", "mango", "apple", "sugarcane", "earthy", "herbal", "woody", "smoky", 
  "roasted almond", "stone fruit", "pineapple"
];

function cleanTitle(title: string): string {
  return title.replace(/\(.*?\)/g, '').replace(/\d{2,4}\s?g/gi, '').trim();
}

/** Find first option in text, lowercased, for metadata fields */
function cleanMatch(text: string, options: string[]): string | undefined {
  const txt = text.toLowerCase();
  for (const opt of options) {
    if (txt.includes(opt)) return opt;
  }
  return undefined;
}

/** Find roast level, handling composite names like "Medium Dark" */
function findRoastLevel(text: string): string | undefined {
  const lowerText = text.toLowerCase();
  const found = [];

  if (lowerText.includes('light')) found.push('Light');
  if (lowerText.includes('medium')) found.push('Medium');
  if (lowerText.includes('dark')) found.push('Dark');

  if (found.includes('Medium') && found.includes('Light')) return 'Medium Light';
  if (found.includes('Medium') && found.includes('Dark')) return 'Medium Dark';

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

/** Extract tasting notes from title + tags + description */
function extractTastingNotes(title: string, tags: string[], body?: string): string[] {
  const notes: string[] = [];
  const allText = [title, ...tags, body || ""].join(" ").toLowerCase();
  for (const note of TASTING_NOTE_LIST) {
    if (allText.includes(note) && !notes.includes(note)) notes.push(note);
  }
  return notes;
}

/** Extract weight in grams from a string like "250g" or "1kg" */
function parseWeight(weightString: string): number | undefined {
  if (!weightString) return undefined;
  const lowerWeightString = weightString.toLowerCase();

  // Look for "kg" first and convert to grams
  const kgMatch = lowerWeightString.match(/(\d+\.?\d*)\s*kg/);
  if (kgMatch && kgMatch[1]) {
    return parseFloat(kgMatch[1]) * 1000;
  }

  // Look for "g" or "gms"
  const gMatch = lowerWeightString.match(/(\d+)\s*(g|gm|gms)/);
  return gMatch && gMatch[1] ? parseInt(gMatch[1], 10) : undefined;
}

// --- Shopify Fetcher with Retry Logic ---
export async function fetchShopifyCollection(
  collectionUrl: string, 
  roasterName: string,
  retries: number = 2
): Promise<CoffeeBean[]> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const jsonUrl = collectionUrl.endsWith('/') ?
        `${collectionUrl}products.json?limit=250`
        : `${collectionUrl}/products.json?limit=250`;
      
      // Increased timeout to 15 seconds
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const res = await fetch(jsonUrl, { 
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; CoffeeAggregator/1.0)'
        }
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        console.error(`❌ Error fetching ${roasterName} (attempt ${attempt + 1}/${retries + 1}): ${res.status} from ${collectionUrl}`);
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); // Exponential backoff
          continue;
        }
        return [];
      }
      
      const data = await res.json() as { products: ShopifyProduct[] };
      
      if (!data.products || !Array.isArray(data.products)) {
        console.error(`❌ Invalid data format from ${roasterName}`);
        return [];
      }
      
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
            weight: parseWeight(variant.title),
            roastLevel: findRoastLevel(lowerTitle + " " + tags.join(" ")),
            origin: cleanMatch(lowerTitle + " " + tags.join(" "), [
              "coorg", "chikmagalur", "karnataka", "kerala", "tamil nadu", "sikkim", "nilgiris", "bababudangiri", "basarikatte", "ratnagiri", 
              "andhra", "araku", "sidamo", "ethiopia", "yirgacheffe", "honduras", "colombia" ]),
            process: findProcess(lowerTitle + " " + tags.join(" ")),
            tastingNotes: extractTastingNotes(p.title, tags, body),
            image: p.images[0]?.src,
            url: `${collectionUrl}/products/${p.handle}`,
            inStock: variant.available,
          };
        });
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.error(`⏱️  Timeout fetching ${roasterName} (attempt ${attempt + 1}/${retries + 1}) from ${collectionUrl}`);
      } else {
        console.error(`❌ Exception fetching ${roasterName} (attempt ${attempt + 1}/${retries + 1}):`, error.message);
      }
      
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); // Exponential backoff
        continue;
      }
      return [];
    }
  }
  return [];
}


// --- Batch Fetcher with Concurrency Limit ---
async function fetchInBatches<T>(
  tasks: (() => Promise<T>)[],
  batchSize: number = 5
): Promise<T[]> {
  const results: T[] = [];
  
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(tasks.length / batchSize)}...`);
    const batchResults = await Promise.all(batch.map(task => task()));
    results.push(...batchResults);
    
    // Small delay between batches to avoid overwhelming servers
    if (i + batchSize < tasks.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  return results;
}

// --- All Roasters & Collections (Generated from single source of truth) ---
const ROASTER_COLLECTIONS: { roaster: string; collections: string[] }[] = ROASTERS_DATA.map(
  roaster => ({
    roaster: roaster.name,
    collections: roaster.collections,
  })
);

// --- Aggregator with Batching ---
export async function fetchAllCoffee(): Promise<CoffeeBean[]> {
  console.log(`⏳ Starting batch fetch from ${ROASTER_COLLECTIONS.length} roasters...`);
  const startTime = Date.now();
  
  // Create array of all fetch tasks
  const allFetchTasks: (() => Promise<{ roaster: string; url: string; beans: CoffeeBean[] }>)[] = [];
  
  for (const roasterObj of ROASTER_COLLECTIONS) {
    for (const url of roasterObj.collections) {
      const fetchTask = () => fetchShopifyCollection(url, roasterObj.roaster)
        .then(beans => ({
          roaster: roasterObj.roaster,
          url,
          beans
        }))
        .catch(error => {
          console.error(`❌ Error fetching ${roasterObj.roaster} from ${url}:`, error.message);
          return {
            roaster: roasterObj.roaster,
            url,
            beans: [] as CoffeeBean[]
          };
        });
      
      allFetchTasks.push(fetchTask);
    }
  }
  
  // Fetch in batches of 5 to avoid overwhelming servers
  console.log(`🚀 Fetching ${allFetchTasks.length} collections in batches of 5...`);
  const results = await fetchInBatches(allFetchTasks, 5);
  
  // Aggregate all beans
  let allBeans: CoffeeBean[] = [];
  let successCount = 0;
  let failureCount = 0;
  
  for (const result of results) {
    allBeans = allBeans.concat(result.beans);
    if (result.beans.length > 0) {
      successCount++;
      console.log(`✅ ${result.roaster}: ${result.beans.length} products`);
    } else {
      failureCount++;
      console.log(`⚠️  ${result.roaster}: 0 products (failed or empty)`);
    }
  }
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n📊 Fetch Summary:`);
  console.log(`   ✅ Successful: ${successCount} collections`);
  console.log(`   ⚠️  Failed/Empty: ${failureCount} collections`);
  console.log(`   📦 Total products: ${allBeans.length}`);
  console.log(`   ⏱️  Time taken: ${duration}s\n`);
  
  return allBeans;
}
import fetch from 'node-fetch';
import { ROASTER_COLLECTIONS } from '../../src/data/roastersData';
import type { CoffeeBean, ShopifyProduct } from '../../src/types/coffee';

// ...rest of file...



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

// --- Shopify Fetcher with Enhanced Error Handling ---
export async function fetchShopifyCollection(
  collectionUrl: string, 
  roasterName: string,
  retries: number = 2,
  timeout: number = 10000 // 10 seconds
): Promise<CoffeeBean[]> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const jsonUrl = collectionUrl.endsWith('/') ?
        `${collectionUrl}products.json?limit=250`
        : `${collectionUrl}/products.json?limit=250`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const res = await fetch(jsonUrl, { 
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; CoffeeAggregator/1.0)',
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip, deflate'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        console.error(`❌ ${roasterName} HTTP ${res.status} (attempt ${attempt + 1}/${retries + 1})`);
        if (attempt < retries && res.status >= 500) {
          await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, attempt)));
          continue;
        }
        return [];
      }
      
      const data = await res.json() as { products: ShopifyProduct[] };
      
      if (!data.products || !Array.isArray(data.products)) {
        console.error(`❌ ${roasterName}: Invalid data format`);
        return [];
      }
      
      const beans = data.products
        .filter((p: ShopifyProduct) => p.variants && p.variants.length > 0)
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
              "coorg", "chikmagalur", "karnataka", "kerala", "tamil nadu", "sikkim", "nilgiris", 
              "bababudangiri", "basarikatte", "ratnagiri", "andhra", "araku", "sidamo", "ethiopia", 
              "yirgacheffe", "honduras", "colombia"
            ]),
            process: findProcess(lowerTitle + " " + tags.join(" ")),
            tastingNotes: extractTastingNotes(p.title, tags, body),
            image: p.images[0]?.src,
            url: `${collectionUrl}/products/${p.handle}`,
            inStock: variant.available,
          };
        });
      
      console.log(`✅ ${roasterName}: ${beans.length} products`);
      return beans;
      
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.error(`⏱️  ${roasterName} timeout (attempt ${attempt + 1}/${retries + 1})`);
      } else {
        console.error(`❌ ${roasterName} error (attempt ${attempt + 1}/${retries + 1}):`, error.message);
      }
      
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, attempt)));
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
  batchSize: number = 8
): Promise<T[]> {
  const results: T[] = [];
  const totalBatches = Math.ceil(tasks.length / batchSize);
  
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    
    console.log(`📦 Batch ${batchNum}/${totalBatches} (${batch.length} requests)...`);
    
    const batchResults = await Promise.all(
      batch.map(task => 
        task().catch(error => {
          console.error('Batch task error:', error.message);
          return null;
        })
      )
    );
    
    results.push(...batchResults.filter(r => r !== null) as T[]);
  }
  
  return results;
}

// --- Main Aggregator ---
export async function fetchAllCoffee(): Promise<CoffeeBean[]> {
  const startTime = Date.now();
  console.log(`\n🚀 Starting fetch from ${ROASTER_COLLECTIONS.length} roasters...`);
  console.log(`⏰ Max execution time: Consider Vercel limits (10s Hobby / 60s Pro)\n`);
  
  const allFetchTasks: (() => Promise<{ roaster: string; url: string; beans: CoffeeBean[] }>)[] = [];
  
  for (const roasterObj of ROASTER_COLLECTIONS) {
    for (const url of roasterObj.collections) {
      const fetchTask = async () => {
        try {
          const beans = await fetchShopifyCollection(url, roasterObj.roaster);
          return { roaster: roasterObj.roaster, url, beans };
        } catch (error: any) {
          console.error(`❌ ${roasterObj.roaster} failed:`, error.message);
          return { roaster: roasterObj.roaster, url, beans: [] as CoffeeBean[] };
        }
      };
      
      allFetchTasks.push(fetchTask);
    }
  }
  
  console.log(`📊 Total collections to fetch: ${allFetchTasks.length}`);
  console.log(`🔄 Fetching in batches of 8 for optimal performance...\n`);
  
  const results = await fetchInBatches(allFetchTasks, 8);
  
  let allBeans: CoffeeBean[] = [];
  let successCount = 0;
  let failureCount = 0;
  let totalProducts = 0;
  
  for (const result of results) {
    if (result.beans.length > 0) {
      allBeans = allBeans.concat(result.beans);
      successCount++;
      totalProducts += result.beans.length;
    } else {
      failureCount++;
    }
  }
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 FETCH SUMMARY`);
  console.log(`${'='.repeat(50)}`);
  console.log(`✅ Successful:     ${successCount}/${results.length} collections`);
  console.log(`⚠️  Failed/Empty:   ${failureCount}/${results.length} collections`);
  console.log(`📦 Total Products: ${totalProducts}`);
  console.log(`⏱️  Duration:       ${duration}s`);
  console.log(`🎯 Avg Speed:      ${(totalProducts / parseFloat(duration)).toFixed(1)} products/sec`);
  console.log(`${'='.repeat(50)}\n`);
  
  if (parseFloat(duration) > 50) {
    console.warn(`⚠️  WARNING: Fetch took ${duration}s - approaching Vercel timeout limits!`);
  }
  
  return allBeans;
}

export const config = {
  maxDuration: 60,
};

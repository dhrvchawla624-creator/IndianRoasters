import fetch from 'node-fetch';

// --- Types ---
export interface CoffeeBean {
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

/** Extract tasting notes from title + tags + description */
function extractTastingNotes(title: string, tags: string[], body?: string): string[] {
  const notes: string[] = [];
  const allText = [title, ...tags, body || ""].join(" ").toLowerCase();
  for (const note of TASTING_NOTE_LIST) {
    if (allText.includes(note) && !notes.includes(note)) notes.push(note);
  }
  return notes;
}

// --- Shopify Fetcher ---
export async function fetchShopifyCollection(collectionUrl: string, roasterName: string): Promise<CoffeeBean[]> {
  try {
    const jsonUrl = collectionUrl.endsWith('/') ?
      `${collectionUrl}products.json?limit=250`
      : `${collectionUrl}/products.json?limit=250`;
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const res = await fetch(jsonUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      console.error(`❌ Error fetching ${roasterName}: ${res.status} from ${collectionUrl}`);
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
          currency: "INR",
          weight: variant.title,
          roastLevel: cleanMatch(lowerTitle + " " + tags.join(" "), ["light", "medium", "dark", "filter", "espresso", "omni"]),
          origin: cleanMatch(lowerTitle + " " + tags.join(" "), [
            "coorg", "chikmagalur", "karnataka", "kerala", "tamil nadu", "sikkim", "nilgiris", "bababudangiri", "basarikatte", "ratnagiri", 
            "andhra", "araku", "sidamo", "ethiopia", "yirgacheffe", "honduras", "colombia" ]),
          process: cleanMatch(lowerTitle + " " + tags.join(" "), [
            "washed", "natural", "anaerobic", "carbonic", "honey", "dry", "semi-washed", "experimental", "barrel-aged" ]),
          tastingNotes: extractTastingNotes(p.title, tags, body),
          image: p.images[0]?.src,
          url: `${collectionUrl}/products/${p.handle}`,
          inStock: variant.available,
        };
      });
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error(`⏱️  Timeout fetching ${roasterName} from ${collectionUrl}`);
    } else {
      console.error(`❌ Exception fetching ${roasterName}:`, error.message);
    }
    return [];
  }
}

// --- All Roasters & Collections ---
const ROASTER_COLLECTIONS: { roaster: string; collections: string[] }[] = [
  { roaster: 'Blue Tokai Coffee Roasters', collections: [ 'https://bluetokaicoffee.com/collections/roasted-and-ground-coffee-beans' ] },
  { roaster: 'Savourworks', collections: [ 'https://www.savorworksroasters.com/collections/coffee' ] },
  { roaster: 'Quick Brown Fox', collections: [ 'https://qbfcoffee.com/collections/all-coffees' ] },
  { roaster: 'GreySoul', collections: [ 'https://greysoul.coffee/collections/coffee' ] },
  { roaster: 'Home Blends', collections: [ 'https://homeblendcoffee.com/collections/ground', 'https://homeblendcoffee.com/collections/whole-bean-coffee', 'https://homeblendcoffee.com/collections/international-specialty-coffee' ] },
  { roaster: 'Kaapi Kottai', collections: [ 'https://kapikottai.coffee/collections/all' ] },
  { roaster: 'Tulum', collections: [ 'https://www.tulum.coffee/collections/roasted-coffees' ] },
  { roaster: 'Classic Coffees', collections: [ 'https://www.classiccoffees.in/collections/roast-ground-custom-grind', 'https://www.classiccoffees.in/collections/micro-lots' ] },
  { roaster: 'Corridor Seven', collections: [ 'https://corridorseven.coffee/collections/all' ] },
  { roaster: 'Broot', collections: [ 'https://brootcoffee.com/collections/all-coffees' ] },
  { roaster: "Baarbara Coffee", collections: [ "https://www.baarbaracoffee.com/collections/premium-blends", "https://www.baarbaracoffee.com/collections/signature-collection", "https://www.baarbaracoffee.com/collections/specialty-coffee" ] },
  { roaster: "Fraction9", collections: [ "https://www.fraction9coffee.com/collections/all" ] },
  { roaster: "Bloom Coffee", collections: [ "https://bloomcoffeeroasters.in/collections/coffee" ] },
  { roaster: "Devan's Coffee", collections: [ "https://www.devans.in/collections/coffee" ] },
  { roaster: "Korebi Coffee", collections: [ "https://korebi.coffee/collections/coffee" ] },
  { roaster: "Maverick & Farmer", collections: [ "https://www.maverickandfarmer.com/collections/shop-all" ] },
  
  { roaster: "Naked Coffee", collections: [ "https://nakedcoffee.in/collections/whole-beans-ground" ] },
  { roaster: "Caarabi Coffee", collections: [ "https://caarabicoffee.com/collections/shop-coffee" ] },
  { roaster: "Caffnary", collections: [ "https://caffinary.com/collections/specialty-single-estate-origin" , "https://caffinary.com/collections/freshly-roasted-ground-beans-freshly-roasted-whole-beans"] },
  { roaster: "Hill Tiger", collections: [ "https://hilltiller.com/collections/hill-tiller-coffee-roaster" ] },
  { roaster: "Beachville", collections: [ "https://beachvillecoffee.com/collections/all" ] },
  { roaster: "Coffeeverse", collections: [ "https://coffeeverse.co.in/collections/shop-all" ] },
  { roaster: "Rossette", collections: [ "https://rossettecoffee.com/collections/coffee" ] },
  { roaster: "Black Baza", collections: [ "https://www.blackbazacoffee.com/collections/coffee" ] },
  { roaster: "Bombay Island", collections: [ "https://www.bombayisland.com/collections/coffee" ] },
  { roaster: "Half Light", collections: [ "https://halflightcoffee.com/collections/coffee" ] },
  { roaster: "Ikkis Coffee", collections: [ "https://ikkis.coffee/collections/roasted-coffees" ] },
  { roaster: "Kaffacerrado", collections: [ "https://kaffacerrado.com/collections/international-coffee", "https://kaffacerrado.com/collections/indian-coffee", "https://kaffacerrado.com/collections/tasting-packs" ] },
  { roaster: "Capulus", collections: [ "https://capulusbeans.com/collections/roasted-coffee" ] },
  { roaster: "Genetics", collections: [ "https://genetics.coffee/collections/single-origins" ] },
  { roaster: "Roast Coffee", collections: [ "https://roastcoffee.in/collections/roasted-coffee-bean" ] },
  { roaster: "Karma Kaapi", collections: [ "https://karmakaapi.com/collections/buy-coffee-online" ] },
 { roaster: "Kumaradhara", collections: [ "https://www.kumaradharacoffee.com/collections/specialty-coffees" ] },
  { roaster: "The Caffine Baar", collections: [ "https://www.thecaffeinebaar.com/collections/packaged-coffee" ] },
  { roaster: "Kumaradhara", collections: [ "https://www.kumaradharacoffee.com/collections/specialty-coffees" ] },
  { roaster: "The Caffine Baar", collections: [ "https://www.thecaffeinebaar.com/collections/packaged-coffee" ] },
  { roaster: "Coffee Bean Project", collections: [ "https://coffeebeanproject.com/collections/all" ] },


];

// --- Aggregator ---
export async function fetchAllCoffee(): Promise<CoffeeBean[]> {
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
        .catch(error => {
          console.error(`❌ Error fetching ${roasterObj.roaster} from ${url}:`, error.message);
          return {
            roaster: roasterObj.roaster,
            url,
            beans: [] as CoffeeBean[]
          };
        });
      
      allFetchPromises.push(fetchPromise);
    }
  }
  
  // Fetch all roasters in parallel
  console.log(`🚀 Fetching ${allFetchPromises.length} collections in parallel...`);
  const results = await Promise.all(allFetchPromises);
  
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

// --- FILTERS ---
// Includes priceMin, priceMax, and returns paginated results per page
export function filterBeans(
  beans: CoffeeBean[],
  filters: {
    roaster?: string,
    roastLevel?: string,
    origin?: string,
    process?: string,
    priceMin?: number,
    priceMax?: number,
    inStock?: boolean,
    tastingNotes?: string,
    page?: number,             // 1-based
    perPage?: number           // defaults to 12
  }
): { beans: CoffeeBean[]; pageCount: number; total: number;} {
  let filtered = beans.filter(bean => {
    if (filters.roaster && bean.roaster !== filters.roaster) return false;
    if (filters.roastLevel && bean.roastLevel !== filters.roastLevel) return false;
    if (filters.origin && bean.origin !== filters.origin) return false;
    if (filters.process && bean.process !== filters.process) return false;
    if (filters.tastingNotes && !bean.tastingNotes?.some(note => note.toLowerCase() === filters.tastingNotes?.toLowerCase())) return false;
    if (filters.priceMin !== undefined && (bean.price ?? 0) < filters.priceMin) return false;
    if (filters.priceMax !== undefined && (bean.price ?? 0) > filters.priceMax) return false;
    if (filters.inStock !== undefined && bean.inStock !== filters.inStock) return false;
    return true;
  });

  // Pagination logic
  const page      = filters.page ?? 1;
  const perPage   = filters.perPage ?? 12;
  const total     = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));

  // Paginate results
  const startIdx = (page - 1) * perPage;
  const paged    = filtered.slice(startIdx, startIdx + perPage);

  return { beans: paged, pageCount, total };
}

// --- Example Runner ---
fetchAllCoffee().then(beans => {
  console.log(`\n=== Fetched ${beans.length} beans combined ===`);
  // Print sample tasting notes for each bean
  beans.forEach(bean => {
    console.log(`Bean: ${bean.name} | Roaster: ${bean.roaster} | Tasting Notes: ${bean.tastingNotes?.join(', ')}`);
  });

  // Example: Chocolate beans, page 1, 12 per page, ₹400-₹1000 budget
  const { beans: chocolatePaged, pageCount, total } = filterBeans(
    beans,
    { tastingNotes: "chocolate", page: 1, perPage: 12, priceMin: 400, priceMax: 1000 }
  );
  console.log(`\nChocolate beans | Price ₹400-₹1000 | Page 1/${pageCount}, showing ${chocolatePaged.length} of ${total}:`);
  console.log(chocolatePaged);

  // Example: Page 2 of all beans, 12 per page
  const { beans: page2Beans } = filterBeans(beans, { page: 2, perPage: 12 });
  console.log("\nPage 2 beans:", page2Beans);

  // You can use filterBeans for paginated UI in frontend as well!
});

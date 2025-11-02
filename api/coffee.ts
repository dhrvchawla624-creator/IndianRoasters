import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchAllCoffee } from './_lib/fetcher.js';
import type { CoffeeBean } from './_lib/coffee.js';

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// In-memory cache for serverless function
let cache: { data: CoffeeBean[] | null; timestamp: number } = { 
  data: null, 
  timestamp: 0 
};

function setCache(data: CoffeeBean[]) {
  cache = { data, timestamp: Date.now() };
  console.log(`✅ Cache updated with ${data.length} coffee beans at ${new Date().toISOString()}`);
}

function isCacheValid(): boolean {
  const now = Date.now();
  const isValid = cache.data !== null && (now - cache.timestamp) < CACHE_DURATION;
  if (isValid) {
    const age = Math.floor((now - cache.timestamp) / 1000 / 60); // minutes
    console.log(`📦 Cache hit - Age: ${age} minutes`);
  }
  return isValid;
}

// --- Handler ---
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    console.warn(`❌ Method not allowed: ${req.method}`);
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['GET']
    });
  }

  console.log('🔍 Coffee API called at:', new Date().toISOString());

  // Check cache first
  if (isCacheValid()) {
    return res.status(200).json({
      data: cache.data,
      cached: true,
      lastUpdate: new Date(cache.timestamp).toISOString(),
      count: cache.data?.length || 0
    });
  }

  // Cache miss or expired - fetch fresh data
  console.log('🌐 Cache miss - Fetching fresh data from roasters...');

  try {
    const startTime = Date.now();
    const data: CoffeeBean[] = await fetchAllCoffee();
    const fetchDuration = Date.now() - startTime;

    console.log(`✅ Successfully fetched ${data.length} coffee beans in ${fetchDuration}ms`);

    // Validate data
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format: expected array');
    }

    if (data.length === 0) {
      console.warn('⚠️ Warning: Fetched 0 coffee beans');
    }

    setCache(data);

    return res.status(200).json({
      data: cache.data,
      cached: false,
      lastUpdate: new Date(cache.timestamp).toISOString(),
      count: data.length,
      fetchDuration: `${fetchDuration}ms`
    });
  } catch (error) {
    console.error('❌ Error fetching coffee data:', error);

    // If we have stale cache data, return it as fallback
    if (cache.data && cache.data.length > 0) {
      const cacheAge = Math.floor((Date.now() - cache.timestamp) / 1000 / 60); // minutes
      console.log(`⚠️ Returning stale cache (${cacheAge} minutes old) due to fetch error`);
      
      return res.status(200).json({
        data: cache.data,
        cached: true,
        stale: true,
        lastUpdate: new Date(cache.timestamp).toISOString(),
        count: cache.data.length,
        warning: 'Using cached data due to fetch error'
      });
    }

    // No cache available - return error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('💥 No cache available, returning error:', errorMessage);
    
    return res.status(500).json({ 
      error: 'Failed to fetch coffee data',
      message: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
}

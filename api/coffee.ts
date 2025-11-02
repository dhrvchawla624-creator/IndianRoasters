import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchAllCoffee } from './_lib/fetcher.js';
import type { CoffeeBean } from './_lib/coffee.js';

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
let cache: { data: CoffeeBean[] | null; timestamp: number } = { data: null, timestamp: 0 };
function setCache(data: CoffeeBean[]) {
  cache = { data, timestamp: Date.now() };
}

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
    setCache(data);
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

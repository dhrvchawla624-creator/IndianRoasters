import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchAllCoffee } from '_lib/fetcher';
import type { CoffeeBean } from '../../src/types/coffee.ts';

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

let cache: { data: CoffeeBean[] | null; timestamp: number } = {
  data: null,
  timestamp: 0
};

function setCache(data: CoffeeBean[]) {
  cache = { data, timestamp: Date.now() };
}

function isCacheValid(): boolean {
  const now = Date.now();
  return cache.data !== null && (now - cache.timestamp) < CACHE_DURATION;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      allowedMethods: ['GET']
    });
  }

  // Serve from cache if valid
  if (isCacheValid()) {
    return res.status(200).json({
      data: cache.data,
      cached: true,
      lastUpdate: new Date(cache.timestamp).toISOString(),
      count: cache.data?.length || 0
    });
  }

  try {
    const data: CoffeeBean[] = await fetchAllCoffee();
    setCache(data);

    return res.status(200).json({
      data: cache.data,
      cached: false,
      lastUpdate: new Date(cache.timestamp).toISOString(),
      count: data.length
    });
  } catch (error) {
    // Return stale cache if available
    if (cache.data && cache.data.length > 0) {
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
    return res.status(500).json({
      error: 'Failed to fetch coffee data',
      message: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
}


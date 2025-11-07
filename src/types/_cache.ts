import type { CoffeeBean } from './_types.js';

// --- In-memory cache ---
export type CacheType = { data: CoffeeBean[] | null; timestamp: number };

export const cache: CacheType = { data: null, timestamp: 0 };

export const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const setCache = (data: CoffeeBean[]) => {
  cache.data = data;
  cache.timestamp = Date.now();
};
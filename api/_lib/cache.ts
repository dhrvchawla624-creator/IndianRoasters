import type { CoffeeBean } from './coffee.js';

// Cache configuration
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Shared cache object
export let cache: { data: CoffeeBean[] | null; timestamp: number } = {
    data: null,
    timestamp: 0
};

// Update cache with new data
export function setCache(data: CoffeeBean[]) {
    cache = { data, timestamp: Date.now() };
}

// Check if cache is still valid
export function isCacheValid(): boolean {
    const now = Date.now();
    return cache.data !== null && (now - cache.timestamp) < CACHE_DURATION;
}

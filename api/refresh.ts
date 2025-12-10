import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchAllCoffee } from './_lib/fetcher.js';
import type { CoffeeBean } from './_lib/coffee.js';

// --- Handler ---
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }
  try {
    const startTime = Date.now();
    const data: CoffeeBean[] = await fetchAllCoffee();
    const fetchDuration = ((Date.now() - startTime) / 1000).toFixed(2);

    res.status(200).json({
      success: true,
      count: data.length,
      fetchTime: `${fetchDuration}s`,
      lastUpdate: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Refresh failed', details: typeof error === 'object' && error?.message ? error.message : String(error) });
  }
}

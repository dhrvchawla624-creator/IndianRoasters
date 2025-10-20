import express from 'express';
import cors from 'cors';
import { fetchAllCoffee } from './fetcher.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Simple in-memory cache
let cache: {
  data: any[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', cache: cache.data ? 'populated' : 'empty' });
});

// Main coffee endpoint
app.get('/api/coffee', async (req, res) => {
  const now = Date.now();
  
  // Return cached data if fresh
  if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
    console.log('📦 Serving cached data');
    return res.json({
      data: cache.data,
      cached: true,
      lastUpdate: new Date(cache.timestamp).toISOString()
    });
  }

  // Fetch fresh data
  try {
    console.log('🔄 Cache expired or empty, fetching fresh data...');
    const startTime = Date.now();
    const data = await fetchAllCoffee();
    const fetchDuration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    cache = { data, timestamp: now };
    
    console.log(`✅ Fresh data fetched and cached (${fetchDuration}s)`);
    res.json({
      data: cache.data,
      cached: false,
      lastUpdate: new Date(cache.timestamp).toISOString(),
      fetchTime: `${fetchDuration}s`
    });
  } catch (error) {
    console.error('❌ Failed to fetch coffee:', error);
    
    // Return stale cache if available
    if (cache.data) {
      console.log('⚠️  Returning stale cache data due to fetch error');
      return res.json({
        data: cache.data,
        cached: true,
        stale: true,
        lastUpdate: new Date(cache.timestamp).toISOString()
      });
    }
    
    res.status(500).json({ error: 'Failed to fetch coffee data' });
  }
});

// Force refresh endpoint (optional, for manual cache invalidation)
app.post('/api/coffee/refresh', async (req, res) => {
  try {
    console.log('🔄 Manual refresh triggered...');
    const startTime = Date.now();
    const data = await fetchAllCoffee();
    const fetchDuration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    cache = { data, timestamp: Date.now() };
    
    console.log(`✅ Cache refreshed successfully (${fetchDuration}s)`);
    res.json({ 
      success: true, 
      count: data.length,
      fetchTime: `${fetchDuration}s`,
      lastUpdate: new Date(cache.timestamp).toISOString()
    });
  } catch (error) {
    console.error('❌ Refresh failed:', error);
    res.status(500).json({ error: 'Refresh failed' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`☕ Coffee Discovery API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 API endpoint: http://localhost:${PORT}/api/coffee`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});

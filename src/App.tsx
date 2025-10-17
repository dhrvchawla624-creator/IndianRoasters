import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState, useEffect, useMemo } from 'react';
import './App.css';

interface CoffeeBean {
  id: string;
  name: string;
  roaster: string;
  price: number;
  currency: string;
  weight: string;
  roastLevel?: string;
  origin?: string;
  process?: string;
  tastingNotes?: string[];
  image: string;
  url: string;
  inStock: boolean;
}

function getAllTastingNotes(beans: CoffeeBean[]): string[] {
  const allNotes = beans.flatMap(b => b.tastingNotes ?? []);
  return Array.from(new Set(allNotes.map(note => note.trim()))).sort();
}

function beanSearchText(bean: CoffeeBean): string {
  return [
    bean.name,
    bean.roaster,
    bean.origin || '',
    bean.roastLevel || '',
    bean.process || '',
    bean.weight,
    bean.tastingNotes?.join(' ') || ''
  ].join(' ').toLowerCase();
}

const BEANS_PER_PAGE = 12;

function App() {
  const [beans, setBeans] = useState<CoffeeBean[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [showLanding, setShowLanding] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoaster, setSelectedRoaster] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [selectedRoast, setSelectedRoast] = useState('all');
  const [selectedProcess, setSelectedProcess] = useState('all');
  const [selectedTastingNote, setSelectedTastingNote] = useState('all');
  const [showOutOfStock, setShowOutOfStock] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'roaster'>('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [page, setPage] = useState(1);

  const roasters = useMemo(() => Array.from(new Set(beans.map(b => b.roaster))).sort(), [beans]);
  const origins = useMemo(() => Array.from(new Set(beans.map(b => b.origin).filter(Boolean))).sort(), [beans]);
  const roastLevels = useMemo(() => Array.from(new Set(beans.map(b => b.roastLevel).filter(Boolean))).sort(), [beans]);
  const process = useMemo(() => Array.from(new Set(beans.map(b => b.process).filter(Boolean))).sort(), [beans]);
  const tastingNoteOptions = useMemo(() => ['all', ...getAllTastingNotes(beans)], [beans]);

  useEffect(() => { fetchCoffee(); }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowLanding(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedRoaster, selectedOrigin, selectedRoast, selectedProcess, selectedTastingNote, showOutOfStock, sortBy, priceRange, beans]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const res = await fetch('/api/refresh', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        await fetchCoffee();
      } else {
        setError('Server responded but refresh failed.');
      }
    } catch (err) {
      setError('Failed to refresh coffee data');
    }
    setRefreshing(false);
  };

  const fetchCoffee = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/coffee');
      const result = await response.json();
      setBeans(result.data);
      setLastUpdate(result.lastUpdate);
      setError(null);
    } catch (err) {
      setError('Failed to load coffee data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBeans = useMemo(() => {
    const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
    let filtered = beans.filter(bean => {
      const beanText = beanSearchText(bean);
      const matchesSearch = searchWords.length === 0 || searchWords.every(word => beanText.includes(word));
      const matchesRoaster = selectedRoaster === 'all' || bean.roaster === selectedRoaster;
      const matchesOrigin = selectedOrigin === 'all' || bean.origin === selectedOrigin;
      const matchesRoast = selectedRoast === 'all' || bean.roastLevel === selectedRoast;
      const matchesProcess = selectedProcess === 'all' || bean.process === selectedProcess;
      const matchesTasting = selectedTastingNote === 'all' || (bean.tastingNotes && bean.tastingNotes.map(n => n.toLowerCase()).includes(selectedTastingNote.toLowerCase()));
      const matchesStock = showOutOfStock || bean.inStock;
      const matchesPrice = bean.price >= priceRange[0] && bean.price <= priceRange[1];
      return matchesSearch && matchesRoaster && matchesOrigin && matchesRoast && matchesProcess && matchesTasting && matchesStock && matchesPrice;
    });
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'roaster': return a.roaster.localeCompare(b.roaster);
        default: return a.name.localeCompare(b.name);
      }
    });
    return filtered;
  }, [beans, searchTerm, selectedRoaster, selectedOrigin, selectedRoast, selectedProcess, selectedTastingNote, showOutOfStock, sortBy, priceRange]);

  const pageCount = Math.ceil(filteredBeans.length / BEANS_PER_PAGE);
  const pagedBeans = useMemo(() => {
    const startIdx = (page - 1) * BEANS_PER_PAGE;
    return filteredBeans.slice(startIdx, startIdx + BEANS_PER_PAGE);
  }, [filteredBeans, page]);

  function renderPagination() {
    const pages: (number | string)[] = [];
    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      if (page === pageCount) { pages.push(page - 2); pages.push(page - 1); }
      else if (page === pageCount - 1) { pages.push(page - 1); pages.push(page); }
      else if (page > 2 && page < pageCount - 1) { pages.push(page - 1); pages.push(page); pages.push(page + 1); }
      else if (page === 2) { pages.push(2); pages.push(3); }
      else if (page === 1) { pages.push(2); pages.push(3); }
      if (page < pageCount - 2) pages.push('...');
      pages.push(pageCount);
    }
    return pages;
  }

  //--- RENDER BLOCK ---
  if (showLanding && loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchCoffee}>Try Again</button>
      </div>
    );
  }
  return (
    <div className="app">
      <header className="hero">
        <h1>Homegrounds Coffee Finder</h1>
      </header>
      <div className="filters-section" style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <button
          onClick={handleRefresh}
          disabled={loading || refreshing}
          style={{
            height: 44, minWidth: 160, fontWeight: 600, borderRadius: 8,
            background: refreshing ? '#d4af37' : '#fffbe8',
            color: refreshing ? '#fff' : '#222',
            border: '2px solid #d4af37',
            marginBottom: 12, marginRight: 15,
            cursor: loading || refreshing ? 'not-allowed' : 'pointer'
          }}
        >
          {refreshing ? 'Refreshing...' : 'Refresh Coffee Data'}
        </button>
        <input type="text" placeholder="Search…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ height: 35, marginRight: 10, borderRadius: 6 }} />
        <Slider
          range
          min={0}
          max={10000}
          value={priceRange}
          onChange={(val) => setPriceRange(val as [number, number])}
          style={{ width: 160, verticalAlign: 'middle' }}
        />
        <span style={{ marginLeft: 10 }}>
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </span>
        {/* Add roaster, origin, roast, process, tasting note filters */}
        <select value={selectedRoaster} onChange={e => setSelectedRoaster(e.target.value)}>
          <option value="all">All Roasters</option>
          {roasters.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={selectedOrigin} onChange={e => setSelectedOrigin(e.target.value)}>
          <option value="all">All Origins</option>
          {origins.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <select value={selectedRoast} onChange={e => setSelectedRoast(e.target.value)}>
          <option value="all">All Roasts</option>
          {roastLevels.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={selectedProcess} onChange={e => setSelectedProcess(e.target.value)}>
          <option value="all">All Processes</option>
          {process.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={selectedTastingNote} onChange={e => setSelectedTastingNote(e.target.value)}>
          {tastingNoteOptions.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <label>
          <input type="checkbox" checked={showOutOfStock} onChange={e => setShowOutOfStock(e.target.checked)} /> Show Out of Stock
        </label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="roaster">Roaster</option>
        </select>
      </div>
      <div>
        {pagedBeans.length === 0 ? (
          <div>No coffee beans found. Try adjusting your filters.</div>
        ) : (
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {pagedBeans.map(bean => (
              <li key={bean.id} style={{ border: '1px solid #eee', borderRadius: 10, padding: 18, width: 260 }}>
                <img src={bean.image} alt={bean.name} style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 6 }} />
                <div><b>{bean.name}</b></div>
                <div>{bean.roaster}</div>
                <div>₹{bean.price} / {bean.weight}</div>
                <div>{bean.inStock ? 'In Stock' : 'Out of Stock'}</div>
                <a href={bean.url} target="_blank" rel="noopener noreferrer">Buy Now</a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ marginTop: 20 }}>
        {renderPagination().map((pg, idx) =>
          typeof pg === 'number' ? (
            <button
              key={pg}
              onClick={() => setPage(pg)}
              style={{
                background: pg === page ? '#d4af37' : '#fff',
                color: pg === page ? '#fff' : '#222',
                margin: 2, padding: '5px 12px', borderRadius: 6, border: '1px solid #d4af37'
              }}
              disabled={pg === page}
            >{pg}</button>
          ) : (
            <span key={`ellipsis-${idx}`} style={{ margin: '0 5px', color: '#c7a142', fontWeight: 700 }}>…</span>
          )
        )}
      </div>
      <footer style={{ marginTop: 48, textAlign: 'center', color: '#999', fontSize: 15 }}>
        Last updated: {lastUpdate && new Date(lastUpdate).toLocaleString()}
      </footer>
    </div>
  );
}

export default App;

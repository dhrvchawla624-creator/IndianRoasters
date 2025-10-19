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

  useEffect(() => {
    fetchCoffee();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLanding(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    selectedRoaster,
    selectedOrigin,
    selectedRoast,
    selectedProcess,
    selectedTastingNote,
    showOutOfStock,
    sortBy,
    priceRange,
    beans
  ]);

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
      const matchesSearch = searchWords.length === 0
        ? true
        : searchWords.every(word => beanText.includes(word));
      const matchesRoaster = selectedRoaster === 'all' || bean.roaster === selectedRoaster;
      const matchesOrigin = selectedOrigin === 'all' || bean.origin === selectedOrigin;
      const matchesRoast = selectedRoast === 'all' || bean.roastLevel === selectedRoast;
      const matchesProcess = selectedProcess === 'all' || bean.process === selectedProcess;
      const matchesTasting =
        selectedTastingNote === 'all' ||
        (bean.tastingNotes &&
          bean.tastingNotes.map(n => n.toLowerCase()).includes(selectedTastingNote.toLowerCase())
        );
      const matchesStock = showOutOfStock || bean.inStock;
      const matchesPrice = bean.price >= priceRange[0] && bean.price <= priceRange[1];

      return matchesSearch && matchesRoaster && matchesOrigin &&
        matchesRoast && matchesProcess && matchesTasting && matchesStock && matchesPrice;
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
  }, [
    beans, searchTerm, selectedRoaster, selectedOrigin, selectedRoast,
    selectedProcess, selectedTastingNote, showOutOfStock, sortBy, priceRange
  ]);

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
      if (page === pageCount) {
        pages.push(page - 2);
        pages.push(page - 1);
      } else if (page === pageCount - 1) {
        pages.push(page - 1);
        pages.push(page);
      } else if (page > 2 && page < pageCount - 1) {
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
      } else if (page === 2) {
        pages.push(2);
        pages.push(3);
      } else if (page === 1) {
        pages.push(2);
        pages.push(3);
      }
      if (page < pageCount - 2) pages.push('...');
      pages.push(pageCount);
    }
    return pages;
  }

  if (showLanding && loading) {
    return (
      <div className="landing">
        <div className="landing-content">
          <div className="coffee-animation">
            <div className="coffee-cup">☕</div>
            <div className="steam">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <h1 className="landing-title">Homegrounds</h1>
          <p className="landing-subtitle">Discover India's Finest Specialty Coffee</p>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-page">
        <div className="error-icon">☕</div>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={fetchCoffee} className="retry-btn">
          <span>🔄</span> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-badge">☕ Premium Specialty Coffee</div>
          <h1 className="hero-title">
            Your Ultimate Indian
            <br />
            <span className="gradient-text">Coffee Roasters Library</span>
          </h1>
          <p className="hero-description">
            Explore {beans.length}+ handpicked specialty beans from {roasters.length} top roasters across India
          </p>
          <div className="hero-stats" style={{ display: 'flex', gap: 32, marginTop: 14 }}>
            <div className="stat">
              <div className="stat-number">{roasters.length}+</div>
              <div className="stat-label">Roasters</div>
            </div>
            <div className="stat">
              <div className="stat-number">{beans.length}+</div>
              <div className="stat-label">Coffee Beans</div>
            </div>
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Specialty Grade</div>
            </div>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="floating-bean bean-1">☕</div>
          <div className="floating-bean bean-2">☕</div>
          <div className="floating-bean bean-3">☕</div>
        </div>
      </header>
      {/* Filters Section */}
      <div className="filters-section">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '28px',
          marginBottom: '18px'
        }}>
          {/* Price Slider */}
          <div style={{ minWidth: 250, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 90 }}>
            <label style={{ fontSize: 19, fontWeight: 500, marginBottom: 4, display:'block' }}>Price Range (₹)</label>
            <div style={{ width: '100%', padding: '0', background: 'none', boxSizing: 'border-box' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '5px',
                  fontWeight: 500,
                  fontSize: 16,
                  color: '#AB6E36',
                }}
              >
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
              <Slider
                range
                min={0}
                max={10000}
                value={priceRange}
                onChange={(val) => setPriceRange(val as [number, number])}
                step={50}
                marks={{}}
                railStyle={{ backgroundColor: '#F3EDE6', height: 10, borderRadius: 7 }}
                trackStyle={[
                  { backgroundColor: '#D87330', height: 10, borderRadius: 7 },
                ]}
                handleStyle={[
                  {
                    borderColor: '#D87330',
                    backgroundColor: '#FFF',
                    boxShadow: '0 2px 8px #D8733020',
                    width: 26,
                    height: 26,
                    marginTop: -8,
                  },
                  {
                    borderColor: '#D87330',
                    backgroundColor: '#FFF',
                    boxShadow: '0 2px 8px #D8733020',
                    width: 26,
                    height: 26,
                    marginTop: -8,
                  },
                ]}
              />
            </div>
          </div>
          {/* Search bar perfectly vertically centered with the slider */}
          <div style={{
            minWidth: 320,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            height: 50
          }}>
            <div className="search-bar" style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '30px',
              boxShadow: '0 2px 12px #E8E2DD50',
              borderRadius: '9px',
              background: '#fff',
              border: '1.5px solid #efe7dd'
            }}>
              <span className="search-icon" style={{marginLeft:14, marginRight:4, color:'#AB6E36'}}>🔍</span>
              <input
                type="text"
                placeholder="Search for coffee beans, roasters, origins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                style={{
                  color: '#111',
                  background: 'inherit',
                  width: '100%',
                  maxWidth: '600px',
                  height: '40px',
                  fontSize: '18px',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '9px'
                }}
              />
            </div>
          </div>
        </div>
        {/* Filters as restored horizontally */}
        <div className="filter-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginBottom: 12 }}>
          {/* Roaster */}
          <div className="filter-group">
            <label>🏪 Roaster</label>
            <select value={selectedRoaster} onChange={e => setSelectedRoaster(e.target.value)}>
              <option value="all">All Roasters</option>
              {roasters.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          {/* Origin */}
          <div className="filter-group">
            <label>🌍 Origin</label>
            <select value={selectedOrigin} onChange={e => setSelectedOrigin(e.target.value)}>
              <option value="all">All Origins</option>
              {origins.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          {/* Roast Level */}
          <div className="filter-group">
            <label>🔥 Roast</label>
            <select value={selectedRoast} onChange={e => setSelectedRoast(e.target.value)}>
              <option value="all">All Roasts</option>
              {roastLevels.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          {/* Process */}
          <div className="filter-group">
            <label>⚙️ Process</label>
            <select value={selectedProcess} onChange={e => setSelectedProcess(e.target.value)}>
              <option value="all">All Processes</option>
              {[
                "washed",
                "natural",
                "honey",
                "anaerobic",
                "fermentation",
                "pineapple fermentation",
                "cherry fermentation",
                "double fermentation",
                "intenso fermentation",
                "yeast fermentation",
                "yeast anaerobic naturals",
                "bio reactor thermal shock naturals",
                "thermal shock",
                "thermal shock naturals",
                "cultured naturals",
                "wine yeast fermented anaerobic naturals",
                "CM natural",
                "rum barrel aged",
                "koji fermented naturals",
                "coferment naturals"
              ].map(p => (
                <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
              ))}
              {/* You may also merge ...processes.map(p => ...) if you wish */}
            </select>
          </div>
          {/* Tasting Notes */}
          <div className="filter-group">
            <label>🍫 Tasting Notes</label>
            <select value={selectedTastingNote} onChange={e => setSelectedTastingNote(e.target.value)}>
              {tastingNoteOptions.map(n => (
                <option key={n} value={n}>{n.charAt(0).toUpperCase() + n.slice(1)}</option>
              ))}
            </select>
          </div>
          {/* Sort By */}
          <div className="filter-group">
            <label>📊 Sort By</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="roaster">Roaster</option>
            </select>
          </div>
        </div>
        {/* Out of stock toggle */}
        <div style={{ marginTop: 4, marginBottom: 8 }}>
          <label style={{ fontWeight: 500, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={showOutOfStock}
              onChange={e => setShowOutOfStock(e.target.checked)}
              style={{ width: 18, height: 18 }}
            /> Show Out of Stock
          </label>
        </div>
      </div>
      {/* Coffee beans grid */}
      <div className="coffee-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px',
        marginTop: '32px',
        justifyItems: 'center',
      }}>
        {pagedBeans.map(bean => (
          <div key={bean.id} className={`coffee-card ${!bean.inStock ? 'out-of-stock' : ''}`}>
            <div className="card-image-wrapper">
              {bean.image && (
                <img src={bean.image} alt={bean.name} className="card-image" loading="lazy" />
              )}
              {!bean.inStock && <div className="stock-overlay">Out of Stock</div>}
              <div className="card-badge">{bean.weight}</div>
            </div>
            <div className="card-content">
              <div className="card-roaster">{bean.roaster}</div>
              <h3 className="card-title">{bean.name}</h3>
              <div className="card-tags">
                {bean.origin && <span className="tag">📍 {bean.origin}</span>}
                {bean.roastLevel && <span className="tag">🔥 {bean.roastLevel}</span>}
                {bean.process && <span className="tag">⚙️ {bean.process}</span>}
                {bean.tastingNotes && bean.tastingNotes.length > 0 && (
                  <span className="tag">🍫 {bean.tastingNotes.join(', ')}</span>
                )}
              </div>
              <div className="card-footer">
                <div className="card-price">
                  <span className="price-amount">₹{bean.price.toFixed(0)}</span>
                  <span className="price-label">/{bean.weight}</span>
                </div>
                <a
                  href={bean.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-button"
                >
                  Buy Now →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="pagination" style={{ display: 'flex', justifyContent: 'center', margin: '40px 0 10px 0', gap: 16, flexWrap: 'wrap' }}>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="pagination-btn"
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            border: '2px solid #d4af37',
            background: page === 1 ? '#f8f7f1' : '#fffbe8',
            color: page === 1 ? '#aaa' : '#222',
            fontWeight: 600,
            cursor: page === 1 ? 'not-allowed' : 'pointer',
            transition: 'all .12s'
          }}
        >
          Previous
        </button>
        <div style={{ display: 'flex', gap: 3, alignItems: 'center', fontSize: 16 }}>
          {renderPagination().map((pg, idx) => typeof pg === 'number' ? (
            <button
              key={pg}
              onClick={() => setPage(pg)}
              className="pagination-btn"
              style={{
                background: pg === page ? '#d4af37' : '#fffbe8',
                color: pg === page ? '#fff' : '#111',
                fontWeight: pg === page ? 700 : 600,
                border: pg === page ? '2px solid #d4af37' : '2px solid #fffbe8',
                padding: '4px 11px',
                borderRadius: 7,
                cursor: pg === page ? 'default' : 'pointer'
              }}
              disabled={pg === page}
            >{pg}</button>
          ) : (
            <span key={`ellipsis-${idx}`} style={{padding: '0 4px', color: '#d4af37', fontWeight: 'bolder', userSelect:'none'}}>…</span>
          ))}
        </div>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, pageCount))}
          disabled={page === pageCount || pageCount === 0}
          className="pagination-btn"
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            border: '2px solid #d4af37',
            background: page === pageCount || pageCount === 0 ? '#f8f7f1' : '#fffbe8',
            color: page === pageCount || pageCount === 0 ? '#aaa' : '#222',
            fontWeight: 600,
            cursor: page === pageCount || pageCount === 0 ? 'not-allowed' : 'pointer',
            transition: 'all .12s'
          }}
        >
          Next
        </button>
      </div>
      {filteredBeans.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">☕</div>
          <h3>No coffee beans found</h3>
          <p>Try adjusting your filters or search terms</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRoaster('all');
              setSelectedOrigin('all');
              setSelectedRoast('all');
              setSelectedProcess('all');
              setSelectedTastingNote('all');
              setPriceRange([0, 10000]);
            }}
            className="reset-btn"
          >
            Reset Filters
          </button>
        </div>
      )}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>☕ Indian Homebrews</h3>
            <p>Your ultimate specialty coffee library</p>
          </div>
          <div className="footer-info">
            <p>Discover beans from India's finest roasters</p>
            <p className="footer-update">Last updated: {new Date(lastUpdate).toLocaleString()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

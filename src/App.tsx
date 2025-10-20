import { useState, useEffect, useMemo } from 'react';
import type { CoffeeBean, SortOption } from './types/coffee';
import LandingPage from './components/LandingPage';
import Hero from './components/Hero';
import FilterSection from './components/FilterSection';
import CoffeeGrid from './components/CoffeeGrid';
import Footer from './components/Footer';
import './App.css';

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
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [page, setPage] = useState(1);

  const roasters = useMemo(() => Array.from(new Set(beans.map(b => b.roaster))).sort(), [beans]);
  const origins = useMemo(() => Array.from(new Set(beans.map(b => b.origin).filter((o): o is string => Boolean(o)))).sort(), [beans]);
  const roastLevels = useMemo(() => Array.from(new Set(beans.map(b => b.roastLevel).filter((r): r is string => Boolean(r)))).sort(), [beans]);
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

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRoaster('all');
    setSelectedOrigin('all');
    setSelectedRoast('all');
    setSelectedProcess('all');
    setSelectedTastingNote('all');
    setPriceRange([0, 10000]);
  };

  // Landing page
  if (showLanding && loading) {
    return <LandingPage show={true} />;
  }

  // Error page
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
      <Hero totalBeans={beans.length} totalRoasters={roasters.length} />
      
      <FilterSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRoaster={selectedRoaster}
        setSelectedRoaster={setSelectedRoaster}
        selectedOrigin={selectedOrigin}
        setSelectedOrigin={setSelectedOrigin}
        selectedRoast={selectedRoast}
        setSelectedRoast={setSelectedRoast}
        selectedProcess={selectedProcess}
        setSelectedProcess={setSelectedProcess}
        selectedTastingNote={selectedTastingNote}
        setSelectedTastingNote={setSelectedTastingNote}
        showOutOfStock={showOutOfStock}
        setShowOutOfStock={setShowOutOfStock}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        roasters={roasters}
        origins={origins}
        roastLevels={roastLevels}
        tastingNoteOptions={tastingNoteOptions}
      />

      <CoffeeGrid
        pagedBeans={pagedBeans}
        filteredBeansCount={filteredBeans.length}
        page={page}
        pageCount={pageCount}
        setPage={setPage}
        onResetFilters={handleResetFilters}
      />

      <Footer lastUpdate={lastUpdate} />
    </div>
  );
}

export default App;


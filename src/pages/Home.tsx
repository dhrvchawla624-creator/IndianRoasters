import { useState, useEffect, useMemo } from 'react';
import type { CoffeeBean, SortOption } from '../types/coffee';
import Hero from '../components/Hero';
import FilterSection from '../components/FilterSection';
import CoffeeGrid from '../components/CoffeeGrid';

function getAllTastingNotes(beans: CoffeeBean[]): string[] {
  const allNotes = beans.flatMap(b => b.tastingNotes ?? []);
  return Array.from(new Set(allNotes.map(note => note.trim()))).sort();
}

// Map various process names to standard categories
function normalizeProcessToCategory(process: string): string {
  if (!process) return '';
  
  const normalized = process.toLowerCase().trim();
  
  // Map variations to your standard categories
  if (
    normalized.includes('wash') || 
    normalized.includes('wet') ||
    normalized.includes('lavado') ||
    normalized.includes('fully washed')
  ) {
    return 'washed';
  }
  
  if (
    normalized.includes('natural') || 
    normalized.includes('dry') ||
    normalized.includes('sun') ||
    normalized.includes('naturals')
  ) {
    return 'natural';
  }
  
  if (
    normalized.includes('honey') ||
    normalized.includes('pulped natural') ||
    normalized.includes('semi')
  ) {
    return 'honey';
  }
  
  if (
    normalized.includes('anaerobic') ||
    normalized.includes('anerobic') // handle typo
  ) {
    return 'anaerobic';
  }
  
  if (
    normalized.includes('ferment') ||
    normalized.includes('fermentation')
  ) {
    return 'fermentation';
  }
  
  // Specific fermentation types
  if (normalized.includes('pineapple')) return 'pineapple fermentation';
  if (normalized.includes('cherry ferment')) return 'cherry fermentation';
  if (normalized.includes('double ferment')) return 'double fermentation';
  if (normalized.includes('intenso ferment')) return 'intenso fermentation';
  if (normalized.includes('yeast ferment') || normalized.includes('yeast anaerobic')) return 'yeast fermentation';
  if (normalized.includes('bio reactor') || normalized.includes('thermal shock')) return 'thermal shock';
  if (normalized.includes('cultured')) return 'cultured naturals';
  if (normalized.includes('wine yeast')) return 'wine yeast fermented anaerobic naturals';
  if (normalized.includes('cm natural')) return 'CM natural';
  if (normalized.includes('rum barrel')) return 'rum barrel aged';
  if (normalized.includes('koji')) return 'koji fermented naturals';
  if (normalized.includes('coferment')) return 'coferment naturals';
  
  // Return empty if no match (won't be filtered)
  return '';
}

// Check if bean matches the selected process category
function matchesProcessFilter(bean: CoffeeBean, selectedProcess: string): boolean {
  if (selectedProcess === 'all') return true;
  if (!bean.process) return false;
  
  // Split bean's process field by common separators
  const beanProcesses = bean.process
    .split(/[,/|&+]/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  // Check if any of the bean's processes match the selected category
  return beanProcesses.some(p => {
    const category = normalizeProcessToCategory(p);
    return category === selectedProcess.toLowerCase();
  });
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

function Home() {
  const [beans, setBeans] = useState<CoffeeBean[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      
      // FIXED: Use the new process matching function with category mapping
      const matchesProcess = matchesProcessFilter(bean, selectedProcess);
      
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

  // Error page
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-5">
        <div className="text-8xl mb-5 animate-shake">☕</div>
        <h2 className="text-4xl text-coffee-dark dark:text-dark-text mb-2.5">Oops! Something went wrong</h2>
        <p className="text-lg text-coffee-light dark:text-dark-text-secondary mb-8">{error}</p>
        <button 
          onClick={fetchCoffee} 
          className="flex items-center gap-2.5 px-8 py-3.5 bg-coffee-medium dark:bg-dark-accent text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 shadow-md hover:bg-coffee-brown dark:hover:bg-dark-accent/80 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span>🔄</span> Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-5">
        <div className="text-8xl mb-5 animate-bounce-custom">☕</div>
        <h2 className="text-2xl text-coffee-dark dark:text-dark-text">Loading coffee beans...</h2>
      </div>
    );
  }

  return (
    <>
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
        processOptions={[]}
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
    </>
  );
}

export default Home;
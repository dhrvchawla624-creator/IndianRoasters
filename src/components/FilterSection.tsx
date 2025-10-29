import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import type { SortOption } from '../types/coffee';

interface FilterSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedRoaster: string;
  setSelectedRoaster: (value: string) => void;
  selectedOrigin: string;
  setSelectedOrigin: (value: string) => void;
  selectedRoast: string;
  setSelectedRoast: (value: string) => void;
  selectedProcess: string;
  setSelectedProcess: (value: string) => void;
  selectedTastingNote: string;
  setSelectedTastingNote: (value: string) => void;
  showOutOfStock: boolean;
  setShowOutOfStock: (value: boolean) => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  roasters: string[];
  origins: string[];
  roastLevels: string[];
  processOptions: string[];
  tastingNoteOptions: string[];
}

// Simplified consolidated process categories
const processOptions = [
  "washed",
  "natural", 
  "honey",
  "anaerobic",
  "fermentation",  // ALL fermentation types go here
  "barrel aged",   // ALL barrel aged types go here
  "experimental"
];

function FilterSection(props: FilterSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Search Bar - Full Width */}
      <div className="mb-8">
        <div className="relative max-w-3xl mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AB6E36] dark:text-dark-accent text-xl">🔍</span>
          <input
            type="text"
            placeholder="Search for coffee beans, roasters, origins..."
            value={props.searchTerm}
            onChange={(e) => props.setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-transparent bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text placeholder-coffee-light dark:placeholder-dark-text-secondary focus:outline-none focus:border-coffee-medium dark:focus:border-dark-accent focus:shadow-lg transition-all duration-300 shadow-md text-lg"
          />
        </div>
      </div>

      {/* Price Slider - Full Width */}
      <div className="mb-8">
        <div className="max-w-3xl mx-auto">
          <label className="block text-lg font-medium text-coffee-dark dark:text-dark-text mb-2 text-center">Price Range (₹)</label>
          <div className="flex justify-between mb-1.5 font-medium text-base text-[#AB6E36] dark:text-dark-accent">
            <span>₹{props.priceRange[0].toLocaleString()}</span>
            <span>₹{props.priceRange[1].toLocaleString()}</span>
          </div>
          <Slider
            range
            min={0}
            max={10000}
            value={props.priceRange}
            onChange={(val) => props.setPriceRange(val as [number, number])}
            step={50}
            styles={{
              rail: { backgroundColor: '#F3EDE6', height: 10, borderRadius: 7 },
              track: { backgroundColor: '#D87330', height: 10, borderRadius: 7 },
              handle: { borderColor: '#D87330', backgroundColor: '#FFF', boxShadow: '0 2px 8px rgba(216, 115, 48, 0.13)', width: 26, height: 26, marginTop: -8 }
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 mb-3">
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
            🏪 Roaster
          </label>
          <select 
            value={props.selectedRoaster} 
            onChange={e => props.setSelectedRoaster(e.target.value)}
            className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light dark:hover:border-dark-accent focus:outline-none focus:border-coffee-medium dark:focus:border-dark-accent focus:shadow-lg"
          >
            <option value="all">All Roasters</option>
            {props.roasters.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
            🌍 Origin
          </label>
          <select 
            value={props.selectedOrigin} 
            onChange={e => props.setSelectedOrigin(e.target.value)}
            className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light dark:hover:border-dark-accent focus:outline-none focus:border-coffee-medium dark:focus:border-dark-accent focus:shadow-lg"
          >
            <option value="all">All Origins</option>
            {props.origins.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
            🔥 Roast
          </label>
          <select 
            value={props.selectedRoast} 
            onChange={e => props.setSelectedRoast(e.target.value)}
            className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light dark:hover:border-dark-accent focus:outline-none focus:border-coffee-medium dark:focus:border-dark-accent focus:shadow-lg"
          >
            <option value="all">All Roasts</option>
            {props.roastLevels.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
            ⚙️ Process
          </label>
          <select 
            value={props.selectedProcess} 
            onChange={e => props.setSelectedProcess(e.target.value)}
            className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light dark:hover:border-dark-accent focus:outline-none focus:border-coffee-medium dark:focus:border-dark-accent focus:shadow-lg"
          >
            <option value="all">All Processes</option>
            {processOptions.map(p => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>
        
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
            🍫 Tasting Notes
          </label>
          <select 
            value={props.selectedTastingNote} 
            onChange={e => props.setSelectedTastingNote(e.target.value)}
            className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light dark:hover:border-dark-accent focus:outline-none focus:border-coffee-medium dark:focus:border-dark-accent focus:shadow-lg"
          >
            {props.tastingNoteOptions.map(n => (
              <option key={n} value={n}>{n.charAt(0).toUpperCase() + n.slice(1)}</option>
            ))}
          </select>
        </div>
        
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
            📊 Sort By
          </label>
          <select 
            value={props.sortBy} 
            onChange={e => props.setSortBy(e.target.value as SortOption)}
            className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light dark:hover:border-dark-accent focus:outline-none focus:border-coffee-medium dark:focus:border-dark-accent focus:shadow-lg"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="roaster">Roaster</option>
          </select>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <label className="font-medium text-base flex items-center gap-2 cursor-pointer dark:text-dark-text">
          <input
            type="checkbox"
            checked={props.showOutOfStock}
            onChange={e => props.setShowOutOfStock(e.target.checked)}
            className="w-[18px] h-[18px] cursor-pointer accent-coffee-medium dark:accent-dark-accent"
          /> 
          Show Out of Stock
        </label>
      </div>
    </div>
  );
}

export default FilterSection;
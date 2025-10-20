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
  tastingNoteOptions: string[];
}

const processOptions = [
  "washed", "natural", "honey", "anaerobic", "fermentation",
  "pineapple fermentation", "cherry fermentation", "double fermentation",
  "intenso fermentation", "yeast fermentation", "yeast anaerobic naturals",
  "bio reactor thermal shock naturals", "thermal shock", "thermal shock naturals",
  "cultured naturals", "wine yeast fermented anaerobic naturals", "CM natural",
  "rum barrel aged", "koji fermented naturals", "coferment naturals"
];

function FilterSection(props: FilterSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="flex flex-wrap items-center gap-7 mb-5">
        <div className="min-w-[250px] flex-1 flex flex-col justify-center h-[90px]">
          <label className="text-lg font-medium mb-1 block">Price Range (₹)</label>
          <div className="w-full">
            <div className="flex justify-between mb-1.5 font-medium text-base text-[#AB6E36]">
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
              marks={{}}
              styles={{
                rail: { backgroundColor: '#F3EDE6', height: 10, borderRadius: 7 },
                track: { backgroundColor: '#D87330', height: 10, borderRadius: 7 },
                handle: {
                  borderColor: '#D87330',
                  backgroundColor: '#FFF',
                  boxShadow: '0 2px 8px rgba(216, 115, 48, 0.13)',
                  width: 26,
                  height: 26,
                  marginTop: -8,
                }
              }}
            />
          </div>
        </div>
        
        <div className="min-w-[320px] flex-1 flex items-center h-[50px]">
          <div className="search-container flex items-center w-full h-[50px] shadow-md rounded-lg bg-white border border-[#efe7dd] px-4 transition-all duration-300">
            <span className="text-[#AB6E36] text-xl mr-1">🔍</span>
            <input
              type="text"
              placeholder="Search for coffee beans, roasters, origins..."
              value={props.searchTerm}
              onChange={(e) => props.setSearchTerm(e.target.value)}
              className="text-[#111] bg-transparent w-full h-10 text-lg border-none outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-3">
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown mb-2 uppercase tracking-wide">
            🏪 Roaster
          </label>
          <select 
            value={props.selectedRoaster} 
            onChange={e => props.setSelectedRoaster(e.target.value)}
            className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white text-coffee-dark cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light focus:outline-none focus:border-coffee-medium focus:shadow-lg"
          >
            <option value="all">All Roasters</option>
            {props.roasters.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown mb-2 uppercase tracking-wide">
            🌍 Origin
          </label>
          <select 
            value={props.selectedOrigin} 
            onChange={e => props.setSelectedOrigin(e.target.value)}
            className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white text-coffee-dark cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light focus:outline-none focus:border-coffee-medium focus:shadow-lg"
          >
            <option value="all">All Origins</option>
            {props.origins.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown mb-2 uppercase tracking-wide">
            🔥 Roast
          </label>
          <select 
            value={props.selectedRoast} 
            onChange={e => props.setSelectedRoast(e.target.value)}
            className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white text-coffee-dark cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light focus:outline-none focus:border-coffee-medium focus:shadow-lg"
          >
            <option value="all">All Roasts</option>
            {props.roastLevels.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown mb-2 uppercase tracking-wide">
            ⚙️ Process
          </label>
          <select 
            value={props.selectedProcess} 
            onChange={e => props.setSelectedProcess(e.target.value)}
            className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white text-coffee-dark cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light focus:outline-none focus:border-coffee-medium focus:shadow-lg"
          >
            <option value="all">All Processes</option>
            {processOptions.map(p => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>
        
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown mb-2 uppercase tracking-wide">
            🍫 Tasting Notes
          </label>
          <select 
            value={props.selectedTastingNote} 
            onChange={e => props.setSelectedTastingNote(e.target.value)}
            className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white text-coffee-dark cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light focus:outline-none focus:border-coffee-medium focus:shadow-lg"
          >
            {props.tastingNoteOptions.map(n => (
              <option key={n} value={n}>{n.charAt(0).toUpperCase() + n.slice(1)}</option>
            ))}
          </select>
        </div>
        
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown mb-2 uppercase tracking-wide">
            📊 Sort By
          </label>
          <select 
            value={props.sortBy} 
            onChange={e => props.setSortBy(e.target.value as SortOption)}
            className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white text-coffee-dark cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light focus:outline-none focus:border-coffee-medium focus:shadow-lg"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="roaster">Roaster</option>
          </select>
        </div>
      </div>
      
      <div className="mt-1 mb-2">
        <label className="font-medium text-base flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={props.showOutOfStock}
            onChange={e => props.setShowOutOfStock(e.target.checked)}
            className="w-[18px] h-[18px] cursor-pointer accent-coffee-medium"
          /> 
          Show Out of Stock
        </label>
      </div>
    </div>
  );
}

export default FilterSection;
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import type { SortOption } from '../types/coffee';
import '../App.css';

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

function FilterSection({
  searchTerm,
  setSearchTerm,
  selectedRoaster,
  setSelectedRoaster,
  selectedOrigin,
  setSelectedOrigin,
  selectedRoast,
  setSelectedRoast,
  selectedProcess,
  setSelectedProcess,
  selectedTastingNote,
  setSelectedTastingNote,
  showOutOfStock,
  setShowOutOfStock,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  roasters,
  origins,
  roastLevels,
  tastingNoteOptions,
}: FilterSectionProps) {
  return (
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
       {/* Search bar */}
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

      {/* Filters */}
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
          <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}>
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
  );
}

export default FilterSection;

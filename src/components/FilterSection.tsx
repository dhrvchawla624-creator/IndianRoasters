import { useState, useRef, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import type { SortOption } from '../types/coffee.js';

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
  selectedTastingNote: string[];
  setSelectedTastingNote: (value: string[]) => void;
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

interface SelectDropdownProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  allLabel: string;
}

const SelectDropdown = ({ options, selectedValue, onSelect, allLabel }: SelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light dark:hover:border-dark-accent focus:outline-none focus:border-coffee-medium dark:focus:border-dark-accent focus:shadow-lg flex justify-between items-center">
        <span>{selectedValue === 'all' ? allLabel : selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-dark-surface rounded-xl shadow-lg p-2 h-48 overflow-y-auto border-2 border-coffee-light dark:border-dark-border z-10 animate-slideDown">
          <button onClick={() => handleSelect('all')} className="w-full text-left p-2.5 rounded-lg transition-colors duration-200 hover:bg-cream-dark dark:hover:bg-dark-border text-sm font-medium text-coffee-dark dark:text-dark-text">{allLabel}</button>
          {options.map(option => (
            <button key={option} onClick={() => handleSelect(option)} className="w-full text-left p-2.5 rounded-lg transition-colors duration-200 hover:bg-cream-dark dark:hover:bg-dark-border text-sm font-medium text-coffee-dark dark:text-dark-text">
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

function FilterSection(props: FilterSectionProps) {
  const [isTastingNotesOpen, setIsTastingNotesOpen] = useState(false);
  const tastingNotesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tastingNotesRef.current && !tastingNotesRef.current.contains(event.target as Node)) {
        setIsTastingNotesOpen(false);
      }
    }
    if (isTastingNotesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isTastingNotesOpen]);

  // Defensive defaults, fallback for slider
  const priceLow = Array.isArray(props.priceRange) && typeof props.priceRange[0] === 'number'
    ? props.priceRange[0]
    : 0;
  const priceHigh = Array.isArray(props.priceRange) && typeof props.priceRange[1] === 'number'
    ? props.priceRange[1]
    : 10000;

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Search Bar - Full Width */}
      <div className="mb-8">
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-coffee-light dark:text-dark-text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for coffee beans, roasters, origins ..."
            value={props.searchTerm}
            onChange={(e) => props.setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-4 rounded-full border-2 border-transparent bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text placeholder-coffee-light dark:placeholder-dark-text-secondary focus:outline-none focus:border-coffee-medium dark:focus:border-dark-accent focus:shadow-xl transition-all duration-300 shadow-lg text-lg"
          />
        </div>
      </div>
      {/* Price Slider - Full Width */}
      <div className="mb-8">
        <div className="max-w-3xl mx-auto">
          <label className="block text-lg font-medium text-coffee-dark dark:text-dark-text mb-2 text-center">Price Range (₹)</label>
          <div className="flex justify-between mb-1.5 font-medium text-base text-[#AB6E36] dark:text-dark-accent">
            <span>₹{priceLow.toLocaleString()}</span>
            <span>₹{priceHigh.toLocaleString()}</span>
          </div>
<Slider
  range
  min={0}
  max={10000}
  value={[priceLow, priceHigh] as [number, number]} // safest
  onChange={(val: number | number[]) => props.setPriceRange(val as [number, number])}
  step={50}
  railStyle={{ backgroundColor: '#F3EDE6', height: 10, borderRadius: 7 }}
  trackStyle={[{ backgroundColor: '#D87330', height: 10, borderRadius: 7 }] as any}
  handleStyle={[
    { borderColor: '#D87330', backgroundColor: '#FFF', boxShadow: '0 2px 8px rgba(216, 115, 48, 0.13)', width: 26, height: 26, marginTop: -8 },
    { borderColor: '#D87330', backgroundColor: '#FFF', boxShadow: '0 2px 8px rgba(216, 115, 48, 0.13)', width: 26, height: 26, marginTop: -8 }
  ] as any}
/>

        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 mb-3">
        {/* ...Dropdowns unchanged... */}
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
            🏪 Roaster
          </label>
          <SelectDropdown
            options={props.roasters}
            selectedValue={props.selectedRoaster}
            onSelect={props.setSelectedRoaster}
            allLabel="All Roasters"
          />
        </div>
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
            🌍 Origin
          </label>
          <SelectDropdown
            options={props.origins}
            selectedValue={props.selectedOrigin}
            onSelect={props.setSelectedOrigin}
            allLabel="All Origins"
          />
        </div>
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
            🔥 Roast
          </label>
          <SelectDropdown
            options={props.roastLevels}
            selectedValue={props.selectedRoast}
            onSelect={props.setSelectedRoast}
            allLabel="All Roasts"
          />
        </div>
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
            ⚙️ Process
          </label>
          <SelectDropdown
            options={props.processOptions}
            selectedValue={props.selectedProcess}
            onSelect={props.setSelectedProcess}
            allLabel="All Processes"
          />
        </div>
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
            🍫 Tasting Notes
          </label>
          <div className="relative" ref={tastingNotesRef}>
            <button
              onClick={() => setIsTastingNotesOpen(!isTastingNotesOpen)}
              className="w-full px-4 py-3 border-2 border-transparent rounded-xl text-base bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text cursor-pointer transition-all duration-300 shadow-md hover:border-coffee-light dark:hover:border-dark-accent focus:outline-none focus:border-coffee-medium dark:focus:border-dark-accent focus:shadow-lg flex justify-between items-center"
            >
              <span>
                {props.selectedTastingNote.length > 0
                  ? `${props.selectedTastingNote.length} Note${props.selectedTastingNote.length > 1 ? 's' : ''} Selected`
                  : 'All Notes'}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isTastingNotesOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            {isTastingNotesOpen && (
              <div className="absolute top-full mt-2 w-full bg-white dark:bg-dark-surface rounded-xl shadow-lg p-2 h-48 overflow-y-auto border-2 border-coffee-light dark:border-dark-border z-10 animate-slideDown">
                {props.tastingNoteOptions.map(note => {
                  const isSelected = props.selectedTastingNote.includes(note);
                  return (
                    <button
                      key={note}
                      onClick={() => {
                        const newSelection = isSelected
                          ? props.selectedTastingNote.filter(n => n !== note)
                          : [...props.selectedTastingNote, note];
                        props.setSelectedTastingNote(newSelection);
                      }}
                      className="w-full flex items-center justify-between text-left p-2.5 rounded-lg transition-colors duration-200 hover:bg-cream-dark dark:hover:bg-dark-border"
                    >
                      <span className="text-sm font-medium text-coffee-dark dark:text-dark-text">{note.charAt(0).toUpperCase() + note.slice(1)}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isSelected
                          ? 'bg-coffee-medium border-coffee-medium dark:bg-dark-accent dark:border-dark-accent'
                          : 'bg-transparent border-gray-300 dark:border-gray-600'
                      }`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-coffee-brown dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
            📊 Sort By
          </label>
          <SelectDropdown
            options={['newest', 'name', 'price-low', 'price-high', 'roaster']}
            selectedValue={props.sortBy}
            onSelect={(val) => props.setSortBy(val as SortOption)}
            allLabel="Sort By"
          />
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

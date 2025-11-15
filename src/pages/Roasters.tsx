import { useState, useMemo } from 'react';

import PageHero from '../components/PageHero.js';
import LocationCard from '../components/LocationCard.js';
import RoasterCard from '../components/RoastersCard.js';
import { LOCATION_DATA, ROASTERS_DATA } from '../data/roastersData.js';
import type { LocationData, RoasterData } from '../types/roasters.js';

function Roasters() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter roasters based on selected location and search term
  // Filter roasters based on search term. Location filter is applied separately if needed.
  const filteredRoasters = useMemo(() => {
    let filtered = ROASTERS_DATA;

    
    if (selectedLocation) {
      filtered = filtered.filter(roaster => roaster.state === selectedLocation.state);
    }

    if (searchTerm) {
      filtered = filtered.filter(roaster =>
        roaster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roaster.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roaster.specialties?.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    return filtered;
  }, [selectedLocation, searchTerm]);

  // Determine if we should show search results for roasters instead of locations
  const showRoasterSearchResults = searchTerm.length > 0 && !selectedLocation;

  const handleLocationClick = (location: LocationData) => {
    setSelectedLocation(selectedLocation?.state === location.state ? null : location);
  };

  const handleBackToLocations = () => {
    setSelectedLocation(null);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-cream-light dark:bg-dark-bg transition-colors duration-300">
      <PageHero
        title="Indian Coffee Roasters"
        subtitle={`Discover the artisans behind India's finest specialty coffee beans • ${ROASTERS_DATA.length} roasters across ${LOCATION_DATA.length} states`}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 22v-6.17a.9.9 0 0 1 .24-.62L16.07 9h0a.9.9 0 0 1 .62.24L22 15.17V22"/><path d="M14 22v-4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4"/></svg>
        }
      />

      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Search Bar */}
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
              placeholder="Search roasters, cities, or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 rounded-full border-2 border-transparent bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text placeholder-coffee-light dark:placeholder-dark-text-secondary focus:outline-none focus:border-coffee-medium dark:focus:border-dark-accent focus:shadow-xl transition-all duration-300 shadow-lg text-lg"
            />
          </div>
        </div>

        {/* Back Button - Show when location is selected */}
        {selectedLocation && (
          <div className="mb-6">
            <button
              onClick={handleBackToLocations}
              className="flex items-center space-x-2 text-coffee-dark dark:text-dark-text hover:text-coffee-darker dark:hover:text-white transition-colors duration-200"
            >
              <span>←</span>
              <span>Back to all locations</span>
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-dark-surface-elevated/30 p-8 md:p-12 transition-colors duration-300">
          {!selectedLocation && !showRoasterSearchResults ? (
            <>
              {/* Location Selection View */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-4">
                  Choose Your Region
                </h2>
                <p className="text-coffee-medium dark:text-dark-text-secondary">
                  Click on a state to explore roasters in that region
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LOCATION_DATA
                  .filter(location =>
                    !searchTerm ||
                    location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    location.cities.some(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
                  )
                  .map((location) => (
                    <LocationCard
                      key={location.state}
                      location={location}
                      onClick={() => handleLocationClick(location)}
                      isSelected={false}
                    />
                  ))}
              </div>
            </>
          ) : ( // This block now handles both "selected location" and "global search results" views
            <>
              {/* Roasters View Title */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-4">
                  {selectedLocation ? `Coffee Roasters in ${selectedLocation.state}` : 'Search Results'}
                </h2>
                <p className="text-coffee-medium dark:text-dark-text-secondary">
                  {filteredRoasters.length} roaster{filteredRoasters.length !== 1 ? 's' : ''} found
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>

              {filteredRoasters.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold text-coffee-dark dark:text-dark-text mb-2">
                    No roasters found
                  </h3>
                  <p className="text-coffee-medium dark:text-dark-text-secondary">
                    Try adjusting your search term or browse other locations
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRoasters.map((roaster: RoasterData) => (
                    <RoasterCard key={roaster.name} roaster={roaster} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Roasters;

import { useState, useMemo, } from 'react';
import type { FC } from 'react';
import PageHero from '../components/PageHero';

import { LOCATION_DATA, ROASTERS_DATA } from '../data/roasters';
import RoasterCard from '../components/RoastersCard';
import type { RoasterData } from '../types/roasters';

interface LocationData {
  state: string;
  cities: string[];
  roasterCount: number;
}

const LocationCard: FC<{ location: LocationData; onClick: () => void; isSelected: boolean }> = ({ location, onClick, isSelected }) => (
  <div
    onClick={onClick}
    className={`
      bg-white dark:bg-dark-surface rounded-xl p-6 cursor-pointer transition-all duration-300 
      border border-gray-200 dark:border-gray-700/50 hover:shadow-lg hover:border-transparent dark:hover:border-transparent
      ${isSelected ? "ring-2 ring-coffee-dark shadow-lg" : "hover:shadow-md"}
    `}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-coffee-dark dark:text-dark-text mb-1">{location.state}</h3>
        <p className="text-sm text-coffee-medium dark:text-dark-text-secondary mb-2">{location.cities.join(', ')}</p>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-coffee-light/20 dark:bg-dark-bg-secondary text-coffee-dark dark:text-dark-text px-2 py-1 rounded-full">
            {location.roasterCount} roasters
          </span>
        </div>
      </div>
      <div className="text-3xl">📍</div>
    </div>
  </div>
);


function Roasters() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter roasters based on selected location and search term
  // Filter roasters based on search term. Location filter is applied separately if needed.
  const filteredRoasters = useMemo<RoasterData[]>(() => {
    let filtered: RoasterData[] = ROASTERS_DATA;

    
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

  // Dynamically generate location data with correct counts
  const dynamicLocationData = useMemo<LocationData[]>(() => {
    return LOCATION_DATA.map(location => ({
      ...location,
      roasterCount: ROASTERS_DATA.filter(roaster => roaster.state === location.state).length,
    })).sort((a, b) => b.roasterCount - a.roasterCount);
  }, []);

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
        subtitle={`Discover the artisans behind India's finest specialty coffee beans • ${ROASTERS_DATA.length} roasters across ${dynamicLocationData.length} states`}
        icon="🏪"
      />

      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search roasters, cities, or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-coffee-light/30 dark:border-dark-surface-elevated bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text placeholder-coffee-light dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-coffee-dark transition-colors duration-200"
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
                {dynamicLocationData
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
                  ))
                }
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
                  {filteredRoasters.map(roaster => <RoasterCard key={roaster.name} roaster={roaster} />)}
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

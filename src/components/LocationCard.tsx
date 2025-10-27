import React from 'react';
import type{ LocationData } from '../types/roasters';

interface LocationCardProps {
  location: LocationData;
  onClick: () => void;
  isSelected: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-dark-surface rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg
        ${isSelected ? 'ring-2 ring-coffee-dark shadow-lg' : 'hover:shadow-md'}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-coffee-dark dark:text-dark-text mb-1">
            {location.state}
          </h3>
          <p className="text-sm text-coffee-medium dark:text-dark-text-secondary mb-2">
            {location.cities.join(', ')}
          </p>
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
};

export default LocationCard;

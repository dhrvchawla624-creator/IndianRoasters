import React from 'react';
import type { RoasterData } from '../types/roasters.js';



interface RoasterCardProps {
  roaster: RoasterData;
}

const RoasterCard: React.FC<RoasterCardProps> = ({ roaster }) => {
  const handleVisitWebsite = () => {
    window.open(roaster.website, '_blank');
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="grow">
        <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-bold text-coffee-dark dark:text-dark-text mb-1">
            {roaster.name}
          </h4>
          <p className="text-sm text-coffee-medium dark:text-dark-text-secondary mb-2">
            📍 {roaster.city}, {roaster.state}
          </p>
          {roaster.established && (
            <p className="text-xs text-coffee-light dark:text-dark-text-secondary">
              Est. {roaster.established}
            </p>
          )}
        </div>
        <div className="text-2xl">☕</div>
        </div>

        {roaster.description && (
          <p className="text-sm text-coffee-medium dark:text-dark-text-secondary mb-4 line-clamp-2">
            {roaster.description}
          </p>
        )}

        {roaster.specialties && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {roaster.specialties.slice(0, 3).map((specialty, index) => (
                <span
                  key={index}
                  className="text-xs bg-coffee-light/20 dark:bg-dark-bg-secondary text-coffee-dark dark:text-dark-text px-2 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-coffee-light dark:text-dark-text-secondary">
          {roaster.collections.length} collection{roaster.collections.length !== 1 ? 's' : ''}
        </div>
        <button
          onClick={handleVisitWebsite}
          className="text-sm bg-coffee-dark hover:bg-coffee-darker text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Visit Store
        </button>
      </div>
    </div>
  );
};

export default RoasterCard;

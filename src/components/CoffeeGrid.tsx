import { useMemo } from 'react';
import type { CoffeeBean } from '../types/coffee.js';
import CoffeeCard from './CoffeeCard.js';

interface CoffeeGridProps {
  pagedBeans: CoffeeBean[];
  filteredBeansCount: number;
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
  onResetFilters: () => void;
  favorites: string[];
  toggleFavorite: (coffeeId: string) => void;
}

function CoffeeGrid({
  pagedBeans,
  filteredBeansCount,
  page,
  pageCount,
  setPage,
  onResetFilters,
  favorites,
  toggleFavorite
}: CoffeeGridProps) {
  const paginationPages = useMemo(() => {
    const pages: (number | string)[] = [];
    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      if (page === pageCount) {
        pages.push(page - 2);
        pages.push(page - 1);
      } else if (page === pageCount - 1) {
        pages.push(page - 1);
        pages.push(page);
      } else if (page > 2 && page < pageCount - 1) {
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
      } else if (page === 2) {
        pages.push(2);
        pages.push(3);
      } else if (page === 1) {
        pages.push(2);
        pages.push(3);
      }
      if (page < pageCount - 2) pages.push('...');
      pages.push(pageCount);
    }
    return pages;
  }, [page, pageCount]);

  return (
    <>
      {/* Coffee beans grid */}
      <div className="max-w-7xl mx-auto px-3 md:px-5 grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8 mt-8">
        {pagedBeans.map(bean => (
          <CoffeeCard
            key={bean.id}
            bean={bean}
            isFavorite={favorites.includes(bean.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {pageCount > 0 && (
        <div className="flex justify-center my-10 gap-3 md:gap-4 flex-wrap px-5">
          <button
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className={`font-pixel px-4 py-2 border-4 transition-all duration-150 ${page === 1
                ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'border-coffee-dark dark:border-dark-accent bg-[#fffbe8] dark:bg-dark-surface text-coffee-dark dark:text-dark-text cursor-pointer hover:bg-gold dark:hover:bg-dark-accent hover:text-white shadow-[4px_4px_0px_0px_rgba(44,24,16,1)] dark:shadow-[4px_4px_0px_0px_rgba(232,184,77,1)] active:shadow-none active:translate-x-1 active:translate-y-1'
              }`}
          >
            PREV
          </button>
          <div className="flex gap-2 items-center text-sm md:text-base">
            {paginationPages.map((pg, idx) => typeof pg === 'number' ? (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                disabled={pg === page}
                className={`font-pixel w-10 h-10 flex items-center justify-center border-4 transition-all ${pg === page
                    ? 'border-coffee-dark dark:border-dark-accent bg-gold dark:bg-dark-accent text-white cursor-default shadow-[4px_4px_0px_0px_rgba(44,24,16,1)] dark:shadow-[4px_4px_0px_0px_rgba(232,184,77,1)]'
                    : 'border-coffee-dark dark:border-dark-accent bg-[#fffbe8] dark:bg-dark-surface text-coffee-dark dark:text-dark-text cursor-pointer hover:bg-gold/20 dark:hover:bg-dark-accent/20'
                  }`}
              >
                {pg}
              </button>
            ) : (
              <span key={`ellipsis-${idx}`} className="px-1 text-gold dark:text-dark-accent font-pixel font-bold select-none">...</span>
            ))}
          </div>
          <button
            onClick={() => setPage(Math.min(page + 1, pageCount))}
            disabled={page === pageCount || pageCount === 0}
            className={`font-pixel px-4 py-2 border-4 transition-all duration-150 ${page === pageCount || pageCount === 0
                ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'border-coffee-dark dark:border-dark-accent bg-[#fffbe8] dark:bg-dark-surface text-coffee-dark dark:text-dark-text cursor-pointer hover:bg-gold dark:hover:bg-dark-accent hover:text-white shadow-[4px_4px_0px_0px_rgba(44,24,16,1)] dark:shadow-[4px_4px_0px_0px_rgba(232,184,77,1)] active:shadow-none active:translate-x-1 active:translate-y-1'
              }`}
          >
            NEXT
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredBeansCount === 0 && (
        <div className="text-center py-20 px-5 animate-fadeIn">
          <div className="text-8xl mb-5 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">☕</div>
          <h3 className="font-pixel text-2xl md:text-3xl text-coffee-dark dark:text-dark-text mb-4">No coffee found</h3>
          <p className="text-base text-coffee-light dark:text-dark-text-secondary mb-8 font-serif italic">Try adjusting your filters or search terms.</p>
          <button
            onClick={onResetFilters}
            className="pixel-button"
          >
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
}

export default CoffeeGrid;

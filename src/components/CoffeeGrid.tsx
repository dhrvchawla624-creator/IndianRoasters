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
        <div className="flex justify-center my-10 gap-4 flex-wrap px-5">
          <button
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className={`px-5 py-2 rounded-lg border-2 border-gold dark:border-dark-accent font-semibold transition-all duration-150 ${page === 1
                ? 'bg-cream-light dark:bg-dark-bg-secondary text-gray-400 dark:text-dark-text-muted cursor-not-allowed'
                : 'bg-[#fffbe8] dark:bg-dark-surface text-[#222] dark:text-dark-text cursor-pointer hover:bg-gold dark:hover:bg-dark-accent hover:text-white'
              }`}
          >
            Previous
          </button>
          <div className="flex gap-1 items-center text-base">
            {paginationPages.map((pg, idx) => typeof pg === 'number' ? (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                disabled={pg === page}
                className={`px-3 py-1 rounded-lg transition-all ${pg === page
                    ? 'bg-gold dark:bg-dark-accent text-white font-bold border-2 border-gold dark:border-dark-accent cursor-default'
                    : 'bg-[#fffbe8] dark:bg-dark-surface text-[#111] dark:text-dark-text font-semibold border-2 border-[#fffbe8] dark:border-dark-surface cursor-pointer hover:bg-gold/10 dark:hover:bg-dark-accent/20'
                  }`}
              >
                {pg}
              </button>
            ) : (
              <span key={`ellipsis-${idx}`} className="px-1 text-gold dark:text-dark-accent font-bold select-none">…</span>
            ))}
          </div>
          <button
            onClick={() => setPage(Math.min(page + 1, pageCount))}
            disabled={page === pageCount || pageCount === 0}
            className={`px-5 py-2 rounded-lg border-2 border-gold dark:border-dark-accent font-semibold transition-all duration-150 ${page === pageCount || pageCount === 0
                ? 'bg-cream-light dark:bg-dark-bg-secondary text-gray-400 dark:text-dark-text-muted cursor-not-allowed'
                : 'bg-[#fffbe8] dark:bg-dark-surface text-[#222] dark:text-dark-text cursor-pointer hover:bg-gold dark:hover:bg-dark-accent hover:text-white'
              }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredBeansCount === 0 && (
        <div className="text-center py-20 px-5 animate-fadeIn">
          <div className="text-8xl mb-5 opacity-30">☕</div>
          <h3 className="text-3xl text-coffee-dark dark:text-dark-text mb-2.5">No coffee beans found</h3>
          <p className="text-base text-coffee-light dark:text-dark-text-secondary mb-8">Try adjusting your filters or search terms</p>
          <button
            onClick={onResetFilters}
            className="px-8 py-3.5 bg-coffee-medium dark:bg-dark-accent text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 shadow-md hover:bg-coffee-brown dark:hover:bg-dark-accent/80 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
}

export default CoffeeGrid;

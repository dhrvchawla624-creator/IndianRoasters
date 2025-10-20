import { useMemo } from 'react';
import type { CoffeeBean } from '../types/coffee';
import CoffeeCard from './CoffeeCard';

interface CoffeeGridProps {
  pagedBeans: CoffeeBean[];
  filteredBeansCount: number;
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
  onResetFilters: () => void;
}

function CoffeeGrid({
  pagedBeans,
  filteredBeansCount,
  page,
  pageCount,
  setPage,
  onResetFilters,
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
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 justify-items-center">
        {pagedBeans.map(bean => (
          <CoffeeCard key={bean.id} bean={bean} />
        ))}
      </div>

      {/* Pagination Controls */}
      {pageCount > 0 && (
        <div className="flex justify-center my-10 gap-4 flex-wrap px-5">
          <button
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className={`px-5 py-2 rounded-lg border-2 border-gold font-semibold transition-all duration-150 ${
              page === 1 
                ? 'bg-cream-light text-gray-400 cursor-not-allowed' 
                : 'bg-[#fffbe8] text-[#222] cursor-pointer hover:bg-gold hover:text-white'
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
                className={`px-3 py-1 rounded-lg transition-all ${
                  pg === page 
                    ? 'bg-gold text-white font-bold border-2 border-gold cursor-default' 
                    : 'bg-[#fffbe8] text-[#111] font-semibold border-2 border-[#fffbe8] cursor-pointer hover:bg-gold/10'
                }`}
              >
                {pg}
              </button>
            ) : (
              <span key={`ellipsis-${idx}`} className="px-1 text-gold font-bold select-none">…</span>
            ))}
          </div>
          <button
            onClick={() => setPage(Math.min(page + 1, pageCount))}
            disabled={page === pageCount || pageCount === 0}
            className={`px-5 py-2 rounded-lg border-2 border-gold font-semibold transition-all duration-150 ${
              page === pageCount || pageCount === 0
                ? 'bg-cream-light text-gray-400 cursor-not-allowed' 
                : 'bg-[#fffbe8] text-[#222] cursor-pointer hover:bg-gold hover:text-white'
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
          <h3 className="text-3xl text-coffee-dark mb-2.5">No coffee beans found</h3>
          <p className="text-base text-coffee-light mb-8">Try adjusting your filters or search terms</p>
          <button 
            onClick={onResetFilters} 
            className="px-8 py-3.5 bg-coffee-medium text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 shadow-md hover:bg-coffee-brown hover:-translate-y-0.5 hover:shadow-lg"
          >
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
}

export default CoffeeGrid;

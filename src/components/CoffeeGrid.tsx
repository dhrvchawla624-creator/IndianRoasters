import { useMemo } from 'react';
import type { CoffeeBean } from '../types/coffee';
import CoffeeCard from './CoffeeCard';
import '../App.css';

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
      <div className="coffee-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px',
        marginTop: '32px',
        justifyItems: 'center',
      }}>
        {pagedBeans.map(bean => (
          <CoffeeCard key={bean.id} bean={bean} />
        ))}
      </div>

      {/* Pagination Controls */}
      {pageCount > 0 && (
        <div className="pagination" style={{ display: 'flex', justifyContent: 'center', margin: '40px 0 10px 0', gap: 16, flexWrap: 'wrap' }}>
          <button
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="pagination-btn"
            style={{
              padding: '8px 18px',
              borderRadius: 8,
              border: '2px solid #d4af37',
              background: page === 1 ? '#f8f7f1' : '#fffbe8',
              color: page === 1 ? '#aaa' : '#222',
              fontWeight: 600,
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              transition: 'all .12s'
            }}
          >
            Previous
          </button>
          <div style={{ display: 'flex', gap: 3, alignItems: 'center', fontSize: 16 }}>
            {paginationPages.map((pg, idx) => typeof pg === 'number' ? (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                className="pagination-btn"
                style={{
                  background: pg === page ? '#d4af37' : '#fffbe8',
                  color: pg === page ? '#fff' : '#111',
                  fontWeight: pg === page ? 700 : 600,
                  border: pg === page ? '2px solid #d4af37' : '2px solid #fffbe8',
                  padding: '4px 11px',
                  borderRadius: 7,
                  cursor: pg === page ? 'default' : 'pointer'
                }}
                disabled={pg === page}
              >{pg}</button>
            ) : (
              <span key={`ellipsis-${idx}`} style={{padding: '0 4px', color: '#d4af37', fontWeight: 'bolder', userSelect:'none'}}>…</span>
            ))}
          </div>
          <button
            onClick={() => setPage(Math.min(page + 1, pageCount))}
            disabled={page === pageCount || pageCount === 0}
            className="pagination-btn"
            style={{
              padding: '8px 18px',
              borderRadius: 8,
              border: '2px solid #d4af37',
              background: page === pageCount || pageCount === 0 ? '#f8f7f1' : '#fffbe8',
              color: page === pageCount || pageCount === 0 ? '#aaa' : '#222',
              fontWeight: 600,
              cursor: page === pageCount || pageCount === 0 ? 'not-allowed' : 'pointer',
              transition: 'all .12s'
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredBeansCount === 0 && (
        <div className="empty-state">
          <div className="empty-icon">☕</div>
          <h3>No coffee beans found</h3>
          <p>Try adjusting your filters or search terms</p>
          <button onClick={onResetFilters} className="reset-btn">
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
}

export default CoffeeGrid;

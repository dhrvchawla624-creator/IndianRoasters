import { useState, memo } from 'react';
import { optimizeImage } from '../utils/imageOptimizer.js';
import type { CoffeeBean } from '../types/coffee.js';

interface CoffeeCardProps {
  bean: CoffeeBean;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const CoffeeCard = memo(function CoffeeCard({ bean, isFavorite, onToggleFavorite }: CoffeeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(bean.id);
  };

  // Safely handle potentially undefined image
  const imageUrl = bean.image || '';
  const hasImage = imageUrl.length > 0;

  return (
    <div
      className={`pixel-card flex h-full w-full flex-col ${!bean.inStock ? 'opacity-70' : ''}`}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-cream dark:bg-dark-surface border-b-4 border-coffee-dark dark:border-dark-accent">
        {hasImage ? (
          <img
            src={optimizeImage(imageUrl, {
              width: 800,
              height: 600,
              quality: 85,
              format: 'auto',
              fit: 'cover',
            })}
            alt={bean.name}
            className={`h-full w-full object-cover object-center transition-all duration-500 hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            loading="lazy"
            width="600"
            height="450"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = imageUrl;
              setImageLoaded(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-coffee-medium dark:text-dark-text-secondary text-4xl">
            ☕
          </div>
        )}
        {!imageLoaded && hasImage && (
          <div className="absolute inset-0 bg-cream dark:bg-dark-bg-secondary animate-pulse" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 md:p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="font-pixel text-[10px] md:text-[11px] uppercase tracking-wide text-coffee-medium dark:text-dark-accent">{bean.roaster}</span>
          {!bean.inStock && (
            <span className="rounded-none bg-red-100 px-2 py-0.5 text-[10px] font-bold border-2 border-red-700 text-red-700 dark:bg-red-900/40 dark:text-red-400 dark:border-red-400">OUT OF STOCK</span>
          )}
        </div>

        <h3 className="mt-1 text-sm md:text-base font-bold text-coffee-dark dark:text-dark-text leading-snug line-clamp-2">
          {bean.name}
        </h3>

        <p className="mt-2 text-xs md:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {bean.tastingNotes?.join(', ')}
        </p>

        <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between border-t-4 border-coffee-dark dark:border-dark-accent pt-4 mt-4 gap-3 md:gap-0">
          <div className="flex items-baseline gap-1.5 w-full md:w-auto">
            <span className="font-pixel text-base text-coffee-medium dark:text-dark-accent md:text-xl">
              ₹{bean.price ? bean.price.toFixed(0) : 'N/A'}{' '}
            </span>
            {bean.weight && <span className="font-pixel text-[10px] text-neutral-500 dark:text-neutral-400">/ {bean.weight}g</span>}
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={handleFavoriteClick}
              title={isFavorite ? "Remove from Favourites" : "Add to Favourites"}
              className="p-2 transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className={`transition-all duration-200 ${isFavorite
                  ? 'fill-current stroke-current text-red-500'
                  : 'fill-none stroke-coffee-medium dark:stroke-dark-text-secondary'
                  }`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <a
              href={bean.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`pixel-button text-[10px] md:text-xs w-full md:w-auto text-center ${bean.inStock
                ? ''
                : 'cursor-not-allowed bg-red-500 text-white border-red-700 shadow-red-700 pointer-events-none'
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CoffeeCard;

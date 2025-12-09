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
      className={`bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-lg dark:shadow-dark-surface-elevated/30 transition-all duration-300 hover:-translate-y-2.5 hover:shadow-2xl dark:hover:shadow-dark-surface-elevated/50 animate-scaleIn flex h-full w-full flex-col ${!bean.inStock ? 'opacity-70' : ''
        }`}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-cream dark:bg-dark-surface">
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

      <div className="flex flex-1 flex-col p-2.5 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wide text-coffee-medium dark:text-dark-accent">{bean.roaster}</span>
          {!bean.inStock && (
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-400">Out of Stock</span>
          )}
        </div>

        <h3 className="mt-2 text-sm md:text-base font-semibold text-coffee-dark dark:text-dark-text leading-snug line-clamp-2">
          {bean.name}
        </h3>

        <p className="mt-2 text-xs md:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
          {bean.tastingNotes?.join(', ')}
        </p>

        <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between border-t-2 border-cream pt-3 md:pt-4 dark:border-dark-border gap-3 md:gap-0">
          <div className="flex items-baseline gap-1.5 w-full md:w-auto">
            <span className="text-base font-extrabold text-coffee-medium dark:text-dark-accent md:text-2xl">
              ₹{bean.price ? bean.price.toFixed(0) : 'N/A'}{' '}
            </span>
            {bean.weight && <span className="text-sm text-neutral-500 dark:text-neutral-400">/ {bean.weight}g</span>}
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={handleFavoriteClick}
              title={isFavorite ? "Remove from Favourites" : "Add to Favourites"}
              className="rounded-full p-2.5 transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
              className={`rounded-xl px-3 py-2 text-xs md:px-5 md:py-2.5 md:text-sm font-bold text-white transition-all duration-300 w-full md:w-auto text-center ${bean.inStock
                ? 'bg-linear-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/40 hover:-translate-y-0.5 hover:shadow-lg'
                : 'cursor-not-allowed bg-red-500 shadow-none'
                }`}
              onClick={(e) => e.stopPropagation()} // Prevent card click if it's wrapped in a link
            >
              Buy Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CoffeeCard;

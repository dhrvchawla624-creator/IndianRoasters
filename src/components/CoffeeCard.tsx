import type { CoffeeBean } from '../types/coffee';

interface CoffeeCardProps {
  bean: CoffeeBean;
}

function CoffeeCard({ bean }: CoffeeCardProps) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2.5 hover:shadow-2xl animate-scaleIn h-[520px] md:h-[560px] lg:h-[580px] flex flex-col ${!bean.inStock ? 'opacity-70' : ''}`}>
      <div className="relative w-full h-48 md:h-52 lg:h-56 flex-shrink-0 overflow-hidden bg-gradient-to-br from-cream to-cream-light">
        {bean.image && (
          <img 
            src={bean.image} 
            alt={bean.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
            loading="lazy" 
          />
        )}
        {!bean.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg tracking-wide">
            Out of Stock
          </div>
        )}
        <div className="absolute top-4 right-4 px-3.5 py-1.5 bg-coffee-dark text-white rounded-full text-xs font-semibold backdrop-blur-md">
          {bean.weight}
        </div>
      </div>
      
      <div className="p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
        <div className="text-xs font-bold text-coffee-medium uppercase tracking-wider mb-2">
          {bean.roaster}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-coffee-dark mb-3 md:mb-4 leading-snug line-clamp-2 min-h-[3rem] md:min-h-[3.5rem]">
          {bean.name}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4 md:mb-5 flex-1 overflow-y-auto max-h-[100px] md:max-h-[120px] content-start">
          {bean.origin && (
            <span className="px-3 py-1.5 bg-cream text-coffee-brown rounded-lg text-xs font-semibold h-fit">
              📍 {bean.origin}
            </span>
          )}
          {bean.roastLevel && (
            <span className="px-3 py-1.5 bg-cream text-coffee-brown rounded-lg text-xs font-semibold h-fit">
              🔥 {bean.roastLevel}
            </span>
          )}
          {bean.process && (
            <span className="px-3 py-1.5 bg-cream text-coffee-brown rounded-lg text-xs font-semibold h-fit">
              ⚙️ {bean.process}
            </span>
          )}
          {bean.tastingNotes && bean.tastingNotes.length > 0 && (
            <span className="px-3 py-1.5 bg-cream text-coffee-brown rounded-lg text-xs font-semibold h-fit line-clamp-2">
              🍫 {bean.tastingNotes.slice(0, 3).join(', ')}{bean.tastingNotes.length > 3 ? '...' : ''}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-4 md:pt-5 border-t-2 border-cream mt-auto">
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-extrabold text-coffee-medium leading-none">
              ₹{bean.price.toFixed(0)}
            </span>
          </div>
          <a
            href={bean.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-br from-coffee-medium to-coffee-brown text-white rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-coffee-medium/30 ${!bean.inStock ? 'bg-gray-400 cursor-not-allowed shadow-none' : ''}`}
          >
            Buy Now →
          </a>
        </div>
      </div>
    </div>
  );
}

export default CoffeeCard;

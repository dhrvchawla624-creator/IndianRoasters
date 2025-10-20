import type { CoffeeBean } from '../types/coffee';

interface CoffeeCardProps {
  bean: CoffeeBean;
}

function CoffeeCard({ bean }: CoffeeCardProps) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2.5 hover:shadow-2xl animate-scaleIn ${!bean.inStock ? 'opacity-70' : ''}`}>
      <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-cream to-cream-light">
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
      
      <div className="p-6">
        <div className="text-xs font-bold text-coffee-medium uppercase tracking-wider mb-2">
          {bean.roaster}
        </div>
        <h3 className="text-xl font-bold text-coffee-dark mb-4 leading-snug line-clamp-2">
          {bean.name}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {bean.origin && (
            <span className="px-3 py-1.5 bg-cream text-coffee-brown rounded-lg text-xs font-semibold">
              📍 {bean.origin}
            </span>
          )}
          {bean.roastLevel && (
            <span className="px-3 py-1.5 bg-cream text-coffee-brown rounded-lg text-xs font-semibold">
              🔥 {bean.roastLevel}
            </span>
          )}
          {bean.process && (
            <span className="px-3 py-1.5 bg-cream text-coffee-brown rounded-lg text-xs font-semibold">
              ⚙️ {bean.process}
            </span>
          )}
          {bean.tastingNotes && bean.tastingNotes.length > 0 && (
            <span className="px-3 py-1.5 bg-cream text-coffee-brown rounded-lg text-xs font-semibold">
              🍫 {bean.tastingNotes.join(', ')}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-5 border-t-2 border-cream">
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-coffee-medium leading-none">
              ₹{bean.price.toFixed(0)}
            </span>
            <span className="text-xs text-coffee-light mt-0.5">
              /{bean.weight}
            </span>
          </div>
          <a
            href={bean.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 bg-gradient-to-br from-coffee-medium to-coffee-brown text-white rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-coffee-medium/30 ${!bean.inStock ? 'bg-gray-400 cursor-not-allowed shadow-none' : ''}`}
          >
            Buy Now →
          </a>
        </div>
      </div>
    </div>
  );
}

export default CoffeeCard;

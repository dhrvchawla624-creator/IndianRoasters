import type { CoffeeBean } from '../types/coffee';
import '../App.css';

interface CoffeeCardProps {
  bean: CoffeeBean;
}

function CoffeeCard({ bean }: CoffeeCardProps) {
  return (
    <div className={`coffee-card ${!bean.inStock ? 'out-of-stock' : ''}`}>
      <div className="card-image-wrapper">
        {bean.image && (
          <img src={bean.image} alt={bean.name} className="card-image" loading="lazy" />
        )}
        {!bean.inStock && <div className="stock-overlay">Out of Stock</div>}
        <div className="card-badge">{bean.weight}</div>
      </div>
      <div className="card-content">
        <div className="card-roaster">{bean.roaster}</div>
        <h3 className="card-title">{bean.name}</h3>
        <div className="card-tags">
          {bean.origin && <span className="tag">📍 {bean.origin}</span>}
          {bean.roastLevel && <span className="tag">🔥 {bean.roastLevel}</span>}
          {bean.process && <span className="tag">⚙️ {bean.process}</span>}
          {bean.tastingNotes && bean.tastingNotes.length > 0 && (
            <span className="tag">🍫 {bean.tastingNotes.join(', ')}</span>
          )}
        </div>
        <div className="card-footer">
          <div className="card-price">
            <span className="price-amount">₹{bean.price.toFixed(0)}</span>
            <span className="price-label">/{bean.weight}</span>
          </div>
          <a
            href={bean.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-button"
          >
            Buy Now →
          </a>
        </div>
      </div>
    </div>
  );
}

export default CoffeeCard;

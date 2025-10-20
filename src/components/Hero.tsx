import '../App.css';

interface HeroProps {
  totalBeans: number;
  totalRoasters: number;
}

function Hero({ totalBeans, totalRoasters }: HeroProps) {
  return (
    <header className="hero">
      <div className="hero-content">
        <div className="hero-badge">☕ Premium Specialty Coffee</div>
        <h1 className="hero-title">
          Your Ultimate Indian
          <br />
          <span className="gradient-text">Coffee Roasters Library</span>
        </h1>
        <p className="hero-description">
          Explore {totalBeans}+ handpicked specialty beans from {totalRoasters} top roasters across India
        </p>
        <div className="hero-stats" style={{ display: 'flex', gap: 32, marginTop: 14 }}>
          <div className="stat">
            <div className="stat-number">{totalRoasters}+</div>
            <div className="stat-label">Roasters</div>
          </div>
          <div className="stat">
            <div className="stat-number">{totalBeans}+</div>
            <div className="stat-label">Coffee Beans</div>
          </div>
          <div className="stat">
            <div className="stat-number">100%</div>
            <div className="stat-label">Specialty Grade</div>
          </div>
        </div>
      </div>
      <div className="hero-illustration">
        <div className="floating-bean bean-1">☕</div>
        <div className="floating-bean bean-2">☕</div>
        <div className="floating-bean bean-3">☕</div>
      </div>
    </header>
  );
}

export default Hero;

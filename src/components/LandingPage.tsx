import '../App.css';

interface LandingPageProps {
  show: boolean;
}

function LandingPage({ show }: LandingPageProps) {
  if (!show) return null;

  return (
    <div className="landing">
      <div className="landing-content">
        <div className="coffee-animation">
          <div className="coffee-cup">☕</div>
          <div className="steam">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <h1 className="landing-title">Homegrounds</h1>
        <p className="landing-subtitle">Discover India's Finest Specialty Coffee</p>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

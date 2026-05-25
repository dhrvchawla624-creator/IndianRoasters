import { Link } from 'react-router-dom';

interface FooterProps {
  lastUpdate: string;
}

function Footer({ lastUpdate }: FooterProps) {
  return (
    <footer className="bg-coffee-dark dark:bg-dark-surface-elevated text-white border-t-8 border-coffee-brown dark:border-dark-border px-5 py-8 md:py-12 mt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-center md:text-left">
        
        <div className="flex-1">
          <Link to="/" className="inline-flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <svg className="text-gold dark:text-dark-accent" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 3h14v2H4zM4 6h14v2H4zM2 9h16v7a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9zm16 1h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2v-5zM6 11v4h8v-4H6z"/>
            </svg>
            <h3 className="font-pixel text-xl md:text-2xl text-cream-light tracking-wide">
              Indian Roasters
            </h3>
          </Link>
          <p className="opacity-80 text-sm md:text-base mt-4 max-w-sm mx-auto md:mx-0">
            Your ultimate specialty coffee library. 
            Discover, filter, and track India's finest beans.
          </p>
        </div>

        <div className="flex flex-col md:text-right items-center md:items-end gap-3">
          <div className="flex gap-4 mb-2">
            <a href="#" className="pixel-button text-[10px] md:text-xs text-coffee-dark bg-cream border-cream hover:bg-gold hover:border-gold hover:text-coffee-dark px-3 py-1.5 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              Contact Us
            </a>
            <a href="#" className="pixel-button text-[10px] md:text-xs text-white bg-transparent border-cream hover:bg-cream hover:border-cream hover:text-coffee-dark px-3 py-1.5 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              Submit Roaster
            </a>
          </div>
          <p className="text-xs md:text-sm text-gold dark:text-dark-accent font-bold tracking-widest uppercase mt-2">
            Stay Caffeinated
          </p>
          <p className="text-xs opacity-60 font-pixel mt-1 uppercase">
            DATA LAST UPDATED: <br className="md:hidden" />
            {lastUpdate ? new Date(lastUpdate).toLocaleString() : 'N/A'}
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

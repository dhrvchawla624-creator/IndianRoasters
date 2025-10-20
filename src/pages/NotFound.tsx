import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen pt-20 px-5 py-10 bg-cream-light dark:bg-dark-bg flex items-center justify-center transition-colors duration-300">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-dark-surface-elevated/30 p-8 md:p-12 transition-colors duration-300">
          {/* Animated Coffee Cup */}
          <div className="text-8xl mb-6 animate-shake">☕</div>
          
          {/* 404 Error */}
          <h1 className="text-6xl md:text-8xl font-extrabold text-coffee-dark dark:text-dark-text mb-4">
            404
          </h1>
          
          {/* Error Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-coffee-medium dark:text-dark-accent mb-4">
            Page Not Found
          </h2>
          
          <p className="text-lg text-coffee-light dark:text-dark-text-secondary mb-8 leading-relaxed">
            Oops! Looks like this page got lost in the coffee grinder. 
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="px-8 py-3.5 bg-gradient-to-br from-coffee-medium to-coffee-brown dark:from-dark-accent dark:to-dark-accent/80 text-white rounded-xl font-bold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-coffee-medium/30 dark:shadow-dark-accent/30 flex items-center gap-2"
            >
              <span>🏠</span>
              Back to Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3.5 bg-cream dark:bg-dark-bg-secondary text-coffee-dark dark:text-dark-text rounded-xl font-bold text-base transition-all duration-300 hover:bg-coffee-light dark:hover:bg-dark-surface hover:text-white hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
            >
              <span>⬅️</span>
              Go Back
            </button>
          </div>
          
          {/* Suggested Links */}
          <div className="mt-12 pt-8 border-t-2 border-cream dark:border-dark-border">
            <p className="text-sm text-coffee-medium dark:text-dark-text-secondary mb-4 font-semibold">
              Maybe you were looking for:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/"
                className="px-4 py-2 bg-cream dark:bg-dark-bg-secondary text-coffee-dark dark:text-dark-text rounded-lg text-sm font-medium hover:bg-coffee-light dark:hover:bg-dark-surface hover:text-white transition-all duration-300"
              >
                Coffee Beans
              </Link>
              <Link
                to="/roasters"
                className="px-4 py-2 bg-cream dark:bg-dark-bg-secondary text-coffee-dark dark:text-dark-text rounded-lg text-sm font-medium hover:bg-coffee-light dark:hover:bg-dark-surface hover:text-white transition-all duration-300"
              >
                Roasters
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 bg-cream dark:bg-dark-bg-secondary text-coffee-dark dark:text-dark-text rounded-lg text-sm font-medium hover:bg-coffee-light dark:hover:bg-dark-surface hover:text-white transition-all duration-300"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 bg-cream dark:bg-dark-bg-secondary text-coffee-dark dark:text-dark-text rounded-lg text-sm font-medium hover:bg-coffee-light dark:hover:bg-dark-surface hover:text-white transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

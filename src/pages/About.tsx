import PageHero from '../components/PageHero.js';

function About() {
  return (
    <div className="h-screen flex flex-col bg-cream-light dark:bg-dark-bg transition-colors duration-300">
      <PageHero 
        title="About Indian Roasters"
        subtitle="Your Ultimate Indian Coffee Library"
        icon="📖"
      />
      
      <div className="flex-1 overflow-y-auto scroll-snap-y-mandatory">
        <div className="max-w-4xl mx-auto px-5">
          <div className="relative min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)] flex flex-col justify-center scroll-snap-start py-8 md:py-10">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-dark-surface-elevated/30 p-6 md:p-12 transition-colors duration-300 w-full mb-4">
            <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-4">Our Mission</h2>
            <p className="text-coffee-medium dark:text-dark-text-secondary leading-relaxed mb-4">
              Indian Roasters is dedicated to making India's specialty coffee scene accessible to everyone.
              We aggregate coffee offerings from 60+ premium roasters across India, providing a 
              centralized platform to discover, compare, and purchase exceptional coffee beans.
            </p>
            <p className="text-coffee-medium dark:text-dark-text-secondary leading-relaxed">
              Our goal is to support the growing Indian specialty coffee community by connecting 
              coffee enthusiasts with the finest roasters and helping them discover their perfect brew.
            </p>
            </div>
            <div className="flex flex-col items-center gap-2 animate-bounce-slow opacity-60">
              <span className="text-xs font-semibold text-coffee-medium dark:text-dark-text-secondary">
                Scroll for more
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-medium dark:text-dark-text-secondary"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
            </div>
          </div>
          
        

          <div className="min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)] flex items-center scroll-snap-start py-8 md:py-10">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-dark-surface-elevated/30 p-6 md:p-12 transition-colors duration-300 w-full">
            <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-4">How to Use This Site</h2>
            <p className="text-coffee-medium dark:text-dark-text-secondary leading-relaxed mb-6">
              Follow these simple steps to discover your next favorite coffee from India's best roasters.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex items-baseline space-x-3 mb-4">
                <div className="text-lg font-bold text-coffee-dark dark:text-dark-text">1.</div>
                <div>
                  <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">Explore & Discover</h3>
                  <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                    Start on the homepage to browse a comprehensive list of specialty coffee beans from across India.
                  </p>
                </div>
              </div>
              <div className="flex items-baseline space-x-3 mb-4">
                <div className="text-lg font-bold text-coffee-dark dark:text-dark-text">2.</div>
                <div>
                  <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">Filter & Search</h3>
                  <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                    Use the powerful filters to narrow down by roaster, origin, roast level, tasting notes, and price. The search bar helps you find exactly what you're looking for.
                  </p>
                </div>
              </div>
              <div className="flex items-baseline space-x-3 mb-4">
                <div className="text-lg font-bold text-coffee-dark dark:text-dark-text">3.</div>
                <div>
                  <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">Save Your Favorites</h3>
                  <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                    Create an account to save your favorite coffees. They'll be waiting for you on your profile page for easy access later.
                  </p>
                </div>
              </div>
              <div className="flex items-baseline space-x-3 mb-4">
                <div className="text-lg font-bold text-coffee-dark dark:text-dark-text">4.</div>
                <div>
                  <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">Visit the Roaster</h3>
                  <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                    Found a coffee you like? Click "Buy Now" to go directly to the roaster's website to make a purchase and support them directly.
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>

          <div className="min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)] flex items-center scroll-snap-start py-8 md:py-10">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-dark-surface-elevated/30 p-6 md:p-12 transition-colors duration-300 w-full">
            <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-4">Why Indian Roasters?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-baseline space-x-3 mb-4">
                  <div className="text-2xl">🔍</div>
                  <div>
                    <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">Comprehensive Search</h3>
                    <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                      Filter by roaster, origin, process, roast level, and tasting notes
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-baseline space-x-3 mb-4">
                  <div className="text-2xl">🔄</div>
                  <div>
                    <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">Real-Time Data</h3>
                    <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                      Always up-to-date with the latest coffee offerings and prices
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-baseline space-x-3 mb-4">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">Fast & Responsive</h3>
                    <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                      Lightning-fast search and filtering for seamless browsing
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-baseline space-x-3 mb-4">
                  <div className="text-2xl">🎨</div>
                  <div>
                    <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">Beautiful Design</h3>
                    <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                      Clean, intuitive interface designed for coffee lovers
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          <div className="min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)] flex items-center scroll-snap-start py-8 md:py-10">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-dark-surface-elevated/30 p-6 md:p-12 transition-colors duration-300 w-full">
            <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-4">Technology</h2>
            <p className="text-coffee-medium dark:text-dark-text-secondary leading-relaxed mb-4">
              Built with modern web technologies including React, TypeScript, and Tailwind CSS,
              Indian Roasters delivers a fast, responsive, and delightful user experience.
            </p>
            <p className="text-coffee-medium dark:text-dark-text-secondary leading-relaxed">
              Our automated scraping system keeps the coffee database fresh and accurate,
              pulling data directly from roaster websites to ensure you always have access
              to the latest offerings.
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

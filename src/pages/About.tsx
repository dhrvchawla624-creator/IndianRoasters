import PageHero from '../components/PageHero.js';

function About() {
  return (
    <div className="h-screen flex flex-col bg-cream-light dark:bg-dark-bg transition-colors duration-300">
      <PageHero 
        title="About Indian Roasters"
        subtitle="Your Ultimate Indian Coffee Library"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        }
      />
      
      <div className="flex-1 overflow-y-auto scroll-snap-y-mandatory">
        <div className="max-w-4xl mx-auto px-5">
          <div className="relative md:min-h-[calc(100vh-10rem)] flex flex-col justify-center scroll-snap-start py-8 md:py-10">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-dark-surface-elevated/30 p-6 md:p-12 transition-colors duration-300 w-full">
            <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-4 text-center">Our Mission</h2>
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
            <div className="md:absolute bottom-8 left-1/2 md:-translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow opacity-60 pt-8 md:pt-0">
              <span className="text-xs font-semibold text-coffee-medium dark:text-dark-text-secondary">
                Scroll for more
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-medium dark:text-dark-text-secondary"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
            </div>
          </div>
          
        

          <div className="md:min-h-[calc(100vh-10rem)] flex items-center scroll-snap-start py-8 md:py-10">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-dark-surface-elevated/30 p-6 md:p-12 transition-colors duration-300 w-full mt-8 md:mt-0">
            <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-6 text-center">How to Use This Site</h2>
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

          <div className="md:min-h-[calc(100vh-10rem)] flex items-center scroll-snap-start py-8 md:py-10">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-dark-surface-elevated/30 p-6 md:p-12 transition-colors duration-300 w-full mt-8 md:mt-0">
            <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-6 text-center">Why Indian Roasters?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-12 h-12 bg-cream-dark dark:bg-dark-border rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-medium dark:text-dark-accent"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">Comprehensive Search</h3>
                    <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                      Filter by roaster, origin, process, roast level, and tasting notes
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-12 h-12 bg-cream-dark dark:bg-dark-border rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-medium dark:text-dark-accent"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L20.49 9"></path><path d="M20.49 15a9 9 0 0 1-14.85 3.36L3.51 15"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">Real-Time Data</h3>
                    <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                      Always up-to-date with the latest coffee offerings and prices
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-12 h-12 bg-cream-dark dark:bg-dark-border rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-medium dark:text-dark-accent"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">Fast & Responsive</h3>
                    <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                      Lightning-fast search and filtering for seamless browsing
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-12 h-12 bg-cream-dark dark:bg-dark-border rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-medium dark:text-dark-accent"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                  </div>
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

          <div className="md:min-h-[calc(100vh-10rem)] flex items-center scroll-snap-start py-8 md:py-10">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-dark-surface-elevated/30 p-6 md:p-12 transition-colors duration-300 w-full mt-8 md:mt-0">
            <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-6 text-center">Technology</h2>
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

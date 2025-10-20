import PageHero from '../components/PageHero';

function Blog() {
  return (
    <div className="min-h-screen bg-cream-light dark:bg-dark-bg transition-colors duration-300">
      <PageHero 
        title="Coffee Blog"
        subtitle="Stories, guides, and insights from India's specialty coffee scene"
        icon="📝"
      />
      
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-dark-surface-elevated/30 p-8 md:p-12 transition-colors duration-300">
          <div className="text-center text-coffee-light dark:text-dark-text-secondary">
            <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-4">
              Blog Coming Soon
            </h2>
            <p className="text-lg mb-8">
              We're brewing up some great content about coffee culture, brewing techniques,
              roaster interviews, and the Indian specialty coffee movement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-cream dark:bg-dark-bg-secondary rounded-xl p-6 transition-colors duration-300">
                <div className="text-3xl mb-3">📖</div>
                <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-2">Brewing Guides</h3>
                <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                  Learn the best techniques for different brewing methods
                </p>
              </div>
              <div className="bg-cream dark:bg-dark-bg-secondary rounded-xl p-6 transition-colors duration-300">
                <div className="text-3xl mb-3">🎤</div>
                <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-2">Roaster Interviews</h3>
                <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                  Meet the people behind your favorite coffee brands
                </p>
              </div>
              <div className="bg-cream dark:bg-dark-bg-secondary rounded-xl p-6 transition-colors duration-300">
                <div className="text-3xl mb-3">🌱</div>
                <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-2">Coffee Origins</h3>
                <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                  Explore the diverse coffee-growing regions of India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;

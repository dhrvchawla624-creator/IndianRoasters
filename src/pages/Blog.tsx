import PageHero from '../components/PageHero';

function Blog() {
  return (
    <div className="min-h-screen bg-cream-light">
      <PageHero 
        title="Coffee Blog"
        subtitle="Stories, guides, and insights from India's specialty coffee scene"
        icon="📝"
      />
      
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center text-coffee-light">
            <h2 className="text-2xl font-bold text-coffee-dark mb-4">
              Blog Coming Soon
            </h2>
            <p className="text-lg mb-8">
              We're brewing up some great content about coffee culture, brewing techniques,
              roaster interviews, and the Indian specialty coffee movement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-cream rounded-xl p-6">
                <div className="text-3xl mb-3">📖</div>
                <h3 className="font-bold text-coffee-dark mb-2">Brewing Guides</h3>
                <p className="text-sm text-coffee-medium">
                  Learn the best techniques for different brewing methods
                </p>
              </div>
              <div className="bg-cream rounded-xl p-6">
                <div className="text-3xl mb-3">🎤</div>
                <h3 className="font-bold text-coffee-dark mb-2">Roaster Interviews</h3>
                <p className="text-sm text-coffee-medium">
                  Meet the people behind your favorite coffee brands
                </p>
              </div>
              <div className="bg-cream rounded-xl p-6">
                <div className="text-3xl mb-3">🌱</div>
                <h3 className="font-bold text-coffee-dark mb-2">Coffee Origins</h3>
                <p className="text-sm text-coffee-medium">
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

import PageHero from '../components/PageHero';

function Roasters() {
  return (
    <div className="min-h-screen bg-cream-light">
      <PageHero 
        title="Indian Coffee Roasters"
        subtitle="Discover the artisans behind India's finest specialty coffee beans"
        icon="🏪"
      />
      
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center text-coffee-light">
            <h2 className="text-2xl font-bold text-coffee-dark mb-4">
              Roasters Directory Coming Soon
            </h2>
            <p className="text-lg mb-8">
              We're curating detailed profiles of 30+ premium Indian coffee roasters.
              Check back soon to explore their stories, locations, and specialties.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-cream rounded-xl p-6">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="font-bold text-coffee-dark mb-2">Locations</h3>
                <p className="text-sm text-coffee-medium">
                  Find roasters across India from major cities to coffee estates
                </p>
              </div>
              <div className="bg-cream rounded-xl p-6">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="font-bold text-coffee-dark mb-2">Specialties</h3>
                <p className="text-sm text-coffee-medium">
                  Learn about unique roasting techniques and signature blends
                </p>
              </div>
              <div className="bg-cream rounded-xl p-6">
                <div className="text-3xl mb-3">🌟</div>
                <h3 className="font-bold text-coffee-dark mb-2">Stories</h3>
                <p className="text-sm text-coffee-medium">
                  Discover the passion and craftsmanship behind each roaster
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roasters;

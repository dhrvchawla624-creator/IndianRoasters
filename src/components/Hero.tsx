interface HeroProps {
  totalBeans: number;
  totalRoasters: number;
}

function Hero({ totalBeans, totalRoasters }: HeroProps) {
  return (
    <header 
      className="relative pt-28 pb-20 md:pt-32 md:pb-24 text-center text-white overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(44, 24, 16, 0.9), rgba(74, 44, 29, 0.9)), url('/images/hero-bg.jpg')`
      }}
    >
      {/* Background decoration elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block px-5 py-2 bg-white/15 backdrop-blur-md rounded-full text-sm font-semibold mb-5 dark:bg-white/10 transition-all duration-300 hover:bg-white/20">
          ☕ Premium Specialty Coffee
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 animate-fadeIn">
          Your Ultimate Indian
          <br />
          <span className="bg-linear-to-r from-gold to-cream dark:from-dark-accent dark:to-dark-text bg-clip-text text-transparent">
            Coffee Roasters Library
          </span>
        </h1>
        
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Explore <strong className="font-bold text-gold dark:text-dark-accent">{totalBeans}+</strong> handpicked specialty beans from <strong className="font-bold text-gold dark:text-dark-accent">{totalRoasters}</strong> top roasters across India
        </p>
        
        <div className="flex justify-center gap-10 md:gap-16 flex-wrap">
          <div className="text-center transform transition-transform duration-300 hover:scale-110">
            <div className="text-4xl md:text-5xl font-bold text-gold dark:text-dark-accent mb-1" aria-label={`${totalRoasters} plus roasters`}>
              {totalRoasters}+
            </div>
            <div className="text-sm opacity-80 uppercase tracking-wider">Roasters</div>
          </div>
          <div className="text-center transform transition-transform duration-300 hover:scale-110">
            <div className="text-4xl md:text-5xl font-bold text-gold dark:text-dark-accent mb-1" aria-label={`${totalBeans} plus coffee beans`}>
              {totalBeans}+
            </div>
            <div className="text-sm opacity-80 uppercase tracking-wider">Coffee Beans</div>
          </div>
          <div className="text-center transform transition-transform duration-300 hover:scale-110">
            <div className="text-4xl md:text-5xl font-bold text-gold dark:text-dark-accent mb-1" aria-label="100 percent third wave culture">
              100%
            </div>
            <div className="text-sm opacity-80 uppercase tracking-wider">Third Wave Culture</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;

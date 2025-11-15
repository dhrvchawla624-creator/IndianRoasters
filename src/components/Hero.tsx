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
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3 animate-fadeIn drop-shadow-lg">
          <span className="bg-linear-to-r from-gold to-cream dark:from-dark-accent dark:to-dark-text bg-clip-text text-transparent">
            Your Ultimate Indian
          </span>
          <br />
          <span className="bg-linear-to-r from-gold to-cream dark:from-dark-accent dark:to-dark-text bg-clip-text text-transparent">
            Coffee Roasters Library
          </span>
        </h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto drop-shadow-md">
          Explore <strong className="font-bold text-gold dark:text-dark-accent">{totalBeans}+</strong> coffee beans from <strong className="font-bold text-gold dark:text-dark-accent">{totalRoasters}+</strong> roasters across India
        </p>
        
      </div>
    </header>
  );
}

export default Hero;

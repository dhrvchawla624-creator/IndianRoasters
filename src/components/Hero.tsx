interface HeroProps {
  totalBeans: number;
  totalRoasters: number;
}

function Hero({ totalBeans, totalRoasters }: HeroProps) {
  return (
    <header className="relative bg-linear-to-br from-coffee-dark to-coffee-brown dark:from-dark-surface-elevated dark:to-dark-surface pt-28 pb-20 md:pt-32 md:pb-24 text-center text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="inline-block px-5 py-2 bg-white/15 backdrop-blur-md rounded-full text-sm font-semibold mb-5 dark:bg-white/10">
          ☕ Premium Specialty Coffee
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
          Your Ultimate Indian
          <br />
          <span className="bg-linear-to-r from-gold to-cream dark:from-dark-accent dark:to-dark-text bg-clip-text text-transparent">
            Coffee Roasters Library
          </span>
        </h1>
        
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
          Explore {totalBeans}+ handpicked specialty beans from {totalRoasters} top roasters across India
        </p>
        
        <div className="flex justify-center gap-10 flex-wrap">
          <div className="text-center">
            <div className="text-4xl font-bold text-gold dark:text-dark-accent mb-1">{totalRoasters}+</div>
            <div className="text-sm opacity-80 uppercase tracking-wider">Roasters</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold dark:text-dark-accent mb-1">{totalBeans}+</div>
            <div className="text-sm opacity-80 uppercase tracking-wider">Coffee Beans</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold dark:text-dark-accent mb-1">100%</div>
            <div className="text-sm opacity-80 uppercase tracking-wider">Third wave Culture</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;

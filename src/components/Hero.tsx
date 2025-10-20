interface HeroProps {
  totalBeans: number;
  totalRoasters: number;
}

function Hero({ totalBeans, totalRoasters }: HeroProps) {
  return (
    <header className="relative bg-gradient-to-br from-coffee-dark via-coffee-brown to-coffee-medium dark:from-dark-bg-secondary dark:via-dark-surface dark:to-dark-surface-elevated text-white px-5 pt-28 pb-24 overflow-hidden -mb-12 transition-colors duration-300">
      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-cream-light dark:bg-dark-bg rounded-t-[50%] transition-colors duration-300"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="inline-block px-5 py-2 bg-white/15 backdrop-blur-md rounded-full text-sm font-semibold mb-5 animate-slideDown dark:bg-white/10">
          ☕ Premium Specialty Coffee
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 animate-slideUp [animation-delay:0.2s] [animation-fill-mode:both]">
          Your Ultimate Indian
          <br />
          <span className="bg-gradient-to-r from-gold to-cream dark:from-dark-accent dark:to-dark-text bg-clip-text text-transparent">
            Coffee Roasters Library
          </span>
        </h1>
        
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10 animate-slideUp [animation-delay:0.4s] [animation-fill-mode:both]">
          Explore {totalBeans}+ handpicked specialty beans from {totalRoasters} top roasters across India
        </p>
        
        <div className="flex justify-center gap-10 flex-wrap animate-slideUp [animation-delay:0.6s] [animation-fill-mode:both]">
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
            <div className="text-sm opacity-80 uppercase tracking-wider">Specialty Grade</div>
          </div>
        </div>
      </div>
      
      {/* Floating coffee beans */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] text-6xl opacity-10 animate-float">☕</div>
        <div className="absolute top-[30%] right-[15%] text-6xl opacity-10 animate-float [animation-delay:2s]">☕</div>
        <div className="absolute bottom-[20%] left-[20%] text-6xl opacity-10 animate-float [animation-delay:4s]">☕</div>
      </div>
    </header>
  );
}

export default Hero;

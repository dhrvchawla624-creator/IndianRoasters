interface PageHeroProps {
  title: string;
  subtitle: string;
  icon?: string;
}

function PageHero({ title, subtitle, icon = '☕' }: PageHeroProps) {
  return (
    <header className="relative bg-gradient-to-br from-coffee-dark via-coffee-brown to-coffee-medium text-white px-5 pt-28 pb-24 overflow-hidden -mb-12">
      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-cream-light rounded-t-[50%]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="text-6xl mb-5 animate-float">{icon}</div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 animate-slideUp">
          <span className="bg-gradient-to-r from-gold to-cream bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6 animate-slideUp [animation-delay:0.2s] [animation-fill-mode:both]">
          {subtitle}
        </p>
      </div>
      
      {/* Floating coffee beans */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] text-5xl opacity-10 animate-float">☕</div>
        <div className="absolute top-[25%] right-[12%] text-5xl opacity-10 animate-float [animation-delay:2s]">☕</div>
        <div className="absolute bottom-[25%] left-[15%] text-5xl opacity-10 animate-float [animation-delay:4s]">☕</div>
        <div className="absolute bottom-[30%] right-[18%] text-5xl opacity-10 animate-float [animation-delay:3s]">☕</div>
      </div>
    </header>
  );
}

export default PageHero;

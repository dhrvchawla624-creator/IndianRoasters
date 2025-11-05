interface PageHeroProps {
  title: string;
  subtitle: string;
  icon?: string;
}

function PageHero({ title, subtitle, icon = '☕' }: PageHeroProps) {
  return (
    <header 
      className="relative pt-28 pb-20 md:pt-32 md:pb-24 text-center text-white overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(44, 24, 16, 0.85), rgba(74, 44, 29, 0.85)), url('/images/hero-bg.jpg')`
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
        <div className="text-5xl mb-4">{icon}</div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
          {title}
        </h1>
        
        <p className="text-lg opacity-90 max-w-2xl mx-auto drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </header>
  );
}

export default PageHero;


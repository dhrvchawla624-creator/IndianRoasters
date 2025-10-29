interface PageHeroProps {
  title: string;
  subtitle: string;
  icon?: string;
}

function PageHero({ title, subtitle, icon = '☕' }: PageHeroProps) {
  return (
    <header className="relative bg-linear-to-br from-coffee-dark to-coffee-brown dark:from-dark-surface-elevated dark:to-dark-surface pt-28 pb-20 md:pt-32 md:pb-24 text-center text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="text-5xl mb-4">{icon}</div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          {title}
        </h1>
        
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </header>
  );
}

export default PageHero;

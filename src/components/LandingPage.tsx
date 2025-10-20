interface LandingPageProps {
  show: boolean;
}

function LandingPage({ show }: LandingPageProps) {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-coffee-dark to-coffee-brown flex items-center justify-center z-[9999] animate-fadeOut">
      <div className="text-center text-white">
        <div className="relative mb-8">
          <div className="text-8xl animate-bounce-custom">☕</div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-2.5">
            <span className="block w-2 h-8 bg-white/40 rounded-full animate-steam"></span>
            <span className="block w-2 h-8 bg-white/40 rounded-full animate-steam [animation-delay:0.3s]"></span>
            <span className="block w-2 h-8 bg-white/40 rounded-full animate-steam [animation-delay:0.6s]"></span>
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-2.5 tracking-tight">Indian Roasters</h1>
        <p className="text-lg opacity-90 mb-8">Discover India's Finest Specialty Coffee</p>
        <div className="w-[200px] h-1 bg-white/20 rounded-sm mx-auto overflow-hidden">
          <div className="h-full bg-gold rounded-sm animate-progress"></div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

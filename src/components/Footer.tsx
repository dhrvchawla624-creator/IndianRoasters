interface FooterProps {
  lastUpdate: string;
}

function Footer({ lastUpdate }: FooterProps) {
  return (
    <footer className="bg-linear-to-br from-coffee-dark to-coffee-brown dark:from-dark-surface-elevated dark:to-dark-bg-secondary text-white px-5 py-8 md:py-10 mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-center md:text-left">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">☕ Indian Roasters</h3>
          <p className="opacity-80 text-sm md:text-base">Your ultimate specialty coffee library</p>
        </div>
        <div className="md:text-right">
          <p className="opacity-80 text-sm md:text-base mb-1">Discover beans from India's finest roasters</p>
          <p className="text-sm opacity-60">
            Last updated: {new Date(lastUpdate).toLocaleString()}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

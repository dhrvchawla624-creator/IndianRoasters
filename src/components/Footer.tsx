interface FooterProps {
  lastUpdate: string;
}

function Footer({ lastUpdate }: FooterProps) {
  return (
    <footer className="bg-linear-to-br from-coffee-dark to-coffee-brown dark:from-dark-surface-elevated dark:to-dark-bg-secondary text-white px-5 py-16 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-8">
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-3xl font-bold mb-2.5">☕ Indian Roasters</h3>
          <p className="opacity-80 text-base">Your ultimate specialty coffee library</p>
        </div>
        <div className="text-right">
          <p className="opacity-80 mb-1">Discover beans from India's finest roasters</p>
          <p className="text-sm opacity-60">
            Last updated: {new Date(lastUpdate).toLocaleString()}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

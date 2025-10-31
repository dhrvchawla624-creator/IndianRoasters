import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  isLoggedIn?: boolean;
}

function Navbar({ onThemeToggle, isDarkMode = false, isLoggedIn = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Roasters', href: '/roasters' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  if (isLoggedIn) {
    navLinks.push({ name: 'Profile', href: '/profile' });
  } else {
    navLinks.push({ name: 'Login', href: '/login' });
  }

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-linear-to-br from-coffee-dark via-coffee-brown to-coffee-medium shadow-lg dark:from-dark-surface-elevated dark:via-dark-surface dark:to-dark-bg-secondary' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="text-3xl">☕</div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white leading-tight drop-shadow-md">Indian Roasters</span>
                <span className="text-xs text-cream opacity-90 leading-tight drop-shadow-sm dark:text-dark-text-secondary">Indian Coffee Library</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-medium text-sm drop-shadow-sm dark:hover:bg-white/15 ${
                    isActive(link.href) ? 'bg-white/20 dark:bg-white/15' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle Button */}
              <button
                onClick={onThemeToggle}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300 drop-shadow-sm dark:hover:bg-white/15"
                aria-label="Toggle theme"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300 dark:hover:bg-white/15"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 drop-shadow-sm ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 drop-shadow-sm ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 drop-shadow-sm ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-60 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMobileMenu}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-linear-to-br from-coffee-dark via-coffee-brown to-coffee-medium dark:from-dark-surface-elevated dark:via-dark-surface dark:to-dark-bg-secondary shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-end p-5 border-b border-white/10 dark:border-white/5">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300 dark:hover:bg-white/5"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={toggleMobileMenu}
                className={`flex items-center px-5 py-4 text-white hover:bg-white/20 dark:hover:bg-white/15 rounded-xl transition-all duration-300 font-medium text-lg animate-slideDown ${
                  isActive(link.href) ? 'bg-white/20 dark:bg-white/15' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10 dark:border-white/5">
            <div className="text-center text-cream/60 dark:text-dark-text-muted text-sm">
              <p className="mb-1">🌟 Premium Specialty Coffee</p>
              <p className="text-xs">Your Indian Coffee Library</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

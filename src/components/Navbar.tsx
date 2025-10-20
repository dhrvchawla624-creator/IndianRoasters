import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

function Navbar({ onThemeToggle, isDarkMode = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Roasters', href: '/roasters', icon: '🏪' },
    { name: 'About', href: '/about', icon: 'ℹ️' },
    { name: 'Blog', href: '/blog', icon: '📝' },
    { name: 'Contact', href: '/contact', icon: '📧' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-coffee-dark via-coffee-brown to-coffee-medium backdrop-blur-md bg-opacity-95 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="text-3xl">☕</div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white leading-tight">Homegrounds</span>
                <span className="text-xs text-cream opacity-80 leading-tight">Indian Coffee Library</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 text-cream hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium text-sm ${
                    isActive(link.href) ? 'bg-white/10 text-white' : ''
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
                className="p-2.5 text-2xl text-cream hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                aria-label="Toggle theme"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${
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
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
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
          className={`absolute top-0 right-0 h-full w-72 bg-gradient-to-br from-coffee-dark via-coffee-brown to-coffee-medium shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">☕</span>
              <span className="text-xl font-bold text-white">Menu</span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
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
                className={`flex items-center space-x-3 px-4 py-3.5 text-cream hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium animate-slideDown ${
                  isActive(link.href) ? 'bg-white/10 text-white' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-lg">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10">
            <div className="text-center text-cream/60 text-sm">
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

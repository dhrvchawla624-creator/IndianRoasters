import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import { MenuVertical } from './menu-vertical.js';
import './Navbar.css'; // Import the new CSS

interface NavbarProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

function Navbar({ onThemeToggle, isDarkMode = false }: NavbarProps) { // Theme props are kept but not used in this styling
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      event.preventDefault(); // Prevent router navigation
      window.location.reload();
    }
    // If not on the homepage, the Link component will handle navigation normally.
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Weekly Drops', href: '/weekly-drops' },
    // Keeping your original links
    { name: 'Roasters', href: '/roasters' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];
  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''} ${!isVisible && !isMenuOpen ? 'navbar-hidden' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleLogoClick} title="Indian Roasters">
          <span className="logo-word">Indian</span>
          <span className="logo-word">Roasters</span>
        </Link>

        <div className="navbar-left">
          <ul className="nav-menu hidden md:flex">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <NavLink to={link.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-buttons hidden md:flex">
            <button
              onClick={onThemeToggle}
              className="theme-toggle-btn"
              aria-label="Toggle theme"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
              )}
            </button>

            {user ? (
              <>
                <Link to="/profile" className="nav-btn signup">
                  Profile
                </Link>
                {user.photoURL && (
                  <Link to="/profile" className="profile-avatar-link">
                    <img src={user.photoURL} alt="Profile" className="profile-avatar" />
                  </Link>
                )}
              </>
            ) : (
              <Link to="/login" className="nav-btn login">
                Login
              </Link>
            )}
          </div>
        </div>

        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <MenuVertical
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={navLinks.map(link => ({ label: link.name, href: link.href }))}
      >
        {/* This content will be rendered in the footer of the mobile menu */}
        <button
          onClick={() => onThemeToggle?.()}
          className="theme-toggle-btn"
          aria-label="Toggle theme"
          style={{ color: 'var(--color-cream-light)' }} // Ensure icon color is correct on dark background
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
          )}
        </button>
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
        {user ? (
          <Link to="/profile" className="font-medium text-cream-light" onClick={() => setIsMenuOpen(false)}>
            Profile
          </Link>
        ) : (
          <Link to="/login" className="font-medium text-cream-light" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        )}
      </MenuVertical>
    </nav>
  );
}

export default Navbar;

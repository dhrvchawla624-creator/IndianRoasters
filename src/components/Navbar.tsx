import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import './Navbar.css'; // Import the new CSS

interface NavbarProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

function Navbar({ onThemeToggle, isDarkMode = false }: NavbarProps) { // Theme props are kept but not used in this styling
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    // Keeping your original links
    { name: 'Roasters', href: '/roasters' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
          {/* Uncomment and replace with your actual logo image path */}
          {/* <img src="/path/to/your/logo.png" alt="Indian Roasters Logo" className="logo-image" /> */}
          Indian Roasters
        </Link>

        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className="nav-menu">
          {/* Your original links are mapped here */}
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              <NavLink to={link.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-buttons">
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

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-backdrop" onClick={() => setIsMenuOpen(false)}></div>
        <div className="mobile-drawer-content">
          {/* Drawer Header */}
          <div className="mobile-drawer-header">
            <Link to="/" className="mobile-drawer-logo" onClick={() => setIsMenuOpen(false)}>
              {/* Uncomment and replace with your actual logo image path */}
              {/* <img src="/path/to/your/logo.png" alt="Indian Roasters Logo" className="logo-image" /> */}
              Indian Roasters
            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="close-menu-btn" aria-label="Close menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          {/* Drawer Links */}
          <div className="mobile-drawer-links">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.href} onClick={() => setIsMenuOpen(false)} className="mobile-drawer-link">
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="mobile-drawer-footer">
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
              <span className="ml-2">Toggle Theme</span>
            </button>
            {user ? (
              <Link to="/profile" className="nav-btn signup" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
            ) : (
              <Link to="/login" className="nav-btn login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

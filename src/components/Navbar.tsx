import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css'; // Import the new CSS

interface NavbarProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

function Navbar({ onThemeToggle, isDarkMode = false }: NavbarProps) { // Theme props are kept but not used in this styling
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
    // Keeping your original links
    { name: 'Roasters', href: '/roasters' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const menuVars: Variants = {
    initial: {
      clipPath: 'circle(0% at 95% 5%)',
    },
    animate: {
      clipPath: 'circle(150% at 95% 5%)',
      transition: {
        duration: 0.7,
        ease: [0.83, 0, 0.17, 1] as const,
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
    exit: {
      clipPath: 'circle(0% at 95% 5%)',
      transition: {
        duration: 0.5,
        ease: [0.83, 0, 0.17, 1] as const,
        when: 'afterChildren',
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const linkVars: Variants = {
    initial: {
      y: '30vh',
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen bg-cream-light dark:bg-dark-background text-coffee-dark dark:text-dark-text p-10 z-40"
          >
            <div className="flex h-full flex-col">
              <motion.div
                variants={linkVars}
                initial="initial"
                animate="animate"
                exit="initial"
                className="flex justify-between items-center"
              >
                <h1 className="text-lg text-coffee-dark dark:text-dark-text font-bold">Navigation</h1>
                <button onClick={() => setIsMenuOpen(false)} className="text-coffee-dark dark:text-dark-text" aria-label="Close menu">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </motion.div>
              <motion.div
                variants={menuVars}
                className="flex flex-col h-full justify-center items-center gap-6"
              >
                {navLinks.map((link) => (
                  <div className="overflow-hidden" key={link.name}>
                    <motion.div variants={linkVars} initial="initial" animate="animate" exit="initial">
                      <NavLink to={link.href} onClick={() => setIsMenuOpen(false)} className="text-4xl font-extrabold uppercase text-coffee-dark dark:text-dark-text hover:text-coffee-medium dark:hover:text-dark-accent transition-colors duration-300">
                        {link.name}
                      </NavLink>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
              <motion.div variants={linkVars} initial="initial" animate="animate" exit="initial" className="flex justify-center items-center gap-4">
                <button
                  onClick={() => onThemeToggle?.()}
                  className="theme-toggle-btn"
                  aria-label="Toggle theme"
                  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                {user ? (
                  <Link to="/profile" className="font-medium" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                ) : (
                  <Link to="/login" className="font-medium" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

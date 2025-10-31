import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Roasters from './pages/Roasters';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage or system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLanding(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    // Fetch last update time
    const fetchLastUpdate = async () => {
      try {
        const response = await fetch('/api/coffee');
        const result = await response.json();
        setLastUpdate(result.lastUpdate);
      } catch (err) {
        console.error('Failed to fetch last update:', err);
      }
    };
    fetchLastUpdate();
  }, []);

  useEffect(() => {
    // Apply dark mode class to document root
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Persist to localStorage
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Landing page
  if (showLanding && loading) {
    return <LandingPage show={true} />;
  }

  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <div className={`min-h-screen animate-fadeIn transition-colors duration-300 ${
            isDarkMode ? 'bg-dark-bg' : 'bg-cream-light'
          }`}>
            <Navbar onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/roasters" element={<Roasters />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer lastUpdate={lastUpdate} />
            <Analytics />
            <SpeedInsights />
          </div>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

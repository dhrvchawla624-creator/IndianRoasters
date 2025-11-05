import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

// Import critical components immediately (needed for initial render)
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load all page components (loaded on demand)
const Home = lazy(() => import('./pages/Home'));
const Roasters = lazy(() => import('./pages/Roasters'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const Profile = lazy(() => import('./pages/Profile'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy load analytics (non-critical, defer loading)
const Analytics = lazy(() => 
  import('@vercel/analytics/react').then(module => ({ default: module.Analytics }))
);
const SpeedInsights = lazy(() => 
  import('@vercel/speed-insights/react').then(module => ({ default: module.SpeedInsights }))
);

// Loading fallback component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-cream-light dark:bg-dark-bg">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">Loading...</p>
    </div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  
  // ✅ UPDATED: Defaults to light mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    // Only return true if explicitly saved as 'true'
    // Otherwise defaults to false (light mode)
    return saved === 'true';
  });
  
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [showAnalytics, setShowAnalytics] = useState(false);

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
      document.documentElement.setAttribute('data-color-scheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-color-scheme', 'light');
    }
    // Persist to localStorage
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    // Defer analytics loading until after page is interactive
    const timer = setTimeout(() => {
      setShowAnalytics(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
            
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/roasters" element={<Roasters />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            
            <Footer lastUpdate={lastUpdate} />
            
            {/* Lazy load analytics after initial render */}
            {showAnalytics && (
              <Suspense fallback={null}>
                <Analytics />
                <SpeedInsights />
              </Suspense>
            )}
          </div>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

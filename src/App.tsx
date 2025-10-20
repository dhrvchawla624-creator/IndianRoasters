import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Roasters from './pages/Roasters';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Implement dark mode theme switching logic
    console.log('Dark mode toggled:', !isDarkMode);
  };

  // Landing page
  if (showLanding && loading) {
    return <LandingPage show={true} />;
  }

  return (
    <Router>
      <div className="min-h-screen animate-fadeIn bg-cream-light">
        <Navbar onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roasters" element={<Roasters />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer lastUpdate={lastUpdate} />
      </div>
    </Router>
  );
}

export default App;


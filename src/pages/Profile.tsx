import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';
import { useAuth } from '../contexts/AuthContext.js';
import { useFavorites } from '../contexts/FavoritesContext.js';
import type { CoffeeBean } from '../types/coffee.js';
import CoffeeCard from '../components/CoffeeCard.js';

/**
 * Gets a higher-resolution profile picture URL from Google or GitHub.
 * Includes error handling for rate limiting.
 */
const getHighResPhotoURL = (url: string | null, size: number = 256): string => {
  if (!url) return '';

  try {
    // Google URLs - use original to avoid rate limits
    if (url.includes('googleusercontent.com')) {
      return url;
    }

    // GitHub URLs
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('avatars.githubusercontent.com')) {
      urlObj.searchParams.set('s', String(size));
      return urlObj.toString();
    }
  } catch (error) {
    console.error('Invalid photo URL:', url, error);
    return '';
  }
  
  return url;
};

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const [favoriteBeans, setFavoriteBeans] = useState<CoffeeBean[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false); // ← Toggle for favorites section

  // Memoize the high-resolution URL
  const highResPhotoURL = useMemo(() => getHighResPhotoURL(user?.photoURL || null), [user?.photoURL]);

  useEffect(() => {
    const loadFavoriteCoffees = async () => {
      if (favorites.length === 0) {
        setFavoriteBeans([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/coffee');
        const { data: allCoffees } = await response.json();
        const favs = allCoffees.filter((coffee: CoffeeBean) => 
          favorites.includes(coffee.id)
        );
        setFavoriteBeans(favs);
      } catch (error) {
        console.error('Error loading favorite coffees:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteCoffees();
  }, [favorites]);

  // Stabilize toggleFavorite with useCallback for memoized children
  const handleToggleFavorite = useCallback((id: string) => toggleFavorite(id), [toggleFavorite]);

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Get initials for fallback avatar
  const getInitials = () => {
    if (user?.displayName) {
      const names = user.displayName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.displayName.charAt(0).toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || '?';
  };

  if (!user) {
    return (
      <div className="bg-cream-light dark:bg-dark-bg min-h-screen flex items-center justify-center p-4 pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-4">
            Please log in to view your profile
          </h2>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3.5 bg-coffee-medium dark:bg-dark-accent text-white rounded-xl text-base font-semibold transition-all duration-300 shadow-md hover:bg-coffee-brown dark:hover:bg-dark-accent/80 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-light dark:bg-dark-bg min-h-screen p-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Profile Card */}
        <div className="max-w-md mx-auto text-center mb-12">
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-8 md:p-10 flex flex-col items-center">
            {/* Profile Picture with Error Handling */}
            {user.photoURL && !imageError ? (
              <img 
                src={highResPhotoURL}
                alt="Profile" 
                className="w-24 h-24 rounded-full mb-4 border-4 border-cream-dark dark:border-dark-border object-cover" 
                onError={handleImageError}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            ) : (
              <div className="w-24 h-24 rounded-full mb-4 border-4 border-cream-dark dark:border-dark-border bg-linear-to-br from-coffee-medium to-coffee-brown dark:from-dark-accent dark:to-dark-accent/80 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {getInitials()}
              </div>
            )}
            
            <h2 className="text-3xl font-bold text-coffee-dark dark:text-dark-text mb-2">
              Welcome, {user.displayName || 'Coffee Lover'}!
            </h2>
            <p className="text-coffee-medium dark:text-dark-text-secondary mb-8">
              {user.email}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* My Favourites Button - Now toggles display */}
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="flex-1 flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-coffee-medium focus:ring-opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="text-sm font-medium text-coffee-dark dark:text-dark-text">
                  {showFavorites ? 'Hide' : 'Show'} Favourites ({favorites.length})
                </span>
                {/* Chevron icon that rotates */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`transition-transform duration-300 ${showFavorites ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              <button
                onClick={handleLogoutClick}
                className="flex-1 flex items-center justify-center gap-3 px-4 py-3 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* My Favourites Section - Collapsible with Animation */}
        {showFavorites && (
          <div className="animate-slideDown">
            <h3 className="text-3xl font-bold text-coffee-dark dark:text-dark-text text-center mb-8 flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              My Favourite Beans
            </h3>
            
            {loading ? (
              <div className="text-center py-20 px-5 bg-white dark:bg-dark-surface rounded-2xl shadow-lg">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-coffee-medium dark:border-dark-accent mx-auto mb-4"></div>
                <p className="text-coffee-medium dark:text-dark-text-secondary">Loading your favorites...</p>
              </div>
            ) : favoriteBeans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteBeans.map(bean => (
                  <CoffeeCard 
                    key={bean.id} 
                    bean={bean} 
                    isFavorite={favorites.includes(bean.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-5 bg-white dark:bg-dark-surface rounded-2xl shadow-lg">
                <div className="text-6xl mb-5 opacity-50">❤️‍🩹</div>
                <h3 className="text-2xl text-coffee-dark dark:text-dark-text mb-2.5">No Favourites Yet</h3>
                <p className="text-base text-coffee-light dark:text-dark-text-secondary mb-8">
                  Click the heart icon on any coffee to save it here.
                </p>
                <button 
                  onClick={() => navigate('/')} 
                  className="px-8 py-3.5 bg-coffee-medium dark:bg-dark-accent text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 shadow-md hover:bg-coffee-brown dark:hover:bg-dark-accent/80 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Discover Beans
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

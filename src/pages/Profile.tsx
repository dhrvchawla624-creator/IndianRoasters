import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import type { CoffeeBean } from '../types/coffee';
import CoffeeCard from '../components/CoffeeCard';

interface ProfilePageProps {
  onLogout: () => void;
  isLoggedIn: boolean;
  allBeans: CoffeeBean[];
  favorites: string[];
  onToggleFavorite: (beanId: string) => void;
}

function ProfilePage({
  onLogout,
  isLoggedIn,
  allBeans = [],
  favorites = [],
  onToggleFavorite,
}: ProfilePageProps) {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      onLogout();
      navigate('/');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const favoriteBeans = allBeans.filter(bean => favorites.includes(bean.id));

  return (
    <div className="bg-cream-light dark:bg-dark-bg min-h-screen p-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Profile Card */}
        <div className="max-w-md mx-auto text-center mb-12">
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-8 md:p-10 flex flex-col items-center">
            {user && (
              <img src={user.photoURL || ''} alt="Profile" className="w-24 h-24 rounded-full mb-4 border-4 border-cream-dark dark:border-dark-border" />
            )}
            <h2 className="text-3xl font-bold text-coffee-dark dark:text-dark-text mb-2">
              Welcome, {user?.displayName || 'Coffee Lover'}!
            </h2>
            <p className="text-coffee-medium dark:text-dark-text-secondary mb-8">
              {user?.email}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#my-favourites"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <span className="text-sm font-medium text-coffee-dark dark:text-dark-text">My Favourites</span>
              </a>
              {isLoggedIn && (
                <button
                  onClick={handleLogoutClick}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>

        {/* My Favourites Section */}
        <div id="my-favourites" className="pt-16 -mt-16">
          <h3 className="text-3xl font-bold text-coffee-dark dark:text-dark-text text-center mb-8">
            My Favourite Beans
          </h3>
          {favoriteBeans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteBeans.map(bean => (
                <CoffeeCard
                  key={bean.id}
                  bean={bean}
                  isFavorite={true} // Always true on this page
                  onToggleFavorite={onToggleFavorite || (() => {})}
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
              <button onClick={() => navigate('/')} className="px-8 py-3.5 bg-coffee-medium dark:bg-dark-accent text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 shadow-md hover:bg-coffee-brown dark:hover:bg-dark-accent/80 hover:-translate-y-0.5 hover:shadow-lg">
                Discover Beans
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
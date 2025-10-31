import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface ProfilePageProps {
  onLogout: () => void;
  isLoggedIn: boolean;
}

function ProfilePage({ onLogout, isLoggedIn }: ProfilePageProps) {
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

  return (
    <div className="bg-cream-light dark:bg-dark-bg min-h-screen flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md text-center">
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-8 md:p-10 flex flex-col items-center">
          {user && (
            <img src={user.photoURL || ''} alt="Profile" className="w-24 h-24 rounded-full mb-4 border-4 border-cream-dark dark:border-dark-border" />
          )}
          <h2 className="text-3xl font-bold text-coffee-dark dark:text-dark-text mb-2">
            Welcome, {user?.displayName || 'Coffee Lover'}!
          </h2>
          <p className="text-coffee-medium dark:text-dark-text-secondary mb-6">
            {user?.email}
          </p>
          <p className="text-coffee-medium dark:text-dark-text-secondary mb-8">
            More profile features are coming soon.
          </p>
          {isLoggedIn && (
            <button
              onClick={handleLogoutClick}
              className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
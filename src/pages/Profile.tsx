import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';

interface ProfilePageProps {
  onLogout: () => void;
  isLoggedIn: boolean;
}

function ProfilePage({ onLogout, isLoggedIn }: ProfilePageProps) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="bg-cream-light dark:bg-dark-bg min-h-screen">
      <PageHero 
        title="My Profile" 
        subtitle="This is your personal space. Manage your details and preferences here."
        icon="👤"
      />
      
      <main className="max-w-4xl mx-auto px-5 py-10">
        <div className="bg-white dark:bg-dark-surface rounded-xl shadow-md p-8 text-center flex flex-col items-center">
          <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-6">
            Coming Soon!
          </h2>
          <p className="text-coffee-medium dark:text-dark-text-secondary mb-8">
            The profile page is currently under construction. Check back later!
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
      </main>
    </div>
  );
}

export default ProfilePage;
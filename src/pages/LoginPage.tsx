import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';

interface LoginPageProps {
  onLogin: () => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onLogin();
    navigate('/profile');
  };

  return (
    <div className="bg-cream-light dark:bg-dark-bg min-h-screen">
      <PageHero 
        title="Login" 
        subtitle="Access your account to view your profile and order history."
        icon="🔑"
      />
      
      <main className="max-w-4xl mx-auto px-5 py-10">
        <div className="bg-white dark:bg-dark-surface rounded-xl shadow-md p-8 text-center flex flex-col items-center">
          <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-6">
            Sign In To Your Account
          </h2>
          <button
            onClick={handleLoginClick}
            className="px-8 py-3 bg-coffee-medium text-white font-bold rounded-lg shadow-md hover:bg-coffee-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-coffee-dark focus:ring-opacity-50 dark:bg-dark-accent dark:hover:bg-dark-accent-hover"
          >
            Simulate Login
          </button>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
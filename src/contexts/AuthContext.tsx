import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { 
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth, googleProvider, githubProvider, isFirebaseConfigured } from '../firebase.js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      console.warn("⚠️ Firebase is not configured. Running in local mock auth mode.");
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      alert('Authentication is disabled because Firebase is not configured. Please set up the environment variables in a .env file.');
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const signInWithGithub = async () => {
    if (!isFirebaseConfigured) {
      alert('Authentication is disabled because Firebase is not configured. Please set up the environment variables in a .env file.');
      return;
    }
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    if (!isFirebaseConfigured) {
      setUser(null);
      return;
    }
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithGithub,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


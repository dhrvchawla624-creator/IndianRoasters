import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { auth, db } from '../firebase.js';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (coffeeId: string) => Promise<void>;
  isFavorite: (coffeeId: string) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites when user logs in
  useEffect(() => {
    const loadFavorites = async () => {
      const user = auth.currentUser;
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const favoritesRef = collection(db, 'favorites');
        const q = query(favoritesRef, where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        
        const favIds = snapshot.docs.map(doc => doc.data().coffeeId);
        setFavorites(favIds);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();

    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(() => {
      loadFavorites();
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = async (coffeeId: string) => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in to save favorites');
      return;
    }

    try {
      const favoriteDocId = `${user.uid}_${coffeeId}`;
      const favoriteRef = doc(db, 'favorites', favoriteDocId);

      if (favorites.includes(coffeeId)) {
        // Remove from favorites
        await deleteDoc(favoriteRef);
        setFavorites(prev => prev.filter(id => id !== coffeeId));
      } else {
        // Add to favorites
        await setDoc(favoriteRef, {
          userId: user.uid,
          coffeeId: coffeeId,
          addedAt: new Date().toISOString(),
        });
        setFavorites(prev => [...prev, coffeeId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorites. Please try again.');
    }
  };

  const isFavorite = (coffeeId: string) => favorites.includes(coffeeId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}

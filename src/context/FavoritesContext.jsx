import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // Charger depuis localStorage au démarrage
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (itemId) => {
    setFavorites(prev => {
      if (prev.includes(itemId)) {
        return prev; // Déjà dans les favoris
      }
      return [...prev, itemId];
    });
  };

  const removeFavorite = (itemId) => {
    setFavorites(prev => prev.filter(id => id !== itemId));
  };

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      removeFavorite(itemId);
    } else {
      addFavorite(itemId);
    }
  };

  const isFavorite = (itemId) => {
    return favorites.includes(itemId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

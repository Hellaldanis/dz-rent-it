import { useFavorites } from '../context/FavoritesContext';
import { mockItems } from '../data/mockItems';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites();
  
  // Filtrer les items qui sont dans les favoris
  const favoriteItems = mockItems.filter(item => favorites.includes(item.id));

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />

      <main className="flex-1 bg-background-light dark:bg-background-dark py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-black text-text-light dark:text-text-dark mb-2">
                My Favorites
              </h1>
              <p className="text-text-muted-light dark:text-text-muted-dark">
                {favoriteItems.length} {favoriteItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            {favoriteItems.length > 0 && (
              <button
                onClick={clearFavorites}
                className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-all"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Content */}
          {favoriteItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteItems.map((item, index) => (
                <div 
                  key={item.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ItemCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-primary">
                  favorite_border
                </span>
              </div>
              <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
                No favorites yet
              </h3>
              <p className="text-text-muted-light dark:text-text-muted-dark mb-6 max-w-md">
                Start adding items to your favorites by clicking the heart icon on any item card
              </p>
              <Link 
                to="/catalog"
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Browse Items
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function ItemCard({ item }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isItemFavorite = isFavorite(item.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Empêcher la navigation vers la page de détails
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <Link 
      to={`/item/${item.id}`}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-xl bg-background-light dark:bg-secondary-dark shadow-sm transition-all hover:shadow-xl will-change-auto"
    >
      {/* Favorite button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg transition-all hover:scale-110 active:scale-95"
        aria-label={isItemFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <span className={`material-symbols-outlined text-2xl transition-colors ${
          isItemFavorite 
            ? 'text-red-500 fill-1' 
            : 'text-text-muted-light dark:text-text-muted-dark'
        }`}>
          {isItemFavorite ? 'favorite' : 'favorite_border'}
        </span>
      </button>

      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full aspect-video object-cover"
      />
      <div className="p-4 pt-0">
        <p className="text-text-light dark:text-text-dark text-base font-bold leading-normal truncate">
          {item.title}
        </p>
        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
          {item.location}
        </p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-primary text-base font-bold leading-normal">
            ${item.price}/day
          </p>
          {item.rating && (
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-yellow-500">star</span>
              <span className="text-sm font-medium text-text-light dark:text-text-dark">
                {item.rating}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';
import { mockItems } from '../data/mockItems';

const categories = ["All", "Electronics", "Photography", "Gaming", "Sports", "Music", "Tools", "Vehicles"];
const sortOptions = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'recent', label: 'Recently Added' }
];

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [locationFilter, setLocationFilter] = useState('');
  const [minRating, setMinRating] = useState(0);
  const navigate = useNavigate();

  // Scroll vers le haut quand la page se charge
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Gérer les paramètres depuis l'URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      const formattedCategory = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      if (categories.includes(formattedCategory)) {
        setSelectedCategory(formattedCategory);
      }
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Fonction de filtrage complète
  const filteredItems = mockItems.filter(item => {
    // Filtre catégorie
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    
    // Filtre recherche (titre + description)
    const searchMatch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtre prix
    const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];
    
    // Filtre localisation
    const locationMatch = !locationFilter || 
      item.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    // Filtre rating
    const ratingMatch = item.rating >= minRating;
    
    return categoryMatch && searchMatch && priceMatch && locationMatch && ratingMatch;
  });

  // Fonction de tri
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
        return b.id - a.id; // Assuming higher ID = more recent
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 200]);
    setStartDate('');
    setEndDate('');
    setSearchQuery('');
    setLocationFilter('');
    setMinRating(0);
    setSortBy('relevance');
    navigate('/catalog');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      
      <main className="w-full mx-auto px-6 md:px-10 lg:px-20 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="sticky top-24 flex h-full flex-col justify-between bg-background-light dark:bg-secondary-dark p-6 rounded-lg shadow-sm">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col pb-4 border-b border-secondary-light dark:border-secondary-dark">
                  <h1 className="text-lg font-bold text-text-light dark:text-text-dark">Filters</h1>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Refine your search results</p>
                </div>
                
                {/* Category Filter */}
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold mb-2 text-text-light dark:text-text-dark">Category</h2>
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-text-light dark:text-text-dark">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability Calendar */}
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold mb-2 text-text-light dark:text-text-dark">Availability</h2>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-text-muted-light dark:text-text-muted-dark">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-text-muted-light dark:text-text-muted-dark">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    {startDate && endDate && (
                      <p className="text-xs text-primary font-medium">
                        {Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))} days selected
                      </p>
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold mb-2 text-text-light dark:text-text-dark">Price Range</h2>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-text-muted-light dark:text-text-muted-dark">Minimum</label>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/30"
                        placeholder="Min price"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-text-muted-light dark:text-text-muted-dark">Maximum</label>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/30"
                        placeholder="Max price"
                      />
                    </div>
                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                      ${priceRange[0]} - ${priceRange[1]} per day
                    </p>
                  </div>
                </div>

                {/* Location Filter */}
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold mb-2 text-text-light dark:text-text-dark">Location</h2>
                  <input
                    type="text"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    placeholder="e.g., Algiers, Oran"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                {/* Rating Filter */}
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold mb-2 text-text-light dark:text-text-dark">Minimum Rating</h2>
                  <div className="flex flex-col gap-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <div className="flex items-center gap-1">
                          {rating === 0 ? (
                            <span className="text-sm text-text-light dark:text-text-dark">All ratings</span>
                          ) : (
                            <>
                              <span className="text-sm text-text-light dark:text-text-dark">{rating}</span>
                              <span className="material-symbols-outlined text-sm text-yellow-500">star</span>
                              <span className="text-sm text-text-muted-light dark:text-text-muted-dark">& up</span>
                            </>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-2 px-4 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with search and sort */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
                    {selectedCategory === "All" ? "All Items" : selectedCategory}
                  </h1>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    {sortedItems.length} items available
                  </p>
                </div>
                
                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-text-muted-light dark:text-text-muted-dark whitespace-nowrap">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 text-sm rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-secondary-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/30"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search bar */}
              <div className="relative mb-4">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search items by title or description..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-secondary-dark text-text-light dark:text-text-dark placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                )}
              </div>

              {/* Active filters badges */}
              {(selectedCategory !== "All" || searchQuery || priceRange[0] > 0 || priceRange[1] < 200 || locationFilter || minRating > 0) && (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    Active filters:
                  </span>
                  {selectedCategory !== "All" && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory("All")}>
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery('')}>
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </span>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 200) && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                      ${priceRange[0]}-${priceRange[1]}
                      <button onClick={() => setPriceRange([0, 200])}>
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </span>
                  )}
                  {locationFilter && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                      📍 {locationFilter}
                      <button onClick={() => setLocationFilter('')}>
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </span>
                  )}
                  {minRating > 0 && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                      ⭐ {minRating}+ stars
                      <button onClick={() => setMinRating(0)}>
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Items grid */}
            {sortedItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedItems.map((item, index) => (
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
                <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark mb-4">
                  search_off
                </span>
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                  No items found
                </h3>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';
import { mockItems } from '../data/mockItems';

const categories = ["All", "Electronics", "Photography", "Gaming", "Sports", "Music", "Tools", "Vehicles"];

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  // Scroll vers le haut quand la page se charge
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Gérer le paramètre de catégorie depuis l'URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // Convertir photography -> Photography, etc.
      const formattedCategory = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      if (categories.includes(formattedCategory)) {
        setSelectedCategory(formattedCategory);
      }
    }
  }, [searchParams]);

  const filteredItems = mockItems.filter(item => 
    selectedCategory === "All" || item.category === selectedCategory
  );

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
                  </div>
                </div>

                <button className="w-full py-2 px-4 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
                {selectedCategory === "All" ? "All Items" : selectedCategory}
              </h1>
              <p className="text-text-muted-light dark:text-text-muted-dark">
                {filteredItems.length} items available
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ItemCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

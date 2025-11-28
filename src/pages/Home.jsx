import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import { mockItems } from '../data/mockItems';

export default function Home() {
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Show header search when scrolled past hero section (approximately 400px)
      setShowHeaderSearch(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query) => {
    if (query && query.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/catalog');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header hideSearch={!showHeaderSearch} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative container mx-auto px-4 py-16 sm:py-24 lg:py-32">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl mx-4">
            <img 
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&auto=format&fit=crop&q=80" 
              alt="Community sharing" 
              className="w-full h-full object-cover opacity-10 dark:opacity-20"
            />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-text-light dark:text-text-dark">
                {t('heroTitle')}
              </h1>
              <h2 className="max-w-2xl text-base sm:text-lg text-text-muted-light dark:text-text-muted-dark">
                {t('heroSubtitle')}
              </h2>
            </div>
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        {/* Recently Added Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-text-light dark:text-text-dark text-2xl font-bold tracking-tight mb-6">
            {t('recentlyAdded')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockItems.map((item, index) => (
              <div 
                key={item.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-text-light dark:text-text-dark text-2xl font-bold tracking-tight mb-6">
            {t('browseByCategory')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['electronics', 'vehicles', 'tools', 'sports', 'photography', 'music', 'gaming', 'other'].map((category, index) => (
              <Link
                key={category}
                to={`/catalog?category=${category}`}
                className="flex items-center justify-center h-24 rounded-xl bg-secondary-light dark:bg-secondary-dark cursor-pointer transition-all hover:shadow-lg hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="text-text-light dark:text-text-dark font-semibold">{t(category)}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

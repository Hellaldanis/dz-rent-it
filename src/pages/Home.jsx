import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';

const mockItems = [
  {
    id: 1,
    title: "DJI Mavic Air 2 Drone",
    location: "Algiers, Algeria",
    price: 45,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZpj8HtyK9pq__-wmGk05EZcjZbdjQqwCu2sF3taUmKcGEikZGzfmbXvGm1hXp5ttZEDg8majwXuJTnymQV9CeWLMxR8CI3x0bCsQx5UAg4rvPafNr9RZypAhwh5sWt-t-p-G5CQoW5sYyhSTBmO713hWW_B3rO2MbOJbhBOUqG6JC4y7GfRWOt9PTPMqtBMTQ9tK-VNXh3dmumHbhioy2WQdspE6GiNSx-FxXkwx7OormlVA9IW06qSS2Qf7B6NsRDI_KRn_5kCRN"
  },
  {
    id: 2,
    title: "Canon EOS R5 Camera",
    location: "Oran, Algeria",
    price: 85,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7HtuWaNVfNfn2484Fkukx-ArX3ZRk7om4gGiPZdMwWKDmIgejljz5pMawx6gm4HOLe27zpcR16f1yU0JwUOh9NCUC2cBUrBK4Ldj100Xz5Dhq3e5flbNHbVASfz-iGjOUJiDvV-l8nO_nO2bS7PtdTCCWt7DK01_qU0bBlAWBktPyfaAkOHBJzP1Cvg1R-qQxCHw18MwCJzR3i5aJDWMmdnZzOl6ejIyEngHOdNw16gxRWco0GHtUEdH0fRrka6fpGznScIGgRqHA"
  },
  {
    id: 3,
    title: "MacBook Pro 16-inch",
    location: "Constantine, Algeria",
    price: 60,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzEuPKamw9prGcV0OX94hF70ROG3uzShcR2Y0LKDDU1QzMLfattBAdP4aDc2EGR8W0lDW-wwvMZuEcuy_c6P8P7kh7oVIWSTxsVixCCmzGzhp8hTyT39KFYybUV2hhfhRoWaUBkuxsM38Pm5hSN21du5DYo75-xdB9fsdQdnv0i1THHJYmJmPcOyoMPBobd7HL1qrUJUpmS1a9yr0ImG99Ycyp8j4iPJHqx8l7fqA2e5PY-3q4W6-2XrOiCsH6U5_tIqu26CBUiewn"
  },
  {
    id: 4,
    title: "Gaming Console PS5",
    location: "Algiers, Algeria",
    price: 25,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7h_nvcBRl8c_HGz2XgB5eY4NHeKmWnGSPpiVvc_jcMaxovXpw8BNMXy6K8OGXoEdq46x7Oh6wOvLbcugxO4nf672BrR414vC8oR52RS8f0DWEEN-nQK5eZZBgnmTAS7E7pJsfSqPykoDTA8h7J3jA4ADu-55SjO56-F04PGqXmy-pCQSYDI9MpISZdmTa-__IrLnll3hAvcH8fZ_DTKne2Z9CI1veZH9joi1LNGlbyfEtDzWxz_35Jlh9obSoMF8uf0aTDZPTE9j2"
  },
  {
    id: 5,
    title: "Mountain Bike - Trek",
    location: "Annaba, Algeria",
    price: 15,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDy-l5toBkWti97DTmEftbV5cv3PTIyUroMg3AslXaKuO88eycDLbxbj0KYd6mSuqo2X3xKWbh3mM8K9AkoVf_bMwA1kPMUHG_g2gMiD1UydzrDbgt_OfpK-ZGfpC0tSBKTbMy4zF-qHXL6Mu2DSdtvOYmyEK5KMutw5QcpAnKDzAeG9p40eovq9gb3d6rC2DPep7IF_yK_JzpJHwwUNnxA8cvhfCTUYDEESGYw_WRg16bNa3ZRCuQs_zih-yxmJpoJFtbzAB9Q1ZYu"
  },
  {
    id: 6,
    title: "DJ Controller Pioneer",
    location: "Tlemcen, Algeria",
    price: 40,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1zAFpc_5vrtfAitbbkavTBUr0J6ldrvaQlOTLbAkFkebZut5VrKyLk9DjphZ6O7DsjO4jvWccGNUOq7dU0aZdM7xeknvCqmiOsdb_nHXGdkoXGuuYc7bvrOxgZZXbyV-ktSjknxJoIIl5OwOqBy123LJuxhU618MXUVGB5OJwzi7cZhJppxyqoQ1FAzrfekM1ndSJYrqmAXAgd7uodM4C-xvVNdfr_iB5vfpxoHdHzHCyoDXIZb_apDsoZJ_hveUdNJKgxInogjD7"
  },
  {
    id: 7,
    title: "Electric Scooter",
    location: "Algiers, Algeria",
    price: 20,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBbKb3ng9vIDUM2mSg48XLV_JFMRAQa_T-QbYjbNzv65eplHNGbPDvkEgJ9_CWoMjNocBFYRK9M6p6lmPzb6M7pydTKG74g6MM0SzwtyZ8wFHe6N88NI4S5iThJb_LnBcl5BCn49HMHA4WMheBkywUVmV9c0-ZJfURV1dJW6jUpJqKSCnS0OR7B7dxYclRECZlf6-MMVcM-FORTL9C0u4EFLWfbpGRdNGueh1DlvISF6yJJsJz6iOeOzApXiQ_gTiqLKx3v3cVyKmb"
  },
  {
    id: 8,
    title: "DSLR Camera Kit",
    location: "Oran, Algeria",
    price: 70,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC45IZEopj1c7Sv4duCahD6HWeQrrsaeIvRdIxcjyVU883D_aiGdjrHcoYWRzvmbw0OD4WuCN75gblnMUtqRdbdvoWTBO-0t3qkW3nEvKH_0w52q5dGz66j9A1YPq3xVPw6pBEa3iUO0YyVhGsjlVq5AeeURlHtFCDjy6hsIWL1I2Tq0ra1FBv0gfXwvYYyrAUnKPJZ9DrRU79AlIgsF9-k69q22kUGhwvCNHt1tqXwtl8Kn_lfQVg_tZW2MJZMApUdYRECGBI45z6D"
  }
];

export default function Home() {
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Show header search when scrolled past hero section (approximately 400px)
      setShowHeaderSearch(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Navigation vers la page catalog avec la recherche
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
              className="w-full h-full object-cover opacity-10 dark:opacity-5"
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
            {mockItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-text-light dark:text-text-dark text-2xl font-bold tracking-tight mb-6">
            {t('browseByCategory')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['electronics', 'vehicles', 'tools', 'sports', 'photography', 'music', 'gaming', 'other'].map((category) => (
              <Link
                key={category}
                to={`/catalog?category=${category}`}
                className="flex items-center justify-center h-24 rounded-xl bg-secondary-light dark:bg-secondary-dark cursor-pointer transition-all hover:shadow-lg hover:scale-105"
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

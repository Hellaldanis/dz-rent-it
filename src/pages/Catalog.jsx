import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';

const mockItems = [
  {
    id: 1,
    title: "DJI Mavic Air 2 Drone",
    location: "Algiers, Algeria",
    price: 45,
    category: "Electronics",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZpj8HtyK9pq__-wmGk05EZcjZbdjQqwCu2sF3taUmKcGEikZGzfmbXvGm1hXp5ttZEDg8majwXuJTnymQV9CeWLMxR8CI3x0bCsQx5UAg4rvPafNr9RZypAhwh5sWt-t-p-G5CQoW5sYyhSTBmO713hWW_B3rO2MbOJbhBOUqG6JC4y7GfRWOt9PTPMqtBMTQ9tK-VNXh3dmumHbhioy2WQdspE6GiNSx-FxXkwx7OormlVA9IW06qSS2Qf7B6NsRDI_KRn_5kCRN"
  },
  {
    id: 2,
    title: "Canon EOS R5 Camera",
    location: "Oran, Algeria",
    price: 85,
    category: "Photography",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7HtuWaNVfNfn2484Fkukx-ArX3ZRk7om4gGiPZdMwWKDmIgejljz5pMawx6gm4HOLe27zpcR16f1yU0JwUOh9NCUC2cBUrBK4Ldj100Xz5Dhq3e5flbNHbVASfz-iGjOUJiDvV-l8nO_nO2bS7PtdTCCWt7DK01_qU0bBlAWBktPyfaAkOHBJzP1Cvg1R-qQxCHw18MwCJzR3i5aJDWMmdnZzOl6ejIyEngHOdNw16gxRWco0GHtUEdH0fRrka6fpGznScIGgRqHA"
  },
  {
    id: 3,
    title: "MacBook Pro 16-inch",
    location: "Constantine, Algeria",
    price: 60,
    category: "Electronics",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzEuPKamw9prGcV0OX94hF70ROG3uzShcR2Y0LKDDU1QzMLfattBAdP4aDc2EGR8W0lDW-wwvMZuEcuy_c6P8P7kh7oVIWSTxsVixCCmzGzhp8hTyT39KFYybUV2hhfhRoWaUBkuxsM38Pm5hSN21du5DYo75-xdB9fsdQdnv0i1THHJYmJmPcOyoMPBobd7HL1qrUJUpmS1a9yr0ImG99Ycyp8j4iPJHqx8l7fqA2e5PY-3q4W6-2XrOiCsH6U5_tIqu26CBUiewn"
  },
  {
    id: 4,
    title: "Gaming Console PS5",
    location: "Algiers, Algeria",
    price: 25,
    category: "Gaming",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7h_nvcBRl8c_HGz2XgB5eY4NHeKmWnGSPpiVvc_jcMaxovXpw8BNMXy6K8OGXoEdq46x7Oh6wOvLbcugxO4nf672BrR414vC8oR52RS8f0DWEEN-nQK5eZZBgnmTAS7E7pJsfSqPykoDTA8h7J3jA4ADu-55SjO56-F04PGqXmy-pCQSYDI9MpISZdmTa-__IrLnll3hAvcH8fZ_DTKne2Z9CI1veZH9joi1LNGlbyfEtDzWxz_35Jlh9obSoMF8uf0aTDZPTE9j2"
  },
  {
    id: 5,
    title: "Mountain Bike - Trek",
    location: "Annaba, Algeria",
    price: 15,
    category: "Sports",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDy-l5toBkWti97DTmEftbV5cv3PTIyUroMg3AslXaKuO88eycDLbxbj0KYd6mSuqo2X3xKWbh3mM8K9AkoVf_bMwA1kPMUHG_g2gMiD1UydzrDbgt_OfpK-ZGfpC0tSBKTbMy4zF-qHXL6Mu2DSdtvOYmyEK5KMutw5QcpAnKDzAeG9p40eovq9gb3d6rC2DPep7IF_yK_JzpJHwwUNnxA8cvhfCTUYDEESGYw_WRg16bNa3ZRCuQs_zih-yxmJpoJFtbzAB9Q1ZYu"
  },
  {
    id: 6,
    title: "DJ Controller Pioneer",
    location: "Tlemcen, Algeria",
    price: 40,
    category: "Music",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1zAFpc_5vrtfAitbbkavTBUr0J6ldrvaQlOTLbAkFkebZut5VrKyLk9DjphZ6O7DsjO4jvWccGNUOq7dU0aZdM7xeknvCqmiOsdb_nHXGdkoXGuuYc7bvrOxgZZXbyV-ktSjknxJoIIl5OwOqBy123LJuxhU618MXUVGB5OJwzi7cZhJppxyqoQ1FAzrfekM1ndSJYrqmAXAgd7uodM4C-xvVNdfr_iB5vfpxoHdHzHCyoDXIZb_apDsoZJ_hveUdNJKgxInogjD7"
  }
];

const categories = ["All", "Electronics", "Photography", "Gaming", "Sports", "Music", "Tools", "Vehicles"];

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const navigate = useNavigate();

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

                {/* Price Range */}
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold mb-2 text-text-light dark:text-text-dark">Price Range</h2>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-20 px-2 py-1 text-sm rounded border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark"
                      placeholder="Min"
                    />
                    <span className="text-text-muted-light dark:text-text-muted-dark">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-20 px-2 py-1 text-sm rounded border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark"
                      placeholder="Max"
                    />
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
              {filteredItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

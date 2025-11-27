import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { mockItems } from '../data/mockItems';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll vers le haut quand la page se charge
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Trouver l'item correspondant à l'ID
  const item = mockItems.find(item => item.id === parseInt(id));

  // Si l'item n'existe pas, afficher une erreur
  if (!item) {
    return (
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4">
              Item not found
            </h1>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
              The item you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate('/catalog')}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90"
            >
              Back to Catalog
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      
      <main className="flex-1 px-4 md:px-10 py-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <h1 className="text-text-light dark:text-text-dark text-3xl md:text-4xl font-black leading-tight tracking-tight">
            {item.title}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Images */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div 
                className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-gray-200 dark:bg-gray-800 rounded-xl min-h-80 aspect-video"
                style={{ backgroundImage: `url("${item.image}")` }}
              />
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-xl bg-background-light dark:bg-secondary-dark p-6 shadow-lg">
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-4xl font-bold text-primary">${item.price}</p>
                    <p className="text-text-muted-light dark:text-text-muted-dark">per day</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">location_on</span>
                    <span className="text-text-light dark:text-text-dark">{item.location}</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-text-light dark:text-text-dark">Start Date</span>
                      <input 
                        type="date" 
                        className="form-input rounded-lg border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-text-light dark:text-text-dark">End Date</span>
                      <input 
                        type="date" 
                        className="form-input rounded-lg border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark"
                      />
                    </label>
                  </div>

                  <button className="w-full py-3 px-4 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity">
                    Request to Rent
                  </button>

                  <button className="w-full py-3 px-4 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary hover:text-white transition-all">
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">chat</span>
                      Message Owner
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Description</h2>
              <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                {item.description}
              </p>

              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-8 mb-4">Category</h2>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                {item.category}
              </div>
            </div>

            {/* Owner Info */}
            <div className="lg:col-span-1">
              <div className="rounded-xl bg-background-light dark:bg-secondary-dark p-6 shadow-sm">
                <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Owner</h2>
                <Link to={`/user/${item.owner.toLowerCase().replace(' ', '-').replace('.', '')}`}>
                  <div className="flex items-center gap-4 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                      {item.owner.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-text-light dark:text-text-dark">{item.owner}</p>
                      <div className="flex items-center gap-1 text-sm text-text-muted-light dark:text-text-muted-dark">
                        <span className="material-symbols-outlined text-yellow-500 text-base">star</span>
                        <span>{item.rating} ({item.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <button className="w-full py-2 px-4 border border-secondary-light dark:border-secondary-dark rounded-lg font-medium text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-gray-700 transition-colors">
                  Contact Owner
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

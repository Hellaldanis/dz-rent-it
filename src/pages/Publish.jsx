import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Publish() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Simuler le succès et rediriger
    alert(t('itemPublished') || 'Item published successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />

      <main className="flex flex-1 justify-center py-8 px-4 sm:py-12">
        <div className="w-full max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black tracking-tight text-text-light dark:text-text-dark sm:text-5xl">
              {t('listYourItem')}
            </h1>
          </div>

          <div className="rounded-xl bg-background-light dark:bg-secondary-dark p-6 shadow-lg sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Item Details Section */}
              <section>
                <h2 className="border-b border-secondary-light dark:border-secondary-dark pb-3 text-2xl font-bold text-text-light dark:text-text-dark">
                  {t('itemDetails')}
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6">
                  <label className="flex flex-col">
                    <p className="pb-2 text-base font-medium text-text-light dark:text-text-dark">{t('title')}</p>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-input h-12 px-4 text-base rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
                      placeholder={t('whatAreYouRenting')}
                      type="text"
                    />
                  </label>

                  <label className="flex flex-col">
                    <p className="pb-2 text-base font-medium text-text-light dark:text-text-dark">{t('description')}</p>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-input min-h-32 px-4 py-3 text-base rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
                      placeholder={t('describeYourItem')}
                    />
                  </label>

                  <label className="flex flex-col">
                    <p className="pb-2 text-base font-medium text-text-light dark:text-text-dark">{t('category')}</p>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-input h-12 px-4 text-base rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
                    >
                      <option value="">{t('selectCategory')}</option>
                      <option value="electronics">{t('electronics')}</option>
                      <option value="photography">{t('photography')}</option>
                      <option value="gaming">{t('gaming')}</option>
                      <option value="sports">{t('sports')}</option>
                      <option value="music">{t('music')}</option>
                      <option value="tools">{t('tools')}</option>
                      <option value="vehicles">{t('vehicles')}</option>
                      <option value="other">{t('other')}</option>
                    </select>
                  </label>
                </div>
              </section>

              {/* Pricing Section */}
              <section>
                <h2 className="border-b border-secondary-light dark:border-secondary-dark pb-3 text-2xl font-bold text-text-light dark:text-text-dark">
                  {t('pricing')}
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6">
                  <label className="flex flex-col">
                    <p className="pb-2 text-base font-medium text-text-light dark:text-text-dark">{t('dailyRate')}</p>
                    <input
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="form-input h-12 px-4 text-base rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
                      placeholder="e.g., 5000"
                      type="number"
                    />
                  </label>
                </div>
              </section>

              {/* Location Section */}
              <section>
                <h2 className="border-b border-secondary-light dark:border-secondary-dark pb-3 text-2xl font-bold text-text-light dark:text-text-dark">
                  {t('location')}
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6">
                  <label className="flex flex-col">
                    <p className="pb-2 text-base font-medium text-text-light dark:text-text-dark">{t('city')}</p>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="form-input h-12 px-4 text-base rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
                      placeholder="e.g., Algiers"
                      type="text"
                    />
                  </label>
                </div>
              </section>

              {/* Photos Section */}
              <section>
                <h2 className="border-b border-secondary-light dark:border-secondary-dark pb-3 text-2xl font-bold text-text-light dark:text-text-dark">
                  Photos
                </h2>
                <div className="mt-6">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-secondary-light dark:border-secondary-dark rounded-lg cursor-pointer bg-background-light dark:bg-background-dark hover:bg-secondary-light dark:hover:bg-gray-800 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="material-symbols-outlined text-5xl text-text-muted-light dark:text-text-muted-dark mb-3">
                          cloud_upload
                        </span>
                        <p className="mb-2 text-sm text-text-light dark:text-text-dark">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                          PNG, JPG or WEBP (MAX. 10MB)
                        </p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" multiple />
                    </label>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex-1 h-12 px-6 rounded-lg border-2 border-secondary-light dark:border-secondary-dark text-text-light dark:text-text-dark font-bold hover:bg-secondary-light dark:hover:bg-gray-800 transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="flex-1 h-12 px-6 rounded-lg bg-primary text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Publish Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

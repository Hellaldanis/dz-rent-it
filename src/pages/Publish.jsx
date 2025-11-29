import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AvailabilityCalendar from '../components/AvailabilityCalendar';

export default function Publish() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: ''
  });
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [availableDates, setAvailableDates] = useState({ start: null, end: null });
  const [showCalendar, setShowCalendar] = useState(false);
  const MAX_IMAGES = 5;

  const handleDateSelect = (dates) => {
    setAvailableDates(dates);
    toast.success(`Availability set: ${dates.start.toLocaleDateString()} - ${dates.end.toLocaleDateString()}`);
  };

  // Load draft when navigating from dashboard edit action
  useEffect(() => {
    if (location.state && location.state.draft) {
      const d = location.state.draft;
      setFormData({
        title: d.title || '',
        description: d.description || '',
        category: d.category || '',
        price: d.price || '',
        location: d.location || ''
      });
      setImages(d.images || []);
      setAvailableDates(d.availableDates || { start: null, end: null });
      toast.success('Draft loaded for editing');
    }
  }, [location.state]);

  const handleSaveDraft = () => {
    if (!formData.title) {
      toast.error('Please enter a title to save draft');
      return;
    }
    
    const draft = {
      ...formData,
      images,
      availableDates,
      status: 'draft',
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const drafts = JSON.parse(localStorage.getItem('itemDrafts') || '[]');
    drafts.push(draft);
    localStorage.setItem('itemDrafts', JSON.stringify(drafts));
    
    toast.success('Draft saved successfully!');
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (files) => {
    const fileArray = Array.from(files);
    
    if (images.length + fileArray.length > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    fileArray.forEach(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(`${file.name} is too large (max 5MB)`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          file,
          preview: e.target.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    console.log('Form submitted:', formData, 'Images:', images);
    toast.success(t('itemPublished') || 'Item published successfully!');
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
                  {t('photos')} ({images.length}/{MAX_IMAGES})
                </h2>
                <div className="mt-6 space-y-4">
                  {/* Drop Zone */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`flex items-center justify-center w-full transition-colors ${
                      isDragging 
                        ? 'border-primary bg-primary/10' 
                        : 'border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark hover:bg-secondary-light dark:hover:bg-gray-800'
                    }`}
                  >
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="material-symbols-outlined text-5xl text-text-muted-light dark:text-text-muted-dark mb-3">
                          {isDragging ? 'file_download' : 'cloud_upload'}
                        </span>
                        <p className="mb-2 text-sm text-text-light dark:text-text-dark">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                          PNG, JPG or WEBP (MAX. 5MB per image)
                        </p>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
                          Maximum {MAX_IMAGES} images
                        </p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => handleImageUpload(e.target.files)}
                        disabled={images.length >= MAX_IMAGES}
                      />
                    </label>
                  </div>

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image) => (
                        <div 
                          key={image.id} 
                          className="relative group rounded-lg overflow-hidden border-2 border-secondary-light dark:border-secondary-dark"
                        >
                          <img 
                            src={image.preview} 
                            alt={image.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              aria-label="Remove image"
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 truncate">
                            {image.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Availability Section */}
              <section>
                <h2 className="border-b border-secondary-light dark:border-secondary-dark pb-3 text-2xl font-bold text-text-light dark:text-text-dark">
                  Availability (Optional)
                </h2>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-secondary-light dark:border-secondary-dark text-text-light dark:text-text-dark font-medium hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors flex items-center justify-between"
                  >
                    <span>
                      {availableDates.start && availableDates.end
                        ? `${availableDates.start.toLocaleDateString()} - ${availableDates.end.toLocaleDateString()}`
                        : 'Set Available Dates'}
                    </span>
                    <span className="material-symbols-outlined">
                      {showCalendar ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  
                  {showCalendar && (
                    <div className="mt-4 p-4 bg-secondary-light dark:bg-secondary-dark rounded-lg">
                      <AvailabilityCalendar 
                        bookedDates={[]}
                        onDateSelect={handleDateSelect}
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleSaveDraft}
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

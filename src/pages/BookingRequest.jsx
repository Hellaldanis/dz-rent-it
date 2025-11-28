import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BookingRequest() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  
  const { item, startDate, endDate, totalDays } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    paymentMethod: 'card'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect if no item data
    if (!item) {
      navigate('/catalog');
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  }, [item, isAuthenticated, navigate, location]);

  if (!item) return null;

  const totalPrice = (item.price * totalDays).toFixed(2);
  const serviceFee = (totalPrice * 0.1).toFixed(2);
  const grandTotal = (parseFloat(totalPrice) + parseFloat(serviceFee)).toFixed(2);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      navigate('/booking-confirmation', {
        state: {
          item,
          startDate,
          endDate,
          totalDays,
          totalPrice: grandTotal,
          bookingId: 'BKG-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          ...formData
        }
      });
    }, 2000);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />

      <main className="flex-1 px-4 md:px-10 py-8 max-w-6xl mx-auto w-full">
        <div className="mb-6">
          <Link to={`/item/${item.id}`} className="text-primary hover:underline flex items-center gap-2">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to item
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8">
          Complete Your Booking
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-background-light dark:bg-secondary-dark rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+213 555 123 456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                      Message to Owner (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 rounded-lg border border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Let the owner know about your rental needs..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-background-light dark:bg-secondary-dark rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors border-secondary-light dark:border-secondary-dark hover:border-primary">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="material-symbols-outlined text-primary">credit_card</span>
                    <span className="text-text-light dark:text-text-dark font-medium">Credit/Debit Card</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors border-secondary-light dark:border-secondary-dark hover:border-primary">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="material-symbols-outlined text-primary">payments</span>
                    <span className="text-text-light dark:text-text-dark font-medium">Pay on Pickup</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors border-secondary-light dark:border-secondary-dark hover:border-primary">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="material-symbols-outlined text-primary">account_balance</span>
                    <span className="text-text-light dark:text-text-dark font-medium">Bank Transfer</span>
                  </label>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/40 rounded-xl p-4">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">info</span>
                  <div className="text-sm text-text-light dark:text-text-dark">
                    <p className="font-semibold mb-1">Cancellation Policy</p>
                    <p className="text-text-muted-light dark:text-text-muted-dark">
                      Free cancellation up to 24 hours before rental start time. 
                      Service fee is non-refundable.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">check_circle</span>
                    Confirm Booking
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-background-light dark:bg-secondary-dark rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">
                Booking Summary
              </h2>

              {/* Item Info */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-secondary-light dark:border-secondary-dark">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-text-light dark:text-text-dark truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    {item.location}
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-3 mb-6 pb-6 border-b border-secondary-light dark:border-secondary-dark">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <div className="flex-1">
                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Check-in</p>
                    <p className="font-medium text-text-light dark:text-text-dark">{startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <div className="flex-1">
                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Check-out</p>
                    <p className="font-medium text-text-light dark:text-text-dark">{endDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <div className="flex-1">
                    <p className="font-medium text-text-light dark:text-text-dark">
                      {totalDays} {totalDays === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-text-light dark:text-text-dark">
                  <span>${item.price} × {totalDays} days</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-text-light dark:text-text-dark">
                  <span>Service fee (10%)</span>
                  <span>${serviceFee}</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-6 border-t-2 border-secondary-light dark:border-secondary-dark">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-text-light dark:text-text-dark">Total</span>
                  <span className="text-2xl font-bold text-primary">${grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

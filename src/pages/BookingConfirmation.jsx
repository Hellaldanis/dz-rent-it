import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  const { 
    item, 
    startDate, 
    endDate, 
    totalDays, 
    totalPrice, 
    bookingId,
    fullName,
    email,
    phone,
    paymentMethod
  } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect if no booking data
    if (!item || !bookingId) {
      navigate('/catalog');
    }
  }, [item, bookingId, navigate]);

  if (!item) return null;

  const getPaymentMethodName = (method) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'cash':
        return 'Pay on Pickup';
      case 'bank':
        return 'Bank Transfer';
      default:
        return method;
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />

      <main className="flex-1 px-4 md:px-10 py-8 max-w-4xl mx-auto w-full">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
            <span className="material-symbols-outlined text-5xl text-green-600 dark:text-green-400">
              check_circle
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-2">
            Booking Request Sent!
          </h1>
          <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
            Your rental request has been submitted successfully
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-background-light dark:bg-secondary-dark rounded-xl p-6 md:p-8 shadow-lg mb-6">
          {/* Booking ID */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-secondary-light dark:border-secondary-dark">
            <div>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-1">
                Booking Reference
              </p>
              <p className="text-2xl font-bold text-primary font-mono">
                {bookingId}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 rounded-full text-sm font-bold">
                Pending Approval
              </span>
            </div>
          </div>

          {/* Item Details */}
          <div className="mb-6 pb-6 border-b border-secondary-light dark:border-secondary-dark">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">
              Item Details
            </h2>
            <div className="flex gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-1">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark text-sm">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  <span>{item.location}</span>
                </div>
                <p className="text-primary font-bold mt-2">
                  ${item.price}/day
                </p>
              </div>
            </div>
          </div>

          {/* Rental Period */}
          <div className="mb-6 pb-6 border-b border-secondary-light dark:border-secondary-dark">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">
              Rental Period
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">event</span>
                <div>
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Start Date</p>
                  <p className="font-bold text-text-light dark:text-text-dark">{startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">event</span>
                <div>
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark">End Date</p>
                  <p className="font-bold text-text-light dark:text-text-dark">{endDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
                <div>
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Duration</p>
                  <p className="font-bold text-text-light dark:text-text-dark">
                    {totalDays} {totalDays === 1 ? 'day' : 'days'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6 pb-6 border-b border-secondary-light dark:border-secondary-dark">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">
              Contact Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">person</span>
                <span className="text-text-light dark:text-text-dark">{fullName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">email</span>
                <span className="text-text-light dark:text-text-dark">{email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">phone</span>
                <span className="text-text-light dark:text-text-dark">{phone}</span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-6 pb-6 border-b border-secondary-light dark:border-secondary-dark">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">
              Payment Details
            </h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-text-light dark:text-text-dark">Payment Method</span>
              <span className="font-bold text-text-light dark:text-text-dark">
                {getPaymentMethodName(paymentMethod)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-text-light dark:text-text-dark">Total Amount</span>
              <span className="text-2xl font-bold text-primary">${totalPrice}</span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/40 rounded-lg p-4">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
              <div>
                <h3 className="font-bold text-text-light dark:text-text-dark mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-text-muted-light dark:text-text-muted-dark">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">1.</span>
                    <span>The owner will review your booking request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">2.</span>
                    <span>You will receive a notification once they respond</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">3.</span>
                    <span>If approved, you will receive pickup instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">4.</span>
                    <span>Payment will be processed according to the selected method</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Go to Dashboard
          </Link>
          <Link
            to="/messages"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">chat</span>
            Message Owner
          </Link>
          <Link
            to="/catalog"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="material-symbols-outlined">search</span>
            Browse More Items
          </Link>
        </div>

        {/* Confirmation Email Notice */}
        <div className="text-center mt-8 text-sm text-text-muted-light dark:text-text-muted-dark">
          <p>A confirmation email has been sent to <span className="font-bold text-text-light dark:text-text-dark">{email}</span></p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ItemDetailSkeleton } from '../components/Skeleton';
import ReviewsSection from '../components/ReviewsSection';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import { mockItems } from '../data/mockItems.js';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'owner',
      text: 'Hello! Thanks for your interest in my item. Feel free to ask any questions!',
      time: '10:30 AM'
    }
  ]);
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Trouver l'item correspondant à l'ID
  const item = mockItems.find(item => item.id === parseInt(id));

  // Scroll vers le haut quand la page se charge
  useEffect(() => {
    window.scrollTo(0, 0);
    // Simuler un chargement minimal
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [id]);

  // Restaurer les dates de location après connexion
  useEffect(() => {
    if (user) {
      const pendingRental = sessionStorage.getItem('pendingRental');
      if (pendingRental) {
        const { startDate: savedStart, endDate: savedEnd, itemId } = JSON.parse(pendingRental);
        if (itemId === id) {
          setStartDate(savedStart);
          setEndDate(savedEnd);
          sessionStorage.removeItem('pendingRental');
          
          // Déclencher automatiquement la réservation
          setTimeout(() => {
            const startDate = new Date(savedStart);
            const endDate = new Date(savedEnd);
            const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            
            navigate('/booking-request', {
              state: {
                item,
                startDate: savedStart,
                endDate: savedEnd,
                totalDays
              }
            });
          }, 500);
        }
      }
    }
  }, [user, id, item, navigate]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mock reviews for the item
  const itemReviews = [
    {
      id: 1,
      userName: 'Sarah M.',
      userAvatar: 'S',
      rating: 5,
      comment: 'Excellent quality! The item was exactly as described. The owner was very responsive and helpful.',
      date: '2 days ago',
      helpful: 12
    },
    {
      id: 2,
      userName: 'Karim L.',
      userAvatar: 'K',
      rating: 4,
      comment: 'Good experience overall. Item was in great condition. Would rent again!',
      date: '1 week ago',
      helpful: 8
    },
    {
      id: 3,
      userName: 'Yasmine B.',
      userAvatar: 'Y',
      rating: 5,
      comment: 'Perfect! Communication was smooth and the item exceeded my expectations.',
      date: '2 weeks ago',
      helpful: 15
    }
  ];

  const [reviewFilter, setReviewFilter] = useState('all'); // all, 5, 4, 3, 2, 1
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const filteredReviews = reviewFilter === 'all' 
    ? itemReviews 
    : itemReviews.filter(review => review.rating === parseInt(reviewFilter));

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('Review submitted:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '' });
    alert('Review submitted successfully!');
  };

  const openMessageModal = () => {
    // Vérifier si l'utilisateur est connecté
    if (!user) {
      navigate('/login', { state: { returnUrl: location.pathname } });
      return;
    }
    setShowMessageModal(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      const newUserMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newUserMessage]);
      setMessage('');

      // Simulate owner response after 2 seconds
      setTimeout(() => {
        const ownerResponses = [
          "Thanks for your message! I will get back to you shortly.",
          "Sure, that sounds good! When would you like to rent it?",
          "Yes, the item is available for those dates!",
          "Let me check and I will confirm the availability.",
          "Great! Feel free to ask if you have more questions."
        ];
        const randomResponse = ownerResponses[Math.floor(Math.random() * ownerResponses.length)];
        
        const newOwnerMessage = {
          id: messages.length + 2,
          sender: 'owner',
          text: randomResponse,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newOwnerMessage]);
      }, 2000);
    }
  };

  const handleRentRequest = () => {
    // Valider les dates d'abord
    if (!startDate || !endDate) {
      alert('Please select start and end dates for your rental.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      alert('Start date cannot be in the past.');
      return;
    }

    if (end <= start) {
      alert('End date must be after start date.');
      return;
    }

    // Vérifier si l'utilisateur est connecté
    if (!user) {
      // Sauvegarder les dates validées avant de rediriger
      sessionStorage.setItem('pendingRental', JSON.stringify({ startDate, endDate, itemId: id }));
      navigate('/login', { state: { returnUrl: location.pathname } });
      return;
    }

    // Calculer les jours (dates déjà validées)
    const startDateForCalc = new Date(startDate);
    const endDateForCalc = new Date(endDate);
    const totalDays = Math.ceil((endDateForCalc - startDateForCalc) / (1000 * 60 * 60 * 24));

    navigate('/booking-request', {
      state: {
        item,
        startDate,
        endDate,
        totalDays
      }
    });
  };

  // Si l'item n'existe pas, afficher une erreur
  if (isLoading) {
    return (
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <ItemDetailSkeleton />
        <Footer />
      </div>
    );
  }

  // Vérifier si l'ID est valide
  if (isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return (
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4">
              Invalid Item ID
            </h1>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
              The item ID you provided is not valid.
            </p>
            <button
              onClick={() => navigate('/catalog')}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90"
            >
              Browse Catalog
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        aria-label="Select rental start date"
                        aria-required="true"
                        className="form-input rounded-lg border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-text-light dark:text-text-dark">End Date</span>
                      <input 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        aria-label="Select rental end date"
                        aria-required="true"
                        className="form-input rounded-lg border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark"
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full py-2 px-4 border-2 border-secondary-light dark:border-secondary-dark text-text-light dark:text-text-dark rounded-lg font-medium hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">calendar_month</span>
                    {showCalendar ? 'Hide Calendar' : 'View Availability Calendar'}
                  </button>

                  {showCalendar && (
                    <div className="p-4 bg-secondary-light dark:bg-secondary-dark rounded-lg">
                      <AvailabilityCalendar
                        bookedDates={[
                          new Date(2024, 11, 10),
                          new Date(2024, 11, 11),
                          new Date(2024, 11, 12),
                          new Date(2024, 11, 20),
                          new Date(2024, 11, 21)
                        ]}
                        onDateSelect={(dates) => {
                          setStartDate(dates.start.toISOString().split('T')[0]);
                          setEndDate(dates.end.toISOString().split('T')[0]);
                          setShowCalendar(false);
                        }}
                      />
                    </div>
                  )}

                  <button 
                    onClick={handleRentRequest}
                    aria-label="Request to rent this item"
                    className="w-full py-3 px-4 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Request to Rent
                  </button>

                  <button 
                    onClick={openMessageModal}
                    aria-label="Send a message to the item owner"
                    className="w-full py-3 px-4 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
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
                <button 
                  onClick={openMessageModal}
                  className="w-full py-2 px-4 border border-secondary-light dark:border-secondary-dark rounded-lg font-medium text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-gray-700 transition-colors"
                >
                  Contact Owner
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
                Reviews ({itemReviews.length})
              </h2>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Write a Review
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <div className="mb-8 p-6 rounded-xl bg-background-light dark:bg-secondary-dark border border-secondary-light dark:border-gray-700">
                <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Share Your Experience</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="focus:outline-none"
                        >
                          <span className={`material-symbols-outlined text-3xl transition-colors ${
                            star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                          }`}>
                            star
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows="4"
                      placeholder="Share your experience with this item..."
                      className="w-full px-4 py-3 rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/30"
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-6 py-2 border border-secondary-light dark:border-secondary-dark rounded-lg font-medium text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Filter Reviews */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  reviewFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                All Reviews
              </button>
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => setReviewFilter(star.toString())}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                    reviewFilter === star.toString()
                      ? 'bg-primary text-white'
                      : 'bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{star}</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                </button>
              ))}
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 rounded-xl bg-background-light dark:bg-secondary-dark border border-secondary-light dark:border-gray-700"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                        {review.userAvatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-bold text-text-light dark:text-text-dark">{review.userName}</p>
                            <p className="text-xs text-text-muted-light dark:text-text-muted-dark">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i} className="material-symbols-outlined text-yellow-500 text-lg">star</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-text-light dark:text-text-dark mb-3">{review.comment}</p>
                        <button className="flex items-center gap-1 text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-base">thumb_up</span>
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    No reviews with this rating yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Message Modal - Chat Interface */}
      {showMessageModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="message-modal-title"
        >
          <div className="bg-background-light dark:bg-secondary-dark rounded-2xl shadow-2xl max-w-2xl w-full h-[600px] flex flex-col animate-fade-in-up">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-secondary-light dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {item.owner.charAt(0)}
                </div>
                <div>
                  <p id="message-modal-title" className="font-semibold text-text-light dark:text-text-dark">{item.owner}</p>
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Usually replies in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setShowMessageModal(false)}
                aria-label="Close message modal"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary-light dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <span className="material-symbols-outlined text-text-light dark:text-text-dark">close</span>
              </button>
            </div>

            {/* Item Info Bar */}
            <div className="p-3 bg-secondary-light dark:bg-background-dark border-b border-secondary-light dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url("${item.image}")` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-light dark:text-text-dark truncate">{item.title}</p>
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark">${item.price}/day</p>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                      msg.sender === 'user' ? 'bg-blue-500' : 'bg-primary'
                    }`}>
                      {msg.sender === 'user' ? 'Y' : item.owner.charAt(0)}
                    </div>
                    <div>
                      <div className={`rounded-2xl px-4 py-2 ${
                        msg.sender === 'user' 
                          ? 'bg-blue-500 text-white rounded-tr-sm' 
                          : 'bg-secondary-light dark:bg-gray-700 text-text-light dark:text-text-dark rounded-tl-sm'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <p className={`text-xs text-text-muted-light dark:text-text-muted-dark mt-1 ${
                        msg.sender === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-secondary-light dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-full border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-12 h-12 bg-primary text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center flex-shrink-0"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
              <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-2 text-center">
                💡 This is a demo chat - responses are simulated
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <ReviewsSection itemId={id} />
      </div>

      <Footer />
    </div>
  );
}

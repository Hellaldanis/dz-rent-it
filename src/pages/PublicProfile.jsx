import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { mockItems } from '../data/mockItems';

// Mock user data
const mockUsers = {
  'ahmed-k': {
    id: 'ahmed-k',
    name: 'Ahmed K.',
    joinDate: 'January 2023',
    location: 'Algiers, Algeria',
    rating: 4.8,
    totalReviews: 24,
    itemsRented: 89,
    bio: 'Photography enthusiast and tech lover. I take great care of my equipment and expect the same from renters.',
    reviews: [
      { id: 1, author: 'Sarah M.', rating: 5, date: '2 weeks ago', comment: 'Great experience! Ahmed was very responsive and the drone was in perfect condition.' },
      { id: 2, author: 'Karim L.', rating: 4, date: '1 month ago', comment: 'Good communication, item as described. Would rent again!' },
      { id: 3, author: 'Nadia Z.', rating: 5, date: '2 months ago', comment: 'Professional and reliable. Highly recommended!' },
    ]
  },
  'sarah-m': {
    id: 'sarah-m',
    name: 'Sarah M.',
    joinDate: 'March 2023',
    location: 'Oran, Algeria',
    rating: 4.9,
    totalReviews: 31,
    itemsRented: 120,
    bio: 'Professional photographer with high-end equipment for rent. Quality and reliability guaranteed.',
    reviews: [
      { id: 1, author: 'Yacine B.', rating: 5, date: '1 week ago', comment: 'Amazing camera quality! Sarah was super helpful.' },
      { id: 2, author: 'Lina R.', rating: 5, date: '3 weeks ago', comment: 'Professional service, excellent equipment!' },
    ]
  }
};

export default function PublicProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [userId]);

  const user = mockUsers[userId];

  if (!user) {
    return (
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4">
              User not found
            </h1>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90"
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const userItems = mockItems.filter(item => 
    item.owner.toLowerCase().replace(' ', '-').replace('.', '') === userId
  );

  const handleSubmitReview = (e) => {
    e.preventDefault();
    alert('Review submitted successfully! (This is a demo)');
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      
      <main className="flex-1 px-4 md:px-10 py-8 max-w-7xl mx-auto w-full">
        {/* User Header */}
        <div className="bg-background-light dark:bg-secondary-dark rounded-xl p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
                {user.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-yellow-500">star</span>
                  <span className="font-semibold text-text-light dark:text-text-dark">
                    {user.rating}
                  </span>
                  <span className="text-text-muted-light dark:text-text-muted-dark">
                    ({user.totalReviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-text-muted-light dark:text-text-muted-dark">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  <span>{user.location}</span>
                </div>
                
                <div className="flex items-center gap-1 text-text-muted-light dark:text-text-muted-dark">
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  <span>Joined {user.joinDate}</span>
                </div>
              </div>
              
              <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
                {user.bio}
              </p>

              {/* User Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {user.rating >= 4.8 && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-medium">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span>5 Stars Host</span>
                  </div>
                )}
                {user.itemsRented >= 10 && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    <span>Top Renter</span>
                  </div>
                )}
                {userItems.length >= 5 && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>Verified Owner</span>
                  </div>
                )}
                {user.joinDate.includes('2024') && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-medium">
                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    <span>Early Adopter</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="font-bold text-text-light dark:text-text-dark">{userItems.length}</span>
                  <span className="text-text-muted-light dark:text-text-muted-dark ml-1">items listed</span>
                </div>
                <div>
                  <span className="font-bold text-text-light dark:text-text-dark">{user.itemsRented}</span>
                  <span className="text-text-muted-light dark:text-text-muted-dark ml-1">successful rentals</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Leave a Review
            </button>
          </div>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="bg-background-light dark:bg-secondary-dark rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">
              Write a Review
            </h2>
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
                      <span 
                        className={`material-symbols-outlined text-3xl transition-colors ${
                          star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                        }`}
                      >
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
                  className="w-full px-4 py-3 rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-2 focus:ring-primary/30"
                  rows="4"
                  placeholder="Share your experience..."
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-2 border border-secondary-light dark:border-secondary-dark rounded-lg font-medium text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Items Listed */}
        {userItems.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
              Items Listed ({userItems.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/item/${item.id}`)}
                  className="cursor-pointer group"
                >
                  <div className="rounded-xl overflow-hidden bg-secondary-light dark:bg-secondary-dark shadow-sm hover:shadow-lg transition-shadow">
                    <div 
                      className="w-full aspect-video bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url("${item.image}")` }}
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-text-light dark:text-text-dark mb-2 line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold">${item.price}/day</span>
                        <span className="text-sm text-text-muted-light dark:text-text-muted-dark">
                          {item.location.split(',')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div>
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
            Reviews ({user.reviews.length})
          </h2>
          <div className="space-y-4">
            {user.reviews.map(review => (
              <div
                key={review.id}
                className="bg-background-light dark:bg-secondary-dark rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-text-light dark:text-text-dark">
                        {review.author}
                      </p>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`material-symbols-outlined text-lg ${
                          i < review.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                        }`}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-text-light dark:text-text-dark">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

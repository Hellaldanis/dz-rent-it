import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function ReviewsSection({ itemId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userId: 'user1',
      userName: 'Sarah Ahmed',
      userAvatar: '👩',
      rating: 5,
      date: '2024-11-20',
      comment: 'Excellent experience! The item was exactly as described and the owner was very helpful.',
      helpful: 12,
      unhelpful: 1,
      verified: true
    },
    {
      id: 2,
      userId: 'user2',
      userName: 'Karim Benali',
      userAvatar: '👨',
      rating: 4,
      date: '2024-11-15',
      comment: 'Good quality product. Pickup was easy and smooth. Would rent again.',
      helpful: 8,
      unhelpful: 0,
      verified: true
    },
    {
      id: 3,
      userId: 'user3',
      userName: 'Amina Khelif',
      userAvatar: '👩‍💼',
      rating: 5,
      date: '2024-11-10',
      comment: 'Perfect condition, great communication. Highly recommend!',
      helpful: 15,
      unhelpful: 0,
      verified: true
    },
    {
      id: 4,
      userId: 'user4',
      userName: 'Mohamed Larbi',
      userAvatar: '👨‍💻',
      rating: 3,
      date: '2024-11-05',
      comment: 'Item was okay, but had some minor issues not mentioned in description.',
      helpful: 4,
      unhelpful: 2,
      verified: false
    }
  ]);
  
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [helpfulClicked, setHelpfulClicked] = useState({});

  // Calculate rating statistics
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length * 100).toFixed(0)
  }));

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    if (filterRating === 'all') return true;
    return review.rating === parseInt(filterRating);
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to leave a review');
      return;
    }

    if (newReview.comment.trim().length < 10) {
      toast.error('Review must be at least 10 characters');
      return;
    }

    const review = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar || '👤',
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      helpful: 0,
      unhelpful: 0,
      verified: true
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
    toast.success('Review submitted successfully!');
  };

  const handleHelpful = (reviewId, isHelpful) => {
    const key = `${reviewId}-${isHelpful}`;
    
    if (helpfulClicked[key]) {
      toast.error('You already voted on this review');
      return;
    }

    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          helpful: isHelpful ? review.helpful + 1 : review.helpful,
          unhelpful: !isHelpful ? review.unhelpful + 1 : review.unhelpful
        };
      }
      return review;
    }));

    setHelpfulClicked({ ...helpfulClicked, [key]: true });
    toast.success('Thank you for your feedback!');
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`material-symbols-outlined text-sm ${
              star <= rating ? 'text-yellow-500' : 'text-secondary-light dark:text-secondary-dark'
            }`}
            style={{ fontVariationSettings: star <= rating ? '"FILL" 1' : '"FILL" 0' }}
          >
            star
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
          Reviews
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
        <div className="p-6 bg-secondary-light dark:bg-secondary-dark rounded-xl">
          <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">
            Share your experience
          </h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Rating selector */}
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="transition-transform hover:scale-110"
                  >
                    <span
                      className={`material-symbols-outlined text-3xl ${
                        star <= newReview.rating ? 'text-yellow-500' : 'text-secondary-light dark:text-background-dark'
                      }`}
                      style={{ fontVariationSettings: star <= newReview.rating ? '"FILL" 1' : '"FILL" 0' }}
                    >
                      star
                    </span>
                  </button>
                ))}
                <span className="ml-2 text-text-light dark:text-text-dark font-medium">
                  {newReview.rating}/5
                </span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your experience with this item..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark focus:border-primary focus:ring-2 focus:ring-primary/30"
                required
                minLength={10}
              />
              <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
                Minimum 10 characters
              </p>
            </div>

            {/* Actions */}
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
                className="px-6 py-2 border-2 border-secondary-light dark:border-secondary-dark text-text-light dark:text-text-dark rounded-lg font-medium hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Rating Overview */}
      <div className="p-6 bg-secondary-light dark:bg-secondary-dark rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Average rating */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-5xl font-black text-text-light dark:text-text-dark mb-2">
              {avgRating}
            </div>
            <div className="flex items-center gap-1 mb-2">
              {renderStars(Math.round(avgRating))}
            </div>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Based on {reviews.length} reviews
            </p>
          </div>

          {/* Right: Rating breakdown */}
          <div className="space-y-2">
            {ratingCounts.map(({ rating, count, percentage }) => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating.toString())}
                className="w-full flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <span className="text-sm text-text-light dark:text-text-dark font-medium w-8">
                  {rating}★
                </span>
                <div className="flex-1 h-2 bg-secondary-light dark:bg-background-dark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-text-muted-light dark:text-text-muted-dark w-12 text-right">
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-muted-light dark:text-text-muted-dark">
            Filter:
          </label>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-secondary-dark text-text-light dark:text-text-dark"
          >
            <option value="all">All ratings</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-text-muted-light dark:text-text-muted-dark">
            Sort:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-lg border border-secondary-light dark:border-secondary-dark bg-background-light dark:bg-secondary-dark text-text-light dark:text-text-dark"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>

        <div className="ml-auto text-sm text-text-muted-light dark:text-text-muted-dark">
          Showing {sortedReviews.length} of {reviews.length} reviews
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 bg-background-light dark:bg-secondary-dark rounded-xl border border-secondary-light dark:border-secondary-dark"
            >
              {/* Review header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {review.userAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-text-light dark:text-text-dark">
                        {review.userName}
                      </h4>
                      {review.verified && (
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs rounded-full flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">verified</span>
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>

              {/* Review content */}
              <p className="text-text-light dark:text-text-dark mb-4">
                {review.comment}
              </p>

              {/* Helpful buttons */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Was this helpful?
                </span>
                <button
                  onClick={() => handleHelpful(review.id, true)}
                  disabled={helpfulClicked[`${review.id}-true`] || helpfulClicked[`${review.id}-false`]}
                  className="flex items-center gap-1 text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="material-symbols-outlined text-base">thumb_up</span>
                  <span>{review.helpful}</span>
                </button>
                <button
                  onClick={() => handleHelpful(review.id, false)}
                  disabled={helpfulClicked[`${review.id}-true`] || helpfulClicked[`${review.id}-false`]}
                  className="flex items-center gap-1 text-sm text-text-muted-light dark:text-text-muted-dark hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="material-symbols-outlined text-base">thumb_down</span>
                  <span>{review.unhelpful}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-5xl text-text-muted-light dark:text-text-muted-dark mb-3">
              rate_review
            </span>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              No reviews match your filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

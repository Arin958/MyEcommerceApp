import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getReviewsByProduct } from "../../store/Review/reviewSlice";

const ReviewSection = ({ productId, currentUser }) => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getReviewsByProduct(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error("Please login to submit a review");
      return;
    }

    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    setSubmitting(true);
    dispatch(createReview({
      productId,
      rating: Number(rating),
      comment: comment || ""
    })).then((action) => {
      setSubmitting(false);
      if (action.type === createReview.fulfilled.type) {
        setRating(0);
        setComment("");
        toast.success("Review submitted successfully!");
      }
    });
  };

  const renderStars = (count, filled) => {
    return Array(count).fill(0).map((_, i) => (
      <span key={i} className="transition-transform hover:scale-125">
        {i < filled ? 
          <FaStar className="text-yellow-400" /> : 
          <FaRegStar className="text-yellow-400" />
        }
      </span>
    ));
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const userHasReviewed = currentUser && 
    reviews.some(review => review.userId === currentUser.id);

  // Calculate rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    ratingDistribution[5 - review.rating]++;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Customer Reviews</h2>
      
      {/* Review Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <span className="text-5xl font-bold text-gray-900 mb-2">
            {averageRating ? averageRating.toFixed(1) : "0.0"}
          </span>
          <div className="flex mb-2">
            {renderStars(5, Math.round(averageRating || 0))}
          </div>
          <p className="text-sm text-gray-500">
            Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center">
                <span className="w-10 text-sm font-medium text-gray-900">
                  {star} star
                </span>
                <div className="flex-1 mx-4 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400" 
                    style={{ 
                      width: `${reviews.length ? (ratingDistribution[5-star] / reviews.length) * 100 : 0}%` 
                    }}
                  />
                </div>
                <span className="w-10 text-right text-sm text-gray-500">
                  {reviews.length ? Math.round((ratingDistribution[5-star] / reviews.length) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {currentUser && !userHasReviewed && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Share your experience</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you rate this product?
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-3xl focus:outline-none transition-transform hover:scale-110"
                  >
                    {star <= (hoverRating || rating) ? (
                      <FaStar className="text-yellow-400" />
                    ) : (
                      <FaRegStar className="text-yellow-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Your review
              </label>
              <textarea
                id="comment"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="What did you like or dislike? What did you use this product for?..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium disabled:opacity-50 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : "Submit Review"}
            </button>
          </form>
        </div>
      )}

      {/* Messages */}
      {userHasReviewed && (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-blue-800 mb-8">
          <p className="font-medium">You've already reviewed this product</p>
          <p className="text-sm">Thank you for sharing your experience with this product.</p>
        </div>
      )}

      {!currentUser && (
        <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg text-yellow-800 mb-8">
          <p className="font-medium">Sign in to leave a review</p>
          <p className="text-sm">Please login to share your thoughts about this product.</p>
        </div>
      )}

      {/* Reviews List */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </h3>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <FaUserCircle className="text-3xl text-gray-400" />
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="flex mr-3">
                        {renderStars(5, review.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {review.name || "Anonymous"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{review.comment}</p>
                {review.response && (
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-gray-900 mb-1">Seller Response</p>
                    <p className="text-sm text-gray-600">{review.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 mb-2">No reviews yet</p>
            <p className="text-gray-400 text-sm">Be the first to share your thoughts about this product!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
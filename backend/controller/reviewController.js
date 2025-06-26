const Review = require("../model/Review");
const Product = require("../model/Product");

// Create review
exports.createReview = async (req, res) => {
  console.log(req.body);
  const { productId, rating, comment } = req.body;
  const userId = req.user.id; // assuming you use auth middleware
  const name = req.user.name;

  try {
    // Optional: Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if user already reviewed
    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this product." });
    }

    const newReview = await Review.create({ productId, userId, name, rating, comment });

    // Update product rating stats
    const reviews = await Review.find({ productId });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
product.ratings.average = parseFloat(avgRating.toFixed(1));

    product.ratings.average = avgRating;
    product.ratings.count = reviews.length;
    await product.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews for a product
exports.getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a review (admin or review owner)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Review.findByIdAndDelete(req.params.id);

    // Update product rating stats
    const reviews = await Review.find({ productId: review.productId });
    const avgRating = reviews.length
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

    await Product.findByIdAndUpdate(review.productId, {
      "ratings.average": avgRating,
      "ratings.count": reviews.length,
    });

    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const express = require("express");
const {
   getFilteredProducts,
  getProductById,
  getSimilarProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getSearchSuggestion,
  getNewArrivals,
  getBestSeller,
  getAllCategories,
  getAllProducts
} = require("../controller/productUserController");

const productUserRouter = express.Router();

productUserRouter.get("/allProducts", getAllProducts);
productUserRouter.get("/", getFilteredProducts);
productUserRouter.get("/category", getAllCategories);

// Route: GET /api/products/:id
productUserRouter.get("/:id", getProductById);

// Route: GET /api/products/similar/:id
productUserRouter.get("/similar/:id", getSimilarProducts);

// Route: GET /api/products/featured
productUserRouter.get("/special/featured", getFeaturedProducts);

// Route: GET /api/products/category/:category
productUserRouter.get("/category/:category", getProductsByCategory);

// Route: GET /api/products/search/suggestions?query=...
productUserRouter.get("/search/suggestions", getSearchSuggestion);

// Route: GET /api/products/new-arrivals
productUserRouter.get("/special/new-arrivals", getNewArrivals);

// Route: GET /api/products/best-sellers
productUserRouter.get("/special/best-sellers", getBestSeller);

module.exports = productUserRouter;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../store/getProducts/getProductSlice";
import { useParams } from "react-router-dom";
import ProductCard from "./Product/ProductCard";
import { FiAlertCircle, FiLoader } from "react-icons/fi";

const CategoryDetailsPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const {
    data: categoryProducts,
    loading,
    error,
  } = useSelector((state) => state.products.categoryProducts);

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [dispatch, category]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <div className="flex flex-col items-center space-y-4">
          <FiLoader className="animate-spin text-4xl text-indigo-600" />
          <h2 className="text-2xl font-semibold text-gray-700">
            Loading {category} products...
          </h2>
          <p className="text-gray-500">Please wait while we fetch the best items for you</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-md">
          <FiAlertCircle className="mx-auto text-5xl text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">
            {error.message || "Failed to fetch products. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {formattedCategory} Collection
          </h1>
          <p className="text-gray-600">
            {categoryProducts.length} {categoryProducts.length === 1 ? "item" : "items"} available
          </p>
        </div>

        {/* Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No products found in this category
            </h3>
            <p className="text-gray-500">
              We couldn't find any products matching "{formattedCategory}". Check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Category Description (optional) */}
        {categoryProducts.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              About Our {formattedCategory}
            </h3>
            <p className="text-gray-600">
              Discover our curated collection of {formattedCategory.toLowerCase()} products. Each
              item is carefully selected to ensure quality and value for our customers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailsPage;
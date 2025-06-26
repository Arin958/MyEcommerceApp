import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchNewArrivals } from "../../store/getProducts/getProductSlice";
import { Link } from 'react-router-dom';
import NewArrivalCard from '../../components/Product/NewArrivalCard';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const NewArrivalProduct = ({ gender, category, search, sort, limit }) => {
  const dispatch = useDispatch();
  const {
    data: newArrivals,
    loading: newArrivalsLoading,
    error: newArrivalsError,
  } = useSelector((state) => state.products.newArrivals);

  useEffect(() => {
    // Fetch with filters if provided
    dispatch(fetchNewArrivals({ gender, category, search, sort }));
  }, [dispatch, gender, category, search, sort]);

  // Filter products based on search query (client-side if needed)
  const filterProducts = () => {
    let filtered = newArrivals || [];
    
    // Add any additional client-side filtering here if needed
    // For example, if the API doesn't handle search:
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.gender.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const filteredProducts = filterProducts();
  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  if (newArrivalsLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(limit || 8)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="h-60 bg-gray-200 animate-pulse"></div>
            <div className="p-5 space-y-3">
              <div className="h-5 bg-gray-200 rounded-full w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded-full w-1/3 mt-4"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (newArrivalsError) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6 text-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error loading products</h3>
          <p className="text-gray-600 mb-6">
            {newArrivalsError.message || 'Please try again later.'}
          </p>
          <button
            onClick={() => dispatch(fetchNewArrivals({ gender, category, search, sort }))}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            Retry
            <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          {search 
            ? `No new arrivals found matching "${search}"`
            : 'No new arrivals available at the moment'}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <NewArrivalCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* View More Button (only shown when limited) */}
      {limit && filteredProducts.length > limit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link
            to="/new-arrivals"
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 group"
          >
            View All New Arrivals
            <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default NewArrivalProduct;
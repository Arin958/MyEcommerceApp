import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../store/getProducts/getProductSlice";
import CategoryCard from '../../components/Product/CategoryCard';
import { Link } from 'react-router-dom';

const CategoryComponent = ({ limit }) => {
  const dispatch = useDispatch();
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.products.allCategories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (categoriesLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 relative inline-block">
          New Arrivals
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(limit || 4)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
              <div className="h-52 bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-10 bg-gray-200 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 relative inline-block">
          Shop by Categories
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></span>
        </h2>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading categories: {categoriesError}. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const displayedCategories = limit ? categories.slice(0, limit) : categories;

  return (
    <section className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 relative inline-block">
          Shop by Categories
          <span className="absolute bottom-[-5px] left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Browse through our carefully curated collections to find exactly what you're looking for
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {displayedCategories?.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
          />
        ))}
      </div>

      {limit && categories.length > limit && (
        <div className="text-center mt-10">
          <Link to="/categories" className="px-6 py-2.5 border-2 border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-300">
            View All Categories
          </Link>
        </div>
      )}
    </section>
  );
};

export default CategoryComponent;
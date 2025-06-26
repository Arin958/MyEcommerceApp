import React, { useEffect, useState } from "react";
import { FiChevronRight, FiLoader, FiAlertCircle, FiFilter, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, fetchProductsByCategory } from "../../store/getProducts/getProductSlice";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import CategorySidebar from "../../components/Product/CategoriesSidebar";
import GenderSideBar from "../../components/Product/GenderSideBar";
import ProductCard from "../../components/Product/ProductCard";
import {AnimatePresence, motion} from "framer-motion";
const API = import.meta.env.VITE_API_URL;

const CategoryPage = () => {
  const dispatch = useDispatch();
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.products.allCategories);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Update filters based on URL on mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const genderFromUrl = searchParams.get("gender");

    if (categoryFromUrl) setSelectedCategories(categoryFromUrl.split(","));
    if (genderFromUrl) setSelectedGenders(genderFromUrl.split(","));
  }, []);

  const fetchProducts = async () => {
    try {
      const query = new URLSearchParams();
      if (selectedCategories.length) query.append("category", selectedCategories.join(","));
      if (selectedGenders.length) query.append("gender", selectedGenders.join(","));

      const res = await axios.get(`${API}/api/products?${query.toString()}`);
      setFilteredProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const params = {};
    if (selectedCategories.length) params.category = selectedCategories.join(",");
    if (selectedGenders.length) params.gender = selectedGenders.join(",");

    setSearchParams(params);
    if (selectedCategories.length > 0 || selectedGenders.length > 0) {
      fetchProducts();
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategories, selectedGenders]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    dispatch(fetchProductsByCategory(category));
  };

  if (categoriesLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
        <div className="text-center max-w-md">
          <FiLoader className="animate-spin text-5xl text-indigo-600 mb-6 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Discovering Collections</h2>
          <p className="text-gray-600">
            We're gathering the finest products for you. Just a moment...
          </p>
        </div>
      </div>
    );

  if (categoriesError)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
        <div className="text-center max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiAlertCircle className="text-red-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            {categoriesError.message || "We couldn't load the categories. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2 text-indigo-100 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <FiChevronRight className="w-4 h-4" />
              </li>
              <li className="font-medium text-white">Categories</li>
            </ol>
          </nav>
          
          <div className="text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Explore Our Collections
            </h1>
            <p className="text-indigo-100 max-w-xl text-lg">
              Discover unique products curated just for you
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Filters Button */}
      <div className="lg:hidden sticky top-16 z-20 bg-white shadow-sm border-b border-gray-200">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="w-full py-4 px-6 flex items-center justify-between text-gray-700 font-medium"
        >
          <div className="flex items-center">
            <FiFilter className="mr-2 text-indigo-600" />
            Filters
            {selectedCategories.length + selectedGenders.length > 0 && (
              <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                {selectedCategories.length + selectedGenders.length}
              </span>
            )}
          </div>
          <FiChevronRight className="text-gray-400" />
        </button>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
         <aside className="hidden lg:block w-80 sticky top-24 self-start bg-white rounded-xl shadow-sm border border-gray-100 h-fit transition-all duration-200">
  <div className="p-6 pb-0">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-bold text-gray-800">Filters</h2>
      {(selectedCategories.length > 0 || selectedGenders.length > 0) && (
        <button
          onClick={() => {
            setSelectedCategories([]);
            setSelectedGenders([]);
          }}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  </div>

  <div className="p-6 space-y-8">
    {/* Categories Section */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Categories
        </h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={() => setSelectedCategories([])}
            className="text-xs text-gray-500 hover:text-indigo-600"
          >
            Clear
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <CategorySidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
      
      {/* Quick Category Suggestions */}
      
    </div>

    

  


  
  </div>

 
</aside>

          {/* Mobile Filters Overlay */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween' }}
                  className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <FiX className="text-gray-500" />
                    </button>
                  </div>

                  <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
                        Categories
                      </h3>
                      <CategorySidebar
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
                        Gender
                      </h3>
                      <GenderSideBar
                        selectedGenders={selectedGenders}
                        setSelectedGenders={setSelectedGenders}
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Active Filters */}
            {(selectedCategories.length > 0 || selectedGenders.length > 0) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center bg-indigo-50 text-indigo-800 px-3 py-1.5 rounded-full text-sm"
                  >
                    {category}
                    <button
                      onClick={() =>
                        setSelectedCategories(selectedCategories.filter((c) => c !== category))
                      }
                      className="ml-2 text-indigo-400 hover:text-indigo-600"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
                {selectedGenders.map((gender) => (
                  <span
                    key={gender}
                    className="inline-flex items-center bg-purple-50 text-purple-800 px-3 py-1.5 rounded-full text-sm"
                  >
                    {gender}
                    <button
                      onClick={() =>
                        setSelectedGenders(selectedGenders.filter((g) => g !== gender))
                      }
                      className="ml-2 text-purple-400 hover:text-purple-600"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Products */}
            {selectedCategories.length > 0 || selectedGenders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <div className="max-w-md mx-auto">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiAlertCircle className="text-gray-400 text-2xl" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        No products found
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Try adjusting your filters to find what you're looking for
                      </p>
                      <button
                        onClick={() => {
                          setSelectedCategories([]);
                          setSelectedGenders([]);
                        }}
                        className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.map((category) => (
                    <Link
                      to={`/categories/${category.category}`}
                      key={category._id}
                      className="group"
                      onClick={() => handleCategoryClick(category.category)}
                    >
                      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="relative pt-[100%] overflow-hidden">
                          <img
                            src={category.image}
                            alt={category.category}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <span className="text-white font-medium">
                              {category.count} {category.count === 1 ? "item" : "items"}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                            {category.category}
                          </h3>
                          <button className="mt-auto w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium rounded-lg transition-colors">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
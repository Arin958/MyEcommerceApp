import React, { useState, useEffect } from "react";
import NewArrivalProduct from "./NewArrivalProduct";
import ProductFilter from "../../components/Product/ProductFilter";
import { useSearchParams } from "react-router-dom";
import { FaSearch, FaChevronDown } from "react-icons/fa";

const NewArrivalPage = () => {
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [searchParams, setSearchParams] = useSearchParams();

  // Update URL when filters change
  useEffect(() => {
    const params = {};
    if (selectedGenders.length) params.gender = selectedGenders.join(",");
    if (selectedCategories.length) params.category = selectedCategories.join(",");
    if (sortBy) params.sort = sortBy;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
  }, [selectedGenders, selectedCategories, sortBy, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">New Arrivals</h1>
        
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search new arrivals..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative w-full md:w-48">
            <select
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FaChevronDown className="fill-current h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <ProductFilter
            selectedGenders={selectedGenders}
            setSelectedGenders={setSelectedGenders}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        {/* Products */}
        <div className="lg:col-span-4">
          {/* Display search results count */}
          {searchQuery && (
            <div className="mb-6 text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
              Found results for "{searchQuery}"
            </div>
          )}

          <NewArrivalProduct
            gender={selectedGenders.join(",")}
            category={selectedCategories.join(",")}
            search={searchQuery}
            sort={sortBy}
          />
        </div>
      </div>
    </div>
  );
};

export default NewArrivalPage;
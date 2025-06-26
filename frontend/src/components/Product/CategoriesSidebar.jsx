import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiChevronDown, FiChevronUp, FiFilter } from 'react-icons/fi';

const API = import.meta.env.VITE_API_URL;

const CategorySidebar = ({ selectedCategories, setSelectedCategories }) => {
  const [categories, setCategories] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API}/api/products/category`);
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleAllCategories = (selectAll) => {
    if (selectAll) {
      setSelectedCategories(categories.map(c => c.category));
    } else {
      setSelectedCategories([]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-500" />
          <h3 className="font-semibold text-gray-800">Filter by Category</h3>
        </div>
        {isExpanded ? (
          <FiChevronUp className="text-gray-500" />
        ) : (
          <FiChevronDown className="text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4">
          <div className="flex justify-between mb-3 text-sm">
            <button 
              onClick={() => toggleAllCategories(true)}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Select All
            </button>
            <button 
              onClick={() => toggleAllCategories(false)}
              className="text-gray-500 hover:text-gray-700 hover:underline"
            >
              Clear All
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {categories.map(({ category, count }) => (
                <div 
                  key={category} 
                  className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedCategories.includes(category) 
                      ? 'bg-blue-50 border border-blue-100' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  <div className={`w-4 h-4 rounded-sm border flex items-center justify-center mr-3 transition-colors ${
                    selectedCategories.includes(category) 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'border-gray-300'
                  }`}>
                    {selectedCategories.includes(category) && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12">
                        <path d="M10.28 2.28L4 8.56l-2.28-2.28a1 1 0 00-1.41 1.41l3 3a1 1 0 001.41 0l7-7a1 1 0 00-1.41-1.41z" fill="currentColor" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-700 flex-grow">{category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategories.includes(category) 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySidebar;
import React, { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./Product/ProductCard";

const BestSeller = ({ limit }) => {
  const { bestSellers, getBestSellers } = useProducts();

  useEffect(() => {
    getBestSellers();
  }, []);

  if (bestSellers.loading) {
    return (
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(limit || 4)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-60 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded-full w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-1/3"></div>
                  <div className="h-10 bg-gray-200 rounded-lg mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const displayedProducts = limit
    ? bestSellers.data.slice(0, limit)
    : bestSellers.data;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 relative inline-block">
            Best Sellers
            <span className="absolute bottom-[-5px]  left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover our most loved products curated by customer favorites
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              badge="bestseller"
            />
          ))}
        </div>

        {limit && bestSellers.data.length > limit && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1">
              View All Best Sellers
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSeller;
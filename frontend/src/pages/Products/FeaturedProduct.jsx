import React, { useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/Product/ProductCard';

const FeaturedProduct = ({ limit }) => {
  const { featuredProducts, getFeaturedProducts } = useProducts();

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  if (featuredProducts.loading) {
    return (
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-10 w-72 bg-gray-100 rounded-full mx-auto mb-4"></div>
            <div className="h-4 w-56 bg-gray-100 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(limit || 4)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-60 bg-gray-50 animate-pulse"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-100 rounded-full w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-1/2 animate-pulse"></div>
                  <div className="h-6 bg-gray-100 rounded-full w-1/3 animate-pulse"></div>
                  <div className="h-10 bg-gray-100 rounded-lg mt-4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const displayedProducts = limit
    ? featuredProducts.data.slice(0, limit)
    : featuredProducts.data;

  return (
    <section className="relative py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-50 to-purple-50 opacity-30"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 relative inline-block">
            Featured Products
            <span className="absolute bottom-[-5px] left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Handpicked selection of our premium products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product}
              badge="featured"
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            />
          ))}
        </div>

        {limit && featuredProducts.data.length > limit && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-90">
              View All Featured
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProduct;
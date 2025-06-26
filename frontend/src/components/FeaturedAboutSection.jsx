import React from 'react'

const FeaturedAboutSection = () => {
  return (
    <div>
        {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-pink-500 font-semibold text-lg">WHY CHOOSE US</span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">Shopping Made Effortless</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've redefined online shopping with a focus on what really matters to you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-pink-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Curated Selection</h3>
              <p className="text-gray-600 text-center">
                Our team handpicks every product to ensure only the best quality reaches your doorstep.
              </p>
              <div className="mt-6 flex justify-center">
                <img 
                  src="https://picsum.photos/id/119/400/300" 
                  alt="Quality products" 
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-pink-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Fair Pricing</h3>
              <p className="text-gray-600 text-center">
                We work directly with manufacturers to bring you competitive prices without middleman markups.
              </p>
              <div className="mt-6 flex justify-center">
                <img 
                  src="https://picsum.photos/id/160/400/300" 
                  alt="Affordable shopping" 
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-pink-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Swift Delivery</h3>
              <p className="text-gray-600 text-center">
                Our optimized logistics network ensures your order arrives when you need it.
              </p>
              <div className="mt-6 flex justify-center">
                <img 
                  src="https://picsum.photos/id/133/400/300" 
                  alt="Fast delivery" 
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeaturedAboutSection

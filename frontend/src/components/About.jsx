import React from "react";

export default function About() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-100 to-indigo-50 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-indigo-400 mix-blend-overlay"></div>
        </div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-12 md:mb-0 pr-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              More Than Just <span className="text-pink-500">Shopping</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're your trusted partner in discovering quality products that make life better. 
              Every item tells a story of craftsmanship and care.
            </p>
            <div className="flex space-x-4">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg">
                Explore Collections
              </button>
              <button className="border-2 border-gray-300 hover:border-pink-400 text-gray-700 hover:text-pink-600 px-8 py-4 rounded-full font-medium transition-all">
                Our Story
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://picsum.photos/id/1080/800/600"
                alt="Happy shoppers"
                className="w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="bg-pink-100 p-3 rounded-full mr-3">
                    <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">10,000+</p>
                    <p className="text-sm text-gray-600">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    

 

    </div>
  );
}
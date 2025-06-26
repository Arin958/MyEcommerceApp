import React from 'react'

const Mission = () => {
  return (
    <div>
           {/* Mission Section */}
      <section className="py-24 bg-gradient-to-r from-pink-500 to-indigo-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h2 className="text-4xl font-bold mb-6">Our Promise to You</h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                At ShopEase, we're committed to creating a shopping experience that's seamless, enjoyable, and trustworthy. 
                Every decision we make is guided by our core values of integrity, innovation, and customer focus.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p>100% authentic products with verified quality checks</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p>Easy returns and customer-friendly policies</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p>24/7 customer support ready to assist you</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://picsum.photos/id/1074/600/400" 
                    alt="Our team" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-2xl mt-8">
                  <img 
                    src="https://picsum.photos/id/1078/600/400" 
                    alt="Warehouse" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://picsum.photos/id/1081/600/400" 
                    alt="Customer service" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-2xl mt-8">
                  <img 
                    src="https://picsum.photos/id/1078/600/400" 
                    alt="Packaging" 
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Mission

import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Heart, User, ChevronRight, Star, ArrowRight } from 'react-feather';
import { motion } from 'framer-motion';

const EcommerceHomepage = () => {
  const featuredProducts = [
    { id: 1, name: 'Premium Wireless Headphones', price: '$99.99', image: '/headphones.jpg', rating: 4.8 },
    { id: 2, name: 'Luxury Smart Watch', price: '$199.99', image: '/smartwatch.jpg', rating: 4.5 },
    { id: 3, name: 'Elite Running Shoes', price: '$129.99', image: '/shoes.jpg', rating: 4.9 },
    { id: 4, name: 'Designer Backpack', price: '$59.99', image: '/backpack.jpg', rating: 4.7 },
  ];

  const categories = [
    { name: 'Electronics', icon: '🔌', count: 42, bg: 'bg-blue-50', color: 'text-blue-600' },
    { name: 'Fashion', icon: '👕', count: 136, bg: 'bg-pink-50', color: 'text-pink-600' },
    { name: 'Home & Garden', icon: '🏠', count: 78, bg: 'bg-green-50', color: 'text-green-600' },
    { name: 'Sports', icon: '⚽', count: 53, bg: 'bg-orange-50', color: 'text-orange-600' },
  ];

  const trendingProducts = [
    { id: 5, name: 'Wireless Earbuds', price: '$79.99', image: '/earbuds.jpg', discount: '20% OFF' },
    { id: 6, name: 'Fitness Tracker', price: '$49.99', image: '/tracker.jpg', discount: '15% OFF' },
    { id: 7, name: 'Bluetooth Speaker', price: '$89.99', image: '/speaker.jpg', discount: '10% OFF' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Premium Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                LuxeCart
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/shop" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Shop
              </Link>
              <Link to="/collections" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Collections
              </Link>
              <Link to="/deals" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Deals
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                About
              </Link>
            </div>
            
            <div className="flex items-center space-x-5">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search luxury items..."
                  className="w-64 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button className="absolute right-3 top-2 text-gray-500 hover:text-purple-600 transition-colors">
                  <Search size={18} />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link to="/account" className="p-2 text-gray-700 hover:text-purple-600 transition-colors relative group">
                  <User size={20} />
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/wishlist" className="p-2 text-gray-700 hover:text-purple-600 transition-colors relative group">
                  <Heart size={20} />
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/cart" className="p-2 text-gray-700 hover:text-purple-600 transition-colors relative group">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Luxurious Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-purple-900 to-blue-800 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-purple-500 to-transparent opacity-20"></div>
        
        <div className="max-w-7xl mx-auto py-32 px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Elevate Your Lifestyle
            </h1>
            <p className="mt-6 text-xl text-purple-100 max-w-3xl">
              Discover our exclusive collection of premium products curated for the discerning shopper.
            </p>
            <div className="mt-10 flex space-x-4">
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
              >
                Shop Collection
              </Link>
              <Link
                to="/deals"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-purple-700 bg-white hover:bg-gray-50 transition-colors duration-300"
              >
                View Deals
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Elegant Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <Link to="/categories" className="flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors">
            Browse all <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Link
                to={`/category/${category.name.toLowerCase()}`}
                className={`block ${category.bg} p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center group`}
              >
                <div className={`text-4xl mb-4 ${category.color} group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} premium items</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Products with Floating Animation */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full mb-4">
              Premium Selection
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carefully curated items that combine quality craftsmanship with exceptional design
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <Heart size={18} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">{product.rating}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-xl font-bold text-purple-600">{product.price}</p>
                    <button className="mt-4 w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center">
                      Add to Cart
                      <ShoppingCart size={16} className="ml-2" />
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/shop" 
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
            >
              View All Products
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Trending Deals Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Trending Deals</h2>
              <p className="text-gray-600 mt-2">Limited time offers on popular items</p>
            </div>
            <Link to="/deals" className="flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors">
              See all deals <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingProducts.map((product) => (
              <div key={product.id} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative bg-white rounded-lg shadow-md overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative h-56 bg-gray-100 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="object-cover h-full w-full"
                      />
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-purple-600">{product.price}</p>
                        <p className="text-sm text-gray-500 line-through">${(parseFloat(product.price.slice(1)) * 1.25)}.99</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exclusive Newsletter */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Exclusive Community</h2>
            <p className="text-lg text-purple-100 mb-8">
              Subscribe to receive VIP access to private sales, new arrivals, and style inspiration
            </p>
            <div className="mt-8 max-w-md mx-auto flex rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 min-w-0 px-6 py-4 border-0 focus:ring-2 focus:ring-purple-300 text-gray-900"
              />
              <button className="bg-purple-600 text-white px-8 py-4 hover:bg-purple-700 transition-colors duration-300 font-medium">
                Subscribe
              </button>
            </div>
            <p className="mt-4 text-sm text-purple-200">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Premium Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            <div className="col-span-2">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                LuxeCart
              </Link>
              <p className="mt-4 text-gray-400">
                Curating the finest products for those who appreciate quality and design.
              </p>
              <div className="mt-6 flex space-x-6">
                {['Facebook', 'Twitter', 'Instagram', 'Pinterest'].map((social) => (
                  <Link 
                    key={social} 
                    to="#" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <i className={`fab fa-${social.toLowerCase()} text-lg`}></i>
                  </Link>
                ))}
              </div>
            </div>
            
            {['Shop', 'Customer Service', 'Company', 'Legal'].map((section) => (
              <div key={section}>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  {section}
                </h3>
                <ul className="mt-4 space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <li key={i}>
                      <Link 
                        to="#" 
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {section} Link {i + 1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-16 pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2023 LuxeCart. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceHomepage;
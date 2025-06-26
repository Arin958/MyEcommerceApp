import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineSearch } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { logout } from "../store/auth/authSlice";
import CartDrawer from "../components/Cart/CartDrawer";
import { clearCart, getCart } from "../store/cart/cartSlice";
import { persistor } from "../store/store";

export default function EcommerceLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const guestId = user?.user?._id || localStorage.getItem("guestId");

  useEffect(() => {
    dispatch(getCart(guestId));
  }, [dispatch, guestId]);

  const toggleCartDrawer = () => setCartDrawerOpen(!cartDrawerOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

const handleLogout = async () => {
  dispatch(clearCart());
  await dispatch(logout()).unwrap();
  await persistor.purge();  // await this so it completes
  localStorage.removeItem("guestId"); // if you store guestId manually
  setShowProfileDropdown(false);
  navigate("/");
};
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#profile-dropdown")) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center py-2 px-4 text-sm">
        Free shipping on all orders over $50 | Use code <strong>NEW10</strong> for 10% off
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-sm bg-white/90">
        <div className="container mx-auto px-4 py-3">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button onClick={toggleMobileMenu} className="md:hidden p-2 text-gray-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 z-50">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <HiOutlineShoppingBag className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                LuxeCart
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              {["Home", "Shop", "Categories", "New Arrivals", "Sale"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-700 hover:text-pink-500 transition-colors font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Icons & Profile */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleSearch} 
                className="p-2 text-gray-600 hover:text-pink-500 transition"
              >
                <HiOutlineSearch className="h-5 w-5" />
              </button>

              <button className="p-2 text-gray-600 hover:text-pink-500 transition hidden sm:block">
                <Heart className="h-5 w-5" />
              </button>

              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <button 
                  onClick={toggleCartDrawer} 
                  className="p-2 text-gray-600 hover:text-pink-500 transition relative"
                >
                  <HiOutlineShoppingBag className="h-5 w-5" />
                  {cart?.cart?.products?.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full"
                    >
                      {cart?.cart?.products?.length}
                    </motion.span>
                  )}
                </button>
              </motion.div>

              {user ? (
                <div className="relative" id="profile-dropdown">
                  <button
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        className="flex items-center space-x-2 group"
      >
        <div className="relative">
          {user?.user?.avatar ? (
            <img
              src={user.user.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-transparent group-hover:border-pink-500 transition"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-medium border-2 border-transparent group-hover:border-pink-500 transition">
              {user?.user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <span className="hidden md:block font-medium text-gray-700 group-hover:text-pink-500 transition">
          {user?.user?.name?.split(" ")[0] || "User"}
        </span>
      </button>

                  <AnimatePresence>
                    {showProfileDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-100"
                      >
                        <div className="p-4 border-b border-gray-100">
                          <p className="font-medium">{user?.user?.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user?.user?.email}</p>
                        </div>
                        {[
                          { label: "My Profile", path: "/my-profile" },
                          { label: "My Orders", path: "/my-orders" },
                          { label: "Wishlist", path: "/wishlist" },
                          ...(user?.user?.role === "admin" ? [{ label: "Admin Dashboard", path: "/admin" }] : [])
                        ].map((item) => (
                          <Link
                            key={item.label}
                            to={item.path}
                            className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-50 border-t border-gray-100 transition"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex space-x-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 text-pink-500 font-medium rounded-md hover:bg-pink-50 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-md hover:opacity-90 transition shadow-md"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <HiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-3 space-y-4">
                {["Home", "Shop", "Categories", "New Arrivals", "Sale"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="block py-2 text-gray-700 hover:text-pink-500 font-medium"
                    onClick={toggleMobileMenu}
                  >
                    {item}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  {user ? (
                    <>
                      <Link
                        to="/my-profile"
                        className="block py-2 text-gray-700 hover:text-pink-500 font-medium"
                        onClick={toggleMobileMenu}
                      >
                        My Account
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          toggleMobileMenu();
                        }}
                        className="w-full text-left py-2 text-red-500 font-medium"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          navigate("/login");
                          toggleMobileMenu();
                        }}
                        className="flex-1 py-2 text-pink-500 font-medium border border-pink-500 rounded-md"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          navigate("/register");
                          toggleMobileMenu();
                        }}
                        className="flex-1 py-2 bg-pink-500 text-white font-medium rounded-md"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Overlay (Desktop) */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={toggleSearch}>
          <div className="container mx-auto px-4 pt-24" onClick={(e) => e.stopPropagation()}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative max-w-2xl mx-auto"
            >
              <input
                type="text"
                placeholder="Search for products, brands, categories..."
                className="w-full px-6 py-4 pl-14 text-lg border-0 rounded-xl shadow-lg focus:ring-2 focus:ring-pink-500"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <HiOutlineSearch className="absolute left-5 top-5 text-gray-400 text-xl" />
              <button
                onClick={toggleSearch}
                className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartDrawerOpen} onClose={toggleCartDrawer} />

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Info */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <HiOutlineShoppingBag className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">LuxeCart</span>
              </Link>
              <p className="text-gray-400">
                Premium e-commerce experience with the best products and customer service.
              </p>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "pinterest"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition"
                  >
                    <span className="sr-only">{social}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "Shop", "About Us", "Contact", "Blog"].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-400 hover:text-pink-400 transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-3">
                {[
                  "FAQs",
                  "Shipping Policy",
                  "Return Policy",
                  "Privacy Policy",
                  "Terms & Conditions"
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-pink-400 transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to get 10% off your first order and updates on new arrivals.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 text-white"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition shadow-md"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} LuxeCart. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-pink-400 transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-400 transition">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-400 transition">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
import { X, ShoppingBag, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  updateCart,
  removeFromCart,
} from "../../store/cart/cartSlice";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { cart, loading, error } = useSelector((state) => state.cart);

  // Handle nested cart response
  const cartData = cart?.cart || {};
  const products = cartData.products || [];

  // Get guestId from localStorage if user not logged in
  const guestId = user?._id || localStorage.getItem("guestId");

  useEffect(() => {
    if (isOpen) {
      dispatch(getCart(guestId));
    }
  }, [isOpen, dispatch, guestId]);

  const itemCount = products.reduce((total, item) => total + item.quantity, 0);
  const subtotal = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    onClose();
    navigate(user ? "/checkout" : "/login");
  };

  const handleUpdateQuantity = (productId, newQuantity, size, gender) => {
    if (newQuantity < 1) return;
    dispatch(
      updateCart({
        guestId,
        productId,
        size,
        gender,
        quantity: newQuantity,
      })
    ).then(() => {
      dispatch(getCart(guestId));
    });
  };

  const handleRemoveItem = (productId, size, gender) => {
    dispatch(
      removeFromCart({
        guestId,
        productId,
        size,
        gender,
      })
    ).then(() => {
      dispatch(getCart(guestId)); // Refresh cart after removal
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 shadow-xl"
          >
            <div className="h-full flex flex-col bg-white">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-6 w-6 text-gray-800" />
                  <h2 className="text-xl font-semibold">Your Cart</h2>
                  <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded-full">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {itemCount > 0 ? (
                  <div className="space-y-4">
                    {products.map((item, index) => (
                      <div
                        key={item.productId || index}
                        className="flex gap-4 border-b border-gray-100 pb-4"
                      >
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || item.images}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900 truncate">
                              {item.name}
                            </h3>
                            <button
                              onClick={() =>
                                handleRemoveItem(
                                  item.productId,
                                  item.size,
                                  item.gender
                                )
                              }
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {[item.color, item.size]
                              .filter(Boolean)
                              .join(" / ") || "One size"}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-medium">
                              ${item.price.toFixed(2)}
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.productId,
                                    item.quantity - 1,
                                    item.size,
                                    item.gender
                                  )
                                }
                                disabled={item.quantity <= 1}
                                className={`p-1 rounded-md ${
                                  item.quantity <= 1
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.productId,
                                    item.quantity + 1,
                                    item.size,
                                    item.gender
                                  )
                                }
                                className="p-1 rounded-md text-gray-600 hover:bg-gray-100"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">
                      Your cart is empty
                    </h3>
                    <p className="mt-1 text-gray-500">
                      Start adding some items to your cart
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>

              {/* Checkout Footer */}
              {itemCount > 0 && (
                <div className="border-t border-gray-100 p-4 bg-white">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4 text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span
                      className={
                        subtotal > 50 ? "text-green-600" : "text-gray-600"
                      }
                    >
                      {subtotal > 50 ? "FREE" : "$5.99"}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  {subtotal < 50 && (
                    <p className="mt-2 text-xs text-center text-gray-500">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import {
  FaStar,
  FaRegStar,
  FaHeart,
  FaShare,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaCheck,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactImageZoom from "react-image-zoom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart/cartSlice";
import ReviewSection from "../Review/ReviewSection";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);
  const {
    currentProduct,
    getProductById,
    similarProducts,
    getSimilarProducts,
  } = useProducts();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomActive, setZoomActive] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    getProductById(id);
    getSimilarProducts(id);
  }, [id]);

  const product = currentProduct.data;

  if (currentProduct.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!product)
    return (
      <div className="p-10 text-center text-xl text-gray-700">
        Product not found
      </div>
    );

  const renderRatingStars = () => {
    const stars = [];
    const rating = product.ratings?.average || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <FaStar
            key={i}
            className="text-yellow-400"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        size: selectedSize,
        quantity,
        guestId,
      })
    );
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  const props = {
    width: 600,
    height: 500,
    zoomWidth: 500,
    img: product.images[currentImageIndex]?.url,
    scale: 1.5,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="bottom-right" />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <svg
                  className="w-3 h-3 mr-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href={`/category/${product.category}`}
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 transition-colors"
                >
                  {product.category}
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-blue-600 md:ml-2">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="relative">
              <div className="relative h-96 md:h-[500px] bg-gray-50 rounded-xl overflow-hidden border border-gray-200 group">
                {zoomActive ? (
                  <ReactImageZoom {...props} />
                ) : (
                  <img
                    src={product.images[currentImageIndex]?.url}
                    alt={product.name}
                    className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                    onClick={() => setZoomActive(true)}
                  />
                )}

                <button
                  onClick={() => setZoomActive(!zoomActive)}
                  className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all hover:shadow-xl"
                  title={zoomActive ? "Disable zoom" : "Enable zoom"}
                >
                  <FaExpand className="text-gray-700" />
                </button>

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition-all hover:shadow-xl"
                    >
                      <FaChevronLeft className="text-gray-700 text-lg" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition-all hover:shadow-xl"
                    >
                      <FaChevronRight className="text-gray-700 text-lg" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        currentImageIndex === index
                          ? "bg-blue-600 w-4"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <div className="absolute top-4 left-4 flex space-x-2">
                  {product.isFeatured && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      Featured
                    </span>
                  )}

                  {discountPercentage > 0 && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>
              </div>

              <div className="flex mt-4 space-x-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      currentImageIndex === index
                        ? "border-blue-600 scale-105 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} thumbnail ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-gray-500 mt-1 text-lg">{product.brand}</p>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-full transition-all hover:scale-110 ${
                    isWishlisted
                      ? "text-red-500 bg-red-50 shadow-inner"
                      : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                  }`}
                >
                  <FaHeart size={24} />
                </button>
              </div>

              <div className="flex items-center mb-6">
                <div className="flex mr-2">{renderRatingStars()}</div>
                <span className="text-sm text-gray-500 ml-1">
                  ({product.ratings?.count || 0} reviews)
                </span>
                <span className="mx-3 text-gray-300">|</span>
                <span className="text-sm text-green-600 font-medium">
                  {product.stock} in stock
                </span>
                <span className="mx-3 text-gray-300">|</span>
                <span className="text-sm text-gray-500">
                  {product.sold} sold
                </span>
              </div>

              <div className="mb-6">
                {product.discountPrice ? (
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-gray-900">
                      ${product.discountPrice.toFixed(2)}
                    </span>
                    <span className="ml-3 text-xl text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                      Save {discountPercentage}%
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Tabs */}
              <div className="mb-6 border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px">
                  <li className="mr-2">
                    <button
                      onClick={() => setActiveTab("description")}
                      className={`inline-block p-4 border-b-2 rounded-t-lg transition-colors ${
                        activeTab === "description"
                          ? "text-blue-600 border-blue-600"
                          : "border-transparent hover:text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      Description
                    </button>
                  </li>
                  <li className="mr-2">
                    <button
                      onClick={() => setActiveTab("details")}
                      className={`inline-block p-4 border-b-2 rounded-t-lg transition-colors ${
                        activeTab === "details"
                          ? "text-blue-600 border-blue-600"
                          : "border-transparent hover:text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      Details
                    </button>
                  </li>
                  <li className="mr-2">
                    <button
                      onClick={() => setActiveTab("reviews")}
                      className={`inline-block p-4 border-b-2 rounded-t-lg transition-colors ${
                        activeTab === "reviews"
                          ? "text-blue-600 border-blue-600"
                          : "border-transparent hover:text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      Reviews ({product.ratings?.count || 0})
                    </button>
                  </li>
                </ul>
              </div>

              {/* Tab Content */}
              <div className="mb-8">
                {activeTab === "description" && (
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                )}
                {activeTab === "details" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">SKU</p>
                      <p className="font-medium">{product.sku}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Category</p>
                      <p className="font-medium">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Gender</p>
                      <p className="font-medium">{product.gender}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Collection</p>
                      <p className="font-medium">{product.collections}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Color: {selectedColor && <span className="font-normal">{selectedColor}</span>}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                          selectedColor === color
                            ? "border-blue-600 scale-110 shadow-md"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      >
                        {selectedColor === color && (
                          <span className="absolute inset-0 flex items-center justify-center text-white">
                            <FaCheck size={12} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Size: {selectedSize && <span className="font-normal">{selectedSize}</span>}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2 border rounded-md transition-all ${
                          selectedSize === size
                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 border border-gray-300 rounded-l-md hover:bg-gray-100 text-lg font-medium transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-t border-b border-gray-300 text-center w-full">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 border border-gray-300 rounded-r-md hover:bg-gray-100 text-lg font-medium transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-all hover:shadow-lg"
                >
                  <FaShoppingCart size={20} />
                  <span className="font-medium">Add to Cart</span>
                </button>
                <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-lg font-medium transition-all hover:shadow-lg">
                  Buy Now
                </button>
              </div>

              {/* Share Button */}
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700 flex items-center transition-colors">
                  <FaShare className="mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.data.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.data.map((product) => (
                <div
                  key={product._id}
                  className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.isFeatured && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                        Featured
                      </span>
                    )}
                    <button className="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110">
                      <FaHeart className="text-gray-700" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      <a
                        href={`/product/${product._id}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {product.name}
                      </a>
                    </h3>
                    <p className="text-gray-500 mb-2">{product.brand}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        {product.discountPrice ? (
                          <div className="flex items-center">
                            <span className="font-bold text-gray-900">
                              ${product.discountPrice.toFixed(2)}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex text-yellow-400 text-sm">
                        <FaStar />
                        <span className="text-gray-500 ml-1">
                          {product.ratings?.average?.toFixed(1) || "0.0"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ReviewSection productId={product._id} currentUser={user} />
    </div>
  );
};

export default ProductDetails;
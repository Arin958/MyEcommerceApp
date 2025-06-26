import { useNavigate } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';

const NewArrivalCard = ({ product }) => {
  const navigate = useNavigate();
  const { name, price, discountPrice, brand, category, images, ratings, _id, isNew } = product;

  const imageUrl = images?.[0]?.url || 'https://via.placeholder.com/500';

  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 overflow-hidden w-full max-w-xs border border-gray-100 hover:border-indigo-100"
    >
      {/* New Arrival Badge */}
      {isNew && (
        <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10 flex items-center">
          <FiClock className="mr-1" size={12} />
          NEW
        </div>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-indigo-600 hover:text-white transition-colors">
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{name}</h3>
            <p className="text-sm text-gray-500 mt-1">{brand} • {category}</p>
          </div>
          {/* Wishlist Button */}
          <button 
            className="text-gray-400 hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Add to wishlist logic here
            }}
          >
            ♡
          </button>
        </div>

        {/* Price Section */}
        <div className="mt-3 flex items-center gap-2">
          {discountPrice ? (
            <>
              <span className="text-gray-400 line-through text-sm">${price.toFixed(2)}</span>
              <span className="text-red-500 font-semibold">${discountPrice.toFixed(2)}</span>
              <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                {Math.round((1 - discountPrice/price) * 100)}% OFF
              </span>
            </>
          ) : (
            <span className="text-gray-800 font-semibold">${price.toFixed(2)}</span>
          )}
        </div>

        {/* Rating and New Arrival Tag */}
        <div className="mt-3 flex justify-between items-center">
          <div className="text-sm text-yellow-500">
            ⭐ {ratings?.average?.toFixed(1) || '0.0'} ({ratings?.count || 0})
          </div>
          {isNew && (
            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
              Just Added
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewArrivalCard;
// components/ProductCard.jsx
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { name, price, discountPrice, brand, category, images, ratings, _id } = product;

  const imageUrl = images?.[0]?.url || 'https://via.placeholder.com/500';

  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-shadow duration-300 overflow-hidden w-full max-w-xs"
    >
      <img src={imageUrl} alt={name} className="w-full h-60 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">{brand} • {category}</p>
        <div className="mt-2 flex items-center gap-2">
          {discountPrice ? (
            <>
              <span className="text-gray-400 line-through text-sm">${price.toFixed(2)}</span>
              <span className="text-red-500 font-semibold">${discountPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-gray-800 font-semibold">${price.toFixed(2)}</span>
          )}
        </div>
        <div className="mt-2 text-sm text-yellow-500">
          ⭐ {ratings?.average || 0} ({ratings?.count || 0})
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

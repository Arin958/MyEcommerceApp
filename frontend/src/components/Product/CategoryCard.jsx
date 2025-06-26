import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const { name, image, count, _id } = category;

  const handleClick = (category) => {
    navigate(`/categories/${category}`);
  };

  return (
    <div
      onClick={() => handleClick(category.category)}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 overflow-hidden w-full max-w-xs group border border-gray-100 hover:border-gray-200"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating items count */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {count || 0} items
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
          {category.category}
        </h3>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          Explore our curated collection of {category.category.toLowerCase()} items
        </p>

        <button
          className="mt-2 w-full py-2.5 text-sm font-medium text-center text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg group-hover:translate-y-[-2px]"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          View Collection
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
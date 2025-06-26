import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/getProducts/addProduct";
import { FiUpload, FiPlus, FiX, FiLoader } from "react-icons/fi";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    discountPrice: "",
    sku: "",
    gender: "Unisex",
    collections: [],
    isFeatured: false,
    isActive: true,
    colors: [],
    sizes: [],
    images: [],
  });

  const [colorInput, setColorInput] = useState("");
  const [collectionInput, setCollectionInput] = useState("");
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files) {
      setFormData(prev => ({ ...prev, images: files }));
      const imagePreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviewImages(imagePreviews);
    } else if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSizeChange = (size) => {
    setFormData(prev => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleAddColor = () => {
    if (colorInput.trim()) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, colorInput.trim()]
      }));
      setColorInput("");
    }
  };

  const removeColor = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }));
  };

  const handleAddCollection = () => {
    if (collectionInput.trim()) {
      setFormData(prev => ({
        ...prev,
        collections: [...prev.collections, collectionInput.trim()]
      }));
      setCollectionInput("");
    }
  };

  const removeCollection = (col) => {
    setFormData(prev => ({
      ...prev,
      collections: prev.collections.filter(c => c !== col)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const data = new FormData();

    for (const key in formData) {
      if (["colors", "sizes", "collections"].includes(key)) {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === "images") {
        for (let file of formData.images) {
          data.append("images", file);
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    if (user?.user?.id) {
      data.append("user", user.user.id);
    }

    try {
      await dispatch(createProduct(data));
    } finally {
      setIsLoading(false);
    }
  };

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
  const genderOptions = ["Men", "Women", "Unisex"];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price</label>
              <input 
                type="number" 
                name="discountPrice" 
                value={formData.discountPrice} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                required
              >
                {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          {/* Inventory */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock*</label>
              <input 
                type="number" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU*</label>
              <input 
                name="sku" 
                value={formData.sku} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
              <input 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input 
                name="brand" 
                value={formData.brand} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map(size => (
              <button
                type="button"
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  formData.sizes.includes(size) 
                    ? "bg-indigo-600 text-white border-indigo-600" 
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
          <div className="flex gap-2 mb-2">
            <input 
              value={colorInput} 
              onChange={(e) => setColorInput(e.target.value)} 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="Enter color name" 
            />
            <button 
              type="button" 
              onClick={handleAddColor} 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <FiPlus /> Add
            </button>
          </div>
          {formData.colors.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.colors.map(color => (
                <div 
                  key={color} 
                  className="px-3 py-1.5 rounded-full bg-white border border-gray-200 flex items-center gap-2 shadow-sm"
                >
                  <span className="text-sm">{color}</span>
                  <button 
                    type="button" 
                    onClick={() => removeColor(color)} 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Collections */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">Collections</label>
          <div className="flex gap-2 mb-2">
            <input 
              value={collectionInput} 
              onChange={(e) => setCollectionInput(e.target.value)} 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="Enter collection name" 
            />
            <button 
              type="button" 
              onClick={handleAddCollection} 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <FiPlus /> Add
            </button>
          </div>
          {formData.collections.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.collections.map(col => (
                <div 
                  key={col} 
                  className="px-3 py-1.5 rounded-full bg-white border border-gray-200 flex items-center gap-2 shadow-sm"
                >
                  <span className="text-sm">{col}</span>
                  <button 
                    type="button" 
                    onClick={() => removeCollection(col)} 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Images */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
          <div className="relative">
            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors">
              <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
              <input 
                type="file" 
                name="images" 
                multiple 
                onChange={handleChange} 
                className="hidden" 
                accept="image/*"
              />
            </label>
          </div>
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {previewImages.map((src, i) => (
                <div key={i} className="relative group">
                  <img 
                    src={src} 
                    alt={`Preview ${i}`} 
                    className="w-full h-32 object-cover rounded-lg border border-gray-200" 
                  />
                  <button 
                    type="button" 
                    onClick={() => {
                      const newPreviews = [...previewImages];
                      newPreviews.splice(i, 1);
                      setPreviewImages(newPreviews);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="flex gap-6 bg-gray-50 p-4 rounded-lg">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              name="isFeatured" 
              checked={formData.isFeatured} 
              onChange={handleChange} 
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" 
            />
            <span className="text-sm font-medium text-gray-700">Featured Product</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              name="isActive" 
              checked={formData.isActive} 
              onChange={handleChange} 
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" 
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <FiLoader className="animate-spin" /> Creating Product...
            </>
          ) : (
            "Create Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
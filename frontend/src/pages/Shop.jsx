import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/getProducts/getProductSlice";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Product/ProductCard";
import ProductFilter from "../components/Product/ProductFilter";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const PRODUCTS_PER_PAGE = 8;

const Shop = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.products.allProducts
  );

  const [selectedGenders, setSelectedGenders] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const fetchProducts = async () => {
    try {
      const query = new URLSearchParams();

      if (selectedGenders.length) {
        query.append("gender", selectedGenders.join(","));
      }

      if (selectedCategories.length) {
        query.append("category", selectedCategories.join(","));
      }

      if(sortBy) {
        query.append("sort", sortBy);
      }

      const res = await axios.get(`${API}/api/products?${query.toString()}`);
      setFilteredProducts(res.data.products);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Filter products based on search query
  const filterProductsBySearch = () => {
    if (!searchQuery) {
      return filteredProducts;
    }

    const query = searchQuery.toLowerCase();
    return filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.gender.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  };
useEffect(() => {
  const params = {};

  if (selectedCategories.length) {
    params.category = selectedCategories.join(",");
    setSearchParams(params);
    fetchProducts();
  }

  if (selectedGenders.length) {
    params.gender = selectedGenders.join(",");
    setSearchParams(params);
    fetchProducts();
  } else if (sortBy !== "newest") {
    // If only sort is changed
    params.sort = sortBy;
    setSearchParams(params);
    fetchProducts();
  } else {
    setSearchParams({});
    setFilteredProducts(products);
    setCurrentPage(1);
  }
}, [selectedGenders, selectedCategories, sortBy, products]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Get searched products
  const searchedProducts = filterProductsBySearch();

  // Pagination logic
  const totalProducts = searchedProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = searchedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ProductFilter
            selectedGenders={selectedGenders}
            setSelectedGenders={setSelectedGenders}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-4">
         <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
  <div className="flex items-center space-x-4">
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          fetchProducts(); // Refetch products when sort changes
        }}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="newest">Newest Arrivals</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />
      <svg
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  </div>
</div>

          {/* Display search results count */}
          {searchQuery && (
            <div className="mb-4 text-gray-600">
              Found {totalProducts} {totalProducts === 1 ? "result" : "results"} for "{searchQuery}"
            </div>
          )}

          {/* Products */}
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="inline-flex rounded-md shadow">
                    <button
                      onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-l-md border border-gray-300 ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`px-3 py-1 border-t border-b border-gray-300 ${
                            currentPage === number
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {number}
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        paginate(
                          currentPage < totalPages ? currentPage + 1 : totalPages
                        )
                      }
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-r-md border border-gray-300 ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
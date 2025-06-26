// hooks/useProducts.js
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFilteredProducts,
  fetchProductById,
  getAllCategories,
  fetchSimilarProducts,
  fetchFeaturedProducts,
  fetchProductsByCategory,
  fetchSearchSuggestions,
  fetchNewArrivals,
  fetchBestSellers,
  clearSearchSuggestions,
  resetCurrentProduct,
} from '../store/getProducts/getProductSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);

  return {
    ...productsState,
    getFilteredProducts: (params) => dispatch(fetchFilteredProducts(params)),
    getCategories: () => dispatch(getAllCategories()),
    getProductById: (id) => dispatch(fetchProductById(id)),
    getSimilarProducts: (id) => dispatch(fetchSimilarProducts(id)),
    getFeaturedProducts: () => dispatch(fetchFeaturedProducts()),
    getProductsByCategory: (category) => dispatch(fetchProductsByCategory(category)),
    getSearchSuggestions: (query) => dispatch(fetchSearchSuggestions(query)),
    getNewArrivals: () => dispatch(fetchNewArrivals()),
    getBestSellers: () => dispatch(fetchBestSellers()),
    clearSearchSuggestions: () => dispatch(clearSearchSuggestions()),
    resetCurrentProduct: () => dispatch(resetCurrentProduct()),
  };
};
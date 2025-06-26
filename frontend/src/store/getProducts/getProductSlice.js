import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchAllProducts = createAsyncThunk(
  "product/getchALlProducts",
  async (_, { rejetWithValue }) => {
    try {
      const response = await axios.get(`${API}/api/products/allProducts`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejetWithValue(error.response.data);
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "product/fetchFilteredProducts",
  async (params, { rejetWithValue }) => {
    try {
      const response = await axios.get(`${API}/api/products`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejetWithValue(error.response.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id, { rejetWithValue }) => {
    try {
      const response = await axios.get(`${API}/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejetWithValue(error.response.data);
    }
  }
);

export const fetchSimilarProducts = createAsyncThunk(
  "product/fetchSimilarProducts",
  async (id, { rejetWithValue }) => {
    try {
      const response = await axios.get(`${API}/api/products/similar/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejetWithValue(error.response.data);
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  "product/fetchFeaturedProducts",
  async (_, { rejetWithValue }) => {
    try {
      const response = await axios.get(`${API}/api/products/special/featured`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejetWithValue(error.response.data);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "product/getAllCategories",
  async (_, { rejetWithValue }) => {
    try {
      const response = await axios.get(`${API}/api/products/category`);

      return response.data.categories;
    } catch (error) {
      console.log(error);
      return rejetWithValue(error.response.data);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "product/fetchProductsByCategory",
  async (category, { rejetWithValue }) => {
    try {
      const response = await axios.get(
        `${API}/api/products/category/${category}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejetWithValue(error.response.data);
    }
  }
);

export const fetchSearchSuggestions = createAsyncThunk(
  "product/fetchSearchSuggestions",
  async (query, { rejetWithValue }) => {
    try {
      const response = await axios.get(`${API}/api/products/search/${query}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejetWithValue(error.response.data);
    }
  }
);

export const fetchNewArrivals = createAsyncThunk(
  "product/fetchNewArrivals",
  async (_, { rejetWithValue }) => {
    try {
      const response = await axios.get(`${API}/api/products/special/new-arrivals`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejetWithValue(error.response.data);
    }
  }
);

export const fetchBestSellers = createAsyncThunk(
  "product/fetchBestSellers",
  async (_, { rejetWithValue }) => {
    try {
      const response = await axios.get(
        `${API}/api/products/special/best-sellers`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejetWithValue(error.response.data);
    }
  }
);

const initialState = {
  allProducts: {
    products: [],
    total: 0,
    loading: false,
    error: null,
  },
  filteredProducts: {
    products: [],
    total: 0,

    loading: false,
    error: null,
  },
  currentProduct: {
    data: null,
    loading: false,
    error: null,
  },
  similarProducts: {
    data: [],
    loading: false,
    error: null,
  },
  featuredProducts: {
    data: [],
    loading: false,
    error: null,
  },
  allCategories: {
    data: [],
    loading: false,
    error: null,
  },
  categoryProducts: {
    data: [],
    loading: false,
    error: null,
  },
  searchSuggestions: {
    data: [],
    loading: false,
    error: null,
  },
  newArrivals: {
    data: [],
    loading: false,
    error: null,
  },
  bestSellers: {
    data: [],
    loading: false,
    error: null,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSearchSuggestions: (state) => {
      state.searchSuggestions.data = [];
    },
    resetCurrentProduct: (state) => {
      state.currentProduct = initialState.currentProduct;
    },
  },
  extraReducers: (builder) => {
    // All Products
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.allProducts.loading = true;
      state.allProducts.error = null;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.allProducts.loading = false;
      state.allProducts.products = action.payload;

      state.allProducts.total = action.payload.total;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.allProducts.loading = false;
      state.allProducts.error = action.payload;
    });
    // Filtered Products
    builder.addCase(fetchFilteredProducts.pending, (state) => {
      state.filteredProducts.loading = true;
      state.filteredProducts.error = null;
    });
    builder.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
      state.filteredProducts.loading = false;
      state.filteredProducts.products = action.payload.products;
      state.filteredProducts.total = action.payload.total;
    });
    builder.addCase(fetchFilteredProducts.rejected, (state, action) => {
      state.filteredProducts.loading = false;
      state.filteredProducts.error = action.payload;
    });

    // All Categories
    builder.addCase(getAllCategories.pending, (state) => {
      state.allCategories.loading = true;
      state.allCategories.error = null;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.allCategories.loading = false;
      state.allCategories.data = action.payload;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.allCategories.loading = false;
      state.allCategories.error = action.payload;
    });

    // Product by ID
    builder.addCase(fetchProductById.pending, (state) => {
      state.currentProduct.loading = true;
      state.currentProduct.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.currentProduct.loading = false;
      state.currentProduct.data = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.currentProduct.loading = false;
      state.currentProduct.error = action.payload;
    });

    // Similar Products
    builder.addCase(fetchSimilarProducts.pending, (state) => {
      state.similarProducts.loading = true;
      state.similarProducts.error = null;
    });
    builder.addCase(fetchSimilarProducts.fulfilled, (state, action) => {
      state.similarProducts.loading = false;
      state.similarProducts.data = action.payload;
    });
    builder.addCase(fetchSimilarProducts.rejected, (state, action) => {
      state.similarProducts.loading = false;
      state.similarProducts.error = action.payload;
    });

    // Featured Products
    builder.addCase(fetchFeaturedProducts.pending, (state) => {
      state.featuredProducts.loading = true;
      state.featuredProducts.error = null;
    });
    builder.addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
      state.featuredProducts.loading = false;
      state.featuredProducts.data = action.payload;
    });
    builder.addCase(fetchFeaturedProducts.rejected, (state, action) => {
      state.featuredProducts.loading = false;
      state.featuredProducts.error = action.payload;
    });

    // Products by Category
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.categoryProducts.loading = true;
      state.categoryProducts.error = null;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.categoryProducts.loading = false;
      state.categoryProducts.data = action.payload;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.categoryProducts.loading = false;
      state.categoryProducts.error = action.payload;
    });

    // Search Suggestions
    builder.addCase(fetchSearchSuggestions.pending, (state) => {
      state.searchSuggestions.loading = true;
      state.searchSuggestions.error = null;
    });
    builder.addCase(fetchSearchSuggestions.fulfilled, (state, action) => {
      state.searchSuggestions.loading = false;
      state.searchSuggestions.data = action.payload;
    });
    builder.addCase(fetchSearchSuggestions.rejected, (state, action) => {
      state.searchSuggestions.loading = false;
      state.searchSuggestions.error = action.payload;
    });

    // New Arrivals
    builder.addCase(fetchNewArrivals.pending, (state) => {
      state.newArrivals.loading = true;
      state.newArrivals.error = null;
    });
    builder.addCase(fetchNewArrivals.fulfilled, (state, action) => {
      console.log(action.payload);
      state.newArrivals.loading = false;
      state.newArrivals.data = action.payload;
    });
    builder.addCase(fetchNewArrivals.rejected, (state, action) => {
      state.newArrivals.loading = false;
      state.newArrivals.error = action.payload;
    });

    // Best Sellers
    builder.addCase(fetchBestSellers.pending, (state) => {
      state.bestSellers.loading = true;
      state.bestSellers.error = null;
    });
    builder.addCase(fetchBestSellers.fulfilled, (state, action) => {
      state.bestSellers.loading = false;
      state.bestSellers.data = action.payload;
    });
    builder.addCase(fetchBestSellers.rejected, (state, action) => {
      state.bestSellers.loading = false;
      state.bestSellers.error = action.payload;
    });
  },
});

export const { clearSearchSuggestions, resetCurrentProduct } =
  productSlice.actions;
export default productSlice.reducer;

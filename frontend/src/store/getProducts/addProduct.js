import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const API = import.meta.env.VITE_API_URL;


export const fetchAllProductsAdmin = createAsyncThunk(
    "product/getchALlProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/api/admin`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
)

// ✅ Thunk for creating a product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/api/admin`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // for sending cookies if auth is needed
      });
      return res.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Create failed");
    }
  }
);

export const deleteProduct  = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API}/api/admin/${id}`, {
        withCredentials: true, // for sending cookies if auth is needed
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Delete failed");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/api/admin/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // for sending cookies if auth is needed
      });
      return res.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Update failed");
    }
  }
);

// ✅ Product slice
const productAdminSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct .fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(deleteProduct .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productAdminSlice.reducer;

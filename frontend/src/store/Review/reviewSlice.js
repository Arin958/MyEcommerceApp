// store/reviewSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create review
export const createReview = createAsyncThunk(
  'review/createReview',
  async ({ productId, rating, comment }, { rejectWithValue }) => {
    try {
      // Debugging - log the payload before sending
      console.log('Submitting review:', { productId, rating, comment });
      
      const response = await axios.post(
        `${API}/api/reviews`,
        { 
          productId, 
          rating: Number(rating), // Ensure rating is a number
          comment 
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (err) {
      // Enhanced error handling
      const error = err.response?.data?.message || 
                   err.response?.data?.error || 
                   'Error creating review';
      return rejectWithValue(error);
    }
  }
);

// Get all reviews by productId
export const getReviewsByProduct = createAsyncThunk(
  'review/getReviewsByProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/api/reviews/${productId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Error fetching reviews');
    }
  }
);

// Delete review
export const deleteReview = createAsyncThunk(
  'review/deleteReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API}/api/reviews/${reviewId}`, {
        withCredentials: true,
      });
      return { message: response.data.message, reviewId };
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Error deleting review');
    }
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetReviewState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reviews.unshift(action.payload); // insert new review at top
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get all reviews
      .addCase(getReviewsByProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewsByProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviewsByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete review
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload.reviewId
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;

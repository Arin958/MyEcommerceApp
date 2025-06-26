import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;


export const getCart = createAsyncThunk(
    "cart/getCart",
    async (guestId, thunkAPI) => {
        try {
            const res = await axios.get(`${API}/api/cart`, {
                params: { guestId },
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (data, thunkAPI) => {
        try {
            const res = await axios.post(`${API}/api/cart`, data, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async (data, thunkAPI) => {
        try {
            const res = await axios.put(`${API}/api/cart`, data, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (data, thunkAPI) => {
        try {
            const res = await axios.delete(`${API}/api/cart`, {
                data,
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


export const mergeCarts = createAsyncThunk(
    "cart/mergeCarts",
    async (data, thunkAPI) => {
        try {
            const res = await axios.post(`${API}/api/cart/merge`, data, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: {
            products: [],
            totalPrice: 0
        },


        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = {
                products: [],
                totalPrice: 0
            };
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                state.error = null;
                console.log(action.payload, "action.payload");
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log(action.payload, "action.payload error");
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(mergeCarts.pending, (state) => {
                state.loading = true;
            })
            .addCase(mergeCarts.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                state.error = null;
            })
            .addCase(mergeCarts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
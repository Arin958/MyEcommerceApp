import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const API = import.meta.env.VITE_API_URL;

export const getAllOrders = createAsyncThunk(
    "order/getAllOrders",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${API}/api/adminOrder`, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteOrder = createAsyncThunk(
    "order/deleteOrder",
    async (orderId, thunkAPI) => {
        try {
            const res = await axios.delete(`${API}/api/adminOrder/${orderId}`, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    "order/updateOrderStatus",
    async ({ orderId, status }, thunkAPI) => {
        try {
            const res = await axios.put(`${API}/api/adminOrder/${orderId}`, { status }, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    orders: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter((order) => order._id !== action.payload._id);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default orderSlice.reducer;
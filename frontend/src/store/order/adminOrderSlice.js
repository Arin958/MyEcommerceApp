import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;


export const fetchAllOrders = createAsyncThunk(
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


const inititalState = {
    orders: [],
    loading: false,
    error: null,
};

const orderAdminSlice = createSlice({
    name: "order",
    initialState: inititalState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default orderAdminSlice.reducer;
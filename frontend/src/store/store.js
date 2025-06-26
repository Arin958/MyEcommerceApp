import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import {persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import productReducer from "./getProducts/getProductSlice";
import cartReducer from "./cart/cartSlice";
import checkoutReducer from "./Checkout/checkoutSlice";
import orderAdminReducer from "./order/orderSlice"
import productAdminReducer from "./getProducts/addProduct"
import reviewReducer from "./Review/reviewSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
}

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orderAdmin: orderAdminReducer,
  productsAdmin: productAdminReducer,
  reviews: reviewReducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
reducer: persistedReducer,
middleware: getDefaultMiddleware => getDefaultMiddleware({
  serializableCheck: false
})

});


export const persistor = persistStore(store);
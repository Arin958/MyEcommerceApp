import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import EcommerceLayout from "../layout/Applayout";
import EmailVerificationCode from "../pages/EmailVerficationCode";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../components/Product/ProductDetail";
import Categories from "../pages/Products/Categories";
import CategoryDetailsPage from "../components/ProductCategory";
import Shop from "../pages/Shop";
import CheckoutPage from "../pages/CheckoutPage";
import OrderPage from "../pages/OrderPage";
import OrderDetail from "../pages/OrderDetail";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ProtectedRoutes from "../hooks/ProtectedRoute";
import AdminLayout from "../layout/AdminLayout";
import AdminProductPage from "../pages/Admin/AdminProductPage";
import AddProductForm from "../components/admin/AddProductPage";
import AdminOrderPage from "../pages/Admin/AdminOrderPage";
import PublicRoute from "../hooks/PublicRoute";
import EcommerceHomepage from "../pages/EcommereHomePage";
import NewArrivalProduct from "../pages/Products/NewArrivalProduct";
import NewArrivalPage from "../pages/Products/NewArrivalPage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<EcommerceLayout />}>
          {/* Authorization */}
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <PublicRoute>
                <EmailVerificationCode />
              </PublicRoute>
            }
          />
          {/* Product */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/new-arrivals" element={<NewArrivalPage />} />
          <Route path="/home" element={<EcommerceHomepage />} />
          <Route
            path="/categories/:category"
            element={<CategoryDetailsPage />}
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/my-orders" element={<OrderPage />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<AdminLayout />}>
            <Route path="admin">
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProductPage />} />
              <Route path="orders" element={<AdminOrderPage />} />
              <Route path="products/addproduct" element={<AddProductForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;

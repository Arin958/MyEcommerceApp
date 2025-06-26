import React, { useEffect } from "react";
import StatsCard from "../../components/admin/StatsCard";
import RecentOrders from "../../components/admin/RecentOrders";
import TopProducts from "../../components/admin/TopProducts";
import {useDispatch, useSelector} from "react-redux";
import { getAllOrders } from "../../store/order/orderSlice";
import { fetchAllProducts, fetchBestSellers } from "../../store/getProducts/getProductSlice";


const AdminDashboard = () => {
  // Sample data - replace with your actual data
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,780",
      change: "12%",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      trend: "up",
    },
    {
      title: "Total Orders",
      value: "1,429",
      change: "8%",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      trend: "up",
    },
    {
      title: "New Customers",
      value: "214",
      change: "3%",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      trend: "down",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "0.5%",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      trend: "up",
    },
  ];

 


  const {orders,loading,error} = useSelector((state) => state.orderAdmin);
  const {data, loading: productLoading, error: productError} = useSelector((state) => state.products.bestSellers);
  console.log(data);

  const recentOrders = orders.slice(0, 5);
  const topProducts = data.slice(0, 5);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(fetchBestSellers());
  }, [dispatch]);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Orders and Top Products */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentOrders orders={recentOrders} />
          <TopProducts products={topProducts} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
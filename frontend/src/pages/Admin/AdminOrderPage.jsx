import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  getAllOrders, 
  updateOrderStatus, 
  deleteOrder 
} from "../../store/order/orderSlice";
import { FiEdit, FiTrash2, FiSearch, FiChevronDown } from "react-icons/fi";
import { FaBox, FaShippingFast, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { format } from 'date-fns';

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orderAdmin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const filteredOrders = Array.isArray(orders)
    ? orders.filter(order => 
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleStatusUpdate = (orderId) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }))
      .unwrap()
      .then(() => {
        dispatch(getAllOrders());
        setShowStatusModal(false);
      })
      .catch(error => {
        console.error("Failed to update status:", error);
      });
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId))
      .unwrap()
      .then(() => {
        dispatch(getAllOrders());
        setShowDeleteModal(false);
      })
      .catch(error => {
        console.error("Failed to delete order:", error);
      });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <FaBox className="text-blue-500" />;
      case 'Shipped':
        return <FaShippingFast className="text-yellow-500" />;
      case 'Delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  const statusOptions = [
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled'
  ];

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaShippingFast className="mr-3 text-indigo-600" />
            Order Management
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b">
            <div className="relative w-full sm:w-96">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by ID, customer or status..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleOrderExpand(order._id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Order #{order._id.substring(order._id.length - 6).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {order.user?.name || 'Guest User'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ${order.totalPrice.toFixed(2)}
                        </p>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'}`}>
                          {order.status}
                        </span>
                      </div>
                      <FiChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${
                        expandedOrder === order._id ? 'transform rotate-180' : ''
                      }`} />
                    </div>
                  </div>

                  {expandedOrder === order._id && (
                    <div className="mt-4 pl-12 space-y-4">
                      {/* Order Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Customer</h4>
                          <p className="mt-1 text-sm text-gray-900">
                            {order.user?.name || 'Guest User'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.user?.email || 'No email provided'}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Shipping Address</h4>
                          <p className="mt-1 text-sm text-gray-900">
                            {order.shippingAddress?.address}, {order.shippingAddress?.city}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.shippingAddress?.country}, {order.shippingAddress?.postalCode}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Order Info</h4>
                          <p className="mt-1 text-sm text-gray-900">
                            {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
                          </p>
                          <p className="text-sm text-gray-500">
                            Payment: {order.paymentMethod} ({order.paymentStatus})
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Order Items</h4>
                        <div className="space-y-2">
                          {order.orderItems.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <img 
                                src={item.images} 
                                alt={item.name} 
                                className="h-12 w-12 rounded object-cover"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setNewStatus(order.status);
                            setShowStatusModal(true);
                          }}
                          className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <FiEdit className="mr-2" />
                          Update Status
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDeleteModal(true);
                          }}
                          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <FiTrash2 className="mr-2" />
                          Delete Order
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No orders found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Update Order Status
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Order #{selectedOrder._id.substring(selectedOrder._id.length - 6).toUpperCase()}
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedOrder._id)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Order Deletion
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete order #
              {selectedOrder._id.substring(selectedOrder._id.length - 6).toUpperCase()}?
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteOrder(selectedOrder._id)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
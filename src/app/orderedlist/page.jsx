
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/config';
import { FaArrowLeft, FaShoppingBag, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';


export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE}/shop/order-list/completed`, {
          cache: 'no-store',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const ordersData = await response.json();
        setOrders(ordersData);
      } catch (err) {
        setError('Failed to load orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const OrderCard = ({ order }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Order Header */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FaShoppingBag className="h-5 w-5 text-blue-600 mr-2" />
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-1" />
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {order.status}
                </span>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                <span className="flex items-center">
                  <FaCreditCard className="h-4 w-4 text-gray-400 mr-1" />
                  Total: {order.currency} {order.total_amount}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 sm:mt-0 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              {isExpanded ? 'Hide Details' : 'View Details'}
            </button>
          </div>
        </div>

        {/* Order Items - Collapsible */}
        {isExpanded && (
          <div className="border-t border-gray-200 bg-gray-50">
            <div className="p-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">Order Items</h4>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg border border-gray-200">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h5>
                      <p className="text-sm text-gray-500 mt-1">
                        Category: {item.product.category.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {item.product.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium text-gray-900">
                        {order.currency} {item.unit_price}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-green-600 mt-1">
                        Subtotal: {order.currency} {item.line_total}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Total Amount:</span>
                  <span className="text-lg font-bold text-gray-900">
                    {order.currency} {order.total_amount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              <FaShoppingBag className="h-5 w-5 mr-2" />
              My Order List
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order History</h1>
            <p className="text-gray-600">Your completed orders</p>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No orders found</div>
            <p className="text-gray-400">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {orders.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FaCreditCard className="h-5 w-5 text-blue-600 mr-2" />
              Order Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <FaShoppingBag className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <FaCreditCard className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">
                  {orders[0]?.currency || 'USD'} {orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <FaShoppingBag className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">
                  {orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
                </p>
                <p className="text-sm text-gray-600">Total Items</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
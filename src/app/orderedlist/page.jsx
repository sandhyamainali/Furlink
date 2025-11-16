'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/config';
import { FaArrowLeft, FaShoppingBag, FaCalendarAlt, FaCreditCard, FaEye, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  // Sorting function
  const sortedOrders = [...orders].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'NPR',
    }).format(amount);
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const TableHeader = ({ children, sortKey, className = '' }) => (
    <th
      style={{
        padding: '12px 24px',
        textAlign: 'left',
        fontSize: '12px',
        fontWeight: '500',
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        cursor: sortKey ? 'pointer' : 'default',
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb'
      }}
      onClick={() => sortKey && handleSort(sortKey)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span>{children}</span>
        {sortKey && getSortIcon(sortKey)}
      </div>
    </th>
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fef9f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #dc9a6a',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '16px', color: '#666', fontSize: '16px' }}>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fef9f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#dc2626', fontSize: '18px', marginBottom: '16px' }}>{error}</div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc9a6a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fef9f4', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button
                onClick={() => router.back()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  backgroundColor: 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}
              >
                <FaArrowLeft style={{ marginRight: '8px', width: '16px', height: '16px' }} />
                Back
              </button>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>Order History</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#dc9a6a', color: 'white', padding: '10px 16px', borderRadius: '12px' }}>
              <FaShoppingBag style={{ width: '20px', height: '20px' }} />
              <span style={{ fontWeight: '600' }}>{orders.length} Orders</span>
            </div>
          </div>
          <p style={{ marginTop: '8px', color: '#6b7280' }}>Manage and view your completed orders</p>
        </div>

        {/* Orders Table */}
        {orders.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #f0e1cf',
            padding: '48px 24px',
            textAlign: 'center'
          }}>
            <FaShoppingBag style={{ width: '48px', height: '48px', color: '#9ca3af', margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>No orders found</h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>You haven't placed any orders yet.</p>
            <button
              onClick={() => router.push('/shop')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc9a6a',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #f0e1cf',
            overflow: 'hidden'
          }}>
            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f9fafb' }}>
                  <tr>
                    <TableHeader sortKey="id">Order ID</TableHeader>
                    <TableHeader sortKey="created_at">Date</TableHeader>
                    <TableHeader>Items</TableHeader>
                    <TableHeader sortKey="total_amount">Total Amount</TableHeader>
                    <TableHeader sortKey="status">Status</TableHeader>
                    <TableHeader className="text-center">Actions</TableHeader>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'white' }}>
                  {currentOrders.map((order) => {
                    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
                    const isExpanded = expandedOrder === order.id;

                    return (
                      <>
                        <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>#{order.id}</div>
                          </td>
                          <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>
                            <div style={{ fontSize: '14px', color: '#1f2937', display: 'flex', alignItems: 'center' }}>
                              <FaCalendarAlt style={{ width: '16px', height: '16px', color: '#9ca3af', marginRight: '8px' }} />
                              {formatDate(order.created_at)}
                            </div>
                          </td>
                          <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>
                            <div style={{ fontSize: '14px', color: '#1f2937' }}>
                              {totalItems} item{totalItems !== 1 ? 's' : ''}
                            </div>
                          </td>
                          <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', display: 'flex', alignItems: 'center' }}>
                              <FaCreditCard style={{ width: '16px', height: '16px', color: '#9ca3af', marginRight: '4px' }} />
                              {formatCurrency(order.total_amount, order.currency)}
                            </div>
                          </td>
                          <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '2px 10px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '500',
                              backgroundColor: '#dcfce7',
                              color: '#166534',
                              textTransform: 'capitalize'
                            }}>
                              {order.status}
                            </span>
                          </td>
                          <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                            <button
                              onClick={() => toggleOrderExpansion(order.id)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '6px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151',
                                backgroundColor: 'white',
                                cursor: 'pointer'
                              }}
                            >
                              {isExpanded ? (
                                <>
                                  <FaChevronUp style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                                  Hide
                                </>
                              ) : (
                                <>
                                  <FaEye style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                                  View
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr>
                            <td colSpan="6" style={{ padding: '16px 24px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Order Items</h4>
                                <div style={{ display: 'grid', gap: '16px' }}>
                                  {order.items.map((item) => (
                                    <div key={item.id} style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      padding: '16px',
                                      backgroundColor: 'white',
                                      borderRadius: '8px',
                                      border: '1px solid #e5e7eb'
                                    }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                                        <img
                                          src={item.product.image}
                                          alt={item.product.name}
                                          style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '6px' }}
                                        />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                          <h5 style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                                            {item.product.name}
                                          </h5>
                                          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                                            Category: {item.product.category.name}
                                          </p>
                                          <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {item.product.description}
                                          </p>
                                        </div>
                                      </div>
                                      <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                                          {formatCurrency(item.unit_price, order.currency)}
                                        </p>
                                        <p style={{ fontSize: '14px', color: '#6b7280' }}>
                                          Qty: {item.quantity}
                                        </p>
                                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#16a34a', marginTop: '4px' }}>
                                          Subtotal: {formatCurrency(item.line_total, order.currency)}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  paddingTop: '16px',
                                  borderTop: '1px solid #e5e7eb'
                                }}>
                                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563' }}>Total Amount:</span>
                                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
                                    {formatCurrency(order.total_amount, order.currency)}
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                backgroundColor: 'white',
                padding: '12px 24px',
                borderTop: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    Show
                  </span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    style={{
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    per page
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{
                      padding: '4px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: currentPage === 1 ? '#f9fafb' : 'white',
                      color: currentPage === 1 ? '#9ca3af' : '#374151',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '4px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: currentPage === totalPages ? '#f9fafb' : 'white',
                      color: currentPage === totalPages ? '#9ca3af' : '#374151',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Summary Stats */}
        {orders.length > 0 && (
          <div style={{
            marginTop: '32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #f0e1cf',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  backgroundColor: '#fef3c7',
                  padding: '12px',
                  borderRadius: '12px'
                }}>
                  <FaShoppingBag style={{ width: '24px', height: '24px', color: '#dc9a6a' }} />
                </div>
                <div style={{ marginLeft: '16px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>Total Orders</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{orders.length}</p>
                </div>
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #f0e1cf',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  backgroundColor: '#dcfce7',
                  padding: '12px',
                  borderRadius: '12px'
                }}>
                  <FaCreditCard style={{ width: '24px', height: '24px', color: '#16a34a' }} />
                </div>
                <div style={{ marginLeft: '16px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>Total Spent</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                    {formatCurrency(
                      orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0),
                      orders[0]?.currency || 'NPR'
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #f0e1cf',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  backgroundColor: '#e9d5ff',
                  padding: '12px',
                  borderRadius: '12px'
                }}>
                  <FaShoppingBag style={{ width: '24px', height: '24px', color: '#8b5cf6' }} />
                </div>
                <div style={{ marginLeft: '16px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>Total Items</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                    {orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
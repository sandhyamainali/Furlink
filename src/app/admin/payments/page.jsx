"use client";

import { useState, useEffect } from "react";
import { CreditCard, Loader2, DollarSign, ShoppingCart, CheckCircle, Clock, XCircle, Search, Filter } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

const statusColors = {
  completed: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  failed: "bg-red-100 text-red-800 border-red-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
};

const statusIcons = {
  completed: CheckCircle,
  pending: Clock,
  failed: XCircle,
  processing: Clock,
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchWithAuth("/shop/orders/");
      
      if (result.error) {
        throw new Error(result.error);
      }

      const paymentsData = Array.isArray(result.data) ? result.data : [];
      
      if (paymentsData.length === 0) {
        // Use mock data for demonstration
        const mockPayments = generateMockPayments();
        setPayments(mockPayments);
        setFilteredPayments(mockPayments);
      } else {
        setPayments(paymentsData);
        setFilteredPayments(paymentsData);
      }
    } catch (err) {
      console.error('Fetch payments error:', err);
      const mockPayments = generateMockPayments();
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
      setError("Using demo data - API endpoint not available");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(payment => 
        payment.id?.toString().includes(searchTerm) ||
        payment.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    setFilteredPayments(filtered);
  }, [searchTerm, statusFilter, payments]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return "Invalid Date";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const getTotalRevenue = () => {
    return payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + (parseFloat(p.total_amount) || 0), 0);
  };

  const generateMockPayments = () => {
    return [
      {
        id: 1,
        user_email: "john@example.com",
        transaction_id: "TXN001234567",
        total_amount: 149.99,
        status: "completed",
        payment_method: "Credit Card",
        created_at: "2024-12-19T10:30:00Z",
        items: [
          { name: "Premium Dog Food", quantity: 2, price: 49.99 },
          { name: "Cat Toy Set", quantity: 1, price: 50.01 }
        ]
      },
      {
        id: 2,
        user_email: "jane@example.com",
        transaction_id: "TXN001234568",
        total_amount: 89.50,
        status: "completed",
        payment_method: "PayPal",
        created_at: "2024-12-18T15:45:00Z",
        items: [
          { name: "Pet Carrier", quantity: 1, price: 89.50 }
        ]
      },
      {
        id: 3,
        user_email: "bob@example.com",
        transaction_id: "TXN001234569",
        total_amount: 199.99,
        status: "pending",
        payment_method: "Credit Card",
        created_at: "2024-12-19T09:15:00Z",
        items: [
          { name: "Adoption Fee", quantity: 1, price: 199.99 }
        ]
      },
      {
        id: 4,
        user_email: "alice@example.com",
        transaction_id: "TXN001234570",
        total_amount: 75.00,
        status: "failed",
        payment_method: "Credit Card",
        created_at: "2024-12-17T14:20:00Z",
        items: [
          { name: "Pet Grooming Kit", quantity: 1, price: 75.00 }
        ]
      },
      {
        id: 5,
        user_email: "charlie@example.com",
        transaction_id: "TXN001234571",
        total_amount: 320.00,
        status: "completed",
        payment_method: "Debit Card",
        created_at: "2024-12-16T11:30:00Z",
        items: [
          { name: "Pet Bed", quantity: 2, price: 80.00 },
          { name: "Food Bowl Set", quantity: 4, price: 40.00 }
        ]
      }
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Site Administration</h1>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            Payments Management
          </h2>
          <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-lg border">
            {filteredPayments.length} payment{filteredPayments.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-yellow-700">{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalRevenue())}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {payments.filter(p => p.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {payments.filter(p => p.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by order ID, email, or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                const StatusIcon = statusIcons[payment.status] || Clock;
                return (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        #{payment.id}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{payment.user_email || 'N/A'}</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono text-gray-600">
                        {payment.transaction_id || 'N/A'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">
                        {formatCurrency(payment.total_amount)}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {payment.payment_method || 'N/A'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                        statusColors[payment.status] || "bg-gray-100 text-gray-800 border-gray-200"
                      }`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1) || 'Unknown'}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(payment.created_at)}
                    </td>
                    
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "No payment transactions have been recorded yet."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

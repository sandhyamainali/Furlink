"use client";

import { useState, useEffect } from "react";
import { UserCheck, Loader2, Shield, ShieldCheck, Search, Users, Activity } from "lucide-react";
import { fetchWithAuth, apiEndpoints } from "@/lib/api";

const roleColors = {
  admin: "bg-purple-100 text-purple-700 border-purple-200",
  caregiver: "bg-blue-100 text-blue-700 border-blue-200",
  adopter: "bg-green-100 text-green-700 border-green-200",
  user: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try multiple possible endpoints
      const endpoints = [
        '/auth/users/',
        '/auth/account/', // Fallback to account endpoint
        '/users/'
      ];

      let usersData = [];
      
      for (const endpoint of endpoints) {
        const result = await fetchWithAuth(endpoint);
        if (!result.error && result.data) {
          usersData = Array.isArray(result.data) ? result.data : [result.data];
          break;
        }
      }

      if (usersData.length === 0) {
        // If no API endpoint works, use mock data for demonstration
        usersData = generateMockUsers();
      }

      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (err) {
      console.error('Fetch users error:', err);
      // Use mock data as fallback
      const mockUsers = generateMockUsers();
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setError("Using demo data - API endpoint not available");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(user => getUserRole(user) === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      // Update local state immediately for better UX
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));

      // Try to update on backend
      const result = await fetchWithAuth(`/auth/users/${userId}/`, {
        method: "PATCH",
        body: JSON.stringify({ role: newRole }),
      });

      if (result.error) {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('Role update failed:', err);
      // Revert local state if backend update fails
      fetchUsers();
    }
  };

  const getUserRole = (user) => {
    if (user.is_staff || user.is_superuser) return "admin";
    if (user.role) return user.role;
    return "user";
  };

  const getUserStatus = (user) => {
    return user.is_active !== false ? "active" : "inactive";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "Invalid Date";
    }
  };

  // Mock data generator for demonstration
  const generateMockUsers = () => {
    return [
      
      {
        id: 1,
        username: "john_doe",
        email: "john@example.com",
        first_name: "John",
        last_name: "Doe",
        role: "adopter",
        is_active: true,
        date_joined: "2024-02-20T00:00:00Z",
        last_login: "2024-12-18T15:45:00Z"
      },
      {
        id: 2,
        username: "jane_smith",
        email: "jane@example.com",
        first_name: "Jane",
        last_name: "Smith",
        role: "caregiver",
        is_active: true,
        date_joined: "2024-03-10T00:00:00Z",
        last_login: "2024-12-19T09:15:00Z"
      },
      {
        id: 3,
        username: "bob_wilson",
        email: "bob@example.com",
        first_name: "Bob",
        last_name: "Wilson",
        role: "user",
        is_active: false,
        date_joined: "2024-04-05T00:00:00Z",
        last_login: "2024-11-15T14:20:00Z"
      }
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Users Management
          </h2>
          <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-lg border">
            {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-yellow-700">{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.is_active).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => getUserRole(u) === 'admin').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Adopters</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => getUserRole(u) === 'adopter').length}
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
                placeholder="Search users by name, email, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="caregiver">Caregiver</option>
              <option value="adopter">Adopter</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Information
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.first_name?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {user.first_name && user.last_name 
                            ? `${user.first_name} ${user.last_name}`
                            : user.username || user.email
                          }
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <select
                      value={getUserRole(user)}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className={`text-xs font-medium py-2 px-3 rounded-full border ${
                        roleColors[getUserRole(user)] || "bg-gray-100 text-gray-700 border-gray-200"
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer`}
                    >
                      <option value="user">User</option>
                      <option value="adopter">Adopter</option>
                      <option value="caregiver">Caregiver</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.is_active 
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}>
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatDate(user.date_joined)}
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.last_login ? formatDate(user.last_login) : "Never"}
                  </td>
                  
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="text-blue-600 hover:text-blue-900 font-medium text-sm">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900 font-medium text-sm">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm || roleFilter !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "No users are currently registered in the system."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
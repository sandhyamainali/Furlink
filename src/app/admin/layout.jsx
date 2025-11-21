
"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { API_BASE } from '@/lib/config';


export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';

    // For admin login (hardcoded), just check localStorage flags
    if (isAdmin && isAuth) {
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }

    // For regular users, check token
    if (!token) {
      router.replace('/admin/login');
      setLoading(false);
      return;
    }

    // Verify token with backend
    try {
      const response = await fetch(`${API_BASE}/auth/account/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        // Token invalid, clear and redirect
        localStorage.removeItem('adminToken');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('isAuthenticated');
        router.replace('/admin/login');
      }
    } catch (error) {
      // On network error, allow access (offline mode)
      console.warn('Auth check failed, allowing access:', error);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('furlink_user');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  // Special case for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return isAuthenticated ? (
    <div className="admin-layout">
      <AdminSidebar onLogout={logout} />
      <main className="admin-main-content">
        <AdminHeader onLogout={logout} />
        {children}
      </main>
    </div>
  ) : (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-slate-600">Redirecting to login...</div>
    </div>
  );
}

function AdminSidebar({ onLogout }) {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        <a href="/admin" className="nav-item">Dashboard</a>
        <a href="/admin/users" className="nav-item">Users</a>
        <a href="/admin/pets" className="nav-item">Pets</a>
        <a href="/admin/adoptions" className="nav-item">Adoptions</a>
        <a href="/admin/categories" className="nav-item">Categories</a>
        <a href="/admin/payments" className="nav-item">Payments</a>
        <button  onClick={onLogout} className="nav-item logout-btn abutton">Logout</button>
      </nav>
    </aside>
  );
}

function AdminHeader({ onLogout }) {
  return (
    <header className="admin-header">
      <div className="aheader-content">
        <h1>Site Administration</h1>
        <div className="header-actions">
          <span>Welcome, Admin</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </header>
  );
}
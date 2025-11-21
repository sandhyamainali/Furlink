// src/app/admin/page.jsx
"use client";

import { useState, useEffect } from 'react';
import { fetchWithAuth } from "@/lib/api";
import { API_BASE } from '@/lib/config';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    pets: 0,
    adoptions: 0,
    payments: 0
  });
  const [recentActions, setRecentActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [partialLoading, setPartialLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch essential data first (pets and adoptions)
      const [petsRes, adoptionsRes] = await Promise.all([
        fetchWithAuth("/pet/pets/"),
        fetchWithAuth("/pet/adoptions/")
      ]);

      const petsData = petsRes.data || [];
      const adoptionsData = adoptionsRes.data || [];

      setStats(prev => ({
        ...prev,
        pets: Array.isArray(petsData) ? petsData.length : 0,
        adoptions: Array.isArray(adoptionsData) ? adoptionsData.length : 0
      }));

      // Generate recent actions from real data
      const actions = [];
      if (adoptionsData.length > 0) {
        const recentAdoption = adoptionsData[adoptionsData.length - 1];
        actions.push({
          type: 'Adoption',
          name: `New adoption for ${recentAdoption.pet_name || 'pet'}`,
          time: 'Recently'
        });
      }
      if (petsData.length > 0) {
        const recentPet = petsData[petsData.length - 1];
        actions.push({
          type: 'Pet',
          name: `New pet: ${recentPet.name || 'Unnamed'}`,
          time: 'Recently'
        });
      }
      actions.push(
        { type: 'User', name: 'New registration', time: '2 hours ago' },
        { type: 'System', name: 'Backup completed', time: '1 day ago' }
      );
      setRecentActions(actions.slice(0, 5));

      // Load secondary data in background
      setPartialLoading(true);
      fetchWithAuth("/auth/users/").then(usersRes => {
        const usersData = usersRes.data || [];
        setStats(prev => ({ ...prev, users: Array.isArray(usersData) ? usersData.length : 0 }));
      }).catch(err => console.warn("Failed to fetch users:", err));

      fetchWithAuth("/shop/orders/").then(paymentsRes => {
        const paymentsData = paymentsRes.data || [];
        setStats(prev => ({ ...prev, payments: Array.isArray(paymentsData) ? paymentsData.length : 0 }));
      }).catch(err => console.warn("Failed to fetch payments:", err))
      .finally(() => setPartialLoading(false));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <div style={{ color: "#666", fontSize: "16px" }}>Loading dashboard...</div>
        <div style={{ marginTop: 10, width: "200px", height: "4px", background: "#f0f0f0", borderRadius: "2px", margin: "20px auto" }}>
          <div style={{
            width: "30%",
            height: "100%",
            background: "#417690",
            borderRadius: "2px",
            animation: "loading 1.5s ease-in-out infinite"
          }}></div>
        </div>
        <style jsx>{`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 50%; }
            100% { width: 30%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: 4 }}>Site administration</h1>
        <div style={{ fontSize: "0.875rem", color: "#666", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span><a href="/admin" style={{ color: "#666", textDecoration: "none" }}>Home</a></span>
          <button className='abutton'
            onClick={() => {
              setLoading(true);
              fetchDashboardData();
            }}
            disabled={loading}
            style={{
              background: "#417690",
              color: "#fff",
              border: "none",
              padding: "4px 12px",
              borderRadius: 4,
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "0.75rem",
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginBottom: 40 }}>
        <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4, padding: 20 }}>
          <div style={{ padding: 16, borderBottom: "1px solid #ddd", background: "#f8f8f8" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>Users</h2>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 8 }}>
              {partialLoading && stats.users === 0 ? "..." : stats.users}
            </div>
            <div style={{ fontSize: "0.875rem", color: "#666" }}>registered users</div>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4, padding: 20 }}>
          <div style={{ padding: 16, borderBottom: "1px solid #ddd", background: "#f8f8f8" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>Pets</h2>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 8 }}>{stats.pets}</div>
            <div style={{ fontSize: "0.875rem", color: "#666" }}>total pets</div>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4, padding: 20 }}>
          <div style={{ padding: 16, borderBottom: "1px solid #ddd", background: "#f8f8f8" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>Adoptions</h2>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 8 }}>{stats.adoptions}</div>
            <div style={{ fontSize: "0.875rem", color: "#666" }}>adoption requests</div>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4, padding: 20 }}>
          <div style={{ padding: 16, borderBottom: "1px solid #ddd", background: "#f8f8f8" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>Orders</h2>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 8 }}>
              {partialLoading && stats.payments === 0 ? "..." : stats.payments}
            </div>
            <div style={{ fontSize: "0.875rem", color: "#666" }}>shop orders</div>
          </div>
        </div>
      </div>

      {/* Recent Actions */}
      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: 20 }}>Recent actions</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
          <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4 }}>
            <div style={{ padding: 16, borderBottom: "1px solid #ddd", background: "#f8f8f8" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>Latest activity</h3>
            </div>
            <div style={{ padding: 16 }}>
              {recentActions.length === 0 ? (
                <p style={{ color: "#666", fontStyle: "italic" }}>No recent activity</p>
              ) : (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {recentActions.map((action, index) => (
                    <li key={index} style={{ padding: "8px 0", borderBottom: index < recentActions.length - 1 ? "1px solid #eee" : "none" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ fontWeight: "bold", color: "#417690" }}>{action.type}</span>
                          <span style={{ marginLeft: 8, color: "#333" }}>{action.name}</span>
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#666" }}>{action.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
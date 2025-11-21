// src/app/admin/page.jsx
"use client";

import { useState, useEffect } from 'react';
import { fetchWithAuth } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    pets: 0,
    adoptions: 0,
    payments: 0
  });
  const [recentActions, setRecentActions] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentPets, setRecentPets] = useState([]);
  const [recentAdoptions, setRecentAdoptions] = useState([]);
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

      // Store recent data
      setRecentPets(Array.isArray(petsData) ? petsData.slice(-5).reverse() : []);
      setRecentAdoptions(Array.isArray(adoptionsData) ? adoptionsData.slice(-5).reverse() : []);

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
      setRecentActions(actions.slice(0, 5));

      // Load secondary data in background
      setPartialLoading(true);
      fetchWithAuth("/auth/users/").then(usersRes => {
        const usersData = usersRes.data || [];
        setStats(prev => ({ ...prev, users: Array.isArray(usersData) ? usersData.length : 0 }));
        setRecentUsers(Array.isArray(usersData) ? usersData.slice(-5).reverse() : []);
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
          <button
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
        <a href="/admin/users" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4, padding: 20, cursor: "pointer", transition: "transform 0.2s", ":hover": { transform: "translateY(-2px)" } }}>
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
        </a>

        <a href="/admin/pets" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4, padding: 20, cursor: "pointer" }}>
            <div style={{ padding: 16, borderBottom: "1px solid #ddd", background: "#f8f8f8" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>Pets</h2>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 8 }}>{stats.pets}</div>
              <div style={{ fontSize: "0.875rem", color: "#666" }}>total pets</div>
            </div>
          </div>
        </a>

        <a href="/admin/adoptions" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4, padding: 20, cursor: "pointer" }}>
            <div style={{ padding: 16, borderBottom: "1px solid #ddd", background: "#f8f8f8" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>Adoptions</h2>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 8 }}>{stats.adoptions}</div>
              <div style={{ fontSize: "0.875rem", color: "#666" }}>adoption requests</div>
            </div>
          </div>
        </a>

        <a href="/admin/payments" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4, padding: 20, cursor: "pointer" }}>
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
        </a>
      </div>

      {/* Recent Data Grid */}
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        
        {/* Recent Users */}
        <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4 }}>
          <div style={{ padding: 16, borderBottom: "1px solid #ddd", background: "#f8f8f8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>Recent Users</h3>
            <a href="/admin/users" style={{ fontSize: "0.875rem", color: "#417690", textDecoration: "none" }}>View all →</a>
          </div>
          <div style={{ padding: 16 }}>
            {recentUsers.length === 0 ? (
              <p style={{ color: "#666", fontStyle: "italic", fontSize: "0.875rem" }}>No users yet</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {recentUsers.map((user, index) => (
                  <li key={user.id || index} style={{ padding: "8px 0", borderBottom: index < recentUsers.length - 1 ? "1px solid #eee" : "none" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: "500", color: "#333" }}>{user.username || user.email || 'User'}</div>
                    <div style={{ fontSize: "0.75rem", color: "#666" }}>{user.email}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent Pets */}
        <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4 }}>
          <div style={{ padding: 16, borderBottom: "1px solid #ddd", background: "#f8f8f8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>Recent Pets</h3>
            <a href="/admin/pets" style={{ fontSize: "0.875rem", color: "#417690", textDecoration: "none" }}>View all →</a>
          </div>
          <div style={{ padding: 16 }}>
            {recentPets.length === 0 ? (
              <p style={{ color: "#666", fontStyle: "italic", fontSize: "0.875rem" }}>No pets yet</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {recentPets.map((pet, index) => (
                  <li key={pet.id || index} style={{ padding: "8px 0", borderBottom: index < recentPets.length - 1 ? "1px solid #eee" : "none" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: "500", color: "#333" }}>{pet.name || 'Unnamed Pet'}</div>
                    <div style={{ fontSize: "0.75rem", color: "#666" }}>{pet.breed || 'Unknown breed'} • {pet.age || 'Age unknown'}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent Adoptions */}
        <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4 }}>
          <div style={{ padding: 16, borderBottom: "1px solid #ddd", background: "#f8f8f8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>Recent Adoptions</h3>
            <a href="/admin/adoptions" style={{ fontSize: "0.875rem", color: "#417690", textDecoration: "none" }}>View all →</a>
          </div>
          <div style={{ padding: 16 }}>
            {recentAdoptions.length === 0 ? (
              <p style={{ color: "#666", fontStyle: "italic", fontSize: "0.875rem" }}>No adoptions yet</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {recentAdoptions.map((adoption, index) => (
                  <li key={adoption.id || index} style={{ padding: "8px 0", borderBottom: index < recentAdoptions.length - 1 ? "1px solid #eee" : "none" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: "500", color: "#333" }}>{adoption.pet_name || 'Pet'}</div>
                    <div style={{ fontSize: "0.75rem", color: "#666" }}>
                      Status: <span style={{ 
                        padding: "2px 6px", 
                        borderRadius: "3px", 
                        background: adoption.status === 'approved' ? '#d4edda' : '#fff3cd',
                        color: adoption.status === 'approved' ? '#155724' : '#856404'
                      }}>{adoption.status || 'pending'}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
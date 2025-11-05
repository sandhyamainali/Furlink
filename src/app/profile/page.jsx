"use client";
import { useUser } from "@/context/userContext";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ProfilePage() {
  const { user, isAuthenticated, setUser } = useUser();
  const { cartItems } = useCart();
  const [listings, setListings] = useState([]);
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Load user's listings (demo via localStorage)
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("furlink_listings") : null;
      const all = raw ? JSON.parse(raw) : [];
      // Scope to current user if email available; else show all
      const scoped = user?.email ? all.filter((l) => (l.contactEmail || "").toLowerCase() === user.email.toLowerCase()) : all;
      setListings(scoped);
    } catch {
      setListings([]);
    }
  }, [user]);

  // Derived stats
  const stats = useMemo(() => {
    const total = listings.length;
    const permanent = listings.filter((l) => l.adoptionType === "Permanent").length;
    const temporary = listings.filter((l) => l.adoptionType === "Temporary").length;
    // Consider "Available" vs others inferred from description/adoptionType (demo just sets all as Active)
    const active = total;
    return { total, permanent, temporary, active };
  }, [listings]);

  // Filtered + searched listings for table display
  const filteredListings = useMemo(() => {
    let arr = [...listings];
    if (statusFilter !== "All") {
      // Demo: treat all as Active; keep hook for future backend
      if (statusFilter === "Active") arr = arr; else arr = [];
    }
    if (roleFilter !== "All") {
      // Not applicable; placeholder for future roles
      arr = arr;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter((l) =>
        (l.petName || "").toLowerCase().includes(q) ||
        (l.type || "").toLowerCase().includes(q) ||
        (l.breed || "").toLowerCase().includes(q) ||
        (l.location || "").toLowerCase().includes(q)
      );
    }
    return arr;
  }, [listings, roleFilter, statusFilter, search]);

  function handleDeleteListing(id) {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("furlink_listings") : null;
      const all = raw ? JSON.parse(raw) : [];
      const updated = all.filter((l) => l.id !== id);
      localStorage.setItem("furlink_listings", JSON.stringify(updated));
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch {}
  }

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 12 }}>You are not logged in</h2>
        <p style={{ marginBottom: 16 }}>Please log in to view your profile and cart.</p>
        <Link className="login-button" href="/login">Go to Login</Link>
      </div>
    );
  }

  const fullName = user.name || (user.email ? user.email.split("@")[0] : "");

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 16 }}>Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button
          onClick={() => setUser(null)}
          style={{
            backgroundColor: "#ef4444",
            color: "#fff",
            padding: "8px 14px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Log out
        </button>
      </div>

      {/* Top stats */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[{ label: "Total Listings", value: stats.total }, { label: "Active", value: stats.active }, { label: "Permanent", value: stats.permanent }, { label: "Temporary", value: stats.temporary }].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ color: "#666", fontSize: 14, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{s.value}</div>
          </div>
        ))}
      </section>

      {/* Profile + Cart summary */}
      <section style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 20 }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>User Details</h3>
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", rowGap: 8 }}>
          <div style={{ fontWeight: 600 }}>Name</div>
          <div>{fullName}</div>
          <div style={{ fontWeight: 600 }}>Email</div>
          <div>{user.email}</div>
          {user.phone && (<><div style={{ fontWeight: 600 }}>Phone</div><div>{user.phone}</div></>)}
          {user.address && (<><div style={{ fontWeight: 600 }}>Address</div><div>{user.address}</div></>)}
        </div>
      </section>

      <section style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Cart</h3>
          <Link href="/cart" className="login-button">Open Cart</Link>
        </div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px", gap: 8, alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{item.title || item.name || `Item ${item.id}`}</div>
                  {item.description && <div style={{ color: "#666", fontSize: 14 }}>{item.description}</div>}
                </div>
                <div>Qty: {item.quantity || 1}</div>
                <div>{item.price ? `$${item.price}` : ""}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Listings management */}
      <section style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Your Listings</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              placeholder="Search listings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
            />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}>
              <option>All</option>
              <option>Active</option>
            </select>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}>
              <option>All</option>
            </select>
            <Link href="/adopter/submit" className="login-button">Add Listing</Link>
          </div>
        </div>

        {filteredListings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                  <th style={{ padding: "10px 8px" }}>Pet</th>
                  <th style={{ padding: "10px 8px" }}>Type</th>
                  <th style={{ padding: "10px 8px" }}>Adoption</th>
                  <th style={{ padding: "10px 8px" }}>Location</th>
                  <th style={{ padding: "10px 8px" }}>Contact</th>
                  <th style={{ padding: "10px 8px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.map((l) => (
                  <tr key={l.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "10px 8px", fontWeight: 600 }}>{l.petName}</td>
                    <td style={{ padding: "10px 8px" }}>{l.type} • {l.breed}</td>
                    <td style={{ padding: "10px 8px" }}>{l.adoptionType}</td>
                    <td style={{ padding: "10px 8px" }}>{l.location}</td>
                    <td style={{ padding: "10px 8px" }}>{l.contactEmail}</td>
                    <td style={{ padding: "10px 8px", display: "flex", gap: 8 }}>
                      <button
                        onClick={() => handleDeleteListing(l.id)}
                        style={{ background: "#fee2e2", color: "#991b1b", padding: "6px 10px", border: "none", borderRadius: 6, cursor: "pointer" }}
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
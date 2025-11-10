"use client";
import { useUser } from "@/context/userContext";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { initiatePayment, simulateCallback, getTransaction, renderAndSubmitEsewaForm } from "../../lib/clientApi";

export default function ProfilePage() {
  const { user, isAuthenticated, setUser, balance, setBalance } = useUser();
  const { cartItems } = useCart();
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  // 🐾 My Pets state
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [showPetForm, setShowPetForm] = useState(false);
  const [petForm, setPetForm] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    img:"",
    description: "",
  });

  // Balance state
  const [loadAmount, setLoadAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("esewa");
  const [accountData, setAccountData] = useState(null);
  const [accountLoading, setAccountLoading] = useState(true);
  const [loadBalanceStatus, setLoadBalanceStatus] = useState(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  

  // Load user's listings
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("furlink_listings") : null;
      const all = raw ? JSON.parse(raw) : [];
      const scoped = user?.email ? all.filter((l) => (l.contactEmail || "").toLowerCase() === user.email.toLowerCase()) : all;
      setListings(scoped);
    } catch {
      setListings([]);
    }
  }, [user]);

  // Load pets
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("furlink_pets") : null;
      const all = raw ? JSON.parse(raw) : [];
      const scoped = user?.email ? all.filter((p) => p.owner === user.email) : [];
      setPets(scoped);
    } catch {
      setPets([]);
    }
  }, [user]);

  // Load account data
  useEffect(() => {
    const fetchAccountData = async () => {
      if (!isAuthenticated) {
        setAccountLoading(false);
        return;
      }

      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
        if (!token) {
          setAccountLoading(false);
          return;
        }

        const API_BASE = 'https://furlink-backend.vercel.app';
        const res = await fetch(`${API_BASE}/auth/account/`, {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setAccountData(data[0]); // Take the first account
            setBalance(parseFloat(data[0].balance) || 0); // Update balance in context
          }
        }
      } catch (err) {
        console.error('Failed to fetch account data', err);
      } finally {
        setAccountLoading(false);
      }
    };

    fetchAccountData();
  }, [isAuthenticated, setBalance]);

  // Derived stats
  const stats = useMemo(() => {
    const total = listings.length;
    const permanent = listings.filter((l) => l.adoptionType === "Permanent").length;
    const temporary = listings.filter((l) => l.adoptionType === "Temporary").length;
    const active = total;
    return { total, permanent, temporary, active };
  }, [listings]);

  // Filtered listings
  const filteredListings = useMemo(() => {
    let arr = [...listings];
    if (statusFilter !== "All" && statusFilter !== "Active") arr = [];
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
      const raw = localStorage.getItem("furlink_listings");
      const all = raw ? JSON.parse(raw) : [];
      const updated = all.filter((l) => l.id !== id);
      localStorage.setItem("furlink_listings", JSON.stringify(updated));
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch {}
  }

  // 🐾 Pet CRUD functions
  function handlePetInputChange(e) {
    const { name, value } = e.target;
    setPetForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddOrUpdatePet(e) {
    e.preventDefault();
    const raw = localStorage.getItem("furlink_pets");
    const all = raw ? JSON.parse(raw) : [];

    if (editingPet) {
      // Update
      const updated = all.map((p) => (p.id === editingPet.id ? { ...editingPet, ...petForm } : p));
      localStorage.setItem("furlink_pets", JSON.stringify(updated));
      setPets(updated.filter((p) => p.owner === user.email));
      setEditingPet(null);
    } else {
      // Add new
      const newPet = { id: Date.now(), ...petForm, owner: user.email };
      const updated = [...all, newPet];
      localStorage.setItem("furlink_pets", JSON.stringify(updated));
      setPets(updated.filter((p) => p.owner === user.email));
    }

    setPetForm({ name: "", type: "", breed: "", age: "", img: "", description: "" });
    setShowPetForm(false);
  }

  function handleEditPet(pet) {
    setEditingPet(pet);
    setPetForm({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      img: pet.img || "",
      description: pet.description,
    });
    setShowPetForm(true);
  }

  function handleDeletePet(id) {
    const raw = localStorage.getItem("furlink_pets");
    const all = raw ? JSON.parse(raw) : [];
    const updated = all.filter((p) => p.id !== id);
    localStorage.setItem("furlink_pets", JSON.stringify(updated));
    setPets(updated.filter((p) => p.owner === user.email));
  }

  function handleCancelForm() {
    setPetForm({ name: "", type: "", breed: "", age: "", img: "", description: "" });
    setEditingPet(null);
    setShowPetForm(false);
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetForm((prev) => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  // Balance functions
  async function handleLoadBalance(e) {
    e.preventDefault();
    const amount = parseFloat(loadAmount);
    if (amount <= 0) return;

    setIsLoadingBalance(true);
    setLoadBalanceStatus(null);

    try {
      if (selectedPaymentMethod === "esewa") {
        // Step 1: Initiate Payment
        const successUrl = 'https://furlink-backend.vercel.app/payment/success/';
        const failureUrl = 'https://furlink-backend.vercel.app/payment/failure/';
        const { data: initData, error: initError } = await initiatePayment(amount, "EPAYTEST", successUrl, failureUrl);

        if (initError) {
          setLoadBalanceStatus(`Step 1 Failed: ${initError}`);
          setIsLoadingBalance(false);
          return;
        }

        const { tx_uuid, form_html } = initData;
        setLoadBalanceStatus(`Step 1: Payment Initiated ✅ (tx_uuid: ${tx_uuid})`);

        // Step 2: Render and submit eSewa form
        if (form_html) {
          setLoadBalanceStatus(`Step 2: Redirecting to eSewa...`);
          renderAndSubmitEsewaForm(form_html);
          // Wait a moment for form submission
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

        // Step 3: Simulate Callback (after user returns from eSewa)
        const { data: callbackData, error: callbackError } = await simulateCallback(tx_uuid);

        if (callbackError) {
          setLoadBalanceStatus(`Step 2 Failed: ${callbackError}`);
          setIsLoadingBalance(false);
          return;
        }

        setLoadBalanceStatus(`Step 3: Callback Received ✅ (status: SUCCESS)`);

        // Step 4: Get Transaction
        const { data: transactionData, error: transactionError } = await getTransaction(tx_uuid);

        if (transactionError) {
          setLoadBalanceStatus(`Step 3 Failed: ${transactionError}`);
          setIsLoadingBalance(false);
          return;
        }

        setLoadBalanceStatus(`Step 4: Transaction Verified ✅ (status: ${transactionData.status})`);

        // Step 5: Complete and update balance
        if (transactionData.status === 'COMPLETED') {
          setLoadBalanceStatus(`Step 5: Balance Loaded 🎉`);
          setBalance(prev => prev + amount);
          setLoadAmount("");
        } else {
          setLoadBalanceStatus(`Step 5: Payment not completed (status: ${transactionData.status})`);
        }

      } else if (selectedPaymentMethod === "khalti") {
        // For Khalti, you can implement similar logic or keep as alert for now
        alert(`Khalti integration not implemented yet. Amount: Rs ${amount}`);
        setBalance(prev => prev + amount);
        setLoadAmount("");
      }
    } catch (err) {
      setLoadBalanceStatus(`Error: ${err.message}`);
    } finally {
      setIsLoadingBalance(false);
    }
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

  const fullName =
    user?.first_name || user?.firstName || user?.name
      ? `${user?.first_name || user?.firstName || user?.name}${user?.last_name ? " " + user.last_name : ""}`
      : user?.email?.split("@")[0];

  function handleLogout() {
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("furlink_user");
    } catch {}
    setUser(null);
    router.push("/");
  }

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 16 }}>Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button
          onClick={handleLogout}
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

      {/* Stats */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[{ label: "Total Listings", value: stats.total }, { label: "Active", value: stats.active }, { label: "Permanent", value: stats.permanent }, { label: "Temporary", value: stats.temporary }].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ color: "#666", fontSize: 14, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{s.value}</div>
          </div>
        ))}
      </section>

      {/* 👤 Profile */}
      <section style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
          {/* User Details */}
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>User Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", rowGap: 8 }}>
              <div style={{ fontWeight: 600 }}>Name</div>
              <div>{fullName}</div>
              <div style={{ fontWeight: 600 }}>Email</div>
              <div>{user.email}</div>
            </div>
          </div>

          {/* My Account */}
          <div style={{ borderLeft: "1px solid #eee", paddingLeft: 20 }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>My Account</h3>
            <div style={{ marginBottom: 16 }}>
              {accountLoading ? (
                <div style={{ color: "#666", fontSize: "0.9rem" }}>Loading account...</div>
              ) : accountData ? (
                <>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2563eb", marginBottom: 4 }}>
                    {accountData.currency} {parseFloat(accountData.balance).toFixed(2)}
                  </div>
                  <div style={{ color: "#666", fontSize: "0.9rem" }}>Available Balance</div>
                  <div style={{ color: "#666", fontSize: "0.8rem", marginTop: 4 }}>
                    {/* Account ID: {accountData.id} */}
                  </div>
                </>
              ) : (
                <div style={{ color: "#666", fontSize: "0.9rem" }}>No account data available</div>
              )}
            </div>

            {/* Load Balance Form */}
            <form onSubmit={handleLoadBalance} style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 12 }}>
                <input
                  type="number"
                  value={loadAmount}
                  onChange={(e) => setLoadAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  step="0.01"
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: 4,
                    marginBottom: 8
                  }}
                />
                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: 4
                  }}
                >
                  <option value="esewa">eSewa</option>
                  <option value="khalti">Khalti</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isLoadingBalance}
                style={{
                  width: "100%",
                  backgroundColor: isLoadingBalance ? "#9ca3af" : "#2563eb",
                  color: "#fff",
                  padding: "10px",
                  border: "none",
                  borderRadius: 4,
                  cursor: isLoadingBalance ? "not-allowed" : "pointer",
                  fontWeight: 600
                }}
              >
                {isLoadingBalance ? 'Processing...' : 'Load Balance'}
              </button>
              {loadBalanceStatus && (
                <p style={{ marginTop: 10, color: loadBalanceStatus.includes('Failed') || loadBalanceStatus.includes('Error') ? 'red' : 'green', fontSize: '0.9rem' }}>
                  {loadBalanceStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 🛒 Cart */}
      <section style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Cart</h3>
          <Link href="/cart" className="login-button">Open Cart</Link>
        </div>
        {cartItems.length === 0 ? <p>Your cart is empty.</p> : cartItems.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </section>

      {/* 🐾 My Pets CRUD Section */}
      <section style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>My pet</h3>
          <button
            onClick={() => setShowPetForm(true)}
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "8px 14px",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Add a pet
          </button>
        </div>

        {/* Add/Edit Form */}
        {showPetForm && (
          <form onSubmit={handleAddOrUpdatePet} style={{ display: "grid", gap: 8, marginBottom: 16, border: "1px solid #eee", padding: 16, borderRadius: 8 }}>
            <input name="name" value={petForm.name} onChange={handlePetInputChange} placeholder="Pet Name" required />
            <input name="type" value={petForm.type} onChange={handlePetInputChange} placeholder="Type of pet (e.g. Dog)" required />
            <input name="breed" value={petForm.breed} onChange={handlePetInputChange} placeholder="Breed" />
            <input name="age" value={petForm.age} onChange={handlePetInputChange} placeholder="Age" />
            <div>
              <label>Upload Image of pet:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: 4 }} />
            </div>
            <textarea name="description" value={petForm.description} onChange={handlePetInputChange} placeholder="Description"></textarea>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit" style={{ background: "#2563eb", color: "#fff", padding: 8, border: "none", borderRadius: 6, cursor: "pointer", flex: 1 }}>
                {editingPet ? "Update Pet" : "Add Pet"}
              </button>
              <button type="button" onClick={handleCancelForm} style={{ background: "#6b7280", color: "#fff", padding: 8, border: "none", borderRadius: 6, cursor: "pointer", flex: 1 }}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Pets List */}
        {pets.length === 0 ? (
          <p>No pets added yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
                <th>Type</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "8px" }}>{p.name}</td>
                  <td>{p.type}</td>
                  <td>{p.breed}</td>
                  <td>{p.age}</td>
                  <td>{p.description}</td>
                  <td>{p.img ? <img src={p.img} alt={p.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} /> : "No image"}</td>
                  <td style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                    <button onClick={() => handleEditPet(p)} style={{ background: "#dbeafe", border: "none", padding: "4px 8px", borderRadius: 4, cursor: "pointer" }}>Edit</button>
                    <button onClick={() => handleDeletePet(p.id)} style={{ background: "#fee2e2", border: "none", padding: "4px 8px", borderRadius: 4, cursor: "pointer", color: "#991b1b" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

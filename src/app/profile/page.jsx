"use client";
import { useUser } from "@/context/userContext";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/config";

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
    species: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    weight: "",
    health_issues: "",
    vaccination_status: "",
    description: "",
    is_available_for_adoption: false,
    adoption_price: "",
    adoption_days: 1,
    currency: "USD"
  });
  const [petImage, setPetImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [petsLoading, setPetsLoading] = useState(false);
  const [petsError, setPetsError] = useState(null);

  // 🏠 My Adoptions state
  const [adoptions, setAdoptions] = useState([]);
  const [adoptionsLoading, setAdoptionsLoading] = useState(false);
  const [adoptionsError, setAdoptionsError] = useState(null);

  // Account / balance state
  const [accountData, setAccountData] = useState(null);
  const [accountLoading, setAccountLoading] = useState(true);
  const [toast, setToast] = useState(null);

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

  // Listen for payment completion messages
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = async (ev) => {
      try {
        if (!ev?.data || ev.data.type !== 'payment:completed') return;
        const tx = ev.data.tx_uuid;
        const token = localStorage.getItem('access');
        if (!token) return;
        try {
          const res = await fetch(`${API_BASE}/auth/account/`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } });
          if (res.ok) {
            const aData = await res.json();
            if (aData && aData.length > 0) {
              setAccountData(aData[0]);
              setBalance(parseFloat(aData[0].balance) || 0);
              try { showToast('Payment completed — balance updated', 'success'); } catch (e) { setToast({ msg: 'Payment completed', type: 'success' }); }
            }
          }
        } catch (e) {
          // ignore
        }
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [setBalance]);

  // Load pets from API
  const fetchPets = async () => {
    if (!isAuthenticated) return;
    
    setPetsLoading(true);
    setPetsError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE}/pet/my-pets/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch pets: ${response.status}`);
      }

      const petsData = await response.json();
      setPets(petsData);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setPetsError(err.message);
      showToast('Failed to load pets', 'error');
    } finally {
      setPetsLoading(false);
    }
  };

  // Load adoptions from API
  const fetchAdoptions = async () => {
    if (!isAuthenticated) return;
    
    setAdoptionsLoading(true);
    setAdoptionsError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE}/pet/adoptions/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch adoptions: ${response.status}`);
      }

      const adoptionsData = await response.json();
      setAdoptions(adoptionsData);
    } catch (err) {
      console.error('Error fetching adoptions:', err);
      setAdoptionsError(err.message);
      showToast('Failed to load adoptions', 'error');
    } finally {
      setAdoptionsLoading(false);
    }
  };

  // Load pets and adoptions on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchPets();
      fetchAdoptions();
    }
  }, [isAuthenticated]);

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

        const res = await fetch(`${API_BASE}/auth/account/`, {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setAccountData(data[0]);
            setBalance(parseFloat(data[0].balance) || 0);
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

  // Exposed function to refresh account/balance
  async function refreshAccountData() {
    setAccountLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
      if (!token) {
        setAccountLoading(false);
        setToast({ msg: 'Not authenticated', type: 'error' });
        return;
      }
      const res = await fetch(`${API_BASE}/auth/account/`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setAccountData(data[0]);
          setBalance(parseFloat(data[0].balance) || 0);
          setToast({ msg: 'Balance refreshed', type: 'success' });
        }
      } else {
        setToast({ msg: 'Failed to refresh balance', type: 'error' });
      }
    } catch (e) {
      setToast({ msg: 'Failed to refresh balance', type: 'error' });
    } finally {
      setAccountLoading(false);
    }
  }

  // small toast helper
  function showToast(msg, type = 'info', timeout = 3000) {
    setToast({ msg, type });
    setTimeout(() => setToast(null), timeout);
  }

  // Derived stats
  // const stats = useMemo(() => {
  //   const total = listings.length;
  //   const permanent = listings.filter((l) => l.adoptionType === "Permanent").length;
  //   const temporary = listings.filter((l) => l.adoptionType === "Temporary").length;
  //   const active = total;
  //   return { total, permanent, temporary, active };
  // }, [listings]);

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
    const { name, value, type, checked } = e.target;
    setPetForm((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  }

  // Handle image upload
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPetImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove image
  function handleRemoveImage() {
    setPetImage(null);
    setImagePreview(null);
    // Clear file input
    const fileInput = document.getElementById('pet-image');
    if (fileInput) fileInput.value = '';
  }

  async function handleAddOrUpdatePet(e) {
    e.preventDefault();
    
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
      if (!token) {
        showToast('Please log in to manage pets', 'error');
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(petForm).forEach(key => {
        if (key === 'adoption_price' && !petForm[key]) {
          formData.append(key, "0.00");
        } else if (key === 'age' || key === 'weight' || key === 'adoption_days') {
          formData.append(key, petForm[key] || "0");
        } else if (key === 'is_available_for_adoption') {
          formData.append(key, petForm[key] ? "true" : "false");
        } else {
          formData.append(key, petForm[key] || "");
        }
      });

      // Append image if exists
      if (petImage) {
        formData.append('image', petImage);
      }

      let response;
      if (editingPet) {
        // Update existing pet - use PATCH and FormData
        response = await fetch(`${API_BASE}/pet/my-pets/${editingPet.id}/`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
      } else {
        // Create new pet - use POST and FormData
        response = await fetch(`${API_BASE}/pet/my-pets/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(`Failed to ${editingPet ? 'update' : 'create'} pet: ${response.status} - ${errorData?.message || 'Unknown error'}`);
      }

      showToast(`Pet ${editingPet ? 'updated' : 'added'} successfully`, 'success');
      
      // Refresh pets list
      await fetchPets();
      
      // Reset form and image
      setPetForm({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        color: "",
        weight: "",
        health_issues: "",
        vaccination_status: "",
        description: "",
        is_available_for_adoption: false,
        adoption_price: "",
        adoption_days: 1,
        currency: "USD"
      });
      setPetImage(null);
      setImagePreview(null);
      setEditingPet(null);
      setShowPetForm(false);
      
    } catch (err) {
      console.error('Error saving pet:', err);
      showToast(`Failed to ${editingPet ? 'update' : 'add'} pet: ${err.message}`, 'error');
    }
  }

  async function handleDeletePet(id) {
    if (!confirm('Are you sure you want to delete this pet?')) return;

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
      if (!token) {
        showToast('Please log in to delete pets', 'error');
        return;
      }

      const response = await fetch(`${API_BASE}/pet/my-pets/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete pet: ${response.status}`);
      }

      showToast('Pet deleted successfully', 'success');
      
      // Refresh pets list
      await fetchPets();
      
    } catch (err) {
      console.error('Error deleting pet:', err);
      showToast('Failed to delete pet', 'error');
    }
  }

  function handleEditPet(pet) {
    setEditingPet(pet);
    setPetForm({
      name: pet.name || "",
      species: pet.species || "",
      breed: pet.breed || "",
      age: pet.age?.toString() || "",
      gender: pet.gender || "",
      color: pet.color || "",
      weight: pet.weight?.toString() || "",
      health_issues: pet.health_issues || "",
      vaccination_status: pet.vaccination_status || "",
      description: pet.description || "",
      is_available_for_adoption: pet.is_available_for_adoption || false,
      adoption_price: pet.adoption_price || "",
      adoption_days: pet.adoption_days || 1,
      currency: pet.currency || "USD"
    });
    // Set image preview if pet has an image
    if (pet.image) {
      setImagePreview(`${API_BASE}${pet.image}`);
    } else {
      setImagePreview(null);
    }
    setPetImage(null);
    setShowPetForm(true);
  }

  function handleCancelForm() {
    setPetForm({
      name: "",
      species: "",
      breed: "",
      age: "",
      gender: "",
      color: "",
      weight: "",
      health_issues: "",
      vaccination_status: "",
      description: "",
      is_available_for_adoption: false,
      adoption_price: "",
      adoption_days: 1,
      currency: "USD"
    });
    setPetImage(null);
    setImagePreview(null);
    setEditingPet(null);
    setShowPetForm(false);
  }

  // Payment modal state
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topUpStatus, setTopUpStatus] = useState(null);

  function openLoadModal() {
    setTopUpAmount('');
    setTopUpStatus(null);
    setShowLoadModal(true);
  }

  function closeLoadModal() {
    setShowLoadModal(false);
  }

  function submitTopUpRequest(e) {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt <= 0) {
      setTopUpStatus({ ok: false, msg: 'Enter a valid amount' });
      return;
    }

    const popup = window.open('', '_blank');
    try { if (popup) popup.opener = null; } catch (e) { /* ignore */ }
    if (!popup) {
      setTopUpStatus({ ok: false, msg: 'Popup blocked. Please allow popups and try again.' });
      return;
    }

    try {
      popup.document.open();
      popup.document.write('<!doctype html><html><head><title>Starting payment</title></head><body><div style="font-family: sans-serif; padding:20px;">Starting payment... You will be redirected shortly.</div></body></html>');
      popup.document.close();
    } catch (e) {
      // ignore write errors
    }

    (async () => {
      setTopUpStatus({ ok: null, msg: 'Initiating payment...' });
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const res = await fetch(`${API_BASE}/payment/initiate/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            amount: String(amt),
            success_url: `${origin}/payment/callback/`,
            failure_url: `${origin}/payment/callback/`,
          }),
        });

        const text = await res.text().catch(() => null);
        let data = null;
        try {
          data = text ? JSON.parse(text) : null;
        } catch (e) {
          data = null;
        }

        if (!res.ok) {
          const msg = (data && data.error) ? data.error : `Initiate failed: ${res.status}`;
          setTopUpStatus({ ok: false, msg });
          try { popup.close(); } catch (e) {}
          return;
        }

        const { tx_uuid, form_html, esewa_action, payment_url, redirect_url } = data || {};
        setTopUpStatus({ ok: true, msg: `Payment initiated (tx: ${tx_uuid || 'unknown'})` });

        if (tx_uuid) {
          setTopUpStatus({ ok: null, msg: `Waiting for transaction ${tx_uuid} to complete...` });
          const pollTransaction = async (attempt = 0) => {
            try {
              const tRes = await fetch(`${API_BASE}/payment/transaction/${tx_uuid}/`, {
                headers: {
                  Accept: 'application/json',
                  ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
              });
              if (tRes.ok) {
                const tData = await tRes.json();
                const status = tData && tData.status ? String(tData.status).toLowerCase() : '';
                const creditedAmount = tData && (tData.credited_amount || tData.credited || 0);
                const completed = (tData && (status === 'completed' || creditedAmount === true || Number(creditedAmount) > 0));
                if (completed) {
                  setTopUpStatus({ ok: true, msg: 'Payment completed and balance updated.' });
                  try {
                    const aRes = await fetch(`${API_BASE}/auth/account/`, {
                      headers: { Authorization: token ? `Bearer ${token}` : '', Accept: 'application/json' },
                    });
                    if (aRes.ok) {
                      const aData = await aRes.json();
                      if (aData && aData.length > 0) {
                        setAccountData(aData[0]);
                        setBalance(parseFloat(aData[0].balance) || 0);
                      }
                    }
                  } catch (e) {
                    // ignore account refresh errors
                  }
                  return;
                }
              }
            } catch (e) {
              // ignore transient errors
            }

            if (attempt < 40) {
              setTimeout(() => pollTransaction(attempt + 1), 3000);
            } else {
              setTopUpStatus({ ok: null, msg: `Transaction ${tx_uuid} is pending; check the transaction endpoint for updates.` });
            }
          };

          pollTransaction(0);
        }

        const action = esewa_action || payment_url || redirect_url || '';
        if (!action) {
          setTopUpStatus({ ok: false, msg: 'No payment action URL provided by the server.' });
          try { popup.close(); } catch (e) {}
          return;
        }

        if (!form_html || String(form_html).trim() === '') {
          try {
            popup.location.href = action;
          } catch (e) {
            try {
              popup.document.open();
              popup.document.write(`<!doctype html><html><body><p>Redirecting to payment...</p><a href="${action}" target="_blank" rel="noopener">Continue</a><script>window.location='${action}';</script></body></html>`);
              popup.document.close();
            } catch (err) {}
          }
          return;
        }

        const html = `<!doctype html><html><head><title>Proceeding to payment</title></head><body><form id="esewa_form" action="${action}" method="post">${form_html || ''}<noscript><button type="submit">Continue</button></noscript></form><script>try{document.getElementById('esewa_form').submit();}catch(e){console.error(e);}</script></body></html>`;

        try {
          popup.document.open();
          popup.document.write(html);
          popup.document.close();
        } catch (e) {
          setTopUpStatus({ ok: false, msg: 'Failed to open payment page in popup.' });
          try { popup.close(); } catch (err) {}
        }

      } catch (err) {
        setTopUpStatus({ ok: false, msg: err?.message || String(err) });
        try { popup.close(); } catch (e) {}
      }
    })();
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
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', right: 20, top: 20, zIndex: 80 }}>
          <div style={{ padding: '10px 14px', borderRadius: 8, color: '#fff', background: toast.type === 'success' ? '#059669' : toast.type === 'error' ? '#dc2626' : '#2563eb', boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}>{toast.msg}</div>
        </div>
      )}
      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 16 }}>Dashboard</h1>
      {/* <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
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
      </div> */}

      {/* Stats */}
      {/* <section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[{ label: "Total Listings", value: stats.total }, { label: "Active", value: stats.active }, { label: "Permanent", value: stats.permanent }, { label: "Temporary", value: stats.temporary }].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ color: "#666", fontSize: 14, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{s.value}</div>
          </div>
        ))}
      </section> */}

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

            <div style={{ marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={openLoadModal}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  padding: '8px 12px',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Load Balance
              </button>

              <button
                onClick={refreshAccountData}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#111827',
                  padding: '8px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Refresh balance
              </button>
            </div>

            {showLoadModal && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}>
                <div style={{ background: '#fff', padding: 20, borderRadius: 8, width: 360, boxShadow: '0 6px 24px rgba(0,0,0,0.2)' }}>
                  <h3 style={{ marginTop: 0, marginBottom: 8 }}>Request Top-up</h3>
                  <form onSubmit={submitTopUpRequest}>
                    <div style={{ marginBottom: 8 }}>
                      <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>Amount</label>
                      <input
                        value={topUpAmount}
                        onChange={(e) => setTopUpAmount(e.target.value)}
                        placeholder="e.g. 100.00"
                        style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
                      />
                    </div>

                    {topUpStatus && (
                      <div style={{ marginBottom: 8, color: topUpStatus.ok ? 'green' : 'red' }}>{topUpStatus.msg}</div>
                    )}

                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button type="button" onClick={closeLoadModal} style={{ background: '#6b7280', color: '#fff', padding: 8, border: 'none', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
                      <button type="submit" style={{ background: '#10b981', color: '#fff', padding: 8, border: 'none', borderRadius: 6, cursor: 'pointer' }}>Request Top-up</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 🛒 Cart */}
      {/* <section style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Cart</h3>
          <Link href="/cart" className="login-button">Open Cart</Link>
        </div>
        {cartItems.length === 0 ? <p>Your cart is empty.</p> : cartItems.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </section> */}

      {/* 🏠 My Adoptions Section */}
      <section style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>My Adoptions</h3>
          <button
            onClick={fetchAdoptions}
            style={{
              backgroundColor: "#f3f4f6",
              color: "#111827",
              padding: "6px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Refresh
          </button>
        </div>

        {/* Loading and Error States */}
        {adoptionsLoading && <div style={{ textAlign: 'center', padding: 20 }}>Loading adoptions...</div>}
        {adoptionsError && (
          <div style={{ color: '#dc2626', padding: 12, background: '#fef2f2', borderRadius: 6, marginBottom: 16 }}>
            Error loading adoptions: {adoptionsError}
          </div>
        )}

        {/* Adoptions List */}
        {!adoptionsLoading && !adoptionsError && adoptions.length === 0 ? (
          <p>No adoptions found.</p>
        ) : (
          !adoptionsLoading && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #eee", background: "#f8fafc" }}>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Pet Name</th>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Adoption Date</th>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Price Paid</th>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Status</th>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {adoptions.map((adoption) => (
                    <tr key={adoption.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "12px", fontWeight: 500 }}>{adoption.pet_name}</td>
                      <td style={{ padding: "12px" }}>{new Date(adoption.adoption_date).toLocaleDateString()}</td>
                      <td style={{ padding: "12px", fontWeight: 600, color: "#059669" }}>
                        {adoption.currency || 'USD'} {parseFloat(adoption.price_paid).toFixed(2)}
                      </td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ 
                          padding: "4px 8px", 
                          borderRadius: 12, 
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          backgroundColor: adoption.is_confirmed ? "#dcfce7" : "#fef3c7",
                          color: adoption.is_confirmed ? "#166534" : "#92400e"
                        }}>
                          {adoption.is_confirmed ? "Confirmed" : "Pending"}
                        </span>
                      </td>
                      <td style={{ padding: "12px", color: "#6b7280" }}>
                        {adoption.remarks || "No remarks"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </section>

      {/* 🐾 My Pets CRUD Section */}
      <section style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>My Pets</h3>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={fetchPets}
              style={{
                backgroundColor: "#f3f4f6",
                color: "#111827",
                padding: "6px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Refresh
            </button>
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
        </div>

        {/* Loading and Error States */}
        {petsLoading && <div style={{ textAlign: 'center', padding: 20 }}>Loading pets...</div>}
        {petsError && (
          <div style={{ color: '#dc2626', padding: 12, background: '#fef2f2', borderRadius: 6, marginBottom: 16 }}>
            Error loading pets: {petsError}
          </div>
        )}

        {/* Add/Edit Form */}
        {showPetForm && (
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 20, marginBottom: 20 }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 16, color: "#1e293b" }}>
              {editingPet ? "Edit Pet" : "Add New Pet"}
            </h4>
            <form onSubmit={handleAddOrUpdatePet} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Image Upload */}
              <div style={{ gridColumn: "1 / -1" }}>
                <h5 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#475569", marginBottom: 12 }}>Pet Image</h5>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <input 
                      id="pet-image"
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ 
                        width: '100%', 
                        padding: '10px 12px', 
                        borderRadius: 6, 
                        border: '1px solid #d1d5db', 
                        fontSize: 14,
                        background: 'white'
                      }}
                    />
                    <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 4 }}>
                      Upload a clear photo of your pet (JPG, PNG, GIF)
                    </p>
                  </div>
                  {(imagePreview || (editingPet && editingPet.image)) && (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img 
                        src={imagePreview || `${API_BASE}${editingPet.image}`} 
                        alt="Pet preview" 
                        style={{ 
                          width: 120, 
                          height: 120, 
                          borderRadius: 8, 
                          objectFit: 'cover',
                          border: '2px solid #e5e7eb'
                        }} 
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        style={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: 24,
                          height: 24,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div style={{ gridColumn: "1 / -1", marginBottom: 8 }}>
                <h5 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#475569", marginBottom: 12 }}>Basic Information</h5>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Pet Name *</label>
                <input 
                  name="name" 
                  value={petForm.name} 
                  onChange={handlePetInputChange} 
                  placeholder="Enter pet name"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                  required 
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Species *</label>
                <input 
                  name="species" 
                  value={petForm.species} 
                  onChange={handlePetInputChange} 
                  placeholder="e.g. Dog, Cat, Rabbit"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                  required 
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Breed *</label>
                <input 
                  name="breed" 
                  value={petForm.breed} 
                  onChange={handlePetInputChange} 
                  placeholder="Enter breed"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                  required 
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Age (years) *</label>
                <input 
                  name="age" 
                  type="number" 
                  value={petForm.age} 
                  onChange={handlePetInputChange} 
                  placeholder="Enter age"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                  required 
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Gender *</label>
                <select 
                  name="gender" 
                  value={petForm.gender} 
                  onChange={handlePetInputChange} 
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14, background: 'white' }}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Color *</label>
                <input 
                  name="color" 
                  value={petForm.color} 
                  onChange={handlePetInputChange} 
                  placeholder="Enter color"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                  required 
                />
              </div>

              {/* Health Information */}
              <div style={{ gridColumn: "1 / -1", marginBottom: 8, marginTop: 8 }}>
                <h5 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#475569", marginBottom: 12 }}>Health Information</h5>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Weight (kg) *</label>
                <input 
                  name="weight" 
                  type="number" 
                  step="0.1" 
                  value={petForm.weight} 
                  onChange={handlePetInputChange} 
                  placeholder="Enter weight"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                  required 
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Vaccination Status</label>
                <input 
                  name="vaccination_status" 
                  value={petForm.vaccination_status} 
                  onChange={handlePetInputChange} 
                  placeholder="e.g. Fully vaccinated"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                />
              </div>
              
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Health Issues</label>
                <input 
                  name="health_issues" 
                  value={petForm.health_issues} 
                  onChange={handlePetInputChange} 
                  placeholder="Any health concerns or issues"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                />
              </div>

              {/* Adoption Information */}
              <div style={{ gridColumn: "1 / -1", marginBottom: 8, marginTop: 8 }}>
                <h5 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#475569", marginBottom: 12 }}>Adoption Information</h5>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Adoption Price</label>
                <input 
                  name="adoption_price" 
                  type="number" 
                  step="0.01" 
                  value={petForm.adoption_price} 
                  onChange={handlePetInputChange} 
                  placeholder="0.00"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Currency</label>
                <select 
                  name="currency" 
                  value={petForm.currency} 
                  onChange={handlePetInputChange} 
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14, background: 'white' }}
                >
                  <option value="USD">USD ($)</option>
                  <option value="NPR">NPR (रू)</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Adoption Period (days) *</label>
                <input 
                  name="adoption_days" 
                  type="number" 
                  value={petForm.adoption_days} 
                  onChange={handlePetInputChange} 
                  placeholder="1"
                  min="1"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                  required
                />
                <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 4 }}>
                  How many days the adoption will last
                </p>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input 
                  name="is_available_for_adoption" 
                  type="checkbox" 
                  checked={petForm.is_available_for_adoption} 
                  onChange={handlePetInputChange} 
                  style={{ width: 16, height: 16 }}
                />
                <label style={{ fontSize: 14, fontWeight: 500 }}>Available for Adoption</label>
              </div>

              {/* Description */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>Description</label>
                <textarea 
                  name="description" 
                  value={petForm.description} 
                  onChange={handlePetInputChange} 
                  placeholder="Tell us about your pet's personality, habits, and any special needs..."
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: 6, 
                    border: '1px solid #d1d5db', 
                    fontSize: 14,
                    minHeight: 80,
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  rows={4}
                ></textarea>
              </div>

              {/* Form Actions */}
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
                <button 
                  type="button" 
                  onClick={handleCancelForm}
                  style={{ 
                    background: "#6b7280", 
                    color: "#fff", 
                    padding: "10px 20px", 
                    border: "none", 
                    borderRadius: 6, 
                    cursor: "pointer", 
                    fontWeight: 600,
                    fontSize: 14
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{ 
                    background: "#2563eb", 
                    color: "#fff", 
                    padding: "10px 20px", 
                    border: "none", 
                    borderRadius: 6, 
                    cursor: "pointer", 
                    fontWeight: 600,
                    fontSize: 14
                  }}
                >
                  {editingPet ? "Update Pet" : "Add Pet"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Pets List */}
        {!petsLoading && !petsError && pets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
            <p>No pets added yet.</p>
            <button
              onClick={() => setShowPetForm(true)}
              style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                padding: "10px 16px",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
                marginTop: 12
              }}
            >
              Add Your First Pet
            </button>
          </div>
        ) : (
          !petsLoading && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #eee", background: "#f8fafc" }}>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Image</th>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Name</th>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Species</th>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Breed</th>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Age</th>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Adoption Price</th>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Adoption Days</th>
                    <th style={{ textAlign: "left", padding: "12px", fontWeight: 600 }}>Available</th>
                    <th style={{ textAlign: "center", padding: "12px", fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.map((pet) => (
                    <tr key={pet.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "12px" }}>
                        {pet.image ? (
                          <img 
                            src={`${API_BASE}${pet.image}`} 
                            alt={pet.name}
                            style={{ 
                              width: 50, 
                              height: 50, 
                              borderRadius: 6, 
                              objectFit: 'cover',
                              border: '1px solid #e5e7eb'
                            }} 
                          />
                        ) : (
                          <div style={{ 
                            width: 50, 
                            height: 50, 
                            borderRadius: 6, 
                            background: '#f3f4f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#9ca3af',
                            fontSize: '0.75rem'
                          }}>
                            No Image
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "12px", fontWeight: 500 }}>{pet.name}</td>
                      <td style={{ padding: "12px" }}>{pet.species}</td>
                      <td style={{ padding: "12px" }}>{pet.breed}</td>
                      <td style={{ padding: "12px" }}>{pet.age} years</td>
                      <td style={{ padding: "12px", fontWeight: 600 }}>
                        {pet.currency} {parseFloat(pet.adoption_price || 0).toFixed(2)}
                      </td>
                      <td style={{ padding: "12px" }}>
                        {pet.adoption_days} days
                      </td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ 
                          padding: "4px 8px", 
                          borderRadius: 12, 
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          backgroundColor: pet.is_available_for_adoption ? "#dcfce7" : "#f3f4f6",
                          color: pet.is_available_for_adoption ? "#166534" : "#6b7280"
                        }}>
                          {pet.is_available_for_adoption ? "Yes" : "No"}
                        </span>
                      </td>
                      <td style={{ padding: "12px", display: "flex", gap: 8, justifyContent: "center" }}>
                        <button 
                          onClick={() => handleEditPet(pet)} 
                          style={{ 
                            background: "#dbeafe", 
                            color: "#1e40af",
                            border: "none", 
                            padding: "6px 12px", 
                            borderRadius: 4, 
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            fontWeight: 500
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeletePet(pet.id)} 
                          style={{ 
                            background: "#fee2e2", 
                            color: "#dc2626",
                            border: "none", 
                            padding: "6px 12px", 
                            borderRadius: 4, 
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            fontWeight: 500
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </section>
    </div>
  );
}
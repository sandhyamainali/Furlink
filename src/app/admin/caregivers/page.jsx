"use client";

import { useState, useEffect } from "react";
import { Users, Check, X, Loader2, Plus } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

const statusColors = {
  verified: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-rose-100 text-rose-700",
};

export default function AdminCaregiversPage() {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [listingFor, setListingFor] = useState(null);

  const fetchCaregivers = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/auth/caregivers/");
      if (res.error) throw new Error(res.error);
      setCaregivers(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaregivers();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetchWithAuth(`/auth/caregivers/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.error) throw new Error(res.error);
      setCaregivers(caregivers.map(c => c.id === id ? { ...c, status: newStatus } : c));
    } catch (err) {
      alert("Failed to update caregiver status: " + err.message);
    }
  };

  const handleAdd = async (caregiverData) => {
    try {
      const res = await fetchWithAuth("/auth/caregivers/", {
        method: "POST",
        body: JSON.stringify(caregiverData),
      });
      if (res.error) throw new Error(res.error);
      setCaregivers([...caregivers, res.data]);
      setShowAddForm(false);
    } catch (err) {
      alert("Failed to add caregiver: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading caregivers: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Caregivers
          </h1>
          <p className="text-sm text-slate-600">
            Manage caregivers who can post pets, provide services, or foster animals.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-900 bg-slate-900 text-white px-3 py-2 text-sm font-medium hover:bg-slate-800 transition"
        >
          <Plus className="w-4 h-4" />
          Add caregiver
        </button>
      </header>

      {showAddForm && (
        <CaregiverForm
          onSubmit={handleAdd}
          onCancel={() => setShowAddForm(false)}
          title="Add New Caregiver"
        />
      )}

      {listingFor && (
        <PetListingForm
          caregiver={listingFor}
          onSubmit={async (petData) => {
            try {
              const res = await fetchWithAuth("/pet/pets/", {
                method: "POST",
                body: JSON.stringify({ ...petData, caregiver_id: listingFor.id }),
              });
              if (res.error) throw new Error(res.error);
              alert("Pet listed successfully!");
              setListingFor(null);
            } catch (err) {
              alert("Failed to list pet: " + err.message);
            }
          }}
          onCancel={() => setListingFor(null)}
        />
      )}

      <div className="overflow-x-auto rounded-2xl border bg-white/80 backdrop-blur">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Services</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {caregivers.map((caregiver) => (
              <tr
                key={caregiver.id}
                className="border-b last:border-b-0 hover:bg-slate-50/70"
              >
                <td className="px-4 py-3 text-slate-900 font-medium">
                  {caregiver.name || `${caregiver.first_name} ${caregiver.last_name}`}
                </td>
                <td className="px-4 py-3 text-slate-700">{caregiver.email}</td>
                <td className="px-4 py-3 text-slate-700">{caregiver.location || caregiver.city}</td>
                <td className="px-4 py-3 text-slate-700">
                  {caregiver.services ? caregiver.services.join(", ") : "Pet care"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      statusColors[caregiver.status] || "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {caregiver.status || "pending"}
                  </span>
                </td>
                <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            {caregiver.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(caregiver.id, "verified")}
                                  className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                                >
                                  <Check className="w-3 h-3" />
                                  Verify
                                </button>
                                <button
                                  onClick={() => handleStatusChange(caregiver.id, "rejected")}
                                  className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs text-rose-700 border-rose-200 hover:bg-rose-50"
                                >
                                  <X className="w-3 h-3" />
                                  Reject
                                </button>
                              </>
                            )}
                            {caregiver.status === "verified" && (
                              <button
                                onClick={() => setListingFor(caregiver)}
                                className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs text-blue-700 border-blue-200 hover:bg-blue-50"
                              >
                                <Plus className="w-3 h-3" />
                                List Pet
                              </button>
                            )}
                          </div>
                        </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CaregiverForm({ initialData = {}, onSubmit, onCancel, title }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    location: initialData.location || "",
    services: initialData.services || [],
    description: initialData.description || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleServicesChange = (service) => {
    setFormData({
      ...formData,
      services: formData.services.includes(service)
        ? formData.services.filter(s => s !== service)
        : [...formData.services, service],
    });
  };

  return (
    <div className="rounded-2xl border bg-white/80 backdrop-blur p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Services</label>
          <div className="space-y-2">
            {["Pet sitting", "Dog walking", "Grooming", "Training", "Veterinary care"].map(service => (
              <label key={service} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => handleServicesChange(service)}
                  className="mr-2"
                />
                {service}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            rows={3}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-md bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function PetListingForm({ caregiver, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: caregiver.location || "",
    status: "Available",
    description: "",
    age: "",
    breed: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="rounded-2xl border bg-white/80 backdrop-blur p-6">
      <h2 className="text-lg font-semibold mb-4">List Pet for {caregiver.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Pet Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
              required
            >
              <option value="">Select type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            >
              <option value="Available">Available</option>
              <option value="Adopted">Adopted</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Age</label>
            <input
              type="text"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Breed</label>
            <input
              type="text"
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            rows={3}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-md bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800"
          >
            List Pet
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

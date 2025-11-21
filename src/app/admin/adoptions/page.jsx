"use client";

import { useState, useEffect } from "react";
import { ClipboardList, Check, X, Loader2 } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

const statusColors = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
};

export default function AdminAdoptionsPage() {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdoptions = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/pet/adoptions/");
      if (res.error) throw new Error(res.error);
      setAdoptions(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdoptions();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetchWithAuth(`/pet/adoptions/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.error) throw new Error(res.error);
      setAdoptions(adoptions.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } catch (err) {
      alert("Failed to update adoption status: " + err.message);
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
        Error loading adoptions: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 flex items-center gap-2">
          <ClipboardList className="w-5 h-5" />
          Adoption Requests
        </h1>
        <p className="text-sm text-slate-600">
          Review and decide on adoption applications submitted by adopters.
        </p>
      </header>

      <div className="overflow-x-auto rounded-2xl border bg-white/80 backdrop-blur">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Request ID</th>
              <th className="px-4 py-3">Pet</th>
              <th className="px-4 py-3">Applicant</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adoptions.map((req) => (
              <tr
                key={req.id}
                className="border-b last:border-b-0 hover:bg-slate-50/70"
              >
                <td className="px-4 py-3 text-slate-900 font-medium">
                  #{req.id}
                </td>
                <td className="px-4 py-3 text-slate-700">{req.pet_name || req.petName}</td>
                <td className="px-4 py-3 text-slate-700">
                  {req.applicant_name || req.applicantName}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {req.submitted_at ? new Date(req.submitted_at).toLocaleDateString() : req.submittedAt}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      statusColors[req.status] || "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {req.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(req.id, "Approved")}
                          className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                        >
                          <Check className="w-3 h-3" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(req.id, "Rejected")}
                          className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs text-rose-700 border-rose-200 hover:bg-rose-50"
                        >
                          <X className="w-3 h-3" />
                          Reject
                        </button>
                      </>
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

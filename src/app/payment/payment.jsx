"use client";
import React from "react";

// Payment test UI has been removed. This placeholder page exists to avoid
// 404s during navigation while the codebase transitions away from payment features.
export default function PaymentTestPage() {
  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <h2 style={{ marginBottom: 12 }}>Payment tools removed</h2>
      <div style={{ color: '#555', fontSize: '0.95rem' }}>Payment test utilities and eSewa helpers have been removed from this application.</div>
      <div style={{ marginTop: 12, color: '#666' }}>If you need to restore testing tools, re-add a dedicated, secured debug page outside production code.</div>
    </div>
  );
}

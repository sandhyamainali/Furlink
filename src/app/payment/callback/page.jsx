"use client";
import { useEffect } from "react";

// Simple redirector: preserve querystring and redirect to /payment/success
export default function CallbackRedirector() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const qs = window.location.search || '';
    // Replace the current URL with /payment/success + original querystring
    try {
      window.location.replace('/payment/success' + qs);
    } catch (e) {
      window.location.href = '/payment/success' + qs;
    }
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '60px auto', padding: 20, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h2>Redirecting...</h2>
      <p>If you are not redirected shortly, <a href="/payment/success">click here</a>.</p>
    </div>
  );
}

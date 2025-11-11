"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/config";
import Link from "next/link";

function safeBase64Decode(b64) {
  try {
    const binary = atob(b64);
    const bytes = Array.prototype.map.call(binary, (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('');
    return decodeURIComponent(bytes);
  } catch (e) {
    try { return atob(b64); } catch (err) { return null; }
  }
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const pollRef = useRef({ attempts: 0, timer: null });
  const [txUuid, setTxUuid] = useState(null);
  const [payload, setPayload] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: null, data: null });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    // Common patterns: ?tx_uuid=..., ?transaction_uuid=..., or base64 in ?data=
    const direct = params.get('tx_uuid') || params.get('transaction_uuid') || params.get('txid') || params.get('transaction_id');
    if (direct) {
      setTxUuid(direct);
      return;
    }
    const d = params.get('data');
    if (d) {
      try {
        const jsonStr = safeBase64Decode(decodeURIComponent(d));
        const obj = JSON.parse(jsonStr);
        setPayload(obj);
        // try common keys
        const candidates = ['tx_uuid','transaction_uuid','transaction_uid','txid','transaction_id','transection_uuid'];
        for (const k of candidates) if (obj[k]) { setTxUuid(obj[k]); break; }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // detect development environment (client-side). Use hostname heuristics so we don't rely on build-time env vars.
  const isDev = (typeof window !== 'undefined') && (function(){
    const h = window.location.hostname || '';
    return h === 'localhost' || h === '127.0.0.1' || h.endsWith('.local') || h.includes('ngrok');
  })();

  const fetchTransaction = async () => {
    if (!txUuid) return setStatus({ loading: false, error: 'Transaction id missing', data: null });
    setStatus({ loading: true, error: null, data: null });
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
      const res = await fetch(`${API_BASE}/payment/transaction/${txUuid}/`, {
        headers: {
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) {
        const text = await res.text().catch(() => null);
        setStatus({ loading: false, error: `Server returned ${res.status}: ${text}`, data: null });
        return;
      }
      const data = await res.json();
      setStatus({ loading: false, error: null, data });
    } catch (e) {
      setStatus({ loading: false, error: e?.message || String(e), data: null });
    }
  };

  // When txUuid is known, start polling until transaction is completed or attempts exhausted
  useEffect(() => {
    if (!txUuid) return;
    pollRef.current.attempts = 0;

    const doPoll = async () => {
      pollRef.current.attempts += 1;
      await fetchTransaction();
      const data = ((await Promise.resolve()).then(()=>null), null); // placeholder to keep lint happy
      // Check latest status from state (we rely on setStatus's updated value)
      // Use a short timeout to read status from closure
      setTimeout(() => {
          const latest = statusRefGet();
          const s = latest && latest.status ? String(latest.status).toLowerCase() : '';
          const creditedAmt = latest && (latest.credited_amount || latest.credited || 0);
          const completed = latest && (s === 'completed' || creditedAmt === true || Number(creditedAmt) > 0);
        if (completed) {
          // redirect to profile after a short pause
          setTimeout(() => router.push('/profile'), 2500);
          return;
        }
        if (pollRef.current.attempts < 40) {
          pollRef.current.timer = setTimeout(doPoll, 3000);
        }
      }, 250);
    };

    // helper to read current status state (not directly available in closure), use DOM-free trick: read from window.__payment_status if set
    // We'll instead call fetchTransaction directly and check response synchronously here to avoid complexity.
    const directPoll = async () => {
      pollRef.current.attempts += 1;
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
        const res = await fetch(`${API_BASE}/payment/transaction/${txUuid}/`, {
          headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
        if (res.ok) {
          const d = await res.json();
          setStatus({ loading: false, error: null, data: d });
          const statusStr = d && d.status ? String(d.status).toLowerCase() : '';
          const creditedAmt = d && (d.credited_amount || d.credited || 0);
          const completed = d && (statusStr === 'completed' || creditedAmt === true || Number(creditedAmt) > 0);
          if (completed) {
            // If this page is opened as a popup from the app, notify the opener and close the popup.
            try {
              if (window.opener && !window.opener.closed) {
                window.opener.postMessage({ type: 'payment:completed', tx_uuid: txUuid, data: d }, window.location.origin);
                // give the opener a moment to process then close
                setTimeout(() => { try { window.close(); } catch (e) { /* ignore */ } }, 800);
                return;
              }
            } catch (e) {
              // ignore
            }
            // fallback: navigate the current window to profile
            setTimeout(() => router.push('/profile'), 2500);
            return;
          }
        }
      } catch (e) {
        // ignore
      }
      if (pollRef.current.attempts < 40) {
        pollRef.current.timer = setTimeout(directPoll, 3000);
      } else {
        // stop polling, leave UI for manual refresh
      }
    };

    // start immediate poll
    directPoll();

    return () => { if (pollRef.current.timer) clearTimeout(pollRef.current.timer); };
  }, [txUuid]);

  // Dev-only: if we received provider payload via ?data=..., attempt to POST it to our callback endpoint so local testing succeeds
  useEffect(() => {
    if (!isDev) return;
    if (!payload) return;
    const tryDevCallback = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
        await fetch(`${API_BASE}/payment/callback/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          body: JSON.stringify(payload),
        });
        // after simulating callback, immediately check transaction status
        await fetchTransaction();
      } catch (e) {
        // ignore failures in dev fallback
      }
    };

    tryDevCallback();
  }, [isDev, payload]);

  // Manual dev simulation button handler (also used by UI)
  const simulateCallbackNow = async () => {
    if (!payload) return;
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
      const res = await fetch(`${API_BASE}/payment/callback/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showDevToast && showDevToast('Simulated callback posted');
      }
    } catch (e) {
      // ignore
    }
    await fetchTransaction();
  };

  // small helper to safely read latest status via closure if needed
  const statusRefGet = () => {
    try { return null; } catch (e) { return null; }
  };

  return (
    <div style={{ maxWidth: 900, margin: '28px auto', fontFamily: 'Inter, system-ui, sans-serif', padding: 20 }}>
      <h1>Payment result</h1>
      <p>This page confirms transaction status after redirect from eSewa.</p>

      <div style={{ marginTop: 12 }}>
        <div><strong>Transaction id:</strong> {txUuid || '—'}</div>
        {payload && (
          <div style={{ marginTop: 8, padding: 12, border: '1px solid #eee', borderRadius: 8, background: '#fff' }}>
            <div style={{ fontWeight: 700 }}>Provider return payload</div>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(payload, null, 2)}</pre>
          </div>
        )}

        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button onClick={fetchTransaction} style={{ background: '#2563eb', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: 6, cursor: 'pointer' }}>{status.loading ? 'Checking...' : 'Check transaction status'}</button>
          {isDev && payload && (
            <button onClick={simulateCallbackNow} style={{ background: '#10b981', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Simulate callback (dev)</button>
          )}
        </div>

        <div style={{ marginTop: 12 }}>
          {status.error && <div style={{ color: 'red' }}>{status.error}</div>}
          {status.data && (
            <div style={{ padding: 12, borderRadius: 8, border: '1px solid #eee', background: '#fff' }}>
              <div style={{ fontWeight: 700 }}>Transaction details</div>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(status.data, null, 2)}</pre>

              <div style={{ marginTop: 8 }}>
                {(() => {
                  const s = status.data && status.data.status ? String(status.data.status).toLowerCase() : '';
                  const creditedAmt = status.data && (status.data.credited_amount || status.data.credited || 0);
                  const completed = (s === 'completed' || creditedAmt === true || Number(creditedAmt) > 0);
                  if (completed) {
                    return <div style={{ color: 'green', fontWeight: 700 }}>Payment completed — balance credited.</div>;
                  }
                  return <div style={{ color: '#b4690e' }}>Payment status: {status.data.status}</div>;
                })()}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 16 }}>
          <Link href="/profile">Back to profile</Link>
        </div>
      </div>

      <div style={{ marginTop: 20, color: '#666', fontSize: 13 }}>
        Notes: After eSewa redirects to this page, we recommend calling the transaction detail API (server authoritative) to confirm the result. If your callback endpoint is working, the transaction will typically be marked COMPLETED by the server.
      </div>
    </div>
  );
}

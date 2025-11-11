"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/config";
import Link from "next/link";

export default function PaymentFailurePage(){
  const router = useRouter();
  const [info, setInfo] = useState(null);
  const [txId, setTxId] = useState(null);
  const [status, setStatus] = useState({ loading:false, error:null, data:null });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const d = params.get('data') || params.get('error') || null;
    if (d) {
      // show raw value and try to decode like success page
      try {
        const decoded = decodeURIComponent(d);
        setInfo(decoded);
        try {
          const obj = JSON.parse(atob(decoded));
          setTxId(obj.tx_uuid || obj.transaction_uuid || obj.txid || null);
        } catch (e) {
          // ignore
        }
      } catch (e) {
        setInfo(d);
      }
    }
  }, []);

  // Auto-redirect back to profile after a short delay so users don't get stuck on the failure page
  useEffect(() => {
    const t = setTimeout(() => {
      try { router.push('/profile'); } catch (e) { window.location.href = '/profile'; }
    }, 7000); // 7s
    return () => clearTimeout(t);
  }, []);

  const fetchTransaction = async () => {
    if (!txId) return setStatus({ loading:false, error: 'tx id not found', data: null });
    setStatus({ loading: true, error: null, data: null });
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
      const res = await fetch(`${API_BASE}/payment/transaction/${txId}/`, { headers: { Accept: 'application/json', ...(token?{Authorization:`Bearer ${token}`}: {}) } });
      if (!res.ok) { const t=await res.text().catch(()=>null); setStatus({ loading:false, error: `Server ${res.status}: ${t}`, data:null}); return; }
      const data = await res.json(); setStatus({ loading:false, error:null, data });
    } catch (e) { setStatus({ loading:false, error: e?.message||String(e), data:null }); }
  };

  return (
    <div style={{ maxWidth:900, margin:'28px auto', padding:20, fontFamily:'Inter, system-ui, sans-serif' }}>
      <h1>Payment failed / cancelled</h1>
      <p>We received a redirect from the payment provider indicating failure or cancellation.</p>

      <div style={{ marginTop:12 }}>
        <div><strong>Provider info</strong></div>
        <div style={{ background:'#fff', padding:12, border:'1px solid #eee', borderRadius:8, marginTop:8 }}>{info || 'No provider info in query'}</div>

        <div style={{ marginTop:12 }}>
          <button onClick={fetchTransaction} style={{ background:'#2563eb', color:'#fff', padding:'8px 12px', border:'none', borderRadius:6, cursor:'pointer' }}>{status.loading? 'Checking...':'Check transaction status'}</button>
        </div>

        {status.error && <div style={{ color:'red', marginTop:8 }}>{status.error}</div>}
        {status.data && (
          <div style={{ marginTop:8, padding:12, borderRadius:8, background:'#fff', border:'1px solid #eee' }}>
            <pre style={{ whiteSpace:'pre-wrap' }}>{JSON.stringify(status.data,null,2)}</pre>
          </div>
        )}

        <div style={{ marginTop:16 }}><Link href="/profile">Back to profile</Link></div>
      </div>
    </div>
  );
}

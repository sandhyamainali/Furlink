'use client';

import React, { useState, useEffect } from 'react';
import ReactUse from 'react';
import Link from 'next/link';
import { useUser } from '@/context/userContext';

import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/config';



// ✅ Adopt Request Form Component
export default function AdoptRequestForm({ params }) {
  const router = useRouter();
  const { balance, setBalance } = useUser();
  const { id } = ReactUse.use(params); // pet id from route params

  const [isSubmitting, setIsSubmitting] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const submitAdoption = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
        if (!token) {
          router.replace('/login');
          return;
        }

        // First, check if user has sufficient balance (assuming adoption fee is needed)
        // // For now, we'll assume a minimum balance requirement of Rs 100 for adoption
        // const minBalanceRequired = 80;
        // if (balance < minBalanceRequired) {
        //   throw new Error(`Insufficient balance. You need at least Rs ${minBalanceRequired} to adopt a pet. Current balance: Rs ${balance.toFixed(2)}`);
        // }

  const res = await fetch(`${API_BASE}/pet/pets/${id}/adopt/`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ remarks: null })
        });

        if (res.status === 401 || res.status === 403) {
          router.replace('/login');
          return;
        }

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Adoption request failed (${res.status})`);
        }

        // success - store response and show popup; do not redirect immediately
        const data = await res.json();

        // Deduct balance on successful adoption (simulate payment)
        // const adoptionFee = data.price_paid || 0;
        // if (adoptionFee > 0) {
        //   setBalance(prev => Math.max(0, prev - adoptionFee));
        // }

        setResponseData(data);
        setSuccess(true);
        setIsSubmitting(false);
      } catch (err) {
        console.error('Adoption submit failed', err);
        setError(err.message || 'Failed to submit adoption request');
        setIsSubmitting(false);
      }
    };

    submitAdoption();
  }, [id, router, balance, setBalance]);

  if (isSubmitting) {
    return (
      <div style={{ backgroundColor: '#fef9f4', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#666' }}>Submitting adoption request…</div>
      </div>
    );
  }
  if (success) {
    return (
      <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.12)', maxWidth: 560, width: '90%' }}>
          <h2 style={{ margin: 0, marginBottom: 8 }}>Adoption Request Submitted</h2>
          <p style={{ color: '#333', marginTop: 6 }}>
            This pet is adopted by <strong>{responseData?.adopter_username ?? 'the adopter'}</strong>.
          </p>

          <div style={{ background: '#f9f9f9', padding: 12, borderRadius: 8, marginTop: 12 }}>
            <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', margin: 0 }}>
              <div style={{ padding: '6px 8px' }}>
                <dt style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Pet Name</dt>
                <dd style={{ margin: 0, fontWeight: 600 }}>{responseData?.pet_name ?? '—'}</dd>
              </div>

              <div style={{ padding: '6px 8px' }}>
                <dt style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Adopter</dt>
                <dd style={{ margin: 0, fontWeight: 600 }}>{responseData?.adopter_username ?? '—'}</dd>
              </div>

              <div style={{ padding: '6px 8px' }}>
                <dt style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Adoption Date</dt>
                <dd style={{ margin: 0 }}>{responseData?.adoption_date ?? '—'}</dd>
              </div>

              <div style={{ padding: '6px 8px' }}>
                <dt style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Remarks</dt>
                <dd style={{ margin: 0 }}>{responseData?.remarks ?? '—'}</dd>
              </div>

              <div style={{ padding: '6px 8px' }}>
                <dt style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Price Paid</dt>
                <dd style={{ margin: 0 }}>{responseData?.price_paid ?? '0.00'}</dd>
              </div>

              <div style={{ padding: '6px 8px' }}>
                <dt style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Confirmed</dt>
                <dd style={{ margin: 0 }}>{responseData?.is_confirmed ? 'Yes' : 'No'}</dd>
              </div>
            </dl>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}>
            <button onClick={() => router.push('/adopter')} style={{ background: '#996633', color: '#fff', padding: '10px 14px', borderRadius: 8, border: 'none' }}>Continue</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fef9f4', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h2 style={{ margin: 0, marginBottom: 8 }}>Unable to submit adoption request</h2>
        <p style={{ color: '#555' }}>{error}</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={() => router.replace(`/adopter/pet/${id}`)} style={{ background: '#996633', color: '#fff', padding: '8px 12px', borderRadius: 8, border: 'none' }}>Back to Pet</button>
          <button onClick={() => location.reload()} style={{ background: '#e5e7eb', color: '#111', padding: '8px 12px', borderRadius: 8, border: 'none' }}>Retry</button>
        </div>
      </div>
    </div>
  );
}

// ✅ Shared Styles
const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  fontSize: '16px',
  outline: 'none',
  background: 'white',
  boxSizing: 'border-box',
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
  fontFamily: 'inherit',
};

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  color: '#374151',
  marginBottom: '6px',
};

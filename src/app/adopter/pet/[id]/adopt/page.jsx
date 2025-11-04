'use client';

import React, { useState } from 'react';
import ReactUse from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ✅ Navbar Component
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-container ">
        {/* Logo */}
        <div className="logo">
          <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
        </div>

        {/* Navigation Menu */}
        <ul className="nav-menu ">
          <li><Link href="/" className="nav-link active">Home</Link></li>
          <li><Link href="/about" className="nav-link active">About</Link></li>
          <li><Link href="/service" className="nav-link active">Service</Link></li>
          <li><Link href="/contact" className="nav-link">Contact</Link></li>
          <li><Link href="/gallery" className="nav-link">Gallery</Link></li>
          <li><Link href="/shop" className="nav-link">Shop <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg></span></Link></li>
          <li><Link href="/adopter" className="nav-link">Adoption</Link></li>
        </ul>

        {/* Login Button */}
        <div>
          <Link href="/login">
            <button className="login-button">Log In</button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

// ✅ Adopt Request Form Component
export default function AdoptRequestForm({ params }) {
  const router = useRouter();
  const { id } = ReactUse.use(params); // ✅ Unwrap params safely in Next.js 15+

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    homeType: '',
    hasYard: '',
    children: '',
    otherPets: '',
    experience: '',
    preferredDate: '',
    message: '',
    agree: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert('Please agree to the terms to proceed.');
      return;
    }
    // Redirect after form submission
    router.push(`/adopter/pet/${id}`);
  };

  return (
    <div style={{ backgroundColor: '#fef9f4', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ padding: '20px' }}>
        <Link
          href={`/adopter/pet/${id}`}
          style={{
            color: '#a0632b',
            textDecoration: 'none',
            fontSize: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            padding: '10px 14px',
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #f0e1cf',
          }}
        >
          <span style={{ fontSize: '18px' }}>←</span>
          Back to Pet Profile
        </Link>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '30px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <h1 style={{ fontSize: '1.8rem', color: '#1f2937', margin: 0, fontWeight: 700 }}>
              Request to Adopt
            </h1>
            <p style={{ color: '#6b7280', marginTop: '8px' }}>
              Fill out the form below. The caregiver will review your request and contact you.
            </p>

            <form onSubmit={onSubmit} style={{ marginTop: '20px' }}>
              {/* Applicant Info */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input name="fullName" value={form.fullName} onChange={onChange} required style={inputStyle} placeholder="Your name" />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} required style={inputStyle} placeholder="you@example.com" />
                </div>
                <div>
                  <label style={labelStyle}>Phone *</label>
                  <input name="phone" value={form.phone} onChange={onChange} required style={inputStyle} placeholder="98xxxxxxxx" />
                </div>
                <div>
                  <label style={labelStyle}>Preferred Meeting Date</label>
                  <input type="date" name="preferredDate" value={form.preferredDate} onChange={onChange} style={inputStyle} />
                </div>
              </div>

              {/* Address */}
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Address *</label>
                <input name="address" value={form.address} onChange={onChange} required style={inputStyle} placeholder="Street address" />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <input name="city" value={form.city} onChange={onChange} required style={inputStyle} placeholder="City" />
                <input name="state" value={form.state} onChange={onChange} required style={inputStyle} placeholder="State" />
                <input name="zip" value={form.zip} onChange={onChange} required style={inputStyle} placeholder="ZIP" />
              </div>

              {/* Household */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <label style={labelStyle}>Home Type *</label>
                  <select name="homeType" value={form.homeType} onChange={onChange} required style={inputStyle}>
                    <option value="">Select</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Fenced Yard *</label>
                  <select name="hasYard" value={form.hasYard} onChange={onChange} required style={inputStyle}>
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Children at Home *</label>
                  <select name="children" value={form.children} onChange={onChange} required style={inputStyle}>
                    <option value="">Select</option>
                    <option value="None">None</option>
                    <option value="Under 5">Under 5</option>
                    <option value="5-12">5-12</option>
                    <option value="13+">13+</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Other Pets *</label>
                  <select name="otherPets" value={form.otherPets} onChange={onChange} required style={inputStyle}>
                    <option value="">Select</option>
                    <option value="No">No</option>
                    <option value="Dog(s)">Dog(s)</option>
                    <option value="Cat(s)">Cat(s)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Experience */}
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Experience with pets *</label>
                <textarea name="experience" value={form.experience} onChange={onChange} required rows={4} style={textareaStyle} placeholder="Tell us about your past experience caring for pets." />
              </div>

              {/* Message */}
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Message to caregiver</label>
                <textarea name="message" value={form.message} onChange={onChange} rows={4} style={textareaStyle} placeholder="Any additional info or questions" />
              </div>

              {/* Agreement */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px', color: '#374151', fontSize: '14px' }}>
                <input type="checkbox" name="agree" checked={form.agree} onChange={onChange} style={{ marginTop: '3px' }} />
                I confirm that the information provided is accurate and I understand the responsibilities of caring for a pet.
              </label>

              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#ff8a3d',
                  color: 'white',
                  padding: '14px 16px',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Submit Request
              </button>
            </form>
          </div>
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

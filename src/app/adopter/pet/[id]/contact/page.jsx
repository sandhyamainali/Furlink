'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactCaregiverPage({ params }) {
  // ✅ Unwrap the params Promise (Next.js 15+)
  const unwrappedParams = use(params);
  const petId = parseInt(unwrappedParams.id);

  // Minimal caregiver info
  const caregiver = {
    id: 1,
    name: 'Sahara',
    verified: true,
    rating: 4.9,
    reviews: 15,
    about:
      "Loving pet owner and occasional foster parent. I believe every pet deserves a caring home.",
  };

  // Pet name lookup
  const petNames = { 1: 'Max', 2: 'Luna', 3: 'Snowball', 4: 'Buddy', 5: 'Whiskers' };
  const petName = petNames[petId] || 'this pet';

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [messages, setMessages] = useState([
    { sender: 'caregiver', text: 'Hi! How can I help about the pet?' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function finalizeSend() {
    setShowSuccess(true);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2200);
  }

  function submitMessage(e) {
    e.preventDefault();
    if (!acceptedTerms) {
      setShowTerms(true);
      return;
    }
    setForm({ name: '', email: '', message: '' });
    finalizeSend();
  }

  function sendChat() {
    if (!chatInput.trim()) return;
    setMessages((prev) => [...prev, { sender: 'you', text: chatInput }]);
    setChatInput('');
  }

  return (
    <div style={{ backgroundColor: '#fef9f4', minHeight: '100vh' }}>
      {/* 🐾 Navbar */}
      <nav className="nav">
        <div className="nav-container">
          {/* Logo */}
          <div className="logo">
            <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
          </div>

          {/* Navigation Menu */}
          <ul className="nav-menu">
            <li><Link href="/" className="nav-link active">Home</Link></li>
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><Link href="/service" className="nav-link">Service</Link></li>
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

      {/* Main Page */}
      <div style={{ padding: '20px' }}>
        <Link
          href={`/adopter/pet/${petId}`}
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

        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '24px',
          }}
        >
          {/* Left Section */}
          <div>
            <h1 style={{ fontSize: '2rem', margin: '8px 0 16px 0', color: '#1f2937', fontWeight: 800 }}>
              Contact Caregiver
            </h1>

            <div
              style={{
                background: '#fff',
                border: '1px solid #f0e1cf',
                borderRadius: '12px',
                padding: '18px',
                marginBottom: '18px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: '#ffe7d6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: '#ff8a3d',
                  }}
                >
                  
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937' }}>
                    {caregiver.name} {caregiver.verified && <span title="Verified">🛡️</span>}
                  </div>
                  <div style={{ color: '#10b981', fontSize: 14 }}>✓ Verified Caregiver</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      color: '#6b7280',
                      fontSize: 14,
                    }}
                  >
                    <span>⭐⭐⭐⭐☆</span>
                    <span>{caregiver.rating} ({caregiver.reviews} reviews)</span>
                  </div>
                  <div style={{ color: '#6b7280', fontSize: 14 }}>Member since 2022</div>
                </div>
              </div>
              <p style={{ color: '#4b5563', marginTop: 12 }}>{caregiver.about}</p>
            </div>

            {/* Form or Success Message */}
            {!showSuccess ? (
              <div style={{ background: '#fff', border: '1px solid #f0e1cf', borderRadius: '12px', padding: '18px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f2937', marginBottom: '10px' }}>Send a Message</h2>
                <form onSubmit={submitMessage}>
                  <label style={labelStyle}>Your Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} placeholder="Enter your name" />
                  <label style={labelStyle}>Your Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required style={inputStyle} placeholder="your.email@example.com" />
                  <label style={labelStyle}>Your Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={6} style={textareaStyle} placeholder="Ask about the pet's temperament, schedule a meet-and-greet, etc." />

                  <button type="submit" style={primaryBtnStyle}>
                    <span style={{ marginRight: 8 }}></span>
                    Send Message
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ background: '#fff', border: '1px solid #f0e1cf', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
                <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#e6fbf7', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, margin: '0 auto 16px auto' }}>✓</div>
                <h2 style={{ fontSize: '1.8rem', color: '#1f2937', margin: 0, fontWeight: 800 }}>Message Sent Successfully!</h2>
                <p style={{ color: '#6b7280', marginTop: 8 }}>Your message has been sent to {caregiver.name}. They'll get back to you soon via email.</p>
              </div>
            )}
          </div>

          {/* Right Section: Chat */}
          <div>
            <div style={{ background: '#fff', border: '1px solid #f0e1cf', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ fontWeight: 800, color: '#1f2937', marginBottom: 10 }}>Quick Chat</div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '6px', border: '1px solid #f5e6d6', borderRadius: 10, marginBottom: 10, maxHeight: 420 }}>
                {messages.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      maxWidth: '80%',
                      margin: m.sender === 'you' ? '8px 0 8px auto' : '8px 0',
                      background: m.sender === 'you' ? '#ff8a3d' : '#fff7ec',
                      color: m.sender === 'you' ? 'white' : '#1f2937',
                      padding: '8px 12px',
                      borderRadius: 12,
                    }}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Write a message…"
                  style={{ ...inputStyle, flex: 1 }}
                  onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                />
                <button onClick={sendChat} style={{ ...primaryBtnStyle, padding: '10px 14px' }}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔧 Styles
const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  fontSize: '16px',
  outline: 'none',
  background: 'white',
  marginBottom: '12px',
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
  margin: '8px 0 6px 0',
};

const primaryBtnStyle = {
  width: '100%',
  backgroundColor: '#ff8a3d',
  color: 'white',
  padding: '12px 16px',
  border: 'none',
  borderRadius: '10px',
  fontWeight: 700,
  cursor: 'pointer',
  marginTop: '8px',
};

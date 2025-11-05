'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(false);
    setErrorMessage('');
    setSuccessMessage('');

    // Basic client-side validation
    if (!form.name || !form.email || !form.message) {
      setErrorMessage('Please fill in the required fields (name, email, message).');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        full_name: form.name,
        email: form.email,
        subject: form.subject || '',
        message: form.message,
      };

      const res = await fetch('https://furlink-backend.vercel.app/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Try to read error message from backend
        const msg = data?.detail || data?.error || (data?.non_field_errors && data.non_field_errors[0]) || 'Failed to submit contact form.';
        setErrorMessage(msg);
        return;
      }

      // Success
      setSuccessMessage('your info have been recorde sucessfully');
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form submit error', err);
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>

      {/* Navigation Header */}
      
             

          {/* Mobile menu button */}
          
      {/* Navbar end */}

      {/* Main contact page */}
      <main
        style={{
          maxWidth: '700px',
          margin: '40px auto',
          padding: '0 20px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: '#cc4400',
            fontSize: '2.5rem',
          }}
        >
          Contact Us
        </h1>

        <p style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.2rem', color: '#555' }}>
          Have questions or want to join our pet care community? Reach out to us—we’re here to help!
        </p>

        {successMessage && (
          <div
            role="alert"
            style={{
              padding: '15px',
              backgroundColor: '#d4edda',
              color: '#155724',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            style={{
              padding: '15px',
              backgroundColor: '#f8d7da',
              color: '#842029',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="subject" style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject of your message"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Write your message here..."
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                resize: 'vertical',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#999' : '#cc4400',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
            }}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Contact Info Section */}
        <section style={{ marginTop: '60px', textAlign: 'center', color: '#555' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Other Ways to Reach Us</h2>
          <p>
            Email: <a href="mailto:support@furlink.com">support@furlink.com</a>
          </p>
          <p>
            Phone: <a href="tel:+977-1234567890">+977-1234567890</a>
          </p>
          <p>Address: 123 Urban Pet Care St, Kathmandu, Nepal</p>
        </section>
      </main>

     
    </>
  );
}
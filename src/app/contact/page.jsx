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

  // Handle input changes
  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <>

      {/* Navigation Header */}
      <nav className="nav">
        <div className="nav-container ">
          {/* Logo */}
          <div className="logo">
            <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
          </div>

          {/* Navigation Menu */}
          <ul className="nav-menu ">
            <li>
              <Link href="/" className="nav-link ">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="nav-link ">
                About
              </Link>
            </li>
            <li>
              <Link href="/service" className="nav-link ">
                Service
              </Link>
            </li>
            <li>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="nav-link">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/shop" className="nav-link">
                Shop <nav className="nav">
            <div className="nav-container ">
              {/* Logo */}
              <div className="logo">
                <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
              </div>
      
              {/* Navigation Menu */}
              <ul className="nav-menu ">
                <li>
                  <Link href="/" className="nav-link active ">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="nav-link active">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/service" className="nav-link active">
                    Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="nav-link">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="nav-link">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="nav-link">
                    Shop <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg></span>
                  </Link>
                </li>
                <li>
                  <Link href="/adopter" className="nav-link">
                    Adoption
                  </Link>
                </li>
              </ul>
      
              {/* Login Button */}
              <div>
                <Link href="/login">
                  <button className="login-button">
                    Log In
                  </button>
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
              </Link>
            </li>
            <li>
                            <Link href="/adopter" className="nav-link">
                                Adoption
                            </Link>
                        </li>
          </ul>

          {/* Login Button */}
          <div>
                        <Link href="/login">
                        <button className="login-button">
                             Log In 
                        </button>
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

        {submitted && (
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
            Thank you for your message! We will get back to you soon.
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
            style={{
              backgroundColor: '#cc4400',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Send Message
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
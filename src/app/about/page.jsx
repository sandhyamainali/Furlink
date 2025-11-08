"use client"
import React, { useState } from "react";

import dynamic from "next/dynamic";


function AboutPage() {
  const [isMobileMenuOpen] = useState(false);

  return (
    <div className="container" style={{ padding: 24 }}>

      {/* Hero / Banner */}
      <section className="rounded" style={{ overflow: 'hidden', borderRadius: 12, marginBottom: 28 }}>
        <div style={{ position: 'relative', height: 360 }}>
          <img
            src="https://brunswick.ces.ncsu.edu/wp-content/uploads/2022/05/pets-g6fa575878_1920.jpg"
            alt="About Banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.45))' }} />
          <div style={{ position: 'absolute', left: 32, bottom: 32, color: 'white', maxWidth: 720 }}>
            <h1 style={{ fontSize: 40, margin: 0, lineHeight: 1.05 }}>About Furlink</h1>
            <p style={{ marginTop: 12, fontSize: 18, color: 'rgba(255,255,255,0.95)' }}>
              We connect loving people with pets who need a home. Our mission is
              to make adoption, fostering and care simple, trustworthy and joyful.
            </p>
            <div style={{ marginTop: 16 }}>
              <a href="/adopter" className="primary-button" style={{ padding: '10px 16px', borderRadius: 8 }}>Browse Pets</a>
              <a href="/adopter/submit" style={{ marginLeft: 12, padding: '10px 16px', borderRadius: 8, background: '#fff', color: '#996633', textDecoration: 'none' }}>List a Pet</a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission + Values */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 28, marginBottom: 12 }}>Our Mission</h2>
          <p style={{ color: '#444', lineHeight: 1.6 }}>
            At Furlink we believe every animal deserves a loving home. We work
            with shelters and caregivers to make adoption accessible and
            transparent. We provide resources for new pet parents and support
            throughout the adoption journey.
          </p>
          <ul style={{ marginTop: 12, color: '#555', lineHeight: 1.7 }}>
            <li>Safe, verified adoption & foster listings</li>
            <li>Education and support for new owners</li>
            <li>Community programs and outreach</li>
          </ul>
        </div>

        <div>
          <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
            <img src="/img/pet.png" alt="Our work" style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* Why choose us / Features */}
      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 24, marginBottom: 12 }}>Why choose Furlink</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 28 }}>🧑‍⚕️</div>
            <h3>Trusted Caregivers</h3>
            <p>Every listing is verified and caregivers are supported to ensure pet safety.</p>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 28 }}>⭐</div>
            <h3>Community First</h3>
            <p>We prioritize community, education and long-term welfare of pets.</p>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 28 }}>💬</div>
            <h3>Helpful Support</h3>
            <p>Our team provides guidance during adoption and after you bring your pet home.</p>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 28 }}>💸</div>
            <h3>Transparent Process</h3>
            <p>We keep fees and procedures clear so you can adopt with confidence.</p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section style={{ textAlign: 'center', padding: 20, background: '#fff7ee', borderRadius: 12 }}>
        <h3 style={{ margin: 0, fontSize: 20 }}>Ready to find your new best friend?</h3>
        <p style={{ marginTop: 8, color: '#444' }}>Browse adoptable pets or list a pet in need of a home.</p>
        <div style={{ marginTop: 12 }}>
          <a href="/adopter" className="primary-button" style={{ padding: '10px 18px', borderRadius: 8 }}>Browse Pets</a>
          <a href="/adopter/submit" style={{ marginLeft: 10, padding: '10px 16px', borderRadius: 8, background: '#fff', color: '#996633', textDecoration: 'none' }}>List a Pet</a>
        </div>
      </section>

    </div>
  );
}

export default AboutPage;
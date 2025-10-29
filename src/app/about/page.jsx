"use client"
import React, { useState } from "react";
import Image from "next/image";

import Link from "next/link";


function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className=" container ">
      {/* Navbar */}
      <nav className="nav">
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
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link href="/adoption" className="nav-link">
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

      {/* Banner */}
      {/* Banner Section */}
      <section className="banner rounded">
        <div>
          <img
            src="https://brunswick.ces.ncsu.edu/wp-content/uploads/2022/05/pets-g6fa575878_1920.jpg"
            alt="About Banner"
            className="mx-auto"
          />
        </div>
        <div className="about">
          <h1>About Us</h1>
          <p>
            Welcome to our company! We are dedicated to providing the best services
            and solutions to help you achieve your goals. Our journey started with
            a vision to make things easier and better for everyone.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver top-notch solutions that bring real value to
          our customers. With creativity and innovation, we strive to solve
          problems and build trust with our community.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="whyChoose">
        <h2>Why Choose Us</h2>
        <div className="featureGrid">
          <div className="card">
            <h3>Expert Team</h3>
            <p>Our team consists of experienced professionals in the industry.</p>
          </div>

          <div className="card">
            <h3>Quality Services</h3>
            <p>We ensure high-quality services tailored to your needs.</p>
          </div>

          <div className="card">
            <h3>Customer Support</h3>
            <p>We are here to support you 24/7 whenever you need us.</p>
          </div>

          <div className="card">
            <h3>Affordable Pricing</h3>
            <p>Get the best value with competitive and transparent pricing.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>Subscribe to Our Newsletter</p>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            className="border px-3 py-2"
          />
          <button>Subscribe</button>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;
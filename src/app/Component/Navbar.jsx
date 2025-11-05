"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";

const ProfileControls = dynamic(() => import("./ProfileControls"), { ssr: false });

export default function Navbar() {
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
          <li><Link href="/" className="nav-link active ">Home</Link></li>
          <li><Link href="/about" className="nav-link active">About</Link></li>
          <li><Link href="/service" className="nav-link active">Service</Link></li>
          <li><Link href="/contact" className="nav-link">Contact</Link></li>
          <li><Link href="/gallery" className="nav-link">Gallery</Link></li>
          <li><Link href="/shop" className="nav-link">Shop</Link></li>
          <li><Link href="/adopter" className="nav-link">Adoption</Link></li>
        </ul>

        {/* Profile & Cart Controls */}
        <ProfileControls/>

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




"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartCount from "./CartCount";

const ProfileControls = dynamic(() => import("./ProfileControls"), { ssr: false });

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="nav bg-white shadow-sm">
      <div className="nav-container px-4 py-2 max-w-7xl mx-auto">
        {/* Desktop Logo */}
        <div className="logo desktop-logo">
          <Link href="/">
            <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
          </Link>
        </div>

        {/* Mobile Header: Logo centered with hamburger on right */}
        <div className="mobile-header">
          {/* Mobile Logo */}
          <div className="logo mobile-logo">
            <Link href="/" onClick={closeMenu}>
              <Image src="/img/logo.png" alt="Furlink Logo" width={70} height={70} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <ul className={`nav-menu text-sm ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link href="/" className="nav-link active px-3 py-2" onClick={closeMenu}>Home</Link></li>
          <li><Link href="/about" className="nav-link active px-3 py-2" onClick={closeMenu}>About</Link></li>
          <li><Link href="/service" className="nav-link active px-3 py-2" onClick={closeMenu}>Service</Link></li>
          <li><Link href="/contact" className="nav-link px-3 py-2" onClick={closeMenu}>Contact</Link></li>
          <li><Link href="/gallery" className="nav-link px-3 py-2" onClick={closeMenu}>Gallery</Link></li>
          <li>
            <div className="flex items-center space-x-1">
              <Link href="/shop" className="nav-link px-3 py-2" onClick={closeMenu}>Shop</Link>
              <Link href="/cart" className="relative inline-flex items-center justify-center p-1" onClick={closeMenu}>
                <FaShoppingCart size={16} className="text-gray-700" />
                <CartCount />
              </Link>
            </div>
          </li>
          <li><Link href="/adopter" className="nav-link px-3 py-2" onClick={closeMenu}>Adoption</Link></li>
          
          {/* Mobile Login Button */}
          <li className="mobile-login">
            <ProfileControls/>
          </li>
        </ul>

        {/* Desktop Profile Controls */}
        <div className="desktop-login">
          <ProfileControls/>
        </div>
      </div>
    </nav>
  );
}




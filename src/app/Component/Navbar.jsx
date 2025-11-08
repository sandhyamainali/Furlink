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

  return (
    <nav className="nav bg-white shadow-sm">
      <div className="nav-container px-4 py-2 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="logo">
          <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
        </div>

        {/* Navigation Menu */}
        <ul className="nav-menu text-sm ">
          <li><Link href="/" className="nav-link active px-3 py-2">Home</Link></li>
          <li><Link href="/about" className="nav-link active px-3 py-2">About</Link></li>
          <li><Link href="/service" className="nav-link active px-3 py-2">Service</Link></li>
          <li><Link href="/contact" className="nav-link px-3 py-2">Contact</Link></li>
          <li><Link href="/gallery" className="nav-link px-3 py-2">Gallery</Link></li>
          <li>
            <div className="flex items-center space-x-1">
              <Link href="/shop" className="nav-link px-3 py-2">Shop</Link>
              <Link href="/cart" className="relative inline-flex items-center justify-center p-1">
                <FaShoppingCart size={16} className="text-gray-700" />
                <CartCount />
              </Link>
            </div>
          </li>
          <li><Link href="/adopter" className="nav-link px-3 py-2">Adoption</Link></li>
        </ul>

        {/* Profile Controls */}
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




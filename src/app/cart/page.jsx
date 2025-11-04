"use client";
import React from "react";
import { useCart } from "../../context/cartContext";
import Image from 'next/image';
import { Link } from "lucide-react";

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return <p style={{ padding: "20px" }}>Your cart is empty.</p>;
  }

  return (
    
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
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
          
      <h1>Your Cart</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cartItems.map(({ id, name, price, quantity }) => (
          <li
            key={id}
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            <h3>{name}</h3>
            <p>
              Price: {price} x {quantity} ={" "}
              <strong>
                $
                {(
                  parseFloat(price.replace("$", "")) * quantity
                ).toFixed(2)}
              </strong>
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => decreaseQuantity(id)}
                style={{
                  backgroundColor: "#f0ad4e",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  color: "#fff",
                }}
                aria-label={`Decrease quantity of ${name}`}
              >
                -
              </button>
              <button
                onClick={() => addToCart({ id, name, price })}
                style={{
                  backgroundColor: "#5cb85c",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  color: "#fff",
                }}
                aria-label={`Increase quantity of ${name}`}
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(id)}
                style={{
                  backgroundColor: "#d9534f",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  color: "#fff",
                }}
                aria-label={`Remove ${name} from cart`}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
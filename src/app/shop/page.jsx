"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";

const productCategories = [
  "All Products",
  "Food",
  "Toys",
  "Grooming",
  "Training",
  "Accessories",
];

const products = [
  {
    id: 1,
    name: "Premium Dog Food",
    category: "Food",
    price: "$30",
    description: "Nutritious and balanced meal for your dog.",
  },
  {
    id: 2,
    name: "Cat Toy Mouse",
    category: "Toys",
    price: "$10",
    description: "Fun and engaging toy for your cat.",
  },
  {
    id: 3,
    name: "Pet Shampoo",
    category: "Grooming",
    price: "$15",
    description: "Gentle shampoo for a shiny coat.",
  },
  {
    id: 4,
    name: "Training Clicker",
    category: "Training",
    price: "$8",
    description: "Effective tool for training your pet.",
  },
  {
    id: 5,
    name: "Dog Collar",
    category: "Accessories",
    price: "$12",
    description: "Comfortable and durable collar for dogs.",
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const router = useRouter();
  const { addToCart } = useCart();

  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
    router.push("/cart");
  };

  return (

    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <nav className="nav">
        <div className="nav-container ">
          {/* Logo */}
          <div className="logo">
            <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
          </div>

          {/* Navigation Menu */}
          <ul className="nav-menu ">
            <li>
              <Link href="/" className="nav-link  ">
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
                Shop
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
      {/* ... your existing header and navigation code ... */}

      {/* Shop Filter Dropdown */}
      <section style={{ marginTop: "50px" }}>
        <label
          htmlFor="category-select"
          style={{ fontWeight: "bold", fontSize: "1.2rem", marginRight: "10px" }}
        >
          Filter by Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          {productCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </section>

      {/* Products Grid */}
      <section
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map(({ id, name, price, description }) => (
          <div
            key={id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>{name}</h3>
            <p style={{ color: "#777" }}>{description}</p>
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>{price}</p>
            <button
              onClick={() => handleAddToCart({ id, name, price })}
              style={{
                marginTop: "15px",
                backgroundColor: "#d8a276",
                border: "none",
                padding: "10px",
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
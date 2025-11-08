"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";

const API_BASE = "https://furlink-backend.vercel.app";

export default function ShopPage() {
  const [categories, setCategories] = useState([]); // {id,name}
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    let mounted = true;
    async function fetchCategories() {
      setIsLoadingCategories(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/shop/categories/`);
        if (!res.ok) throw new Error(`Categories fetch failed: ${res.status}`);
        const data = await res.json();
        // Expecting an array of {id, name} or similar
        if (!mounted) return;
        if (Array.isArray(data)) setCategories(data);
        else if (data && Array.isArray(data.results)) setCategories(data.results);
        else setCategories([]);
      } catch (err) {
        console.error(err);
        if (mounted) setError('Failed to load categories');
      } finally {
        if (mounted) setIsLoadingCategories(false);
      }
    }

    fetchCategories();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function fetchProducts() {
      setIsLoadingProducts(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/shop/products/`);
        if (!res.ok) throw new Error(`Products fetch failed: ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        if (Array.isArray(data)) setProducts(data);
        else if (data && Array.isArray(data.results)) setProducts(data.results);
        else setProducts([]);
      } catch (err) {
        console.error(err);
        if (mounted) setError('Failed to load products');
      } finally {
        if (mounted) setIsLoadingProducts(false);
      }
    }

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    router.push("/cart");
  };

  // Filter products by selected category id (or show all)
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => String(p.category) === String(selectedCategory));

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
     
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
          <option value="all">All Products</option>
          {isLoadingCategories ? (
            <option value="loading" disabled>Loading...</option>
          ) : (
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))
          )}
        </select>
      </section>

      {/* Errors / Loading */}
      {error && (
        <div style={{ color: 'red', marginTop: 12 }}>{error}</div>
      )}

      {/* Products Grid */}
      <section
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {isLoadingProducts ? (
          <div>Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#666' }}>No products found.</div>
        ) : (
          filteredProducts.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ marginBottom: 12, textAlign: 'center' }}>
                {p.image ? (
                  // use plain img to avoid next/image external domain config
                  <img src={p.image} alt={p.name} style={{ maxWidth: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 8 }} />
                ) : (
                  <div style={{ width: '100%', height: 160, background: '#f0f0f0', borderRadius: 8 }} />
                )}
              </div>

              <h3 style={{ marginTop: 0 }}>{p.name}</h3>
              <p style={{ color: "#777", flex: 1 }}>{p.description}</p>
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  {p.discount_price && p.discount_price !== p.price ? (
                    <div>
                      <span style={{ textDecoration: 'line-through', color: '#999', marginRight: 8 }}>Rs{p.price}</span>
                      <span style={{ fontWeight: 'bold', color: '#cc4400' }}>Rs{p.discount_price}</span>
                    </div>
                  ) : (
                    <span style={{ fontWeight: 'bold' }}>Rs{p.price}</span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(p)}
                  style={{
                    marginTop: 0,
                    backgroundColor: "#d8a276",
                    border: "none",
                    padding: "10px",
                    borderRadius: "6px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
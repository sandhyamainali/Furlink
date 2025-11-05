"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // initialize from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem('cart');
        return raw ? JSON.parse(raw) : [];
      }
    } catch (err) {
      // ignore parse errors
    }
    return [];
  });

  // persist cart to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error saving cart to localStorage', err);
    }
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: qty }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const getItemPrice = (item) => {
    // prefer discount_price when available and numeric
    const raw = item.discount_price ?? item.price ?? 0;
    const parsed = parseFloat(String(raw).replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + getItemPrice(item) * (item.quantity || 0), 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, decreaseQuantity, updateQuantity, clearCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
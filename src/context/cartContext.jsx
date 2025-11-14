"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
 
  const [cartItems, setCartItems] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem('cart');
        return raw ? JSON.parse(raw) : [];
      }
    } catch (err) {
      
    }
    return [];
  });

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
  
const createOrder = async () => {
  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  try {
    const orderData = {
      items: cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity,
        unit_price: item.discount_price ?? item.price
      }))
    };

    console.log('Sending order data:', orderData);
    console.log('API URL:', `${BASE_URL}/shop/orders/`);

    const response = await fetch(`${BASE_URL}/shop/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      
       
      },
      body: JSON.stringify(orderData)
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
    }

    const order = await response.json();
    console.log('Order created successfully:', order);
    setCurrentOrder(order);
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
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
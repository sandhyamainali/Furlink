"use client";
import React, { useState } from "react";
import { useCart } from "../../context/cartContext";


export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (cartItems.length === 0) {
    return <p style={{ padding: "20px" }}>Your cart is empty.</p>;
  }

  const grandTotal = getTotal();

  return (
    <div className="cart-container" style={{ fontFamily: "Arial, sans-serif" }}>
      
      
      <h1>Your Cart</h1>
      <ul className="cart-list">
        {cartItems.map((item) => {
          const priceRaw = item.discount_price ?? item.price ?? 0;
          const unit = parseFloat(String(priceRaw).replace(/[^0-9.-]+/g, "")) || 0;
          const lineTotal = unit * (item.quantity || 0);
          return (
            <li key={item.id} className="cart-card">
              {item.image ? (
                <img className="cart-thumb" src={item.image} alt={item.name} />
              ) : (
                <div className="cart-thumb" />
              )}

              <div className="cart-item-info">
                <h3 className="cart-item-title">{item.name}</h3>
                <p className="cart-item-desc">{item.description}</p>
                <div className="cart-item-meta">
                  <div>Unit: <strong>${unit.toFixed(2)}</strong></div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0 }}>Qty: <strong>{item.quantity}</strong></p>
                <p style={{ margin: '6px 0' }}>Subtotal: <strong>${lineTotal.toFixed(2)}</strong></p>
                <div className="cart-qty-controls" style={{ justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary" onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease ${item.name}`}>-</button>
                  <button className="btn btn-primary" onClick={() => addToCart(item, 1)} aria-label={`Increase ${item.name}`}>+</button>
                  <button className="btn btn-danger" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>Remove</button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="cart-summary">
        <div>
          <button className="btn btn-secondary" onClick={() => clearCart()}>Clear Cart</button>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p className="cart-total">Total: <strong>${grandTotal.toFixed(2)}</strong></p>
          <button className="btn btn-primary" onClick={() => alert('Proceed to checkout (not implemented)')} style={{ marginTop: 8 }}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
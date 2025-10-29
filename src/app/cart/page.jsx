"use client";
import React from "react";
import { useCart } from "../../context/cartContext";

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return <p style={{ padding: "20px" }}>Your cart is empty.</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      
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
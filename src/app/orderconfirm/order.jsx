"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getOrder } from "../../lib/clientApi";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    
    if (!orderId) {
      setError("No order ID provided");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      const { data, error } = await getOrder(orderId);
      
      if (error) {
        setError(error);
      } else {
        setOrder(data);
      }
      
      setLoading(false);
    };

    fetchOrder();
  }, [searchParams]);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading order details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ color: "red" }}>Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => router.push("/shop")}
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Order not found</h2>
        <button 
          onClick={() => router.push("/shop")}
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#4CAF50" }}>✓ Order Confirmed!</h1>
        <p style={{ fontSize: "18px", color: "#666" }}>
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Status:</strong> <span style={{ 
          color: order.status === "paid" ? "#4CAF50" : "#FF9800",
          fontWeight: "bold",
          textTransform: "uppercase"
        }}>{order.status}</span></p>
        <p><strong>Total Amount:</strong> {order.currency} {parseFloat(order.total_amount).toFixed(2)}</p>
        <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Order Items</h2>
        {order.items && order.items.map((item) => (
          <div 
            key={item.id} 
            style={{ 
              display: "flex", 
              gap: "20px", 
              padding: "15px", 
              border: "1px solid #ddd", 
              borderRadius: "8px",
              marginBottom: "10px"
            }}
          >
            {item.product.image && (
              <img 
                src={item.product.image} 
                alt={item.product.name}
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 5px 0" }}>{item.product.name}</h3>
              <p style={{ margin: "0", color: "#666" }}>{item.product.description}</p>
              <p style={{ margin: "5px 0 0 0" }}>
                <strong>Quantity:</strong> {item.quantity} × ${parseFloat(item.unit_price).toFixed(2)} = 
                <strong> ${parseFloat(item.line_total).toFixed(2)}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button 
          onClick={() => router.push("/shop")}
          style={{ 
            padding: "12px 30px", 
            fontSize: "16px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          Continue Shopping
        </button>
        <button 
          onClick={() => router.push("/profile")}
          style={{ 
            padding: "12px 30px", 
            fontSize: "16px",
            background: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}

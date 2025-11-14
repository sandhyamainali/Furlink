"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/cartContext";
import { createOrder, initiateAccountPayment } from "../../lib/clientApi";

// Payment Success Modal Component
const PaymentSuccessModal = ({ isOpen, onClose, transactionData }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        width: "90%",
        textAlign: "center"
      }}>
        <div style={{
          color: "#4CAF50",
          fontSize: "48px",
          marginBottom: "20px"
        }}>
          ✓
        </div>
        
        <h2 style={{ 
          color: "#4CAF50", 
          marginBottom: "15px",
          fontSize: "24px"
        }}>
          Payment Successful!
        </h2>
        
        {transactionData && (
          <div style={{
            textAlign: "left",
            backgroundColor: "#f9f9f9",
            padding: "15px",
            borderRadius: "6px",
            marginBottom: "20px",
            fontSize: "14px"
          }}>
            <p><strong>Order ID:</strong> {transactionData.order_id}</p>
            <p><strong>Transaction ID:</strong> {transactionData.id}</p>
            <p><strong>Amount:</strong> {transactionData.amount} {transactionData.currency}</p>
            <p><strong>Description:</strong> {transactionData.description}</p>
            <p><strong>Transaction UUID:</strong> {transactionData.tx_uuid}</p>
            <p><strong>Date:</strong> {new Date(transactionData.created_at).toLocaleString()}</p>
          </div>
        )}
        
        <button
          onClick={onClose}
          style={{
            padding: "12px 30px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default function CartPage() {
  const router = useRouter();
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, getTotal } = useCart();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionData, setTransactionData] = useState(null);

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <button 
          onClick={() => router.push("/shop")}
          style={{ 
            marginTop: "20px", 
            padding: "10px 20px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Go to Shop
        </button>
      </div>
    );
  }

  const grandTotal = getTotal();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    // Check if user is logged in
    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
    if (!token) {
      setPaymentStatus("Please login to continue with checkout");
      setTimeout(() => {
        router.push('/login?redirect=/cart');
      }, 2000);
      return;
    }
    
    setIsProcessing(true);
    setPaymentStatus("Creating order...");

    try {
      // Step 1: Create Order
      const orderItems = cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }));

      const { data: orderData, error: orderError } = await createOrder(orderItems);

      if (orderError) {
        setPaymentStatus(`Order creation failed: ${orderError}`);
        setIsProcessing(false);
        return;
      }

      const orderId = orderData.id;
      setPaymentStatus(`Order created successfully (ID: ${orderId}). Processing payment...`);

      // Step 2: Process Payment with Account Balance
      const { data: paymentData, error: paymentError } = await initiateAccountPayment(orderId);

      if (paymentError) {
        setPaymentStatus(`Payment failed: ${paymentError}`);
        setIsProcessing(false);
        return;
      }

      // Payment successful
      setPaymentStatus("Payment completed successfully!");
      setTransactionData(paymentData.transaction);
      
      // Clear cart after successful payment
      clearCart();
      
      // Show success modal
      setShowSuccessModal(true);

    } catch (err) {
      setPaymentStatus(`Error: ${err.message}`);
      setIsProcessing(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setTransactionData(null);
    // Redirect to shop page
    router.push("/shop");
  };

  return (
    <div className="cart-container" style={{ 
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px"
    }}>
      <h1 style={{ 
        textAlign: "center", 
        marginBottom: "30px",
        color: "#333"
      }}>
        Your Cart
      </h1>
      
      <ul className="cart-list" style={{ 
        listStyle: "none", 
        padding: 0,
        marginBottom: "30px"
      }}>
        {cartItems.map((item) => {
          const priceRaw = item.discount_price ?? item.price ?? 0;
          const unit = parseFloat(String(priceRaw).replace(/[^0-9.-]+/g, "")) || 0;
          const lineTotal = unit * (item.quantity || 0);
          
          return (
            <li key={item.id} className="cart-card" style={{
              display: "flex",
              alignItems: "center",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "15px",
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
              {item.image ? (
                <img 
                  className="cart-thumb" 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginRight: "20px"
                  }}
                />
              ) : (
                <div className="cart-thumb" style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "6px",
                  marginRight: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999"
                }}>
                  No Image
                </div>
              )}

              <div className="cart-item-info" style={{ flex: 1 }}>
                <h3 className="cart-item-title" style={{ 
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  color: "#333"
                }}>
                  {item.name}
                </h3>
                <p className="cart-item-desc" style={{ 
                  margin: "0 0 12px 0",
                  color: "#666",
                  fontSize: "14px"
                }}>
                  {item.description}
                </p>
                <div className="cart-item-meta">
                  <div style={{ fontSize: "14px", color: "#333" }}>
                    Unit: <strong>Rs{unit.toFixed(2)}</strong>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: "14px" }}>
                  Qty: <strong>{item.quantity}</strong>
                </p>
                <p style={{ margin: '6px 0', fontSize: "16px", fontWeight: "bold" }}>
                  Subtotal: <strong>Rs{lineTotal.toFixed(2)}</strong>
                </p>
                <div className="cart-qty-controls" style={{ 
                  display: "flex", 
                  gap: "8px",
                  justifyContent: 'flex-end',
                  marginTop: "10px"
                }}>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label={`Decrease ${item.name}`}
                    style={{
                      padding: "6px 12px",
                      border: "1px solid #ddd",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    -
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => addToCart(item, 1)}
                    aria-label={`Increase ${item.name}`}
                    style={{
                      padding: "6px 12px",
                      border: "1px solid #007bff",
                      backgroundColor: "#007bff",
                      color: "white",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    +
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                    style={{
                      padding: "6px 12px",
                      border: "1px solid #dc3545",
                      backgroundColor: "#dc3545",
                      color: "white",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="cart-summary" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderTop: "2px solid #eee",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px"
      }}>
        <div>
          <button 
            className="btn btn-secondary" 
            onClick={() => clearCart()}
            style={{
              padding: "10px 20px",
              border: "1px solid #6c757d",
              backgroundColor: "#6c757d",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Clear Cart
          </button>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p className="cart-total" style={{ 
            fontSize: "20px", 
            fontWeight: "bold",
            margin: "0 0 15px 0"
          }}>
            Total: <strong>Rs{grandTotal.toFixed(2)}</strong>
          </p>
          <button
            className="btn btn-primary"
            onClick={handleCheckout}
            disabled={isProcessing}
            style={{ 
              marginTop: "10px",
              padding: "12px 24px",
              fontSize: "16px",
              background: isProcessing ? "#ccc" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isProcessing ? "not-allowed" : "pointer",
              fontWeight: "bold"
            }}
          >
            {isProcessing ? 'Processing...' : 'Pay with Account Balance'}
          </button>
          {paymentStatus && (
            <p style={{ 
              marginTop: 10, 
              color: paymentStatus.includes('failed') || paymentStatus.includes('Error') ? 'red' : '#4CAF50',
              fontSize: "14px"
            }}>
              {paymentStatus}
            </p>
          )}
        </div>
      </div>

      {/* Payment Success Modal */}
      <PaymentSuccessModal 
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        transactionData={transactionData}
      />
    </div>
  );
}
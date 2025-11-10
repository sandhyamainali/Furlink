"use client";
import React, { useState } from "react";
import { useCart } from "../../context/cartContext";
import { initiatePayment, simulateCallback, getTransaction, renderAndSubmitEsewaForm } from "../../lib/clientApi";


export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (cartItems.length === 0) {
    return <p style={{ padding: "20px" }}>Your cart is empty.</p>;
  }

  const grandTotal = getTotal();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      // Step 1: Initiate Payment
      const successUrl = 'https://furlink-backend.vercel.app/payment/success/';
      const failureUrl = 'https://furlink-backend.vercel.app/payment/failure/';
      const { data: initData, error: initError } = await initiatePayment(grandTotal, "EPAYTEST", successUrl, failureUrl);

      if (initError) {
        setPaymentStatus(`Step 1 Failed: ${initError}`);
        setIsProcessing(false);
        return;
      }

      const { tx_uuid, form_html } = initData;
      setPaymentStatus(`Step 1: Payment Initiated ✅ (tx_uuid: ${tx_uuid})`);

      // Step 2: Render and submit eSewa form
      if (form_html) {
        setPaymentStatus(`Step 2: Redirecting to eSewa...`);
        renderAndSubmitEsewaForm(form_html);
        // Wait a moment for form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Step 3: Simulate Callback (after user returns from eSewa)
      const { data: callbackData, error: callbackError } = await simulateCallback(tx_uuid);

      if (callbackError) {
        setPaymentStatus(`Step 2 Failed: ${callbackError}`);
        setIsProcessing(false);
        return;
      }

      setPaymentStatus(`Step 3: Callback Received ✅ (status: SUCCESS)`);

      // Step 4: Get Transaction
      const { data: transactionData, error: transactionError } = await getTransaction(tx_uuid);

      if (transactionError) {
        setPaymentStatus(`Step 3 Failed: ${transactionError}`);
        setIsProcessing(false);
        return;
      }

      setPaymentStatus(`Step 4: Transaction Verified ✅ (status: ${transactionData.status})`);

      // Step 5: Complete
      if (transactionData.status === 'COMPLETED') {
        setPaymentStatus(`Step 5: Payment Completed 🎉`);
        clearCart(); // Clear cart on successful payment
      } else {
        setPaymentStatus(`Step 5: Payment not completed (status: ${transactionData.status})`);
      }

    } catch (err) {
      setPaymentStatus(`Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

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
          <button
            className="btn btn-primary"
            onClick={handleCheckout}
            disabled={isProcessing}
            style={{ marginTop: 20 }}
          >
            {isProcessing ? 'Processing...' : 'Checkout with eSewa'}
          </button>
          {paymentStatus && (
            <p style={{ marginTop: 10, color: paymentStatus.includes('Failed') || paymentStatus.includes('Error') ? 'red' : 'green' }}>
              {paymentStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
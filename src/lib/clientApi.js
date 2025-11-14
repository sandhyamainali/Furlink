// src/lib/clientApi.js
import { API_BASE } from './config';

export const createOrder = async (items) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE}/shop/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        items_input: items,
        currency: "USD"
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || errorData.message || 'Order creation failed');
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const initiateAccountPayment = async (orderId) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE}/shop/payments/pay_with_account/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        order_id: orderId
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || errorData.message || 'Payment failed');
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
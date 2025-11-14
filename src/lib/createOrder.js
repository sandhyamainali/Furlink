import { base_url } from './config';

export const createOrder = async (items) => {
  try {
    const token = localStorage.getItem('access');
    const response = await fetch(`${base_url}/shop/orders/`, {
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
      throw new Error(errorData.detail || 'Order creation failed');
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
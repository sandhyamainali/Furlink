// Client-side API helper for Next.js client components
const API_BASE = 'https://furlink-backend.vercel.app';

function getAuthHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function initiatePayment(amount, productCode = "EPAYTEST", successUrl, failureUrl) {
  try {
    const res = await fetch(`${API_BASE}/payment/initiate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        amount,
        product_code: productCode,
        success_url: successUrl,
        failure_url: failureUrl,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => null);
      throw new Error(`API error ${res.status}: ${text || res.statusText}`);
    }
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || 'Initiate payment failed' };
  }
}

export function renderAndSubmitEsewaForm(formHtml) {
  // Create a new window for eSewa payment
  const paymentWindow = window.open('', '_blank', 'width=800,height=600');

  if (!paymentWindow) {
    throw new Error('Failed to open payment window. Please allow popups for this site.');
  }

  // Write the form HTML to the new window
  paymentWindow.document.write(formHtml);
  paymentWindow.document.close();

  // Find and submit the form automatically
  const form = paymentWindow.document.querySelector('form');
  if (form) {
    // Small delay to ensure form is ready
    setTimeout(() => {
      form.submit();
    }, 500);
  } else {
    paymentWindow.close();
    throw new Error('Invalid eSewa form HTML received');
  }

  return true;
}

export async function simulateCallback(txUuid) {
  const rid = 'SIM-R-' + Math.random().toString(36).substr(2, 9);
  try {
    const res = await fetch(`${API_BASE}/payment/callback/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...getAuthHeaders(),
      },
      body: new URLSearchParams({
        transaction_uuid: txUuid,
        pid: txUuid,
        status: 'SUCCESS',
        rid,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => null);
      throw new Error(`Callback error ${res.status}: ${text || res.statusText}`);
    }
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || 'Callback failed' };
  }
}

export async function getTransaction(txUuid) {
  try {
    const res = await fetch(`${API_BASE}/payment/transaction/${txUuid}/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => null);
      throw new Error(`Transaction error ${res.status}: ${text || res.statusText}`);
    }
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || 'Get transaction failed' };
  }
}

export default { initiatePayment, simulateCallback, getTransaction, renderAndSubmitEsewaForm };
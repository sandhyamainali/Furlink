// Server-side API helper — safe to import in Next.js server components
const API_BASE = 'https://furlink-backend.vercel.app';

export async function getSinglePet(id) {
  if (!id) return { data: null, error: 'Missing id' };
  try {
    const res = await fetch(`${API_BASE}/pet/pets/${id}/`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return { data: null, error: 'Not found' };
      const text = await res.text().catch(() => null);
      return { data: null, error: `API error ${res.status}: ${text || res.statusText}` };
    }
    const data = await res.json().catch(() => null);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || 'Fetch failed' };
  }
}

export default { getSinglePet };

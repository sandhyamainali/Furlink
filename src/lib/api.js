"use client";

const API_BASE = "https://furlink-backend.vercel.app";

// Generic fetch helper with error handling
async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    console.error('API call failed:', error);
    return { data: null, error: error.message };
  }
}

// Pet-related API calls
export const petApi = {
  // Get single pet details
  getSinglePet: async (id) => {
    return await fetchApi(`/pet/pets/${id}/`);
  },

  // Get all pets (with optional pagination)
  getAllPets: async (page = 1) => {
    return await fetchApi(`/pet/pets/?page=${page}`);
  },

  // Get pets by category
  getPetsByCategory: async (categoryId, page = 1) => {
    return await fetchApi(`/pet/pets/?category=${categoryId}&page=${page}`);
  },

  // Get pet categories
  getCategories: async () => {
    return await fetchApi('/pet/categories/');
  }
};

// Auth-related helpers for making authenticated requests
export function getAuthHeader() {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

// Example of authenticated request helper
export async function fetchWithAuth(endpoint, options = {}) {
  return await fetchApi(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      ...getAuthHeader(),
    },
  });
}

export default {
  pet: petApi,
  getAuthHeader,
  fetchWithAuth,
};
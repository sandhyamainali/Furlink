// src/app/admin/pets/page.jsx
"use client";

import { useState, useEffect } from 'react';

export default function PetsManagement() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}pet/pets/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setPets(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePet = async (petId) => {
    if (!confirm('Are you sure you want to delete this pet?')) return;

    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}pet/pets/${petId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        setPets(pets.filter(pet => pet.id !== petId));
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading pets...</div>;
  }

  return (
    <div className="management-page">
      <div className="page-header">
        <h1>Pets Management</h1>
        <button className="btn-primary">Add New Pet</button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id}>
                <td>{pet.id}</td>
                <td>{pet.name}</td>
                <td>{pet.category}</td>
                <td>${pet.price}</td>
                <td>
                  <span className={`status ${pet.status}`}>
                    {pet.status}
                  </span>
                </td>
                <td className="actions">
                  <button 
                    className="btn-edit"
                    onClick={() => setEditingPet(pet)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => deletePet(pet.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
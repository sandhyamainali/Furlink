"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/config';



function AdoptPage() {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [activeTab, setActiveTab] = useState('adopt');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Require bearer token stored in localStorage under 'access'
    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
    if (!token) {
      router.replace('/login?returnUrl=/adopter');
      return;
    }

    // Get pets from localStorage (added by users in profile)
    const localPetsRaw = typeof window !== 'undefined' ? localStorage.getItem('furlink_pets') : null;
    const localPets = localPetsRaw ? JSON.parse(localPetsRaw) : [];
    
    // Transform local pets to match API format
    const transformedLocalPets = localPets.map(pet => ({
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      type: pet.type,
      age: pet.age,
      description: pet.description,
      image: pet.img || '/img/pet.png', 
      location: 'Local', 
      is_available_for_adoption: true
    }));

    
    fetch(`${API_BASE}/pet/pets/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          router.replace('/login?returnUrl=/adopter');
          throw new Error('Unauthorized');
        }
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const apiPets = Array.isArray(data) ? data : [];
        // Combine API pets with local pets
        const allPets = [...transformedLocalPets, ...apiPets];
        setPets(allPets);
      })
      .catch((err) => {
        if (err.message !== 'Unauthorized') {
          setError(err.message || 'Failed to load pets');
          // If API fails, still show local pets
          setPets(transformedLocalPets);
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Loading pets…</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Unable to load pets</h2>
        <p style={{ color: '#666' }}>{error}</p>
        <Link href="/login?returnUrl=/adopter" style={{ color: '#a0632b', marginTop: 12, display: 'inline-block' }}>Login</Link>
      </div>
    );
  }

  return (
    <div>

      <section
        style={{
          backgroundColor: '#fef9f4',
          padding: '40px 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '15px' }}>Pet Adoption Center</h1>
          <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px' }}>
            Find your perfect companion or help a pet find their forever home. Every pet deserves love and care.
          </p>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
           <button
              onClick={() => setActiveTab('adopt')}
              style={{
                padding: '12px 24px',
                borderRadius: '25px',
                border: 'none',
                backgroundColor: activeTab === 'adopt' ? '#fef9f4' : '#e0e0e0',
                color: '#333',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🐾 Adopt a Pet
            </button>
            <Link href="/adopter/submit" style={{ textDecoration: 'none' }}>
              <button
                onClick={() => setActiveTab('list')}
                style={{
                  padding: '12px 24px',
                  borderRadius: '25px',
                  border: 'none',
                  backgroundColor: activeTab === 'list' ? '#ff8500' : '#e0e0e0',
                  color: activeTab === 'list' ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                type="button"
              >
                ➕ List a Pet for Adoption
              </button>
            </Link>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            marginBottom: '40px',
            backgroundColor: 'white',
            borderRadius: '25px',
            padding: '12px 20px',
            border: '1px solid #ddd'
          }}>
            <span style={{ fontSize: '1.2rem' }}>🔍</span>
            <input
              type="text"
              placeholder="Search by name, breed, age or location..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '1rem'
              }}
            />
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              Filter
              <span>⬇</span>
            </button>
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: '#fef9f4',
          padding: '40px 20px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {pets.map((pet) => (
            <div
              key={pet.id}
              style={{
                backgroundColor: '#fef9f4',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '250px' }}>
                <Image src={pet.image} alt={pet.name} 
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  left: '10px',
                  backgroundColor: pet.is_available_for_adoption ? '#4CAF50' : '#ff6b6b',
                  color: 'white',
                  padding: '5px 12px',
                  borderRadius: '15px',
                  fontSize: '0.85rem',
                  fontWeight: '500'
                }}>
                  {pet.is_available_for_adoption ? 'Available' : 'Unavailable'}
                </div>
                {false && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px',
                    backgroundColor: '#ff8500',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '15px',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}>
                
                  </div>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.3rem' }}>{pet.name}</h3>
                
                <p style={{ margin: '0 0 8px 0', color: '#888', fontSize: '0.9rem' }}>
                  Location: {pet.location}
                </p>
                <p style={{ margin: '0 0 8px 0', color: '#888', fontSize: '0.9rem' }}>
                  Age:{pet.age}
                </p>
                <p style={{ margin: '0 0 8px 0', color: '#888', fontSize: '0.9rem' }}>
                   Adoption Days:{pet.adoption_days}
                </p>
                <p style={{ margin: '10px 0 15px 0', color: '#555', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Description: {pet.description}
                </p>
                {pet.is_available_for_adoption ? (
                  <Link href={`/adopter/pet/${pet.id}`}>
                    <button
                      style={{
                        width: '100%',
                        backgroundColor: '#996633',
                        color: 'white',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500',
                      }}
                      type="button"
                    >
                      View Pet Profile
                    </button>
                  </Link>
                ) : (
                  <button
                    style={{
                      width: '100%',
                      backgroundColor: '#cccccc',
                      color: '#666666',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'not-allowed',
                      fontSize: '1rem',
                      fontWeight: '500',
                    }}
                    disabled
                    type="button"
                  >
                    Not Available
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}


export default AdoptPage;
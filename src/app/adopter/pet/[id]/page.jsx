"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/config';

// Client-side fetch for single pet detail (authenticated)



export default function PetProfilePage({ params }) {
  const router = useRouter();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
      if (!token) {
        router.replace(`/login?returnUrl=/adopter/pet/${params.id}`);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/pet/pets/${params.id}/`, {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
        });
        if (res.status === 401 || res.status === 403) {
          router.replace(`/login?returnUrl=/adopter/pet/${params.id}`);
          return;
        }
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();

        // Normalize response to the fields used by the UI
        const normalized = {
          id: data.id,
          name: data.name || data.title || '',
          breed: data.breed || data.species || '',
          type: data.species || data.type || '',
          age: data.age || data.years || '',
          location: data.location || '',
          description: data.description || data.about || '',
          adoptionFee: data.adoption_price || data.custom_price || data.price || null,
          image: data.photo || data.image || '/img/pet-placeholder.jpg',
          isAvailable: typeof data.is_available_for_adoption !== 'undefined' ? data.is_available_for_adoption : true,
          owner: data.owner_username || null,
          raw: data
        };

        setPet(normalized);
      } catch (err) {
        console.error('Fetch pet error', err);
        setError(err.message || 'Failed to load pet');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [params.id, router]);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Loading pet…</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Unable to load pet</h2>
        <p style={{ color: '#666' }}>{error}</p>
        <Link href={`/login?returnUrl=/adopter/pet/${params.id}`} style={{ color: '#a0632b', marginTop: 12, display: 'inline-block' }}>Login</Link>
      </div>
    );
  }

  if (!pet) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2 style={{ fontSize: 20 }}>Pet not found</h2>
        <Link href="/adopter" style={{ color: '#a0632b', marginTop: 12, display: 'inline-block' }}>Back to Adoption</Link>
      </div>
    );
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} style={{ color: '#ff8500', fontSize: '16px' }}>★</span>
        ))}
        {hasHalfStar && (
          <span style={{ color: '#ff8500', fontSize: '16px' }}>☆</span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} style={{ color: '#ddd', fontSize: '16px' }}>☆</span>
        ))}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#fef9f4', minHeight: '100vh' }}>
      
      
      <div style={{ padding: '20px' }}>
        <Link 
          href="/adopter" 
          style={{ 
            color: '#a0632b', 
            textDecoration: 'none', 
            fontSize: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            padding: '10px 14px',
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #f0e1cf'
          }}
        >
          <span style={{ fontSize: '18px' }}>←</span>
          Back to Adoption
        </Link>

        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 350px',
          gap: '40px'
        }}>
          {/* Left Column - Main Content */}
          <div>
            {/* Pet Image */}
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              height: '500px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '30px',
              backgroundColor: '#ddd'
            }}>
              <Image 
                src={pet.image} 
                alt={pet.name} 
                fill
                style={{ objectFit: 'cover' }}
              />
              {pet.isAvailable && (
                <div style={{ 
                  position: 'absolute', 
                  top: '15px', 
                  left: '15px',
                  backgroundColor: '#1fb6aa',
                  color: 'white',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Available
                </div>
              )}
              {pet.raw?.adoption_type && (
                <div style={{ 
                  position: 'absolute', 
                  top: '15px', 
                  right: '15px',
                  backgroundColor: '#ff8a3d',
                  color: 'white',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {pet.raw.adoption_type}
                </div>
              )}
            </div>

            {/* Pet Name and Basic Info */}
            <h1 style={{ 
              fontSize: '2.5rem', 
              color: '#333', 
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}>
              {pet.name}
            </h1>
            
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#666', 
              margin: '0 0 20px 0'
            }}>
              {pet.breed} • {pet.type}
            </p>

            <div style={{ 
              display: 'flex', 
              gap: '30px', 
              marginBottom: '30px',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>⏰</span>
                <span style={{ color: '#666', fontSize: '16px' }}>{pet.age}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>📍</span>
                <span style={{ color: '#666', fontSize: '16px' }}>{pet.location}</span>
              </div>
            </div>

            {/* About Section */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                color: '#333', 
                margin: '0 0 15px 0',
                fontWeight: '600'
              }}>
                About {pet.name}
              </h2>
              <p style={{ 
                color: '#555', 
                fontSize: '16px', 
                lineHeight: '1.6',
                margin: 0
              }}>
                {pet.description}
              </p>
            </div>

            {/* Temperament Section */}
            {pet.raw?.temperament && pet.raw.temperament.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                color: '#333', 
                margin: '0 0 15px 0',
                fontWeight: '600'
              }}>
                Temperament
              </h2>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '10px'
              }}>
                {pet.raw.temperament.map((trait, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      color: '#666',
                      cursor: 'pointer'
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            )}

            {/* Reason for Adoption */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                color: '#333', 
                margin: '0 0 15px 0',
                fontWeight: '600'
              }}>
                Reason for Adoption
              </h2>
              <p style={{ 
                color: '#555', 
                fontSize: '16px', 
                lineHeight: '1.6',
                margin: 0
              }}>
                {pet.raw?.reason_for_adoption || pet.raw?.reasonForAdoption || ''}
              </p>
            </div>

            {/* Special Requirements */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                color: '#333', 
                margin: '0 0 15px 0',
                fontWeight: '600'
              }}>
                Special Requirements
              </h2>
              <p style={{ 
                color: '#555', 
                fontSize: '16px', 
                lineHeight: '1.6',
                margin: 0
              }}>
                {pet.raw?.special_requirements || pet.raw?.specialRequirements || ''}
              </p>
            </div>

            {/* Health Information (from API) */}
            {(pet.raw?.vaccination_status || pet.raw?.health_issues) && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  color: '#333', 
                  margin: '0 0 15px 0',
                  fontWeight: '600'
                }}>
                  Health Information
                </h2>
                <div style={{ color: '#555', fontSize: '16px', lineHeight: '1.6' }}>
                  {pet.raw?.vaccination_status && (
                    <p><strong>Vaccination:</strong> {pet.raw.vaccination_status}</p>
                  )}
                  {pet.raw?.health_issues && (
                    <p><strong>Health issues:</strong> {pet.raw.health_issues}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div>
            <div style={{ 
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: '20px'
            }}>
              {/* Adoption Fee */}
              <div style={{ 
                marginBottom: '30px',
                paddingBottom: '25px',
                borderBottom: '1px solid #eee'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#333',
                  marginBottom: '5px'
                }}>
                  Rs{pet.adoptionFee ?? 'N/A'}
                </div>
                <div style={{ 
                  color: '#666', 
                  fontSize: '14px'
                }}>
                  Adoption fee
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                marginBottom: '30px'
              }}>
                <Link href={`/adopter/pet/${pet.id}/adopt`} style={{ width: '100%', textDecoration: 'none' }}>
                  <button
                    style={{
                      width: '100%',
                      backgroundColor: '#ff8a3d',
                      color: 'white',
                      padding: '14px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                    }}
                    type="button"
                  >
                    ❤  Request to Adopt
                  </button>
                </Link>
                {/* Contact route disabled - commented out per request */}
                {false && (
                  <Link href={`/adopter/pet/${pet.id}/contact`} style={{ width: '100%', textDecoration: 'none' }}>
                    <button
                      style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        color: '#333',
                        padding: '14px 20px',
                        borderRadius: '8px',
                        border: '1px solid #e6e6e6',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                      type="button"
                    >
                      <span>💬</span>
                      Contact Caregiver
                    </button>
                  </Link>
                )}
              </div>

              {/* Caregiver / Owner Section (from API) */}
              <div style={{ 
                marginBottom: '30px',
                paddingBottom: '25px',
                borderBottom: '1px solid #eee'
              }}>
                <h3 style={{ fontSize: '1.2rem', color: '#333', margin: 0, fontWeight: '600' }}>
                  Owner
                </h3>
                <div style={{ marginTop: 10 }}>
                  <Link href={pet.raw?.owner ? `/caregiver/${pet.raw.owner}` : '#'} style={{ textDecoration: 'none' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333', cursor: pet.raw?.owner ? 'pointer' : 'default' }}>
                      {pet.owner || `User ${pet.raw?.owner || ''}`}
                    </div>
                  </Link>
                  <div style={{ color: '#666', fontSize: '14px', marginTop: 8 }}>
                    {pet.raw?.owner ? 'Verified owner' : ''}
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  color: '#333', 
                  margin: '0 0 15px 0',
                  fontWeight: '600'
                }}>
                  Quick info
                </h3>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Type:</span>
                    <span style={{ color: '#333', fontSize: '14px', fontWeight: '500' }}>{pet.type}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Breed:</span>
                    <span style={{ color: '#333', fontSize: '14px', fontWeight: '500' }}>{pet.breed}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Age:</span>
                    <span style={{ color: '#333', fontSize: '14px', fontWeight: '500' }}>{pet.age}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Location:</span>
                    <span style={{ color: '#333', fontSize: '14px', fontWeight: '500' }}>{pet.location}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Adoption Type:</span>
                    <span style={{ color: '#333', fontSize: '14px', fontWeight: '500' }}>{pet.raw?.adoption_type || '—'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { API_BASE } from '@/lib/config';

export default function GalleryPage() {
  


  const [photos, setPhotos] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
  fetch(`${API_BASE}/gallery/`)
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        // backend may return an array directly or an object with a `photos` field
        const items = Array.isArray(data) ? data : data?.photos || [];
        setPhotos(items);
      })
      .catch((err) => {
        console.error('Failed to load gallery:', err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
    
      {/* Gallery Section */}
      <main
        style={{
          maxWidth: '900px',
          margin: '40px auto',
          padding: '0 20px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: '#cc4400',
            fontSize: '2.5rem',
          }}
        >
          Pet Gallery
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.id ?? index}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={photo.image || photo.src || photo}
                alt={photo.breed || photo.alt || ''}
                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              />
              <div style={{ padding: '10px', color: '#555' }}>
                <p style={{ textAlign: 'center', fontWeight: 600 }}>{photo.breed || photo.alt}</p>
                {photo.description && (
                  <p style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '6px' }}>{photo.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
     
    </>
  );
}

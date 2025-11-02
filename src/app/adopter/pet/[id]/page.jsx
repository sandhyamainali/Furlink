'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Pet data with full profile details
const getPetData = () => {
  const pets = [
    {
      id: 1,
      name: 'Max',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: '2 years',
      location: 'San Francisco, CA',
      status: 'Available',
      adoptionType: 'Permanent',
      image: '/img/dog1.jpeg',
      about: 'a friendly and energetic golden retriever who loves playing fetch and swimming. Max has been with our family for 2 years but we\'re relocating internationally and can\'t take him with us. Max is great with children of all ages and gets along well with other dogs. He\'s fully house-trained, knows basic commands (sit, stay, come, down), and loves going on hikes and beach walks.',
      temperament: ['Friendly', 'Energetic', 'Good with kids', 'Social'],
      reasonForAdoption: 'International relocation - cannot take pets.',
      specialRequirements: 'Active family preferred, access to yard or regular exercise.',
      healthInfo: {
        vaccinated: true,
        microchipped: true,
        spayedNeutered: true,
        healthIssues: 'None known'
      },
      adoptionFee: 200,
      caregiver: {
        id: 1,
        name: 'Sarah Johnson',
        status: 'Verified Dog Lover',
        rating: 4.9,
        reviews: 98,
        description: 'Loving pet owner who values human-pet connections. I\'m looking for a loving home for Max.'
      }
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Cat',
      breed: 'Persian',
      age: '2 years',
      location: 'Los Angeles, CA',
      status: 'Available',
      adoptionType: 'Temporary',
      image: '/img/cat1.jpg',
      about: 'Gentle and affectionate Persian cat, prefers quiet and calm environments. Perfect for seniors or families with older children. Luna enjoys being petted and lounging in sunny spots.',
      temperament: ['Calm', 'Affectionate', 'Quiet', 'Gentle'],
      reasonForAdoption: 'Temporary care needed due to family emergency.',
      specialRequirements: 'Quiet home environment preferred.',
      healthInfo: {
        vaccinated: true,
        microchipped: true,
        spayedNeutered: true,
        healthIssues: 'None known'
      },
      adoptionFee: 150,
      caregiver: {
        id: 1,
        name: 'Sarah Johnson',
        status: 'Verified Cat Lover',
        rating: 4.9,
        reviews: 98,
        description: 'Experienced cat owner looking for temporary care for Luna.'
      }
    },
    {
      id: 3,
      name: 'Snowball',
      type: 'Rabbit',
      breed: 'Holland Lop',
      age: '1 year',
      location: 'Seattle, WA',
      status: 'Available',
      adoptionType: 'Permanent',
      image: '/img/dog2.webp',
      about: 'Snowball is a sweet rabbit who loves fresh vegetables and gentle handling. Great pet for families with children who understand how to handle small animals carefully.',
      temperament: ['Gentle', 'Playful', 'Curious', 'Friendly'],
      reasonForAdoption: 'Moving to a place that doesn\'t allow pets.',
      specialRequirements: 'Regular fresh vegetables, spacious cage, daily exercise time.',
      healthInfo: {
        vaccinated: false,
        microchipped: false,
        spayedNeutered: true,
        healthIssues: 'None known'
      },
      adoptionFee: 75,
      caregiver: {
        id: 2,
        name: 'Mike Chen',
        status: 'Verified Pet Lover',
        rating: 4.7,
        reviews: 45,
        description: 'Responsible pet owner looking for a good home for Snowball.'
      }
    },
    {
      id: 4,
      name: 'Buddy',
      type: 'Dog',
      breed: 'Australian Shepherd',
      age: '2 years',
      location: 'Portland, OR',
      status: 'Available',
      adoptionType: 'Permanent',
      image: '/img/dog2.webp',
      about: 'Intelligent and active dog who loves outdoor activities and mental stimulation. Buddy is highly trainable and would excel in agility or obedience training. Great for active individuals or families.',
      temperament: ['Intelligent', 'Active', 'Trainable', 'Loyal'],
      reasonForAdoption: 'Owner can no longer provide adequate exercise due to health issues.',
      specialRequirements: 'Active lifestyle, regular exercise and mental stimulation required.',
      healthInfo: {
        vaccinated: true,
        microchipped: true,
        spayedNeutered: true,
        healthIssues: 'None known'
      },
      adoptionFee: 250,
      caregiver: {
        id: 3,
        name: 'David Martinez',
        status: 'Verified Dog Lover',
        rating: 5.0,
        reviews: 127,
        description: 'Passionate about finding the right home for every dog.'
      }
    },
    {
      id: 5,
      name: 'Whiskers',
      type: 'Cat',
      breed: 'Tabby',
      age: '4 years',
      location: 'San Diego, CA',
      status: 'Adopted',
      adoptionType: 'Permanent',
      image: '/img/cat2.jpg',
      about: 'Lovable tabby cat with playful personality. Whiskers enjoys interactive toys and cuddling with humans.',
      temperament: ['Playful', 'Affectionate', 'Curious', 'Independent'],
      reasonForAdoption: 'Owner moving abroad.',
      specialRequirements: 'Interactive toys, regular playtime.',
      healthInfo: {
        vaccinated: true,
        microchipped: true,
        spayedNeutered: true,
        healthIssues: 'None known'
      },
      adoptionFee: 120,
      caregiver: {
        id: 3,
        name: 'David Martinez',
        status: 'Verified Cat Lover',
        rating: 5.0,
        reviews: 127,
        description: 'Caring owner looking for loving homes for pets.'
      }
    }
  ];
  return pets;
};



export default function PetProfilePage({ params }) {
  const pets = getPetData();
  const petId = parseInt(params.id);
  const pet = pets.find(p => p.id === petId);

  if (!pet) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h1>Pet not found</h1>
          <Link href="/adopter">Back to adoption</Link>
        </div>
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
      <nav className="nav">
                <div className="nav-container ">
                    {/* Logo */}
                    <div className="logo">
                        <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
                    </div>

                    {/* Navigation Menu */}
                    <ul className="nav-menu ">
                        <li><Link href="/" className="nav-link active ">Home</Link></li>
                        <li><Link href="/about" className="nav-link active">About</Link></li>
                        <li><Link href="/service" className="nav-link active">Service</Link></li>
                        <li><Link href="/contact" className="nav-link">Contact</Link></li>
                        <li><Link href="/gallery" className="nav-link">Gallery</Link></li>
                        <li><Link href="/shop" className="nav-link">Shop</Link></li>
                        <li><Link href="/adopter" className="nav-link">Adoption</Link></li>
                    </ul>

                    {/* Login Button */}
                    <div>
                        <Link href="/login">
                            <button className="login-button">Log In</button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="mobile-menu-button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>
      
      <div style={{ padding: '20px' }}>
        <Link 
          href="/adopter" 
          style={{ 
            color: '#666', 
            textDecoration: 'none', 
            fontSize: '14px',
            display: 'inline-block',
            marginBottom: '20px'
          }}
        >
          ← Back to adoption
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
              {pet.status === 'Available' && (
                <div style={{ 
                  position: 'absolute', 
                  top: '15px', 
                  left: '15px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Available
                </div>
              )}
              {pet.adoptionType === 'Permanent' && (
                <div style={{ 
                  position: 'absolute', 
                  top: '15px', 
                  right: '15px',
                  backgroundColor: '#ff8500',
                  color: 'white',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Permanent
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
                {pet.about}
              </p>
            </div>

            {/* Temperament Section */}
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
                {pet.temperament.map((trait, index) => (
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
                {pet.reasonForAdoption}
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
                {pet.specialRequirements}
              </p>
            </div>

            {/* Health Information */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                color: '#333', 
                margin: '0 0 15px 0',
                fontWeight: '600'
              }}>
                Health Information
              </h2>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {pet.healthInfo.vaccinated ? (
                    <span style={{ fontSize: '18px', color: '#4caf50' }}>✓</span>
                  ) : (
                    <span style={{ fontSize: '18px', color: '#ccc' }}>✗</span>
                  )}
                  <span style={{ color: '#666', fontSize: '16px' }}>Vaccinated</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {pet.healthInfo.microchipped ? (
                    <span style={{ fontSize: '18px', color: '#4caf50' }}>✓</span>
                  ) : (
                    <span style={{ fontSize: '18px', color: '#ccc' }}>✗</span>
                  )}
                  <span style={{ color: '#666', fontSize: '16px' }}>Microchipped</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {pet.healthInfo.spayedNeutered ? (
                    <span style={{ fontSize: '18px', color: '#4caf50' }}>✓</span>
                  ) : (
                    <span style={{ fontSize: '18px', color: '#ccc' }}>✗</span>
                  )}
                  <span style={{ color: '#666', fontSize: '16px' }}>Spayed/Neutered</span>
                </div>
              </div>
              <div>
                <p style={{ 
                  color: '#666', 
                  fontSize: '16px', 
                  margin: '10px 0 0 0',
                  fontWeight: '500'
                }}>
                  Health Issues:
                </p>
                <p style={{ 
                  color: '#555', 
                  fontSize: '16px', 
                  margin: '5px 0 0 0'
                }}>
                  {pet.healthInfo.healthIssues}
                </p>
              </div>
            </div>
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
                  ${pet.adoptionFee}
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
                <Link href="/chat" style={{ width: '100%', textDecoration: 'none' }}>
                  <button
                    style={{
                      width: '100%',
                      backgroundColor: '#ff8500',
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
                    Adopt {pet.name}
                  </button>
                </Link>
                <Link href="/chat" style={{ width: '100%', textDecoration: 'none' }}>
                  <button
                    style={{
                      width: '100%',
                      backgroundColor: '#fff',
                      color: '#333',
                      padding: '14px 20px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
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
                    <span>✓</span>
                    Contact caregiver
                  </button>
                </Link>
              </div>

              {/* Caregiver Section */}
              <div style={{ 
                marginBottom: '30px',
                paddingBottom: '25px',
                borderBottom: '1px solid #eee'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  marginBottom: '15px'
                }}>
                  <h3 style={{ 
                    fontSize: '1.2rem', 
                    color: '#333', 
                    margin: 0,
                    fontWeight: '600'
                  }}>
                    Caregiver
                  </h3>
                  <span style={{ 
                    fontSize: '16px', 
                    color: '#4caf50' 
                  }}>✓</span>
                </div>
                <Link href={`/caregiver/${pet.caregiver.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '600', 
                    color: '#333',
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}>
                    {pet.caregiver.name}
                  </div>
                </Link>
                <div style={{ 
                  color: '#666', 
                  fontSize: '14px',
                  marginBottom: '12px'
                }}>
                  {pet.caregiver.status}
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  marginBottom: '12px'
                }}>
                  {renderStars(pet.caregiver.rating)}
                  <span style={{ 
                    color: '#666', 
                    fontSize: '14px' 
                  }}>
                    {pet.caregiver.rating} ({pet.caregiver.reviews} reviews)
                  </span>
                </div>
                <p style={{ 
                  color: '#666', 
                  fontSize: '14px', 
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {pet.caregiver.description}
                </p>
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
                    <span style={{ color: '#333', fontSize: '14px', fontWeight: '500' }}>{pet.adoptionType}</span>
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
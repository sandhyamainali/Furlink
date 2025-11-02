'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';



function AdoptPage() {
    const pets = [
        {
            id: 1,
            name: 'Max',
            type: 'Dog',
            breed: 'Golden Retriever',
            age: '3 years',
            location: 'Baneshwor, Kathmandu',
            status: 'Available',
            adoptionType: 'Permanent',
            description: 'Friendly and energetic golden retriever looking for an active family. Loves kids and other pets.',
            caregiverId: 1,
            image: '/img/dog1.jpeg'
        },
        {
            id: 2,
            name: 'Luna',
            type: 'Cat',
            breed: 'Persian',
            age: '2 years',
            location: 'Balkhu, Patan',
            status: 'Available',
            adoptionType: 'Temporary',
            description: 'Gentle and affectionate Persian cat, prefers quiet and calm environments. Perfect for...',
            caregiverId: 1,
            image: '/img/cat1.jpg'
        },
        {
            id: 3,
            name: 'Snowball',
            type: 'Rabbit',
            breed: 'Holland Lop',
            age: '1 year',
            location: 'Jorpati, Kathmandu',
            status: 'Available',
            adoptionType: 'Permanent',
            description: 'Snowball is a sweet rabbit who loves fresh vegetables and gentle handling. Great pet for families...',
            caregiverId: 2,
            image: '/img/dog2.webp'
        },
        {
            id: 4,
            name: 'Buddy',
            type: 'Dog',
            breed: 'Australian Shepherd',
            age: '2 years',
            location: 'Gaushala, Kathmandu',
            status: 'Available',
            adoptionType: 'Permanent',
            description: 'Intelligent and active dog who loves outdoor activities and mental stimulation.',
            caregiverId: 3,
            image: '/img/dog2.webp'
        },
        {
            id: 5,
            name: 'Whiskers',
            type: 'Cat',
            breed: 'Tabby',
            age: '4 years',
            location: 'Radhe Radhe, Bhaktapur',
            status: 'Adopted',
            adoptionType: 'Permanent',
            description: 'Lovable tabby cat with playful personality.',
            caregiverId: 3,
            image: '/img/cat2.jpg'
        }
    ];

    const [activeTab, setActiveTab] = React.useState('adopt');

    return (
        <div>

            <nav className="nav">
                <div className="nav-container ">
                    <div className="logo">
                        <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
                    </div>
                    <ul className="nav-menu ">
                        <li>
                            <Link href="/" className="nav-link active ">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="nav-link active">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/service" className="nav-link active">
                                Service
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="nav-link">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="/gallery" className="nav-link">
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop" className="nav-link">
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link href="/adopter" className="nav-link">
                                Adoption
                            </Link>
                        </li>
                    </ul>
                    <div className="nav-buttons" style={{ display: 'flex', gap: '9px', alignItems: 'center' }}>
          <button
            className="login-button"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#ae6a41',
              color: 'white',
            }}
          >
            Log In
          </button>
          <Link href="/adopter/submit">
            <button
              style={{
                backgroundColor: '#ae6a41',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Submit a pet
            </button>
          </Link>
        </div>

                    {/* <div>
                        <button className="login-button w-10">Log In</button>
                    </div> */}
                    {/* <div>
                        <Link href="/adopter/submit">
                            <button
                                style={{
                                    backgroundColor: '#ff8500',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                                type="button"
                            >
                                Submit a Pet
                            </button>
                        </Link>
                    </div> */}
                    {/* <button className="mobile-menu-button" aria-label="Toggle menu">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button> */}
                </div>
            </nav>
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
                                <Image
                                    src={pet.image}
                                    alt={pet.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    backgroundColor: pet.status === 'Available' ? '#a0d8ef' : '#ffb380',
                                    color: 'white',
                                    padding: '5px 12px',
                                    borderRadius: '15px',
                                    fontSize: '0.85rem',
                                    fontWeight: '500'
                                }}>
                                    {pet.status}
                                </div>
                                {pet.adoptionType === 'Temporary' && (
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
                                        Temporary
                                    </div>
                                )}
                            </div>
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.3rem' }}>{pet.name}</h3>
                                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.95rem' }}>
                                    {pet.breed} - {pet.type}
                                </p>
                                <p style={{ margin: '0 0 8px 0', color: '#888', fontSize: '0.9rem' }}>
                                    📍 {pet.location}
                                </p>
                                <p style={{ margin: '0 0 8px 0', color: '#888', fontSize: '0.9rem' }}>
                                    ⏰ {pet.age}
                                </p>
                                <p style={{ margin: '10px 0 15px 0', color: '#555', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                    {pet.description}
                                </p>
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
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default AdoptPage;
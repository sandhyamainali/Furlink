'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-container ">
        {/* Logo */}
        <div className="logo">
          <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
        </div>

        {/* Navigation Menu */}
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
              Shop <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg></span>
            </Link>
          </li>
          <li>
            <Link href="/adopter" className="nav-link">
              Adoption
            </Link>
          </li>
        </ul>

        {/* Login Button */}
        <div>
          <Link href="/login">
            <button className="login-button">
              Log In
            </button>
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
  );
}

export default function SubmitPetPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    location: '',
    description: '',
    adoptionType: '',
  });

  const [photos, setPhotos] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photos.length > 5) {
      alert('Maximum 5 photos allowed');
      return;
    }
    const newPhotos = files.filter(file => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length + photos.length > 5) {
      alert('Maximum 5 photos allowed');
      return;
    }
    const newPhotos = files.filter(file => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.species || !formData.age || !formData.gender ||
      !formData.location || !formData.description || !formData.adoptionType) {
      alert('Please fill in all required fields');
      return;
    }

    if (photos.length === 0) {
      alert('Please upload at least one photo');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Form Data:', formData);
    console.log('Photos:', photos);

    // Redirect to success page or adoption page
    router.push('/adopter');
  };

  return (
    <div style={{ backgroundColor: '#fef9f4', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            <Link href="/adopter">
              <button
                style={{
                  padding: '12px 24px',
                  borderRadius: '25px',
                  border: 'none',
                  backgroundColor: '#e0e0e0',
                  color: '#333',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                type="button"
              >
                🐾 Adopt a Pet
              </button>
            </Link>
            <button
              style={{
                padding: '12px 24px',
                borderRadius: '25px',
                border: 'none',
                backgroundColor: '#ff8500',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              type="button"
            >
              ➕ Give a Pet for Adoption
            </button>
          </div>

          {/* Form Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h1 style={{
              fontSize: '2rem',
              color: '#333',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>
              List Your Pet for Adoption
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#666',
              marginBottom: '30px'
            }}>
              Help your pet find a loving new home. Fill out the details below to create their profile.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Basic Pet Information */}
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{
                  fontSize: '1.3rem',
                  color: '#333',
                  marginBottom: '20px',
                  fontWeight: '600'
                }}>
                  Basic Pet Information
                </h2>

                {/* Pet Name */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Pet Name <span style={{ color: '#ff0000' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter pet's name"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Species */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Species <span style={{ color: '#ff0000' }}>*</span>
                  </label>
                  <select
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">Select species</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Bird">Bird</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Breed */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Breed <span style={{ color: '#999', fontSize: '12px' }}>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    placeholder="Enter breed if known"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Age */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Age <span style={{ color: '#ff0000' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g., 2 years, 6 months"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Gender */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Gender <span style={{ color: '#ff0000' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleInputChange}
                        required
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '16px', color: '#333' }}>Male</span>
                    </label>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleInputChange}
                        required
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '16px', color: '#333' }}>Female</span>
                    </label>
                  </div>
                </div>

                {/* Location */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Location <span style={{ color: '#ff0000' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{
                  fontSize: '1.3rem',
                  color: '#333',
                  marginBottom: '20px',
                  fontWeight: '600'
                }}>
                  Description
                </h2>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Description <span style={{ color: '#ff0000' }}>*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your pet's temperament, health, vaccination status, and reason for adoption."
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Duration of Adoption */}
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{
                  fontSize: '1.3rem',
                  color: '#333',
                  marginBottom: '20px',
                  fontWeight: '600'
                }}>
                  Duration of Adoption <span style={{ color: '#ff0000' }}>*</span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    cursor: 'pointer',
                    padding: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: formData.adoptionType === 'Permanent' ? '#f9f9f9' : 'white'
                  }}>
                    <input
                      type="radio"
                      name="adoptionType"
                      value="Permanent"
                      checked={formData.adoptionType === 'Permanent'}
                      onChange={handleInputChange}
                      required
                      style={{ marginTop: '4px', cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#333', marginBottom: '4px' }}>
                        Permanent Adoption
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        looking for a forever home for my pet.
                      </div>
                    </div>
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    cursor: 'pointer',
                    padding: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: formData.adoptionType === 'Temporary' ? '#f9f9f9' : 'white'
                  }}>
                    <input
                      type="radio"
                      name="adoptionType"
                      value="Temporary"
                      checked={formData.adoptionType === 'Temporary'}
                      onChange={handleInputChange}
                      required
                      style={{ marginTop: '4px', cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#333', marginBottom: '4px' }}>
                        Temporary Fostering
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        need temporary care (vacation, relocation, etc.).
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Photos */}
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{
                  fontSize: '1.3rem',
                  color: '#333',
                  marginBottom: '20px',
                  fontWeight: '600'
                }}>
                  Photos <span style={{ color: '#ff0000' }}>*</span> <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#666' }}>(At least 1 required, max 5)</span>
                </h2>

                {/* Photo Upload Area */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  style={{
                    border: `2px dashed ${dragActive ? '#ff8500' : '#ddd'}`,
                    borderRadius: '8px',
                    padding: '40px',
                    textAlign: 'center',
                    backgroundColor: dragActive ? '#fff7f0' : '#fafafa',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onClick={() => document.getElementById('photo-upload').click()}
                >
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>📤</div>
                  <div style={{
                    fontSize: '16px',
                    color: '#666',
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Drag and drop photos here or click to browse
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#999'
                  }}>
                    Supported formats: JPG, PNG, WEBP (max 5MB each)
                  </div>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>

                {/* Preview Uploaded Photos */}
                {photos.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: '15px',
                    marginTop: '20px'
                  }}>
                    {photos.map((photo, index) => (
                      <div key={index} style={{ position: 'relative' }}>
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            border: '1px solid #ddd'
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePhoto(index);
                          }}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            backgroundColor: '#ff0000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#ff8500',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '15px'
                }}
              >
                List Pet for Adoption
              </button>

              {/* Footer Message */}
              <p style={{
                fontSize: '14px',
                color: '#666',
                textAlign: 'center',
                margin: 0
              }}>
                Your listing will be reviewed and published within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
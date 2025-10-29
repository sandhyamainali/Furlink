"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


const PetFoodWebsite = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    return (
        <div className="container">
            {/* Navigation Header */}
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
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link href="/adoption" className="nav-link">
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
            {/* Navbar end */}

            {/* Header section start */}
            <section className="header-section">
                {/* Background Pattern */}
                <div className="background-pattern">
                    <div className="bg-circle-1"></div>
                    <div className="bg-circle-2"></div>
                    <div className="bg-circle-3"></div>
                </div>

                <div className="header-container">
                    {/* Content Section */}
                    <div className="header-content">
                        <h1 className="header-title">
                            <span className="header-title-orange">"A Cloud Pet Hostel & Adoption Platform You Can Trust</span>
                            <br />
                            <span>- Healthy Food for Happy Pets!"</span>
                        </h1>

                        <p className="header-description">
                            Premium nutrition for your beloved companions. Our carefully crafted recipes ensure your pets get the wholesome, delicious meals they deserve for a healthy and happy life.
                        </p>

                        <div className="button-container">
                            <button className="primary-button text-sm">
                                Adopt a Pet
                            </button>
                            <button className="secondary-button">
                                Want a Pet for Adoption
                            </button>
                        </div>
                    </div>

                    {/* Pet Images Section */}
                    <div className="pet-images-section">
                        {/* German Shepherd */}
                        <div className="dog-image-container">
                            <div className="dog-image-card">
                                <div className="dog-image-placeholder">
                                    <div>
                                        <Image src="/img/pet.png" alt="pet image" width={700} height={400} />
                                    </div>

                                </div>
                            </div>
                        </div>




                        {/* Decorative Elements */}
                        <div className="decorative-circle-1"></div>
                        <div className="decorative-circle-2"></div>

                        {/* Paw prints */}
                        <div className="paw-print-1">🐾</div>

                    </div>
                </div>
            </section>

            {/* header section end */}

            {/* mission start */}
            <section className="ourMission">
                <h2 className='text-3xl md:text-4xl font-extrabold  mb-6'>Our Mission</h2>
                <p className="text-lg text-[#5C3B15] max-w-3xl mx-auto  ">
                    We believe every pet deserves love and care. Furlink provides an
                    affordable, ethical, and community-driven platform that connects pets
                    with loving families while supporting caregivers who provide temporary
                    or permanent homes.
                </p>
                <div className="featureGrid py-5">
                    <article className="card">
                        <div className="card-icon"><i className="ri-restaurant-line"></i></div>
                        <h3 className="card-title">Healthy Nutrition</h3>
                        <p className="card-text">High-quality, balanced meals that keep pets active and joyful.</p>
                    </article>

                    <article className="card">
                        <div className="card-icon"><i className="ri-home-heart-line"></i></div>
                        <h3 className="card-title">Safe Shelter</h3>
                        <p className="card-text">Cloud-hostel service for comfortable, secure stays while owners are away.</p>
                    </article>

                    <article className="card">
                        <div className="card-icon"><i className="ri-hand-heart-line"></i></div>
                        <h3 className="card-title">Adoption Support</h3>
                        <p className="card-text">We connect caring owners with pets to create lifelong bonds.</p>
                    </article>


                </div>
            </section>
            {/* mission section end */}
            








        </div>
    );
};

export default PetFoodWebsite;
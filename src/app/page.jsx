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
                            <span className="header-title-orange">"Because They Deserve the Best</span>
                            <br />
                            <span>- Healthy Food for Happy Pets!"</span>
                        </h1>

                        <p className="header-description">
                            Premium nutrition for your beloved companions. Our carefully crafted recipes ensure your pets get the wholesome, delicious meals they deserve for a healthy and happy life.
                        </p>

                        <div className="button-container">
                            <button className="primary-button">
                                Shop Now
                            </button>
                            <button className="secondary-button">
                                Join with US
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

           


   



        </div>
    );
};

export default PetFoodWebsite;
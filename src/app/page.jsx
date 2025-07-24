"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../img/logo.png';
const PetFoodWebsite = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="container">
            {/* Navigation Header */}
            <nav className="nav">
                <div className="nav-container ">
                    {/* Logo */}
                    <div className="logo">
                        <Image src={logo} alt="Furlink Logo" width={90} height={90} />
                    </div>

                    {/* Navigation Menu */}
                    <ul className="nav-menu">
                        <li>
                            <Link href="/" className="nav-link active">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="nav-link">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/service" className="nav-link">
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
                        <button className="login-button">
                            Log In
                        </button>
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
                                        <Image src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/03/happy_dog_being_held_by_woman.jpeg.jpg"alt="pet image" width={700} height={400}/>
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

{/* Service section start */}
{/* <section>
    <div className="service">
        <h1 className='font-bold pt-8  '>Our Service</h1>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
    {[1, 2, 3, 4].map((_, idx) => (
      <div key={idx} className="flex flex-col items-center">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROK8sjpdGkJ7NGWZumbCxdMRc8r9qyG7XwuA&s"
          alt={`Service ${idx + 1}`}
          width={300}
          height={200}
          className="rounded-lg object-cover"
          priority={false}
        />
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Learn More
        </button>
      </div>
    ))}
  </div>
</section> */}

            

        </div>
    );
};

export default PetFoodWebsite;
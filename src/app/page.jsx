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

            {/* Service section start */}
            {/* <section>
                <div className="service">
                    <h1 className='font-bold pt-8  '>Our Service</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl  ser">
                    {[1, 2, 3, 4].map((_, idx) => (
                        <div key={idx} className=" ">
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROK8sjpdGkJ7NGWZumbCxdMRc8r9qyG7XwuA&s"
                                alt={`Service ${idx + 1}`}
                                width={300}
                                height={200}
                                className="rounded-lg object-cover transition"
                                priority={false}
                            />
                            <button className="px-6 py-4 font-bold rounded-lg  transition">
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </section> */}

            


    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      {/* Header with fade-in animation */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 animate-fade-in-up">
          Our Service
        </h1>
      </div>

      {/* Service Grid with staggered animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto ser">
        {[1, 2, 3, 4].map((_, idx) => (
          <div 
            key={idx} 
            className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            {/* Image Container with overlay */}
            <div className="relative overflow-hidden rounded-t-xl">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROK8sjpdGkJ7NGWZumbCxdMRc8r9qyG7XwuA&s"
                alt={`Service ${idx + 1}`}
                width={300}
                height={200}
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                priority={false}
              />
              
              {/* Overlay that appears on hover */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
            </div>

            {/* Button Container */}
            <div className="p-6">
              <button className="w-full  text-white font-bold py-3 rounded-lg px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ">
                <span className="relative z-10">Learn More</span>
              </button>
            </div>

            {/* Animated border effect */}
            {/* <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-orange-400 transition-colors duration-300"></div> */}
          </div>
        ))}
      </div>

      <style jsx>{`
        
      `}</style>
    </section>




        </div>
    );
};

export default PetFoodWebsite;
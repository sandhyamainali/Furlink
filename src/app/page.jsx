"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// We use OUTLINE icons for all steps (1, 2, 3, 4) as seen in the new image
import { UsersIcon as UsersOutline, HeartIcon as HeartOutline, StarIcon as StarOutline, ArrowRightIcon, CheckCircleIcon as CheckCircleOutline } from '@heroicons/react/24/outline';
import { Star } from 'lucide-react';


const PetFoodWebsite = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    const howItWorksSteps = [
        {
            number: 1,
            title: 'Sign Up',
            description: 'Create your free account and complete your profile.',
            icon: UsersOutline,
            iconColor: 'text-blue-400',
        },
        {
            number: 2,
            title: 'Browse or Post',
            description: 'Search for pets to adopt or post your pet for adoption.',
            icon: HeartOutline,
            iconColor: 'text-blue-400',
        },
        {
            number: 3,
            title: 'Connect',
            description: 'Contact caregivers and arrange meetings with potential pets.',
            icon: StarOutline,
            iconColor: 'text-blue-400',
        },
        {
            number: 4,
            title: 'Adopt',
            description: 'Complete the adoption process and welcome your new family member.',
            icon: CheckCircleOutline,
            iconColor: 'text-blue-400',
        },
    ];
    const testimonials = [
        {
            name: "Sarita",
            pet: "Adopted Max the Golden Retriever",
            feedback:
                "Furlink helped me find Max, the perfect golden retriever for our family. The process was smooth and the caregivers were amazing!",
        },
        {
            name: "Mira",
            pet: "Adopted Luna the Persian Cat",
            feedback:
                "When I had to relocate, Furlink helped me find a loving temporary home for Luna. She's thriving and I get regular updates!",
        },
        {
            name: "Pari",
            pet: "Adopted Buddy the Border Collie",
            feedback:
                "The platform made it so easy to connect with local pet families. We adopted Buddy and couldn’t be happier!",
        },
    ];



    return (
        <div className="container-fluid">
            
            {/* Navigation Header */}
            
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
                            <Link href="/profile">
                                <button className="primary-button text-sm">Adopt a Pet</button>
                            </Link>
                            <Link href="/adopter">
                                <button className="secondary-button">Rehome a Pet</button>
                            </Link>
                        </div>
                    </div>

                    {/* Pet Images Section */}
                    <div className="pet-images-section">
                        <div className="dog-image">
                            <div className="dog-image-card">
                                <div className="dog-image-placeholder">
                                    <div>
                                        <Image src="/img/pet.png" alt="pet image" width={700} height={400} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        {/* <div className="decorative-circle-1"></div>
                        <div className="decorative-circle-2"></div>
                        <div className="paw-print-1">🐾</div> */}
                    </div>
                </div>
            </section>

            {/* header section end */}

            {/* mission start */}
            <section className="ourMission">
                <h2 className='text-3xl md:text-4xl font-extrabold  mb-6'>Our Mission</h2>
                <p className="text-lg text-[#5C3B15] max-w-3xl mx-auto  ">
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


            {/* Furlink Works start  */}

            <section className="furlink-section">
                <div className="furlink-container">
                    <h2 className="furlink-title">How Furlink Works</h2>
                    <p className="furlink-description">
                        Getting started is simple. Follow these four easy steps to find your perfect pet companion.
                    </p>

                    <div className="furlink-grid">
                        {howItWorksSteps.map((step) => (
                            <div key={step.number} className="furlink-card">
                                <div className="furlink-number">{step.number}</div>
                                <div className="furlink-icon">
                                    <step.icon className="icon" />
                                </div>
                                <h3 className="furlink-step-title">{step.title}</h3>
                                <p className="furlink-step-text">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Furlink Works end */}

            {/* review section start */}

            <section className="happy-families" >
                <div className="container ">
                    <h2 className="title">Happy Families</h2>
                    <p className="subtitle">
                        Read stories from families who found their perfect companions
                        through Furlink.
                    </p>

                    <div className="reviews">
                        {testimonials.map((t, i) => (
                            <div key={i} className="review-card">
                                <div className="stars">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star key={idx} size={20} fill="#F97316" stroke="none" />
                                    ))}
                                </div>

                                <p className="feedback">“{t.feedback}”</p>
                                <hr className="divider" />
                                <div>
                                    <h4 className="name">{t.name}</h4>
                                    <p className="pet">{t.pet}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* review section end */}
        </div>
    );
};

export default PetFoodWebsite;
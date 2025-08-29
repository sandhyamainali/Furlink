'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


// Other helper functions remain the same
const getServiceCard = (icon, title, desc) => (
  <div className="serviceCard" role="region" aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}>
    <Image src={icon} alt={`${title} icon`} width={60} height={60} />
    <h3 id={`${title.replace(/\s+/g, '-').toLowerCase()}-title`} style={{ marginTop: '15px', fontSize: '1.3rem', color: '#222' }}>
      {title}
    </h3>
    <p style={{ fontSize: '1rem', color: '#666', marginTop: '10px' }}>{desc}</p>
  </div>
);

const getTestimonialCard = (image, name, feedback) => (
  <div className="testimonialCard" role="region" aria-label={`Testimonial from ${name}`}>
    <Image
      src={image}
      alt={`Photo of ${name}`}
      width={80}
      height={80}
      style={{ borderRadius: '50%' }}
    />
    <h4 style={{ marginTop: '15px', fontSize: '1.2rem' }}>{name}</h4>
    <p style={{ fontSize: '1rem', marginTop: '10px', color: '#555' }}>{feedback}</p>
  </div>
);

function ServicePage() {
  const benefits = [
    { icon: '/img/professional.jpg', text: 'Certified professionals with years of experience' },
    { icon: '/img/pricing.jpg', text: 'Affordable and transparent pricing' },
    { icon: '/img/hygiene.jpg', text: 'Hygienic and well-equipped facility' },
    { icon: '/img/peace.jpg', text: 'Stress-free environment for pets' },
    { icon: '/img/booking.png', text: 'Easy online booking' },
  ];

  const testimonials = [
    {
      name: 'Sarah & Milo',
      feedback: 'Furlink’s temporary hosting service helped me while I was away. Milo was well cared for and happy!',
      image: '/img/testimonial1.jpg',
    },
    {
      name: 'Ravi & Bella',
      feedback: 'The caregivers at Furlink feel like family. Bella loves her foster home — so grateful for this community!',
      image: '/img/testimonial2.jpg',
    },
    {
      name: 'Anita & Max',
      feedback: 'The fostering program made a huge difference for Max during recovery. Excellent support and care.',
      image: '/img/testimonial3.jpg',
    },
  ];
  
  return (
    <div>
      {/* Navbar */}
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

      {/* Hero Section */}
      <section className="petcare" aria-labelledby="petcare">
        <h1 id="petcare" style={{ fontSize: '2.5rem' }}>
          Our Pet Care Services
        </h1>
        <p style={{ maxWidth: '800px', margin: '20px auto', fontSize: '1.1rem' }}>
          Furlink connects pet owners to trusted caregivers for short-term hosting, fostering, training,
          grooming, and veterinary consultations — all tailored for your pet’s wellbeing.
        </p>
        <Image
          src="/img/service-hero.jpg"
          alt="Pets receiving care and attention"
          width={2000}
          height={400}
          style={{ marginTop: '30px', borderRadius: '10px' }}
          priority
        />
      </section>

      {/* Services List */}
      <section className="servicesList" aria-labelledby="services-list-title">
        <h2 id="services-list-title" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px' }}>
          What We Offer
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          {getServiceCard('/img/grooming.jpg', 'Pet Grooming', 'Professional grooming services to keep your pet looking and feeling great.')}
          {getServiceCard('/img/consultation.jpg', 'Vet Consultation', 'Connect with licensed vets for expert health advice and checkups.')}
          {getServiceCard('/img/training.jpg', 'Pet Training', 'Customized training programs to improve behavior and skills.')}
          {getServiceCard('/img/daycare.jpg', 'Pet Daycare & Hosting', 'Safe, loving temporary homes while you’re away or in need.')}
          {getServiceCard('/img/food.jpg', 'Custom Nutrition', 'Tailored food plans based on your pet’s unique needs.')}
        </div>
      </section>

      {/* Benefits */}
      <section className="benefitsSection" aria-labelledby="benefits-title">
        <h2 id="benefits-title" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px' }}>
          Why Pet Owners Love Us
        </h2>
        <div className="benefitsList">
          {benefits.map(({ icon, text }, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Image src={icon} alt={`Benefit: ${text}`} width={35} height={35} />
              <p style={{ fontSize: '1.1rem', margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ backgroundColor: '#fef9f5', padding: '60px 20px' }} aria-labelledby="testimonials-title">
        <h2 id="testimonials-title" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px' }}>
          What Our Clients Say
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap',
          }}
        >
          {testimonials.map(({ name, feedback, image }, idx) => (
            getTestimonialCard(image, name, feedback)
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="ctaSection" aria-labelledby="cta-title">
        <h2 id="cta-title" style={{ fontSize: '2rem' }}>
          Ready to provide loving temporary care?
        </h2>
        <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
          Join Furlink or book a service today and make a difference in a pet's life.
        </p>
        <Link href="/contact" className="ctaButton">
          Get in Touch
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer" aria-label="Site Footer">
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold' }}>Stay Connected</p>
          <div style={{ marginBottom: '10px' }}>
            <a href="#" aria-label="Facebook">
              Facebook
            </a>{' '}
            |{' '}
            <a href="#" aria-label="Instagram">
              Instagram
            </a>{' '}
            |{' '}
            <a href="#" aria-label="Twitter">
              Twitter
            </a>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing!');
            }}
            aria-label="Subscribe to newsletter"
            className="footerForm"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              required
              className="footerInput"
            />
            <button type="submit" className="footerButton">
              Subscribe
            </button>
          </form>
          <p style={{ marginTop: '20px' }}>© 2025 Furlink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ServicePage;
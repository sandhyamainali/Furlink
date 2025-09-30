'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper modules (v10+)
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Service card
const getServiceCard = (icon, title, desc) => (
  <div
    className="serviceCard p-5 bg-white rounded-lg shadow-md flex flex-col items-center text-center"
    role="region"
    aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}
  >
    <Image src={icon} alt={`${title} icon`} width={60} height={60} />
    <h3
      id={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}
      className="mt-4 text-lg font-semibold text-gray-900"
    >
      {title}
    </h3>
    <p className="mt-2 text-gray-600 text-base">{desc}</p>
  </div>
);

// Testimonial card
// const getTestimonialCard = (image, name, feedback) => (
//   <div
//     className="testimonialCard p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center max-w-xs mx-auto"
//     role="region"
//     aria-label={`Testimonial from ${name}`}
//   >
//     <Image src={image} alt={`Photo of ${name}`} width={80} height={80} className="rounded-full object-cover"/>
//     <h4 className="mt-4 text-xl font-semibold">{name}</h4>
//     <p className="mt-3 text-gray-700 text-base">{feedback}</p>
//   </div>
// );

function ServicePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const benefits = [
  //   { icon: '/img/professional.jpg', text: 'Certified professionals with years of experience' },
  //   { icon: '/img/pricing.jpg', text: 'Affordable and transparent pricing' },
  //   { icon: '/img/hygiene.jpg', text: 'Hygienic and well-equipped facility' },
  //   { icon: '/img/peace.jpg', text: 'Stress-free environment for pets' },
  //   { icon: '/img/booking.png', text: 'Easy online booking' },
  // ];



  const services = [
    {
      icon: '/img/grooming.jpg',
      title: 'Pet Grooming',
      desc: 'Professional grooming services to keep your pet looking and feeling great.',
    },
    {
      icon: '/img/consultation.jpg',
      title: 'Vet Consultation',
      desc: 'Connect with licensed vets for expert health advice and checkups.',
    },
    {
      icon: '/img/training.jpg',
      title: 'Pet Training',
      desc: 'Customized training programs to improve behavior and skills.',
    },
    {
      icon: '/img/daycare.jpg',
      title: 'Pet Daycare & Hosting',
      desc: 'Safe, loving temporary homes while you’re away or in need.',
    },
    {
      icon: '/img/food.jpg',
      title: 'Custom Nutrition',
      desc: 'Tailored food plans based on your pet’s unique needs.',
    },
  ];

  // New section data replacing the original "Why Pet Owners Love Us"
  const loveOurAnimalsServices = [
    {
      emoji: '🛁',
      title: 'Grooming & Trimming',
      desc: 'Keep your pets clean and stylish with expert grooming services.',
    },
    {
      emoji: '🤴',
      title: 'Bath & Spa',
      desc: 'Relaxing spa treatments to pamper your furry companions.',
    },
    {
      emoji: '🏠',
      title: 'Pet Hotel',
      desc: 'Comfortable short-term hosting for pets while you’re away.',
    },
    {
      emoji: '🤝',
      title: 'Temporary Adoption',
      desc: 'Foster pets in need of care until they find their forever homes.',
    },
    {
      emoji: '🐾',
      title: 'Fun Activities',
      desc: 'Play sessions and socialization to keep pets happy and active.',
    },
    {
      emoji: '👩‍⚕️',
      title: 'Vet Consultation',
      desc: 'Partner clinics for health checkups, vaccinations, and emergencies.',
    },
    {
      emoji: '🎓',
      title: 'Pet Training',
      desc: 'Behavioral training and obedience lessons for all ages.',
    },
    {
      emoji: '😊',
      title: 'Daycare Services',
      desc: 'Safe daytime care with regular updates for busy pet parents.',
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="nav bg-white shadow sticky top-0 z-50">
        <div className="nav-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <div className="logo flex-shrink-0">
            <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
          </div>

          {/* Navigation Menu */}
          <ul className="nav-menu hidden md:flex space-x-8 font-medium text-gray-700">
            <li><Link href="/" className="nav-link hover:text-indigo-600">Home</Link></li>
            <li><Link href="/about" className="nav-link hover:text-indigo-600">About</Link></li>
            <li><Link href="/service" className="nav-link text-indigo-600 font-semibold">Service</Link></li>
            <li><Link href="/contact" className="nav-link hover:text-indigo-600">Contact</Link></li>
            <li><Link href="/gallery" className="nav-link hover:text-indigo-600">Gallery</Link></li>
            <li><Link href="/shop" className="nav-link hover:text-indigo-600">Shop</Link></li>
          </ul>

          {/* Login Button */}
          <div className="hidden md:block">
            <Link href="/login">
              <button className="login-button">
                Log In
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="mobile-menu-button p-2 rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
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
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <ul className="space-y-2 px-4 py-4 font-medium text-gray-700">
              {['Home', 'About', 'Service', 'Contact', 'Gallery', 'Shop'].map((item, idx) => (
                <li key={idx}>
                  <Link href={`/${item.toLowerCase()}`} className="block hover:text-indigo-600" onClick={() => setIsMobileMenuOpen(false)}>
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded mt-2 hover:bg-indigo-700 transition">
                  Log In
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* care Service*/}
      <section className="petcare max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Our Pet Care Services</h1>
        <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-700">
          Furlink connects pet owners to trusted caregivers for short-term hosting, fostering, training,
          grooming, and veterinary consultations — all tailored for your pet’s wellbeing.
        </p>
        <div className="mt-10 rounded-lg overflow-hidden shadow-lg">
          <Image src="/img/service-hero.jpg" alt="Pets receiving care and attention" width={2000} height={400}
            priority className="w-full object-cover" />
        </div>
      </section>

      {/* Services List with Slider */}
      <section className="servicesList max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">What We Offer</h2>
        <Swiper modules={[Navigation, Pagination, A11y]} spaceBetween={10} slidesPerView={1} navigation pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 },
          }}
        >
          {services.map(({ icon, title, desc }, idx) => (
            <SwiperSlide key={idx}>{getServiceCard(icon, title, desc)}</SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* "We Love Our Animals and What We Do!" Section */}
      <section className="loveOurAnimalsSection max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-bold text-blue-400 mb-2">We Love Our Animals and What We Do!</h2>
        <p className="text-center max-w-3xl mx-auto mb-10 text-gray-700 text-lg">
          Furlink is your trusted cloud-based pet hostel and adoption platform, offering safe, affordable, and loving care for your pets.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {loveOurAnimalsServices.map(({ emoji, title, desc }, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              role="region"
              aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}
            >
              <div className="text-5xl mb-4" aria-hidden="true">{emoji}</div>
              <h3
                id={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}
                className="font-bold text-lg mb-2 text-gray-900"
              >
                {title}
              </h3>
              <p className="text-gray-600 mb-4">{desc}</p>
              <button
                type="button"
                className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </section>




      {/* Call To Action */}
      <section className="ctaSection max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to provide loving temporary care?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Join Furlink or book a service today and make a difference in a pet's life.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Get in Touch
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer bg-white py-12">
        <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-bold text-gray-900 mb-3">Stay Connected</p>
          <div className="mb-4 space-x-4">
            <a href="#" aria-label="Facebook" className="text-indigo-600 hover:underline">Facebook</a> |{' '}
            <a href="#" aria-label="Instagram" className="text-indigo-600 hover:underline">Instagram</a> |{' '}
            <a href="#" aria-label="Twitter" className="text-indigo-600 hover:underline">Twitter</a>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing!');
            }}
            className="footerForm max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              required
              className="footerInput flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="footerButton bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-8 text-gray-500">© 2025 Furlink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ServicePage;
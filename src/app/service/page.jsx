'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Scissors, Stethoscope, GraduationCap, Home, Utensils, Sparkles, Heart, Star, CheckCircle } from 'lucide-react';

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
    <div className="text-blue-500 mb-4">
      {icon}
    </div>
    <h3
      id={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}
      className="mt-4 text-lg font-semibold text-gray-900"
    >
      {title}
    </h3>
    <p className="mt-2 text-gray-600 text-base">{desc}</p>
  </div>
);



function ServicePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const services = [
    {
      icon: <Scissors size={60} />,
      title: 'Pet Grooming',
      desc: 'Professional grooming services to keep your pet looking and feeling great.',
    },
    {
      icon: <Stethoscope size={60} />,
      title: 'Vet Consultation',
      desc: 'Connect with licensed vets for expert health advice and checkups.',
    },
    {
      icon: <GraduationCap size={60} />,
      title: 'Pet Training',
      desc: 'Customized training programs to improve behavior and skills.',
    },
    {
      icon: <Home size={60} />,
      title: 'Pet Daycare & Hosting',
      desc: 'Safe, loving temporary homes while you’re away or in need.',
    },
    {
      icon: <Utensils size={60} />,
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
      expandedContent: {
        overview: 'Our grooming services ensure your pet looks and feels their best with professional care.',
        keyFeatures: ['Breed-specific cuts', 'Nail trimming', 'Ear cleaning', 'Teeth brushing'],
        benefits: 'Healthy coat, reduced shedding, better hygiene, and a happier pet.'
      }
    },
    {
      emoji: '🤴',
      title: 'Bath & Spa',
      desc: 'Relaxing spa treatments to pamper your furry companions.',
      expandedContent: {
        overview: 'Indulge your pet in luxurious spa treatments designed for ultimate relaxation.',
        keyFeatures: ['Aromatic baths', 'Massage therapy', 'Pawdicure', 'Conditioning treatments'],
        benefits: 'Stress relief, improved skin health, shiny coat, and bonding time with your pet.'
      }
    },
    {
      emoji: '🏠',
      title: 'Pet Hotel',
      desc: 'Comfortable short-term hosting for pets while you’re away.',
      expandedContent: {
        overview: 'A home away from home for your pet with 24/7 supervision and care.',
        keyFeatures: ['Private suites', 'Daily exercise', 'Personalized feeding', 'Vet on-call'],
        benefits: 'Peace of mind for owners, social interaction for pets, and maintained routines.'
      }
    },
    {
      emoji: '🤝',
      title: 'Temporary Adoption',
      desc: 'Foster pets in need of care until they find their forever homes.',
      expandedContent: {
        overview: 'Provide temporary homes for pets awaiting adoption, making a real difference.',
        keyFeatures: ['Home assessments', 'Training support', 'Medical care coordination', 'Adoption counseling'],
        benefits: 'Helps reduce shelter overcrowding, teaches responsibility, and brings joy to your home.'
      }
    },
    {
      emoji: '🐾',
      title: 'Fun Activities',
      desc: 'Play sessions and socialization to keep pets happy and active.',
      expandedContent: {
        overview: 'Engage your pet in stimulating activities for physical and mental wellbeing.',
        keyFeatures: ['Group playtime', 'Agility courses', 'Puzzle toys', 'Training games'],
        benefits: 'Prevents boredom, improves behavior, strengthens bonds, and maintains health.'
      }
    },
    {
      emoji: '👩‍⚕️',
      title: 'Vet Consultation',
      desc: 'Partner clinics for health checkups, vaccinations, and emergencies.',
      expandedContent: {
        overview: 'Access professional veterinary care through our trusted network of clinics.',
        keyFeatures: ['Routine checkups', 'Vaccinations', 'Emergency care', 'Telemedicine options'],
        benefits: 'Early disease detection, preventive care, expert advice, and quick response times.'
      }
    },
    {
      emoji: '🎓',
      title: 'Pet Training',
      desc: 'Behavioral training and obedience lessons for all ages.',
      expandedContent: {
        overview: 'Professional training programs to enhance your pet\'s behavior and skills.',
        keyFeatures: ['Obedience training', 'Behavioral modification', 'Trick teaching', 'Socialization classes'],
        benefits: 'Better communication, safer interactions, reduced stress, and happier relationships.'
      }
    },
    {
      emoji: '😊',
      title: 'Daycare Services',
      desc: 'Safe daytime care with regular updates for busy pet parents.',
      expandedContent: {
        overview: 'Full-day care programs that keep your pet active and socialized.',
        keyFeatures: ['Supervised play', 'Individual attention', 'Photo updates', 'Flexible scheduling'],
        benefits: 'Mental stimulation, physical exercise, socialization opportunities, and owner convenience.'
      }
    },
  ];

  return (
    <div>
      {/* Navbar */}
      

      {/* care Service*/}
      <section className="petcare max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Our Pet Care Services</h1>
        <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-700">
          Furlink connects pet owners to trusted caregivers for short-term hosting, fostering, training,
          grooming, and veterinary consultations — all tailored for your pet’s wellbeing.
        </p>
        {/* <div className="mt-10 rounded-lg overflow-hidden shadow-lg">
          <Image src="/img/service-hero.jpg" alt="Pets receiving care and attention" width={2000} height={400}
            priority className="w-full object-cover" />
        </div> */}
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
          {loveOurAnimalsServices.map(({ emoji, title, desc, expandedContent }, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
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
                className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-full hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
              >
                <Sparkles size={16} />
                {expandedIndex === idx ? 'Read Less' : 'Read More'}
              </button>
              {expandedIndex === idx && (
                <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl w-full text-left animate-slide-down border border-blue-100 shadow-inner">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="text-red-400" size={20} />
                    <h4 className="font-bold text-lg text-gray-800">Overview</h4>
                  </div>
                  <p className="text-gray-700 mb-5 leading-relaxed">{expandedContent.overview}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <Star className="text-yellow-500" size={20} />
                    <h4 className="font-bold text-lg text-gray-800">Key Features</h4>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {expandedContent.keyFeatures.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-purple-500" size={20} />
                    <h4 className="font-bold text-lg text-gray-800">Benefits for Your Pet</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed bg-white/50 p-3 rounded-lg border-l-4 border-purple-300">{expandedContent.benefits}</p>
                </div>
              )}
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

     
    </div>
  );
}

export default ServicePage;
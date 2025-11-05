"use client"
import React, { useState } from "react";

import dynamic from "next/dynamic";


function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const ProfileControls = dynamic(() => import("../Component/ProfileControls"), { ssr: false });

  return (
    <div className=" container-fluid ">
    
     

      {/* Banner */}
      {/* Banner Section */}
      <section className="banner rounded">
        <div>
          <img
            src="https://brunswick.ces.ncsu.edu/wp-content/uploads/2022/05/pets-g6fa575878_1920.jpg"
            alt="About Banner"
            className="mx-auto"
          />
        </div>
        <div className="about">
          <h1>About Us</h1>
          <p>
            Welcome to our company! We are dedicated to providing the best services
            and solutions to help you achieve your goals. Our journey started with
            a vision to make things easier and better for everyone.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver top-notch solutions that bring real value to
          our customers. With creativity and innovation, we strive to solve
          problems and build trust with our community.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="whyChoose">
        <h2>Why Choose Us</h2>
        <div className="featureGrid">
          <div className="card">
            <h3>Expert Team</h3>
            <p>Our team consists of experienced professionals in the industry.</p>
          </div>

          <div className="card">
            <h3>Quality Services</h3>
            <p>We ensure high-quality services tailored to your needs.</p>
          </div>

          <div className="card">
            <h3>Customer Support</h3>
            <p>We are here to support you 24/7 whenever you need us.</p>
          </div>

          <div className="card">
            <h3>Affordable Pricing</h3>
            <p>Get the best value with competitive and transparent pricing.</p>
          </div>
        </div>
      </section>


    </div>
  );
}

export default AboutPage;
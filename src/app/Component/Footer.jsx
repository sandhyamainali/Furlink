"use client";
import React from "react";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div>
          <div className="footer-brand">
            
            <div className="logo">
                                    <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
                                </div>
            <h3 className="footer-title">Furlink</h3>
          </div>

          <p className="footer-desc">
            A cloud pet hostel & adoption platform connecting loving families
            with pets in need of care.
          </p>

          <div className="footer-social">
            <Facebook className="icon" />
            <Instagram className="icon" />
            <Linkedin className="icon" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/adoption">Pet Adoption</a></li>
            <li><a href="/">How It Works</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><a href="/adopter">Pet Adoption</a></li>
            <li><a href="/adopter">Pet Fostering</a></li>
            <li><a href="/adopter">Pet Care Support</a></li>
            <li><a href="#">Community Platform</a></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h4 className="footer-heading">Stay Connected</h4>
          <p className="footer-note">
            Get updates on new pets and adoption stories.
          </p>
          <form className="footer-form">
            <div className="footer-input-container ">
              {/* <Mail className="footer-mail-icon" /> */}
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-input"
              />
            </div>
            <button type="submit" className="footer-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Furlink — All Rights Reserved. Made with ❤️ for pets and their families.
      </div>
    </footer>
  );
};

export default Footer;

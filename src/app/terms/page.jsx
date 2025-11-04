"use client";
import { Link } from "lucide-react";
import React from "react";
import Image from 'next/image';


const TermsAndConditions = () => {
    return (
        <section className="terms-section">
           
            <div className="terms-container">
                <h1 className="terms-title">Terms and Conditions</h1>

                <p className="terms-paragraph">
                    Welcome to <span className="highlight">Furlink</span>! These Terms and Conditions outline the rules
                    and regulations for using our pet adoption platform. By accessing this website, you agree to be bound
                    by these terms. Do not continue to use Furlink if you do not agree to all the terms stated here.
                </p>

                <div className="terms-block">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By registering or using our services, you acknowledge that you have read and agreed to these Terms.
                        You must be at least 18 years old to create an account or adopt a pet through our platform.
                    </p>
                </div>

                <div className="terms-block">
                    <h2>2. Use of the Platform</h2>
                    <p>
                        Furlink is designed to connect pet adopters with shelters or pet owners. You agree to use this site
                        responsibly and lawfully. Misuse, including posting false information or offensive content, is strictly prohibited.
                    </p>
                </div>

                <div className="terms-block">
                    <h2>3. User Accounts</h2>
                    <p>
                        To access adoption features, you must register for an account. You are responsible for maintaining
                        the confidentiality of your login credentials and all activities under your account.
                    </p>
                </div>

                <div className="terms-block">
                    <h2>4. Pet Adoption Policy</h2>
                    <p>
                        Furlink facilitates pet adoption but does not directly own or manage pets listed.
                        Adoption decisions are handled by the respective shelters or owners.
                        Furlink is not responsible for disputes, pet health, or post-adoption arrangements.
                    </p>
                </div>

                <div className="terms-block">
                    <h2>5. Intellectual Property</h2>
                    <p>
                        All text, images, code, and graphics on Furlink are the property of Furlink and protected under copyright law.
                        You may not copy, modify, or reuse any content without written permission.
                    </p>
                </div>

                <div className="terms-block">
                    <h2>6. Limitation of Liability</h2>
                    <p>
                        Furlink is not responsible for any loss, damage, or injury arising from your use of the platform or
                        interaction with pet owners and shelters. You agree to use our services at your own risk.
                    </p>
                </div>

                <div className="terms-block">
                    <h2>7. Privacy Policy</h2>
                    <p>
                        Your personal information is used only for account management and adoption facilitation.
                        We do not share your details with third parties without consent.
                        Learn more in our <span className="highlight underline">Privacy Policy</span>.
                    </p>
                </div>

                <div className="terms-block">
                    <h2>8. Updates and Modifications</h2>
                    <p>
                        Furlink may update these Terms from time to time. Continued use after updates means you accept the new terms.
                        We recommend reviewing this page regularly.
                    </p>
                </div>

                <div className="terms-block">
                    <h2>9. Contact Us</h2>
                    <p>
                        If you have any questions or concerns regarding these Terms and Conditions,
                        please reach out to us at <span className="highlight">support@furlink.com</span>.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TermsAndConditions;

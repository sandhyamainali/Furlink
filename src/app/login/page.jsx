"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    // Handle form submit for email/password login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // TODO: Replace with your authentication API call
            // Simulate API call delay
            await new Promise((r) => setTimeout(r, 1500));

            // Simple validation example
            if (!email || !password) {
                throw new Error("Please enter email and password.");
            }
            // Simulate successful login
            console.log("Logging in with", { email, password, remember });

            // Redirect or update UI after successful login
            router.push("/dashboard"); // example redirect after login
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle social login button clicks
    const handleSocialLogin = (provider) => {
        console.log(`Logging in with ${provider}`);
        // In a real app, this would redirect to OAuth provider
        alert(`Redirecting to ${provider} login...`);
    };

    return (
        <>
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
                                Shop <nav className="nav">
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
                    Shop <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg></span>
                  </Link>
                </li>
                <li>
                  <Link href="/adopter" className="nav-link">
                    Adoption
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
                            </Link>
                        </li>
                        <li>
                            <Link href="/adopter" className="nav-link">
                                Adoption
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
                    <button className="mobile-menu-button" aria-label="Toggle menu">
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
            </nav>

            {/* Main Content centered */}
            <main
                style={{
                    maxWidth: "400px",
                    margin: "60px auto",
                    padding: "0 20px",
                    fontFamily: "Arial, sans-serif",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    paddingTop: "40px",
                    paddingBottom: "40px",
                }}
            >
                <div className="flex justify-center mb-6">
                    <Image src="/img/logo.png" alt="Furlink Logo" width={100} height={100} />
                </div>
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "24px",
                        color: "#dc9a6a",
                        fontSize: "2rem",
                        fontWeight: "700",
                    }}
                >
                    Welcome to Furlink
                </h2>

                <form
                    style={{ width: "100%" }}
                    className="login-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {error && (
                        <div
                            style={{
                                marginBottom: "16px",
                                padding: "10px",
                                backgroundColor: "#f8d7da",
                                color: "#842029",
                                borderRadius: "5px",
                                textAlign: "center",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <div style={{ marginBottom: "20px" }}>
                        <label
                            htmlFor="email"
                            style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            disabled={isLoading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "1rem",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                outlineColor: "#cc4400",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <label
                            htmlFor="password"
                            style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            disabled={isLoading}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "1rem",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                outlineColor: "#cc4400",
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "24px",
                        }}
                    >
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem" }}>
                            <input
                                type="checkbox"
                                disabled={isLoading}
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                                style={{ width: "16px", height: "16px" }}
                            />
                            Remember me
                        </label>
                        <a href="#" style={{ color: "#cc4400", fontWeight: "600", textDecoration: "none" }}>
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: "100%",
                            backgroundColor: isLoading ? "#999" : "blue",
                            color: "white",
                            padding: "12px",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: "5px",
                            cursor: isLoading ? "not-allowed" : "pointer",
                        }}
                    >
                        {isLoading ? "Signing In..." : "Login "}
                    </button>
                </form>

                <div style={{ marginTop: "30px", width: "100%" }}>
                    <div style={{ position: "relative", textAlign: "center", marginBottom: "20px" }}>
                        <hr style={{ borderColor: "#ccc" }} />
                        <span
                            style={{
                                position: "absolute",
                                top: "-12px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                backgroundColor: "white",
                                padding: "0 12px",
                                color: "#777",
                                fontSize: "0.9rem",
                            }}
                        >
                            Or continue with
                        </span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                        <button
                            type="button"
                            onClick={() => handleSocialLogin("google")}
                            disabled={isLoading}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "10px 20px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                backgroundColor: "white",
                                cursor: isLoading ? "not-allowed" : "pointer",
                                fontSize: "1rem",
                            }}
                        >
                            <FcGoogle size={20} />
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSocialLogin("facebook")}
                            disabled={isLoading}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "10px 20px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                backgroundColor: "white",
                                cursor: isLoading ? "not-allowed" : "pointer",
                                fontSize: "1rem",
                                color: "#1877f2",
                            }}
                        >
                            <FaFacebookF size={20} />
                            Facebook
                        </button>
                    </div>
                </div>

                <p
                    style={{
                        marginTop: "30px",
                        fontSize: "0.95rem",
                        color: "#555",
                        textAlign: "center",
                    }}
                >
                    Don't have an account?{" "}
                    <Link href="signin" style={{ color: "#6b21a8", fontWeight: "600", textDecoration: "none" }}>
                        Sign up
                    </Link>
                </p>
            </main>
        </>
    );
}
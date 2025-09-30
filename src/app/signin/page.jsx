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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [temporaryAddress, setTemporaryAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [havePet, setHavePet] = useState("no");
  const [haveVet, setHaveVet] = useState("no");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Basic validations
      if (
        !email ||
        !password ||
        !confirmPassword ||
        !fullName ||
        !city ||
        !permanentAddress ||
        !temporaryAddress ||
        !postalCode ||
        !contactNumber
      ) {
        throw new Error("Please fill in all required fields.");
      }
      if (password !== confirmPassword) {
        throw new Error("Password and Confirm Password do not match.");
      }
      if (!/^\d{5,10}$/.test(postalCode)) {
        throw new Error("Please enter a valid postal code.");
      }
      if (!/^\+?[\d\s\-]{7,15}$/.test(contactNumber)) {
        throw new Error("Please enter a valid contact number.");
      }

      // TODO: Replace with your authentication/registration API call
      await new Promise((r) => setTimeout(r, 1500));
      console.log("Registering with", {
        email,
        password,
        fullName,
        city,
        permanentAddress,
        temporaryAddress,
        postalCode,
        contactNumber,
        havePet,
        haveVet,
      });

      // Redirect after successful registration to login page
      router.push("/login");
    } catch (err) {
      setError(err.message || "Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    alert(`Redirecting to ${provider} login...`);
  };

  return (
    <>
      {/* Navigation Header */}
      <nav className="nav">
        <div className="nav-container ">
          <div className="logo">
            <Image src="/img/logo.png" alt="Furlink Logo" width={90} height={90} />
          </div>
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
          <div>
            <button className="login-button">Log In</button>
          </div>
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

        <form style={{ width: "100%" }} className="login-form" onSubmit={handleSubmit} noValidate>
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
              htmlFor="fullName"
              style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              disabled={isLoading}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
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
              Set Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
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

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="confirmPassword"
              style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              disabled={isLoading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
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
              htmlFor="city"
              style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}
            >
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              disabled={isLoading}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
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
              htmlFor="permanentAddress"
              style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}
            >
              Permanent Address
            </label>
            <input
              id="permanentAddress"
              name="permanentAddress"
              type="text"
              required
              disabled={isLoading}
              value={permanentAddress}
              onChange={(e) => setPermanentAddress(e.target.value)}
              placeholder="Enter your permanent address"
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
              htmlFor="temporaryAddress"
              style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}
            >
              Temporary Address
            </label>
            <input
              id="temporaryAddress"
              name="temporaryAddress"
              type="text"
              required
              disabled={isLoading}
              value={temporaryAddress}
              onChange={(e) => setTemporaryAddress(e.target.value)}
              placeholder="Enter your temporary address"
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
              htmlFor="postalCode"
              style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}
            >
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              required
              disabled={isLoading}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter your postal code"
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
              htmlFor="contactNumber"
              style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}
            >
              Contact Number
            </label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              required
              disabled={isLoading}
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
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

          <fieldset style={{ marginBottom: "20px" }} required>
            <legend style={{ fontWeight: "bold", marginBottom: "8px", color: "#333" }}>
              Do you have a pet?
            </legend>
            <label style={{ marginRight: "15px" }}>
              <input
                type="radio"
                name="havePet"
                value="yes"
                disabled={isLoading}
                checked={havePet === "yes"}
                onChange={() => setHavePet("yes")}
                required
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="havePet"
                value="no"
                disabled={isLoading}
                checked={havePet === "no"}
                onChange={() => setHavePet("no")}
                required
              />{" "}
              No
            </label>
          </fieldset>

          <fieldset style={{ marginBottom: "20px" }} required>
            <legend style={{ fontWeight: "bold", marginBottom: "8px", color: "#333" }}>
              Do you have a regular veterinarian?
            </legend>
            <label style={{ marginRight: "15px" }}>
              <input
                type="radio"
                name="haveVet"
                value="yes"
                disabled={isLoading}
                checked={haveVet === "yes"}
                onChange={() => setHaveVet("yes")}
                required
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="haveVet"
                value="no"
                disabled={isLoading}
                checked={haveVet === "no"}
                onChange={() => setHaveVet("no")}
                required
              />{" "}
              No
            </label>
          </fieldset>

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
            {isLoading ? "Submitting..." : "Register"}
          </button>
        </form>
      </main>
    </>
  );
}
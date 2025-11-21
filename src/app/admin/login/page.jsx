"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcLock } from "react-icons/fc";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in as admin
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAdmin && isAuthenticated) {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (email === "admin@furlink.com" && password === "Admin@123") {
        // Set admin session
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("furlink_user", JSON.stringify({
          email,
          name: "Furlink Admin",
          isAdmin: true,
        }));

        router.replace("/admin");
      } else {
        setError("Invalid admin credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        <Image
          src="/img/logo.png"
          alt="Furlink Logo"
          width={100}
          height={100}
        />
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
        Admin Portal
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
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Admin Email Address
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
            placeholder="admin@furlink.com"
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
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
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
            placeholder="Enter admin password"
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
          {isLoading ? "Signing In..." : "Access Admin Panel"}
        </button>
      </form>

      <p
        style={{
          marginTop: "30px",
          fontSize: "0.95rem",
          color: "#555",
          textAlign: "center",
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{
            color: "#6b21a8",
            fontWeight: "600",
            textDecoration: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Back to Furlink
        </button>
      </p>
    </main>
  );
}
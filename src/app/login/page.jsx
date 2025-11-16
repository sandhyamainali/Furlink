"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE } from '@/lib/config';

export default function LoginPage() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
    const { setUser } = useUser();
        const [remember, setRemember] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState("");

        const router = useRouter();
        const searchParams = useSearchParams();
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Handle form submit for email/password login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (!email || !password) {
                setError("Please enter email and password.");
                return;
            }

            const res = await fetch(`${API_BASE}/auth/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            // Read raw response text first so we can log/inspect non-JSON responses
            const raw = await res.text().catch(() => null);
            let data = null;
            try { data = raw ? JSON.parse(raw) : null; } catch (e) { data = null; }

            if (!res.ok) {
                // Handle validation/errors from backend. Prefer useful backend message.
                const msg = (data && (data.non_field_errors?.[0] || data.detail || data.error)) || raw || `Login failed (${res.status})`;
                console.error('Login failed', { status: res.status, body: raw, json: data });
                setError(msg);
                return;
            }

            // Expecting { access, refresh }
            if (data.access && data.refresh) {
                try {
                    localStorage.setItem('access', data.access);
                    localStorage.setItem('refresh', data.refresh);
                } catch (storageErr) {
                    console.error('Failed to save tokens to localStorage', storageErr);
                }
                // Optionally set a flag
                try { localStorage.setItem('isAuthenticated', 'true'); } catch {}

                // Redirect after successful login
                // Try to set user info in context/localStorage.
                let userObj = data.user || data.profile || data.user_profile || null;
                if (!userObj) {
                    // attempt to fetch profile endpoint with access token
                    try {
                        const profileRes = await fetch(`${API_BASE}/auth/user/`, {
                            headers: { Authorization: `Bearer ${data.access}` },
                        });
                        if (profileRes.ok) {
                            const profileData = await profileRes.json().catch(() => null);
                            if (profileData) userObj = profileData;
                        } else {
                            // try alternative endpoint
                            const alt = await fetch(`${API_BASE}/auth/profile/`, {
                                headers: { Authorization: `Bearer ${data.access}` },
                            }).catch(() => null);
                            if (alt && alt.ok) {
                                const altJson = await alt.json().catch(() => null);
                                if (altJson) userObj = altJson;
                            }
                        }
                    } catch (e) {
                        // ignore profile fetch errors
                        console.warn('Could not fetch profile after login', e);
                    }
                }

                // If still no profile object, create a minimal user object from the email so UI treats user as logged in
                if (!userObj) {
                    userObj = { email };
                }

                if (userObj) {
                    try {
                        setUser(userObj);
                        // userContext will persist to localStorage (furlink_user)
                    } catch (e) {
                        // As a fallback, write directly to localStorage
                        try { localStorage.setItem('furlink_user', JSON.stringify(userObj)); } catch {}
                    }
                }

                // Redirect after successful login
                const returnUrl = searchParams.get('returnUrl');
                router.push(returnUrl || '/');
            } else {
                setError('Unexpected response from server');
            }
        } catch (err) {
            console.error('Login error', err);
            setError(err.message || 'Login failed. Please try again.');
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
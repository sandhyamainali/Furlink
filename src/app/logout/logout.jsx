"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { logoutAndClearContext } from "../../lib/auth";

export default function LogoutPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    console.log('logout.jsx: handleLogout called');
    setIsLoggingOut(true);
    logoutAndClearContext();
    console.log('logout.jsx: logoutAndClearContext completed');
    router.push("/");
  };

  return (
    <main style={{ maxWidth: 700, margin: "80px auto", padding: 20, textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <Image src="/img/logo.png" alt="Furlink Logo" width={96} height={96} />
      </div>

      <h2 style={{ marginBottom: 12 }}>Log out</h2>
      <p style={{ color: "#555", marginBottom: 24 }}>Click the button below to sign out and return to the homepage.</p>

      <div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          style={{
            backgroundColor: isLoggingOut ? "#999" : "#cc4400",
            color: "white",
            padding: "10px 18px",
            border: "none",
            borderRadius: 6,
            cursor: isLoggingOut ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>

      <p style={{ marginTop: 18 }}>
        Or go back to <Link href="/">home</Link>.
      </p>
    </main>
  );
}

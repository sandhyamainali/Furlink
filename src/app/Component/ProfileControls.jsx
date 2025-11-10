"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { useUser } from "@/context/userContext";
import { FaShoppingCart } from "react-icons/fa";
import { logoutAndClearContext } from "../../lib/auth";
import { useRouter } from "next/navigation";

export default function ProfileControls() {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();
  console.log('ProfileControls: user:', user, 'isAuthenticated:', isAuthenticated);
  const profileSrc = user?.profile_picture || user?.avatar || user?.photo || user?.image || null;

  const handleLogoutClick = (e) => {
    e.preventDefault();
    console.log('ProfileControls: Logout button clicked, performing logout');
    logoutAndClearContext();
    router.push("/");
  };

  return (
    <div className="flex items-center ">
      {isAuthenticated ? (
        <div className=" profile  items-center ">
          <div className="flex items-center space-x-2">
            <button className="login-button text-sm " onClick={handleLogoutClick}>Logout</button>
          </div>
          <div>
            <Link href="/profile" className="items-center ml-1">
              {profileSrc ? (
                <Image src={profileSrc} alt="profile" width={40} height={40} style={{ borderRadius: 9999 }} />
              ) : (
                <div style={{ width: 28, height: 28, borderRadius: 9999, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#666', fontWeight: 700, fontSize: '12px' }}>U</span>
                </div>
              )}
            </Link>
          </div>
        </div>
      ) : (
        <Link href="/login">
          <button className="login-button text-sm py-1 px-3">Login</button>
        </Link>
      )}
    </div>
  );
}
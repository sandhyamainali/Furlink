"use client";
import Link from "next/link";
import { useCart } from "@/context/cartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function ProfileControls() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((s, i) => s + (i.quantity || 1), 0);

  return (
    <div className="flex items-center gap-4 flex-row">
      {/* Profile button */}
      <Link href="/profile">
        <button className="login-button">Profile</button>
      </Link>

      {/* Cart icon button */}
      <Link href="/cart" className="relative inline-flex items-center justify-center">
        <FaShoppingCart size={20} className="text-gray-700" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
}
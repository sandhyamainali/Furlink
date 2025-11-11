"use client";
import { useCart } from "@/context/cartContext";
import { useEffect, useState } from "react";

export default function CartCount() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((s, i) => s + (i.quantity || 1), 0);
  // track hydration so we don't change the DOM structure between server and client
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  // Always render the badge element so server and client markup match.
  // Only show the numeric count after hydration to avoid hydration mismatches.
  return (
    <span
      className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
      aria-hidden={cartCount === 0}
      style={{ visibility: hydrated && cartCount > 0 ? 'visible' : 'hidden' }}
    >
      {hydrated && cartCount > 0 ? cartCount : ''}
    </span>
  );
}
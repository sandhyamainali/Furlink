"use client";
import { useCart } from "@/context/cartContext";

export default function CartCount() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((s, i) => s + (i.quantity || 1), 0);

  return cartCount > 0 ? (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
      {cartCount}
    </span>
  ) : null;
}
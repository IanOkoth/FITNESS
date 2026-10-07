"use client";

import { useCart } from "./CartProvider";

export default function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button
      type="button"
      className="cartBtn"
      onClick={openCart}
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
        <path
          d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L22 7H6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20" r="1.4" fill="currentColor" />
        <circle cx="18" cy="20" r="1.4" fill="currentColor" />
      </svg>
      {count > 0 && <span className="cartCount">{count}</span>}
    </button>
  );
}

"use client";

import { useState } from "react";
import { fmtPrice } from "../lib/merch";
import { waLink } from "../lib/data";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { items, count, subtotal, open, closeCart, setQty, removeItem } =
    useCart();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function orderOnWhatsApp() {
    const lines = items
      .map((l) => `• ${l.qty} × ${l.name} (${l.size}) — ${fmtPrice(l.price * l.qty)}`)
      .join("\n");
    const msg = `Hi, I'd like to order some Altitude merch:\n\n${lines}\n\nTotal: ${fmtPrice(
      subtotal
    )}`;
    window.open(waLink(msg), "_blank", "noopener");
  }

  async function checkout() {
    setError("");
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email for your receipt.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items: items.map((l) => ({ id: l.id, size: l.size, qty: l.qty })),
          callbackUrl: `${window.location.origin}/shop/verify`,
        }),
      });
      const data = await res.json();

      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
        return;
      }
      if (data.configured === false) {
        // Payments not set up yet — fall back to a WhatsApp order.
        orderOnWhatsApp();
        return;
      }
      setError(data.error || "Could not start checkout. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div
        className={`cartOverlay ${open ? "isOpen" : ""}`}
        onClick={closeCart}
        aria-hidden={!open}
      />
      <aside
        className={`cartDrawer ${open ? "isOpen" : ""}`}
        aria-hidden={!open}
        aria-label="Shopping cart"
      >
        <div className="cartHead">
          <h3>Your cart{count > 0 ? ` (${count})` : ""}</h3>
          <button
            type="button"
            className="cartClose"
            onClick={closeCart}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cartEmpty">
            Your cart is empty. Browse the merch and add your kit.
          </p>
        ) : (
          <>
            <ul className="cartList">
              {items.map((l) => (
                <li key={l.key} className="cartItem">
                  <span
                    className="cartThumb"
                    style={{
                      background: `linear-gradient(135deg, ${l.tone[0]}, ${l.tone[1]})`,
                    }}
                    aria-hidden="true"
                  />
                  <div className="cartItemInfo">
                    <strong>{l.name}</strong>
                    <span className="cartSize">{l.size}</span>
                    <span className="cartLinePrice">
                      {fmtPrice(l.price * l.qty)}
                    </span>
                  </div>
                  <div className="qtyRow">
                    <button
                      type="button"
                      onClick={() => setQty(l.key, l.qty - 1)}
                      aria-label={`Decrease ${l.name}`}
                    >
                      −
                    </button>
                    <span>{l.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(l.key, l.qty + 1)}
                      aria-label={`Increase ${l.name}`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="qtyRemove"
                      onClick={() => removeItem(l.key)}
                      aria-label={`Remove ${l.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cartFoot">
              <div className="cartTotal">
                <span>Subtotal</span>
                <strong>{fmtPrice(subtotal)}</strong>
              </div>
              <label className="cartEmailField">
                <span>Email for receipt</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  inputMode="email"
                  autoComplete="email"
                />
              </label>
              {error && <p className="cartError">{error}</p>}
              <button
                type="button"
                className="btn btn-primary cartCheckout"
                onClick={checkout}
                disabled={busy}
              >
                {busy ? "Starting checkout…" : "Checkout"}
              </button>
              <button
                type="button"
                className="btn btn-ghost cartWa"
                onClick={orderOnWhatsApp}
              >
                Order on WhatsApp instead
              </button>
              <p className="cartNote">
                Secure payment by card or M-Pesa. Shipping confirmed after
                checkout.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

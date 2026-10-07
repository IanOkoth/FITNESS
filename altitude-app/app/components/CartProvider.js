"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "altitude-cart";
const lineId = (id, size) => `${id}__${size}`;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Load persisted cart (per-viewer convenience only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  function addItem(product, size) {
    const key = lineId(product.id, size);
    setItems((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) {
        return prev.map((l) =>
          l.key === key ? { ...l, qty: l.qty + 1 } : l
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          size,
          qty: 1,
          tone: product.tone,
        },
      ];
    });
    setOpen(true);
  }

  const setQty = (key, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l))
    );

  const removeItem = (key) =>
    setItems((prev) => prev.filter((l) => l.key !== key));

  const clear = () => setItems([]);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const l of items) {
      count += l.qty;
      subtotal += l.qty * l.price;
    }
    return { count, subtotal };
  }, [items]);

  const value = {
    items,
    count,
    subtotal,
    open,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
    addItem,
    setQty,
    removeItem,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

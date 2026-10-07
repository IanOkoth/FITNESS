/**
 * Merch catalog (placeholder data).
 * Prices are in KES. Swap names, prices, sizes and `tone` gradients for the
 * client's real products, and add real photos via the optional `image` field
 * (a path under /public). Until then each product renders a themed placeholder.
 *
 * This file is imported by BOTH the client (Shop, Cart) and the server
 * (checkout route recomputes the price from here so client-sent prices are
 * never trusted).
 */

export const CURRENCY = "KES";

export const products = [
  {
    id: "tee-ember",
    name: "Altitude Training Tee",
    price: 1800,
    blurb: "Breathable cotton blend. Built for the climb.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tone: ["#1b2634", "#2b8bff"],
  },
  {
    id: "hoodie-summit",
    name: "Summit Hoodie",
    price: 4200,
    blurb: "Heavyweight fleece for cold highland mornings.",
    sizes: ["S", "M", "L", "XL"],
    tone: ["#0f1b2e", "#1559c9"],
  },
  {
    id: "cap-peak",
    name: "Peak Cap",
    price: 1500,
    blurb: "Six-panel cap with embroidered mark.",
    sizes: ["One size"],
    tone: ["#12263a", "#5ecbff"],
  },
  {
    id: "bottle-rift",
    name: "Rift Steel Bottle",
    price: 2400,
    blurb: "Insulated 750ml. Keeps cold for 24 hours.",
    sizes: ["750ml"],
    tone: ["#15304f", "#3d9be0"],
  },
  {
    id: "shorts-tempo",
    name: "Tempo Training Shorts",
    price: 2600,
    blurb: "Lightweight, quick-dry, zip pocket.",
    sizes: ["S", "M", "L", "XL"],
    tone: ["#1a2436", "#2b8bff"],
  },
  {
    id: "tote-altitude",
    name: "Altitude Kit Tote",
    price: 1200,
    blurb: "Heavy canvas gym and shopping tote.",
    sizes: ["One size"],
    tone: ["#101d30", "#56c2ff"],
  },
];

export const fmtPrice = (n) =>
  `${CURRENCY} ${Number(n).toLocaleString("en-KE")}`;

export const productById = (id) => products.find((p) => p.id === id);

"use client";

import { useState } from "react";
import { products, fmtPrice } from "../lib/merch";
import { useCart } from "./CartProvider";

function ProductCard({ product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);

  return (
    <article className="card">
      <div
        className="cardArt"
        style={{
          background: `linear-gradient(135deg, ${product.tone[0]}, ${product.tone[1]})`,
        }}
        aria-hidden="true"
      >
        <span>{product.name}</span>
      </div>
      <div className="cardBody">
        <h3>{product.name}</h3>
        <p>{product.blurb}</p>
        <div className="cardMeta">
          <span className="price">{fmtPrice(product.price)}</span>
          {product.sizes.length > 1 ? (
            <label className="sizeSel">
              <span className="sr-only">Size for {product.name}</span>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                aria-label={`Size for ${product.name}`}
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <span className="sizeFixed">{product.sizes[0]}</span>
          )}
        </div>
        <button
          type="button"
          className="btn btn-primary cardAdd"
          onClick={() => addItem(product, size)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default function Shop() {
  return (
    <section className="sec shop" id="shop">
      <div className="wrap">
        <h2>Altitude merch</h2>
        <p className="shopIntro">
          Train in the kit. Every piece is built for the work — ships across
          Kenya and worldwide.
        </p>
        <div className="shopGrid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

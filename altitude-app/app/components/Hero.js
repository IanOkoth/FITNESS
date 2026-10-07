"use client";

import { useEffect, useState } from "react";
import { waLink } from "../lib/data";

const SLIDES = [
  { src: "/lewisgoodphotos-gym-5022285_1920.jpg", alt: "Athlete training in a gym" },
  { src: "/alexlhunt93-weights-3942914_1920.jpg", alt: "Lifting weights" },
  { src: "/foongkwan81-dumbbells-2646970_1920.jpg", alt: "Dumbbells ready for a session" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  // Auto-advance the carousel (skipped when the viewer prefers reduced motion).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const defaultWaLink = waLink(
    "Hi, I'd like to know more about training with you."
  );

  return (
    <section className="hero" id="hero">
      <div
        className="heroCarousel"
        aria-roledescription="carousel"
        aria-label="Training photos"
      >
        {SLIDES.map((s, i) => (
          <img
            key={s.src}
            className={`heroSlide ${i === active ? "active" : ""}`}
            src={s.src}
            alt={s.alt}
            draggable="false"
            fetchPriority={i === 0 ? "high" : "low"}
          />
        ))}
      </div>

      <div className="heroText" id="heroText">
        <div className="wrap reveal-in">
          <h1>Strength has no time zone.</h1>
          <p>
            Personal training from the Kenyan highlands, built around your
            goals, your schedule and your life, wherever you are.
          </p>
          <div className="ctaRow">
            <a className="btn btn-primary" href="#contact">
              Book a free consultation
            </a>
            <a
              className="btn btn-ghost"
              id="heroWa"
              href={defaultWaLink}
              target="_blank"
              rel="noopener"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="heroDots" role="tablist" aria-label="Choose slide">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={`heroDot ${i === active ? "active" : ""}`}
            aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
            aria-selected={i === active}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}

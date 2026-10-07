"use client";

import { useEffect, useRef } from "react";
import { scene, heroSceneOptions, waLink } from "../lib/data";

export default function Hero() {
  const heroRef = useRef(null);
  const frameRef = useRef(null);
  const bgwordRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.innerHTML = `
        <video autoPlay loop muted playsInline style="width: 100%; height: 100%; object-fit: cover; display: block;">
          <source src="/15774105_3840_2160_30fps.mp4" type="video/mp4" />
        </video>
      `;
    }

    const hero = heroRef.current;
    const frame = frameRef.current;
    const bgword = bgwordRef.current;
    const heroText = heroTextRef.current;

    const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

    function onScroll() {
      const total = hero.offsetHeight - window.innerHeight;
      const p = clamp(-hero.getBoundingClientRect().top / total, 0, 1);
      const e = p * p * (3 - 2 * p); // ease
      const vw = window.innerWidth < 700 ? 8 : 26;
      const vh = window.innerWidth < 700 ? 22 : 15;
      frame.style.clipPath = `inset(${e * vh}vh ${e * vw}vw ${e * vh}vh ${e * vw}vw round ${e * 28}px)`;
      heroText.style.opacity = clamp(1 - p * 3.2, 0, 1);
      heroText.style.pointerEvents = p > 0.3 ? "none" : "auto";
      bgword.style.opacity = clamp((p - 0.1) * 2, 0, 1);
      bgword.style.transform = `scale(${1.08 - e * 0.08})`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const defaultWaLink = waLink("Hi, I'd like to know more about training with you.");

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="stick">
        <div className="bgword" ref={bgwordRef} aria-hidden="true">
          <div className="bgwordTrack bgwordTrack--left">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={`l${i}`}>Built at altitude.&nbsp;</span>
            ))}
          </div>
          <div className="bgwordTrack bgwordTrack--right">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={`r${i}`}>Built at altitude.&nbsp;</span>
            ))}
          </div>
        </div>
        <div className="frame" ref={frameRef} id="frame"></div>
        <div className="heroText" ref={heroTextRef} id="heroText">
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
      </div>
    </section>
  );
}

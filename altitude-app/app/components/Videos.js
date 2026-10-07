"use client";

import { useRef, useCallback } from "react";
import { scene, clips } from "../lib/data";

export default function Videos() {
  const trackRef = useRef(null);
  const vprogRef = useRef(null);
  const dialogRef = useRef(null);
  const lbBodyRef = useRef(null);

  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    const vprog = vprogRef.current;
    if (!track || !vprog) return;
    const m = track.scrollWidth - track.clientWidth;
    const p = m > 0 ? track.scrollLeft / m : 0;
    vprog.style.width = 20 + p * 80 + "%";
  }, []);

  const scrollTrack = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    const step = track.clientWidth * 0.7;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const openLb = useCallback((c, i) => {
    if (!lbBodyRef.current || !dialogRef.current) return;
    lbBodyRef.current.innerHTML =
      `<video controls autoPlay style="width: 100%; max-height: 70vh; border-radius: 8px; background: #000;">
         <source src="${c.v}" type="video/mp4" />
       </video>` +
      `<div class="note" style="margin-top: 1rem;"><strong>${c.t}</strong></div>`;
    dialogRef.current.showModal();
  }, []);

  const closeLb = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const handleDialogClick = useCallback(
    (e) => {
      if (e.target === dialogRef.current) closeLb();
    },
    [closeLb]
  );

  return (
    <>
      <section className="sec videos" id="videos">
        <div className="wrap vhead">
          <div>
            <h2>See a session</h2>
            <p>Short clips from real training. Swipe or use the arrows.</p>
          </div>
          <div className="arrows">
            <button
              className="arrow"
              aria-label="Previous clips"
              onClick={() => scrollTrack(-1)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              className="arrow"
              aria-label="Next clips"
              onClick={() => scrollTrack(1)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className="track"
          ref={trackRef}
          tabIndex="0"
          aria-label="Training video clips"
          onScroll={updateProgress}
        >
          {clips.map((c, i) => (
            <button
              key={i}
              className="tile"
              aria-label={`Play clip: ${c.t}, ${c.d}`}
              onClick={() => openLb(c, i)}
            >
              <video
                src={c.v}
                autoPlay
                loop
                muted
                playsInline
              />
              <span className="play">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#dde8f5">
                  <path d="M7 4l13 8-13 8z" />
                </svg>
              </span>
              <span className="tt">
                <b>{c.t}</b>
                <span>{c.d} video clip</span>
              </span>
              <span className="bar"></span>
            </button>
          ))}
        </div>
        <div className="prog-line">
          <i ref={vprogRef}></i>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        id="lightbox"
        aria-label="Video player"
        onClick={handleDialogClick}
      >
        <div className="lb" ref={lbBodyRef} id="lbBody"></div>
        <button
          className="btn btn-primary btn-sm lbclose"
          onClick={closeLb}
          style={{ marginTop: "1rem" }}
        >
          Close
        </button>
      </dialog>
    </>
  );
}

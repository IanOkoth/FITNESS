"use client";

import { useCallback } from "react";

export default function Contact() {
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const f = e.target;
    if (f.website.value) return; // honeypot
    if (
      !f.name.value.trim() ||
      !/^\S+@\S+\.\S+$/.test(f.email.value)
    ) {
      f.name.reportValidity?.();
      f.email.focus();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name.value,
          email: f.email.value,
          phone: f.phone.value,
          country: f.country.value,
          goal: f.goal.value,
          format: f.format.value,
          message: f.message.value,
          website: f.website.value,
        }),
      });

      if (res.ok) {
        document.getElementById("ok")?.classList.add("show");
      }
    } catch {
      document.getElementById("ok")?.classList.add("show");
    }
  }, []);

  return (
    <section className="sec contact" id="contact">
      <div className="wrap contactGrid">
        <div>
          <h2>Start with a conversation</h2>
          <p className="sub">
            Tell us where you are and where you want to be. You will get a reply
            within 24 hours.
          </p>
        </div>
        <form id="form" noValidate onSubmit={handleSubmit}>
          <div className="row2">
            <label>
              <span>Full name</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" required autoComplete="email" />
            </label>
          </div>
          <div className="row2">
            <label>
              WhatsApp number
              <input
                name="phone"
                type="tel"
                placeholder="+49 170 0000000"
                autoComplete="tel"
              />
            </label>
            <label>
              <span>Country</span>
              <input name="country" autoComplete="country-name" />
            </label>
          </div>
          <div className="row2">
            <label>
              <span>Your goal</span>
              <select name="goal" id="fGoal">
                <option value="strength">Build strength</option>
                <option value="fat">Lose fat</option>
                <option value="run">Run farther</option>
                <option value="move">Move better</option>
              </select>
            </label>
            <label>
              Format
              <select name="format" id="fFormat">
                <option value="online">Live online</option>
                <option value="inperson">In person, Nairobi</option>
                <option value="hybrid">Both</option>
              </select>
            </label>
          </div>
          <label>
            Message
            <textarea
              name="message"
              id="fMsg"
              rows="4"
              placeholder="Anything we should know?"
            ></textarea>
          </label>
          <input
            className="hp"
            name="website"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />
          <button className="btn btn-primary" type="submit">
            Send my request
          </button>
          <p className="ok" id="ok" role="status">
            Request received. Your coach will reply within 24 hours.
          </p>
        </form>
      </div>
    </section>
  );
}

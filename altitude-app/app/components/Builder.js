"use client";

import { useState, useCallback } from "react";
import {
  waLink,
  goalName,
  goalQ,
  splits,
  dayNames,
  fmtName,
  mins,
} from "../lib/data";

export default function Builder() {
  const [state, setState] = useState({
    goal: "strength",
    level: "Beginner",
    days: "3",
    format: "online",
  });

  const updateState = useCallback((key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const d = +state.days;
  const list = splits[state.goal].slice(0, d);
  const names = dayNames[d];
  const planTitle = goalName[state.goal] + " plan";
  const planMeta = `${state.level}, ${d} days a week, about ${mins[state.level]} minutes a session. ${fmtName[state.format]}.`;
  const msg = `Hi, I'd like a program. Goal: ${goalQ[state.goal]}. Level: ${state.level}. Days per week: ${d}. Format: ${fmtName[state.format]}. What is the next step?`;
  const planWaLink = waLink(msg);

  const handleFormFill = () => {
    const fGoal = document.getElementById("fGoal");
    const fFormat = document.getElementById("fFormat");
    const fMsg = document.getElementById("fMsg");
    if (fGoal) fGoal.value = state.goal;
    if (fFormat) fFormat.value = state.format;
    if (fMsg) fMsg.value = msg;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const chipGroups = [
    {
      label: "Your goal",
      key: "goal",
      options: [
        { v: "strength", text: "Build strength" },
        { v: "fat", text: "Lose fat" },
        { v: "run", text: "Run farther" },
        { v: "move", text: "Move better" },
      ],
    },
    {
      label: "Your level",
      key: "level",
      options: [
        { v: "Beginner", text: "Beginner" },
        { v: "Intermediate", text: "Intermediate" },
        { v: "Advanced", text: "Advanced" },
      ],
    },
    {
      label: "Days per week",
      key: "days",
      options: [
        { v: "2", text: "2" },
        { v: "3", text: "3" },
        { v: "4", text: "4" },
        { v: "5", text: "5" },
      ],
    },
    {
      label: "Session format",
      key: "format",
      options: [
        { v: "online", text: "Live online" },
        { v: "inperson", text: "In person, Nairobi" },
        { v: "hybrid", text: "Both" },
      ],
    },
  ];

  return (
    <section className="sec build" id="build">
      <div className="wrap">
        <h2>Build your program</h2>
        <p style={{ marginTop: "1.2rem", color: "var(--sand-dim)", maxWidth: "54ch" }}>
          Four quick choices. See your starting plan, then send it straight to
          your coach.
        </p>
        <div className="buildGrid">
          <div>
            {chipGroups.map((group) => (
              <div className="q" key={group.key}>
                <h3>{group.label}</h3>
                <div className="chips">
                  {group.options.map((opt) => (
                    <button
                      key={opt.v}
                      className="chip"
                      aria-pressed={state[group.key] === opt.v ? "true" : "false"}
                      onClick={() => updateState(group.key, opt.v)}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <aside className="plan" aria-live="polite">
            <h3>{planTitle}</h3>
            <p className="meta">{planMeta}</p>
            <ul>
              {list.map((s, i) => (
                <li key={i} style={{ animationDelay: `${i * 60}ms` }}>
                  <b>{names[i]}</b>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="actions">
              <a
                className="btn btn-primary"
                href={planWaLink}
                target="_blank"
                rel="noopener"
              >
                Send this plan on WhatsApp
              </a>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={handleFormFill}
              >
                Add it to my request form
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

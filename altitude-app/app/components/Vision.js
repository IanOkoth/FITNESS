"use client";

import { useEffect, useState } from "react";

export default function Vision() {
  const [nboTime, setNboTime] = useState("--:--");
  const [youTime, setYouTime] = useState("--:--");
  const [youLabel, setYouLabel] = useState("Where you are");

  useEffect(() => {
    function tick() {
      const now = new Date();
      const f = (tz) =>
        new Intl.DateTimeFormat([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: tz,
        }).format(now);
      const local =
        Intl.DateTimeFormat().resolvedOptions().timeZone || undefined;
      setNboTime(f("Africa/Nairobi"));
      setYouTime(f(local));
      setYouLabel(
        "Where you are" +
          (local ? " (" + local.replace("_", " ") + ")" : "")
      );
    }
    tick();
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="sec vision" id="vision">
      <div className="wrap grid">
        <div>
          <h2>Train like the sun is already up.</h2>
          <p className="lead">
            Every program starts with one conversation. We learn what you want,
            what your week allows, and what equipment you have. Then we build
            sessions that fit, live, from Kenya, to wherever you are.
          </p>
        </div>
        <div className="clock" aria-live="off">
          <div>
            <span>Nairobi right now</span>
            <strong>{nboTime}</strong>
          </div>
          <div>
            <span>{youLabel}</span>
            <strong>{youTime}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

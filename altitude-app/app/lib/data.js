/**
 * Generate an SVG landscape scene (Rift Valley style).
 * Used for hero backgrounds and video clip thumbnails.
 */
export function scene(uid, o) {
  const runner =
    o.runner == null
      ? ""
      : `<g transform="translate(${o.runner},650)" stroke="#0d0a08" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="0" cy="0" r="10" fill="#0d0a08"/>
      <path d="M0 14 L-8 56"/><path d="M-2 24 L-26 40 L-12 54"/><path d="M-2 24 L20 34 L34 24"/>
      <path d="M-8 56 L14 76 L8 104"/><path d="M-8 56 L-34 76 L-52 62"/>
    </g>`;

  const tree =
    o.tree == null
      ? ""
      : `<g fill="#0d0a08" transform="translate(${o.tree},0)">
      <path d="M0 640 C-4 590 6 560 24 520 L34 524 C20 560 16 592 18 640Z"/>
      <ellipse cx="30" cy="506" rx="160" ry="26"/><ellipse cx="-50" cy="530" rx="90" ry="18"/><ellipse cx="120" cy="528" rx="80" ry="16"/>
    </g>`;

  return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="s${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${o.sky[0]}"/><stop offset=".55" stop-color="${o.sky[1]}"/><stop offset="1" stop-color="${o.sky[2]}"/></linearGradient>
      <radialGradient id="g${uid}"><stop offset="0" stop-color="${o.sun}" stop-opacity=".85"/><stop offset="1" stop-color="${o.sun}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#s${uid})"/>
    <g class="${o.rise ? "sunrise" : ""}"><circle cx="${o.sx}" cy="${o.sy}" r="360" fill="url(#g${uid})"/><circle cx="${o.sx}" cy="${o.sy}" r="96" fill="${o.sun}"/></g>
    <path d="M0 560 C200 500 380 545 560 505 S900 470 1100 520 S1450 480 1600 520 V900 H0Z" fill="${o.r[0]}"/>
    <path d="M0 645 C240 595 420 655 700 615 S1150 585 1350 635 S1550 612 1600 622 V900 H0Z" fill="${o.r[1]}"/>
    ${tree}
    <path d="M0 765 C300 725 600 785 900 745 S1400 725 1600 765 V900 H0Z" fill="${o.r[2]}"/>
    ${runner}
  </svg>`;
}

export const WA_NUMBER = "254700000000"; // placeholder

export function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export const heroSceneOptions = {
  sky: ["#2a1a2e", "#b8431a", "#f2b134"],
  sun: "#ffd36b",
  sx: 900,
  sy: 520,
  r: ["#6b2f22", "#44201a", "#1d1210"],
  tree: 1080,
  runner: 430,
  rise: true,
};

export const clips = [
  {
    t: "Dawn hill run",
    d: "12 sec",
    v: "/12382061_1920_1080_25fps.mp4",
    o: {
      sky: ["#2a1a2e", "#b8431a", "#f2b134"],
      sun: "#ffd36b",
      sx: 700,
      sy: 500,
      r: ["#6b2f22", "#44201a", "#1d1210"],
      runner: 900,
      tree: 260,
    },
  },
  {
    t: "Sprint intervals",
    d: "9 sec",
    v: "/200657-913478674_medium.mp4",
    o: {
      sky: ["#1b2338", "#7a3a46", "#e07a3a"],
      sun: "#ffb06b",
      sx: 1100,
      sy: 540,
      r: ["#40283a", "#2c1b2b", "#150e14"],
      runner: 520,
    },
  },
  {
    t: "Strength at golden hour",
    d: "15 sec",
    v: "/50884-462182247_medium.mp4",
    o: {
      sky: ["#23160f", "#9a4a16", "#f2b134"],
      sun: "#ffe08a",
      sx: 500,
      sy: 520,
      r: ["#5c3217", "#3a200f", "#180e08"],
      tree: 1150,
    },
  },
  {
    t: "Mobility flow",
    d: "10 sec",
    v: "/6115230-hd_1920_1080_25fps.mp4",
    o: {
      sky: ["#16262a", "#4a6a5a", "#e8c98a"],
      sun: "#f6e3a8",
      sx: 850,
      sy: 500,
      r: ["#38503f", "#263a2e", "#101a14"],
      tree: 320,
      runner: 1100,
    },
  },
  {
    t: "Boxing conditioning",
    d: "8 sec",
    v: "/65163-513048313_medium.mp4",
    o: {
      sky: ["#1a1210", "#6a2418", "#d4541c"],
      sun: "#ff8a4a",
      sx: 1000,
      sy: 520,
      r: ["#4a1c14", "#2e120e", "#120806"],
      runner: 700,
    },
  },
  {
    t: "Track session",
    d: "14 sec",
    v: "/15080064_1080_1920_30fps.mp4",
    o: {
      sky: ["#2a1a2e", "#a63a2a", "#f2b134"],
      sun: "#ffc55a",
      sx: 600,
      sy: 530,
      r: ["#5a2a2a", "#3a1a1c", "#170d0e"],
      runner: 1250,
      tree: 200,
    },
  },
];

export const goalName = {
  strength: "Strength",
  fat: "Fat loss",
  run: "Running",
  move: "Mobility",
};

export const goalQ = {
  strength: "Build strength",
  fat: "Lose fat",
  run: "Run farther",
  move: "Move better",
};

export const splits = {
  strength: [
    "Lower body strength",
    "Upper body push and pull",
    "Full body power",
    "Core and mobility",
    "Conditioning finisher",
  ],
  fat: [
    "Intervals and circuits",
    "Strength base",
    "Hill or tempo cardio",
    "Full body burn",
    "Core and mobility",
  ],
  run: [
    "Easy aerobic run",
    "Hills or intervals",
    "Strength for runners",
    "Long run",
    "Mobility and drills",
  ],
  move: [
    "Mobility flow",
    "Stability and balance",
    "Functional strength",
    "Core control",
    "Posture and breathing",
  ],
};

export const dayNames = {
  2: ["Tue", "Sat"],
  3: ["Mon", "Wed", "Sat"],
  4: ["Mon", "Tue", "Thu", "Sat"],
  5: ["Mon", "Tue", "Wed", "Fri", "Sat"],
};

export const fmtName = {
  online: "Live video, anywhere in the world",
  inperson: "In person, Nairobi",
  hybrid: "Live video plus in person in Nairobi",
};

export const mins = { Beginner: 40, Intermediate: 55, Advanced: 70 };

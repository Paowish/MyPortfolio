import { useState, useEffect, useRef, useMemo } from "react";

const DATA = {
  name: "Paolo Carunia",
  role: "BS Information Technology",
  email: "caruniapaolovince@gmail.com",
  resumeUrl: "/Carunia_Paolo_Vincent_CV.pdf",
  certsUrl: "https://drive.google.com/drive/folders/18HUWVS9cN20oo7vk0T4F6PHHpYWHqiip?usp=sharing",
  socials: [
    { label: "github", href: "https://github.com/Paowish" },
    { label: "linkedin", href: "https://www.linkedin.com/in/paolo-vincent-carunia-1637aa3ba/opportunities/services/onboarding/" },
    { label: "facebook", href: "https://www.facebook.com/paolo.carunia" },
  ],
  stats: [
    { v: "4th", l: "year student" },
    { v: "10", l: "projects built" },
    { v: "5", l: "certifications" },
  ],
  projects: [
    {
      name: "Sta. Rosa Nueva Ecija Incident Reporting System",
      tagline: "Community",
      desc: "A community incident reporting system for reporting emergencies and enabling faster, location-based response.",
      badge: "Capstone",
      hue: 18,
      links: [
        { label: "Live", href: "https://www.rescuesantarosagov.live/" },
        { label: "Source", href: "https://github.com/Paowish/Sta.Rosa-Rescue-System-Frontend" },
      ],
    },
    {
      name: "CICT Student Portal",
      tagline: "Web Development Competition",
      desc: "A centralized digital hub designed exclusively for the College of Information and Communications Technology (CICT) community.",
      badge: "Competition",
      hue: 18,
      links: [
        { label: "Live", href: "https://cict-student-portal.vercel.app" },
        { label: "Source", href: "https://github.com/Paowish/Carunia_TAL2023_00258" },
      ],
    },
    {
      name: "Research Toolkit Website",
      tagline: "Research Tools",
      desc: "An internal web app that gathers and organizes research materials and tools for College of Education students.",
      badge: "TARLAC STATE UNIVERSITY - CLIENT PROJECT",
      hue: 150,
      links: [{ label: "Live", href: "https://finaltsucoed.netlify.app" }, { label: "Source", href: "https://github.com/Paowish/research_toolkit_website" }],
    },
    {
      name: "Shoeluxe Systems",
      tagline: "E-commerce Platform",
      desc: "A modern e-commerce platform for shoes and accessories with admin panel and user management.",
      badge: "Case Study",
      hue: 265,
      links: [
        { label: "Live", href: "https://shoeluxesystem.vercel.app" },
        { label: "Source", href: "https://github.com/Paowish/shoeluxe-system" },
      ],
    },
  ],
  education: [
    { year: "2023–now", role: "BS Information Technology", org: "Nueva Ecija University of Science and Technology" },
    { year: "2021–23", role: "Senior High School, ICT track", org: "Cuyapo National High School" },
  ],
  stack: [
    "HTML5", "CSS", "Javascript", "TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS",
    "MongoDB", "React Native", "MySQL", "Render", "Vercel", "Netlify", "Github", "Git", "Cloudinary",
  ],
  certs: [
    { name: "IT Specialist", issuer: "Pearson", mark: "ITS" },
    { name: "Web Deployment", issuer: "UpSkillTechPH", mark: "G" },
    { name: "SQL and Query Optimization", issuer: "UpSkillTechPH", mark: "P" },
    { name: "Google Workspace", issuer: "DICT", mark: "P" },
    { name: "Utilizing AI and Predictive Analytics", issuer: "Armstrong Training", mark: "P" },
  ],
  quotes: [
    {
      text: "A quick learner who hands in careful work on time and helps classmates when they get stuck.",
      who: "Name Surname",
      title: "Professor",
    },
    {
      text: "Picks up new tools fast and always volunteers for the hard parts of a project.",
      who: "Name Surname",
      title: "Org Adviser",
    },
    {
      text: "Turns rough ideas into working demos faster than anyone else in the class.",
      who: "Name Surname",
      title: "Capstone Mentor",
    },
  ],
  activities: [
    { event: "Web Development Competition (Techno Day)", result: "3rd Place", year: "2026" },
    { event: "Fast Typing Contest at Talavera Off Campus (Techno Day)", result: "1st Place", year: "2024" },
    { event: "Code Debugging Contest at Talavera Off Campus (Techno Day)", result: "2nd Place", year: "2023" },
  ],
};

const NAV = [
  { id: "projects", label: "projects" },
  { id: "education", label: "education" },
  { id: "contact", label: "contact" },
];

/* ----------------------------- helpers ----------------------------- */
const isMac = () => {
  try {
    return /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  } catch (e) {
    return false;
  }
};

const jump = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  let smooth = true;
  try {
    smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) { }
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
};

function rng(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const Arrow = () => (
  <svg viewBox="0 0 12 12" className="inline-block h-[0.7em] w-[0.7em]" aria-hidden="true">
    <path d="M3 9L9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Sun = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
    <circle cx="10" cy="10" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
    <path d="M16.5 11.8A6.8 6.8 0 018.2 3.5a6.8 6.8 0 108.3 8.3z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

/* ----------------------------- layout bits ----------------------------- */
function Section({ id, n, title, href, linkText, children }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-12">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="font-mono text-xs lowercase tracking-[0.08em] text-mute">
          {n} — {title}
        </h2>
        {href && (
          <a href={href} target="_blank" rel="noreferrer" className="font-mono text-xs text-mute transition-colors hover:text-fg">
            {linkText} →
          </a>
        )}
      </div>
      {children}
    </section>
  );
}

function Header({ theme, onTheme, onPalette }) {
  const mod = isMac() ? "⌘" : "Ctrl";
  return (
    <header className="hdr">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-display text-xl leading-none tracking-tight">
          {DATA.name.split(" ")[0]}
        </button>
        <nav className="hidden items-center gap-5 sm:flex" aria-label="Sections">
          {NAV.map((s) => (
            <button key={s.id} onClick={() => jump(s.id)} className="font-mono text-xs lowercase text-mute transition-colors hover:text-fg">
              {s.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={onPalette}
            className="flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5 font-mono text-xs text-mute transition-colors hover:text-fg"
          >
            <span>jump to</span>
            <kbd className="rounded border border-line px-1 text-[10px]">{mod} K</kbd>
          </button>
          <button
            onClick={onTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-mute transition-colors hover:text-fg"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------- hero -------------------------------- */
function Hero() {
  return (
    <section className="pb-12 pt-10 sm:pt-16">
      <h1 className="mt-8 font-display text-6xl leading-[0.95] tracking-tight sm:text-8xl">{DATA.name}</h1>
      <p className="mt-3 font-mono text-sm text-accent">{DATA.role}</p>
      <p className="mt-6 max-w-xl text-lg leading-relaxed">{DATA.intro}</p>
      <p className="mt-3 max-w-xl leading-relaxed text-mute">{DATA.now}</p>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        {DATA.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="font-mono text-sm text-mute transition-colors hover:text-fg">
            {s.label} <Arrow />
          </a>
        ))}
      </div>
      <dl className="mt-10 grid grid-cols-3 border-y border-line">
        {DATA.stats.map((s, i) => (
          <div key={s.l} className={"py-5 " + (i ? "border-l border-line pl-4 sm:pl-6" : "")}>
            <dt className="order-2 font-mono text-[11px] lowercase text-mute sm:text-xs">{s.l}</dt>
            <dd className="font-display text-4xl leading-none sm:text-5xl">{s.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------ sections ------------------------------ */
function Projects() {
  return (
    <Section id="projects" n="01" title="projects" href={DATA.socials[0].href} linkText="all projects">
      <ul className="flex flex-col gap-3">
        {DATA.projects.map((p) => (
          <li key={p.name} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row">
            <div
              className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] font-display text-3xl text-white"
              style={{ background: `linear-gradient(135deg, hsl(${p.hue} 78% 58%), hsl(${p.hue + 32} 70% 38%))` }}
              aria-hidden="true"
            >
              {p.name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <span className="font-mono text-xs text-mute">{p.tagline}</span>
                <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">{p.badge}</span>
              </div>
              <p className="mt-1.5 leading-relaxed text-mute">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-fg px-3 py-1.5 font-mono text-xs text-bg transition-opacity hover:opacity-80"
                  >
                    {l.label} <Arrow />
                  </a>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="education" n="02" title="education" href={DATA.resumeUrl} linkText="resume">
      <ul className="divide-y divide-line border-y border-line">
        {DATA.education.map((e) => (
          <li key={e.year + e.role} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 py-4 sm:grid-cols-[6rem_1fr_auto]">
            <span className="font-mono text-sm tabular-nums text-mute">{e.year}</span>
            <span className="font-medium">{e.role}</span>
            <span className="col-start-2 text-mute sm:col-start-auto">{e.org}</span>
          </li>
        ))}
      </ul>
      <h3 className="mb-4 mt-10 font-mono text-xs lowercase tracking-[0.08em] text-mute">skills</h3>
      <ul className="flex flex-wrap gap-2">
        {DATA.stack.map((s) => (
          <li key={s} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm">{s}</li>
        ))}
      </ul>
    </Section>
  );
}

function Certs() {
  return (
    <Section id="certs" n="03" title="certifications" href={DATA.certsUrl} linkText="all certifications">
      <ul className="grid gap-3 sm:grid-cols-3">
        {DATA.certs.map((c) => (
          <li key={c.name} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 font-display text-xl text-accent" aria-hidden="true">{c.mark}</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{c.name}</p>
              <p className="truncate font-mono text-xs text-mute">{c.issuer}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Quotes() {
}

function Activities() {
  return (
    <Section id="activities" n="04" title="activities">
      <ul className="divide-y divide-line border-y border-line">
        {DATA.activities.map((h) => (
          <li key={h.event + h.year} className="flex items-baseline justify-between gap-4 py-4">
            <span className="font-medium">{h.event}</span>
            <span className="flex items-baseline gap-4">
              <span className={"font-mono text-xs uppercase tracking-wider " + (h.result === "Officer" ? "text-accent" : "text-mute")}>{h.result}</span>
              <span className="font-mono text-xs tabular-nums text-mute">{h.year}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Github() {
  const githubUsername = "Paowish";
  const chartUrl = `https://ghchart.rshah.org/409ba5/${githubUsername}`;

  return (
    <Section id="github" n="05" title="github" href={DATA.socials[0].href} linkText={`@${githubUsername}`}>
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface p-4">
        <img
          src={chartUrl}
          alt={`${githubUsername}'s GitHub contribution chart`}
          className="w-full min-w-[700px] opacity-90 transition-opacity hover:opacity-100"
        />
      </div>
      <p className="mt-3 font-mono text-xs text-mute">
        281 Live contributions from this year · <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer" className="hover:text-fg underline">@{githubUsername}</a>
      </p>
    </Section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const copy = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };
    const fallback = () => {
      try {
        const r = document.createRange();
        r.selectNodeContents(ref.current);
        const s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
      } catch (e) { }
    };
    try {
      navigator.clipboard.writeText(DATA.email).then(done, fallback);
    } catch (e) {
      fallback();
    }
  };
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-14">
      <p className="font-mono text-xs lowercase tracking-[0.08em] text-mute">get in touch</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span ref={ref} className="select-all break-all rounded-xl border border-line bg-surface px-4 py-2.5 font-mono text-sm">{DATA.email}</span>
        <button onClick={copy} className="rounded-xl bg-accent px-4 py-2.5 font-mono text-sm text-accent-ink transition-opacity hover:opacity-85">
          {copied ? "copied" : "copy"}
        </button>
        <a href={"mailto:" + DATA.email} className="font-mono text-sm text-mute transition-colors hover:text-fg">open mail app →</a>
      </div>
      <p className="mt-2 min-h-[1.25rem] font-mono text-xs text-mute" aria-live="polite">{copied ? "Email address copied to clipboard." : ""}</p>
    </section>
  );
}

/* ---------------------------- command palette ---------------------------- */
function Palette({ open, onClose, items }) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef(null);
  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
      setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    }
  }, [open]);
  if (!open) return null;
  const list = items.filter((it) => it.label.toLowerCase().includes(q.toLowerCase()));
  const run = (it) => {
    onClose();
    setTimeout(it.run, 0);
  };
  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setI((v) => Math.min(list.length - 1, v + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setI((v) => Math.max(0, v - 1));
    } else if (e.key === "Enter" && list[i]) run(list[i]);
  };
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-label="Jump to" className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
        <input
          id="palette-input"
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setI(0);
          }}
          onKeyDown={onKey}
          placeholder="Jump to a section or run a command"
          className="w-full border-b border-line bg-transparent px-4 py-3.5 text-[15px] outline-none placeholder:text-mute"
        />
        <ul className="max-h-72 overflow-y-auto p-2">
          {list.length === 0 && <li className="px-3 py-6 text-center font-mono text-xs text-mute">nothing matches "{q}"</li>}
          {list.map((it, idx) => (
            <li key={it.label}>
              <button
                onClick={() => run(it)}
                onMouseEnter={() => setI(idx)}
                className={"flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm " + (idx === i ? "bg-surface-2" : "")}
              >
                <span>{it.label}</span>
                <span className="font-mono text-xs text-mute">{it.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------- typing test ------------------------------- */
const WORDS = "build ship learn refine design deploy debug iterate review pattern system layer query cache route state hook render commit branch merge token stream signal vector model prompt latency throughput schema index queue worker module".split(" ");
const pick = (n = 22) => Array.from({ length: n }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ");

function TypingTest({ open, onClose }) {
  const [text, setText] = useState(() => pick());
  const [typed, setTyped] = useState("");
  const [start, setStart] = useState(null);
  const [now, setNow] = useState(0);
  const [done, setDone] = useState(false);
  const inputRef = useRef(null);
  const restart = () => {
    setText(pick());
    setTyped("");
    setStart(null);
    setNow(0);
    setDone(false);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };
  useEffect(() => {
    if (open) restart();
  }, [open]);
  useEffect(() => {
    if (!start || done) return;
    const t = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(t);
  }, [start, done]);
  if (!open) return null;

  const onChange = (e) => {
    if (done) return;
    let v = e.target.value.slice(0, text.length);
    if (!start) {
      setStart(Date.now());
      setNow(Date.now());
    }
    setTyped(v);
    if (v.length === text.length) {
      setDone(true);
      setNow(Date.now());
    }
  };
  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Tab") {
      e.preventDefault();
      restart();
    }
  };
  let correct = 0;
  for (let k = 0; k < typed.length; k++) if (typed[k] === text[k]) correct++;
  const elapsed = start ? Math.max(0, (now - start) / 1000) : 0;
  const wpm = elapsed > 0.5 ? Math.round(correct / 5 / (elapsed / 60)) : 0;
  const acc = typed.length ? Math.round((correct / typed.length) * 100) : 100;

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-label="Typing test" className="w-full max-w-2xl rounded-2xl border border-line bg-surface p-6 shadow-2xl" onClick={() => inputRef.current && inputRef.current.focus()}>
        <div className="mb-5 flex items-center justify-between font-mono text-xs text-mute">
          <span>typing test</span>
          <span className="tabular-nums">{wpm} wpm · {acc}% acc · {elapsed.toFixed(0)}s</span>
        </div>
        <p className="font-mono text-lg leading-8 sm:text-xl sm:leading-9" aria-hidden="true">
          {text.split("").map((ch, k) => {
            let cls = "text-mute";
            if (k < typed.length) cls = typed[k] === ch ? "text-fg" : "bad";
            return (
              <span key={k} className={cls + (k === typed.length && !done ? " caret" : "")}>
                {ch}
              </span>
            );
          })}
        </p>
        <input
          id="typing-input"
          ref={inputRef}
          value={typed}
          onChange={onChange}
          onKeyDown={onKey}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Type the text shown above"
          className="absolute h-0 w-0 opacity-0"
        />
        {done ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <p className="font-display text-4xl">
              {wpm} <span className="font-mono text-xs text-mute">words per minute · {acc}% accuracy</span>
            </p>
            <button onClick={restart} className="rounded-lg bg-accent px-3 py-1.5 font-mono text-xs text-accent-ink">try again</button>
          </div>
        ) : (
          <p className="mt-6 border-t border-line pt-4 font-mono text-xs text-mute">
            start typing · <kbd>tab</kbd> restart · <kbd>esc</kbd> close
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- app ---------------------------------- */
export default function App() {
  const [palette, setPalette] = useState(false);
  const [typing, setTyping] = useState(false);
  const [override, setOverride] = useState(null);
  const system = (() => {
    try {
      return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    } catch (e) {
      return "dark";
    }
  })();
  const theme = override || system;
  useEffect(() => {
    if (override) document.documentElement.setAttribute("data-theme", override);
  }, [override]);

  const toggleTheme = () => setOverride(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    const onKey = (e) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const k = e.key.toLowerCase();
      if (k === "k") {
        e.preventDefault();
        setTyping(false);
        setPalette((v) => !v);
      } else if (k === "j") {
        e.preventDefault();
        setPalette(false);
        setTyping((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = [
    ...NAV.map((s) => ({ label: "Go to " + s.label, hint: "section", run: () => jump(s.id) })),
    { label: "Go to certifications", hint: "section", run: () => jump("certs") },
    { label: "Go to github activity", hint: "section", run: () => jump("github") },
    { label: "Switch to " + (theme === "dark" ? "light" : "dark") + " theme", hint: "action", run: toggleTheme },
    { label: "Copy email address", hint: "action", run: () => { try { navigator.clipboard.writeText(DATA.email); } catch (e) { } } },
    { label: "Take the typing test", hint: (isMac() ? "⌘" : "Ctrl") + " J", run: () => setTyping(true) },
  ];

  return (
    <>
      <Header theme={theme} onTheme={toggleTheme} onPalette={() => setPalette(true)} />
      <main className="mx-auto max-w-3xl">
        <Hero />
        <Projects />
        <Experience />
        <Certs />
        <Quotes />
        <Activities />
        <Github />
        <Contact />
      </main>
      <footer className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 border-t border-line py-8 font-mono text-xs text-mute">
        <span>© 2026 {DATA.name}</span>
        <button onClick={() => setTyping(true)} className="transition-colors hover:text-fg">typing test ({isMac() ? "⌘" : "Ctrl"} J)</button>
      </footer>
      <Palette open={palette} onClose={() => setPalette(false)} items={items} />
      <TypingTest open={typing} onClose={() => setTyping(false)} />
    </>
  );
}


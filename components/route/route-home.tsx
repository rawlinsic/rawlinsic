"use client";
/* Home, "The Route": the Rawlins story as a ride through a transit system.
   Eight stops. A route bar shows where you are; every stop ends with
   "Next stop". Service areas are lines, services are stations, industries
   are transfer stations. Motion is CSS + scroll position: no 3D, no WebGL. */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  AREAS, CASES, HOME, LEADERS, NUMBERS, PROBLEMS, STORY, WHY,
  areaHref, caseHref, caseWho, industryHref, serviceById, serviceHref, subsectorHref,
} from "@/lib/content/site";
import { LINE, STOPS, TRANSFERS, stationCode } from "@/lib/content/route";
import { HOME_VIDEO } from "@/lib/content/media";
import USMap from "@/components/site/us-map";

const FEATURED = ["cs-transform", "cs-proficiency", "cs-strategic", "cs-major"];
const pad = (n: number) => String(n).padStart(2, "0");

/* scroll → progress for the route bar and for elements that animate with scroll */
function useRide(root: React.RefObject<HTMLDivElement | null>) {
  const [stop, setStop] = useState(0);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const tick = () => {
      const vh = window.innerHeight, line = vh * 0.55;
      const stops = Array.from(el.querySelectorAll<HTMLElement>("[data-stop]"));
      const tops = stops.map((st) => st.getBoundingClientRect().top);
      let s = 0;
      tops.forEach((t, i) => { if (t < line) s = i; });
      setStop((x) => (x === s ? x : s));
      /* the car reaches each stop's dot as that stop arrives, and moves
         between dots as you ride through it */
      const atEnd = window.scrollY + vh >= document.documentElement.scrollHeight - 4;
      const next = tops[s + 1];
      const f = atEnd ? 1 : next === undefined ? 0 : Math.max(0, Math.min(1, (line - tops[s]) / Math.max(1, next - tops[s])));
      const p = atEnd ? 1 : (s + f) / Math.max(1, stops.length - 1);
      el.style.setProperty("--ride", p.toFixed(4));
      el.querySelectorAll<HTMLElement>("[data-scrub]").forEach((n) => {
        const r = n.getBoundingClientRect();
        const q = reduce ? 1 : Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height * 0.4)));
        n.style.setProperty("--p", q.toFixed(4));
      });
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    /* reveal as things arrive */
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -12% 0px" });
    el.querySelectorAll("[data-in]").forEach((n) => io.observe(n));
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); io.disconnect(); };
  }, [root]);
  return stop;
}

const ride = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: reduce ? "auto" : "smooth" });
};

function NextStop({ to, label }: { to: string; label: string }) {
  return (
    <div className="rt-next" data-in>
      <button type="button" onClick={() => ride(to)} aria-label={`Next stop: ${label}`}>
        <span className="rt-next-k">Next stop</span>
        <span className="rt-next-track" aria-hidden="true"><i /></span>
        <span className="rt-next-l">{label}</span>
        <span className="rt-next-arrow" aria-hidden="true">↓</span>
      </button>
    </div>
  );
}

export default function RouteHome({ prod }: { prod: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const stop = useRide(root);
  const [problem, setProblem] = useState(0);
  const [state, setState] = useState<string | null>(null);
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);

  const mapCases = useMemo(() => CASES.filter((c) => c.states.length && (!prod || !c.needsSignoff)), [prod]);
  const states = useMemo(() => Array.from(new Set(mapCases.flatMap((c) => c.states))).sort(), [mapCases]);
  const stateCases = state ? mapCases.filter((c) => c.states.includes(state)) : [];

  return (
    <div className="rt" ref={root}>
      {/* route bar: where you are on the ride */}
      <nav className="rt-bar" aria-label="Your route">
        <span className="rt-bar-now"><b>Stop {stop + 1} of {STOPS.length}</b><span>{STOPS[stop].label}</span></span>
        <ol className="rt-bar-line">
          {STOPS.map((s, i) => (
            <li key={s.id}>
              <button type="button" onClick={() => ride(s.id)} aria-current={stop === i ? "step" : undefined} className={i < stop ? "is-past" : ""}>
                <span className="sr-only">{s.label}</span>
              </button>
            </li>
          ))}
          <span className="rt-bar-fill" aria-hidden="true" />
          <span className="rt-bar-car" aria-hidden="true" />
        </ol>
      </nav>

      {/* 01 · Departure */}
      <section id="departure" data-stop className="rt-dep" data-scrub>
        <div className="rt-wrap rt-dep-in">
          <div className="rt-dep-row">
            <div className="rt-dep-copy">
              <p className="rt-eyebrow" data-in>{HOME.eyebrow}</p>
              <h1 className="rt-display" data-in>{HOME.headline}</h1>
              <p className="rt-statement" data-in style={{ ["--d" as string]: "120ms" }}>{HOME.line}</p>
            </div>
            <div className="rt-board" data-in style={{ ["--d" as string]: "240ms" }} aria-label="Today's route">
              <p className="rt-board-h"><span>Today&apos;s route</span><span>Status</span></p>
              <ol>
                {STOPS.map((s, i) => (
                  <li key={s.id}>
                    <button type="button" onClick={() => ride(s.id)}>
                      <span className="rt-board-n">{pad(i + 1)}</span>
                      <span className="rt-board-l">{s.label}</span>
                      <span className="rt-board-s">{i === 0 ? "Boarding" : "On time"}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="rt-dep-media" aria-hidden="true">
          {still ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={HOME_VIDEO.poster} alt="" />
          ) : (
            <video autoPlay muted loop playsInline poster={HOME_VIDEO.poster}>
              <source src={HOME_VIDEO.webm} type="video/webm" />
              <source src={HOME_VIDEO.mp4} type="video/mp4" />
            </video>
          )}
        </div>
      </section>
      <NextStop to="the-people" label="We've done the job" />

      {/* 02 · The people */}
      <section id="the-people" data-stop className="rt-sec">
        <div className="rt-wrap rt-split">
          <div className="rt-sticky">
            <p className="rt-kicker" data-in><span>02</span> Our people</p>
            <h2 className="rt-h2 rt-serif" data-in>We&apos;ve done the job.</h2>
            <p className="rt-lead" data-in>{WHY[0][1]}</p>
            <dl className="rt-digits" data-in>
              {NUMBERS.filter((n) => n.verified || !prod).map((n) => (
                <div key={n.label} className={n.verified ? "" : "is-dev"}><dt>{n.label}</dt><dd>{n.value}</dd></div>
              ))}
            </dl>
            <a className="rt-link" href="/about/our-people">Meet everyone</a>
          </div>
          <ol className="rt-manifest">
            {LEADERS.map((p, i) => (
              <li key={p.name} data-in style={{ ["--d" as string]: `${(i % 4) * 60}ms` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/team/${p.photo}.webp`} alt="" width={64} height={64} loading="lazy" />
                <span><b>{p.name}</b><em>{p.role}</em></span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <NextStop to="start" label="Where are you starting from?" />

      {/* 03 · Where are you starting from? */}
      <section id="start" data-stop className="rt-sec rt-sec-ink">
        <div className="rt-wrap">
          <p className="rt-kicker" data-in><span>03</span> Plan your trip</p>
          <h2 className="rt-h2" data-in>Where are you starting from?</h2>
          <p className="rt-lead" data-in>Pick the one that sounds most like you. We&apos;ll draw your route.</p>
          <TripPlanner problem={problem} setProblem={setProblem} />
          <div className="rt-why" data-in>
            <p className="rt-kicker">Why ride with us</p>
            <ol>{WHY.map(([t, d], i) => <li key={t}><span>{pad(i + 1)}</span><b>{t}</b><em>{d}</em></li>)}</ol>
          </div>
        </div>
      </section>
      <NextStop to="lines" label="What we do" />

      {/* 04 · The lines */}
      <section id="lines" data-stop className="rt-sec">
        <div className="rt-wrap">
          <p className="rt-kicker" data-in><span>04</span> What we do</p>
          <h2 className="rt-h2" data-in>Five lines. Most trips use more than one.</h2>
          <div className="rt-lines">
            {AREAS.map((a) => (
              <article key={a.id} className="rt-lineblock" data-in data-scrub style={{ ["--c" as string]: LINE[a.id].color, ["--n" as string]: a.services.length }}>
                <header>
                  <span className="rt-bullet">{LINE[a.id].code}</span>
                  <div><h3><a href={areaHref(a)}>{a.name}</a></h3><p>{a.tag}</p></div>
                </header>
                <ol className="rt-stations">
                  {a.services.map((s, i) => (
                    <li key={s.id} style={{ ["--i" as string]: i }}>
                      <a href={`/services/${a.slug}/${s.slug}`}>
                        <span className="rt-dot" aria-hidden="true" />
                        <span className="rt-code">{LINE[a.id].code}{i + 1}</span>
                        <span className="rt-name">{s.name}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>
      <NextStop to="transfers" label="Who we work with" />

      {/* 05 · Transfer stations */}
      <section id="transfers" data-stop className="rt-sec rt-sec-panel">
        <div className="rt-wrap">
          <p className="rt-kicker" data-in><span>05</span> Who we work with</p>
          <h2 className="rt-h2" data-in>Transfer stations: where the lines meet.</h2>
          <ul className="rt-transfers">
            {TRANSFERS.map(({ industry: ind, lines }, k) => (
              <li key={ind.id} data-in style={{ ["--d" as string]: `${k * 80}ms` }}>
                <a href={industryHref(ind)} className="rt-transfer">
                  <span className="rt-transfer-ring" aria-hidden="true" />
                  <b>{ind.name}</b>
                  <em>{ind.who}</em>
                  <span className="rt-served" aria-label={`Lines: ${lines.map((l) => LINE[l].short).join(", ")}`}>
                    {lines.map((l) => <i key={l} style={{ background: LINE[l].color }}>{LINE[l].code}</i>)}
                  </span>
                </a>
                {ind.subsectors.length > 0 && (
                  <ul className="rt-substops">{ind.subsectors.map((s) => <li key={s.id}><a href={subsectorHref(ind, s)}>{s.name}</a></li>)}</ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <NextStop to="proof" label="The proof" />

      {/* 06 · The proof */}
      <section id="proof" data-stop className="rt-sec">
        <div className="rt-wrap rt-proof">
          <div>
            <p className="rt-kicker" data-in><span>06</span> The proof</p>
            <h2 className="rt-h2" data-in>Every stop on this map is work we&apos;ve done.</h2>
            <p className="rt-lead" data-in>Pick a state to see the work behind it.</p>
            <div className="rt-chips" role="group" aria-label="States with case studies">
              {states.map((s) => <button key={s} type="button" aria-pressed={state === s} onClick={() => setState(state === s ? null : s)}>{s}</button>)}
            </div>
            <ul className="rt-cases" aria-live="polite">
              {(state ? stateCases : FEATURED.map((id) => CASES.find((c) => c.id === id)!)).map((c) => (
                <li key={c.id}><a href={caseHref(c)}><b>{c.title}</b><span>{caseWho(c, prod)} · {c.status === "Ongoing" ? "In the works" : "Completed"}</span></a></li>
              ))}
            </ul>
            <a className="rt-link" href="/insights/case-studies">All case studies</a>
          </div>
          <div className="rt-mapbox" data-in>
            <USMap lit={states} active={state} onPick={(s) => setState(state === s ? null : s)} label="Map of the states where we've done the work" />
          </div>
        </div>
      </section>
      <NextStop to="extension" label="Where we're headed" />

      {/* 07 · Line extension */}
      <section id="extension" data-stop className="rt-sec rt-sec-ink">
        <div className="rt-wrap">
          <p className="rt-kicker" data-in><span>07</span> How we&apos;ve grown</p>
          <h2 className="rt-h2" data-in>Where we&apos;re headed.</h2>
          <ol className="rt-extension" data-scrub style={{ ["--n" as string]: STORY.length }}>
            {STORY.map(([k, t, d], i) => (
              <li key={k} data-in style={{ ["--d" as string]: `${i * 120}ms` }} className={i === STORY.length - 1 ? "is-new" : ""}>
                <span className="rt-dot" aria-hidden="true" />
                <span className="rt-code">{k}</span>
                <b>{t}</b>
                <em>{d}</em>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <NextStop to="arrival" label="Get in touch" />

      {/* 08 · Arrival */}
      <section id="arrival" data-stop className="rt-sec rt-arrival">
        <div className="rt-wrap">
          <p className="rt-kicker" data-in><span>08</span> Final stop</p>
          <h2 className="rt-display rt-serif" data-in>Tell us what you&apos;re trying to fix.</h2>
          <p className="rt-lead" data-in>You&apos;ll talk with people who have done the job, and we&apos;ll tell you plainly where we can help.</p>
          <div className="rt-btns" data-in>
            <a className="rt-btn rt-btn-primary" href="/contact">Get in touch</a>
            <a className="rt-btn" href="mailto:info@rawlinsic.com">info@rawlinsic.com</a>
            <a className="rt-btn" href="tel:+17758433822">(775) 843-3822</a>
          </div>
          {!prod && <p className="pg-dev pg-dev-block">Placeholder (dev only): News &amp; Recognition, latest 2 posts + next event.</p>}
        </div>
      </section>
    </div>
  );
}

/* Trip planner: pick a problem, the route draws to the services that answer it */
function TripPlanner({ problem, setProblem }: { problem: number; setProblem: (i: number) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const from = useRef<(HTMLButtonElement | null)[]>([]);
  const to = useRef<(HTMLAnchorElement | null)[]>([]);
  const [paths, setPaths] = useState<{ d: string; c: string }[]>([]);
  const dest = PROBLEMS[problem].services.map((id) => serviceById(id)).filter(Boolean) as NonNullable<ReturnType<typeof serviceById>>[];

  useLayoutEffect(() => {
    const draw = () => {
      const b = box.current, a = from.current[problem];
      if (!b || !a || window.innerWidth < 900) { setPaths([]); return; }
      const R = b.getBoundingClientRect(), r1 = a.getBoundingClientRect();
      const x1 = r1.right - R.left, y1 = r1.top + r1.height / 2 - R.top;
      setPaths(dest.map((h, i) => {
        const t = to.current[i];
        if (!t) return { d: "", c: "" };
        const r2 = t.getBoundingClientRect();
        const x2 = r2.left - R.left, y2 = r2.top + r2.height / 2 - R.top, mx = (x1 + x2) / 2;
        return { d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, c: LINE[h.area.id].color };
      }));
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem]);

  return (
    <div className="rt-trip" ref={box} data-in>
      <ol className="rt-from" role="group" aria-label="Problems">
        {PROBLEMS.map((p, i) => (
          <li key={p.q}>
            <button type="button" ref={(el) => { from.current[i] = el; }} aria-pressed={problem === i} onClick={() => setProblem(i)}>
              <span className="rt-dot" aria-hidden="true" />{p.q}
            </button>
          </li>
        ))}
      </ol>
      <svg className="rt-trip-svg" aria-hidden="true" key={problem}>
        {paths.map((p, i) => p.d && <path key={i} d={p.d} style={{ stroke: p.c, animationDelay: `${i * 120}ms` }} />)}
      </svg>
      <div className="rt-to" aria-live="polite">
        <p className="rt-to-h">Your route</p>
        <ol key={problem}>
          {dest.map((h, i) => (
            <li key={h.service.id} style={{ ["--c" as string]: LINE[h.area.id].color, ["--d" as string]: `${200 + i * 140}ms` }}>
              <a href={serviceHref(h.service.id)} ref={(el) => { to.current[i] = el; }}>
                <span className="rt-bullet">{stationCode(h.service.id)}</span>
                <span><b>{h.service.name}</b><em>{h.area.name} line</em></span>
              </a>
            </li>
          ))}
        </ol>
        <a className="rt-btn rt-btn-primary" href={serviceHref(PROBLEMS[problem].services[0])}>Ride this route</a>
      </div>
    </div>
  );
}

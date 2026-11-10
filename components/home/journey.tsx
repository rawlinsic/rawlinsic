"use client";
/* Home: the Rawlins story as a journey in eight chapters.
   Photo version (default): the live site's hero video, then one photo per
   scene, crossfading as you scroll, and a flat U.S. map for the proof.
   3D version (?view=3d on preview deployments): one real-time world the
   camera flies through, with the blue line drawing itself through every scene.
   All text is real HTML (readable, indexable, works with no WebGL). */
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AREAS, CASES, HOME, LEADERS, NUMBERS, PROBLEMS, STORY, VISIBLE_INDUSTRIES, WHY,
  areaHref, caseHref, industryHref, serviceById, serviceHref, subsectorHref,
} from "@/lib/content/site";
import { getWorld, setJourneyOwner, setWorldLayer } from "@/components/world/host";
import { want3D } from "@/components/site/scene-mode";
import { STATION_PHOTO } from "@/lib/content/media";
import USMap from "@/components/site/us-map";

/* Chapter → stations (must match SEQ in components/world/engine.ts) */
const CHAPTERS = [
  { id: "who-we-are", label: "Who we are", stations: ["hero0", "hero1"], pinned: 230, tone: "dawn" },
  { id: "our-people", label: "We've done the job", stations: ["people0", "people1"], pinned: 0, tone: "day" },
  { id: "fix", label: "What are you trying to fix?", stations: ["grid0", "grid1"], pinned: 0, tone: "calm" },
  { id: "what-we-do", label: "What we do", stations: ["capitol", "construction", "dusk", "network", "drone"], pinned: 5 * 78 + 70, tone: "day" },
  { id: "who-we-work-with", label: "Who we work with", stations: ["rural", "crossing", "airport", "rail", "harbor", "street", "site", "office"], pinned: 8 * 62 + 70, tone: "day" },
  { id: "proof", label: "The proof", stations: ["map0", "map1"], pinned: 0, tone: "high" },
  { id: "headed", label: "Where we're headed", stations: ["rise0", "rise1", "rise2", "rise3"], pinned: 4 * 80 + 70, tone: "high" },
  { id: "get-in-touch", label: "Get in touch", stations: ["globe0", "globe1"], pinned: 170, tone: "calm" },
] as const;
const SEQ_LEN = CHAPTERS.reduce((n, c) => n + c.stations.length, 0);
const SEQ_LIST: string[] = CHAPTERS.flatMap((c) => [...c.stations]);
const START: number[] = [];
CHAPTERS.reduce((n, c, i) => { START[i] = n; return n + c.stations.length; }, 0);
const TRANSITION = 0.2; // share of a chapter's scroll spent moving into the next one

/* Who we work with: five Transportation sub-sectors, then the other industries */
const transport = VISIBLE_INDUSTRIES.find((i) => i.id === "transport")!;
const WHO_SCENES = [
  ...transport.subsectors.map((s) => ({ key: s.id, kicker: "Transportation", name: s.name, line: s.line, who: transport.who, href: subsectorHref(transport, s), thin: s.thin })),
  ...VISIBLE_INDUSTRIES.filter((i) => i.id !== "transport").map((i) => ({ key: i.id, kicker: "Industry", name: i.name, line: i.lead, who: i.who, href: industryHref(i), thin: false })),
];

const FEATURED = ["cs-transform", "cs-proficiency", "cs-strategic", "cs-major"];

export default function Journey({ prod }: { prod: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const sections = useRef<(HTMLElement | null)[]>([]);
  const [chapter, setChapter] = useState(0);
  const [tone, setTone] = useState<string>("dawn");
  const [problem, setProblem] = useState<number | null>(null);
  const [state, setState] = useState<string | null>(null);
  const worldRef = useRef<Awaited<ReturnType<typeof getWorld>>>(null);
  const gRef = useRef(0);
  const [three, setThree] = useState(false);
  const [station, setStation] = useState("hero0");

  /* Cases with a state go on the map (unnamed clients have no state) */
  const mapCases = useMemo(() => CASES.filter((c) => c.states.length), []);
  const states = useMemo(() => Array.from(new Set(mapCases.flatMap((c) => c.states))).sort(), [mapCases]);
  /* home shows the six most recent; the full list lives on the case studies page */
  const inTheWorks = useMemo(() => CASES.filter((c) => c.status === "Ongoing").slice(0, 6), []);

  /* scroll → chapter progress → world position */
  const measure = useCallback(() => {
    const vh = window.innerHeight, y = window.scrollY;
    const els = sections.current;
    let g = 0, active = 0;
    for (let i = 0; i < CHAPTERS.length; i++) {
      const el = els[i];
      if (!el) continue;
      const top = el.offsetTop, h = el.offsetHeight;
      const start = (k: number) => {
        const e = els[k]!;
        return k === 0 ? 0 : CHAPTERS[k].pinned ? e.offsetTop : e.offsetTop - vh * 0.5;
      };
      const s0 = start(i);
      const next = els[i + 1];
      const s1 = next ? start(i + 1) : top + h - vh;
      const p = Math.max(0, Math.min(1, (y - s0) / Math.max(1, s1 - s0)));
      if (y >= s0 || i === 0) {
        active = i;
        const n = CHAPTERS[i].stations.length, last = i === CHAPTERS.length - 1;
        const inner = last ? 1 : 1 - TRANSITION;
        g = p <= inner ? START[i] + (p / inner) * (n - 1) : START[i] + (n - 1) + (p - inner) / TRANSITION;
      }
      /* pinned chapters: local progress for their own animation */
      if (CHAPTERS[i].pinned) {
        const lp = Math.max(0, Math.min(1, (y - top) / Math.max(1, h - vh)));
        el.style.setProperty("--p", lp.toFixed(4));
      }
    }
    g = Math.max(0, Math.min(SEQ_LEN - 1, g));
    gRef.current = g;
    root.current?.style.setProperty("--g", g.toFixed(4));
    for (let i = 0; i < CHAPTERS.length; i++) {
      const el = els[i];
      if (el && CHAPTERS[i].pinned) el.style.setProperty("--g", Math.max(-1, Math.min(CHAPTERS[i].stations.length, g - START[i])).toFixed(4));
    }
    setChapter((c) => (c === active ? c : active));
    setTone((t) => (t === CHAPTERS[active].tone ? t : CHAPTERS[active].tone));
    const st = SEQ_LIST[Math.min(SEQ_LIST.length - 1, Math.round(g))];
    setStation((x) => (x === st ? x : st));
    worldRef.current?.setJourney(g);
  }, []);

  useEffect(() => { setThree(want3D()); }, []);

  useEffect(() => {
    setJourneyOwner(three);
    if (three) document.documentElement.dataset.world = "journey";
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    measure();
    /* load the 3D world after first paint, when the browser is idle */
    const idle = (cb: () => void) => ("requestIdleCallback" in window ? (window as any).requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 600));
    let alive = true;
    if (three) idle(() => {
      getWorld().then((w) => {
        if (!alive || !w) return;
        worldRef.current = w;
        if (document.documentElement.dataset.world !== "menu") setWorldLayer("journey");
        w.setJourney(gRef.current);
        root.current?.classList.add("has-world");
      });
    });
    /* stop rendering when the journey is off screen (footer) */
    const io = new IntersectionObserver(([e]) => {
      root.current?.classList.toggle("is-out", !e.isIntersecting);
      const w = worldRef.current;
      if (!w || document.documentElement.dataset.world === "menu") return;
      if (e.isIntersecting) w.start(); else w.stop();
    }, { rootMargin: "0px 0px -20% 0px" });
    if (root.current) io.observe(root.current);
    return () => {
      alive = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      setJourneyOwner(false);
      if (three) setWorldLayer("off");
    };
  }, [measure, three]);

  /* proof: highlight states on the map */
  useEffect(() => {
    worldRef.current?.highlightStates(states, state);
  }, [states, state, chapter]);

  const go = (i: number) => {
    const el = sections.current[i];
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: i === 0 ? 0 : el.offsetTop + 2, behavior: reduce ? "auto" : "smooth" });
  };
  const openMenu = () => window.dispatchEvent(new CustomEvent("rawlins:menu", { detail: { open: true } }));
  const setSec = (i: number) => (el: HTMLElement | null) => { sections.current[i] = el; };

  const sel = problem === null ? null : PROBLEMS[problem];
  const stateCases = state ? mapCases.filter((c) => c.states.includes(state)) : [];

  return (
    <div className="jy" ref={root} data-tone={tone} data-chapter={chapter}>
      <div className="jy-backdrop" aria-hidden="true" />
      {!three && <JourneyPhotos station={station} lit={states} active={state} onPick={(s) => setState(state === s ? null : s)} />}

      {/* Chapter rail + skip */}
      <nav className="jy-rail" aria-label="Chapters">
        <ol>
          {CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <button type="button" onClick={() => go(i)} aria-current={chapter === i ? "step" : undefined}>
                <span className="jy-rail-dot" aria-hidden="true" />
                <span className="jy-rail-label">{c.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <button type="button" className="jy-skip" onClick={openMenu}>Skip to menu</button>

      {/* 1 · Who we are */}
      <section ref={setSec(0)} id="who-we-are" className="jy-ch jy-pinned jy-hero" style={{ height: `${CHAPTERS[0].pinned}svh` }} aria-labelledby="jy-h1">
        <div className="jy-sticky">
          <div className="jy-hero-inner">
            <p className="jy-eyebrow">{HOME.eyebrow}</p>
            <h1 id="jy-h1" className="jy-h1">{HOME.headline}</h1>
            <p className="jy-line">{HOME.line}</p>
            <div className="jy-btns">
              <a className="jy-btn jy-btn-primary" href="#fix" onClick={(e) => { e.preventDefault(); go(2); }}>What are you trying to fix?</a>
              <a className="jy-btn" href="/contact">Get in touch</a>
            </div>
          </div>
          <p className="jy-cue" aria-hidden="true"><span />Scroll</p>
        </div>
      </section>

      {/* 2 · We've done the job */}
      <section ref={setSec(1)} id="our-people" className="jy-ch jy-flow" aria-labelledby="jy-people">
        <div className="jy-wrap">
          <div className="jy-panel jy-intro">
            <p className="jy-kicker"><span>02</span> Our people</p>
            <h2 id="jy-people" className="jy-statement">We&apos;ve done the job.</h2>
            <p className="jy-lead">{WHY[0][1]}</p>
          </div>
          <Numbers prod={prod} />
          <div className="jy-drift" aria-label="Former roles on our team">
            {[LEADERS.filter((_, i) => i % 2 === 0), LEADERS.filter((_, i) => i % 2 === 1)].map((row, r) => (
              <div className={`jy-drift-row${r ? " jy-drift-rev" : ""}`} key={r}>
                <ul>
                  {[...row, ...row].map((p, i) => (
                    <li key={`${p.name}-${i}`} className="jy-face" aria-hidden={i >= row.length ? true : undefined}>
                      <Image src={`/images/team/${p.photo}.webp`} alt="" width={72} height={72} />
                      <span><b>{p.name}</b><em>{p.role}</em></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <a className="jy-more" href="/about/our-people">Meet our people</a>
        </div>
      </section>

      {/* 3 · What are you trying to fix? + Why Rawlins */}
      <section ref={setSec(2)} id="fix" className="jy-ch jy-flow" aria-labelledby="jy-fix">
        <div className="jy-wrap">
          <div className="jy-panel jy-picker">
            <p className="jy-kicker"><span>03</span> Start with the problem</p>
            <h2 id="jy-fix" className="jy-h2">What are you trying to fix?</h2>
            <div className="jy-problems" role="group" aria-label="Pick the one that sounds most like you">
              {PROBLEMS.map((p, i) => (
                <button key={p.q} type="button" className="jy-problem" aria-pressed={problem === i} onClick={() => setProblem(problem === i ? null : i)}>
                  {p.q}
                </button>
              ))}
            </div>
            <div className="jy-answer" aria-live="polite">
              {sel ? (
                <>
                  <p className="jy-answer-q">Where to start:</p>
                  <ul>
                    {sel.services.map((id) => {
                      const hit = serviceById(id);
                      return hit ? (
                        <li key={id}><a href={serviceHref(id)}><b>{hit.service.name}</b><span>{hit.area.name}</span></a></li>
                      ) : null;
                    })}
                  </ul>
                </>
              ) : (
                <p className="jy-answer-hint">Pick the one that sounds most like you. We&apos;ll show you where to start.</p>
              )}
            </div>
          </div>
          <div className="jy-panel jy-why">
            <p className="jy-kicker">Why Rawlins</p>
            <ol>
              {WHY.map(([t, d], i) => (
                <li key={t}><span className="jy-why-n">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{d}</p></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 4 · What we do: five quick scenes */}
      <section ref={setSec(3)} id="what-we-do" className="jy-ch jy-pinned jy-pass" style={{ height: `${CHAPTERS[3].pinned}svh` }} aria-labelledby="jy-what">
        <div className="jy-sticky">
          <div className="jy-pass-head">
            <p className="jy-kicker"><span>04</span> What we do</p>
            <h2 id="jy-what" className="jy-h2">Five ways we help.</h2>
          </div>
          <ol className="jy-track" style={{ ["--n" as string]: AREAS.length }}>
            {AREAS.map((a, i) => (
              <li key={a.id} className="jy-card" style={{ ["--i" as string]: i }}>
                <p className="jy-card-n">{String(i + 1).padStart(2, "0")}</p>
                <h3>{a.name}</h3>
                <p className="jy-card-tag">{a.tag}</p>
                <ul>{a.services.slice(0, 4).map((s) => <li key={s.id}>{s.name}</li>)}</ul>
                <a href={areaHref(a)} className="jy-card-link">Explore {a.name}</a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · Who we work with */}
      <section ref={setSec(4)} id="who-we-work-with" className="jy-ch jy-pinned jy-pass" style={{ height: `${CHAPTERS[4].pinned}svh` }} aria-labelledby="jy-who">
        <div className="jy-sticky">
          <div className="jy-pass-head">
            <p className="jy-kicker"><span>05</span> Who we work with</p>
            <h2 id="jy-who" className="jy-h2">Built inside public agencies. Useful anywhere.</h2>
          </div>
          <ol className="jy-track" style={{ ["--n" as string]: WHO_SCENES.length }}>
            {WHO_SCENES.map((s, i) => (
              <li key={s.key} className="jy-card" style={{ ["--i" as string]: i }}>
                <p className="jy-card-n">{s.kicker}</p>
                <h3>{s.name}</h3>
                <p>{s.line}</p>
                <p className="jy-card-who">{s.who}</p>
                {s.thin && !prod && <span className="jy-dev">Placeholder: thin content, build out</span>}
                <a href={s.href} className="jy-card-link">See {s.name}</a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 · The proof */}
      <section ref={setSec(5)} id="proof" className="jy-ch jy-flow jy-proof" aria-labelledby="jy-proof">
        <div className="jy-wrap">
          <div className="jy-proof-space" aria-hidden="true" />
          <div className="jy-panel">
            <p className="jy-kicker"><span>06</span> The proof</p>
            <h2 id="jy-proof" className="jy-h2">Where we&apos;ve done the work.</h2>
            <p className="jy-lead">Pick a state to see the work behind it.</p>
            <div className="jy-states" role="group" aria-label="States with case studies">
              {states.map((s) => (
                <button key={s} type="button" aria-pressed={state === s} onClick={() => setState(state === s ? null : s)}>{s}</button>
              ))}
            </div>
            <div aria-live="polite">
              {state && (
                <ul className="jy-cases">
                  {stateCases.map((c) => (
                    <li key={c.id}>
                      <a href={caseHref(c)}>
                        <b>{c.title}</b>
                        <span>{c.who} · {c.status}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="jy-panel">
            <h3 className="jy-h3">Featured work</h3>
            <ul className="jy-cases jy-cases-grid">
              {FEATURED.map((id) => CASES.find((c) => c.id === id)!).map((c) => (
                <li key={c.id}><a href={caseHref(c)}><b>{c.title}</b><span>{c.who}</span></a></li>
              ))}
            </ul>
          </div>
          <div className="jy-panel">
            <h3 className="jy-h3">In the works</h3>
            <ul className="jy-works">
              {inTheWorks.map((c) => (
                <li key={c.id}>
                  <b>{c.title}</b>
                  <span>{c.who}</span>
                </li>
              ))}
            </ul>
            <a className="jy-more" href="/insights/case-studies">All case studies</a>
          </div>
        </div>
      </section>

      {/* 7 · Where we're headed */}
      <section ref={setSec(6)} id="headed" className="jy-ch jy-pinned jy-rise" style={{ height: `${CHAPTERS[6].pinned}svh` }} aria-labelledby="jy-headed">
        <div className="jy-sticky">
          <div className="jy-rise-inner">
            <p className="jy-kicker"><span>07</span> How we&apos;ve grown</p>
            <h2 id="jy-headed" className="jy-h2">Where we&apos;re headed.</h2>
            <ol className="jy-beats">
              {STORY.map(([k, t, d], i) => (
                <li key={k} style={{ ["--i" as string]: i }}>
                  <p className="jy-beat-k">{k}</p>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 8 · Finale */}
      <section ref={setSec(7)} id="get-in-touch" className="jy-ch jy-pinned jy-finale" style={{ height: `${CHAPTERS[7].pinned}svh` }} aria-labelledby="jy-end">
        <div className="jy-sticky">
          <div className="jy-finale-inner">
            <p className="jy-kicker"><span>08</span> Get in touch</p>
            <h2 id="jy-end" className="jy-statement">Tell us what you&apos;re trying to fix.</h2>
            {/* TODO(Nicole): line to come from Nicole (the "tell you plainly where we can help" line was removed, Nov 9). This old home isn't used by the site. */}
            <div className="jy-btns">
              <a className="jy-btn jy-btn-primary" href="/contact">Get in touch</a>
              <button type="button" className="jy-btn" onClick={openMenu}>Explore the site</button>
            </div>
            {!prod && <p className="jy-dev jy-dev-block">Placeholder (dev only): News &amp; Recognition, latest 2 posts + next event, goes here before contact.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}

/* Numbers count up once. Unverified numbers never reach production. */
function Numbers({ prod }: { prod: boolean }) {
  const ref = useRef<HTMLUListElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <ul className="jy-numbers" ref={ref}>
      {NUMBERS.filter((n) => n.verified || !prod).map((n) => (
        <li key={n.label} className={n.verified ? "" : "is-dev"}>
          <b>{n.count && run ? <Count to={n.count} suffix={n.suffix ?? ""} /> : n.value}</b>
          <span>{n.label}</span>
          {!n.verified && <em className="jy-dev">Placeholder until verified</em>}
        </li>
      ))}
    </ul>
  );
}
function Count({ to, suffix }: { to: number; suffix: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    let raf = 0; const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1300);
      setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v}{suffix}</>;
}

/* Photo version backdrop: one photo per scene with a crossfade (the old hero
   video is no longer used), and the flat map for "The proof". */
function JourneyPhotos({ station, lit, active, onPick }: { station: string; lit: string[]; active: string | null; onPick: (s: string) => void }) {
  const src = STATION_PHOTO[station] ?? STATION_PHOTO.hero0;
  const [layers, setLayers] = useState<string[]>([src]);
  useEffect(() => {
    setLayers((l) => (l[l.length - 1] === src ? l : [...l.slice(-1), src]));
  }, [src]);
  const isHero = station === "hero0" || station === "hero1";
  return (
    <div className={`jy-photos${isHero ? " is-hero" : ""}`} aria-hidden={src === "map" ? undefined : true}>
      {layers.map((l, i) => l === "map" ? (
        <div key={l + i} className="jy-photo jy-map-layer"><USMap lit={lit} active={active} onPick={onPick} label="Map of the states where we've done the work. Pick a state below to see the work behind it." /></div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={l + i} className="jy-photo" src={l} alt="" decoding="async" />
      ))}
    </div>
  );
}

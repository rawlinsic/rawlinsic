"use client";
/* Meet the team (Who we are). Everyone's face on one wall, on navy. While the
   section holds and you scroll, a spotlight steps through the people who ran
   agency programs: a big, readable card with their photo, name, Rawlins title,
   and the agency role they held, and their face on the wall lights up. Every
   face is a link to that person on Our people. Phones and reduced motion get
   the spotlight people as a row of cards you can swipe, then the wall. */
import { useEffect, useRef } from "react";

export type WallPerson = { slug: string; name: string; photo?: string; role: string; formerly?: string };

export default function TeamWall({ people, spot }: { people: WallPerson[]; spot: WallPerson[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".tw-spot"));
    const bars = Array.from(el.querySelectorAll<HTMLElement>(".tw-bars i"));
    const faces = new Map(Array.from(el.querySelectorAll<HTMLElement>(".tw-face")).map((f) => [f.dataset.slug!, f]));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, cur = -1, live = false;
    const show = (k: number) => {
      if (k === cur) return;
      cur = k;
      cards.forEach((c, i) => c.classList.toggle("is-on", i === k));
      bars.forEach((b, i) => b.classList.toggle("is-on", i === k));
      faces.forEach((f) => f.classList.remove("is-on"));
      faces.get(cards[k]?.dataset.slug ?? "")?.classList.add("is-on");
      el.style.setProperty("--tw-k", String(k));
    };
    const tick = () => {
      raf = 0;
      if (!live) return;
      const r = el.getBoundingClientRect();
      const hold = Math.max(0, Math.min(0.999, -r.top / Math.max(1, el.offsetHeight - window.innerHeight)));
      el.style.setProperty("--tw-p", hold.toFixed(4));
      show(Math.floor(hold * cards.length));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const mode = () => {
      live = window.innerWidth >= 960 && !reduce.matches;
      if (live) { delete el.dataset.static; cur = -1; tick(); }
      else { el.dataset.static = ""; cards.forEach((c) => c.classList.add("is-on")); faces.forEach((f) => f.classList.remove("is-on")); }
    };
    mode();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", mode);
    reduce.addEventListener?.("change", mode);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", mode); reduce.removeEventListener?.("change", mode); cancelAnimationFrame(raf); };
  }, []);

  const href = (p: WallPerson) => `/about/our-people#${p.slug}`;
  return (
    <section ref={ref} className="tw" data-nofill aria-labelledby="tw-h" style={{ ["--tw-n" as string]: spot.length }}>
      <div className="tw-stage">
        <div className="v8-wrap tw-in">
          <div className="tw-copy">
            <p className="v8-eyebrow">Our people</p>
            <h2 id="tw-h" className="v8-h2">Meet the team</h2>
            <p className="v8-lead">More than 25 of our people built their careers inside public agencies. They work next to the specialists who build the tools.</p>
            <a className="v8-btn v8-btn-glow" href="/about/our-people">Meet everyone</a>
            <span className="tw-bars" aria-hidden="true">{spot.map((p) => <i key={p.slug} />)}</span>
          </div>
          <div className="tw-board">
            <ul className="tw-wall" aria-label="Everyone at Rawlins">
              {people.map((p) => (
                <li key={p.slug}>
                  <a className="tw-face" data-slug={p.slug} href={href(p)} title={`${p.name}, ${p.role}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {p.photo ? <img src={p.photo} alt={p.name} loading="lazy" /> : <span>{p.name.slice(0, 1)}</span>}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="tw-spots" aria-label="Some of the people who ran agency programs">
              {spot.map((p, i) => (
                <li key={p.slug} className={`tw-spot${i ? "" : " is-on"}`} data-slug={p.slug}>
                  <a href={href(p)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {p.photo && <img src={p.photo} alt="" loading="lazy" />}
                    <span className="tw-spot-txt">
                      <b>{p.name}</b>
                      <span className="tw-role">{p.role}</span>
                      {p.formerly && <span className="tw-former">{p.formerly}</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

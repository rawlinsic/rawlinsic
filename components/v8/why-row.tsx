"use client";
/* "What sets us apart" as its own row: the same row the home page's scroll story has (Nicole, Nov 11: "the why
   Rawlins part on this page should be the same row copied from the home page"). The section holds while you
   scroll through the reasons, one per scroll: the words on the right, that reason's picture in the glass frame on
   the left, with the same ticker, count, and skip button. The pictures are the home page's own (see
   components/v8/why-items.tsx), and they keep the home story's classes (.hs-pan ...) so they look the same.
   Phones and reduced motion get the reasons stacked. */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { glideTo } from "@/components/v8/smooth";
import { docTop, pinnedOffset } from "@/components/v8/panels";
import type { StoryItem } from "@/components/v8/hero-story";

const PER = 0.8; // screen heights of scrolling per reason
const PW = 720, PH = 500; // the frame's pictures are laid out at this size, then scaled to fit (as on home)
const two = (n: number) => String(n).padStart(2, "0");

export default function WhyRow({ k = "What sets us apart", items }: { k?: string; items: StoryItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const [live, setLive] = useState(false);
  const n = items.length;

  useEffect(() => {
    const el = ref.current, fr = frame.current;
    if (!el || !fr) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, on = false;
    const fit = () => fr.style.setProperty("--fit", Math.min(fr.clientWidth / PW, fr.clientHeight / PH).toFixed(4));
    const tick = () => {
      raf = 0;
      if (!on) return;
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = Math.max(0, Math.min(1, (pinnedOffset() - el.getBoundingClientRect().top) / total));
      setCur(Math.max(0, Math.min(n - 1, Math.floor(p * n))));
    };
    const scroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const mode = () => { on = window.innerWidth >= 960 && !reduce.matches; setLive(on); if (on) { fit(); tick(); } };
    mode();
    const ro = new ResizeObserver(() => { if (on) fit(); });
    ro.observe(fr);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", mode);
    reduce.addEventListener?.("change", mode);
    return () => { ro.disconnect(); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", mode); reduce.removeEventListener?.("change", mode); cancelAnimationFrame(raf); };
  }, [n]);

  /* the ticker jumps to a reason; skip goes to the section after this one */
  const go = (j: number) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    glideTo(docTop(el) - pinnedOffset() + ((j + 0.4) / n) * total);
  };
  const skip = () => {
    const el = ref.current;
    if (!el) return;
    let nx = el.nextElementSibling as HTMLElement | null;
    while (nx && nx.matches(".sn, [data-nopanel]")) nx = nx.nextElementSibling as HTMLElement | null;
    glideTo(nx ? Math.max(0, docTop(nx) - pinnedOffset() + 1) : docTop(el) + el.offsetHeight);
  };

  return (
    <section ref={ref} className="wr" data-nofill data-static={live ? undefined : ""} aria-label={k || "What sets us apart"} style={{ ["--wr-len" as string]: `calc(100vh + ${Math.round(n * PER * 100)}vh)` } as CSSProperties}>
      <div className="wr-stage">
        <div className="wr-in">
          <div className="wr-frame" ref={frame} aria-hidden={live ? undefined : "true"}>
            <div className="hs-pans">
              {items.map((it, j) => (
                <div key={j} className={`hs-pan${j === cur ? " is-on" : ""}`} data-show={j === cur ? "" : undefined} style={{ opacity: j === cur ? 1 : 0, visibility: j === cur ? "visible" : "hidden" }}>
                  <div className="hs-pan-in">{it.visual}</div>
                </div>
              ))}
            </div>
            <i className="wr-glass" aria-hidden="true" />
          </div>
          <div className="wr-copy">
            {k && <p className="hs-k">{k}</p>}
            <div className="wr-items">
              {items.map((it, j) => (
                <div key={j} className={`wr-item${j === cur ? " is-on" : ""}`} aria-hidden={live && j !== cur ? "true" : undefined}>
                  <h3>{it.h}</h3>
                  <p>{it.p}</p>
                  {it.link && <a className="v8-btn v8-btn-light hs-btn" href={it.link.href} tabIndex={live && j !== cur ? -1 : undefined}>{it.link.label}</a>}
                  {it.phoneVisual && <div className="wr-item-vis">{it.phoneVisual}</div>}
                </div>
              ))}
            </div>
            <div className="hs-tick wr-tick">
              <ol aria-label={`${k}, ${n} in all`}>
                {items.map((it, j) => (
                  <li key={j}><button type="button" className="hs-tick-b" onClick={() => go(j)} aria-current={j === cur ? "step" : "false"} aria-label={`${j + 1} of ${n}: ${it.h}`} style={{ ["--f" as string]: j <= cur ? 1 : 0 } as CSSProperties}><i /></button></li>
                ))}
              </ol>
              <span className="hs-count" aria-hidden="true">{two(cur + 1)} / {two(n)}</span>
              <button type="button" className="skip hs-skip" onClick={skip}>
                Skip to the next section
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

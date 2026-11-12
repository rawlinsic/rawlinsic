"use client";
/* Words that light up one by one as they scroll into place (scale.com's
   stat card, in our colors). Give it one sentence (text) or several quotes
   (lines); with lines, the words light across all of them in order. Inside
   a held scroll scene it follows the scene instead, so the words light
   while the section stands still. Screen readers get the plain text;
   reduced motion shows it fully lit. With notes, each quote card carries a
   short line under it (the area pages' "What we bring"); notes don't light. */
import { useEffect, useRef, type RefObject } from "react";
import { docTop } from "@/components/v8/panels";

const words = (s: string, from: number) => s.split(" ").map((w, i) => <span key={from + i} className="lit-w">{w} </span>);

export default function LitText({ text, lines, notes, noteLabel, as: Tag = "p", className, manual = false }: { text?: string; lines?: string[]; notes?: (string | undefined)[]; noteLabel?: string; as?: "p" | "h2" | "div"; className?: string; manual?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || manual) return; // manual: the scroll story around it lights the words
    const ws = Array.from(el.querySelectorAll<HTMLElement>(".lit-w"));
    const cards = Array.from(el.querySelectorAll<HTMLElement>(":scope > .lit-line"));
    const starts = cards.map((c) => ws.indexOf(c.querySelector<HTMLElement>(".lit-w")!)); // each card's first word
    el.classList.add("lit-seq");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { ws.forEach((w) => w.classList.add("is-lit")); cards.forEach((c) => c.classList.add("is-in")); return; }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      const scn = el.closest<HTMLElement>(".scn");
      let p: number;
      if (scn && !scn.hasAttribute("data-static")) {
        const sr = scn.getBoundingClientRect();
        p = Math.max(0, Math.min(1, (-sr.top / Math.max(1, scn.offsetHeight - vh)) * 1.25 + 0.06));
      } else {
        // where it sits in the page, not on screen: a section that holds in place
        // still finishes lighting as you keep scrolling
        const top = docTop(el) - window.scrollY;
        /* quote cards: spread over more of the scroll so they come in one by one (Nicole, Nov 11) */
        p = Math.max(0, Math.min(1, (vh * 0.98 - top) / (vh * (cards.length > 1 ? 0.75 : 0.4))));
      }
      const n = Math.round(p * ws.length);
      ws.forEach((w, i) => w.classList.toggle("is-lit", i < n));
      cards.forEach((c, k) => c.classList.toggle("is-in", n > starts[k] || p >= 1));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  if (lines) {
    let at = 0;
    return (
      <div ref={ref as RefObject<HTMLDivElement>} className={`lit lit-lines${className ? ` ${className}` : ""}`}>
        {lines.map((l, k) => {
          const from = at;
          at += l.split(" ").length;
          const quote = <><span className="sr-only">{l}</span><span aria-hidden="true">{words(l, from)}</span></>;
          const note = notes?.[k];
          if (note) return (
            <div key={k} className="lit-line has-note">
              <blockquote className="lit-q">{quote}</blockquote>
              <p className="lit-note">{noteLabel && <span>{noteLabel}</span>}{note}</p>
            </div>
          );
          return <blockquote key={k} className="lit-line">{quote}</blockquote>;
        })}
      </div>
    );
  }
  const T = Tag as "p";
  return (
    <T ref={ref as RefObject<HTMLParagraphElement>} className={`lit${className ? ` ${className}` : ""}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{words(text ?? "", 0)}</span>
    </T>
  );
}

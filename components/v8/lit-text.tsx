"use client";
/* Words that light up one by one as they scroll into place (scale.com's
   stat card, in our colors). Give it one sentence (text) or several quotes
   (lines); with lines, the words light across all of them in order. Inside
   a held scroll scene it follows the scene instead, so the words light
   while the section stands still. Screen readers get the plain text;
   reduced motion shows it fully lit. */
import { useEffect, useRef, type RefObject } from "react";

const words = (s: string, from: number) => s.split(" ").map((w, i) => <span key={from + i} className="lit-w">{w} </span>);

export default function LitText({ text, lines, as: Tag = "p", className }: { text?: string; lines?: string[]; as?: "p" | "h2" | "div"; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ws = Array.from(el.querySelectorAll<HTMLElement>(".lit-w"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { ws.forEach((w) => w.classList.add("is-lit")); return; }
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
        const r = el.getBoundingClientRect();
        p = Math.max(0, Math.min(1, (vh * 0.86 - r.top) / (vh * 0.5)));
      }
      const n = Math.round(p * ws.length);
      ws.forEach((w, i) => w.classList.toggle("is-lit", i < n));
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
          return (
            <blockquote key={k} className="lit-line">
              <span className="sr-only">{l}</span>
              <span aria-hidden="true">{words(l, from)}</span>
            </blockquote>
          );
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

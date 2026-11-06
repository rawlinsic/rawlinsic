"use client";
/* A sentence that lights up word by word as it scrolls into place
   (scale.com's stat card, in our colors). Inside a held scroll scene it
   follows the scene instead, so the words light while the card stands
   still. Screen readers get the plain sentence; reduced motion shows it
   fully lit. */
import { useEffect, useRef } from "react";

export default function LitText({ text, as: Tag = "p", className }: { text: string; as?: "p" | "h2"; className?: string }) {
  const ref = useRef<HTMLParagraphElement & HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".lit-w"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { words.forEach((w) => w.classList.add("is-lit")); return; }
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
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle("is-lit", i < n));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <Tag ref={ref} className={`lit${className ? ` ${className}` : ""}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text.split(" ").map((w, i) => <span key={i} className="lit-w">{w} </span>)}</span>
    </Tag>
  );
}

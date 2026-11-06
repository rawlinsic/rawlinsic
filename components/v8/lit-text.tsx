"use client";
/* A sentence that lights up word by word as it scrolls into place
   (scale.com's stat card, in our colors). Screen readers get the plain
   sentence; reduced motion shows it fully lit. */
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
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.86 - r.top) / (vh * 0.5)));
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

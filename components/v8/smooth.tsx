"use client";
/* Smooth, weighted scrolling across the whole site (Lenis, the same library
   scale.com uses). Off for people who ask for reduced motion. In-page links
   (#what) glide too, and stop under the fixed 68px header. */
import { useEffect } from "react";
import Lenis from "lenis";

declare global { interface Window { __lenis?: Lenis } }

export default function Smooth() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      anchors: { offset: -68 },
      allowNestedScroll: true,
      autoRaf: true,
    });
    window.__lenis = lenis;
    return () => { lenis.destroy(); delete window.__lenis; };
  }, []);
  return null;
}

/* Scroll to a page position: glides with Lenis when it is on. */
export function glideTo(top: number) {
  if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.2 });
  else window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

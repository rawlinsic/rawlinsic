"use client";
/* Smooth, weighted scrolling across the whole site (Lenis, the same library
   scale.com uses). Off for people who ask for reduced motion. Links to a
   spot on the same page (#what, the "On this page" bar) glide to the right
   place even when sections are held, and stop under the fixed header. */
import { useEffect } from "react";
import Lenis from "lenis";
import { docTop, pinnedOffset } from "@/components/v8/panels";

declare global { interface Window { __lenis?: Lenis } }

export default function Smooth() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, allowNestedScroll: true, autoRaf: true });
    if (lenis) window.__lenis = lenis;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname || url.hash.length < 2) return;
      const t = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!t) return;
      e.preventDefault();
      glideTo(Math.max(0, docTop(t) - pinnedOffset() + 1));
      history.pushState(null, "", url.hash);
      t.setAttribute("tabindex", t.getAttribute("tabindex") ?? "-1");
      t.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); lenis?.destroy(); delete window.__lenis; };
  }, []);
  return null;
}

/* Scroll to a page position: glides with Lenis when it is on. */
export function glideTo(top: number) {
  if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.2 });
  else window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

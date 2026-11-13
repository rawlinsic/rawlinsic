"use client";
/* Blue text on a blue (dark) background glows like "What sets us apart", everywhere on the site and on every device
   (Nicole, Nov 12: "any blue text ... ON BLUE backgrounds ... the same glowy ... keep the sizes"). Looks at the
   background actually behind each piece of blue text, so blue text on white is left alone, and marks it with
   the class "gd" (app/v10.css). Runs after the page loads and again when something new appears (menus, the help
   picker's answer). */
import { useEffect } from "react";

type C = { r: number; g: number; b: number; a: number };
const rgb = (s: string | null): C | null => {
  const m = s && s.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(",").map((x) => parseFloat(x));
  return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
};
const lum = (c: C) => (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255;
const blue = (c: C | null) => !!c && c.a > 0.5 && c.g > 170 && c.b > 200 && c.g - c.r > 55;
/* the background behind an element: true when it's dark */
const onDark = (el: Element | null): boolean => {
  for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
    const cs = getComputedStyle(e);
    const bc = rgb(cs.backgroundColor);
    if (bc && bc.a > 0.35) return lum(bc) < 0.35;
    if (/gradient/.test(cs.backgroundImage) && cs.backgroundClip !== "text" && (cs as CSSStyleDeclaration & { webkitBackgroundClip?: string }).webkitBackgroundClip !== "text") {
      const cols = Array.from(cs.backgroundImage.matchAll(/rgba?\([^)]+\)/g)).map((m) => rgb(m[0])).filter((c): c is C => !!c && c.a > 0.5);
      if (cols.length) return Math.min(...cols.map(lum)) < 0.35;
    }
  }
  return false;
};
const SKIP = ".pe-bar, .pe-tab, .pc-list, .pc-pop, .pc-pin, svg, .sr-only";

function mark() {
  for (const el of Array.from(document.querySelectorAll<HTMLElement>("main *, header *, footer *"))) {
    if (el.classList.contains("gd") || !Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent?.trim())) continue;
    if (el.closest(SKIP)) continue;
    const cs = getComputedStyle(el);
    if (cs.textShadow !== "none") continue; // already glowing (or lit on its own)
    const grad = (cs.color === "rgba(0, 0, 0, 0)" || (cs as CSSStyleDeclaration & { webkitTextFillColor?: string }).webkitTextFillColor === "rgba(0, 0, 0, 0)") && /gradient/.test(cs.backgroundImage);
    if (!blue(rgb(cs.color)) && !grad) continue;
    if (!onDark(el.parentElement)) continue;
    el.classList.add("gd");
    if (grad) el.classList.add("gd-grad");
  }
}

export default function GlowOnDark() {
  useEffect(() => {
    let t = 0;
    const later = () => { window.clearTimeout(t); t = window.setTimeout(mark, 250); };
    mark();
    const t2 = window.setTimeout(mark, 1200);
    const mo = new MutationObserver(later);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); window.clearTimeout(t); window.clearTimeout(t2); };
  }, []);
  return null;
}

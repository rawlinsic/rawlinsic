"use client";
/* Microsoft Clarity, loaded only after the visitor chooses Accept on the privacy banner (Nov 11, 2026). Before
   this it loaded on every visit, before any choice. Same project id as before. If the visitor later declines,
   Clarity is told to stop and its cookies are cleared; it won't load again on the next page. */
import { useEffect } from "react";
import { CONSENT_EVENT, optionalAllowed } from "@/lib/consent";
import { isInternalTraffic } from "@/lib/internal-filter";

const PROJECT = "wcupxc9qmn";
type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
declare global { interface Window { clarity?: ClarityFn } }

function load() {
  if (document.querySelector("script[data-clarity]")) return;
  const w = window;
  const fn: ClarityFn = w.clarity || function (...args: unknown[]) { (fn.q = fn.q || []).push(args); };
  w.clarity = fn;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${PROJECT}`;
  s.dataset.clarity = "1";
  document.head.appendChild(s);
  fn("consent"); // the visitor said yes
}
function stop() {
  try { window.clarity?.("consent", false); window.clarity?.("stop"); } catch { /* not loaded */ }
  for (const name of ["_clck", "_clsk", "CLID", "ANONCHK", "MR", "MUID", "SM"]) {
    document.cookie = `${name}=; path=/; max-age=0`;
    document.cookie = `${name}=; path=/; max-age=0; domain=.${location.hostname.replace(/^www\./, "")}`;
  }
}

export default function ClarityLoader() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || isInternalTraffic()) return;
    if (optionalAllowed()) load();
    const on = (e: Event) => { const c = (e as CustomEvent<{ analytics: boolean }>).detail; if (c?.analytics) load(); else stop(); };
    window.addEventListener(CONSENT_EVENT, on);
    return () => window.removeEventListener(CONSENT_EVENT, on);
  }, []);
  return null;
}

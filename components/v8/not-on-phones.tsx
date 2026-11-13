"use client";
/* Shows its contents only on screens 768px and wider (Nicole, Nov 12: on a phone the review tools "can't make it go
   away", and in Comment mode a tap became a comment). Used for the preview review tools. */
import { useEffect, useState, type ReactNode } from "react";

export default function NotOnPhones({ children }: { children: ReactNode }) {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const set = () => setWide(m.matches);
    set(); m.addEventListener?.("change", set);
    return () => m.removeEventListener?.("change", set);
  }, []);
  return wide ? <>{children}</> : null;
}

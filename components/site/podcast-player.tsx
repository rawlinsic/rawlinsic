"use client";
/* The Rawlins Way episodes come from the hosted MyPodOps player (same feed as
   the live site), recolored to the redesign blues. */
import { useEffect, useRef } from "react";

export default function PodcastPlayer() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = ref.current;
    if (!box || box.querySelector("script")) return;
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.charset = "utf-8";
    s.src = "https://www.mypodops.com/hosting/player/embed.js?id=3542&type=full&primary=1b5ccc&secondary=4d688c&width=100%25&height=450&artwork=1&desc=1&waveform=0&theme=minimal";
    box.appendChild(s);
  }, []);
  return <div className="pg-player" ref={ref}><div id="mypodops-player-3542" /></div>;
}

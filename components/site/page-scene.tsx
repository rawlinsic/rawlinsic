"use client";
/* A page's background behind the hero.
   Photo version (default): the page's photo, fixed, drifting slowly.
   3D version (?view=3d on preview deployments): the matching piece of the
   Rawlins world loads on top of the photo, which then acts as its poster. */
import { useEffect, useState } from "react";
import { getWorld, setPageScene, setWorldLayer } from "@/components/world/host";
import { want3D } from "@/components/site/scene-mode";
import USMap from "@/components/site/us-map";

export default function PageScene({ scene, photo, highlight }: { scene: string; photo?: string; highlight?: string[] }) {
  const [three, setThree] = useState(false);
  useEffect(() => { setThree(want3D()); }, []);

  useEffect(() => {
    if (!three) return;
    let alive = true;
    setPageScene(scene);
    const hero = document.querySelector<HTMLElement>("[data-scene-hero]");
    let io: IntersectionObserver | null = null;
    const idle = (cb: () => void) => ("requestIdleCallback" in window ? (window as any).requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 500));
    idle(() => {
      getWorld().then((w) => {
        if (!alive || !w) return;
        w.focus(scene, { instant: document.documentElement.dataset.world !== "journey" });
        if (highlight?.length) w.highlightStates(highlight, null);
        if (document.documentElement.dataset.world !== "menu") setWorldLayer("journey");
        if (hero) {
          io = new IntersectionObserver(([e]) => {
            if (document.documentElement.dataset.world === "menu") return;
            if (e.isIntersecting) w.start(); else w.stop();
          });
          io.observe(hero);
        }
      });
    });
    return () => {
      alive = false;
      io?.disconnect();
      setPageScene(null);
      setWorldLayer("off");
    };
  }, [three, scene, highlight]);

  if (highlight?.length && !three) {
    return <div className="scene-bg scene-map" aria-hidden="true"><USMap lit={highlight} label="" /></div>;
  }
  return photo ? (
    <div className="scene-bg" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" fetchPriority="high" decoding="async" />
    </div>
  ) : null;
}

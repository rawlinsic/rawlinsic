"use client";
/* A page's own 3D background: the piece of the Rawlins world that matches the
   page's topic, behind the hero. Loads after first paint; stops rendering once
   the hero has scrolled away. No scene → plain light page. */
import { useEffect } from "react";
import { getWorld, setPageScene, setWorldLayer } from "@/components/world/host";

export default function PageScene({ scene, highlight }: { scene: string; highlight?: string[] }) {
  useEffect(() => {
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
        document.documentElement.classList.add("has-scene");
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
      document.documentElement.classList.remove("has-scene");
      setWorldLayer("off");
    };
  }, [scene, highlight]);
  return null;
}

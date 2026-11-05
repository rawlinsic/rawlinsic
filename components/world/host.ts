/* One shared 3D world per tab. The home journey and the menu both use it;
   three.js loads only when one of them asks (after first paint). */
import type { World } from "./engine";

let worldP: Promise<World | null> | null = null;
let journeyOwner = false;

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function getWorld(): Promise<World | null> {
  if (worldP) return worldP;
  worldP = (async () => {
    if (typeof window === "undefined" || !webglOK()) return null;
    const { World } = await import("./engine");
    const canvas = document.createElement("canvas");
    canvas.className = "world-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const mobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 820;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      const w = new World(canvas, { mobile, reducedMotion });
      window.addEventListener("resize", w.resize);
      w.start();
      if (document.documentElement.dataset.env === "dev") (window as unknown as { __rw: unknown }).__rw = w;
      requestAnimationFrame(() => requestAnimationFrame(() => canvas.classList.add("is-ready")));
      return w;
    } catch (err) {
      console.error("3D world unavailable", err);
      canvas.remove();
      return null;
    }
  })();
  return worldP;
}

/** Which layer the canvas sits in: behind the journey, behind the menu, or off. */
export function setWorldLayer(layer: "journey" | "menu" | "off") {
  document.documentElement.dataset.world = layer;
  if (!worldP) return;
  worldP.then((w) => {
    if (!w) return;
    if (layer === "off") w.stop();
    else w.start();
  });
}

export function setJourneyOwner(on: boolean) { journeyOwner = on; }
export function hasJourney() { return journeyOwner; }

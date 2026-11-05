"use client";
/* Top bar for every page: logo, "Menu", "Get in touch".
   Transparent over the home journey, solid once you scroll (and on pages
   without a hero scene). "Menu" opens the stacked, nested full-screen menu. */
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import SiteMenu from "@/components/menu/site-menu";
import { want3D } from "@/components/site/scene-mode";

interface SiteNavProps {
  /** href for the "Get in touch" button. Defaults to /contact */
  ctaHref?: string;
  /** kept for older pages that still pass it */
  homeMode?: boolean;
}

export default function SiteNav({ ctaHref = "/contact" }: SiteNavProps) {
  const path = usePathname();
  const overScene = path === "/";
  const [solid, setSolid] = useState(!overScene);
  const [open, setOpen] = useState(false);
  const [prod, setProd] = useState(true);
  const [three, setThree] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setProd(document.documentElement.dataset.env !== "dev");
    setThree(want3D());
    if (!overScene) { setSolid(true); return; }
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [overScene]);

  /* other parts of the page (journey "Skip to menu", finale) can open it */
  useEffect(() => {
    const on = (e: Event) => setOpen(!!(e as CustomEvent).detail?.open);
    window.addEventListener("rawlins:menu", on);
    return () => window.removeEventListener("rawlins:menu", on);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className={`hd${solid ? " is-solid" : ""}${open ? " is-open" : ""}`} id="mainNav">
        <a href="/" className="hd-logo" aria-label="Rawlins home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/pages/rawlinslogo-blue-wordmark.png" alt="Rawlins" width={150} height={36} />
        </a>
        <div className="hd-right">
          <button ref={btn} type="button" className="hd-menu" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}>
            <span>Menu</span>
            <span className="hd-burger" aria-hidden="true"><i /><i /></span>
          </button>
          <a href={ctaHref} className="hd-cta">Get in touch</a>
        </div>
      </header>
      <SiteMenu open={open} onClose={close} prod={prod} />
      {/* dev site only: switch between the photo version and the 3D version */}
      {!prod && process.env.RAWLINS_SCENES !== "3d" && (
        <a className="hd-view" href={three ? "?view=photo" : "?view=3d"}>
          {three ? "Viewing the 3D version · switch to photos" : "Viewing the photo version · switch to 3D"}
        </a>
      )}
    </>
  );
}

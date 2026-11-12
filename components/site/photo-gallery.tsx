"use client";
/* A gallery of team photos (Who we are; Nicole, Nov 11: "instead of that one big image, please use these images
   that can be like a gallery or something creative"). Two rows drift opposite ways and pause when you point at
   them. A photo opens large in a window; the arrows (or the arrow keys) move through the set, and a click outside
   the photo, the x, or Escape closes it. Reduced motion and phones get rows you swipe. */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { holdPage } from "@/components/site/people";

export type GalleryPhoto = { src: string; alt: string; w: number; h: number };

export default function PhotoGallery({ photos, label = "Photos of our team" }: { photos: GalleryPhoto[]; label?: string }) {
  const [at, setAt] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const half = Math.ceil(photos.length / 2);
  const rows = [photos.slice(0, half), photos.slice(half)];

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (at !== null && !d.open) d.showModal();
    if (at === null && d.open) d.close();
    holdPage(at !== null);
  }, [at]);
  const step = (n: number) => setAt((i) => (i === null ? i : (i + n + photos.length) % photos.length));
  useEffect(() => {
    if (at === null) return;
    const key = (e: KeyboardEvent) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [at]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="gal" data-nofill aria-label={label}>
      {rows.map((row, r) => (
        <div key={r} className="gal-view">
          <ul className={`gal-row${r ? " is-rev" : ""}`} style={{ ["--n" as string]: row.length } as CSSProperties}>
            {[...row, ...row].map((p, k) => {
              const copy = k >= row.length;
              return (
                <li key={`${p.src}-${k}`} aria-hidden={copy || undefined} style={{ ["--ar" as string]: (p.w / p.h).toFixed(4) } as CSSProperties}>
                  <button type="button" tabIndex={copy ? -1 : 0} onClick={() => setAt(photos.indexOf(p))} aria-label={`${p.alt}. Open larger.`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt="" loading="lazy" width={p.w} height={p.h} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <dialog ref={dlg} className="gal-box" data-lenis-prevent onClose={() => setAt(null)} onClick={(e) => { if (e.target === dlg.current) setAt(null); }} aria-label={label}>
        {at !== null && (
          <figure className="gal-fig">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[at].src} alt={photos[at].alt} />
            <button type="button" className="gal-x" onClick={() => setAt(null)} aria-label="Close">×</button>
            <button type="button" className="gal-nav is-prev" onClick={() => step(-1)} aria-label="Previous photo"><span aria-hidden="true">←</span></button>
            <button type="button" className="gal-nav is-next" onClick={() => step(1)} aria-label="Next photo"><span aria-hidden="true">→</span></button>
            <figcaption>{at + 1} / {photos.length}</figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}

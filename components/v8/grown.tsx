/* How we've grown, as a sideways route (home and Who we are). The section
   holds while the four stages slide across; a line runs over the cards and
   each stage's stop lights as the line reaches it (styles in app/v8.css,
   .hg and .hg-item). Phones and reduced motion get the stages stacked with
   the line down the side. The last card (navy) asks where you're headed:
   the words sit in the middle, with the five areas to start from and one
   button (Nicole, Nov 10). */
import type { CSSProperties } from "react";
import { AREAS, areaHref, STORY } from "@/lib/content/site";
import { STORY_PHOTO, STORY_PHOTO_POS } from "@/lib/content/v8";
import Scene from "@/components/v8/scene";

export default function Grown({ eyebrow, title, link }: { eyebrow?: string; title: string; link?: { href: string; label: string } }) {
  return (
    <Scene steps={1} per={160} className="hg" label="How we've grown">
      <div className="v8-wrap h-row-head hg-head">
        <div>{eyebrow && <p className="v8-eyebrow">{eyebrow}</p>}<h2 className="v8-h2">{title}</h2></div>
        {link && <a className="v8-link hg-more" href={link.href}>{link.label}</a>}
      </div>
      <div className="hg-line" aria-hidden="true"><i /></div>
      <div className="hg-view">
        <ol className="hg-track hg-route" data-hscroll style={{ ["--n" as string]: STORY.length } as CSSProperties}>
          {STORY.map(([k, h, p], i) => (
            <li key={k} className="hg-item" style={{ ["--i" as string]: i } as CSSProperties}>
              <span className="hg-node" aria-hidden="true"><b>{String(i + 1).padStart(2, "0")}</b></span>
              <div className="hg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={STORY_PHOTO[i]} alt="" loading="lazy" style={{ objectPosition: STORY_PHOTO_POS[i] }} />
                <div><span className="grown-k">{String(i + 1).padStart(2, "0")} · {k}</span><b>{h}</b><p>{p}</p></div>
              </div>
            </li>
          ))}
          <li className="hg-item is-next" style={{ ["--i" as string]: STORY.length } as CSSProperties}>
            <span className="hg-node" aria-hidden="true"><b>→</b></span>
            <div className="hg-card hg-next">
              <span className="hg-next-ring" aria-hidden="true" />
              <span className="grown-k">What&apos;s next</span>
              <b>Where are you headed?</b>
              <p>Tell us where you want to be, and what&apos;s in the way. We&apos;ll show you where to start.</p>
              <ul className="hg-next-areas" aria-label="Start with an area">
                {AREAS.map((a) => <li key={a.id}><a href={areaHref(a)}>{a.name}</a></li>)}
              </ul>
              <a className="v8-btn v8-btn-glow" href="/contact">Tell us what you&apos;re trying to fix</a>
            </div>
          </li>
        </ol>
      </div>
    </Scene>
  );
}

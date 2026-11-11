/* Editorial building blocks for the About, News, and article pages (Nicole, Nov 10: "all of the about stuff
   needs to be better... the whole menu, the pages"). Big type, real photos, numbers that come from our own
   data, and layouts that change from section to section instead of one template. Styles: app/v10.css (ed-). */
import type { CSSProperties, ReactNode } from "react";
import { Crumbs, type Crumb } from "@/components/site/ui";

/* A page's opening: crumbs, kicker, a big headline, the lead, buttons; on the right a photo, faces, or anything. */
export function EdHero({ crumbs, kicker, title, lead, actions, aside, dark, children }: {
  crumbs?: Crumb[]; kicker?: string; title: ReactNode; lead?: ReactNode; actions?: ReactNode; aside?: ReactNode; dark?: boolean; children?: ReactNode;
}) {
  return (
    <header className={`ed-hero${dark ? " is-dark" : ""}${aside ? " has-aside" : ""}`} data-nofill>
      <div className="ed-wrap ed-hero-in">
        <div className="ed-hero-copy">
          {crumbs && <Crumbs items={crumbs} />}
          {kicker && <p className="ed-k">{kicker}</p>}
          <h1 className="ed-h1">{title}</h1>
          {lead && <div className="ed-lead">{lead}</div>}
          {actions && <div className="ed-btns">{actions}</div>}
        </div>
        {aside && <div className="ed-hero-aside">{aside}</div>}
      </div>
      {children}
    </header>
  );
}

export function EdBtn({ href, children, kind = "solid" }: { href: string; children: ReactNode; kind?: "solid" | "ghost" | "white" }) {
  return <a className={`ed-btn is-${kind}`} href={href} {...(/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
}

/* A full-width photo band with an optional line over it */
export function EdBand({ src, pos, children, tall }: { src: string; pos?: string; children?: ReactNode; tall?: boolean }) {
  return (
    <section className={`ed-band${tall ? " is-tall" : ""}`} data-nofill>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" loading="lazy" style={pos ? { objectPosition: pos } : undefined} />
      {children && <div className="ed-wrap ed-band-in">{children}</div>}
    </section>
  );
}

/* Numbers in a row. Only numbers we can count from our own data. */
export function EdStats({ items, dark }: { items: { n: string; t: string }[]; dark?: boolean }) {
  return (
    <section className={`ed-stats${dark ? " is-dark" : ""}`} data-nofill>
      <dl className="ed-wrap ed-stats-in">
        {items.map((x) => <div key={x.t}><dt>{x.t}</dt><dd>{x.n}</dd></div>)}
      </dl>
    </section>
  );
}

/* A section with its title held on the left while the content scrolls on the right */
export function EdSplit({ k, title, intro, children, tone, id }: { k?: string; title: string; intro?: ReactNode; children: ReactNode; tone?: "panel" | "navy"; id?: string }) {
  return (
    <section className={`ed-sec ed-split${tone ? ` is-${tone}` : ""}`} id={id} data-nofill>
      <div className="ed-wrap ed-split-in">
        <div className="ed-split-head">
          {k && <p className="ed-k">{k}</p>}
          <h2 className="ed-h2">{title}</h2>
          {intro && <div className="ed-intro">{intro}</div>}
        </div>
        <div className="ed-split-body">{children}</div>
      </div>
    </section>
  );
}

/* A plain section: kicker, title, optional link at the right */
export function EdSec({ k, title, link, children, tone, id, intro }: { k?: string; title?: string; link?: { href: string; label: string }; children: ReactNode; tone?: "panel" | "navy"; id?: string; intro?: ReactNode }) {
  return (
    <section className={`ed-sec${tone ? ` is-${tone}` : ""}`} id={id} data-nofill>
      <div className="ed-wrap">
        {(title || k) && (
          <div className="ed-sec-head">
            <div>{k && <p className="ed-k">{k}</p>}{title && <h2 className="ed-h2">{title}</h2>}{intro && <div className="ed-intro">{intro}</div>}</div>
            {link && <a className="ed-more" href={link.href}>{link.label}</a>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/* Faces sliding sideways in two rows (each opens that person's bio on Our people) */
export function FaceRows({ people }: { people: { slug: string; name: string; photo: string }[] }) {
  const half = Math.ceil(people.length / 2);
  const rows = [people.slice(0, half), people.slice(half)];
  return (
    <div className="ed-faces" aria-hidden="true">
      {rows.map((r, i) => (
        <div key={i} className={`ed-faces-row${i ? " is-rev" : ""}`} style={{ ["--n" as string]: r.length } as CSSProperties}>
          {[...r, ...r].map((p, k) => (
            <a key={p.slug + k} href={`/about/our-people#${p.slug}`} tabIndex={-1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.photo} alt="" loading="lazy" />
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

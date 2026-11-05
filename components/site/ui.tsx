/* Building blocks for every redesigned page (server components).
   Styles: app/pages.css (pg- prefix). Dev-only marks never render in production. */
import type { ReactNode } from "react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import PageScene from "@/components/site/page-scene";
import { TEAM_MEMBERS } from "@/lib/team-data";
import { AREAS, CASES, caseHref, caseWho, serviceById, serviceHref, type CaseIndex, type SceneKey } from "@/lib/content/site";
import { SCENE_PHOTO } from "@/lib/content/media";

export const PROD = process.env.VERCEL_ENV === "production";

export function Shell({ scene, photo, highlight, children }: { scene?: string; photo?: string; highlight?: string[]; children: ReactNode }) {
  return (
    <>
      <SiteNav />
      {scene && <PageScene scene={scene} photo={photo ?? SCENE_PHOTO[scene as SceneKey]} highlight={highlight} />}
      <main className={`pg${scene ? " pg-with-scene" : ""}`}>{children}</main>
      <SiteFooter />
    </>
  );
}

export type Crumb = [href: string, label: string];
export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="pg-crumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        {items.map(([href, label], i) => (
          <li key={href}>{i === items.length - 1 ? <span aria-current="page">{label}</span> : <a href={href}>{label}</a>}</li>
        ))}
      </ol>
    </nav>
  );
}

export function Hero({ crumbs, kicker, title, lead, children, actions, scene = true, statement }: {
  crumbs?: Crumb[]; kicker?: string; title: ReactNode; lead?: ReactNode; children?: ReactNode; actions?: ReactNode; scene?: boolean; statement?: string;
}) {
  return (
    <header className={`pg-hero${scene ? " pg-hero-scene" : " pg-hero-plain"}`} data-scene-hero>
      <div className="pg-hero-in">
        {crumbs && <Crumbs items={crumbs} />}
        {kicker && <p className="pg-kicker">{kicker}</p>}
        <h1 className="pg-h1">{title}</h1>
        {statement && <p className="pg-statement">{statement}</p>}
        {lead && <div className="pg-lead">{lead}</div>}
        {children}
        {actions && <div className="pg-btns">{actions}</div>}
      </div>
    </header>
  );
}

export function Btn({ href, children, primary }: { href: string; children: ReactNode; primary?: boolean }) {
  return <a href={href} className={`pg-btn${primary ? " pg-btn-primary" : ""}`}>{children}</a>;
}

export function Sec({ title, kicker, id, children, intro, tone }: { title?: string; kicker?: string; id?: string; children: ReactNode; intro?: ReactNode; tone?: "panel" | "navy" }) {
  return (
    <section className={`pg-sec${tone ? ` pg-sec-${tone}` : ""}`} id={id}>
      <div className="pg-wrap">
        {(title || kicker) && (
          <div className="pg-sec-head">
            {kicker && <p className="pg-kicker">{kicker}</p>}
            {title && <h2 className="pg-h2">{title}</h2>}
            {intro && <div className="pg-sec-intro">{intro}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function List({ items, cols }: { items: readonly string[]; cols?: boolean }) {
  return <ul className={`pg-list${cols ? " pg-list-cols" : ""}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

export function Chips({ items }: { items: { label: string; href: string }[] }) {
  if (!items.length) return null;
  return <ul className="pg-chips">{items.map((x) => <li key={x.href + x.label}><a href={x.href}>{x.label}</a></li>)}</ul>;
}

export function ServiceChips({ ids }: { ids: readonly string[] }) {
  const items = ids.map((id) => serviceById(id)).filter(Boolean).map((h) => ({ label: h!.service.name, href: serviceHref(h!.service.id) }));
  return <Chips items={items} />;
}

export function ServiceCards({ ids, blurb }: { ids: readonly string[]; blurb?: (id: string) => string }) {
  return (
    <ul className="pg-cards">
      {ids.map((id) => {
        const hit = serviceById(id);
        if (!hit) return null;
        return (
          <li key={id}>
            <a href={serviceHref(id)} className="pg-card pg-card-link">
              <b>{hit.service.name}</b>
              {blurb && <span>{blurb(id)}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function CaseCards({ ids, cases, limit }: { ids?: readonly string[]; cases?: CaseIndex[]; limit?: number }) {
  const list = (cases ?? (ids ?? []).map((id) => CASES.find((c) => c.id === id)).filter(Boolean) as CaseIndex[]).slice(0, limit ?? 99);
  if (!list.length) return null;
  return (
    <ul className="pg-cases">
      {list.map((c) => (
        <li key={c.id}>
          <a href={caseHref(c)} className="pg-case">
            <span className="pg-case-k">{c.status === "Ongoing" ? "In the works" : "Case study"}</span>
            <b>{c.title}</b>
            <span>{caseWho(c, PROD)}</span>
            {c.needsSignoff && !PROD && <em className="pg-dev">Needs sign-off · shows as “{c.generic}” on launch</em>}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Steps({ steps, compact }: { steps: readonly { t: string; d: string; services?: readonly string[] }[]; compact?: boolean }) {
  return (
    <ol className={`pg-steps${compact ? " pg-steps-compact" : ""}`} style={{ ["--n" as string]: steps.length }}>
      {steps.map((s, i) => (
        <li key={s.t}>
          <span className="pg-step-n">{String(i + 1).padStart(2, "0")}</span>
          <b>{s.t}</b>
          <span>{s.d}</span>
          {s.services && s.services.length > 0 && <ServiceChips ids={s.services} />}
        </li>
      ))}
    </ol>
  );
}

/* People: headshots come from the live roster (lib/team-data.ts) */
const bare = (n: string) => n.split(",")[0].trim().toLowerCase();
export function photoFor(name: string) {
  const m = TEAM_MEMBERS.find((p) => bare(p.name) === bare(name));
  return m?.photo;
}
export function People({ people }: { people: readonly (readonly string[])[] }) {
  if (!people.length) return null;
  return (
    <ul className="pg-people">
      {people.map(([name, line]) => {
        const photo = photoFor(name);
        return (
          <li key={name} className="pg-person">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="" width={72} height={72} loading="lazy" />
            ) : <span className="pg-person-ph" aria-hidden="true">{name.slice(0, 1)}</span>}
            <span><b>{name}</b><em>{line}</em></span>
          </li>
        );
      })}
    </ul>
  );
}

export function Talk({ title = "Talk to the people who do this work", text = "Tell us what you're working on. We'll connect you with the person on our team who has done it." }: { title?: string; text?: string }) {
  return (
    <section className="pg-talk">
      <div className="pg-wrap pg-talk-in">
        <div>
          <h2 className="pg-h2">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="pg-btns">
          <Btn href="/contact" primary>Get in touch</Btn>
          <Btn href="/insights/case-studies">See case studies</Btn>
        </div>
      </div>
    </section>
  );
}

/* Dev-only notes and badges (preview deployments only) */
export function Dev({ children, block }: { children: ReactNode; block?: boolean }) {
  if (PROD) return null;
  return block ? <p className="pg-dev pg-dev-block">{children}</p> : <em className="pg-dev">{children}</em>;
}

export function areaOf(id: string) { return AREAS.find((a) => a.id === id); }

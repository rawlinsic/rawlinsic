/* Building blocks for every redesigned page (server components).
   Styles: app/pages.css (pg- prefix). Dev-only marks never render in production. */
import type { ReactNode } from "react";
import RouteList from "@/components/v8/route-list";
import Header from "@/components/v8/header";
import Footer from "@/components/v8/footer";
import PageScene from "@/components/site/page-scene";
import Panels from "@/components/v8/panels";
import { TEAM_MEMBERS } from "@/lib/team-data";
import { AREAS, CASES, caseHref, caseTag, serviceById, serviceHref, type CaseIndex, type SceneKey } from "@/lib/content/site";
import { SCENE_PHOTO } from "@/lib/content/media";

export const PROD = process.env.VERCEL_ENV === "production";

export function Shell({ scene, photo, highlight, strong, children }: { scene?: string; photo?: string; highlight?: string[]; strong?: string[]; children: ReactNode }) {
  return (
    <>
      <Header />
      {scene && <PageScene scene={scene} photo={photo ?? SCENE_PHOTO[scene as SceneKey]} highlight={highlight} strong={strong} />}
      <main className={`pg${scene ? " pg-with-scene" : ""}`}><Panels className="pnl-clear">{children}</Panels></main>
      <Footer />
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
            <span className="pg-case-k">{caseTag(c, "Case study")}</span>
            <b>{c.title}</b>
            <span>{c.who}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Steps({ steps, compact }: { steps: readonly { t: string; d: string; services?: readonly string[] }[]; compact?: boolean }) {
  // full step lists run as a route you scroll down; compact ones (case figures) stay a strip
  if (!compact) return <RouteList stops={steps.map((s) => ({ t: s.t, d: s.d, extra: s.services && s.services.length > 0 ? <ServiceChips ids={s.services} /> : undefined }))} />;
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
/* Match a name to the roster: first and last name, ignoring credentials,
   middle initials, and nicknames in parentheses ("Jennifer (Jen) Pihl"). */
const nameKeys = (n: string) => {
  const base = n.split(",")[0];
  const nick = Array.from(base.matchAll(/\((.*?)\)/g)).map((m) => m[1].toLowerCase());
  const t = base.replace(/\(.*?\)/g, " ").toLowerCase().replace(/[^a-z\s'-]/g, " ").split(/\s+/).filter((w) => w.length > 1);
  if (!t.length) return [];
  return [`${t[0]} ${t[t.length - 1]}`, ...nick.map((k) => `${k} ${t[t.length - 1]}`)];
};
const ROSTER = new Map<string, (typeof TEAM_MEMBERS)[number]>();
TEAM_MEMBERS.forEach((m) => nameKeys(m.name).forEach((k) => ROSTER.set(k, m)));
export function rosterFor(name: string) {
  for (const k of nameKeys(name)) { const m = ROSTER.get(k); if (m) return m; }
  return undefined;
}
export function photoFor(name: string) {
  return rosterFor(name)?.photo;
}
/* The title a person holds at Rawlins (front-facing titles are never a former role). */
export function rawlinsTitle(m: (typeof TEAM_MEMBERS)[number]) {
  return m.title && m.title !== m.role ? `${m.title}, ${m.role}` : m.role;
}
export function People({ people }: { people: readonly (readonly string[])[] }) {
  if (!people.length) return null;
  return (
    <ul className="pg-people">
      {people.map(([name, line]) => {
        const m = rosterFor(name);
        const photo = m?.photo;
        return (
          <li key={name} className="pg-person">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="" width={72} height={72} loading="lazy" />
            ) : <span className="pg-person-ph" aria-hidden="true">{name.slice(0, 1)}</span>}
            <span><b>{name}</b><em>{m ? rawlinsTitle(m) : line}</em>{m?.location && <small className="pg-person-loc">{m.location}</small>}</span>
          </li>
        );
      })}
    </ul>
  );
}

/* The closing ask on every page. The line under it is the current site's own. */
export const TALK = { title: "Tell us what you’re working on", text: "Whether you’re ready to engage or simply exploring what’s possible, we’d love to hear from you." };
export function Talk({ title = TALK.title, text = TALK.text }: { title?: string; text?: string }) {
  return (
    <section className="pg-talk">
      <div className="pg-wrap pg-talk-in">
        <div>
          <h2 className="pg-h2">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="pg-btns">
          <Btn href="/contact" primary>Get in touch</Btn>
          <Btn href="/insights/case-studies">See our projects</Btn>
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

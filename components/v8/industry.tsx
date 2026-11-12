/* Who we work with: the industry pages, their specialty pages, and Private
   Sector (v9), in the area pages' system (components/v8/area.tsx):
     hero          lit by the page's photo. An industry's specialties sit right
                   in it as photo panels that open on hover; a page without
                   panels shows its photo in the layered frame instead
     we hear       the clients' words side by side as quote cards; on the industry
                   pages each one has its "What we bring" line under it
     ways          Contractors & Engineering Firms: "How firms work with us" as a route
     services      "Services we provide": the services we use most here as linked
                   text cards (area, name, first line), not photo cards
     deliver, walk the specialty pages: what we deliver, then what you walk away with
                   beside "The experience behind it" (the service page's #walk section)
     people        portrait cards that open each bio ("Experience on our team")
     projects      photo cards
   then the closing band and the next page. Content comes from lib/content,
   unchanged. Which projects show (and in what order) is decided by the
   callers in components/site/industries.tsx. Styles: app/industry.css on top
   of app/v8.css. */
import ProjectCard from "@/components/v8/project-card";
import { allPeople } from "@/components/site/more";
import type { CSSProperties, ReactNode } from "react";
import {
  AREAS, VISIBLE_INDUSTRIES, areaHref, caseHref, caseTag, industryHref, serviceById, serviceHref, subsectorHref,
  type CaseIndex, type Industry, type Subsector, PAGE_STATUS, INTL,
} from "@/lib/content/site";
import { INDUSTRIES as IND_DATA, PRIV, SERVICES, SUBSECTORS } from "@/lib/content/catalog";
import { INDUSTRY_PHOTO } from "@/lib/content/media";
import { casePhoto } from "@/lib/content/v8";
import { EVENTS, NEWS, eventsByTime } from "@/lib/content/news";
import { UpcomingEvents, PastEvents } from "@/components/site/events";
import AuthorPop from "@/components/site/author-pop";
import Header from "@/components/v8/header";
import Footer from "@/components/v8/footer";
import Reveal from "@/components/v8/reveal";
import Panels from "@/components/v8/panels";
import SectionNav, { type SnMore } from "@/components/v8/section-nav";
import LitText from "@/components/v8/lit-text";
import RouteList from "@/components/v8/route-list";
import { AviationTeam, type TeamCard } from "@/components/site/aviation";
import { aviationCards } from "@/components/site/services";
import { AVIATION_ROLES, formerlyFor } from "@/lib/content/people";
import { CaseNote, Dev, LineNote, TALK, rawlinsTitle, rosterFor } from "@/components/site/ui";
import "@/app/industry.css";

type Crumb = [href: string, label: string];
type Nav = [id: string, label: string];

const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();
const bare = (s: string) => `${s.replace(/[.”"]+$/, "")}.`; // the quote marks are drawn on the card
/* one card per quote: some entries hold two quotes in one string ("…” “…") */
const quotes = (hear: readonly string[]) => hear.flatMap((h) => h.split(/["”]\s*["“]/)).map((h) => bare(h.replace(/^["“]/, "")));
/* the anchor each person has on Our People */
const personSlug = (name: string) => name.toLowerCase().replace(/[.,]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
/* portrait cards from [name, line] pairs: the Rawlins title and location from
   the roster, plus a former agency role when there is one; the line passed in
   isn't shown (full site pass, Part 4, 4) */
const team = (people: readonly (readonly string[])[]): TeamCard[] =>
  people.map(([name]) => {
    const m = rosterFor(name);
    const slug = personSlug(m?.name ?? name);
    return { name, title: m ? rawlinsTitle(m) : "", formerly: formerlyFor(name), photo: m?.photo, location: m?.location, href: `/about/our-people#${slug}`, person: allPeople().find((x) => x.slug === slug) };
  });
/* preview-only notes on the specialty pages, true for each page (full site pass, Part 4, 1; Who we work with, Nov 11, 5.1).
   A page shows its note whenever it has one here, in its hero and on the industry page's panel, thin or not. */
const THIN_NOTE: Record<string, string> = {
  "sub-ports": PAGE_STATUS["sub-ports"],
  "sub-rail": "Content status: one Rawlins project stands behind this page, partnering on a light rail line in 2019. The rest is experience on our team from earlier roles.",
  "g-capital": "Content status: no Rawlins project yet. A city project delivery and permitting assessment was scoped in Sep 2026, and our records show no signed contract. Scott or Joey to confirm whether it has started.",
  "g-mpo": "Content status: no Rawlins project yet; the page leads with experience on our team.",
};
/* the note a specialty carries on previews: its own, or the plain "thin" mark when it has none */
const thinNote = (s: Subsector, fallback: string) => (THIN_NOTE[s.id] ? <Dev>{THIN_NOTE[s.id]}</Dev> : s.thin ? <Dev>{fallback}</Dev> : undefined);
const nextIndustry = (id: string) => VISIBLE_INDUSTRIES[(VISIBLE_INDUSTRIES.findIndex((i) => i.id === id) + 1) % VISIBLE_INDUSTRIES.length];

/* ── shared pieces ─────────────────────────────────────────────── */

/* more: the sibling pages (an industry's specialties, or the industries), in a list that opens from a button at
   the start of the section bar, the same bar the What We Do service pages have (Nicole, Nov 11) */
function Page({ sections, hero, children, more }: { sections: Nav[]; hero: ReactNode; children: ReactNode; more?: SnMore }) {
  return (
    <>
      <Header />
      <main id="main-content" className="v8">
        <div className="sv ipg">
          <Panels className="pnl-page">
            {hero}
            <SectionNav items={sections} more={more} />
            {children}
          </Panels>
        </div>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}

function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        {items.map(([href, label], i) => <li key={href} aria-current={i === items.length - 1 ? "page" : undefined}>{i === items.length - 1 ? label : <a href={href}>{label}</a>}</li>)}
      </ol>
    </nav>
  );
}

function Bg({ photo }: { photo: string }) {
  return (
    <div className="svh-bg" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" />
    </div>
  );
}

/* Hero with the specialties as photo panels (the area page's hero) */
function PanelHero({ photo, crumbs, tag, title, lead, actions, label, subs }: {
  photo: string; crumbs: Crumb[]; tag: string; title: string; lead: string; actions: ReactNode; label: string;
  subs: { id: string; name: string; line: string; href: string; photo: string; note?: ReactNode }[];
}) {
  const many = subs.length >= 5;
  return (
    <section className="sv-hero svh arh ipg-hero" data-scrub="page">
      <Bg photo={photo} />
      <div className="v8-wrap arh-top">
        <div>
          <Crumbs items={crumbs} />
          <p className="sv-area">{tag}</p>
          <h1>{title}</h1>
        </div>
        <div className="arh-side">
          <p className="sv-intro">{lead}</p>
          <div className="v8-actions">{actions}</div>
        </div>
      </div>
      <div id="specialties" className="v8-wrap arh-svcs">
        <h2 className="arh-svcs-h">{label}</h2>
        <ul className={`ways ways-svc ipg-ways${many ? " is-many" : ""}`}>
          {subs.map((s) => (
            <li key={s.id} className="way">
              <a href={s.href}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.photo} alt="" loading="lazy" />
                {many && <span className="way-v" aria-hidden="true">{s.name}</span>}
                <span className="way-txt">
                  <b>{s.name}</b>
                  <span className="way-q">{s.line}</span>
                  {s.note}
                  <span className="way-more">Explore</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Hero with the photo in the layered frame (the service page's hero), for
   pages without panels. The sibling pages used to sit in a second bar along its foot; they're now in the
   section bar's list (Nicole, Nov 11: the same menu design as the What We Do pages). */
function FrameHero({ photo, crumbs, tag, title, lead, actions, note }: {
  photo: string; crumbs: Crumb[]; tag: ReactNode; title: string; lead: string; actions: ReactNode; note?: ReactNode;
}) {
  return (
    <section className="sv-hero svh ipg-hero is-frame" data-scrub="page">
      <Bg photo={photo} />
      <div className="v8-wrap sv-hero-in">
        <div className="sv-hero-copy">
          <Crumbs items={crumbs} />
          <p className="sv-area">{tag}</p>
          <h1>{title}</h1>
          <p className="sv-intro">{lead}</p>
          <div className="v8-actions">{actions}</div>
          {note}
        </div>
        <figure className="sv-photo lf">
          <span className="lf-back" aria-hidden="true" />
          <span className="lf-mid" aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="lf-front">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="" />
          </span>
        </figure>
      </div>
    </section>
  );
}

/* bring: the "What we bring" line under each challenge, as on the area pages (components/v8/area.tsx). Without it
   the cards look as they did. */
function Hear({ title, items, bring }: { title: string; items: readonly string[]; bring?: string[] }) {
  const q = quotes(items);
  return (
    <section id="hear" className="svq">
      <div className="v8-wrap svq-in">
        <h2 className="v8-h2">{title}</h2>
        <LitText lines={q} notes={bring} noteLabel="What we bring" className={`svq-q is-${Math.min(q.length, 4)}${bring?.length ? " has-notes" : ""}`} />
      </div>
    </section>
  );
}

/* A list as a route that fills as you scroll, its heading held on the left */
function Route({ id, title, note, children, className }: { id: string; title: string; note?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`sv-sec ipg-route${className ? ` ${className}` : ""}`}>
      <div className="v8-wrap ipg-split">
        <div className="ipg-split-h">
          <h2 className="v8-h2">{title}</h2>
          {note}
        </div>
        {children}
      </div>
    </section>
  );
}

/* International: "Where you'll find us in the region" (Nicole, Nov 11: the international events, info and photos
   from her "int'l" folder "should be incorporated into this page somehow and for the events related to them").
   The same event cards as News & Recognition, only the international ones: one that hasn't ended shows as a wide
   row, the rest as "Past event" cards. Under them, a photo from LEAP and the G100 recognition, with Andy's bio
   one click away. Photos: Andy Palanisamy's own LinkedIn posts. His two event graphics are not placed as
   pictures (old logo, gold); what they say is on the page as text. */
function Region() {
  const { upcoming, past } = eventsByTime(EVENTS.filter((e) => e.intl));
  const andy = allPeople().find((p) => p.name === "Andy Palanisamy");
  const g100 = NEWS.find((n) => n.title.includes("G100"));
  return (
    <section id="region" className="sv-sec ipg-region">
      <div className="v8-wrap">
        <div className="ipg-region-h">
          <h2 className="v8-h2">{INTL.region.title}</h2>
          <a className="ed-more" href={INTL.region.link.href}>{INTL.region.link.label}</a>
        </div>
        {upcoming.length > 0 && <UpcomingEvents events={upcoming} />}
        {past.length > 0 && <PastEvents events={past} />}
        <div className="ipg-region-more">
          <figure className="ipg-region-ph">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/pages/news-leap-2026-orbital.webp" alt="The smart cities stage at LEAP 2026 in Riyadh" loading="lazy" />
            <figcaption>LEAP 2026, Riyadh</figcaption>
          </figure>
          {g100 && (
            <div className="ipg-region-rec">
              <p className="ipg-region-tag">{g100.tag}{g100.date ? ` · ${g100.date}` : ""}</p>
              <h3>{g100.title}</h3>
              {g100.text && <p>{g100.text}</p>}
              {andy && (
                <AuthorPop person={andy} className="ipg-region-by">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={andy.photo} alt="" width={64} height={64} loading="lazy" />
                  <span><b>{andy.name}</b><em>{andy.role}</em>{andy.location && <i>{andy.location}</i>}</span>
                </AuthorPop>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* Portrait cards. Few people: the heading sits beside them. */
function Team({ id, title, people, roles }: { id: string; title?: string; people: TeamCard[]; roles?: readonly (readonly [string, string])[] }) {
  const n = people.length;
  const cols = n <= 3 ? n : n === 5 ? 5 : 4;
  return (
    <div id={id} className={`ipg-team${n <= 3 && !roles ? " is-few" : ""}`} style={{ ["--cols" as string]: cols } as CSSProperties}>
      <AviationTeam people={people} title={title} roles={roles} />
    </div>
  );
}

function Work({ title, cases, all, tone }: { title: string; cases: CaseIndex[]; all?: { href: string; label: string }; tone?: "pale" }) {
  return (
    <section id="work" className={`sv-sec ipg-work${tone ? ` is-${tone}` : ""}`}>
      <div className="v8-wrap">
        <div className="h-row-head"><h2 className="v8-h2">{title}</h2>{all && <a className="v8-link" href={all.href}>{all.label}</a>}</div>
        <ul className="sv-cases">
          {cases.map((c) => <ProjectCard key={c.id} c={c} />)}
        </ul>
      </div>
    </section>
  );
}

/* Services as linked cards: the area, the name, and the service's first line */
function ServiceCards({ id, title, ids, tone }: { id: string; title: string; ids: readonly string[]; tone?: "pale" }) {
  const list = ids.map((x) => serviceById(x)).filter(Boolean) as NonNullable<ReturnType<typeof serviceById>>[];
  if (!list.length) return null;
  return (
    <section id={id} className={`sv-sec ipg-svcs-sec${tone ? ` is-${tone}` : ""}`}>
      <div className="v8-wrap">
        <h2 className="v8-h2">{title}</h2>
        <ul className={`ipg-svc-cards is-${list.length}`}>
          {list.map(({ area, service }) => (
            <li key={service.id} data-reveal>
              <a href={serviceHref(service.id)}>
                <span className="ipg-svc-area">{area.name}</span>
                <b>{service.name}</b>
                <span className="ipg-svc-q">{firstSentence(SERVICES[service.id]?.intro ?? "")}</span>
                <i aria-hidden="true">→</i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Services we provide (was "How we help"): only the services we use most for this industry (Nicole, Nov 10),
   in area order. Since Nov 11 they're the linked text cards the specialty pages use (ServiceCards), not photo
   cards: Nicole didn't want them to look like the Featured projects row that comes right after. */
const helpIds = (ind: Industry) => AREAS.flatMap((a) => a.services.map((sv) => sv.id)).filter((x) => ind.featured.includes(x));

function Talk({ title = TALK.title, text = TALK.text, linksTitle, links }: {
  title?: string; text?: string; linksTitle?: string; links?: { id: string; name: string; href: string; on?: boolean }[];
}) {
  return (
    <section id="talk" className="svt" data-nofill>
      <div className="v8-wrap svt-in">
        <div className="svt-talk">
          <h2 className="v8-h2">{title}</h2>
          {/* TODO(Nicole): closing line to come from Nicole (removed Nov 9) */}
          {text ? <p className="v8-lead">{text}</p> : null}
          <div className="v8-actions">
            <a className="v8-btn v8-btn-area" href="/contact">Get in touch</a>
            <a className="v8-btn v8-btn-ghost" href="/insights/case-studies">See our projects</a>
          </div>
        </div>
        {links && links.length > 0 && (
          <div className="svt-links">
            <nav aria-label={linksTitle}>
              <p className="v8-eyebrow" aria-hidden="true">{linksTitle}</p>
              <ul className="sv-chips ipg-chips">
                {links.map((x) => <li key={x.id}><a href={x.href} aria-current={x.on ? "page" : undefined}><i aria-hidden="true" />{x.name}</a></li>)}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}

function Next({ k, name, text, href, photo }: { k: string; name: string; text: string; href: string; photo: string }) {
  return (
    <a className="sv-next" href={href}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" loading="lazy" />
      <span className="v8-wrap sv-next-in"><em>{k}</em><b>{name}</b><span>{text}</span><i aria-hidden="true">→</i></span>
    </a>
  );
}

const industryLinks = (cur: string) => VISIBLE_INDUSTRIES.map((i) => ({ id: i.id, name: i.name, href: industryHref(i), on: i.id === cur }));

/* ── Industry pages: Transportation, Government & Public Works, Contractors & Engineering Firms ── */
export function IndustryV8({ ind, cases }: { ind: Industry; cases: CaseIndex[] }) {
  const d = IND_DATA[ind.id];
  const subs = ind.subsectors;
  /* "Experience on our team" is off here (Nicole, Nov 10: only on the aviation pages) */
  const people: TeamCard[] = []; // was team(d.people)
  const work = cases.slice(0, 6);
  const next = nextIndustry(ind.id);
  const crumbs: Crumb[] = [["/industries", "Industries"], [industryHref(ind), ind.name]];
  const intl = ind.id === "intl";
  const actions = (
    <>
      <a className="v8-btn v8-btn-area" href="/contact">Get in touch</a>
      {work.length > 0 && <a className="v8-btn v8-btn-ghost" href="#work">See the work</a>}
    </>
  );
  const sections: Nav[] = [
    ...(subs.length ? [["specialties", "Specialties"] as Nav] : []),
    ...(d.ch.length ? [["hear", "Challenges we hear"] as Nav] : []),
    ...(d.ways?.length ? [["ways", "How firms work with us"] as Nav] : []),
    ["help", "How we can help"], // Nicole's wording (preview edit, Nov 11); was "Services we provide"
    ...(intl ? [["abroad", INTL.abroad.title] as Nav, ["region", "Where you'll find us"] as Nav] : []),
    ...(people.length ? [["people", "Experience on our team"] as Nav] : []),
    ...(work.length ? [["work", "Featured projects"] as Nav] : []),
    ["talk", "Talk to us"],
  ];
  const hero = subs.length ? (
    <PanelHero photo={INDUSTRY_PHOTO[ind.id]} crumbs={crumbs} tag="Who we work with" title={ind.name} lead={ind.lead} actions={actions}
      label={ind.id === "transport" ? "Transportation specialties" : "Specialties"}
      subs={subs.map((s) => ({ id: s.id, name: s.name, line: s.line, href: subsectorHref(ind, s), photo: INDUSTRY_PHOTO[s.id] ?? INDUSTRY_PHOTO[ind.id], note: thinNote(s, "Placeholder: thin content") }))} />
  ) : (
    <FrameHero photo={INDUSTRY_PHOTO[ind.id]} crumbs={crumbs} tag="Who we work with" title={ind.name} lead={ind.lead} actions={actions}
 />
  );
  /* pages without specialty panels list the other industries in the section bar */
  const more: SnMore | undefined = subs.length ? undefined : { label: "Industries", links: VISIBLE_INDUSTRIES.map((i) => ({ name: i.name, href: industryHref(i), current: i.id === ind.id })) };
  return (
    <Page sections={sections} hero={hero} more={more}>
      {d.ch.length > 0 && <Hear title="Challenges we hear" items={d.ch} bring={d.bring} />}
      {/* Contractors & Engineering Firms only (Who we work with, Nov 11, 1.2) */}
      {d.ways?.length ? (
        <Route id="ways" title="How firms work with us">
          <RouteList stops={d.ways.map((w) => ({ t: w.t, d: <>{w.d}<LineNote text={w.d} /></> }))} />
        </Route>
      ) : null}
      <ServiceCards id="help" title="How we can help" ids={helpIds(ind)} tone="pale" />
      {intl && (
        <Route id="abroad" title={INTL.abroad.title}>
          <RouteList check ordered={false} stops={INTL.abroad.items.map((x) => ({ d: <>{x.t}{x.flag && <> <Dev>Content status: {x.flag}</Dev></>}</> }))} />
        </Route>
      )}
      {intl && <Region />}
      {people.length > 0 && <Team id="people" title="Experience on our team" people={people} />}
      {work.length > 0 && <Work title="Featured projects" cases={work} all={{ href: `/insights/case-studies?industry=${ind.slug}`, label: `All ${ind.name} projects` }} />}
      <Talk {...(subs.length
        ? { linksTitle: ind.id === "transport" ? "Transportation specialties" : "Specialties", links: subs.map((s) => ({ id: s.id, name: s.name, href: subsectorHref(ind, s) })) }
        : { linksTitle: "Who we work with", links: industryLinks(ind.id) })} />
      <Next k="Next industry" name={next.name} text={next.who} href={industryHref(next)} photo={INDUSTRY_PHOTO[next.id]} />
    </Page>
  );
}

/* ── Specialty pages ── */
export function SubsectorV8({ ind, sub, cases }: { ind: Industry; sub: Subsector; cases: CaseIndex[] }) {
  const d = SUBSECTORS[sub.id];
  const aviation = sub.id === "sub-aviation";
  const avTeam = aviation ? aviationCards() : [];
  const people = !aviation ? [] : team(d?.people ?? []);
  const deliver = d?.deliver ?? [];
  const walk = d?.walk ?? [];
  const xp = d?.xp ?? [];
  const services = d?.services ?? [];
  const k = ind.subsectors.findIndex((s) => s.id === sub.id);
  const nextSub: Subsector | undefined = ind.subsectors[k + 1];
  const nextInd = nextIndustry(ind.id);
  const sections: Nav[] = [
    ...(d?.ch?.length ? [["hear", "Challenges we hear"] as Nav] : []),
    ...(deliver.length ? [["deliver", "What we deliver"] as Nav] : []),
    ...(walk.length ? [["walk", "What you walk away with"] as Nav] : []),
    ...(avTeam.length ? [["aviation", "Our aviation team"] as Nav] : []),
    ...(people.length ? [["people", "Experience on our team"] as Nav] : []),
    ...(services.length ? [["services", "How we can help"] as Nav] : []),
    ...(cases.length ? [["work", "Where we've done this"] as Nav] : []),
    ["talk", "Talk to us"],
  ];
  const sibs = ind.subsectors.map((s) => ({ id: s.id, name: s.name, href: subsectorHref(ind, s), on: s.id === sub.id }));
  const hero = (
    <FrameHero photo={INDUSTRY_PHOTO[sub.id] ?? INDUSTRY_PHOTO[ind.id]}
      crumbs={[["/industries", "Industries"], [industryHref(ind), ind.name], [subsectorHref(ind, sub), sub.name]]}
      tag={<a href={industryHref(ind)}>{ind.name}</a>} title={sub.name} lead={d?.intro || sub.line}
      actions={<><a className="v8-btn v8-btn-area" href="/contact">Talk to an expert</a>{cases.length > 0 && <a className="v8-btn v8-btn-ghost" href="#work">See the work</a>}</>}
      note={thinNote(sub, "Content status: thin content")} />
  );
  return (
    <Page sections={sections} hero={hero} more={{ label: "Specialties", links: sibs.map((x) => ({ name: x.name, href: x.href, current: x.on })) }}>
      {d?.ch?.length ? <Hear title="Challenges we hear" items={d.ch} /> : null}
      {deliver.length > 0 && <Route id="deliver" title="What we deliver"><RouteList check ordered={false} stops={deliver.map((x) => ({ d: <>{x}<LineNote text={x} /></> }))} /></Route>}
      {/* the service page's #walk section (components/v8/service.tsx), same markup and classes: what you walk away with,
          and the unnamed experience lines beside it in "The experience behind it" (Who we work with, Nov 11, 1.3) */}
      {walk.length > 0 && (
        <section id="walk" className="sv-sec svw">
          <div className={`v8-wrap svw-in${xp.length ? "" : " is-solo"}`}>
            <div>
              <h2 className="v8-h2">What you walk away with</h2>
              <RouteList check ordered={false} stops={walk.map((w) => ({ d: <>{w}<LineNote text={w} /></> }))} />
            </div>
            {xp.length > 0 && (
              <aside id="experience" className="svw-xp" aria-labelledby="svw-xp-h" data-reveal>
                <h2 id="svw-xp-h" className="v8-eyebrow">The experience behind it</h2>
                <ul>{xp.map((x) => <li key={x}>{x}<LineNote text={x} /></li>)}</ul>
              </aside>
            )}
          </div>
        </section>
      )}
      {avTeam.length > 0 && <Team id="aviation" people={avTeam} roles={AVIATION_ROLES} />}
      {people.length > 0 && <Team id="people" title="Experience on our team" people={people} />}
      <ServiceCards id="services" title="How we can help" ids={services} />
      {cases.length > 0 && <Work title="Where we've done this" cases={cases} tone="pale" />}
      <Talk linksTitle={ind.id === "transport" ? "Transportation specialties" : "Specialties"} links={sibs} />
      {nextSub
        ? <Next k={`Next in ${ind.name}`} name={nextSub.name} text={nextSub.line} href={subsectorHref(ind, nextSub)} photo={INDUSTRY_PHOTO[nextSub.id] ?? INDUSTRY_PHOTO[ind.id]} />
        : <Next k="Next industry" name={nextInd.name} text={nextInd.who} href={industryHref(nextInd)} photo={INDUSTRY_PHOTO[nextInd.id]} />}
    </Page>
  );
}

/* ── Private Sector: its own sections, order, and words ── */
export function PrivateV8({ ind, cases, services }: { ind: Industry; cases: CaseIndex[]; services: readonly string[] }) {
  /* "Experience on our team" is off here (Nicole, Nov 10: only on the aviation pages) */
  const people: TeamCard[] = []; // was team(IND_DATA.private.people)
  const next = nextIndustry(ind.id);
  const sections: Nav[] = [
    ["hear", "Sound familiar?"],
    ["build", "What we build"],
    ...(cases.length ? [["work", "Featured projects"] as Nav] : []),
    ["start", "Ways to start"],
    ["services", "Services"],
    ...(people.length ? [["people", "Experience on our team"] as Nav] : []),
    ["dot", "Working with a DOT"],
    ["talk", "Talk to us"],
  ];
  const hero = (
    <FrameHero photo={INDUSTRY_PHOTO.private} crumbs={[["/industries", "Industries"], [industryHref(ind), ind.name]]}
      tag="for growing firms" title="Private Sector" lead={ind.lead}
      actions={<a className="v8-btn v8-btn-area" href="/contact">Book a short call</a>} />
  );
  return (
    <Page sections={sections} hero={hero} more={{ label: "Industries", links: VISIBLE_INDUSTRIES.map((i) => ({ name: i.name, href: industryHref(i), current: i.id === ind.id })) }}>
      <Hear title="Sound familiar?" items={PRIV.hear} />
      <Route id="build" title="What we build">
        <RouteList check ordered={false} stops={PRIV.build.map((d) => ({ d }))} />
      </Route>
      {cases.length > 0 && <Work title="Featured projects" cases={cases} tone="pale" />}
      <Route id="start" title="Ways to start" note={<Dev block>Ways to start: confirm wording with Ben. Hours and pricing stay internal.</Dev>}>
        <RouteList stops={PRIV.start.map((s) => ({ t: s }))} />
      </Route>
      <ServiceCards id="services" title="Services" ids={services} tone="pale" />
      {people.length > 0 && <Team id="people" title="Experience on our team" people={people} />}
      {/* high-level, unnamed lines for work we can't describe in detail (Who we work with addendum v2, 3.2) */}
      <Route id="dot" title="When your project depends on a state DOT">
        <RouteList check ordered={false} stops={PRIV.dot.map((d) => ({ d: <>{d}<LineNote text={d} /></> }))} />
      </Route>
      <Talk title="Tell us where your workflows drag" text="A short call is enough to see whether we can help, and what a small first project would look like."
        linksTitle="Who we work with" links={industryLinks(ind.id)} />
      <Next k="Next industry" name={next.name} text={next.who} href={industryHref(next)} photo={INDUSTRY_PHOTO[next.id]} />
    </Page>
  );
}

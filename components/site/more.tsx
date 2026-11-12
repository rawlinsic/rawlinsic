/* About, Insights, Careers, Podcast, News & Recognition, Research,
   Thought Leadership (article kept word for word), Our People, site map. */
import type { ReactNode } from "react";
import { PAGE_PHOTO } from "@/lib/content/media";
import { TEAM_MEMBERS } from "@/lib/team-data";
import { THOUGHT_LEADERSHIP, type ThoughtLeadershipArticle } from "@/components/thought-leadership-data";
import { AREAS, CASES, LEADERS, VISIBLE_INDUSTRIES, WHY, areaHref, caseHref, industryHref, subsectorHref } from "@/lib/content/site";
import { STATES, STATES_ACTIVE, STATES_SERVED, STEPS } from "@/lib/content/catalog";
import { FORMERLY, bareName as bare } from "@/lib/content/people";
import { AWARDS, PUBLICATIONS, RESEARCH, TALKS } from "@/lib/content/research";
import PeopleDirectory, { type Person } from "@/components/site/people";
import PodcastPlayer from "@/components/site/podcast-player";
import Grown from "@/components/v8/grown";
import { EdBand, EdBtn, EdHero, EdSec, EdSplit, EdStats, FaceRows } from "@/components/site/editorial";
import ReadProgress from "@/components/site/read-progress";
import FanCards, { type FanCard } from "@/components/v8/fan-cards";
import { casePhoto } from "@/lib/content/v8";
import TeamWall, { type WallPerson } from "@/components/v8/team-wall";
import { NEWS, EVENTS, isUpcoming } from "@/lib/content/news";
import { cleanNames } from "@/lib/content/clean";
import { Btn, CaseCards, Crumbs, Dev, Hero, List, People, PROD, Sec, Shell, Steps, Talk } from "@/components/site/ui";

/* photo: the page's own hero photo, on top of the card (Insights, full site pass Part 2, 3.1) */
const Cards = ({ items }: { items: { href: string; t: string; d: string; photo?: string }[] }) => (
  <ul className="pg-cards">{items.map((x) => (
    <li key={x.href}>
      <a href={x.href} className={`pg-card pg-card-link${x.photo ? " pg-photo-card" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {x.photo && <img src={x.photo} alt="" loading="lazy" />}
        <b>{x.t}</b><span>{x.d}</span>
      </a>
    </li>
  ))}</ul>
);

/* ── About ── */
export function AboutIndex() {
  /* real counts from our own data: the roster, the states list, and the agency-alumni line used site-wide */
  const people = allPeople();
  const faces = [...veteranPeople(), ...people].filter((p, k, a) => a.findIndex((x) => x.slug === p.slug) === k).slice(0, 6);
  return (
    <Shell>
      <EdHero crumbs={[["/about", "About"]]} kicker="About Rawlins" title={<>People who&apos;ve done the job, and a team that <em>builds the tools.</em></>}
        lead={<p>Founded in 2017 by a former Nevada DOT chief engineer. Today more than 25 of our people come from public agencies, and they work alongside an in-house digital team that builds websites, workflows, dashboards, training, and AI tools.</p>}
        actions={<><EdBtn href="/about/our-people">Meet our people</EdBtn><EdBtn href="/about/who-we-are" kind="ghost">Our story</EdBtn></>}
        aside={<div className="ab-hero-ph">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/pages/team-group-outdoor.webp" alt="" /></div>} />
      <EdStats items={[{ n: "2017", t: "Founded" }, { n: "25+", t: "People who came from public agencies" }, { n: String(people.length), t: "People on our team" }, { n: String(STATES.length), t: "States our work has taken us" }]} />
      <EdSec k="Inside Rawlins" title="Find your way around">
        <ul className="ab-bento">
          <li className="ab-b-who"><a href="/about/who-we-are">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/pages/team-group-indoor.webp" alt="" loading="lazy" /><span className="ab-b-txt"><b>Who we are</b><span>Our story, how we&apos;ve grown since 2017, and why agencies call us.</span></span></a></li>
          <li className="ab-b-people"><a href="/about/our-people"><span className="ab-b-faces">{faces.map((p) => /* eslint-disable-next-line @next/next/no-img-element */ <img key={p.slug} src={p.photo} alt="" loading="lazy" />)}</span><span className="ab-b-txt"><b>Our people</b><span>{people.length} people: advisors who ran the programs, and the specialists who build the tools.</span></span></a></li>
          <li className="ab-b-how"><a href="/about/how-we-work"><span className="ab-b-steps">{STEPS.map(([t], k) => <i key={t}><em>{String(k + 1).padStart(2, "0")}</em>{t}</i>)}</span><span className="ab-b-txt"><b>How we work</b><span>Four steps, worked out with the people who do the work.</span></span></a></li>
          <li className="ab-b-where"><a href="/about/where-we-work"><span className="ab-b-num">{STATES.length}<small>states</small></span><span className="ab-b-txt"><b>Where we work</b><span>Across the United States, with team members in Canada, South Africa, and the UAE.</span></span></a></li>
          <li className="ab-b-careers"><a href="/careers">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/pages/aam-community-engagement.webp" alt="" loading="lazy" /><span className="ab-b-txt"><b>Careers</b><span>Work next to people who&apos;ve done the job.</span></span></a></li>
        </ul>
      </EdSec>
      <Talk />
    </Shell>
  );
}

export function WhoWeAre() {
  const founder = LEADERS[0];
  return (
    <Shell>
      <EdHero crumbs={[["/about", "About"], ["/about/who-we-are", "Who we are"]]} kicker="Who we are" title={<>Founded on <em>agency experience</em></>}
        lead={<p>Rawlins was founded in 2017 by Scott Rawlins, former Deputy Director and Chief Engineer of the Nevada Department of Transportation. Today former agency leaders work alongside an in-house digital team that builds the tools.</p>}
        actions={<><EdBtn href="/about/our-people">Meet our people</EdBtn><EdBtn href="/contact" kind="ghost">Get in touch</EdBtn></>}
        aside={
          <a className="ab-founder" href="/about/our-people#scott-rawlins-pe">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/team/${founder.photo}.webp`} alt="" />
            <span><b>{founder.name}</b><em>{founder.role}</em></span>
          </a>
        } />
      <EdBand src="/images/pages/team-group-indoor.webp" pos="50% 55%" />
      <EdSplit k="Our story" title="From one agency to many">
        <div className="ab-story">
          <p className="ab-story-lead">Scott Rawlins spent 17 years at the Nevada Department of Transportation, including as Deputy Director and Chief Engineer, and then led an infrastructure asset management practice at a global consulting firm. He started Rawlins in 2017 to bring agency experience to the agencies that needed it.</p>
          <p>Some of the projects on this site come from that earlier work, or from our team&apos;s work before they joined us. Those are marked Before Rawlins.</p>
          <p>Advising agency leaders on how to deliver their programs is still a big part of what we do. Since 2017 we&apos;ve added drone and advanced air mobility work, an in-house team that builds integrations, automation, dashboards, and AI, and clients beyond transportation agencies, including local governments, contractors, and engineering firms. Our people work across the United States, and members of our team are based in Canada, South Africa, and the United Arab Emirates.</p>
        </div>
      </EdSplit>
      <Grown eyebrow="Since 2017" title="How we've grown" />
      <EdSec k="Why Rawlins" title="Five reasons agencies call us" tone="navy">
        <ol className="ab-why">{WHY.map(([t, d], k) => <li key={t}><span className="ab-why-n">{String(k + 1).padStart(2, "0")}</span><b>{t}</b><p>{d}</p></li>)}</ol>
      </EdSec>
      <EdSec k="Before Rawlins" title="Where our people have been" intro={<p>Our people ran the programs our clients run. A few of the roles they held:</p>} link={{ href: "/about/our-people", label: "Everyone on our team" }}>
        <ul className="ab-leaders">{LEADERS.map((l) => (
          <li key={l.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/team/${l.photo}.webp`} alt="" loading="lazy" />
            <span><b>{l.name}</b><em>{l.role}</em></span>
          </li>
        ))}</ul>
      </EdSec>
      <TeamWall people={wallPeople()} spot={veteranPeople().map(wall)} />
      <Talk />
    </Shell>
  );
}

const PRINCIPLES: [string, string][] = [
  ["Start where the client is", "Most organizations already have a plan, a framework, or a manual. We put what exists to work before writing anything new."],
  ["Bridge before building", "We use the systems and licenses a client already owns, and build new only when nothing existing can do the job."],
  ["Straight answers on AI", "When a problem needs a rule, a process, or a decision instead of a model, we say so."],
  ["The client owns the result", "Every build comes with documentation and training, and you own it."],
  ["We stay through execution", "Recommendations are where we start. We help put them into practice."],
];
const RUNS: [string, string][] = [
  ["Start with what exists", "Your plans, manuals, data, and systems"],
  ["Work with your own experts", "In working groups and workshops"],
  ["Build the tools people will use", "Manuals, templates, training, dashboards, and working apps"],
  ["Stay through rollout", "Training, onboarding, and support while staff learn the new way"],
];
export function HowWeWork() {
  return (
    <Shell>
      <EdHero crumbs={[["/about", "About"], ["/about/how-we-work", "How we work"]]} kicker="How we work" title={<>Start with what exists. <em>Stay until it runs.</em></>}
        lead={<p>Four steps, worked out with the people who do the work.</p>}
        actions={<><EdBtn href="/contact">Tell us what you&apos;re trying to fix</EdBtn><EdBtn href="/insights/case-studies" kind="ghost">See our projects</EdBtn></>} />
      <section className="ab-steps-sec" data-nofill>
        <ol className="ed-wrap ab-steps">{STEPS.map(([t, d], k) => <li key={t}><span className="ab-step-n">{String(k + 1).padStart(2, "0")}</span><b>{t}</b><p>{d}</p></li>)}</ol>
      </section>
      <EdSec k="What guides us" title="Principles" tone="panel">
        <ul className="ab-principles">{PRINCIPLES.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ul>
      </EdSec>
      <EdSplit k="In practice" title="How a project usually runs">
        <ol className="ab-runs">{RUNS.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ol>
      </EdSplit>
      <Talk />
    </Shell>
  );
}

export function WhereWeWork() {
  /* a state links to its projects only when a project carries its tag (unnamed-client work has no state tag) */
  const tagged = new Set(CASES.flatMap((c) => c.states));
  const chips = (list: string[]) => (
    <ul className="pg-chips">{[...list].sort().map((s) => <li key={s}>{tagged.has(s)
      ? <a href={`/insights/case-studies?state=${s.toLowerCase().replace(/\s+/g, "-")}`}>{s}</a>
      : <span className="pg-chip">{s}</span>}</li>)}</ul>
  );
  return (
    <Shell scene="map" highlight={STATES} strong={STATES_ACTIVE}>
      <Hero crumbs={[["/about", "About"], ["/about/where-we-work", "Where we work"]]} kicker="Where we work" title="Across the United States"
        lead={<p>The states where our work has taken us. Our work so far has been in the United States, and our team can work anywhere. Members of our team are based in Canada, South Africa, and the United Arab Emirates.</p>} actions={<Btn href="/insights/case-studies" primary>See our projects</Btn>}>
        <ul className="pg-map-legend" aria-label="Map key">
          <li><i className="is-active" aria-hidden="true" />Active</li>
          <li><i aria-hidden="true" />Areas we&apos;ve served</li>
        </ul>
      </Hero>
      <EdStats items={[{ n: String(STATES_ACTIVE.length), t: "States with active work" }, { n: String(STATES.length), t: "States our work has taken us" }, { n: "3", t: "Countries outside the U.S. where team members are based" }]} />
      <section className="ed-sec" data-nofill>
        <div className="ed-wrap ab-where">
          <div><p className="ed-k">Active now</p><h2 className="ed-h2">Active</h2>{chips(STATES_ACTIVE)}</div>
          <div><p className="ed-k">Since 2017</p><h2 className="ed-h2">Areas we&apos;ve served</h2>{chips(STATES_SERVED)}</div>
        </div>
      </section>
      <Talk />
    </Shell>
  );
}

/* ── Our People ── */
const memberSlug = (name: string) => name.toLowerCase().replace(/[.,]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
/* former agency roles: lib/content/people.ts (the same list the people cards use) */
const BUSINESS = /Accounting|Administrative Assistant|Professional Services|VP of Finance|Chief Culture|Administration & Contract/;
const SPECIALIST = /Specialist|Designer|Engineer\b|Architect|Tester|Digital Strategy|Chief AI Strategy/;
function personFromRoster(m: (typeof TEAM_MEMBERS)[number]): Person {
  const role = m.title && m.title !== m.role ? `${m.title}, ${m.role}` : m.role;
  const group: Person["group"] = BUSINESS.test(m.role) ? "Business Operations" : SPECIALIST.test(m.role) ? "Specialists" : "Advisors";
  const areas = new Set<string>();
  if (m.categories.includes("strategy")) areas.add("strategy-organization");
  if (m.categories.includes("operations") && group !== "Business Operations") { areas.add("project-delivery"); areas.add("operations-maintenance"); }
  if (m.categories.includes("technology") || m.categories.includes("communication-brand-design")) areas.add("digital-solutions");
  if (/Aerial|Jordan Stacy|John Zuleger/.test(`${m.role} ${m.name}`)) { areas.add("drones-advanced-air-mobility"); if (!/Infrastructure Technologies|Jordan/.test(`${m.role} ${m.name}`)) areas.delete("digital-solutions"); }
  /* Nicole works across Strategy & Organization, Project Delivery, and Digital Solutions (her call, Nov 10;
     not Operations & Maintenance or Drones) */
  if (/^Nicole Arakorpi/.test(m.name)) { areas.clear(); ["strategy-organization", "project-delivery", "digital-solutions"].forEach((a) => areas.add(a)); }
  return {
    slug: memberSlug(m.name), name: m.name, photo: m.photo, role, group, areas: Array.from(areas),
    formerly: FORMERLY[bare(m.name)], location: m.location, email: m.email, phone: m.phone, linkedin: m.linkedin, background: cleanNames(m.background), achievements: cleanNames(m.achievements),
  };
}
/* People for the moving strip on home: the advisors and specialists from Our
   people, founder first, then the people who ran agency programs. Each opens
   their profile in a pop-up there. */
export function stripPeople(): Person[] {
  const rank = (p: Person) => (/Founder/.test(p.role) ? 0 : p.formerly ? 1 : p.group === "Advisors" ? 2 : 3);
  return TEAM_MEMBERS.map(personFromRoster)
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => p.group !== "Business Operations")
    .sort((a, b) => rank(a.p) - rank(b.p) || a.i - b.i)
    .map(({ p }) => p);
}
/* Everyone on the roster as a profile (for the bio pop-ups on team cards) */
export function allPeople(): Person[] { return TEAM_MEMBERS.map(personFromRoster); }
/* The people who ran agency programs (they have a former agency role), founder first. */
export function veteranPeople(): Person[] {
  return stripPeople().filter((p) => p.formerly);
}
/* Meet the team (Who we are): everyone, founder first, for the wall of faces */
const wall = (p: Person): WallPerson => ({ slug: p.slug, name: p.name, photo: p.photo, role: p.role, formerly: p.formerly });
function wallPeople(): WallPerson[] {
  const people = TEAM_MEMBERS.map(personFromRoster);
  const founder = people.findIndex((p) => /Founder/.test(p.role));
  if (founder > 0) people.unshift(people.splice(founder, 1)[0]);
  return people.map(wall);
}
export function OurPeople() {
  const people = TEAM_MEMBERS.map(personFromRoster);
  const founder = people.findIndex((p) => /Founder/.test(p.role));
  if (founder > 0) people.unshift(people.splice(founder, 1)[0]);
  const count = (g: Person["group"]) => people.filter((p) => p.group === g).length;
  return (
    <Shell>
      <EdHero dark crumbs={[["/about", "About"], ["/about/our-people", "Our people"]]} kicker="Our people" title={<>The people <em>behind the work</em></>}
        lead={<p>More than 25 of our people came from public agencies. They work next to the specialists who build the tools, and you work directly with the people doing the work.</p>}>
        <FaceRows people={people} />
        <dl className="ed-wrap pp-hero-stats">
          <div><dt>People on our team</dt><dd>{people.length}</dd></div>
          <div><dt>Advisors</dt><dd>{count("Advisors")}</dd></div>
          <div><dt>Specialists</dt><dd>{count("Specialists")}</dd></div>
          <div><dt>Business operations</dt><dd>{count("Business Operations")}</dd></div>
        </dl>
      </EdHero>
      <section className="pg-sec pg-body pp-body" data-nofill><div className="pg-wrap">
        <PeopleDirectory people={people} showDev={!PROD} areas={AREAS.map((a) => ({ value: a.slug, label: a.name }))} />
      </div></section>
      {/* TODO(Nicole): title and line to come from Nicole ("Talk to the right person" and its line were removed, Nov 9) */}
      <Talk title="Tell us what you're working on" text="" />
    </Shell>
  );
}

/* ── Careers (live content kept) ── */
export type Position = { title: string; href: string; summary: string };
/* What it's like here (for people who might join us, not the client-facing WHY points) */
const CAREERS_WHY: [string, string][] = [
  ["Learn from people who've done the job", "More than 25 of our people came from public agencies. You'll work next to people who ran the programs."],
  ["Strategy and build, side by side", "Advisors and our in-house build team work on the same projects."],
  ["Work from where you are", "Our people work across the United States, and members of our team are based in Canada, South Africa, and the United Arab Emirates."],
  /* not "senior people do the work" (Nicole, Nov 9-10) */
  ["Small firm, real work", "We're a small firm, so you work directly with the people leading the work, on work that matters to the agencies we serve."],
];
export const OPEN_POSITIONS: Position[] = [];
export function Careers() {
  return (
    <Shell>
      <EdHero crumbs={[["/careers", "Careers"]]} kicker="Careers at Rawlins" title={<>Work with people who&apos;ve <em>done the job</em></>}
        lead={<p>We hire people who&rsquo;ve done the work inside public agencies, and people who build the tools that make the work easier. If that sounds like you, we&rsquo;d like to hear from you.</p>}
        actions={<><EdBtn href="mailto:jobs@rawlinsic.com">Email jobs@rawlinsic.com</EdBtn><EdBtn href="/about/our-people" kind="ghost">Meet our people</EdBtn></>}
        aside={<div className="ab-hero-ph">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/pages/team-group-outdoor.webp" alt="" /></div>} />
      <EdSec k="What it's like here" title="Why people join us" tone="panel">
        <ol className="ab-principles ab-careers">{CAREERS_WHY.map(([t, d], k) => <li key={t}><span className="ab-why-n">{String(k + 1).padStart(2, "0")}</span><b>{t}</b><p>{d}</p></li>)}</ol>
      </EdSec>
      <EdSec k="Open positions" title={OPEN_POSITIONS.length ? "Open positions" : "No open positions right now"}>
        {OPEN_POSITIONS.length ? (
          <ul className="pg-cards">{OPEN_POSITIONS.map((p) => <li key={p.href}><a href={p.href} className="pg-card pg-card-link"><b>{p.title}</b><span>{p.summary}</span></a></li>)}</ul>
        ) : (
          <div className="ab-apply">
            <p>Send us a note and your résumé at <a href="mailto:jobs@rawlinsic.com">jobs@rawlinsic.com</a>, and we&rsquo;ll be in touch when there&rsquo;s a fit.</p>
            <EdBtn href="mailto:jobs@rawlinsic.com">Send your résumé</EdBtn>
            <Dev>Placeholder: no open positions posted.</Dev>
          </div>
        )}
      </EdSec>
      <Talk />
    </Shell>
  );
}

/* ── Insights ── */
export function InsightsIndex() {
  /* the fanned cards (Nicole's idea, Nov 10): a mix of everything in Insights, each card going to its page */
  const art = THOUGHT_LEADERSHIP[0];
  const next = EVENTS.find((e) => !e.placeholder && isUpcoming(e));
  const proj = (id: string) => CASES.find((c) => c.id === id);
  const p1 = proj("cs-proficiency"), p2 = proj("cs-strategic");
  const cards: FanCard[] = [
    ...(art ? [{ href: `/insights/thought-leadership/${art.slug}`, tag: "Thought leadership", title: art.title, photo: "/images/pages/auto-data.webp" }] : []),
    { href: "/insights/research", tag: "Research", title: PUBLICATIONS[0]?.title ?? "Research & Publications", photo: "/images/pages/aam-policy-planning.webp", pos: "40% 40%" },
    ...(next ? [{ href: "/insights/news", tag: "Where we'll be", title: `${next.title}, ${next.where ?? ""} · ${next.when}`.replace(", ·", " ·"), photo: "/images/pages/aam-community-engagement.webp" }] : []),
    ...(p1 ? [{ href: caseHref(p1), tag: "Project", title: p1.title, photo: casePhoto(p1) }] : []),
    { href: "/insights/news", tag: "Recognition", title: "Awards and recognition our people have earned", photo: "/images/pages/team-group-outdoor.webp" },
    ...(p2 ? [{ href: caseHref(p2), tag: "Project", title: p2.title, photo: casePhoto(p2) }] : []),
    { href: "/insights/podcast", tag: "Podcast", title: "The Rawlins Way: conversations with the people doing the work", photo: PAGE_PHOTO.podcast },
  ];
  return (
    <Shell>
      <section className="fan-sec" data-nofill>
        <div className="ed-wrap fan-head">
          <nav className="pg-crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><span aria-current="page">Insights</span></li></ol></nav>
          <h1 className="fan-h">What we&apos;ve done, and <em>what we&apos;re learning.</em></h1>
        </div>
        <FanCards cards={cards} label="Insights" start={2} />
        <ul className="ed-wrap fan-links">
          <li><a href="/insights/case-studies">Projects</a></li>
          <li><a href="/insights/news">News &amp; Recognition</a></li>
          <li><a href={THOUGHT_HREF}>Thought Leadership</a></li>
          <li><a href="/insights/research">Research &amp; Publications</a></li>
          <li><a href="/insights/podcast">Podcast</a></li>
        </ul>
      </section>
      <Talk />
    </Shell>
  );
}

function NewsList({ items }: { items: typeof NEWS }) {
  return (
    <ul className="pg-news">
      {items.map((n) => (
        <li key={n.title} className={n.placeholder ? "is-dev" : ""}>
          <span className="pg-case-k">{n.tag}{n.date ? ` · ${n.date}` : ""}</span>
          <b>{n.href ? <a href={n.href} {...(/^http/.test(n.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{n.title}</a> : n.title}</b>
          {n.text && <p>{n.text}</p>}
          {n.linkedin && <a href={n.linkedin} target="_blank" rel="noopener noreferrer">See the post on LinkedIn</a>}
          {n.placeholder && <Dev>Placeholder: {n.placeholder}</Dev>}
        </li>
      ))}
    </ul>
  );
}

export function NewsPage() {
  const items = NEWS.filter((n) => !n.placeholder || !PROD);
  const real = items.filter((n) => !n.placeholder), ph = items.filter((n) => n.placeholder);
  const events = EVENTS.filter((e) => (!e.placeholder || !PROD) && isUpcoming(e));
  const [top, ...rest] = real;
  /* the featured story's picture: the article's own photo when it's our article */
  const art = THOUGHT_LEADERSHIP.find((a) => top?.href?.endsWith(a.slug));
  const ext = (h?: string) => (h && /^http/.test(h) ? { target: "_blank", rel: "noopener noreferrer" } : {});
  return (
    <Shell>
      <EdHero crumbs={[["/insights", "Insights"], ["/insights/news", "News & Recognition"]]} kicker="Insights" title={<>News &amp; <em>Recognition</em></>}
        lead={<p>Where we&apos;ll be, what our team is publishing, and the recognition our people have earned.</p>}
        actions={<><EdBtn href="/insights/research">Research &amp; Publications</EdBtn><EdBtn href="/about/our-people" kind="ghost">Meet our people</EdBtn></>} />
      {events.length > 0 && (
        <EdSec k="Where we'll be" title="Coming up" tone="navy">
          <ul className="nw2-events">{events.map((e) => {
            const m = e.when.match(/^(\w+)\s+([\d–-]+),?\s*(\d{4})?/);
            return (
              <li key={e.title} className={e.placeholder ? "is-dev" : ""}>
                <span className="nw2-date">{m ? <><em>{m[1]}</em><b>{m[2]}</b><small>{m[3]}</small></> : <b>{e.when}</b>}</span>
                <span className="nw2-ev"><b>{e.title}</b>{e.where && <span>{e.where}</span>}{e.line && <p>{e.line}</p>}{e.note && <p>{e.note}</p>}{e.placeholder && <Dev>Placeholder: {e.placeholder}</Dev>}</span>
              </li>
            );
          })}</ul>
        </EdSec>
      )}
      <EdSec k="Latest" title="From our team">
        <div className="nw2-latest">
          {top && (
            <a className="nw2-feature" href={top.href} {...ext(top.href)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={art?.image ?? PAGE_PHOTO.news} alt="" loading="lazy" />
              <span className="nw2-body"><span className="nw2-tag">{top.tag}{top.date ? ` · ${top.date}` : ""}</span><b>{top.title}</b>{top.text && <p>{top.text}</p>}<span className="ed-more">Read it</span></span>
            </a>
          )}
          <ul className="nw2-list">
            {rest.map((n) => (
              <li key={n.title}><a href={n.href} {...ext(n.href)}><span className="nw2-tag">{n.tag}{n.date ? ` · ${n.date}` : ""}</span><b>{n.title}</b>{n.text && <p>{n.text}</p>}<span className="ed-more">{n.href && /linkedin/.test(n.href) ? "Read it on LinkedIn" : "Read more"}</span></a></li>
            ))}
            {ph.map((n) => <li key={n.title} className="is-dev"><div><span className="nw2-tag">{n.tag}</span><b>{n.title}</b><Dev>Placeholder: {n.placeholder}</Dev></div></li>)}
          </ul>
        </div>
      </EdSec>
      <EdSec k="Recognition" title="Awards and recognition" tone="panel">
        <ul className="nw2-awards">{AWARDS.map((a) => (
          <li key={a.href}>
            <span className="nw2-tag">{a.year}{a.before ? " · Before Rawlins" : ""}</span>
            <b>{a.title}</b><p>{a.from}</p>
            <ByLine names={a.people} />
            <a className="ed-more" href={a.href} target="_blank" rel="noopener noreferrer">The announcement</a>
          </li>
        ))}</ul>
      </EdSec>
      <EdSec k="Research" title="National research by our people" link={{ href: "/insights/research", label: "All research and publications" }}>
        <ul className="nw2-pubs">{PUBLICATIONS.slice(0, 3).map((x) => (
          <li key={x.href}><a href={x.href} target="_blank" rel="noopener noreferrer"><span className="nw2-tag">{x.series} · {x.year}</span><b>{x.title}</b><span className="nw2-who">{x.people.join(", ")}</span></a></li>
        ))}</ul>
      </EdSec>
      <Talk />
    </Shell>
  );
}

/* Research & Publications (Nicole, Nov 10: "this page doesn't show really anything"): the reports people on our
   team have published (each checked against the publisher's page), the research we're doing now, talks, and a
   place for awards and recognition. */
function ByLine({ names }: { names: string[] }) {
  const all = allPeople();
  return (
    <span className="rs-by">
      {names.map((n) => {
        const p = all.find((x) => x.name.startsWith(n));
        return (
          <a key={n} href={p ? `/about/our-people#${p.slug}` : "/about/our-people"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {p?.photo && <img src={p.photo} alt="" width={40} height={40} loading="lazy" />}{n}
          </a>
        );
      })}
    </span>
  );
}
export function ResearchPage() {
  /* the list lives in lib/content/research.ts (the Insights menu reads it too); the guide is listed with the reports */
  const now = RESEARCH.filter((r) => r.k !== "Guidance");
  return (
    <Shell scene="crossing" photo={PAGE_PHOTO.research}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/research", "Research & Publications"]]} kicker="Insights" title="Research & Publications"
        lead={<p>National research reports written by people on our team, the research we&apos;re doing now, and where our people have spoken.</p>} />
      <section data-nofill className="pj-sec rs-pubs" id="publications">
        <div className="pg-wrap">
          <h2 className="pj-h">Published research</h2>
          <p className="rs-intro">Reports our people wrote for the Transportation Research Board, the Federal Highway Administration, and state DOT research programs, most before they joined Rawlins.</p>
          <ul className="rs-list">
            {PUBLICATIONS.map((x) => (
              <li key={x.href}>
                <a className="rs-card" href={x.href} target="_blank" rel="noopener noreferrer">
                  <span className="rs-top"><span className="rs-series">{x.series}</span><span className="rs-year">{x.year}</span></span>
                  <b>{x.title}</b>
                  {x.line && <p>{x.line}</p>}
                  <span className="rs-pub">{x.publisher}{x.before ? " · Before Rawlins" : ""}</span>
                  <span className="pj-more">Read the report</span>
                </a>
                <ByLine names={x.people} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section data-nofill className="pj-sec pj-did rs-now">
        <div className="pg-wrap">
          <h2 className="pj-h">Research we&apos;re doing now</h2>
          <ul className="pj-did-list">
            {now.map((r) => (
              <li key={r.t}><span className="rs-k">{r.k}</span><b className="rs-now-t">{r.t}</b><p>{r.link && <a href={r.link.href}>{r.link.label}</a>}{r.text}</p></li>
            ))}
          </ul>
        </div>
      </section>
      <section data-nofill className="pj-sec rs-talks">
        <div className="pg-wrap rs-two">
          <div>
            <h2 className="pj-h">Talks</h2>
            <ul className="rs-rows">
              {TALKS.map((t) => (
                <li key={t.href}><span className="rs-series">{t.when}</span><b>{t.title}</b><span className="rs-pub">{t.event}</span><ByLine names={t.people} /><a className="pj-more" href={t.href} target="_blank" rel="noopener noreferrer">Speaker page</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="pj-h">Awards and recognition</h2>
            <ul className="rs-rows">
              {AWARDS.map((a) => (
                <li key={a.href}><span className="rs-series">{a.year}{a.before ? " · Before Rawlins" : ""}</span><b>{a.title}</b><span className="rs-pub">{a.from}</span><ByLine names={a.people} /><a className="pj-more" href={a.href} target="_blank" rel="noopener noreferrer">The announcement</a></li>
              ))}
            </ul>
            <Dev block>Placeholder: awards and recognition for Rawlins and our people go here as they come in.</Dev>
          </div>
        </div>
      </section>
      <Talk />
    </Shell>
  );
}

/* Thought leadership: with one article, links go straight to it (Nicole, Nov 10); the list returns with a second */
export const THOUGHT_HREF = THOUGHT_LEADERSHIP.length === 1 ? `/insights/thought-leadership/${THOUGHT_LEADERSHIP[0].slug}` : "/insights/thought-leadership";
export function ThoughtIndex() {
  return (
    <Shell scene="network" photo={PAGE_PHOTO.thought}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/thought-leadership", "Thought Leadership"]]} kicker="Insights" title="Thought Leadership"
        lead={<p>Practical perspectives from our team on strategy, technology, data governance, and organizational change.</p>} />
      <Sec>
        <ul className="pg-cards">
          {THOUGHT_LEADERSHIP.map((a) => (
            <li key={a.slug}>
              <a href={`/insights/thought-leadership/${a.slug}`} className="pg-card pg-card-link pg-article-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt="" width={a.imageWidth ?? 1600} height={a.imageHeight ?? 650} loading="lazy" />
                <span className="pg-case-k">{a.category} · {a.dateLabel}</span>
                <b>{a.title}</b>
                <span>{a.excerpt}</span>
              </a>
            </li>
          ))}
        </ul>
      </Sec>
      <Talk />
    </Shell>
  );
}

export function ArticlePage({ a }: { a: ThoughtLeadershipArticle }) {
  /* Nicole, Nov 10: "that article page needs to be designed better". The questions become sections with
     their own anchors, listed down the side; callouts become pull quotes; a bar shows how far you've read. */
  type B = ThoughtLeadershipArticle["content"][number];
  const pre: B[] = [];
  const qs: { q: string; id: string; body: B[] }[] = [];
  for (const b of a.content) {
    if (b.type === "question") { qs.push({ q: b.text ?? "", id: `q${qs.length + 1}`, body: [] }); continue; }
    if (b.type === "divider") continue;
    if (qs.length) qs[qs.length - 1].body.push(b); else pre.push(b);
  }
  return (
    <Shell>
      <ReadProgress target=".ax-main" />
      <header className="ax-hero" data-nofill>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ax-hero-bg" src={a.heroImage || a.image} alt="" />
        <div className="ed-wrap ax-hero-in">
          <Crumbs items={[["/insights", "Insights"], [`/insights/thought-leadership/${a.slug}`, "Thought leadership"]]} />
          <p className="ed-k">{a.category} · {a.dateLabel}</p>
          <h1 className="ax-h1">{a.title}</h1>
          <p className="ax-sub">{a.subtitle}</p>
          <div className="ax-by">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.authorImage} alt="" width={64} height={64} />
            <span><b>{a.author}</b><em>{a.authorRole}</em></span>
          </div>
          <div className="ed-btns"><EdBtn href={a.pdfUrl} kind="white">Download the PDF</EdBtn><EdBtn href="#q1" kind="ghost">Start reading</EdBtn></div>
        </div>
      </header>
      <section className="ax-body" data-nofill>
        <div className="ed-wrap ax-grid">
          <aside className="ax-toc">
            <p className="ed-k">{a.accordionLabel ?? "In this Q&A"}</p>
            <ol>{qs.map((x, k) => <li key={x.id}><a href={`#${x.id}`}><span>{String(k + 1).padStart(2, "0")}</span>{x.q}</a></li>)}</ol>
          </aside>
          <article className="ax-main">
            {pre.map((b, k) => <Block key={`p${k}`} b={b} />)}
            {qs.map((x) => (
              <section key={x.id} id={x.id} className="ax-q">
                <h2>{a.showQBadge !== false && <span className="ax-q-badge" aria-hidden="true">Q</span>}{x.q}</h2>
                {x.body.map((b, k) => <Block key={k} b={b} />)}
              </section>
            ))}
            {a.finalThought && <div className="ax-final"><b>{a.finalThought.label}</b><p>{a.finalThought.text}</p>{a.finalThought.body && <p>{a.finalThought.body}</p>}</div>}
            {a.acknowledgment && <p className="pg-ack">{a.acknowledgment}</p>}
          </article>
        </div>
      </section>
      <section className="ax-author" data-nofill>
        <div className="ed-wrap ax-author-in">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.authorImage} alt="" width={120} height={120} />
          <div>
            <p className="ed-k">About the author</p>
            <b>{a.author}</b><em>{a.authorRole}</em>
            <p className="ax-contact">
              <a href={`mailto:${a.authorEmail}`}>{a.authorEmail}</a>
              <a href={`tel:${a.authorPhone.replace(/[^\d+]/g, "")}`}>{a.authorPhone}</a>
              {a.authorLinkedIn && <a href={a.authorLinkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
            </p>
          </div>
          <div className="ax-more">
            <a href="/insights/research"><b>Research &amp; Publications</b><span>National reports by our people</span></a>
            <a href="/insights/podcast"><b>Podcast</b><span>The Rawlins Way</span></a>
          </div>
        </div>
      </section>
      {a.cta ? <Talk title={a.cta.title} text={a.cta.body} /> : <Talk />}
    </Shell>
  );
}
function Block({ b }: { b: ThoughtLeadershipArticle["content"][number] }) {
  switch (b.type) {
    case "intro": return <p className="pg-article-intro">{b.text}{b.footnote && <sup>{b.footnote}</sup>}</p>;
    case "heading": return <h2 className="pg-h3">{b.text}</h2>;
    case "list": return <List items={b.items ?? []} />;
    case "callout": return <blockquote className="ax-pull"><p>{b.text}</p></blockquote>;
    case "answer": return <p className="ax-answer-lead">{b.text}</p>;
    case "divider": return <hr className="pg-hr" />;
    case "citation": return <p className="pg-cite">{b.text}</p>;
    default: return <p>{b.text}</p>;
  }
}

/* ── Podcast (live content kept) ── */
export function Podcast() {
  return (
    <Shell scene="office" photo={PAGE_PHOTO.podcast}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/podcast", "Podcast"]]} kicker="Listen in · Learn more · Lead better" title="The Rawlins Way" />
      <Sec>
        <div className="pg-two">
          <div>
            <p className="pg-kicker">About the podcast</p>
            <h2 className="pg-h2">Conversations with the people doing the work.</h2>
            <div className="pg-prose" style={{ marginTop: 14 }}>
              <p>The Rawlins Way is our podcast: project deep dives, conversations with our team, and discussions of the issues agencies are working through.</p>
            </div>
          </div>
          <div>
            <p className="pg-kicker"><span className="pg-live" aria-hidden="true" /> Now streaming</p>
            <PodcastPlayer />
          </div>
        </div>
      </Sec>
      <Talk title="Have a topic or a story to share?" text="Get in touch." />
    </Shell>
  );
}

/* ── Site map ── */
export function SiteMapPage() {
  return (
    <Shell>
      <Hero scene={false} crumbs={[["/site-map", "Site map"]]} title="Site map" />
      <section className="pg-sec pg-body"><div className="pg-wrap pg-sitemap">
        <div>
          <h2 className="pg-h3"><a href="/#what">What we do</a></h2>
          <ul>{AREAS.map((a) => <li key={a.id}><a href={areaHref(a)}>{a.name}</a><ul>{a.services.map((s) => <li key={s.id}><a href={`/services/${a.slug}/${s.slug}`}>{s.name}</a></li>)}</ul></li>)}</ul>
        </div>
        <div>
          <h2 className="pg-h3"><a href="/industries">Who we work with</a></h2>
          <ul>{VISIBLE_INDUSTRIES.map((i) => <li key={i.id}><a href={industryHref(i)}>{i.name}</a>{i.subsectors.length > 0 && <ul>{i.subsectors.map((s) => <li key={s.id}><a href={subsectorHref(i, s)}>{s.name}</a></li>)}</ul>}</li>)}</ul>
          <h2 className="pg-h3"><a href="/insights">Insights</a></h2>
          <ul>
            <li><a href="/insights/news">News &amp; Recognition</a></li>
            <li><a href="/insights/thought-leadership">Thought Leadership</a><ul>{THOUGHT_LEADERSHIP.map((a) => <li key={a.slug}><a href={`/insights/thought-leadership/${a.slug}`}>{a.title}</a></li>)}</ul></li>
            <li><a href="/insights/research">Research &amp; Publications</a></li>
            <li><a href="/insights/podcast">Podcast</a></li>
          </ul>
          <h2 className="pg-h3"><a href="/about">About</a></h2>
          <ul>
            <li><a href="/about/who-we-are">Who we are</a></li><li><a href="/about/how-we-work">How we work</a></li><li><a href="/about/our-people">Our people</a></li>
            <li><a href="/about/where-we-work">Where we work</a></li><li><a href="/careers">Careers</a></li><li><a href="/contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy</a></li><li><a href="/terms-of-service">Terms</a></li><li><a href="/accessibility">Accessibility</a></li>
          </ul>
        </div>
        <div>
          <h2 className="pg-h3"><a href="/insights/case-studies">Projects</a></h2>
          <ul>{CASES.map((c) => <li key={c.id}><a href={caseHref(c)}>{c.title}</a></li>)}</ul>
        </div>
      </div></section>
    </Shell>
  );
}

export { CaseCards };

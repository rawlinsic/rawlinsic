/* About, Insights, Careers, Podcast, News & Recognition, Research,
   Thought Leadership (article kept word for word), Our People, site map. */
import type { ReactNode } from "react";
import { PAGE_PHOTO } from "@/lib/content/media";
import { TEAM_MEMBERS } from "@/lib/team-data";
import { THOUGHT_LEADERSHIP, type ThoughtLeadershipArticle } from "@/components/thought-leadership-data";
import { AREAS, CASES, LEADERS, VISIBLE_INDUSTRIES, WHY, areaHref, caseHref, industryHref, subsectorHref, isListed } from "@/lib/content/site";
import { STATES, STATES_ACTIVE, STATES_SERVED, STEPS } from "@/lib/content/catalog";
import { FORMERLY, bareName as bare } from "@/lib/content/people";
import { AWARDS, PUBLICATIONS, RESEARCH, TALKS } from "@/lib/content/research";
import PeopleDirectory, { Pin, type Person } from "@/components/site/people";
import PodcastPlayer from "@/components/site/podcast-player";
import Grown from "@/components/v8/grown";
import { EdBand, EdBtn, EdHero, EdSec, EdSplit, EdStats, FaceRows } from "@/components/site/editorial";
import ReadProgress from "@/components/site/read-progress";
import AuthorPop from "@/components/site/author-pop";
import WhereMap, { type WwProject } from "@/components/site/where-map";
import PhotoGallery from "@/components/site/photo-gallery";
import WhyRow from "@/components/v8/why-row";
import { tvPeople, whyItems } from "@/components/v8/why-items";
import FanCards, { type FanCard } from "@/components/v8/fan-cards";
import { casePhoto } from "@/lib/content/v8";
import TeamWall, { type WallPerson } from "@/components/v8/team-wall";
import { NEWS, EVENTS, isUpcoming, eventsByTime } from "@/lib/content/news";
import { UpcomingEvents, PastEvents } from "@/components/site/events";
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

/* Team photos for the Who we are gallery (Nicole's folder "about page gallery", Nov 11). Sized for the web with
   location data removed; one is cropped above a drink bottle. The Hawaii and AMOTIA photos are the copies already
   on the site (other sponsors' logos blurred). Left out: the AASHTO STEM challenge photo (AASHTO's own photo, and
   it shows children). */
const G = (f: string, alt: string, w: number, h: number) => ({ src: `/images/gallery/${f}.webp`, alt, w, h });
const TEAM_GALLERY = [
  { src: "/images/pages/team-group-indoor.webp", alt: "Our whole team at the 2026 retreat", w: 1800, h: 797 },
  G("lakeside-three", "Three teammates on a lakeside dock", 1400, 1050),
  G("retreat-data-session", "A teammate presenting a data session at our retreat", 1400, 1050),
  { src: "/images/pages/team-group-outdoor.webp", alt: "Our team together outdoors at a 2026 conference", w: 2000, h: 1500 },
  G("ocean-balcony", "Teammates on a balcony above the ocean", 1400, 1050),
  { src: "/images/pages/research-paul-wheeler-nashville-symposium-2025.webp", alt: "A teammate presenting at a drone and advanced air mobility symposium", w: 1600, h: 1032 },
  G("lake-evening-five", "Five teammates by the lake at dusk", 1400, 1050),
  G("conference-session-sign", "Two teammates at a conference general session", 1055, 1400),
  { src: "/images/pages/insights-hawaii-summit-2026-team.webp", alt: "Our team at a 2026 summit in Hawaii", w: 1600, h: 840 },
  G("retreat-drone-session", "A teammate presenting drone imagery at our retreat", 1400, 1050),
  G("lake-evening-selfie", "Teammates together by the lake in the evening", 1400, 756),
  G("team-savannah", "Our team on the steps of a building in Savannah", 596, 640),
  { src: "/images/pages/news-amotia-2026-general-session.webp", alt: "Our founder on a general session panel", w: 1600, h: 1036 },
  G("winter-three", "Three teammates on a winter day", 1050, 1400),
  G("lake-evening-three", "Three teammates at sunset", 1400, 1050),
  G("palm-trees", "Teammates behind palm trees", 480, 640),
  G("lake-night-three", "Three teammates in the evening", 1050, 1400),
  G("mural-two", "Two teammates in front of a mural", 853, 1400),
  G("lake-window-two", "Two teammates by a window over the lake", 1050, 1400),
];

/* ── About ── */
export function AboutIndex() {
  /* real counts from our own data: the roster, the states list, and the agency-alumni line used site-wide */
  const people = allPeople();
  const faces = [...veteranPeople(), ...people].filter((p, k, a) => a.findIndex((x) => x.slug === p.slug) === k).slice(0, 6);
  return (
    <Shell>
      <EdHero crumbs={[["/about", "About"]]} kicker="About Rawlins" title={<>Agency experience, and a team that <em>builds the tools.</em></>}
        lead={<p>Founded in 2017 by a former Nevada DOT chief engineer. Today more than 25 of our people come from public agencies, and they work alongside an in-house digital team that builds websites, workflows, dashboards, training, and AI tools.</p>}
        actions={<><EdBtn href="/about/our-people">Meet our people</EdBtn><EdBtn href="/about/who-we-are" kind="ghost">Our story</EdBtn></>}
        aside={<div className="ab-hero-ph">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/pages/team-group-outdoor.webp" alt="" /></div>} />
      <EdStats items={[{ n: "2017", t: "Founded" }, { n: "25+", t: "People who came from public agencies" }, { n: String(people.length), t: "People on our team" }, { n: String(STATES.length), t: "States our work has taken us" }]} />
      <EdSec k="Inside Rawlins" title="Find your way around">
        <ul className="ab-bento">
          <li className="ab-b-who"><a href="/about/who-we-are">{/* eslint-disable-next-line @next/next/no-img-element */}{/* our team at the 2026 Hawaii summit; the outdoor group photo is already this page's top photo (Nicole, Nov 11: no large indoor group photo) */}<img src="/images/pages/insights-hawaii-summit-2026-team.webp" alt="" loading="lazy" /><span className="ab-b-txt"><b>Who we are</b><span>Our story, how we&apos;ve grown since 2017, and why agencies call us.</span></span></a></li>
          <li className="ab-b-people"><a href="/about/our-people"><span className="ab-b-faces">{faces.map((p) => /* eslint-disable-next-line @next/next/no-img-element */ <img key={p.slug} src={p.photo} alt="" loading="lazy" />)}</span><span className="ab-b-txt"><b>Our people</b><span>{people.length} people: advisors who ran the programs, and the specialists who build the tools.</span></span></a></li>
          <li className="ab-b-how"><a href="/about/how-we-work"><span className="ab-b-steps">{STEPS.map(([t], k) => <i key={t}><em>{String(k + 1).padStart(2, "0")}</em>{t}</i>)}</span><span className="ab-b-txt"><b>How we work</b><span>Four steps, from assessment to handoff, and what guides the work.</span></span></a></li>
          <li className="ab-b-where"><a href="/about/where-we-work"><span className="ab-b-num">{STATES.length}<small>states</small></span><span className="ab-b-txt"><b>Where we work</b><span>Global Reach,<br />Local Impact, with team members in Canada, South Africa, and the UAE.</span></span></a></li>
          <li className="ab-b-careers"><a href="/careers">{/* eslint-disable-next-line @next/next/no-img-element */}{/* two teammates at the 2026 company retreat, July 24, 2026 (Business Development SharePoint; cropped so there are no labels) */}<img src="/images/pages/careers-retreat-2026-teammates.webp" alt="" loading="lazy" /><span className="ab-b-txt"><b>Careers</b><span>Want to work with us? Reach out.</span></span></a></li>
        </ul>
      </EdSec>
      <Talk />
    </Shell>
  );
}

export function WhoWeAre() {
  /* Scott's card: the same details every other card shows (title, location), not his former role, and it opens
     his bio on this page (Nicole, Nov 11). His quote, from the live site's Our People page, sits with his photo. */
  const scott = allPeople().find((p) => /^Scott Rawlins/.test(p.name));
  return (
    <Shell>
      <EdHero crumbs={[["/about", "About"], ["/about/who-we-are", "Who we are"]]} kicker="Who we are" title={<>Founded on <em>agency experience</em></>}
        lead={<p>Rawlins was founded in 2017 by Scott Rawlins, former Deputy Director and Chief Engineer of the Nevada Department of Transportation. Today former agency leaders work alongside an in-house digital team that builds the tools.</p>}
        actions={<><EdBtn href="/about/our-people">Meet our people</EdBtn><EdBtn href="/contact" kind="ghost">Get in touch</EdBtn></>}
        aside={scott && (
          <figure className="ab-quote">
            {/* the live site's quote; its dash is a comma here (the site uses no long dashes) */}
            <blockquote><p>We&rsquo;ve built this firm on trust, working in close partnership with our clients to understand their reality and bring the right mix of perspectives, delivering outcomes that truly fit their needs.</p></blockquote>
            <figcaption>
              <AuthorPop person={scott} className="ab-quote-by">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="ab-quote-ph"><img src={scott.photo} alt="" width={120} height={120} /></span>
                <span className="ab-quote-who"><b>{scott.name}</b><em>{scott.role}</em>{scott.location && <small><Pin />{scott.location}</small>}<i>Read bio</i></span>
              </AuthorPop>
            </figcaption>
          </figure>
        )} />
      {/* a gallery of team photos in place of the one big photo (Nicole, Nov 11) */}
      <PhotoGallery photos={TEAM_GALLERY} />
      <EdSplit k="Our story" title="From one agency to many">
        {/* About: How we work and Our story file v1 (Nov 13) */}
        <div className="ab-story">
          <p className="ab-story-lead">Scott Rawlins spent 17 years at the Nevada Department of Transportation, including as Deputy Director and Chief Engineer. He then led an infrastructure asset management practice at a global consulting firm. In 2017 he started Rawlins, so that people who have run agency programs could work alongside the people running them today.</p>
          <p>Advising agency leaders on how to organize and deliver their programs is where the firm started, and it is still a large part of our work. Since 2017 we have added drone and advanced air mobility work, and an in-house team that builds websites, integrations, automation, dashboards, training, and AI tools.</p>
          <p>Most of our work is with state departments of transportation. We also work with local governments, contractors, engineering firms, and private companies.</p>
          <p>More than 25 of our people came from public agencies. Our team works across the United States, and members of our team are based in Canada, South Africa, and the United Arab Emirates.</p>
          <p>Some projects on this site come from Scott&apos;s earlier work, or from work our people did before they joined us. Each of those is marked Before Rawlins.</p>
        </div>
      </EdSplit>
      <Grown eyebrow="how we've grown" title="Evolving impact" />
      {/* the same row as the home page's "What sets us apart" (Nicole, Nov 11). "Where our people have been" was
          removed: each person's former role now leads their bio, under "Before Rawlins". "Meet the team" was
          removed too. */}
      <WhyRow items={whyItems(tvPeople(stripPeople()), !PROD)} />
      <Talk />
    </Shell>
  );
}

/* How we work (About: How we work file v1, Nov 13) */
const PRINCIPLES: [string, string][] = [
  ["Start where the client is", "Most organizations already have a plan, a framework, or a manual. We put what exists to work before we write anything new."],
  ["Work with the staff responsible", "We build with the people who will use the result, so it reflects how the work is done and they can keep it current."],
  ["Bridge before building", "We use the systems and licenses a client already owns, and connect them. We build something new when that is the better fit."],
  ["Straight answers on AI", "When a problem calls for a rule, a process, or a decision instead of a model, we say so."],
  ["The client owns the result", "Every manual, tool, and build comes with documentation and training, and the client's team owns it."],
];
/* content pass v7, 8.3: "We stay through execution" and "How a project usually runs" removed (the four steps say it) */
const KEEP = ["Processes and manuals your staff can follow and update", "Tools and templates built on systems you already own", "People trained to run it, with support while they learn", "A record of how each piece works and who keeps it current"];
/* Ways to work with us (new, Nov 13) */
const WAYS: [string, string][] = [
  ["A focused assessment", "a look at one program, process, or function, with findings and a sequence of next steps"],
  ["Framework or program development", "a delivery framework, a manual, a proficiency program, or a new program, built with staff"],
  ["A targeted process improvement", "one process or handoff, worked through from start to finish"],
  ["Implementation support", "help putting a plan or a new process into use, with coaching and revisions along the way"],
  ["Advisory support", "advice for leaders within an agreed scope"],
  ["A specialist review or facilitation", "a document review, a workshop, or a partnering session"],
];
export function HowWeWork() {
  return (
    <Shell>
      <EdHero crumbs={[["/about", "About"], ["/about/how-we-work", "How we work"]]} kicker="How we work" title={<>We start with what exists, <em>and stay until it runs.</em></>}
        lead={<p>We begin with the plans, manuals, systems, and staff knowledge an organization already has. We do the work with the people responsible for it, and we stay while they put the changes to use. What we build belongs to the client.</p>}
        actions={<><EdBtn href="/contact">Tell us what you&apos;re trying to fix</EdBtn><EdBtn href="/insights/case-studies" kind="ghost">See our projects</EdBtn></>} />
      <section className="ab-steps-sec" data-nofill>
        <ol className="ed-wrap ab-steps">{STEPS.map(([t, d], k) => <li key={t}><span className="ab-step-n">{String(k + 1).padStart(2, "0")}</span><b>{t}</b><p>{d}</p></li>)}</ol>
      </section>
      <EdSec k="Our approach" title="What guides the work" tone="panel">
        <ul className="ab-principles">{PRINCIPLES.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ul>
      </EdSec>
      <EdSplit k="In practice" title="What you keep">
        <ol className="ab-runs ab-keep">{KEEP.map((t) => <li key={t}><b>{t}</b></li>)}</ol>
      </EdSplit>
      <EdSec k="Getting started" title="Ways to work with us">
        <p className="ab-ways-lead">The work is shaped to the need. These are the forms it most often takes.</p>
        <ul className="ab-ways">{WAYS.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ul>
        <p className="ab-ways-foot">We work directly for an owner, as part of another firm&apos;s team, and for contractors and private companies.</p>
      </EdSec>
      <Talk />
    </Shell>
  );
}

export function WhereWeWork() {
  /* Nov 12 redesign (Nicole: align to the live site's page, keep the globe, open it into a flat map that zooms in
     and shows projects to click): components/site/where-map.tsx. A state lists the projects that carry its tag
     (unnamed-client work has no state tag). A link ending in #map-<state> opens the map on that state. */
  const tag = (c: (typeof CASES)[number]) => (c.status === "Ongoing" ? "In the works" : c.status === "Before Rawlins" ? "Before Rawlins" : "Completed");
  const projects: Record<string, WwProject[]> = Object.fromEntries(STATES.map((s) => [s, CASES.filter((c) => c.states.includes(s)).map((c) => ({ title: c.title, href: caseHref(c), photo: casePhoto(c), tag: tag(c) }))]));
  return (
    <Shell>
      <WhereMap active={STATES_ACTIVE} served={STATES_SERVED} projects={projects} copy={
        <>
          <Crumbs items={[["/about", "About"], ["/about/where-we-work", "Where we work"]]} />
          <p className="ed-k">Where we work</p>
          <h1 className="ed-h1">Global Reach,<br />Local Impact</h1>
          <div className="ed-lead"><p>Our project work to date has been in the United States, and our team can work anywhere. Members of our team are based in the United States, Canada, South Africa, and the United Arab Emirates.</p></div>
        </>
      } />
      {/* the numbers row (11 / 27 / 3) and the two state lists (Active, Areas we've served) were deleted by Nicole, Nov 12 */}
      <Talk />
    </Shell>
  );
}

/* ── Our People ── */
const memberSlug = (name: string) => name.toLowerCase().replace(/[.,]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
/* former agency roles: lib/content/people.ts (the same list the people cards use) */
const BUSINESS = /Accounting|Administrative Assistant|Professional Services|VP of Finance|Chief Culture|Administration & Contract/;
const SPECIALIST = /Specialist|Designer|Engineer\b|Architect|Tester|Digital Strategy|Chief AI Strategy/;
const ADVISORS_BY_NAME = /^(Debbie Cmar|Lauren LeJeune)\b/;
function personFromRoster(m: (typeof TEAM_MEMBERS)[number]): Person {
  const role = m.title && m.title !== m.role ? `${m.title}, ${m.role}` : m.role;
  /* Nicole, Nov 11: Debbie Cmar and Lauren LeJeune are advisors (their roster roles alone would put them in Business Operations) */
  const group: Person["group"] = ADVISORS_BY_NAME.test(m.name) ? "Advisors" : BUSINESS.test(m.role) ? "Business Operations" : SPECIALIST.test(m.role) ? "Specialists" : "Advisors";
  const areas = new Set<string>();
  if (m.categories.includes("strategy")) areas.add("strategy-organization");
  if (m.categories.includes("operations") && group !== "Business Operations") { areas.add("program-project-delivery"); areas.add("maintenance-operations"); }
  if (m.categories.includes("technology") || m.categories.includes("communication-brand-design")) areas.add("digital-solutions");
  if (/Aerial|Jordan Stacy|John Zuleger/.test(`${m.role} ${m.name}`)) { areas.add("drones-advanced-air-mobility"); if (!/Infrastructure Technologies|Jordan/.test(`${m.role} ${m.name}`)) areas.delete("digital-solutions"); }
  /* Nicole works across Strategy & Organization, Project Delivery, and Digital Solutions (her call, Nov 10;
     not Operations & Maintenance or Drones) */
  if (/^Nicole Arakorpi/.test(m.name)) { areas.clear(); ["strategy-organization", "program-project-delivery", "digital-solutions"].forEach((a) => areas.add(a)); }
  return {
    slug: memberSlug(m.name), name: m.name, photo: m.photo, role, job: m.role, group, areas: Array.from(areas),
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
  return (
    <Shell>
      <EdHero dark crumbs={[["/about", "About"], ["/about/our-people", "our people"]]} kicker="our people" title={<>The <em>Rawlins Team</em></>} /* Nicole's wording (preview edit, Nov 12); was "The people behind the work" */
        lead={<p>More than 25 of our people came from public agencies. Our team brings together expertise in strategy, operations, and technology to deliver practical, forward-thinking solutions to complex challenges. While rooted in transportation, we continue to expand our experience across sectors. Collaboration is central to how we work.</p>}>
        {/* the sliding faces and the four counts under them were removed (Nicole, Nov 11) */}
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
      <EdHero crumbs={[["/careers", "Careers"]]} kicker="Careers at Rawlins" title={<>Want to work with us? <em>Reach out.</em></>}
        lead={<p>We’re always interested in connecting with thoughtful, driven professionals who are passionate about solving complex challenges and creating meaningful impact. If that sounds like you, we’d like to hear from you.</p>}
        actions={<><EdBtn href="mailto:jobs@rawlinsic.com">Email jobs@rawlinsic.com</EdBtn><EdBtn href="/about/our-people" kind="ghost">Meet our people</EdBtn></>}
        /* the whole team, shown whole (Nicole, Nov 11: "first picture should be the one of the full team") */
        aside={<div className="ab-hero-ph is-team">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/pages/team-group-indoor.webp" alt="Our whole team at the 2026 retreat" /></div>} />
      {/* Nicole's preview edits, Nov 11: the small line reads "why rawlins" and the title "What it's like here" (the editor had set both to "why rawlins") */}
      <EdSec k="why rawlins" title="What it's like here" tone="panel">
        <ol className="ab-principles ab-careers">{CAREERS_WHY.map(([t, d], k) => <li key={t}><span className="ab-why-n">{String(k + 1).padStart(2, "0")}</span><b>{t}</b><p>{d}</p></li>)}</ol>
      </EdSec>
      <EdSec k="Open positions" title={OPEN_POSITIONS.length ? "Open positions" : "No open positions right now"}>
        {OPEN_POSITIONS.length ? (
          <ul className="pg-cards">{OPEN_POSITIONS.map((p) => <li key={p.href}><a href={p.href} className="pg-card pg-card-link"><b>{p.title}</b><span>{p.summary}</span></a></li>)}</ul>
        ) : (
          <div className="ab-apply">
            <p>Send us a note and your resumé at <a href="mailto:jobs@rawlinsic.com">jobs@rawlinsic.com</a>, and we’ll be in touch if there’s a fit.</p>
            <EdBtn href="mailto:jobs@rawlinsic.com">Send your resumé</EdBtn>
            {/* the preview-only "no open positions posted" note was emptied by Nicole (preview edit, Nov 11), so it's gone */}
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
    { href: "/insights/research", tag: "Research", title: PUBLICATIONS[0]?.title ?? "Research & Publications", photo: PAGE_PHOTO.research /* aam-policy-planning is on the never-use list (addendum A) */ },
    ...(next ? [{ href: "/insights/news", tag: "Where we'll be", title: `${next.title}, ${next.where ?? ""} · ${next.when}`.replace(", ·", " ·"), photo: next.tall ?? "/images/pages/insights-hawaii-summit-2026-team.webp" /* the event's own image when it has one (AASHTO); otherwise the Rawlins team at the first Hawaii Transportation Summit, Sept 2026 (LinkedIn; other sponsors' logos blurred) */ }] : []),
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
          <h1 className="fan-h">What we&apos;ve done, and <em>what&apos;s in the works.</em></h1>
        </div>
        <FanCards cards={cards} label="Insights" start={2} hoverFront />
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
  /* Redesigned Nov 11 (Nicole: "the whole news page needs to be redesigned better", and past events in their own
     section "so we can showcase them but it's clear"). In order: where we'll be next, where we've been (past
     events, with photos), news from our team, awards, research. Events move from the first list to the second on
     their own the day after they end. */
  const items = NEWS.filter((n) => !n.placeholder || !PROD);
  const real = items.filter((n) => !n.placeholder && n.tag !== "Project"), ph = items.filter((n) => n.placeholder && n.tag !== "Project");
  const { upcoming, past } = eventsByTime(EVENTS.filter((e) => !e.placeholder || !PROD));
  const [top, ...rest] = real;
  /* the featured story's picture: the article's own photo when it's our article */
  const art = THOUGHT_LEADERSHIP.find((a) => top?.href?.endsWith(a.slug));
  const ext = (h?: string) => (h && /^http/.test(h) ? { target: "_blank", rel: "noopener noreferrer" } : {});
  return (
    <Shell>
      <EdHero dark crumbs={[["/insights", "Insights"], ["/insights/news", "News & Recognition"]]} kicker="Insights" title={<>News &amp; <em>Recognition</em></>}
        lead={<p>Where we&apos;ll be, what our team is publishing, and the recognition our people have earned.</p>}>
        <nav className="ed-wrap nw3-jump" aria-label="On this page">
          {upcoming.length > 0 && <a href="#next"><b>{upcoming.length}</b>Coming up</a>}
          {past.length > 0 && <a href="#been"><b>{past.length}</b>Past events</a>}
          <a href="#news"><b>{real.length}</b>News</a>
          <a href="#recognition"><b>{AWARDS.length}</b>Awards</a>
          <a href="#research"><b>{PUBLICATIONS.length}</b>Publications</a>
        </nav>
      </EdHero>
      {upcoming.length > 0 && (
        <section id="next" className="ed-sec is-navy nw3-sec" data-nofill>
          <div className="ed-wrap">
            <div className="ed-sec-head"><div><p className="ed-k">Coming up</p><h2 className="ed-h2">Where we&apos;ll be next</h2></div></div>
            <UpcomingEvents events={upcoming} />
          </div>
        </section>
      )}
      {past.length > 0 && (
        <section id="been" className="ed-sec nw3-sec nw3-been" data-nofill>
          <div className="ed-wrap">
            <div className="ed-sec-head"><div><p className="ed-k">Past events</p><h2 className="ed-h2">Where we&apos;ve been</h2></div></div>
            <PastEvents events={past} />
          </div>
        </section>
      )}
      <section id="news" className="ed-sec is-panel nw3-sec" data-nofill>
        <div className="ed-wrap">
          <div className="ed-sec-head"><div><p className="ed-k">News</p><h2 className="ed-h2">From our team</h2></div></div>
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
                /* no link, no "Read more" for a post without one (content pass v7, 12.2) */
                <li key={n.title}>{n.href
                  ? <a href={n.href} {...ext(n.href)}><span className="nw2-tag">{n.tag}{n.date ? ` · ${n.date}` : ""}</span><b>{n.title}</b>{n.text && <p>{n.text}</p>}<span className="ed-more">{/linkedin/.test(n.href) ? "Read it on LinkedIn" : "Read more"}</span></a>
                  : <div><span className="nw2-tag">{n.tag}{n.date ? ` · ${n.date}` : ""}</span><b>{n.title}</b>{n.text && <p>{n.text}</p>}</div>}</li>
              ))}
              {ph.map((n) => <li key={n.title} className="is-dev"><div><span className="nw2-tag">{n.tag}</span><b>{n.title}</b><Dev>Placeholder: {n.placeholder}</Dev></div></li>)}
            </ul>
          </div>
        </div>
      </section>
      <section id="recognition" className="ed-sec nw3-sec" data-nofill>
        <div className="ed-wrap">
          <div className="ed-sec-head"><div><p className="ed-k">Recognition</p><h2 className="ed-h2">Awards and recognition</h2></div></div>
          <ul className="nw2-awards">{AWARDS.map((a) => (
            <li key={a.href}>
              <span className="nw2-tag">{a.year}{a.before ? " · Before Rawlins" : ""}</span>
              <b>{a.title}</b><p>{a.from}</p>
              <ByLine names={a.people} />
              <a className="ed-more" href={a.href} target="_blank" rel="noopener noreferrer">The announcement</a>
            </li>
          ))}</ul>
        </div>
      </section>
      <section id="research" className="ed-sec is-panel nw3-sec" data-nofill>
        <div className="ed-wrap">
          <div className="ed-sec-head"><div><p className="ed-k">Research</p><h2 className="ed-h2">National research by our people</h2></div><a className="ed-more" href="/insights/research">All research and publications</a></div>
          <ul className="nw2-pubs">{PUBLICATIONS.slice(0, 3).map((x) => (
            <li key={x.href}><a href={x.href} target="_blank" rel="noopener noreferrer"><span className="nw2-tag">{x.series} · {x.year}</span><b>{x.title}</b><span className="nw2-who">{x.people.join(", ")}</span></a></li>
          ))}</ul>
        </div>
      </section>
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
  /* the April Q&A is an article, not current research; it stays in RESEARCH for the menu (content pass v7, 12.1) */
  const now = RESEARCH.filter((r) => r.k !== "Guidance" && r.k !== "Thought leadership");
  return (
    <Shell scene="crossing" photo={PAGE_PHOTO.research}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/research", "Research & Publications"]]} kicker="Insights" title="Research & Publications"
        lead={<p>Research reports and articles by people on our team, what we&apos;re working on now, and where our people have spoken.</p>} />
      <section data-nofill className="pj-sec rs-pubs" id="publications">
        <div className="pg-wrap">
          <h2 className="pj-h">Published research</h2>
          <p className="rs-intro">Reports and articles our people wrote for the Transportation Research Board, the Federal Highway Administration, state DOT research programs, and professional journals, most before they joined Rawlins.</p>
          <ul className="rs-list">
            {PUBLICATIONS.map((x) => (
              <li key={x.href}>
                <a className="rs-card" href={x.href} target="_blank" rel="noopener noreferrer">
                  <span className="rs-top"><span className="rs-series">{x.series}</span><span className="rs-year">{x.year}</span></span>
                  <b>{x.title}</b>
                  {x.line && <p>{x.line}</p>}
                  <span className="rs-pub">{x.publisher}{x.before ? " · Before Rawlins" : ""}</span>
                  <span className="pj-more">Read it</span>
                </a>
                <ByLine names={x.people} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section data-nofill className="pj-sec pj-did rs-now">
        <div className="pg-wrap">
          <h2 className="pj-h">What we&apos;re working on now</h2>
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
  /* the author's roster profile: their photo and name open the bio here, on this page (Nicole, Nov 11) */
  const who = allPeople().find((p) => bare(p.name) === bare(a.author));
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
          {who ? (
            <AuthorPop person={who} className="ax-by">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.authorImage} alt="" width={64} height={64} />
              <span><b>{a.author}</b><em>{a.authorRole}</em></span>
            </AuthorPop>
          ) : (
            <div className="ax-by">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.authorImage} alt="" width={64} height={64} />
              <span><b>{a.author}</b><em>{a.authorRole}</em></span>
            </div>
          )}
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
          {who
            ? <AuthorPop person={who} className="ax-author-ph">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={a.authorImage} alt="" width={120} height={120} /></AuthorPop>
            : /* eslint-disable-next-line @next/next/no-img-element */ <img src={a.authorImage} alt="" width={120} height={120} />}
          <div>
            <p className="ed-k">About the author</p>
            {who ? <AuthorPop person={who} className="ax-author-name"><b>{a.author}</b></AuthorPop> : <b>{a.author}</b>}<em>{a.authorRole}</em>
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
      <Hero scene={false} crumbs={[["/site-map", ""]]} title="" />
      <section className="pg-sec pg-body"><div className="pg-wrap pg-sitemap">
        <div>
          <h2 className="pg-h3"><a href="/#what">What we do</a></h2>
          <ul>{AREAS.map((a) => <li key={a.id}><a href={areaHref(a)}>{a.name}</a><ul>{a.services.filter((s) => isListed(s.id)).map((s) => <li key={s.id}><a href={`/services/${a.slug}/${s.slug}`}>{s.name}</a></li>)}</ul></li>)}</ul>
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
            <li><a href="/about/who-we-are">Who we are</a></li><li><a href="/about/how-we-work">How we work</a></li><li><a href="/about/our-people">our people</a></li>
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

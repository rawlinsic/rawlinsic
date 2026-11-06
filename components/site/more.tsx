/* About, Insights, Careers, Podcast, News & Recognition, Research,
   Thought Leadership (article kept word for word), Our People, site map. */
import type { ReactNode } from "react";
import { PAGE_PHOTO } from "@/lib/content/media";
import { TEAM_MEMBERS } from "@/lib/team-data";
import { THOUGHT_LEADERSHIP, type ThoughtLeadershipArticle } from "@/components/thought-leadership-data";
import { AREAS, CASES, LEADERS, STORY, VISIBLE_INDUSTRIES, WHY, areaHref, caseById, caseHref, caseWho, industryHref, subsectorHref } from "@/lib/content/site";
import { INDUSTRIES as IND_DATA, STATES, STEPS } from "@/lib/content/catalog";
import { AVIATION_TEAM } from "@/components/site/services";
import PeopleDirectory, { type Person } from "@/components/site/people";
import PodcastPlayer from "@/components/site/podcast-player";
import { NEWS, EVENTS } from "@/lib/content/news";
import { cleanNames } from "@/lib/content/clean";
import { Btn, CaseCards, Dev, Hero, List, People, PROD, Sec, Shell, Steps, Talk } from "@/components/site/ui";

const Cards = ({ items }: { items: { href: string; t: string; d: string }[] }) => (
  <ul className="pg-cards">{items.map((x) => <li key={x.href}><a href={x.href} className="pg-card pg-card-link"><b>{x.t}</b><span>{x.d}</span></a></li>)}</ul>
);

/* ── About ── */
export function AboutIndex() {
  return (
    <Shell scene="hero" photo={PAGE_PHOTO.about}>
      <Hero crumbs={[["/about", "About"]]} kicker="About Rawlins" title="People who have done the job"
        lead={<p>Former agency leaders and engineers, working alongside an in-house team that builds the tools.</p>} />
      <Sec>
        <Cards items={[
          { href: "/about/who-we-are", t: "Who we are", d: "Our story, how we've grown, and the people behind it." },
          { href: "/about/how-we-work", t: "How we work", d: "Assess, rebuild, train, hand off." },
          { href: "/about/our-people", t: "Our people", d: "Advisors, specialists, and the team that keeps Rawlins running." },
          { href: "/about/where-we-work", t: "Where we work", d: "The states where our work has taken us." },
          { href: "/careers", t: "Careers", d: "Work with us." },
        ]} />
      </Sec>
      <Talk />
    </Shell>
  );
}

export function WhoWeAre() {
  return (
    <Shell scene="hero" photo={PAGE_PHOTO.who}>
      <Hero crumbs={[["/about", "About"], ["/about/who-we-are", "Who we are"]]} kicker="Who we are" title="Former agency leaders, with a team that builds"
        lead={<p>Former agency leaders, working alongside an in-house automation and AI build team.</p>} statement="We find what's broken, fix it, and stay until it runs." />
      <Sec title="Our story">
        <div className="pg-prose">
          <p>Rawlins was founded in 2017 by Scott Rawlins, former Deputy Director and Chief Engineer of the Nevada Department of Transportation, to bring agency experience to agencies that needed it. A big part of our work is still advising agency leaders on how to deliver their programs. It has grown from there.</p>
          <Dev>Founding year and story: Scott to confirm.</Dev>
        </div>
      </Sec>
      <Sec title="How we've grown" tone="panel"><Steps steps={STORY.map(([k, t, d]) => ({ t: `${k}: ${t}`, d }))} /></Sec>
      <Sec title="Why Rawlins">
        <ol className="pg-cards">{WHY.map(([t, d], i) => <li key={t}><div className="pg-card"><span className="pg-case-k">{String(i + 1).padStart(2, "0")}</span><b>{t}</b><span>{d}</span></div></li>)}</ol>
      </Sec>
      <Sec title="Who's behind it" tone="panel"><People people={LEADERS.map((l) => [l.name, l.role])} /><p style={{ marginTop: 18 }}><a href="/about/our-people">Meet everyone</a></p></Sec>
      <Talk />
    </Shell>
  );
}

export function HowWeWork() {
  return (
    <Shell scene="construction" photo={PAGE_PHOTO.how}>
      <Hero crumbs={[["/about", "About"], ["/about/how-we-work", "How we work"]]} kicker="How we work" title="We find what's broken, fix it, and stay until it runs." />
      <Sec title="Four steps"><Steps steps={STEPS.map(([t, d]) => ({ t, d }))} /></Sec>
      <Sec title="Principles" tone="panel">
        <ul className="pg-cards">
          {[
            ["Start where the client is", "Many organizations already have a plan, a framework, or a manual. We put what exists to work before writing anything new."],
            ["Bridge before building", "We use the systems and licenses a client already owns, and build new only when nothing existing can do the job."],
            ["Straight answers on AI", "When a problem needs a rule, a process, or a decision instead of a model, we say so."],
            ["The client owns the result", "Every build comes with documentation and training. No lock-in."],
            ["We stay through execution", "Recommendations are where we start. We help put them into practice."],
          ].map(([t, d]) => <li key={t}><div className="pg-card"><b>{t}</b><span>{d}</span></div></li>)}
        </ul>
      </Sec>
      <Sec title="How an engagement usually runs">
        <List items={[
          "Start with what exists: the agency's plans, manuals, data, and systems",
          "Work with the agency's own experts, through core teams, working groups, and workshops",
          "Build the tools people will use: manuals, templates, training, dashboards, and working apps",
          "Stay through rollout: training, onboarding, and support while staff learn the new way",
        ]} />
      </Sec>
      <Talk />
    </Shell>
  );
}

export function WhereWeWork() {
  return (
    <Shell scene="map" highlight={STATES}>
      <Hero crumbs={[["/about", "About"], ["/about/where-we-work", "Where we work"]]} kicker="Where we work" title="Across the United States"
        lead={<p>The states where our work has taken us. Our work so far is across the United States, and our team can do it anywhere.</p>} actions={<Btn href="/insights/case-studies" primary>See the case studies</Btn>}>
        <Dev>International places on the current Areas page (Barbados, Dubai, Réunion, Saudi Arabia) are pursuits, not delivered work, so they are left off. Needs Nicole&apos;s decision.</Dev>
      </Hero>
      <Sec title="United States">
        <ul className="pg-chips">{STATES.map((s) => <li key={s}><a href={`/insights/case-studies?state=${s.toLowerCase().replace(/\s+/g, "-")}`}>{s}</a></li>)}</ul>
      </Sec>
      <Talk />
    </Shell>
  );
}

/* ── Our People ── */
const memberSlug = (name: string) => name.toLowerCase().replace(/[.,]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const bare = (n: string) => n.split(",")[0].replace(/\s*\(.*?\)\s*/g, " ").trim().toLowerCase();
const FORMERLY: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  const add = (name: string, line: string) => {
    const l = line.replace(/^Founder\.\s*/, "");
    if (/^Former/.test(l) && !out[bare(name)]) out[bare(name)] = l;
  };
  LEADERS.forEach((l) => add(l.name, l.role));
  Object.values(IND_DATA).forEach((i) => i.people.forEach(([n, l]) => add(n, l)));
  AVIATION_TEAM.forEach(([n, l]) => add(n, l));
  return out;
})();
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
/* The people who ran agency programs (they have a former agency role), founder first. */
export function veteranPeople(): Person[] {
  return stripPeople().filter((p) => p.formerly);
}
export function OurPeople() {
  const people = TEAM_MEMBERS.map(personFromRoster);
  const founder = people.findIndex((p) => /Founder/.test(p.role));
  if (founder > 0) people.unshift(people.splice(founder, 1)[0]);
  return (
    <Shell>
      <Hero scene={false} crumbs={[["/about", "About"], ["/about/our-people", "Our people"]]} kicker="Our people" title="People who have done the job"
        lead={<p>More than 30 former agency executives and engineers, working next to the team that builds the tools. We&apos;re a flat, remote firm: you work with the people who do the work.</p>} />
      <section className="pg-sec pg-body"><div className="pg-wrap">
        <PeopleDirectory people={people} showDev={!PROD} areas={AREAS.map((a) => ({ value: a.slug, label: a.name }))} />
      </div></section>
      <Talk title="Talk to the right person" text="Tell us what you're working on. We'll connect you with the person on our team who has done it." />
    </Shell>
  );
}

/* ── Careers (live content kept) ── */
export type Position = { title: string; href: string; summary: string };
export const OPEN_POSITIONS: Position[] = [];
export function Careers() {
  return (
    <Shell scene="rise" photo={PAGE_PHOTO.careers}>
      <Hero crumbs={[["/careers", "Careers"]]} kicker="Careers at Rawlins" title="Work with us"
        lead={<>
          <p>We&rsquo;re always interested in connecting with thoughtful, driven professionals who are passionate about solving complex challenges and creating meaningful impact. If our approach aligns with your interests, we invite you to connect and discuss opportunities.</p>
          <p>Email us at <a href="mailto:jobs@rawlinsic.com">jobs@rawlinsic.com</a></p>
        </>} actions={<Btn href="mailto:jobs@rawlinsic.com" primary>Email jobs@rawlinsic.com</Btn>} />
      <Sec title="Open positions">
        {OPEN_POSITIONS.length ? (
          <ul className="pg-cards">{OPEN_POSITIONS.map((p) => <li key={p.href}><a href={p.href} className="pg-card pg-card-link"><b>{p.title}</b><span>{p.summary}</span></a></li>)}</ul>
        ) : (
          <div className="pg-prose"><p>We don&rsquo;t have any open positions at the moment, but we&rsquo;re always glad to connect with talented people. Reach out at the email above and we&rsquo;ll keep you in mind for future opportunities.</p></div>
        )}
      </Sec>
      <Sec title="What it's like here" tone="panel">
        <ol className="pg-cards">{WHY.slice(0, 4).map(([t, d]) => <li key={t}><div className="pg-card"><b>{t}</b><span>{d}</span></div></li>)}</ol>
      </Sec>
    </Shell>
  );
}

/* ── Insights ── */
export function InsightsIndex() {
  const latest = NEWS.filter((n) => !n.placeholder || !PROD).slice(0, 3);
  return (
    <Shell scene="network" photo={PAGE_PHOTO.insights}>
      <Hero crumbs={[["/insights", "Insights"]]} kicker="Insights" title="What we're learning, and what we've done"
        lead={<p>Case studies, news and recognition, thought leadership, research, and our podcast.</p>} />
      <Sec>
        <Cards items={[
          { href: "/insights/case-studies", t: "Case studies", d: "Our work, by service, industry, and state." },
          { href: "/insights/news", t: "News & Recognition", d: "Wins, awards, publications, speaking, events, and new team members." },
          { href: "/insights/thought-leadership", t: "Thought Leadership", d: "Practical perspectives from our team." },
          { href: "/insights/research", t: "Research & Publications", d: "Guidance manuals, standards, and research." },
          { href: "/insights/podcast", t: "Podcast", d: "The Rawlins Way." },
        ]} />
      </Sec>
      {latest.length > 0 && <Sec title="Latest" tone="panel"><NewsList items={latest} /></Sec>}
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
          <b>{n.href ? <a href={n.href}>{n.title}</a> : n.title}</b>
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
  const events = EVENTS.filter((e) => !e.placeholder || !PROD);
  return (
    <Shell scene="people" photo={PAGE_PHOTO.news}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/news", "News & Recognition"]]} kicker="Insights" title="News & Recognition"
        lead={<p>Wins, awards, publications, speaking, events, and new people on the team.</p>} />
      {events.length > 0 && (
        <Sec title="Where we'll be">
          <ul className="pg-news">{events.map((e) => (
            <li key={e.title} className={e.placeholder ? "is-dev" : ""}><span className="pg-case-k">{e.when}</span><b>{e.title}</b>{e.where && <p>{e.where}</p>}{e.note && <p>{e.note}</p>}{e.placeholder && <Dev>Placeholder: {e.placeholder}</Dev>}</li>
          ))}</ul>
        </Sec>
      )}
      <Sec title="Latest" tone={events.length ? "panel" : undefined}><NewsList items={items} /></Sec>
      <Talk />
    </Shell>
  );
}

export function ResearchPage() {
  const pooled = caseById("cs-pooled")!;
  const aero = caseById("cs-aero")!;
  const division = caseById("cs-aerodiv")!;
  const items: { k: string; t: string; d: ReactNode }[] = [
    { k: "Guidance", t: "National guidance manuals on drones and advanced air mobility", d: <>First-of-their-kind guidance manuals written by Paul Wheeler, an aerial innovation advisor on our team.</> },
    { k: "Standards", t: "Multi-state drone standards and specifications", d: <><a href={caseHref(pooled)}>{caseWho(pooled, PROD)}</a>: consensus standards states can write into their own specifications.</> },
    { k: "Research", t: "Establishing a state aeronautics division", d: <><a href={caseHref(division)}>{caseWho(division, PROD)}</a>: a national scan, stakeholder interviews, and funding options.</> },
    { k: "Symposia", t: "Aviation symposia and peer exchanges", d: <><a href={caseHref(aero)}>{caseWho(aero, PROD)}</a>: convening states, industry, and researchers.</> },
    { k: "Thought leadership", t: "Minimizing data governance fatigue to maximize value", d: <><a href="/insights/thought-leadership/minimizing-data-governance-fatigue">A Q&amp;A with April Blackburn</a>, former Florida DOT Chief Information Officer.</> },
  ];
  return (
    <Shell scene="crossing" photo={PAGE_PHOTO.research}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/research", "Research & Publications"]]} kicker="Insights" title="Research & Publications"
        lead={<p>Guidance, standards, and research our team has written with the agencies and industries that use them.</p>} />
      <Sec>
        <ul className="pg-news">{items.map((x) => <li key={x.t}><span className="pg-case-k">{x.k}</span><b>{x.t}</b><p>{x.d}</p></li>)}</ul>
        <Dev block>Placeholder: the full publications list (titles, years, links) comes from Paul Wheeler and the knowledge sweep.</Dev>
      </Sec>
      <Talk />
    </Shell>
  );
}

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
  /* group Q&A blocks into question + answers */
  const blocks: ReactNode[] = [];
  let i = 0;
  const c = a.content;
  while (i < c.length) {
    const b = c[i];
    if (b.type === "question") {
      const answers: typeof c = [];
      i++;
      while (i < c.length && c[i].type !== "question" && c[i].type !== "divider") { answers.push(c[i]); i++; }
      blocks.push(
        <details key={`q${i}`} className="pg-qa" open>
          <summary>{a.showQBadge !== false && <span className="pg-qa-q">Q</span>}{b.text}</summary>
          {answers.map((x, k) => <Block key={k} b={x} />)}
        </details>,
      );
      continue;
    }
    blocks.push(<Block key={`b${i}`} b={b} />);
    i++;
  }
  return (
    <Shell scene="network" photo={PAGE_PHOTO.thought}>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/thought-leadership", "Thought Leadership"], [`/insights/thought-leadership/${a.slug}`, a.title]]}
        kicker={`${a.category} · ${a.dateLabel}`} title={a.title} lead={<p>{a.subtitle}</p>}
        actions={<Btn href={a.pdfUrl}>Download the PDF</Btn>} />
      <section className="pg-sec">
        <div className="pg-wrap pg-article">
          <aside className="pg-author">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.authorImage} alt={a.author} width={96} height={96} />
            <b>{a.author}</b><span>{a.authorRole}</span>
            <a href={`mailto:${a.authorEmail}`}>{a.authorEmail}</a>
            <a href={`tel:${a.authorPhone.replace(/[^\d+]/g, "")}`}>{a.authorPhone}</a>
            {a.authorLinkedIn && <a href={a.authorLinkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          </aside>
          <div className="pg-article-body">
            {a.accordionLabel && <p className="pg-kicker">{a.accordionLabel}</p>}
            {blocks}
            {a.finalThought && <div className="pg-impact"><b>{a.finalThought.label}</b><p>{a.finalThought.text}</p>{a.finalThought.body && <p>{a.finalThought.body}</p>}</div>}
            {a.acknowledgment && <p className="pg-ack">{a.acknowledgment}</p>}
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
    case "callout": return <p className="pg-impact">{b.text}</p>;
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
          <h2 className="pg-h3"><a href="/insights/case-studies">Case studies</a></h2>
          <ul>{CASES.map((c) => <li key={c.id}><a href={caseHref(c)}>{c.title}</a></li>)}</ul>
        </div>
      </div></section>
    </Shell>
  );
}

export { CaseCards };

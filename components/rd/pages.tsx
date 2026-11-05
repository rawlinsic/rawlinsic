/* Redesign page templates (branch `redesign`). Every page is built
   from lib/redesign-data.ts. Copy rules: "Rawlins" only, no client
   names, no unsourced stats, plain verbs, no em dashes, serial comma,
   no superlatives. Placeholder blocks mark content still to come. */
import Link from "next/link";
import {
  LINES, CROSS, INDUSTRIES, NEW_CASE_STUDIES, LEADERS, STATES_SERVED,
  SERVICE_BY_ID, INDUSTRY_BY_ID,
  lineHref, serviceHref, crossHref, industryHref, caseHref, refLink,
  casesForService, casesForLine, servicesForIndustry,
  type Line, type ServiceRef, type Cross, type Industry, type NewCaseStudy,
} from "@/lib/redesign-data";
import { CASE_STUDIES } from "@/components/case-studies-data";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";
import { TEAM_MEMBERS } from "@/lib/team-data";
import {
  RdShell, Hero, Section, Btn, Card, Grid, Chips, Steps, List, Quote, Placeholder, Cta,
} from "@/components/rd/ui";

/* ---------- helpers ---------- */
const indChip = (id: string) => {
  const i = INDUSTRY_BY_ID[id];
  return { href: industryHref(i), label: i.short };
};

function CaseCards({ list }: { list: NewCaseStudy[] }) {
  if (!list.length) return <Placeholder>No case study tagged to this yet.</Placeholder>;
  return (
    <Grid>
      {list.map((c) => (
        <Card key={c.id} href={caseHref(c)} image={c.image} meta={`${c.who} · ${c.status}`} title={c.title} />
      ))}
    </Grid>
  );
}

function photoFor(name: string): string | undefined {
  const first = name.split(/[ ,]/)[0];
  const last = name.split(",")[0].split(" ").slice(-1)[0];
  const m = TEAM_MEMBERS.find((t: any) => t.name.startsWith(first) && t.name.includes(last));
  return m ? (m as any).photo : undefined;
}

function TeamPlaceholder({ who }: { who: string }) {
  return (
    <>
      <Grid cols={4}>
        {[1, 2, 3, 4].map((n) => (
          <div className="rd-card" key={n}>
            <div className="rd-person">
              <div className="rd-person-img" />
              <div><b>Name {n}</b><span>Title · former agency role</span></div>
            </div>
          </div>
        ))}
      </Grid>
      <div style={{ marginTop: 16 }}>
        <Placeholder note="Who leads each line has not been supplied yet.">{who}</Placeholder>
      </div>
    </>
  );
}

function InteractiveLink({ id }: { id: string }) {
  if (id === "aam")
    return (
      <Section label="Explore" title="Advanced air mobility, in depth">
        <Link href="/capabilities/technology/advanced-air-mobility" className="rd-feature rd-card-link">
          <div className="rd-feature-img" style={{ backgroundImage: "url(/images/pages/aam-skyline.webp)" }} />
          <div className="rd-feature-body">
            <p className="rd-label">Interactive page</p>
            <h3 className="rd-h2" style={{ fontSize: "1.8rem" }}>The stakeholder wheel and the full program lifecycle</h3>
            <span className="rd-card-arrow">→</span>
          </div>
        </Link>
      </Section>
    );
  if (id === "automation")
    return (
      <Section label="Explore" title="Applied solutions, step by step">
        <Link href="/capabilities/technology/automation-integration" className="rd-feature rd-card-link">
          <div className="rd-feature-img" style={{ backgroundImage: "url(/images/pages/auto-hero.webp)" }} />
          <div className="rd-feature-body">
            <p className="rd-label">Interactive page</p>
            <h3 className="rd-h2" style={{ fontSize: "1.8rem" }}>Seven worked examples, from one agency process rebuilt end to end</h3>
            <span className="rd-card-arrow">→</span>
          </div>
        </Link>
      </Section>
    );
  return null;
}

/* ================= HOME ================= */
export function HomePage() {
  const featured = ["cs-transform", "cs-strategic", "cs-aero"].map((id) => NEW_CASE_STUDIES.find((c) => c.id === id)!);
  return (
    <RdShell>
      {/* Headline: draft, not approved (Ben and Scott). Body: Partner Field Guide. */}
      <Hero
        image="/images/pages/hero-poster.webp"
        label="Rawlins"
        title="Former agency leaders helping the organizations that run public infrastructure plan, deliver, and adopt better ways of working."
        actions={<><Btn href="/services">Our Services</Btn><Btn href="/contact" ghost>Get In Touch</Btn></>}
      >
        <p>
          Technology pays off only when the organization under it is ready: a plan people measure, a structure that can
          carry new work, procedures people follow, and data they trust. That is our work. We learned it running state
          departments of transportation, and the same problems show up in cities, counties, school districts, and private firms.
        </p>
      </Hero>

      <Section label="What we do" title="Four service lines">
        <Grid cols={4}>
          {LINES.map((l) => (
            <Card key={l.id} href={lineHref(l)} image={l.image} title={l.name} text={l.lead} meta={`${l.services.length} services`} />
          ))}
        </Grid>
      </Section>

      <Section label="Across every line">
        <Chips items={CROSS.map((c) => ({ href: crossHref(c), label: c.name }))} />
      </Section>

      <Section label="Who we serve" title="State DOTs first, and every organization that runs public infrastructure">
        <Chips items={INDUSTRIES.map((i) => ({ href: industryHref(i), label: i.short }))} />
      </Section>

      {/* Partner Field Guide numbers, marked "pending clearance" in the wireframe. */}
      <Section label="By the numbers">
        <div className="rd-stats">
          <div className="rd-stat"><b>2017</b><span>Established</span></div>
          <div className="rd-stat"><b>30+</b><span>Transportation agencies served</span></div>
          <div className="rd-stat"><b>10+</b><span>Public agencies our people came from</span></div>
        </div>
        <div style={{ marginTop: 18 }}>
          <Placeholder>These numbers come from the Partner Field Guide and are pending clearance before launch.</Placeholder>
        </div>
      </Section>

      <Section label="Featured work" title="Where we've done this">
        <CaseCards list={featured} />
      </Section>

      <Section label="Latest insights">
        <Grid>
          {THOUGHT_LEADERSHIP.slice(0, 3).map((a: any) => (
            <Card key={a.slug} href={`/insights/thought-leadership/${a.slug}`} image={a.image} meta={`Article · ${a.dateLabel || ""}`} title={a.title} />
          ))}
          <Card href="/insights/podcast" title="Podcast" text="Conversations with agency leaders." meta="Podcast" />
          <Card href="/insights/news" title="News & Events" meta="News" text="Conferences, awards, and announcements." />
        </Grid>
      </Section>
      <Cta />
    </RdShell>
  );
}

/* ================= SERVICES OVERVIEW ================= */
export function ServicesPage() {
  return (
    <RdShell>
      <Hero crumbs={[["/services", "Services"]]} label="Services" title="Services">
        <p>
          Two lines work for any organization ({LINES[0].name}; {LINES[2].name}). Two are infrastructure specialties
          ({LINES[1].name}; {LINES[3].name}). Most engagements draw on more than one.
        </p>
      </Hero>
      {LINES.map((l) => (
        <Section key={l.id} label="Service line" title={l.name} id={l.slug}>
          <p className="rd-lead" style={{ marginBottom: 24 }}>{l.lead}</p>
          <Grid>
            {l.services.map((s) => (
              <Card key={s.id} href={`/services/${l.slug}/${s.slug}`} title={s.name} text={s.activities[0]} />
            ))}
          </Grid>
          <div className="rd-btns"><Btn href={lineHref(l)} ghost>About {l.name}</Btn></div>
        </Section>
      ))}
      <Section label="Across every line" title="Built into every engagement">
        <Grid cols={4}>
          {CROSS.map((c) => (
            <Card key={c.id} href={crossHref(c)} image={c.image} title={c.name} text={c.desc} />
          ))}
        </Grid>
      </Section>
      <Cta />
    </RdShell>
  );
}

/* ================= SERVICE LINE ================= */
export function LinePage({ line: l }: { line: Line }) {
  const inds = [...new Set(l.services.flatMap((s) => s.industries))];
  return (
    <RdShell>
      {/* lead source: {l.leadSrc} */}
      <Hero
        image={l.image}
        crumbs={[["/services", "Services"], [lineHref(l), l.name]]}
        label="Service line"
        title={l.name}
        actions={<Btn href="/contact">Talk to This Team</Btn>}
      >
        <p>{l.lead}</p>
      </Hero>

      <Section label="Services" title={`${l.services.length} services`}>
        <Grid>
          {l.services.map((s) => (
            <Card key={s.id} href={`/services/${l.slug}/${s.slug}`} title={s.name} text={s.activities[0]} />
          ))}
        </Grid>
      </Section>

      {l.id === "data-ai" && (
        /* Source: Partner Field Guide */
        <Section label="How the pieces build on each other">
          <Steps
            steps={[
              ["Data governance", "Know what you have, who owns it, and whether to trust it."],
              ["Policies and procedures", "Write down how the work, data, and tools will be used."],
              ["AI enablement and automation", "Remove the busywork. Add AI where judgment is needed."],
              ["Integration", "Connect the systems so information moves on its own."],
            ]}
          />
          <p style={{ marginTop: 18 }}>A client can start at any step. This is the order the pieces depend on.</p>
        </Section>
      )}
      {l.id === "aeronautics" && (
        /* Source: Jacob, AERO catalog (internal; review before publishing) */
        <Section label="Program lifecycle" title="Crawl, walk, run">
          <p className="rd-lead">
            In phase one an agency is a group of enthusiasts trying something. In phase two it solidifies policy,
            regulatory discipline, and structure. In phase three it runs reliably and is ready for advanced work.
          </p>
        </Section>
      )}

      <Section label="How we work">
        <Steps steps={l.steps} />
      </Section>

      <Section label="Industries we serve">
        <Chips items={inds.map(indChip)} />
      </Section>

      <Section label="Case studies" title="Where we've done this">
        <CaseCards list={casesForLine(l)} />
      </Section>

      <Section label="Our team">
        <TeamPlaceholder who={`The people who lead ${l.name} work, with headshots and former agency roles.`} />
      </Section>
      <Cta />
    </RdShell>
  );
}

/* ================= SERVICE ================= */
export function ServicePage({ s }: { s: ServiceRef }) {
  const l = s.line;
  const from = [
    ...Object.values(SERVICE_BY_ID).filter((x) => x.related.includes(s.id)),
    ...CROSS.filter((c) => c.related.includes(s.id)),
  ];
  return (
    <RdShell>
      {/* intro source: {s.introSrc}; challenge: {s.challengeSrc}; walk-away: {s.walkAwaySrc} */}
      <Hero
        crumbs={[["/services", "Services"], [lineHref(l), l.name], [serviceHref(s), s.name]]}
        label={l.name}
        title={s.name}
        actions={<Btn href="/contact">Talk to an Expert</Btn>}
      >
        {s.intro ? <p>{s.intro}</p> : <Placeholder>A short introduction to this service, from the subject matter lead.</Placeholder>}
      </Hero>

      <Section label="What we hear" title="The challenge">
        {s.challenge ? <Quote>{s.challenge}</Quote> : <Placeholder>The problems clients bring us for this service, in their words.</Placeholder>}
      </Section>

      <Section>
        <div className="rd-cols">
          <div>
            <p className="rd-label">What we deliver</p>
            <List items={s.activities} />
          </div>
          <div>
            <p className="rd-label">What you walk away with</p>
            {s.walkAway ? <List items={s.walkAway} /> : <Placeholder>The deliverables a client keeps at the end of the work.</Placeholder>}
          </div>
        </div>
      </Section>

      <InteractiveLink id={s.id} />

      <Section label="How we work">
        <Steps steps={l.steps} />
      </Section>

      <Section label="Where we've done this" title="Case studies">
        <CaseCards list={casesForService(s.id)} />
      </Section>

      <Section label="Related services" title="Across lines">
        <Grid>
          {s.related.map((id) => refLink(id)).filter(Boolean).map((r) => (
            <Card key={r!.href} href={r!.href} title={r!.name} meta={r!.group} />
          ))}
        </Grid>
        {from.length > 0 && (
          <p style={{ marginTop: 18, fontSize: 14, opacity: 0.85 }}>
            Also linked from: {from.map((x, i) => (
              <span key={x.id}>{i > 0 && ", "}<Link href={"line" in x ? serviceHref(x as ServiceRef) : crossHref(x as Cross)} style={{ textDecoration: "underline", textDecorationColor: "#c9b78c" }}>{x.name}</Link></span>
            ))}
          </p>
        )}
      </Section>

      <Section label="Industries">
        <Chips items={s.industries.map(indChip)} />
      </Section>

      <Section label="Who to talk to">
        <div style={{ maxWidth: 420 }}>
          <div className="rd-card">
            <div className="rd-person">
              <div className="rd-person-img" />
              <div><b>Subject matter lead</b><span>Title · email</span></div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16 }}><Placeholder>The lead for this service has not been named yet.</Placeholder></div>
      </Section>
      <Cta />
    </RdShell>
  );
}

/* ================= ACROSS EVERY LINE ================= */
export function CrossPage({ c }: { c: Cross }) {
  const cases = NEW_CASE_STUDIES.filter((x) => x.services.some((id) => c.related.includes(id)));
  return (
    <RdShell>
      <Hero image={c.image} crumbs={[["/services", "Services"], [crossHref(c), c.name]]} label="Across every line" title={c.name}>
        <p>{c.desc}</p>
      </Hero>
      <Section label="Overview">
        <Placeholder>A fuller description of how this runs through our work in every line.</Placeholder>
      </Section>
      <Section label="Where this shows up">
        <Grid>
          {c.related.map((id) => refLink(id)).filter(Boolean).map((r) => (
            <Card key={r!.href} href={r!.href} title={r!.name} meta={r!.group} />
          ))}
        </Grid>
      </Section>
      {c.id === "research-x" && (
        <Section label="Read and listen">
          <Grid>
            <Card href="/insights/thought-leadership" title="Thought Leadership" meta="Articles" />
            <Card href="/insights/podcast" title="Podcast" meta="Episodes" />
          </Grid>
        </Section>
      )}
      <Section label="Case studies">
        <CaseCards list={cases} />
      </Section>
      <Cta />
    </RdShell>
  );
}

/* ================= INDUSTRIES ================= */
export function IndustriesPage() {
  return (
    <RdShell>
      {/* Draft positioning */}
      <Hero crumbs={[["/industries", "Industries"]]} label="Industries" title="Who we serve">
        <p>We built our practice inside state transportation agencies. The same work fits any organization that owns and runs public infrastructure.</p>
      </Hero>
      <Section>
        <Grid>
          {INDUSTRIES.map((i) => (
            <Card key={i.id} href={industryHref(i)} image={i.image} title={i.name} text={i.lead} />
          ))}
        </Grid>
      </Section>
      <Cta />
    </RdShell>
  );
}

export function IndustryPage({ i }: { i: Industry }) {
  if (i.id === "intl") return <InternationalPage i={i} />;
  const subs = servicesForIndustry(i.id);
  return (
    <RdShell>
      <Hero
        image={i.image}
        crumbs={[["/industries", "Industries"], [industryHref(i), i.name]]}
        label="Industry"
        title={i.name}
        actions={<Btn href="/contact">Get In Touch</Btn>}
      >
        <p>{i.lead}</p>
      </Hero>
      <Section label="Challenges we hear">
        <Placeholder>The problems organizations in this industry bring us, in their words.</Placeholder>
      </Section>
      <Section label="Services we use here" title="By service line">
        {LINES.map((l) => {
          const x = subs.filter((s) => s.line.id === l.id);
          if (!x.length) return null;
          return (
            <div className="rd-chip-group" key={l.id}>
              <h3>{l.name}</h3>
              <Chips items={x.map((s) => ({ href: serviceHref(s), label: s.name }))} />
            </div>
          );
        })}
      </Section>
      <Section label="Case studies">
        <CaseCards list={NEW_CASE_STUDIES.filter((c) => c.industry === i.id)} />
      </Section>
      <Cta />
    </RdShell>
  );
}

function InternationalPage({ i }: { i: Industry }) {
  // Pending Scott and Andy's approval. Write for someone who has never heard "DOT".
  return (
    <RdShell>
      <Hero image={i.image} crumbs={[["/industries", "Industries"], [industryHref(i), i.name]]} label="Industry" title="International">
        <p>U.S.-proven, expanding by design.</p>
        <Placeholder>The rest of this introduction is still to come.</Placeholder>
      </Hero>
      {/* Source: past proposal language */}
      <Section label="What we offer outside the U.S.">
        <List items={["Transport data governance and regulatory readiness", "AI governance, security, and control frameworks", "Organizational transformation for transport ministries and authorities", "Advanced air mobility planning and drone programs"]} />
      </Section>
      {/* Source: our project records */}
      <Section label="Proof, translated">
        <List items={["Work with state transportation agencies across the U.S. (counts pending clearance)", "Leaders who ran agencies: former deputy director and chief engineer, chief information officer, and chief data and AI officer", "Standards our proposals already use: ISO 55000 (asset management), ISO 42001 (AI management), and the NIST AI risk framework"]} />
      </Section>
      <Section label="How we deliver internationally">
        <List items={["Local partners", "Registered as Rawlins Global in the Middle East", "Named international contact"]} />
      </Section>
      <Section label="Case studies">
        <Placeholder>No international case study has been cleared yet.</Placeholder>
      </Section>
      <Cta />
    </RdShell>
  );
}

/* ================= CASE STUDY (new) ================= */
export function NewCasePage({ c }: { c: NewCaseStudy }) {
  const ind = INDUSTRY_BY_ID[c.industry];
  return (
    <RdShell>
      {/* Source: Rawlins Case Study Drafts v1 (Nov 2 2026). Public descriptors only. */}
      <Hero
        image={c.image}
        crumbs={[["/insights", "Insights"], ["/insights/case-studies", "Case Studies"], [caseHref(c), c.title]]}
        label={`${c.who} · ${c.status}`}
        title={c.title}
      />
      <Section label="The challenge">
        <p className="rd-lead">{c.challenge}</p>
      </Section>
      <Section>
        <div className="rd-cols">
          <div>
            <p className="rd-label">What we did</p>
            <List items={c.did} />
          </div>
          <div>
            <p className="rd-label">Results</p>
            {c.results.length ? <List items={c.results} /> : <Placeholder>Results to confirm with the state lead.</Placeholder>}
          </div>
        </div>
      </Section>
      <Section label="Services used">
        <Chips items={c.services.map((id) => refLink(id)).filter(Boolean).map((r) => ({ href: r!.href, label: r!.name }))} />
      </Section>
      <Section label="Industry">
        <Chips items={[{ href: industryHref(ind), label: ind.short }]} />
      </Section>
      <Cta />
    </RdShell>
  );
}

/* ================= ABOUT ================= */
export function AboutPage() {
  const items: [string, string, string][] = [
    ["/about/who-we-are", "Who We Are", "Former agency leaders, working alongside an in-house automation and AI build team."],
    ["/about/how-we-work", "How We Work", "Start where the client is, and stay through execution."],
    ["/about/our-people", "Our People", "The team, filterable by service line."],
    ["/about/areas-we-serve", "Areas We Serve", "Where we have delivered work."],
    ["/careers", "Careers", "Work with us."],
  ];
  return (
    <RdShell>
      <Hero crumbs={[["/about", "About"]]} label="About" title="About Rawlins" />
      <Section>
        <Grid>
          {items.map(([h, t, d]) => <Card key={h} href={h} title={t} text={d} />)}
        </Grid>
      </Section>
      <Cta title="Get to know us" />
    </RdShell>
  );
}

export function WhoWeArePage() {
  return (
    <RdShell>
      <Hero crumbs={[["/about", "About"], ["/about/who-we-are", "Who We Are"]]} label="About" title="Who We Are">
        <p>Former agency leaders, working alongside an in-house automation and AI build team.</p>
      </Hero>
      <Section label="Our story">
        <Placeholder note="Founding year and founder story pending from Scott.">How Rawlins started, and why.</Placeholder>
      </Section>
      {/* Source: Sep 11 staff meeting. Wording to confirm. */}
      <Section label="Our values">
        <List items={["Put team success first", "Communicate early and clearly", "Seek the right perspectives", "Treat every contribution with respect", "Own the outcome"]} />
      </Section>
      {/* Source: Partner Field Guide */}
      <Section label="Who's behind it" title="People who ran the agencies we serve">
        <Grid cols={2}>
          {LEADERS.map(([name, role]) => {
            const img = photoFor(name);
            return (
              <div className="rd-card" key={name}>
                <div className="rd-person">
                  <div className="rd-person-img" style={img ? { backgroundImage: `url(${img})` } : undefined} />
                  <div><b>{name}</b><span>{role}</span></div>
                </div>
              </div>
            );
          })}
        </Grid>
        <div className="rd-btns"><Btn href="/about/our-people" ghost>Meet Everyone</Btn></div>
      </Section>
      <Cta />
    </RdShell>
  );
}

export function HowWeWorkPage() {
  // Source: Partner Field Guide
  const p: [string, string][] = [
    ["Start where the client is", "Most organizations already have a plan, a framework, or a manual. We put what exists to work before writing anything new."],
    ["Bridge before building", "We use the systems and licenses a client already owns, and build new only when nothing existing can do the job."],
    ["Straight answers on AI", "When a problem needs a rule, a process, or a decision instead of a model, we say so."],
    ["The client owns the result", "Every build comes with documentation and training. No lock-in."],
    ["We stay through execution", "Recommendations are where we start. We help put them into practice."],
  ];
  return (
    <RdShell>
      <Hero crumbs={[["/about", "About"], ["/about/how-we-work", "How We Work"]]} label="About" title="How We Work" />
      <Section label="Principles">
        <Steps steps={p} />
      </Section>
      <Section label="How an engagement runs">
        <Grid cols={2}>
          {LINES.map((l) => (
            <div key={l.id} className="rd-card"><div className="rd-card-body">
              <span className="rd-card-meta">{l.name}</span>
              <p className="rd-card-text">{l.steps.join(" → ")}</p>
            </div></div>
          ))}
        </Grid>
      </Section>
      <Section label="Partners">
        <Placeholder note="Teaming firms, names pending their consent.">The firms we team with.</Placeholder>
      </Section>
      <Cta />
    </RdShell>
  );
}

/* ================= INSIGHTS: NEWS ================= */
export function NewsPage() {
  return (
    <RdShell>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/news", "News & Events"]]} label="Insights" title="News & Events">
        <p>Conferences, awards, and announcements.</p>
      </Hero>
      <Section>
        <Grid>
          {[1, 2, 3].map((n) => (
            <div key={n} className="rd-card"><div className="rd-card-img" style={{ background: "rgba(255,255,255,0.05)" }} /><div className="rd-card-body">
              <span className="rd-card-meta">News · date</span>
              <h3 className="rd-card-title">News item {n}</h3>
            </div></div>
          ))}
        </Grid>
        <div style={{ marginTop: 18 }}><Placeholder>News and events have not been supplied yet.</Placeholder></div>
      </Section>
      <Cta />
    </RdShell>
  );
}

/* ================= SITE MAP ================= */
export function SiteMapPage() {
  return (
    <RdShell>
      <Hero crumbs={[["/site-map", "Site Map"]]} label="Rawlins" title="Site map" />
      <Section>
        <div className="rd-tree">
          <ul>
            <li><b><Link href="/">Home</Link></b></li>
            <li><b><Link href="/services">Services</Link></b>
              <ul>
                {LINES.map((l) => (
                  <li key={l.id}><Link href={lineHref(l)}>{l.name}</Link>
                    <ul>{l.services.map((s) => <li key={s.id}><Link href={`/services/${l.slug}/${s.slug}`}>{s.name}</Link></li>)}</ul>
                  </li>
                ))}
                <li>Across every line
                  <ul>{CROSS.map((c) => <li key={c.id}><Link href={crossHref(c)}>{c.name}</Link></li>)}</ul>
                </li>
              </ul>
            </li>
            <li><b><Link href="/industries">Industries</Link></b>
              <ul>{INDUSTRIES.map((i) => <li key={i.id}><Link href={industryHref(i)}>{i.name}</Link></li>)}</ul>
            </li>
            <li><b><Link href="/insights">Insights</Link></b>
              <ul>
                <li><Link href="/insights/case-studies">Case Studies</Link>
                  <ul>
                    {NEW_CASE_STUDIES.map((c) => <li key={c.id}><Link href={caseHref(c)}>{c.title}</Link></li>)}
                    {CASE_STUDIES.map((c: any) => <li key={c.slug}><Link href={`/insights/case-studies/${c.slug}`}>{c.title}{c.subtitle ? `: ${c.subtitle}` : ""}</Link></li>)}
                  </ul>
                </li>
                <li><Link href="/insights/thought-leadership">Thought Leadership</Link></li>
                <li><Link href="/insights/podcast">Podcast</Link></li>
                <li><Link href="/insights/news">News &amp; Events</Link></li>
              </ul>
            </li>
            <li><b><Link href="/about">About</Link></b>
              <ul>
                <li><Link href="/about/who-we-are">Who We Are</Link></li>
                <li><Link href="/about/how-we-work">How We Work</Link></li>
                <li><Link href="/about/our-people">Our People</Link></li>
                <li><Link href="/about/areas-we-serve">Areas We Serve</Link></li>
              </ul>
            </li>
            <li><b><Link href="/careers">Careers</Link></b></li>
            <li><b><Link href="/contact">Get In Touch</Link></b></li>
          </ul>
        </div>
      </Section>
    </RdShell>
  );
}

export { STATES_SERVED };

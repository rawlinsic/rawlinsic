/* Who we work with: overview, industry pages, sub-sector pages, Private
   Sector (its own plain-language layout), and the hidden International page.
   The industry, sub-sector and Private Sector pages are drawn by
   components/v8/industry.tsx (the area pages' system); which projects they
   show, and in what order, is decided here. */
import { CASES, VISIBLE_INDUSTRIES, caseById, industryHref, isOurs, type CaseIndex, type Industry, type Subsector } from "@/lib/content/site";
import { INDUSTRY_PHOTO, PAGE_PHOTO } from "@/lib/content/media";
import { CASES as CASE_DATA } from "@/lib/content/catalog";
import { Btn, Hero, List, Sec, ServiceChips, Shell, Talk } from "@/components/site/ui";
import { IndustryV8, PrivateV8, SubsectorV8 } from "@/components/v8/industry";

export function IndustriesIndex() {
  return (
    <Shell scene="interchange" photo={PAGE_PHOTO.industries}>
      <Hero crumbs={[["/industries", "Who we work with"]]} kicker="Who we work with" title="Public agencies and private firms, wherever the work is."
        lead={<p>Most of our work is with the public agencies that own and run infrastructure: more than 30 transportation agencies, local agencies, and a multi-state research program. We also work with the contractors and engineering firms that build for those agencies, and we help private firms connect their systems and workflows. Our work so far has been in the United States, and our team can work anywhere.</p>}
        actions={<Btn href="/contact" primary>Get in touch</Btn>} />
      <Sec title="Who We Work With">
        <ul className="pg-cards">
          {VISIBLE_INDUSTRIES.map((i) => (
            <li key={i.id}>
              <a href={industryHref(i)} className="pg-card pg-card-link">
                <b>{i.name}</b>
                <span>{i.lead}</span>
                <span className="pg-case-k">{i.who}</span>
              </a>
            </li>
          ))}
        </ul>
      </Sec>
      <Talk />
    </Shell>
  );
}

export function IndustryPage({ ind }: { ind: Industry }) {
  /* Nov 13 (Who We Work With file v1): Growing Companies takes the Private Sector page's own layout and content; Private Sector
     is now the overview of its three pages. Those two and the three other new pages show exactly their own projects, in order. */
  if (ind.id === "growth") return <PrivateSector ind={ind} />;
  if (["gov", "private", "fed", "local", "eng"].includes(ind.id)) return <IndustryV8 ind={ind} cases={ind.projects.map((id) => caseById(id)).filter(Boolean) as CaseIndex[]} />;
  if (ind.id === "intl") return <IndustryV8 ind={ind} cases={[]} />; // the same layout as the other industries (INTERNATIONAL PAGE, Nov 11)
  /* Featured projects: Rawlins work only (no Before Rawlins cases). Contractors &
     Engineering Firms shows its own list, in this order (an engineering firm is
     the client on cs-pv-pmo). The page shows the first six. */
  const cases = (ind.id === "contractors"
    ? CONTRACTOR_CASES.map((id) => caseById(id)).filter(Boolean) as CaseIndex[]
    : [...[...ind.projects, ...(ind.more ?? [])].map((id) => caseById(id)).filter(Boolean) as CaseIndex[], ...CASES.filter((c) => c.industry === ind.id && !ind.projects.includes(c.id) && !(ind.more ?? []).includes(c.id)),
      /* a headline page (Public Sector) goes on to the projects of the sectors under it (Nov 12) */
      ...CASES.filter((c) => VISIBLE_INDUSTRIES.some((i) => i.parent === ind.id && i.id === c.industry) && !ind.projects.includes(c.id))]
  ).filter(isOurs);
  return <IndustryV8 ind={ind} cases={cases} />;
}

const CONTRACTOR_CASES = ["cs-major", "cs-db-partnering", "cs-ia-partnering", "cs-partnering", "cs-maint-model", "cs-pv-pmo"];
/* Private Sector: our own project first, then our automation team's work before Rawlins (tagged) */
const PRIVATE_CASES = ["cs-pv-pmo", "cs-pv-capacity", "cs-pv-reporting", "cs-pv-service", "cs-pv-field", "cs-pv-single", "cs-pv-sales"];

const SUB_FIRST: Record<string, string[]> = { "sub-ports": ["cs-harbor"] };

export function SubsectorPage({ ind, sub }: { ind: Industry; sub: Subsector }) {
  /* a page's own first projects, in order (Ports & Harbors: the harbor demonstration first; mode pages file v1, Nov 13) */
  const first = SUB_FIRST[sub.id] ?? [];
  const rank = (id: string) => (first.includes(id) ? first.indexOf(id) : first.length);
  const list = CASES.filter((c) => CASE_DATA[c.id]?.subsectors.includes(sub.id)).sort((a, b) => rank(a.id) - rank(b.id));
  return <SubsectorV8 ind={ind} sub={sub} cases={list} />;
}

function PrivateSector({ ind }: { ind: Industry }) {
  const cases = PRIVATE_CASES.map((id) => caseById(id)).filter(Boolean) as CaseIndex[];
  return <PrivateV8 ind={ind} cases={cases} services={ind.featured} />;
}

/* The International page before Nov 11 (not used: International Markets uses IndustryV8). */
export function International() {
  return (
    <Shell scene="globe" photo={INDUSTRY_PHOTO.intl}>
      <Hero crumbs={[["/industries", "Who we work with"], ["/industries/international", "International Markets"]]} kicker="International Markets" title="Transport agencies everywhere do the same job"
        lead={<p><b>Our work to date is in the United States.</b> A U.S. state department of transportation runs highways, bridges, aviation, and transit for millions of people. That&apos;s the same job a ministry of transport or a national roads authority does, and the lessons carry over.</p>}
        actions={<Btn href="/contact" primary>Get in touch</Btn>}>
      </Hero>
      <Sec title="What carries over">
        <List cols items={[
          "Transport data governance and readiness for new regulation",
          "AI governance, security, and control frameworks",
          "Organizational transformation for ministries and transport authorities",
          "Drone programs and advanced air mobility planning",
          "Smart mobility and connected systems",
        ]} />
      </Sec>
      <Sec title="How we deliver" tone="panel">
        <List items={[
          "Through Rawlins Global, our registered entity in the Middle East",
          "With members of our team based in Dubai, South Africa, and Canada",
          "With local partners who know the country and its institutions",
          "With a named regional lead as your single point of contact",
        ]} />
      </Sec>
      <Sec title="Services"><ServiceChips ids={["data-governance", "ai", "tech-strategy", "org-design", "change-mgmt", "drone-programs", "drone-aam", "smart-mobility"]} /></Sec>
      <Talk />
    </Shell>
  );
}

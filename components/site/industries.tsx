/* Who we work with: overview, industry pages, sub-sector pages, Private
   Sector (its own plain-language layout), and the hidden International page.
   The industry, sub-sector and Private Sector pages are drawn by
   components/v8/industry.tsx (the area pages' system); which projects they
   show, and in what order, is decided here. */
import { CASES, VISIBLE_INDUSTRIES, caseById, industryHref, isOurs, type CaseIndex, type Industry, type Subsector } from "@/lib/content/site";
import { INDUSTRY_PHOTO, PAGE_PHOTO } from "@/lib/content/media";
import { CASES as CASE_DATA } from "@/lib/content/catalog";
import { Btn, Dev, Hero, List, Sec, ServiceChips, Shell, Talk } from "@/components/site/ui";
import { IndustryV8, PrivateV8, SubsectorV8 } from "@/components/v8/industry";

export function IndustriesIndex() {
  return (
    <Shell scene="interchange" photo={PAGE_PHOTO.industries}>
      <Hero crumbs={[["/industries", "Who we work with"]]} kicker="Who we work with" title="Public agencies and private firms, wherever the work is."
        lead={<p>Most of our work is with organizations that own and run public infrastructure: more than 30 transportation agencies so far, plus local governments and a multi-state research program. We also work with contractors and engineering firms on public projects, and with private firms on their systems and workflows. Our work so far is across the United States, and our team can do it anywhere.</p>}
        actions={<Btn href="/contact" primary>Get in touch</Btn>} />
      <Sec title="Industries">
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
  if (ind.id === "private") return <PrivateSector ind={ind} />;
  if (ind.id === "intl") return <International />;
  /* Featured projects: Rawlins work only (no Before Rawlins cases). Contractors &
     Engineering Firms shows its own list, in this order (an engineering firm is
     the client on cs-pv-pmo). The page shows the first six. */
  const cases = (ind.id === "contractors"
    ? CONTRACTOR_CASES.map((id) => caseById(id)).filter(Boolean) as CaseIndex[]
    : [...ind.projects.map((id) => caseById(id)).filter(Boolean) as CaseIndex[], ...CASES.filter((c) => c.industry === ind.id && !ind.projects.includes(c.id))]
  ).filter(isOurs);
  return <IndustryV8 ind={ind} cases={cases} />;
}

const CONTRACTOR_CASES = ["cs-major", "cs-db-partnering", "cs-ia-partnering", "cs-partnering", "cs-maint-model", "cs-pv-pmo"];
/* Private Sector: our own project first, then our automation team's work before Rawlins (tagged) */
const PRIVATE_CASES = ["cs-pv-pmo", "cs-pv-capacity", "cs-pv-reporting", "cs-pv-service", "cs-pv-field"];

export function SubsectorPage({ ind, sub }: { ind: Industry; sub: Subsector }) {
  const list = CASES.filter((c) => CASE_DATA[c.id]?.subsectors.includes(sub.id));
  return <SubsectorV8 ind={ind} sub={sub} cases={list} />;
}

function PrivateSector({ ind }: { ind: Industry }) {
  const cases = PRIVATE_CASES.map((id) => caseById(id)).filter(Boolean) as CaseIndex[];
  return <PrivateV8 ind={ind} cases={cases} services={["automation", "ai", "data-governance", "dashboards", "tech-strategy", "change-mgmt"]} />;
}

/* Hidden until Scott and Andy approve: not linked anywhere, noindex. */
export function International() {
  return (
    <Shell scene="globe" photo={INDUSTRY_PHOTO.intl}>
      <Hero crumbs={[["/industries", "Who we work with"], ["/industries/international", "International"]]} kicker="International" title="Transport agencies everywhere do the same job"
        lead={<p><b>Our work to date is in the United States.</b> A U.S. state department of transportation runs highways, bridges, aviation, and transit for millions of people. That&apos;s the same job a ministry of transport or a national roads authority does, and the lessons carry over.</p>}
        actions={<Btn href="/contact" primary>Get in touch</Btn>}>
        <Dev>Hidden page: not linked, noindex. Needs Scott and Andy&apos;s approval before it goes live.</Dev>
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

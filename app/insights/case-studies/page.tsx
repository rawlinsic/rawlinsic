import type { Metadata } from "next";
import { RdShell, Hero, Section, Cta } from "@/components/rd/ui";
import CaseIndex, { ExistingCases } from "@/components/rd/case-index";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Discover how Rawlins has helped transportation agencies across the country implement strategic, high-impact solutions tailored to their unique operational goals.",
};

/* Redesign index. The previous index component (components/case-studies-overview.tsx) is unchanged and unused here. */
export default function Page() {
  return (
    <RdShell>
      <Hero crumbs={[["/insights", "Insights"], ["/insights/case-studies", "Case Studies"]]} label="Insights" title="Case Studies">
        <p>Work we have delivered for state transportation agencies and the organizations around them.</p>
      </Hero>
      <Section label="Recent work" title="Filter by service line or industry">
        <CaseIndex />
      </Section>
      <Section label="By state" title="More of our work">
        <ExistingCases />
      </Section>
      <Cta />
    </RdShell>
  );
}

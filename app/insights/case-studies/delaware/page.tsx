import type { Metadata } from "next";
import { CASE_STUDIES } from "@/components/case-studies-data";
import { StateCasePage } from "@/components/site/cases";

const study = CASE_STUDIES.find((s) => s.slug === "delaware")!;

export const metadata: Metadata = {
  title: `${study.title} · Case Studies`,
  description: study.description,
  alternates: { canonical: "/insights/case-studies/delaware" },
};

export default function Page() {
  return <StateCasePage slug="delaware" />;
}

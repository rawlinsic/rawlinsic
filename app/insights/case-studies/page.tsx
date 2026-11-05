import type { Metadata } from "next";
import { CaseIndexPage } from "@/components/site/cases";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Our work across the country, by service, industry, and state, including work in progress.",
  alternates: { canonical: "/insights/case-studies" },
};
export default function Page() { return <CaseIndexPage />; }

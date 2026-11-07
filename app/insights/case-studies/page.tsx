import type { Metadata } from "next";
import { CaseIndexPage } from "@/components/site/cases";

export const metadata: Metadata = {
  title: "Projects",
  description: "Rawlins projects and case studies, by service, industry, and state, including work in progress.",
  alternates: { canonical: "/insights/case-studies" },
};
export default function Page() { return <CaseIndexPage />; }

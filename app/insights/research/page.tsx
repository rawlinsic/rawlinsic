import type { Metadata } from "next";
import { ResearchPage } from "@/components/site/more";
export const metadata: Metadata = { title: "Research & Publications", description: "Guidance manuals, multi-state standards, and research from the Rawlins team.", alternates: { canonical: "/insights/research" } };
export default function Page() { return <ResearchPage />; }

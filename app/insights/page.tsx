import type { Metadata } from "next";
import { InsightsIndex } from "@/components/site/more";
export const metadata: Metadata = { title: "Insights", description: "Projects, news and recognition, thought leadership, research, and the Rawlins Way podcast.", alternates: { canonical: "/insights" } };
export default function Page() { return <InsightsIndex />; }

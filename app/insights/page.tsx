import type { Metadata } from "next";
import { InsightsIndex } from "@/components/site/more";
export const metadata: Metadata = { title: "Insights", description: "Projects, news and recognition, thought leadership, research, and the Rawlins Way podcast.", alternates: { canonical: "/insights" } };
/* the fanned cards include the next event, which drops off the day after it ends */
export const revalidate = 3600;
export default function Page() { return <InsightsIndex />; }

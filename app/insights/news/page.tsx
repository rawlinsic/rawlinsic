import type { Metadata } from "next";
import { NewsPage } from "@/components/site/more";
/* hourly, so an event drops off the day after it ends without a new deploy */
export const revalidate = 3600;
export const metadata: Metadata = { title: "News & Recognition", description: "Wins, awards, publications, speaking, events, and new people on the Rawlins team.", alternates: { canonical: "/insights/news" } };
export default function Page() { return <NewsPage />; }

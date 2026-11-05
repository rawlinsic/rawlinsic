import type { Metadata } from "next";
import { NewsPage } from "@/components/site/more";
export const metadata: Metadata = { title: "News & Recognition", description: "Wins, awards, publications, speaking, events, and new people on the Rawlins team.", alternates: { canonical: "/insights/news" } };
export default function Page() { return <NewsPage />; }

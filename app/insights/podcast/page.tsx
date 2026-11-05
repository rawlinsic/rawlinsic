import type { Metadata } from "next";
import { Podcast } from "@/components/site/more";
export const metadata: Metadata = {
  title: "The Rawlins Way Podcast",
  description: "The Rawlins Way podcast offers an inside look at how Rawlins delivers value-driven infrastructure consulting through project deep dives, team insights, and industry discussions.",
  alternates: { canonical: "/insights/podcast" },
};
export default function Page() { return <Podcast />; }

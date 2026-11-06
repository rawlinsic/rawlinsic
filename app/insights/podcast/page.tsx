import type { Metadata } from "next";
import { Podcast } from "@/components/site/more";
export const metadata: Metadata = {
  title: "The Rawlins Way Podcast",
  description: "The Rawlins Way is our podcast: project deep dives, conversations with our team, and discussions of the issues agencies are working through.",
  alternates: { canonical: "/insights/podcast" },
};
export default function Page() { return <Podcast />; }

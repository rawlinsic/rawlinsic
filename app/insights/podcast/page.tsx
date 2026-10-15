import type { Metadata } from "next";
import PodcastPage from "@/components/podcast-page";

export const metadata: Metadata = {
  title: "The Rawlins Way Podcast",
  description:
    "The Rawlins Way podcast offers an inside look at how Rawlins delivers value-driven infrastructure consulting through project deep dives, team insights, and industry discussions.",
};

export default function Page() {
  return <PodcastPage />;
}

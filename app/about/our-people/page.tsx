import type { Metadata } from "next";
import TeamPage from "@/components/team-page";

export const metadata: Metadata = {
  title: "Our People",
  description:
    "Meet the 51 accomplished professionals at Rawlins — a global management consulting firm at the intersection of strategy, operations, and technology.",
  openGraph: {
    title: "Our People",
    description:
      "Meet the team driving strategic, operational, and technology transformation across the transportation industry.",
    images: [
      "/images/pages/hero-bg.webp",
    ],
  },
};

export default function OurPeoplePage() {
  return <TeamPage />;
}

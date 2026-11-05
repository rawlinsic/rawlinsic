import type { Metadata } from "next";
import { IndustriesIndex } from "@/components/site/industries";

export const metadata: Metadata = {
  title: "Who We Work With",
  description: "Transportation, Government & Public Works, Contractors & Engineering Firms, and the Private Sector.",
  alternates: { canonical: "/industries" },
};
export default function Page() { return <IndustriesIndex />; }

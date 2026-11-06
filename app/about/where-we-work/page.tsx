import type { Metadata } from "next";
import { WhereWeWork } from "@/components/site/more";
export const metadata: Metadata = { title: "Where We Work", description: "The states where our work has taken us. Our work so far is across the United States, and our team can do it anywhere.", alternates: { canonical: "/about/where-we-work" } };
export default function Page() { return <WhereWeWork />; }

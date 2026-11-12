import type { Metadata } from "next";
import { WhereWeWork } from "@/components/site/more";
export const metadata: Metadata = { title: "", description: "The states where our work has taken us. Our work so far has been in the United States, and our team can work anywhere.", alternates: { canonical: "/about/where-we-work" } };
export default function Page() { return <WhereWeWork />; }

import type { Metadata } from "next";
import { WhereWeWork } from "@/components/site/more";
/* the browser-tab title: the preview edit that emptied the "Where We Work" menu label (Nov 12) emptied this too; a page needs one */
export const metadata: Metadata = { title: "Where We Work", description: "The states where our work has taken us. Our work so far has been in the United States, and our team can work anywhere.", alternates: { canonical: "/about/where-we-work" } };
export default function Page() { return <WhereWeWork />; }

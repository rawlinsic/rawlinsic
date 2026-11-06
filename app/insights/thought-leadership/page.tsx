import type { Metadata } from "next";
import { ThoughtIndex } from "@/components/site/more";
export const metadata: Metadata = {
  title: "Thought Leadership",
  description: "Practical perspectives from our team on strategy, technology, data governance, and organizational change.",
  alternates: { canonical: "/insights/thought-leadership" },
};
export default function Page() { return <ThoughtIndex />; }

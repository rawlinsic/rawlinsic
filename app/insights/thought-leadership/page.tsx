import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ThoughtIndex } from "@/components/site/more";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";
export const metadata: Metadata = {
  title: "Thought Leadership",
  description: "Practical perspectives from our team on strategy, technology, data governance, and organizational change.",
  alternates: { canonical: "/insights/thought-leadership" },
};
/* one article so far: go straight to it (Nicole, Nov 10); the list comes back with a second */
export default function Page() {
  if (THOUGHT_LEADERSHIP.length === 1) redirect(`/insights/thought-leadership/${THOUGHT_LEADERSHIP[0].slug}`);
  return <ThoughtIndex />;
}

import type { Metadata } from "next";
import { ArticlePage } from "@/components/site/more";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";

const article = THOUGHT_LEADERSHIP.find((a) => a.slug === "minimizing-data-governance-fatigue")!;
export const metadata: Metadata = {
  title: `${article.title} · Thought Leadership`,
  description: article.excerpt,
  alternates: { canonical: `/insights/thought-leadership/${article.slug}` },
};
export default function Page() { return <ArticlePage a={article} />; }

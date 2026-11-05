import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASES, caseWho } from "@/lib/content/site";
import { CaseDetail } from "@/components/site/cases";
import { CASES as CASE_DATA } from "@/lib/content/catalog";

const PROD = process.env.VERCEL_ENV === "production";
export const dynamicParams = false;
export function generateStaticParams() { return CASES.map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CASES.find((x) => x.slug === slug);
  if (!c) return {};
  return { title: c.title, description: `${caseWho(c, PROD)}. ${CASE_DATA[c.id]?.ch ?? ""}`.slice(0, 300), alternates: { canonical: `/insights/case-studies/${c.slug}` } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CASES.find((x) => x.slug === slug);
  if (!c) notFound();
  return <CaseDetail c={c} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NEW_CASE_STUDIES } from "@/lib/redesign-data";
import { NewCasePage } from "@/components/rd/pages";

/* New case studies. The existing state pages (delaware, louisiana,
   and the rest) are static folders beside this one and take priority. */
export function generateStaticParams() { return NEW_CASE_STUDIES.map((c) => ({ slug: c.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = NEW_CASE_STUDIES.find((x) => x.slug === slug);
  return { title: c?.title || "Case Study", description: c?.challenge };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = NEW_CASE_STUDIES.find((x) => x.slug === slug);
  if (!c) notFound();
  return <NewCasePage c={c} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/lib/content/site";
import { IndustryPage } from "@/components/site/industries";

export const dynamicParams = false;
export function generateStaticParams() { return INDUSTRIES.map((i) => ({ slug: i.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = INDUSTRIES.find((x) => x.slug === slug);
  if (!i) return {};
  return {
    title: i.name, description: i.lead, alternates: { canonical: `/industries/${i.slug}` },
    /* International stays out of search until approved */
    ...(i.hidden ? { robots: { index: false, follow: false } } : {}),
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = INDUSTRIES.find((x) => x.slug === slug);
  if (!i) notFound();
  return <IndustryPage ind={i} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/lib/redesign-data";
import { IndustryPage } from "@/components/rd/pages";

export function generateStaticParams() { return INDUSTRIES.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = INDUSTRIES.find((x) => x.slug === slug);
  return { title: i?.name || "Industries", description: i?.lead };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = INDUSTRIES.find((x) => x.slug === slug);
  if (!i) notFound();
  return <IndustryPage i={i} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AREAS } from "@/lib/content/site";
import { AREAS as AREA_DATA } from "@/lib/content/catalog";
import { AreaPage } from "@/components/site/services";

export const dynamicParams = false;
export function generateStaticParams() { return AREAS.map((a) => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = AREAS.find((x) => x.slug === slug);
  if (!a) return {};
  return { title: a.name, description: AREA_DATA[a.id].lead, alternates: { canonical: `/services/${a.slug}` } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = AREAS.find((x) => x.slug === slug);
  if (!a) notFound();
  return <AreaPage area={a} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/lib/content/site";
import { SubsectorPage } from "@/components/site/industries";

export const dynamicParams = false;
export function generateStaticParams() { return INDUSTRIES.flatMap((i) => i.subsectors.map((s) => ({ slug: i.slug, sub: s.slug }))); }
const find = (slug: string, sub: string) => {
  const ind = INDUSTRIES.find((x) => x.slug === slug);
  const s = ind?.subsectors.find((y) => y.slug === sub);
  return ind && s ? { ind, s } : null;
};
export async function generateMetadata({ params }: { params: Promise<{ slug: string; sub: string }> }): Promise<Metadata> {
  const { slug, sub } = await params;
  const hit = find(slug, sub);
  if (!hit) return {};
  return { title: `${hit.s.name} · ${hit.ind.name}`, description: hit.s.line, alternates: { canonical: `/industries/${slug}/${sub}` } };
}
export default async function Page({ params }: { params: Promise<{ slug: string; sub: string }> }) {
  const { slug, sub } = await params;
  const hit = find(slug, sub);
  if (!hit) notFound();
  return <SubsectorPage ind={hit.ind} sub={hit.s} />;
}

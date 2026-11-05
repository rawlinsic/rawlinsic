import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LINES, CROSS } from "@/lib/redesign-data";
import { LinePage, CrossPage } from "@/components/rd/pages";

export function generateStaticParams() {
  return [...LINES.map((l) => ({ slug: l.slug })), ...CROSS.map((c) => ({ slug: c.slug }))];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = LINES.find((x) => x.slug === slug);
  const c = CROSS.find((x) => x.slug === slug);
  return { title: l?.name || c?.name || "Services", description: l?.lead || c?.desc };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = LINES.find((x) => x.slug === slug);
  if (l) return <LinePage line={l} />;
  const c = CROSS.find((x) => x.slug === slug);
  if (c) return <CrossPage c={c} />;
  notFound();
}

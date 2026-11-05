import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LINES, SERVICE_BY_ID } from "@/lib/redesign-data";
import { ServicePage } from "@/components/rd/pages";

export function generateStaticParams() {
  return LINES.flatMap((l) => l.services.map((s) => ({ slug: l.slug, service: s.slug })));
}
export const dynamicParams = false;

const find = (slug: string, service: string) =>
  Object.values(SERVICE_BY_ID).find((s) => s.line.slug === slug && s.slug === service);

export async function generateMetadata({ params }: { params: Promise<{ slug: string; service: string }> }): Promise<Metadata> {
  const { slug, service } = await params;
  const s = find(slug, service);
  return { title: s?.name || "Service", description: s?.intro };
}

export default async function Page({ params }: { params: Promise<{ slug: string; service: string }> }) {
  const { slug, service } = await params;
  const s = find(slug, service);
  if (!s) notFound();
  return <ServicePage s={s} />;
}

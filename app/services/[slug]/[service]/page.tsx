import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AREAS } from "@/lib/content/site";
import { SERVICES } from "@/lib/content/catalog";
import { ServicePage, ALL_SERVICE_PARAMS } from "@/components/site/services";

export const dynamicParams = false;
export function generateStaticParams() { return ALL_SERVICE_PARAMS; }
const find = (slug: string, service: string) => AREAS.find((a) => a.slug === slug)?.services.find((s) => s.slug === service);
export async function generateMetadata({ params }: { params: Promise<{ slug: string; service: string }> }): Promise<Metadata> {
  const { slug, service } = await params;
  const s = find(slug, service);
  if (!s) return {};
  return { title: s.name, description: SERVICES[s.id]?.intro, alternates: { canonical: `/services/${slug}/${service}` } };
}
export default async function Page({ params }: { params: Promise<{ slug: string; service: string }> }) {
  const { slug, service } = await params;
  const s = find(slug, service);
  if (!s) notFound();
  return <ServicePage id={s.id} />;
}

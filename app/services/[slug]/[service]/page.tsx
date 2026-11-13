import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AREAS } from "@/lib/content/site";
import { SERVICES } from "@/lib/content/catalog";
import { ALL_SERVICE_PARAMS } from "@/components/site/services";
import Header from "@/components/v8/header";
import Footer from "@/components/v8/footer";
import ServiceV8 from "@/components/v8/service";
import Reveal from "@/components/v8/reveal";

export const dynamicParams = false;
export function generateStaticParams() { return ALL_SERVICE_PARAMS; }
const find = (slug: string, service: string) => AREAS.find((a) => a.slug === slug)?.services.find((s) => s.slug === service);
export async function generateMetadata({ params }: { params: Promise<{ slug: string; service: string }> }): Promise<Metadata> {
  const { slug, service } = await params;
  const s = find(slug, service);
  if (!s) return {};
  return { title: s.name, description: SERVICES[s.id]?.intro.split("\n\n")[0], alternates: { canonical: `/services/${slug}/${service}` } };
}
export default async function Page({ params }: { params: Promise<{ slug: string; service: string }> }) {
  const { slug, service } = await params;
  const s = find(slug, service);
  if (!s) notFound();
  return (
    <>
      <Header />
      <main id="main-content" className="v8">
        <ServiceV8 id={s.id} />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}

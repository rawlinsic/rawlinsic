import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AREAS } from "@/lib/content/site";
import { AREAS as AREA_DATA } from "@/lib/content/catalog";
import { DigitalShowcase, AviationShowcase } from "@/components/site/services";
import Header from "@/components/v8/header";
import Footer from "@/components/v8/footer";
import AreaV8 from "@/components/v8/area";
import Reveal from "@/components/v8/reveal";

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
  const extra = a.id === "tech" ? <DigitalShowcase /> : a.id === "aviation" ? <AviationShowcase /> : undefined;
  return (
    <>
      <Header />
      <main id="main-content" className="v8">
        <AreaV8 area={a} extra={extra} />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}

/* /brand: the Rawlins brand guide as 16:9 slides. Hidden: noindex, not in
   the sitemap, not linked from the site. Colors and fonts come from the
   site's own tokens (lib/content/v8.ts, app/layout.tsx). */
import "./brand.css";
import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Deck, type SlideMeta } from "@/components/brand/deck";
import {
  AccentSlide, Accents, ColorOpener, ContrastAccents, ContrastSystems, Cover, Decide, Mix, SystemSlide, Systems, Today, type SlideProps,
} from "@/components/brand/color-slides";
import {
  ConceptSlide, LogoDecide, LogoDirections, LogoOpener, LogoSmall, LogoToday, LogoType, LogoYours,
} from "@/components/brand/logo-slides";
import { CONCEPTS } from "@/components/brand/logos";
import { ACCENTS, PICK, SYSTEMS, accentById, mockVars, systemById } from "@/lib/content/brand-guide";
import { BRAND_FONT_VARS } from "./fonts";

export const metadata: Metadata = {
  title: { absolute: "Rawlins brand guide (draft)" },
  description: "Internal draft.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: null,
  twitter: null,
  alternates: null,
};

type Def = SlideMeta & { C: (p: SlideProps) => ReactNode };
const SLIDES: Def[] = [
  { id: "cover", title: "Cover", section: "Start", C: Cover },
  { id: "color", title: "Color", section: "Color", C: ColorOpener },
  { id: "color-today", title: "Today's palette", section: "Color", C: Today },
  { id: "color-systems", title: "Four blue systems", section: "Color", C: Systems },
  ...SYSTEMS.map((s) => ({ id: `system-${s.id.toLowerCase()}`, title: `System ${s.id}: ${s.name}`, section: "Color", C: (p: SlideProps) => <SystemSlide s={s} {...p} /> })),
  { id: "color-accents", title: "Five accent options", section: "Color", C: Accents },
  ...ACCENTS.map((a) => ({ id: `accent-${a.id}`, title: `Accent ${a.n}: ${a.name}`, section: "Color", C: (p: SlideProps) => <AccentSlide a={a} {...p} /> })),
  { id: "color-mix", title: "Mix and match", section: "Color", C: Mix },
  { id: "contrast-systems", title: "Contrast: blue systems", section: "Color", C: ContrastSystems },
  { id: "contrast-accents", title: "Contrast: accents", section: "Color", C: ContrastAccents },
  { id: "color-decide", title: "Pick one of each", section: "Color", C: Decide },
  { id: "logo", title: "Logo", section: "Logo", C: LogoOpener },
  { id: "logo-today", title: "Today's logo", section: "Logo", C: LogoToday },
  { id: "logo-yours", title: "Your concepts", section: "Logo", C: LogoYours },
  { id: "logo-directions", title: "Six directions", section: "Logo", C: LogoDirections },
  ...CONCEPTS.map((c) => ({ id: `logo-${c.id}`, title: `${c.n} ${c.name}`, section: "Logo", C: (p: SlideProps) => <ConceptSlide c={c} {...p} /> })),
  { id: "logo-type", title: "Wordmark typefaces", section: "Logo", C: LogoType },
  { id: "logo-small", title: "The 16-pixel test", section: "Logo", C: LogoSmall },
  { id: "logo-decide", title: "Pick a direction", section: "Logo", C: LogoDecide },
];

export default function BrandGuidePage() {
  const total = SLIDES.length;
  const vars = mockVars(systemById(PICK.system), accentById(PICK.accent)) as CSSProperties;
  return (
    <main className={`bd-root ${BRAND_FONT_VARS}`} style={vars}>
      <Deck slides={SLIDES.map(({ id, title, section }) => ({ id, title, section }))}>
        {SLIDES.map(({ id, C }, k) => <C key={id} n={k + 1} total={total} />)}
      </Deck>
    </main>
  );
}

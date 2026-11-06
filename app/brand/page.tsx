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
import {
  GLFrames, GLGrid, GLLines, LogoDonts, LogoSpace, LogoVersions, Opener, OverviewGlance, OverviewUse, PhotoTreat, PhotoWhat,
  TplOnePager, TplSlides, TypeApps, TypePair, TypeScale, VoiceClaims, VoiceTone, VoiceTraits, VoiceWords,
} from "@/components/brand/guide-slides";
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
  { id: "overview", title: "One kit for everything", section: "Overview", C: OverviewUse },
  { id: "overview-glance", title: "The brand at a glance", section: "Overview", C: OverviewGlance },
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
  { id: "logo-versions", title: "Logo versions", section: "Logo", C: LogoVersions },
  { id: "logo-space", title: "Clear space and size", section: "Logo", C: LogoSpace },
  { id: "logo-donts", title: "Logo don'ts", section: "Logo", C: LogoDonts },
  { id: "type", title: "Typography", section: "Typography", C: (p: SlideProps) => <Opener {...p} num="03" name="Typography" line="Two free families. The same everywhere." steps={[["The pair", "Source Sans 3 and Source Serif 4"], ["Sizes", "For slides, web and print"], ["Where it works", "Office, Canva, Adobe, print"]]} /> },
  { id: "type-pair", title: "The type pair", section: "Typography", C: TypePair },
  { id: "type-scale", title: "Hierarchy and sizes", section: "Typography", C: TypeScale },
  { id: "type-apps", title: "Fonts by app", section: "Typography", C: TypeApps },
  { id: "graphics", title: "Graphic language", section: "Graphic language", C: (p: SlideProps) => <Opener {...p} num="04" name="Graphic language" line="Lines, nodes, frames and a quiet grid." steps={[["Lines and nodes", "One line, real steps"], ["Photo frames", "Layers, not boxes"], ["Blueprint grid", "Behind, never on top"]]} /> },
  { id: "graphics-lines", title: "Lines and nodes", section: "Graphic language", C: GLLines },
  { id: "graphics-frames", title: "Layered photo frames", section: "Graphic language", C: GLFrames },
  { id: "graphics-grid", title: "Blueprint grid", section: "Graphic language", C: GLGrid },
  { id: "photo", title: "Photography", section: "Photography", C: (p: SlideProps) => <Opener {...p} num="05" name="Photography" line="Real work, real infrastructure, real places." steps={[["What we show", "People, scale, places"], ["Treatment", "One photo, four uses"], ["Avoid", "Staged, sci-fi, uncleared"]]} /> },
  { id: "photo-what", title: "What we show", section: "Photography", C: PhotoWhat },
  { id: "photo-treat", title: "Photo treatment", section: "Photography", C: PhotoTreat },
  { id: "voice", title: "Voice and tone", section: "Voice and tone", C: (p: SlideProps) => <Opener {...p} num="06" name="Voice and tone" line="From Jacob Michaels' Brand Voice and Tone Kit, v1.1." steps={[["Four qualities", "How we sound"], ["Tone settings", "How it shifts"], ["Words and claims", "What we say, and prove"]]} /> },
  { id: "voice-traits", title: "Four qualities", section: "Voice and tone", C: VoiceTraits },
  { id: "voice-tone", title: "Tone settings", section: "Voice and tone", C: VoiceTone },
  { id: "voice-words", title: "Words and mechanics", section: "Voice and tone", C: VoiceWords },
  { id: "voice-claims", title: "Claims", section: "Voice and tone", C: VoiceClaims },
  { id: "templates", title: "Templates", section: "Templates", C: (p: SlideProps) => <Opener {...p} num="07" name="Templates" line="Start from these, not from a blank page." steps={[["One-pager", "The solution brief"], ["Slides", "Four layouts"]]} /> },
  { id: "templates-one", title: "One-pager", section: "Templates", C: TplOnePager },
  { id: "templates-slides", title: "Slide layouts", section: "Templates", C: TplSlides },
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

/* Wordmark typeface options, loaded on /brand only (all SIL Open Font
   License). Source Sans 3 / Source Serif 4 come from the root layout.
   next/font needs literal options in each call. */
import { Figtree, IBM_Plex_Sans, Inter, Montserrat, Outfit } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"], display: "swap", preload: false, adjustFontFallback: false, variable: "--f-montserrat" });
const outfit = Outfit({ subsets: ["latin"], weight: ["600", "700"], display: "swap", preload: false, adjustFontFallback: false, variable: "--f-outfit" });
const figtree = Figtree({ subsets: ["latin"], weight: ["600", "700"], display: "swap", preload: false, adjustFontFallback: false, variable: "--f-figtree" });
const inter = Inter({ subsets: ["latin"], weight: ["600", "700"], display: "swap", preload: false, adjustFontFallback: false, variable: "--f-inter" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["600", "700"], display: "swap", preload: false, adjustFontFallback: false, variable: "--f-plex" });

export const BRAND_FONT_VARS = [montserrat, outfit, figtree, inter, plex].map((f) => f.variable).join(" ");

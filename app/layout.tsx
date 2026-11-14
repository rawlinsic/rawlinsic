import "./globals.css";
import "./journey.css";
import "./menu.css";
import "./pages.css";
import "./v8.css";
import "./v10.css";
import "./news2.css";

import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { AREAS, areaHref, isListed } from "@/lib/content/site";
import AnalyticsWrapper from '@/components/analytics-wrapper';
import CookieBanner from '@/components/cookie-banner';
import ClarityLoader from '@/components/clarity-loader';
import Smooth from "@/components/v8/smooth";
import PreviewEdit from "@/components/v8/preview-edit";
import NotOnPhones from "@/components/v8/not-on-phones";
import GlowOnDark from "@/components/v8/glow-on-dark";
import { REMOVED_SECTIONS } from "@/lib/content/removed-sections";
import { canDeleteSections, isBackupVersion, isJacobVersion, isReviewVersion, JACOB_DEAD_LINKS } from "@/lib/preview-gh";

/* Redesign type: one typeface, Source Sans 3, on every page (--font-sans in
   journey.css; the old --font-serif token points at it too). No fallback
   metrics borrowed from other fonts. */
const sourceSans = localFont({
  // the font file lives in the site (app/fonts, 29 KB, from Google Fonts, SIL Open
  // Font License), so builds never depend on downloading it from Google
  src: "./fonts/SourceSans3-latin.woff2",
  weight: "200 900",
  style: "normal",
  display: "swap",
  variable: "--font-source-sans",
  adjustFontFallback: false,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rawlinsic.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rawlins | Trusted Advisors at the Intersection of Strategy, Operations & Technology",
    template: "%s | Rawlins",
  },
  description:
    "Rawlins is a consulting firm pairing strategy, operations, and technology expertise with digital solutions for the organizations that build and run infrastructure.",
  openGraph: {
    title: "Rawlins | Trusted Advisors at the Intersection of Strategy, Operations & Technology",
    description:
      "We help organizations plan, deliver, and adopt better ways of working, from strategy through operations and technology. We find what's broken, fix it, and stay until it runs.",
    url: SITE_URL,
    siteName: "Rawlins",
    type: "website",
    images: [
      {
        url: "/images/pages/og-image-v2.png",
        width: 1200,
        height: 630,
        alt: "Rawlins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rawlins | Trusted Advisors at the Intersection of Strategy, Operations & Technology",
    description:
      "We help organizations plan, deliver, and adopt better ways of working, from strategy through operations and technology. We find what's broken, fix it, and stay until it runs.",
    images: ["/images/pages/og-image-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rawlins",
  legalName: "Rawlins Infra Consult, LLC",
  url: SITE_URL,
  logo: `${SITE_URL}/images/pages/rawlinslogo-square.png`,
  description:
    "Rawlins helps organizations plan, deliver, and adopt better ways of working, from strategy through operations and technology. Former agency executives and engineers, working next to a team that builds the tools.",
  email: "info@rawlinsic.com",
  telephone: "+1-775-843-3822",
  address: {
    "@type": "PostalAddress",
    streetAddress: "10639 Professional Cir",
    addressLocality: "Reno",
    addressRegion: "NV",
    postalCode: "89521",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com/company/107078508/",
    "https://www.facebook.com/rawlinsic",
    "https://maps.google.com/?cid=15053534270208893219",
  ],
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rawlins",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

/* LocalBusiness / ProfessionalService schema — richer Google Maps /
   local-pack representation linked to the Reno, NV Google Business
   Profile. */
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}#business`,
  name: "Rawlins",
  legalName: "Rawlins Infra Consult, LLC",
  url: SITE_URL,
  image: `${SITE_URL}/images/pages/og-image-v2.png`,
  logo: `${SITE_URL}/images/pages/rawlinslogo-square.png`,
  description:
    "Rawlins helps organizations plan, deliver, and adopt better ways of working, from strategy through operations and technology. Former agency executives and engineers, working next to a team that builds the tools.",
  email: "info@rawlinsic.com",
  telephone: "+1-775-843-3822",
  priceRange: "$$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "10639 Professional Cir",
    addressLocality: "Reno",
    addressRegion: "NV",
    postalCode: "89521",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.4271,
    longitude: -119.7535,
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  sameAs: [
    "https://www.linkedin.com/company/107078508/",
    "https://www.facebook.com/rawlinsic",
    "https://maps.google.com/?cid=15053534270208893219",
  ],
  knowsAbout: AREAS.flatMap((a) => [a.name, ...a.services.filter((s) => isListed(s.id)).map((s) => s.name)]),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: AREAS.map((area) => ({
      "@type": "OfferCatalog",
      name: area.name,
      url: `${SITE_URL}${areaHref(area)}`,
      description: area.tag,
      itemListElement: area.services.filter((svc) => isListed(svc.id)).map((svc) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: svc.name, url: `${SITE_URL}/services/${area.slug}/${svc.slug}` },
      })),
    })),
  },
};

/* a tiny script that hides this page's deleted sections (lib/content/removed-sections.ts) */
/* Jacob's version: links to the pages he shouldn't open look like plain text and do nothing (Nicole, Nov 10) */
function jacobLinks() {
  // links that open a bio pop-up right on the page (people cards) stay clickable (Nicole, Nov 10)
  const css = JACOB_DEAD_LINKS.map(([m, h]) => `a[href${m === "=" ? "" : "^"}="${h}"]:not([aria-haspopup]):not(.orb-t)`).join(",");
  return {
    css: `${css}{pointer-events:none!important;cursor:default!important;text-decoration:none!important}${css.split(",").map((x) => `${x}::after`).join(",")}{display:none!important}`,
    js: `(function(){var L=${JSON.stringify(JACOB_DEAD_LINKS)};function dead(h){if(!h)return false;h=h.split("#")[0].split("?")[0];return L.some(function(x){return x[0]==="="?h===x[1]:h.indexOf(x[1])===0})}document.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("a");if(a&&!a.hasAttribute("aria-haspopup")&&dead(a.getAttribute("href"))){e.preventDefault();e.stopPropagation()}},true);document.addEventListener("keydown",function(e){if(e.key!=="Enter")return;var a=document.activeElement;if(a&&a.tagName==="A"&&!a.hasAttribute("aria-haspopup")&&dead(a.getAttribute("href"))){e.preventDefault()}},true)})();`,
  };
}

function removedScript() {
  const byPage: Record<string, string[]> = {};
  for (const r of REMOVED_SECTIONS) (byPage[r.page] ||= []).push(r.sel);
  return `(function(){var m=${JSON.stringify(byPage).replace(/</g, "\\u003c")};var p=location.pathname.replace(/\\/$/,"")||"/";var s=m[p];if(!s)return;var e=document.createElement("style");e.textContent=s.map(function(x){return x+"{display:none!important}"}).join("");document.head.appendChild(e);})();`;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-env={process.env.VERCEL_ENV === "production" ? "production" : "dev"}>
      <body
        className={`${sourceSans.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {/* sections deleted on the preview are hidden before the page draws */}
        {REMOVED_SECTIONS.length > 0 && <script dangerouslySetInnerHTML={{ __html: removedScript() }} />}
        {isJacobVersion() && <><style dangerouslySetInnerHTML={{ __html: jacobLinks().css }} /><script dangerouslySetInnerHTML={{ __html: jacobLinks().js }} /></>}
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        {/* each page's <main> carries id="main-content", once per page */}
        <div>
        {children}
        </div>
        {/* JSON-LD is metadata, not JavaScript, so use plain script tags.
            Next.js <Script> with beforeInteractive was forcing these
            through its hydration pipeline and contributing to long
            main-thread tasks in PSI. Plain <script type="application/ld+json">
            is what Google recommends anyway. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        <Script id="keyboard-nav" strategy="afterInteractive">{`
          document.addEventListener('keydown',function(e){if(e.key==='Tab')document.body.classList.add('keyboard-nav')});
          document.addEventListener('mousedown',function(){document.body.classList.remove('keyboard-nav')});
        `}</Script>
        {/* Reveal the custom cursor only after a real mousemove so it
            never flashes stuck in the top-left on page load. Touch
            devices never fire mousemove, so the cursor stays hidden
            on phones and tablets. */}
        <Script id="custom-cursor-reveal" strategy="afterInteractive">{`
          (function(){
            function reveal(){document.body.classList.add('has-custom-cursor');document.removeEventListener('mousemove',reveal);}
            document.addEventListener('mousemove',reveal,{passive:true});
          })();
        `}</Script>
        <AnalyticsWrapper />
        {/* Microsoft Clarity (heat maps, session replays): loads only after "Accept" on the privacy banner, and never
            for internal traffic (Nov 11, 2026; before, it loaded on every visit) */}
        <ClarityLoader />
        <CookieBanner />
        {/* preview builds only: click-and-type text editor (never on the live site) */}
        <GlowOnDark />
        {process.env.VERCEL_ENV === "preview" && !isBackupVersion() && <NotOnPhones><PreviewEdit canDelete={canDeleteSections()} review={isReviewVersion()} built={process.env.VERCEL_GIT_COMMIT_SHA || ""} /></NotOnPhones>}
        <Smooth />
      </body>
    </html>
  );
}

import "./globals.css";
import "./journey.css";
import "./menu.css";
import "./pages.css";

import type { Metadata } from "next";
import Script from "next/script";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { AREAS, areaHref } from "@/lib/content/site";
import AnalyticsWrapper from '@/components/analytics-wrapper';
import CookieBanner from '@/components/cookie-banner';

/* Redesign type: one token each (--font-sans, --font-serif in journey.css),
   so the pair can change in one line. No fallback metrics borrowed from other fonts. */
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  adjustFontFallback: false,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  adjustFontFallback: false,
  fallback: ["Georgia", "serif"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rawlinsic.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rawlins | Consulting for the organizations that build and run infrastructure",
    template: "%s | Rawlins",
  },
  description:
    "Rawlins is a global consulting firm pairing strategy, operations, and technology expertise with digital solutions for transportation and infrastructure.",
  openGraph: {
    title: "Rawlins | Consulting for the organizations that build and run infrastructure",
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
    title: "Rawlins | Consulting for the organizations that build and run infrastructure",
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
  knowsAbout: AREAS.flatMap((a) => [a.name, ...a.services.map((s) => s.name)]),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: AREAS.map((area) => ({
      "@type": "OfferCatalog",
      name: area.name,
      url: `${SITE_URL}${areaHref(area)}`,
      description: area.tag,
      itemListElement: area.services.map((svc) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: svc.name, url: `${SITE_URL}/services/${area.slug}/${svc.slug}` },
      })),
    })),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-env={process.env.VERCEL_ENV === "production" ? "production" : "dev"}>
      <body
        className={`${sourceSans.variable} ${sourceSerif.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <div id="main-content">
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
        {/* Microsoft Clarity — heat maps & session recordings
             Skip loading for internal traffic (rawlins_internal cookie). */}
        <Script id="microsoft-clarity" strategy="afterInteractive">{`
          if(document.cookie.indexOf("rawlins_internal=")<0){
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","wcupxc9qmn");
          }
        `}</Script>
        <CookieBanner />
      </body>
    </html>
  );
}

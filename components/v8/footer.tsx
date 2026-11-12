/* Footer (Nicole, Nov 10: "the whole footer needs to be better"). Darker than the navy sections above it, so
   it never runs into them. The company line runs all the way across on one line (wide screens), the logo is
   bigger, then contact and the site's sections, then the legal line and a way back to the top. Contact
   details as on the live site. */
import type { CSSProperties } from "react";
import { PrivacyChoicesLink } from "@/components/cookie-banner";
import { AREAS, INDUSTRIES, VISIBLE_INDUSTRIES, areaHref, industryHref } from "@/lib/content/site";
import { THEME } from "@/lib/content/v8";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";

/* Rawlins' Google Business Profile (the link Nicole gave, Nov 12, without its tracking tail) */
const GOOGLE_PROFILE = "https://www.google.com/maps/place/Rawlins/@39.4270944,-119.7560918,17z/data=!3m1!4b1!4m6!3m5!1s0xc834b8bdb96e445:0xd0e8e5a965f86123!8m2!3d39.4270944!4d-119.7535169!16s%2Fg%2F11w3b8bxf3";
const THOUGHT = THOUGHT_LEADERSHIP.length === 1 ? `/insights/thought-leadership/${THOUGHT_LEADERSHIP[0].slug}` : "/insights/thought-leadership";

/* International Markets (Nicole, Nov 12: "add international markets to the footer as a link"). The page is still
   hidden from the live site until it is approved, the same as its menu link, so this shows on previews and
   turns on for the live site with the page. */
const INTL = process.env.VERCEL_ENV === "production" ? undefined : INDUSTRIES.find((i) => i.id === "intl");

export default function Footer() {
  return (
    <footer className="fx fx2">
      <div className="fx2-line">
        <p className="fx2-big">We find what&apos;s broken, fix it, and <span>stay until it runs.</span></p>
      </div>
      <div className="v8-wrap fx2-grid">
        <div className="fx2-brand">
          <a href="/" aria-label="Rawlins home" className="fx2-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/pages/rawlinslogo-blue-wordmark.png" alt="Rawlins" width={240} height={58} />
          </a>
          <p className="fx2-tag"></p>
          <ul className="fx2-contact">
            <li><a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a></li>
            <li><a href="tel:+17758433822">(775) 843-3822</a></li>
            <li>10639 Professional Cir, Reno, NV 89521</li>
          </ul>
          <div className="fx2-actions">
            <a className="fx2-cta" href="/contact">Get In Touch</a>
            <a className="fx2-in" href="https://www.linkedin.com/company/107078508/" target="_blank" rel="noopener noreferrer" aria-label="Rawlins on LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.4V21h-4v-5.8c0-1.38-.03-3.16-1.93-3.16-1.93 0-2.22 1.5-2.22 3.06V21H9z" /></svg>
            </a>
            <a className="fx2-in" href={GOOGLE_PROFILE} target="_blank" rel="noopener noreferrer" aria-label="Rawlins on Google">
              <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>
            </a>
          </div>
        </div>
        <nav aria-label="What we do"><h2>What We Do</h2><ul>{AREAS.map((a) => <li key={a.id}><a href={areaHref(a)} style={{ ["--a" as string]: THEME[a.id].color } as CSSProperties}><i aria-hidden="true" />{a.name}</a></li>)}</ul></nav>
        <nav aria-label="Who we work with"><h2>WhoWeWorkWith</h2><ul>{VISIBLE_INDUSTRIES.map((i) => <li key={i.id}><a href={industryHref(i)}>{i.name}</a></li>)}{INTL && <li><a href={industryHref(INTL)}>{INTL.name}</a></li>}</ul></nav>
        <nav aria-label="Our work and insights"><h2>Our Work</h2><ul><li><a href="/insights/case-studies">All Projects</a></li>{/* Where We Work sits under About (Nicole, Nov 12) */}</ul>
          <h2>Insights</h2><ul><li><a href="/insights/news">News &amp; Recognition</a></li><li><a href="/insights/research">Research &amp; Publications</a></li><li><a href="/insights/podcast">Podcast</a></li><li><a href={THOUGHT}>Thought Leadership</a></li></ul></nav>
        <nav aria-label="About"><h2>About</h2><ul><li><a href="/about/who-we-are">Who We Are</a></li><li><a href="/about/how-we-work">How We Work</a></li><li><a href="/about/our-people">Our People</a></li><li><a href="/about/where-we-work">Where We Work</a></li><li><a href="/careers">Careers</a></li></ul></nav>
      </div>
      <div className="v8-wrap fx2-legal">
        <span>© 2026 Rawlins</span><a href="/privacy-policy">Privacy</a><PrivacyChoicesLink /><a href="/terms-of-service">Terms</a><a href="/accessibility">Accessibility</a>{/* the Site map link is removed (Nicole, Nov 12) */}
        <a className="fx2-top" href="#main-content">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}

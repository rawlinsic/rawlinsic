/* Footer (Nicole, Nov 10: "the whole footer needs to be better"). Darker than the navy sections above it, so
   it never runs into them. The company line runs all the way across on one line (wide screens), the logo is
   bigger, then contact and the site's sections, then the legal line and a way back to the top. Contact
   details as on the live site. */
import type { CSSProperties } from "react";
import { PrivacyChoicesLink } from "@/components/cookie-banner";
import { AREAS, VISIBLE_INDUSTRIES, areaHref, industryHref } from "@/lib/content/site";
import { THEME } from "@/lib/content/v8";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";

const THOUGHT = THOUGHT_LEADERSHIP.length === 1 ? `/insights/thought-leadership/${THOUGHT_LEADERSHIP[0].slug}` : "/insights/thought-leadership";

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
          </div>
        </div>
        <nav aria-label="What we do"><h2>What We Do</h2><ul>{AREAS.map((a) => <li key={a.id}><a href={areaHref(a)} style={{ ["--a" as string]: THEME[a.id].color } as CSSProperties}><i aria-hidden="true" />{a.name}</a></li>)}</ul></nav>
        <nav aria-label="Who we work with"><h2>Who We Work With</h2><ul>{VISIBLE_INDUSTRIES.map((i) => <li key={i.id}><a href={industryHref(i)}>{i.name}</a></li>)}</ul></nav>
        <nav aria-label="Our work and insights"><h2>Our Work</h2><ul><li><a href="/insights/case-studies">All Projects</a></li>{/* the "Where We Work" link (to /about/where-we-work) had its label emptied by Nicole in the preview, Nov 12; an empty link is not shown */}</ul>
          <h2>Insights</h2><ul><li><a href="/insights/news">News &amp; Recognition</a></li><li><a href="/insights/research">Research &amp; Publications</a></li><li><a href="/insights/podcast">Podcast</a></li><li><a href={THOUGHT}>Thought Leadership</a></li></ul></nav>
        <nav aria-label="About"><h2>About</h2><ul><li><a href="/about/who-we-are">Who We Are</a></li><li><a href="/about/how-we-work">How We Work</a></li><li><a href="/about/our-people">Our People</a></li><li><a href="/careers">Careers</a></li></ul></nav>
      </div>
      <div className="v8-wrap fx2-legal">
        <span>© 2026 Rawlins</span><a href="/privacy-policy">Privacy</a><PrivacyChoicesLink /><a href="/terms-of-service">Terms</a><a href="/accessibility">Accessibility</a><a href="/site-map"></a>
        <a className="fx2-top" href="#main-content">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}

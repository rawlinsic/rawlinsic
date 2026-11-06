/* Footer: light, with the company line big. Contact details as on the live site. */
import type { CSSProperties } from "react";
import { AREAS, VISIBLE_INDUSTRIES, areaHref, industryHref } from "@/lib/content/site";
import { THEME } from "@/lib/content/v8";

export default function Footer() {
  return (
    <footer className="fx">
      <div className="v8-wrap">
        <p className="fx-big">We find what&apos;s broken, fix it, and stay until it runs.</p>
        <div className="fx-cols">
          <div className="fx-contact">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/pages/rawlinslogo-blue-wordmark.png" alt="Rawlins" width={132} height={32} />
            <p><a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a><br /><a href="tel:+17758433822">(775) 843-3822</a><br />10639 Professional Cir, Reno, NV 89521</p>
            <a className="v8-btn" href="/contact">Get in touch</a>
          </div>
          <nav aria-label="What we do"><h2>What we do</h2><ul>{AREAS.map((a) => <li key={a.id}><a href={areaHref(a)} style={{ ["--a" as string]: THEME[a.id].color } as CSSProperties}><i aria-hidden="true" />{a.name}</a></li>)}</ul></nav>
          <nav aria-label="Who we work with"><h2>Who we work with</h2><ul>{VISIBLE_INDUSTRIES.map((i) => <li key={i.id}><a href={industryHref(i)}>{i.name}</a></li>)}</ul></nav>
          <nav aria-label="Our work and insights"><h2>Our work</h2><ul><li><a href="/insights/case-studies">All projects</a></li><li><a href="/about/where-we-work">Where we work</a></li></ul>
            <h2>Insights</h2><ul><li><a href="/insights/thought-leadership">Thought leadership</a></li><li><a href="/insights/podcast">Podcast</a></li><li><a href="/insights/news">News &amp; recognition</a></li><li><a href="/insights/research">Research &amp; publications</a></li></ul></nav>
          <nav aria-label="About"><h2>About</h2><ul><li><a href="/about/who-we-are">Who we are</a></li><li><a href="/about/how-we-work">How we work</a></li><li><a href="/about/our-people">Our people</a></li><li><a href="/careers">Careers</a></li><li><a href="https://www.linkedin.com/company/107078508/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li></ul></nav>
        </div>
        <div className="fx-legal"><span>© 2026 Rawlins</span><a href="/privacy-policy">Privacy</a><a href="/terms-of-service">Terms</a><a href="/accessibility">Accessibility</a><a href="/site-map">Site map</a></div>
      </div>
    </footer>
  );
}

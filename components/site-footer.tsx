/* Footer: the full site map, contact, and legal links. Brand name is just
   "Rawlins"; the legal entity appears only on Terms and Privacy. */
import { AREAS, VISIBLE_INDUSTRIES, areaHref, industryHref } from "@/lib/content/site";

export default function SiteFooter() {
  return (
    <footer className="ft">
      <div className="ft-in">
        <div className="ft-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/pages/rawlinslogo-blue-wordmark.png" alt="Rawlins" width={150} height={36} loading="lazy" />
          <p>We find what&apos;s broken, fix it, and stay until it runs.</p>
          <p className="ft-contact">
            <a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a>
            <a href="tel:+17758433822">(775) 843-3822</a>
            <span>10639 Professional Cir, Reno, NV 89521</span>
          </p>
          <a href="/contact" className="ft-cta">Get in touch</a>
        </div>
        <nav className="ft-map" aria-label="Site map">
          <div>
            <h2>What we do</h2>
            <ul>
              {AREAS.map((a) => <li key={a.id}><a href={areaHref(a)}>{a.name}</a></li>)}
              <li><a href="/services">All services</a></li>
            </ul>
          </div>
          <div>
            <h2>Who we work with</h2>
            <ul>
              {VISIBLE_INDUSTRIES.map((i) => <li key={i.id}><a href={industryHref(i)}>{i.name}</a></li>)}
            </ul>
          </div>
          <div>
            <h2>Our work</h2>
            <ul>
              <li><a href="/insights/case-studies">Case studies</a></li>
              <li><a href="/insights/case-studies?status=ongoing">In the works</a></li>
              <li><a href="/about/where-we-work">Where we work</a></li>
            </ul>
            <h2>Insights</h2>
            <ul>
              <li><a href="/insights/news">News &amp; Recognition</a></li>
              <li><a href="/insights/thought-leadership">Thought Leadership</a></li>
              <li><a href="/insights/research">Research &amp; Publications</a></li>
              <li><a href="/insights/podcast">Podcast</a></li>
            </ul>
          </div>
          <div>
            <h2>About</h2>
            <ul>
              <li><a href="/about/who-we-are">Who we are</a></li>
              <li><a href="/about/how-we-work">How we work</a></li>
              <li><a href="/about/our-people">Our people</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/site-map">Site map</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="ft-base">
        <span>© 2026 Rawlins</span>
        <a href="/privacy-policy">Privacy</a>
        <a href="/terms-of-service">Terms</a>
        <a href="/accessibility">Accessibility</a>
        <a href="https://www.linkedin.com/company/107078508/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
}

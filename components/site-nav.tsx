"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, type ReactNode } from "react";
import SiteSearch from "@/components/site-search";
import { LINES, CROSS, INDUSTRIES, lineHref, crossHref, industryHref } from "@/lib/redesign-data";

const LOGO_URL =
  "/images/pages/rawlinslogo-white-wordmark.png";

interface SiteNavProps {
  /** href for the "Get In Touch" CTA button. Defaults to /contact */
  ctaHref?: string;
  /** Hide the top-left wordmark until the user scrolls. Used on
   *  the home page where the big logo lives inside the hero. */
  homeMode?: boolean;
}

export default function SiteNav({ ctaHref = "/contact", homeMode = false }: SiteNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) navRef.current.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Global keyboard shortcut: Cmd/Ctrl + K opens search */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "/" && !searchOpen) {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA" && !(target as HTMLElement)?.isContentEditable) {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<Set<string>>(new Set());
  const close = () => { setMobileMenuOpen(false); setMobileSubOpen(new Set()); };
  const toggleSub = (key: string) => setMobileSubOpen(prev => {
    const next = new Set(prev);
    if (next.has(key)) next.delete(key); else { next.clear(); next.add(key); }
    return next;
  });

  const chevron = (open: boolean) => (
    <svg className={`mobile-menu-chevron${open ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
  );
  const navChevron = (
    <svg className="nav-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1l3 3 3-3"/></svg>
  );
  const mobileGroup = (key: string, label: string, body: ReactNode) => (
    <div className="mobile-menu-group">
      <button className="mobile-menu-parent" onClick={() => toggleSub(key)} aria-expanded={mobileSubOpen.has(key)}>
        {label}
        {chevron(mobileSubOpen.has(key))}
      </button>
      <div className={`mobile-menu-sub${mobileSubOpen.has(key) ? " open" : ""}`}>{body}</div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileMenuOpen ? " active" : ""}`}>
        <button className="mobile-menu-close" onClick={close} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        <div className="mobile-menu-items">
          <button
            type="button"
            className="mobile-menu-search-trigger"
            onClick={() => { close(); setSearchOpen(true); }}
            aria-label="Open search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <span>Search the site</span>
          </button>
          <a href="/" onClick={close} className="mobile-menu-link">Home</a>

          {mobileGroup("services", "Services", (
            <>
              <a href="/services" onClick={close}>All Services</a>
              {LINES.map((l) => (
                <div key={l.id}>
                  <a href={lineHref(l)} onClick={close} className="mm-line">{l.menuName}</a>
                  {l.services.map((s) => (
                    <a key={s.id} href={`/services/${l.slug}/${s.slug}`} onClick={close} className="mm-svc">{s.name}</a>
                  ))}
                </div>
              ))}
              <span className="mm-line" style={{ padding: "10px 0 0" }}>Across Every Line</span>
              {CROSS.map((c) => (
                <a key={c.id} href={crossHref(c)} onClick={close} className="mm-svc">{c.name}</a>
              ))}
            </>
          ))}

          {mobileGroup("industries", "Industries", (
            <>
              <a href="/industries" onClick={close}>All Industries</a>
              {INDUSTRIES.map((i) => (
                <a key={i.id} href={industryHref(i)} onClick={close}>{i.name}</a>
              ))}
            </>
          ))}

          {mobileGroup("insights", "Insights", (
            <>
              <a href="/insights" onClick={close}>View All</a>
              <a href="/insights/case-studies" onClick={close}>Case Studies</a>
              <a href="/insights/thought-leadership" onClick={close}>Thought Leadership</a>
              <a href="/insights/podcast" onClick={close}>Podcast</a>
              <a href="/insights/news" onClick={close}>News &amp; Events</a>
            </>
          ))}

          {mobileGroup("about", "About", (
            <>
              <a href="/about" onClick={close}>About Rawlins</a>
              <a href="/about/who-we-are" onClick={close}>Who We Are</a>
              <a href="/about/how-we-work" onClick={close}>How We Work</a>
              <a href="/about/our-people" onClick={close}>Our People</a>
              <a href="/about/areas-we-serve" onClick={close}>Areas We Serve</a>
            </>
          ))}

          <a href="/careers" onClick={close} className="mobile-menu-link">Careers</a>
        </div>

        <Link href={ctaHref} onClick={close} className="mobile-menu-cta">Get In Touch</Link>

        {/* Social icons — same as footer */}
        <div className="mobile-menu-social">
          <a href="https://www.linkedin.com/company/107078508/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
            <span style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", fontSize: "20px", fontWeight: 700, color: "#060c16", lineHeight: 1, letterSpacing: "-0.5px" }}>in</span>
          </a>
          <a href="https://g.page/r/CSNh-GWp5ejQEAI/review" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Google">
            <span style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", fontSize: "22px", fontWeight: 700, color: "#060c16", lineHeight: 1 }}>G</span>
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`nav${homeMode ? " home-mode" : ""}`} id="mainNav" ref={navRef}>
        <a href="/" className="nav-logo" aria-label="Rawlins home">
          <Image src={LOGO_URL} alt="Rawlins" width={415} height={100} className="nav-logo-img" priority fetchPriority="high" />
        </a>

        <div className="nav-center">
          {/* Services: mega menu. Depth: Services > service line > service.
              Activities live on the service page, not in the menu. */}
          <div className="nav-item has-sub mega-item">
            <a href="/services" className="nav-item-label">Services {navChevron}</a>
            <div className="mega-panel">
              <div className="mega-inner">
                <div className="mega-cols">
                  {LINES.map((l) => (
                    <div className="mega-col" key={l.id}>
                      <h4><a href={lineHref(l)}>{l.menuName}</a></h4>
                      <ul>
                        {l.services.map((s) => (
                          <li key={s.id}><a href={`/services/${l.slug}/${s.slug}`}>{s.name}</a></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mega-foot">
                  <b>Across every line</b>
                  {CROSS.map((c) => (
                    <a key={c.id} href={crossHref(c)}>{c.name}</a>
                  ))}
                  <a href="/services" style={{ marginLeft: "auto" }}>View all services →</a>
                </div>
              </div>
            </div>
          </div>

          <div className="nav-item has-sub mega-item">
            <a href="/industries" className="nav-item-label">Industries {navChevron}</a>
            <div className="mega-panel">
              <div className="mega-inner">
                <div className="mega-cols mega-cols-2">
                  <div className="mega-col">
                    <h4><a href="/industries">Industries</a></h4>
                    <ul>
                      {INDUSTRIES.map((i) => (
                        <li key={i.id}><a href={industryHref(i)}>{i.name}</a></li>
                      ))}
                    </ul>
                  </div>
                  <div className="mega-col">
                    <h4>Who we serve</h4>
                    <p className="mega-desc">We built our practice inside state transportation agencies. The same work fits any organization that owns and runs public infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nav-item has-sub">
            <a href="/insights" className="nav-item-label">Insights {navChevron}</a>
            <div className="nav-dropdown">
              <a href="/insights/case-studies">Case Studies</a>
              <a href="/insights/thought-leadership">Thought Leadership</a>
              <a href="/insights/podcast">Podcast</a>
              <a href="/insights/news">News &amp; Events</a>
            </div>
          </div>

          <div className="nav-item has-sub">
            <a href="/about" className="nav-item-label">About {navChevron}</a>
            <div className="nav-dropdown">
              <a href="/about/who-we-are">Who We Are</a>
              <a href="/about/how-we-work">How We Work</a>
              <a href="/about/our-people">Our People</a>
              <a href="/about/areas-we-serve">Areas We Serve</a>
            </div>
          </div>

          <a href="/careers" className="nav-item nav-item-plain">Careers</a>
        </div>

        <div className="nav-right">
          <button
            type="button"
            className="nav-search-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>
          <Link href={ctaHref} className="nav-cta">Get In Touch</Link>
        </div>

        <div
          className="menu-toggle"
          onClick={() => setMobileMenuOpen((v) => !v)}
          role="button"
          aria-label="Open menu"
          tabIndex={0}
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

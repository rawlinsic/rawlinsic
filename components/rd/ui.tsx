/* Shared building blocks for the redesign pages (branch `redesign`).
   Server components only; styles live in app/redesign.css (rd- prefix). */
import Link from "next/link";
import type { ReactNode } from "react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export function RdShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="rd-page" id="main-content">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export type Crumb = [href: string, label: string];

export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="rd-crumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map(([href, label], i) => (
        <span key={href}>
          <span className="rd-crumb-sep" aria-hidden="true">›</span>
          {i === items.length - 1 ? <span aria-current="page">{label}</span> : <Link href={href}>{label}</Link>}
        </span>
      ))}
    </nav>
  );
}

export function Hero({
  label,
  title,
  children,
  image,
  crumbs,
  actions,
}: {
  label?: string;
  title: ReactNode;
  children?: ReactNode;
  image?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
}) {
  return (
    <header className={`rd-hero${image ? " rd-hero-img" : ""}`}>
      {image && <div className="rd-hero-bg" style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />}
      <div className="rd-wrap rd-hero-inner">
        {crumbs && <Crumbs items={crumbs} />}
        {label && <p className="rd-label">{label}</p>}
        <h1 className="rd-h1">{title}</h1>
        {children && <div className="rd-hero-text">{children}</div>}
        {actions && <div className="rd-btns">{actions}</div>}
      </div>
    </header>
  );
}

export function Section({ label, title, children, id }: { label?: string; title?: string; children: ReactNode; id?: string }) {
  return (
    <section className="rd-section" id={id}>
      <div className="rd-wrap">
        {(label || title) && (
          <div className="rd-sec-head">
            {label && <p className="rd-label">{label}</p>}
            {title && <h2 className="rd-h2">{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Btn({ href, children, ghost }: { href: string; children: ReactNode; ghost?: boolean }) {
  return (
    <Link href={href} className={ghost ? "rd-btn rd-btn-ghost" : "rd-btn"}>
      {children}
    </Link>
  );
}

export function Card({
  href,
  title,
  text,
  meta,
  image,
}: {
  href?: string;
  title: string;
  text?: string;
  meta?: string;
  image?: string;
}) {
  const inner = (
    <>
      {image && <div className="rd-card-img" style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />}
      <div className="rd-card-body">
        {meta && <span className="rd-card-meta">{meta}</span>}
        <h3 className="rd-card-title">{title}</h3>
        {text && <p className="rd-card-text">{text}</p>}
        {href && <span className="rd-card-arrow" aria-hidden="true">→</span>}
      </div>
    </>
  );
  return href ? (
    <Link href={href} className="rd-card rd-card-link">
      {inner}
    </Link>
  ) : (
    <div className="rd-card">{inner}</div>
  );
}

export function Grid({ children, cols }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  return <div className={`rd-grid rd-grid-${cols || 3}`}>{children}</div>;
}

export function Chips({ items }: { items: { href: string; label: string }[] }) {
  return (
    <div className="rd-chips">
      {items.map((c) => (
        <Link key={c.href + c.label} href={c.href} className="rd-chip">
          {c.label}
        </Link>
      ))}
    </div>
  );
}

export function Steps({ steps }: { steps: (string | [string, string])[] }) {
  return (
    <ol className="rd-steps">
      {steps.map((s, i) => {
        const [t, d] = Array.isArray(s) ? s : [s, ""];
        return (
          <li key={t}>
            <span className="rd-step-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="rd-step-t">{t}</span>
            {d && <span className="rd-step-d">{d}</span>}
          </li>
        );
      })}
    </ol>
  );
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className="rd-list">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

export function Quote({ children }: { children: ReactNode }) {
  return <blockquote className="rd-quote">{children}</blockquote>;
}

/** Clearly marked placeholder for content not supplied yet. */
export function Placeholder({ children, note }: { children?: ReactNode; note?: string }) {
  return (
    <div className="rd-ph" role="note">
      <span className="rd-ph-tag">Placeholder</span>
      <p>{children || "Content to come. This text holds the space so the page structure is complete."}</p>
      {note && <p className="rd-ph-note">{note}</p>}
    </div>
  );
}

export function Cta({ title = "Talk to us about this work" }: { title?: string }) {
  return (
    <section className="rd-cta">
      <div className="rd-wrap">
        <div className="rd-gold-line" />
        <h2 className="rd-h2">{title}</h2>
        <div className="rd-btns">
          <Btn href="/contact">Get In Touch</Btn>
          <Btn href="/insights/case-studies" ghost>
            See Case Studies
          </Btn>
        </div>
      </div>
    </section>
  );
}

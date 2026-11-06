/* Sample layouts for the brand guide: website hero, slide, one-pager,
   business card, social post and the glowing line diagram. Each is drawn at
   its real size and scaled down, and takes its colors from CSS variables
   (mockVars in lib/content/brand-guide.ts), so any blue system and accent
   can be dropped in. Copy is the site's own (lib/content/site.ts). */
import type { CSSProperties, ReactNode } from "react";
import { AREAS, HOME } from "@/lib/content/site";

const LOGO = "/images/pages/rawlinslogo-blue-wordmark.png";
const PHOTO = {
  hero: "/images/pages/home-hero-poster.webp",
  slide: "/images/pages/majortrans.webp",
  one: "/images/pages/engineersoperatingdrones.webp",
  social: "/images/pages/aam-highway-aerial.webp",
};

/* draw at iw×ih, show at width w */
export function Fit({ w, iw, ih, children, label }: { w: number; iw: number; ih: number; children: ReactNode; label?: string }) {
  const s = w / iw;
  return (
    <figure className="fit" style={{ width: w }}>
      <div className="fit-box" style={{ width: w, height: Math.round(ih * s) }}>
        <div className="fit-in" style={{ width: iw, height: ih, transform: `scale(${s})` }}>{children}</div>
      </div>
      {label && <figcaption>{label}</figcaption>}
    </figure>
  );
}

export function Logo({ dark, h, style }: { dark?: boolean; h: number; style?: CSSProperties }) {
  /* the current wordmark (logo options come in the Logo section) */
  return <img className={dark ? "mk-logo is-dark" : "mk-logo"} src={LOGO} alt="Rawlins" style={{ height: h, width: "auto", ...style }} />;
}

/* glowing route: one line through the frame with nodes on it */
export function Route({ w, h, nodes = 5, faint = true, className = "" }: { w: number; h: number; nodes?: number; faint?: boolean; className?: string }) {
  const y = (t: number) => h * (0.78 - 0.5 * t + 0.12 * Math.sin(t * Math.PI * 2.2));
  const pts = Array.from({ length: 41 }, (_, k) => [w * (k / 40), y(k / 40)] as const);
  const d = pts.map(([x, yy], k) => `${k ? "L" : "M"}${x.toFixed(1)} ${yy.toFixed(1)}`).join(" ");
  const ns = Array.from({ length: nodes }, (_, k) => {
    const t = (k + 0.7) / (nodes + 0.4);
    return [w * t, y(t)] as const;
  });
  return (
    <svg className={`mk-route ${className}`} viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
      {faint && (
        <g className="mk-faint">
          <path d={pts.map(([x, yy], k) => `${k ? "L" : "M"}${x.toFixed(1)} ${(yy + h * 0.09).toFixed(1)}`).join(" ")} />
          <path d={pts.map(([x, yy], k) => `${k ? "L" : "M"}${x.toFixed(1)} ${(yy - h * 0.12).toFixed(1)}`).join(" ")} />
          {ns.map(([x, yy], k) => <line key={k} x1={x} y1={yy} x2={x} y2={h} />)}
        </g>
      )}
      <path className="mk-line" d={d} />
      {ns.map(([x, yy], k) => (
        <g key={k} className="mk-node" transform={`translate(${x.toFixed(1)} ${yy.toFixed(1)})`}>
          <circle className="mk-halo" r={Math.max(10, h * 0.03)} />
          <circle className="mk-dot" r={Math.max(4, h * 0.011)} />
        </g>
      ))}
    </svg>
  );
}

/* ── website hero, 1440×900 ─────────────────────────────────────── */
export function MockHero() {
  return (
    <div className="mk mk-hero">
      <div className="mk-browser"><i /><i /><i /><span>rawlinsic.com</span></div>
      <header className="mk-nav">
        <Logo h={34} />
        <ul><li>What we do</li><li>Industries</li><li>Our work</li><li>About</li><li>Insights</li></ul>
        <span className="mk-btn mk-btn-p">Get in touch</span>
      </header>
      <section className="mk-hero-stage">
        <img src={PHOTO.hero} alt="" />
        <div className="mk-grid" />
        <Route w={1440} h={784} nodes={5} />
        <div className="mk-hero-copy">
          <p className="mk-eyebrow">{HOME.eyebrow}</p>
          <h1>{HOME.headline}</h1>
          <p className="mk-hero-line">{HOME.line}</p>
          <div className="mk-btns"><span className="mk-btn mk-btn-glow">See what we do</span><span className="mk-btn mk-btn-w">Get in touch</span></div>
        </div>
        <ol className="mk-areas">{AREAS.map((a, k) => <li key={a.id}><b>{String(k + 1).padStart(2, "0")}</b>{a.name}</li>)}</ol>
      </section>
    </div>
  );
}

/* ── slide, 1920×1080 ──────────────────────────────────────────── */
export function MockSlide() {
  const area = AREAS[1];
  return (
    <div className="mk mk-slide">
      <div className="mk-slide-copy">
        <p className="mk-kick">02 · {area.name}</p>
        <h2>{area.tag}</h2>
        <ol>
          {area.services.slice(0, 4).map((s, k) => <li key={s.id}><b>{String(k + 1).padStart(2, "0")}</b>{s.name}</li>)}
        </ol>
      </div>
      <div className="mk-slide-photo">
        <span className="mk-frame-back" />
        <img src={PHOTO.slide} alt="" />
        <span className="mk-frame-glow" />
      </div>
      <footer><Logo h={40} /><span className="mk-rule"><i /></span><b>04</b></footer>
    </div>
  );
}

/* ── one-pager, US letter 850×1100 ─────────────────────────────── */
export function MockOnePager() {
  const area = AREAS[4];
  return (
    <div className="mk mk-one">
      <header className="mk-one-top">
        <div className="mk-grid" />
        <Route w={850} h={330} nodes={4} faint={false} />
        <Logo dark h={38} />
        <p className="mk-eyebrow">Solution brief</p>
        <h2>{area.name}</h2>
        <p className="mk-one-tag">{area.tag}</p>
      </header>
      <div className="mk-one-body">
        <div>
          <p className="mk-kick">What we do</p>
          <ul className="mk-one-list">{area.services.map((s) => <li key={s.id}>{s.name}</li>)}</ul>
          <p className="mk-kick">How we work</p>
          <p className="mk-one-p">{HOME.line}</p>
        </div>
        <aside>
          <img src={PHOTO.one} alt="" />
          <p className="mk-one-quote">Former agency executives and engineers, working next to a team that builds the tools.</p>
        </aside>
      </div>
      <footer className="mk-one-foot"><span>rawlinsic.com</span><span>info@rawlinsic.com</span><span>775-843-3822</span></footer>
    </div>
  );
}

/* ── business card, 3.5×2 in at 300 ppi = 1050×600 ────────────── */
export function MockCard({ side }: { side: "front" | "back" }) {
  if (side === "front") {
    return (
      <div className="mk mk-card mk-card-f">
        <div className="mk-grid" />
        <Route w={1050} h={600} nodes={3} faint={false} />
        <Logo dark h={92} />
      </div>
    );
  }
  return (
    <div className="mk mk-card mk-card-b">
      <div>
        <p className="mk-card-name">First Last</p>
        <p className="mk-card-role">Title</p>
      </div>
      <ul><li>name@rawlinsic.com</li><li>775-843-3822</li><li>rawlinsic.com</li></ul>
      <Logo h={50} />
      <span className="mk-card-bar" />
    </div>
  );
}

/* ── social post, 1080×1080 ────────────────────────────────────── */
export function MockSocial() {
  return (
    <div className="mk mk-social">
      <img src={PHOTO.social} alt="" />
      <div className="mk-grid" />
      <Route w={1080} h={1080} nodes={4} faint={false} />
      <div className="mk-social-copy">
        <p className="mk-eyebrow">AASHTO Annual Meeting</p>
        <h2>Louisville<br />Nov 15–18</h2>
        <p>What are you trying to fix?</p>
      </div>
      <Logo dark h={64} style={{ position: "absolute", left: 80, bottom: 76 }} />
    </div>
  );
}

/* ── glowing line-and-node diagram, 1280×720 ──────────────────── */
const NODES: [number, number][] = [[170, 520], [430, 300], [690, 470], [950, 250], [1130, 430]];
export function MockDiagram() {
  const d = NODES.reduce((acc, [x, y], k) => {
    if (!k) return `M40 600 Q 100 520 ${x} ${y}`;
    const [px, py] = NODES[k - 1];
    return `${acc} C ${px + 120} ${py} ${x - 120} ${y} ${x} ${y}`;
  }, "") + " Q 1220 400 1250 330";
  return (
    <div className="mk mk-diagram">
      <div className="mk-grid" />
      <svg viewBox="0 0 1280 720" width={1280} height={720} aria-hidden="true">
        <g className="mk-faint">
          <path d="M40 660 H1240" />
          {NODES.map(([x, y], k) => <line key={k} x1={x} y1={y} x2={x} y2={660} />)}
          <path d={`M${NODES[0][0]} ${NODES[0][1]} L${NODES[2][0]} ${NODES[2][1]} L${NODES[4][0]} ${NODES[4][1]}`} />
          <path d={`M${NODES[1][0]} ${NODES[1][1]} L${NODES[3][0]} ${NODES[3][1]}`} />
        </g>
        <path className="mk-line" d={d} />
        {NODES.map(([x, y], k) => (
          <g key={k} className="mk-node" transform={`translate(${x} ${y})`}>
            <circle className="mk-halo" r="30" />
            <circle className="mk-ring" r="15" />
            <circle className="mk-dot" r="6" />
          </g>
        ))}
      </svg>
      {AREAS.map((a, k) => (
        <p key={a.id} className="mk-dg-label" style={{ left: NODES[k][0] + 26, top: NODES[k][1] - (k % 2 ? 78 : -26) }}>
          <b>{String(k + 1).padStart(2, "0")}</b>{a.name}
        </p>
      ))}
    </div>
  );
}

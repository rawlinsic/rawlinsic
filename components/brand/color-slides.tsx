/* Color section of the brand guide: today, four blue systems, five accents,
   each accent on real examples, mix and match, contrast checks, decision. */
import type { CSSProperties, ReactNode } from "react";
import {
  ACCENTS, BRAND_SECTIONS, PICK, SYSTEMS, SYSTEM_PAIRS, TODAY, accentById, cmyk, contrast, level, mockVars, rgb, systemById,
  type Accent, type BlueSystem, type Swatch,
} from "@/lib/content/brand-guide";
import { Examples } from "@/components/brand/examples";
import { Fit, Logo, MockHero, MockOnePager, MockSocial, Route } from "@/components/brand/mocks";
import { Mixer } from "@/components/brand/mixer";

export type SlideProps = { n: number; total: number };
const pad = (n: number) => String(n).padStart(2, "0");

export function Frame({ n, total, dark, section, className = "", style, children }: SlideProps & { dark?: boolean; section: string; className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <section className={`bs${dark ? " bs-dark" : ""} ${className}`} style={style} aria-label={`Slide ${n} of ${total}`}>
      {children}
      <footer className="bs-foot"><span>Rawlins brand guide · {section} · Draft for review</span><span>{pad(n)} / {pad(total)}</span></footer>
    </section>
  );
}

function Head({ k, t, sub }: { k: string; t: ReactNode; sub?: ReactNode }) {
  return (
    <header className="bs-head">
      <p className="bs-k">{k}</p>
      <h2 className="bs-t">{t}</h2>
      {sub && <p className="bs-sub">{sub}</p>}
    </header>
  );
}

export function Sw({ s, size = "m", on }: { s: Swatch; size?: "s" | "m" | "l"; on?: "dark" }) {
  const c = cmyk(s.hex);
  return (
    <div className={`sw sw-${size}${on ? " sw-on-dark" : ""}`}>
      <div className="sw-chip" style={{ background: s.hex }}>{s.kept && <span className="sw-kept">2025</span>}</div>
      <p className="sw-name">{s.name}</p>
      <p className="sw-code"><b>{s.hex.toUpperCase()}</b><br />RGB {rgb(s.hex).join(" ")}<br />CMYK {c ? c.join(" ") : "n/a"}</p>
      {size !== "s" && <p className="sw-job">{s.job}</p>}
    </div>
  );
}

/* ── 1 cover ──────────────────────────────────────────────────── */
export function Cover(p: SlideProps) {
  return (
    <Frame {...p} dark section="Cover" className="cv">
      <div className="mk-grid" />
      <Route w={1920} h={1080} nodes={6} className="cv-route" />
      <Logo dark h={64} style={{ position: "relative" }} />
      <div className="cv-copy">
        <p className="bs-k">Brand guide · Draft</p>
        <h1>The Rawlins<br />brand guide</h1>
        <p className="cv-sub">Starts with color. Fonts and colors here become the kit for the website, slides, one-pagers and everything else.</p>
      </div>
      <ol className="cv-toc">
        {BRAND_SECTIONS.map((s, k) => (
          <li key={s.name} className={s.ready ? "is-ready" : ""}><b>{pad(k + 1)}</b>{s.name}<em>{s.ready ? "In this draft" : "Next"}</em></li>
        ))}
      </ol>
      <p className="cv-date">November 5, 2026 · Options for review. Nicole decides; nothing here is final.</p>
    </Frame>
  );
}

/* ── 2 section opener ─────────────────────────────────────────── */
export function ColorOpener(p: SlideProps) {
  return (
    <Frame {...p} dark section="Color" className="op">
      <div className="mk-grid" />
      <Route w={1920} h={1080} nodes={4} className="op-route" />
      <p className="op-n">01</p>
      <h2 className="op-t">Color</h2>
      <p className="op-line">Stay in the blues. Make them work harder.</p>
      <ol className="op-steps">
        <li><b>1</b>Pick one blue system<span>A · B · C · D</span></li>
        <li><b>2</b>Pick one accent<span>5 options, no gold</span></li>
        <li><b>3</b>We update one file<span>Site, slides, Canva, Office follow</span></li>
      </ol>
    </Frame>
  );
}

/* ── 3 today ──────────────────────────────────────────────────── */
export function Today(p: SlideProps) {
  const r = (a: string, b: string) => contrast(a, b).toFixed(2);
  return (
    <Frame {...p} section="Color" className="td">
      <Head k="Color · Where we are" t="Today's palette" sub="2025 Branding Guide, plus what the website added." />
      <div className="td-row">
        <div className="td-guide">
          <p className="td-h">2025 Branding Guide</p>
          <div className="td-sw">{TODAY.guide.map((s) => <Sw key={s.hex} s={s} />)}</div>
        </div>
        <div className="td-site">
          <p className="td-h">Also in use</p>
          <div className="td-sw">{TODAY.site.map((s) => <Sw key={s.hex} s={s} size="s" />)}</div>
        </div>
      </div>
      <p className="td-h td-fix-h">What to fix</p>
      <ol className="td-fix">
        <li>
          <span className="td-pair"><i style={{ background: TODAY.guide[0].hex }} /><i style={{ background: TODAY.site[0].hex }} /></span>
          <b>Two navies</b><span>Site {TODAY.guide[0].hex} and logo file {TODAY.site[0].hex}. {r(TODAY.guide[0].hex, TODAY.site[0].hex)}:1 apart. Use one.</span>
        </li>
        <li>
          <span className="td-pair"><i style={{ background: TODAY.guide[2].hex }} /><i style={{ background: TODAY.guide[3].hex }} /></span>
          <b>Light and pale blue look alike</b><span>{r(TODAY.guide[2].hex, TODAY.guide[3].hex)}:1 apart. Give each its own job.</span>
        </li>
        <li>
          <span className="td-gap">{[TODAY.guide[0], TODAY.guide[1], null, TODAY.guide[2], TODAY.guide[3]].map((s, k) => s ? <i key={k} style={{ background: s.hex }} /> : <i key={k} className="is-gap">?</i>)}</span>
          <b>No middle blue</b><span>Nothing bright enough for buttons, links and charts.</span>
        </li>
        <li>
          <span className="td-pair"><i style={{ background: TODAY.guide[4].hex }} /><i style={{ background: "#0F1B2D" }} /></span>
          <b>Pure black looks flat</b><span>A blue-black ties text to the navy.</span>
        </li>
        <li className="is-ok">
          <span className="td-pair is-glow"><i style={{ background: TODAY.site[1].hex }} /><i style={{ background: TODAY.site[3].hex }} /></span>
          <b>Aqua works</b><span>{r(TODAY.site[1].hex, TODAY.guide[0].hex)}:1 on navy. Never as text on white ({r(TODAY.site[1].hex, "#FFFFFF")}:1): use Aqua Ink.</span>
        </li>
      </ol>
    </Frame>
  );
}

/* ── 4 four systems at a glance ───────────────────────────────── */
function SystemCard({ s }: { s: BlueSystem }) {
  const t = s.theme;
  return (
    <article className="sg">
      <div className="sg-art" style={{ background: t.deep }}>
        <div className="sg-big" style={{ background: t.primary }}><b>{s.id}</b></div>
        <div className="sg-mid">{[t.secondary, t.support, t.light].map((c) => <i key={c} style={{ background: c }} />)}</div>
        <div className="sg-low">{[t.ink, t.body, t.rule, t.tint, t.pale].map((c) => <i key={c} style={{ background: c }} />)}</div>
      </div>
      <h3>{s.name}</h3>
      <p className="sg-line">{s.line}</p>
      <ul>{s.changes.map((c) => <li key={c}>{c}</li>)}</ul>
    </article>
  );
}
export function Systems(p: SlideProps) {
  return (
    <Frame {...p} section="Color" className="sgs">
      <Head k="Color · Blue systems" t="Four blue systems" sub="Same jobs, different moods. Any of them drops into the site from one file." />
      <div className="sg-row">{SYSTEMS.map((s) => <SystemCard key={s.id} s={s} />)}</div>
    </Frame>
  );
}

/* ── 5–8 one system ───────────────────────────────────────────── */
export function SystemSlide({ s, ...p }: SlideProps & { s: BlueSystem }) {
  const groups: [string, Swatch[]][] = [["Primary", s.primary], ["Secondary", s.secondary], ["Neutrals", s.neutrals], ["Surfaces", s.surfaces]];
  return (
    <Frame {...p} section="Color" className="sy" style={mockVars(s, accentById(PICK.accent)) as CSSProperties}>
      <div className="sy-in">
      <div className="sy-left">
        <Head k={`Color · Blue system ${s.id}`} t={<><span className="sy-id">{s.id}</span>{s.name}</>} sub={s.line} />
        <div className="sy-groups">
          {groups.map(([g, list]) => (
            <div key={g} className="sy-group">
              <p className="sy-g">{g}</p>
              <div className="sy-sw">{list.map((x) => <Sw key={x.hex + x.name} s={x} />)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="sy-right">
        <Fit w={600} iw={1440} ih={900} label="Website hero"><MockHero /></Fit>
        <div className="sy-pair">
          <Fit w={250} iw={850} ih={1100} label="One-pager"><MockOnePager /></Fit>
          <Fit w={326} iw={1080} ih={1080} label="Social post"><MockSocial /></Fit>
        </div>
        <p className="sy-note">Shown with Aqua Glow. <span className="sw-kept">2025</span> = kept from the 2025 guide.</p>
      </div>
      </div>
    </Frame>
  );
}

/* ── 9 accents at a glance ────────────────────────────────────── */
export function Accents(p: SlideProps) {
  const a0 = systemById(PICK.system);
  return (
    <Frame {...p} dark section="Color" className="ac" style={mockVars(a0, accentById(PICK.accent)) as CSSProperties}>
      <div className="mk-grid" />
      <Head k="Color · Accents" t="Five accent options" sub="One accent, used sparingly: glowing lines, nodes, one highlight per page. No gold." />
      <div className="ac-row">
        {ACCENTS.map((a) => (
          <article key={a.id} className="ac-col" style={mockVars(a0, a) as CSSProperties}>
            <div className="ac-art">
              <Route w={300} h={200} nodes={3} faint={false} />
            </div>
            <span className="mk-btn mk-btn-glow ac-btn">See what we do</span>
            <p className="ac-n">{a.n}</p>
            <h3>{a.name}</h3>
            <p className="ac-line">{a.line}</p>
            <p className="ac-why">{a.why}</p>
            <div className="ac-chips">
              {[a.glow, a.soft, a.ink].map((x) => <span key={x.hex}><i style={{ background: x.hex }} />{x.hex}</span>)}
            </div>
            <p className="ac-light"><b>On white:</b> <span style={{ color: a.ink.hex }}>Accent text in {a.ink.name}</span></p>
          </article>
        ))}
      </div>
    </Frame>
  );
}

/* ── 10–14 one accent on the examples ─────────────────────────── */
export function AccentSlide({ a, ...p }: SlideProps & { a: Accent }) {
  const s = systemById(PICK.system);
  return (
    <Frame {...p} section="Color" className="ax" style={mockVars(s, a) as CSSProperties}>
      <div className="ax-top">
        <Head k={`Color · Accent ${a.n} of ${ACCENTS.length} · on system ${s.id}`} t={<><span className="ax-dot" />{a.name}</>} sub={<>{a.line}. {a.why}</>} />
        <div className="ax-sw">{[a.glow, a.soft, a.ink].map((x) => <Sw key={x.hex} s={x} size="s" />)}</div>
      </div>
      <Examples />
    </Frame>
  );
}

/* ── 15 mix and match ─────────────────────────────────────────── */
export function Mix(p: SlideProps) {
  return (
    <Frame {...p} section="Color" className="mxs">
      <Head k="Color · Try it" t="Mix and match" sub="Click a system and an accent. Every example updates. (Prints whatever is selected.)" />
      <Mixer />
    </Frame>
  );
}

/* ── 16 contrast: systems ─────────────────────────────────────── */
function Pair({ fg, bg, note }: { fg: string; bg: string; note?: string }) {
  const r = contrast(fg, bg), l = level(r);
  return (
    <div className="ct-cell">
      <span className="ct-chip" style={{ color: fg, background: bg }}>Aa</span>
      <span className="ct-r">{r.toFixed(1)}:1</span>
      <span className={`ct-l ct-${l.replace(" ", "-").toLowerCase()}`}>{l === "Fail" ? note ?? "Fail" : l}</span>
    </div>
  );
}
export function ContrastSystems(p: SlideProps) {
  return (
    <Frame {...p} section="Color" className="ct">
      <Head k="Color · Accessibility" t="Contrast checks: blue systems" sub={<>WCAG 2.2. <b>AA</b> = 4.5:1 for text. <b>AA large</b> = 3:1, for 24 px+ text and graphics only.</>} />
      <div className="ct-grid" style={{ gridTemplateColumns: `300px repeat(${SYSTEMS.length}, 1fr)` }}>
        <span />
        {SYSTEMS.map((s) => <p key={s.id} className="ct-h"><b>{s.id}</b> {s.name}</p>)}
        {SYSTEM_PAIRS.map((pr) => (
          <div key={pr.label} className="ct-line">
            <p className="ct-lab">{pr.label}</p>
            {SYSTEMS.map((s) => <Pair key={s.id} fg={s.theme[pr.fg]} bg={s.theme[pr.bg]} note="Graphics only" />)}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ── 17 contrast: accents ─────────────────────────────────────── */
export function ContrastAccents(p: SlideProps) {
  const s = systemById(PICK.system).theme;
  const rows: { label: string; f: (a: Accent) => [string, string]; note?: string }[] = [
    { label: "Glow on dark stage", f: (a) => [a.glow.hex, s.deep] },
    { label: "Glow on navy", f: (a) => [a.glow.hex, s.primary] },
    { label: "Soft on dark stage", f: (a) => [a.soft.hex, s.deep] },
    { label: "Ink on white", f: (a) => [a.ink.hex, s.paper] },
    { label: "Ink on panel", f: (a) => [a.ink.hex, s.pale] },
    { label: "Dark text on glow button", f: (a) => [s.deep, a.glow.hex] },
    { label: "Glow as text on white", f: (a) => [a.glow.hex, s.paper], note: "Never" },
  ];
  return (
    <Frame {...p} section="Color" className="ct">
      <Head k="Color · Accessibility" t="Contrast checks: accents" sub={<>On system {PICK.system}. Glow is for lines, nodes and big type on dark. Accent text on light pages uses the Ink, on white or Ice.</>} />
      <div className="ct-grid" style={{ gridTemplateColumns: `300px repeat(${ACCENTS.length}, 1fr)` }}>
        <span />
        {ACCENTS.map((a) => <p key={a.id} className="ct-h"><i style={{ background: a.glow.hex }} /> {a.name}</p>)}
        {rows.map((r) => (
          <div key={r.label} className="ct-line">
            <p className="ct-lab">{r.label}</p>
            {ACCENTS.map((a) => { const [fg, bg] = r.f(a); return <Pair key={a.id} fg={fg} bg={bg} note={r.note} />; })}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ── 18 decide ────────────────────────────────────────────────── */
export function Decide(p: SlideProps) {
  const s = systemById(PICK.system), a = accentById(PICK.accent);
  return (
    <Frame {...p} dark section="Color" className="dc" style={mockVars(s, a) as CSSProperties}>
      <div className="mk-grid" />
      <Head k="Color · Decision" t="Pick one of each" />
      <div className="dc-row">
        <div className="dc-pick">
          <p className="dc-h">Our recommendation</p>
          <div className="dc-combo">
            <span className="dc-sys">{[s.theme.deep, s.theme.primary, s.theme.secondary, s.theme.support, s.theme.light, s.theme.pale].map((c) => <i key={c} style={{ background: c }} />)}</span>
            <b>{s.id} · {s.name}</b><em>+</em><span className="dc-acc"><i style={{ background: a.glow.hex }} />{a.name}</span>
          </div>
          <ul>
            <li>Keeps the navy on every file we already have</li>
            <li>Fixes the gaps: one navy, a real middle blue</li>
            <li>Aqua is already live and passes on navy</li>
          </ul>
          <p className="dc-alt"><b>Runner-up:</b> C · Open Sky + Electric Blue, if you want lighter and all blue.</p>
        </div>
        <div className="dc-flow">
          <p className="dc-h">Once you pick</p>
          <ol>
            <li><b>1</b>One file changes<span>BRAND in lib/content/v8.ts</span></li>
            <li><b>2</b>Website and this guide follow<span>Same tokens, same day</span></li>
            <li><b>3</b>Kits for the team<span>Office theme, Canva and Adobe Express brand kits</span></li>
            <li><b>4</b>Print proof<span>CMYK here is converted with the SWOP profile; proof before a print run</span></li>
          </ol>
        </div>
      </div>
      <div className="dc-compare">
        <p><b>Today</b><span>{[...TODAY.guide, ...TODAY.site.slice(1, 2)].map((x) => <i key={x.hex} style={{ background: x.hex }} />)}</span></p>
        <p><b>{s.id} + {a.name}</b><span>{[s.theme.deep, s.theme.primary, s.theme.secondary, s.theme.support, s.theme.light, s.theme.ink, s.theme.body, s.theme.rule, s.theme.tint, s.theme.pale, a.glow.hex, a.ink.hex].map((c, k) => <i key={c + k} style={{ background: c }} />)}</span></p>
      </div>
      <p className="dc-who">Options only. Nicole decides.</p>
    </Frame>
  );
}

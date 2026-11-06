/* The rest of the brand guide: overview, logo usage, typography, graphic
   language, photography, voice and tone (from Jacob Michaels' Brand Voice
   and Tone Kit v1.1, Oct 19 2026), and templates. Rules marked "proposed"
   are starting points for Nicole to accept or change. */
import type { CSSProperties, ReactNode } from "react";
import { Frame, Head, type SlideProps } from "@/components/brand/color-slides";
import { Fit, Logo, MockOnePager, MockSlide, Route } from "@/components/brand/mocks";
import { FramedLogo, Lockup, LOGO_STANDIN, Mark, Stage } from "@/components/brand/logos";
import { BRAND_SECTIONS, PICK, accentById, mockVars, systemById } from "@/lib/content/brand-guide";
import { HOME } from "@/lib/content/site";

const P = (f: string) => `/images/pages/${f}`;
const pad = (n: number) => String(n).padStart(2, "0");

/* ── section opener ───────────────────────────────────────────── */
export function Opener({ num, name, line, steps, ...p }: SlideProps & { num: string; name: string; line: string; steps: [string, string][] }) {
  return (
    <Frame {...p} dark section={name} className="op">
      <div className="mk-grid" />
      <Route w={1920} h={1080} nodes={4} className="op-route" />
      <p className="op-n">{num}</p>
      <h2 className="op-t">{name}</h2>
      <p className="op-line">{line}</p>
      <ol className="op-steps" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {steps.map(([a, b], k) => <li key={a}><b>{k + 1}</b>{a}<span>{b}</span></li>)}
      </ol>
    </Frame>
  );
}

const Proposed = () => <span className="pp">Proposed</span>;

/* ── overview ─────────────────────────────────────────────────── */
const SECTION_LINES: Record<string, [string, string]> = {
  Overview: ["overview", "How to use it, the brand at a glance"],
  Color: ["color", "Four blue systems, five accents"],
  Logo: ["logo", "Six directions and how to use the logo"],
  Typography: ["type", "Source Sans 3 and Source Serif 4"],
  "Graphic language": ["graphics", "Lines, nodes, frames and grid"],
  Photography: ["photo", "Real work and real places"],
  "Voice and tone": ["voice", "Jacob's kit, in brief"],
  Templates: ["templates", "One-pager and slides"],
};
export function OverviewUse(p: SlideProps) {
  return (
    <Frame {...p} section="Overview" className="ov">
      <Head k="Overview · How to use this guide" t="One kit for everything we make" sub="The website's colors and fonts become the kit for slides, one-pagers, proposals, social posts and print." />
      <div className="ov-grid">
        {BRAND_SECTIONS.map((s) => (
          <a key={s.name} href={`#${SECTION_LINES[s.name][0]}`} className="ov-tile">
            <b>{s.num}</b><span>{s.name}</span><em>{SECTION_LINES[s.name][1]}</em>
          </a>
        ))}
      </div>
      <div className="ov-who">
        <p><b>Look and feel</b>Nicole</p>
        <p><b>Voice</b>Jacob Michaels, editorial owner</p>
        <p><b>Name and logo</b>Scott's yes, through Ben</p>
        <p><b>Status</b>Draft. Color and logo picks are open.</p>
      </div>
    </Frame>
  );
}

export function OverviewGlance(p: SlideProps) {
  const s = systemById(PICK.system), a = accentById(PICK.accent);
  return (
    <Frame {...p} dark section="Overview" className="og" style={mockVars(s, a) as CSSProperties}>
      <div className="mk-grid" />
      <Head k="Overview · At a glance" t="The brand on one page" />
      <div className="og-grid">
        <section className="og-name"><p className="og-h">Name</p><p className="og-big">Rawlins</p><p>Just Rawlins. No old names, no acronyms, no descriptor.</p></section>
        <section><p className="og-h">Color <em>recommended, not picked</em></p>
          <div className="og-strip">{[s.theme.deep, s.theme.primary, s.theme.secondary, s.theme.support, s.theme.light, s.theme.pale, "#FFFFFF"].map((c) => <i key={c} style={{ background: c }} />)}<i className="og-acc" style={{ background: a.glow.hex }} /></div>
          <p>{s.id} · {s.name} with {a.name}</p></section>
        <section><p className="og-h">Type</p><p className="og-type"><span>Aa</span><span className="og-serif">Aa</span></p><p>Source Sans 3 for everything. Source Serif 4 italic for voices and quotes.</p></section>
        <section className="og-art"><p className="og-h">Graphics</p><div className="og-route"><Route w={520} h={170} nodes={4} faint={false} /></div><p>One glowing line, nodes at real steps, a blueprint grid.</p></section>
        <section><p className="og-h">Photography</p><div className="og-photos">{["auto-human.webp", "home-hero-poster.webp", "tnbig.webp"].map((f) => <img key={f} src={P(f)} alt="" />)}</div><p>Real work, real infrastructure, real places.</p></section>
        <section><p className="og-h">Voice <em>Jacob's kit</em></p><ul className="og-voice"><li>Practitioner grounded</li><li>Clear and purposeful</li><li>Confident and measured</li><li>Human and respectful</li></ul></section>
      </div>
    </Frame>
  );
}

/* ── logo usage (shown with a stand-in until a direction is picked) ── */
const STANDIN_NOTE = "Shown with direction 5 (Framed) as a stand-in until a direction is picked.";
export function LogoVersions(p: SlideProps) {
  const rows: { tone: "light" | "dark" | "mono-light" | "mono-dark"; name: string; where: string; icon?: boolean; glow?: boolean }[] = [
    { tone: "light", name: "Full color", where: "Website header, Word and PowerPoint on white, proposals, one-pagers" },
    { tone: "dark", name: "Reversed", where: "Dark slides, video, social posts, website footer", glow: true },
    { tone: "mono-light", name: "One color, navy", where: "Single-color print, forms, stamps" },
    { tone: "mono-dark", name: "One color, white", where: "On photos with a dark overlay; embroidery on dark polos" },
    { tone: "light", name: "Icon", where: "Favicon, LinkedIn avatar, app tiles, anything under 120 px wide", icon: true },
  ];
  return (
    <Frame {...p} section="Logo" className="lv">
      <Head k="Logo · Usage" t="Versions and where each one goes" sub={STANDIN_NOTE} />
      <div className="lv-rows">
        {rows.map((r) => (
          <div key={r.name} className="lv-row">
            <Stage tone={r.tone} glow={r.glow} className="lv-art">{r.icon ? <Mark id={LOGO_STANDIN} size={84} /> : <FramedLogo h={84} />}</Stage>
            <p className="lv-name">{r.name}</p>
            <p className="lv-where">{r.where}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function LogoSpace(p: SlideProps) {
  return (
    <Frame {...p} section="Logo" className="lsp">
      <Head k="Logo · Usage" t="Clear space and minimum size" sub={<>{STANDIN_NOTE} <Proposed /></>} />
      <div className="lsp-row">
        <div className="lsp-demo">
          <Stage tone="light" className="lsp-box"><span className="lsp-x lsp-x-t">x</span><span className="lsp-x lsp-x-l">x</span><span className="lsp-x lsp-x-r">x</span><span className="lsp-x lsp-x-b">x</span><div className="lsp-in"><FramedLogo h={230} /></div></Stage>
          <p className="lsp-cap"><b>x = one quarter of the logo's height.</b> Keep that much space clear on every side: no text, edges or other logos.</p>
        </div>
        <div className="lsp-min">
          <div className="lsp-card"><p className="lsp-h">Smallest full logo</p><Stage tone="light" className="lsp-sample"><FramedLogo h={42} /></Stage><p><b>120 px</b> wide on screen · <b>1.25 in</b> (32 mm) in print</p></div>
          <div className="lsp-card"><p className="lsp-h">Smallest icon</p><Stage tone="light" className="lsp-sample"><Mark id={LOGO_STANDIN} size={16} /></Stage><p><b>16 px</b> on screen · <b>0.3 in</b> (8 mm) in print</p></div>
          <div className="lsp-card"><p className="lsp-h">Embroidery</p><Stage tone="mono-dark" className="lsp-sample"><FramedLogo h={42} /></Stage><p>One-color version only. Stitch-out test before any order.</p></div>
        </div>
      </div>
    </Frame>
  );
}

export function LogoDonts(p: SlideProps) {
  const items: { t: string; art: ReactNode; dark?: boolean; photo?: boolean }[] = [
    { t: "Don't stretch or squash it", art: <span style={{ display: "inline-block", transform: "scaleX(1.45)" }}><FramedLogo h={70} /></span> },
    { t: "Don't recolor it. No gold.", art: <span style={{ ["--lk" as string]: "#C9B78C", ["--la" as string]: "#C9B78C" } as CSSProperties}><FramedLogo h={70} /></span> },
    { t: "Don't add a descriptor", art: <span className="lgx-desc"><FramedLogo h={62} /><em>ENGINEERING + TECHNOLOGY</em></span> },
    { t: "Don't use glow in print", art: <span className="lgx-glow"><FramedLogo h={70} /></span> },
    { t: "Don't place it on a busy photo without an overlay", art: <FramedLogo h={70} />, photo: true },
    { t: "Don't retype it. Use the artwork files.", art: <span className="lgx-retype">Rawlins</span> },
  ];
  return (
    <Frame {...p} section="Logo" className="lx">
      <Head k="Logo · Usage" t="Please don't" sub={STANDIN_NOTE} />
      <div className="lx-grid">
        {items.map((it) => (
          <figure key={it.t}>
            <Stage tone={it.photo ? "mono-dark" : "light"} className={`lx-art${it.photo ? " lx-photo" : ""}`}>{it.photo && <img src={P("majortrans.webp")} alt="" />}{it.art}<i className="lx-no">✕</i></Stage>
            <figcaption>{it.t}</figcaption>
          </figure>
        ))}
      </div>
    </Frame>
  );
}

/* ── typography ───────────────────────────────────────────────── */
export function TypePair(p: SlideProps) {
  return (
    <Frame {...p} section="Typography" className="tp">
      <Head k="Typography · The pair" t="Two families, both free" sub="Source Sans 3 and Source Serif 4, from Adobe, under the SIL Open Font License. Already on the website." />
      <div className="tp-row">
        <section className="tp-card">
          <p className="tp-aa">Aa</p>
          <p className="tp-name">Source Sans 3</p>
          <p className="tp-use">Headlines, body, labels, buttons. Almost everything.</p>
          <p className="tp-w"><span style={{ fontWeight: 400 }}>Regular</span><span style={{ fontWeight: 600 }}>Semibold</span><span style={{ fontWeight: 700 }}>Bold</span><span style={{ fontWeight: 900 }}>Black</span></p>
          <p className="tp-sample">Getting programs and projects built</p>
        </section>
        <section className="tp-card tp-serif">
          <p className="tp-aa"><i>Aa</i></p>
          <p className="tp-name">Source Serif 4 <em>italic</em></p>
          <p className="tp-use">Client voices, quotes and subtitles. Used lightly.</p>
          <p className="tp-w"><i style={{ fontWeight: 400 }}>Italic</i><i style={{ fontWeight: 600 }}>Semibold italic</i></p>
          <p className="tp-sample"><i>{HOME.line}</i></p>
        </section>
      </div>
      <p className="tp-retired"><b>Retired:</b> Magneto and Nixie One (old logo fonts), Arial (old document font), Cormorant Garamond and DM Sans (old website).</p>
    </Frame>
  );
}

export function TypeScale(p: SlideProps) {
  const rows: { role: string; cls: string; slide: string; web: string; print: string; sample: string }[] = [
    { role: "Kicker", cls: "ts-kick", slide: "21 px Bold caps", web: "12.5 px Bold caps", print: "8 pt Bold caps", sample: "Project delivery" },
    { role: "Title", cls: "ts-title", slide: "70 px Bold", web: "30–49 px Bold", print: "30 pt Bold", sample: "Getting programs built" },
    { role: "Subtitle", cls: "ts-sub", slide: "28 px Regular", web: "17–20 px Regular", print: "13 pt Regular", sample: "From strategy through operations and technology." },
    { role: "Body", cls: "ts-body", slide: "24 px minimum", web: "17–18 px", print: "10.5 pt", sample: "We find what's broken, fix it, and stay until it runs." },
    { role: "Quote", cls: "ts-quote", slide: "32 px Serif italic", web: "17–19 px Serif italic", print: "14 pt Serif italic", sample: "A voice from the client goes here." },
    { role: "Caption", cls: "ts-cap", slide: "16 px", web: "13–14 px", print: "8 pt", sample: "Photo or source caption" },
  ];
  return (
    <Frame {...p} section="Typography" className="ts">
      <Head k="Typography · Sizes" t="Hierarchy and starting sizes" sub={<>Web sizes are what the site uses now. Slide and print sizes are starting points. <Proposed /></>} />
      <div className="ts-table">
        <p className="ts-hd"><span>Role</span><span>Looks like</span><span>Slide (16:9)</span><span>Website</span><span>Print</span></p>
        {rows.map((r) => (
          <div key={r.role} className="ts-row">
            <p className="ts-role">{r.role}</p>
            <p className={`ts-sample ${r.cls}`}>{r.sample}</p>
            <p>{r.slide}</p><p>{r.web}</p><p>{r.print}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function TypeApps(p: SlideProps) {
  const rows: { app: string; sans: string; serif: string; status: string; ok: "yes" | "part" }[] = [
    { app: "Website", sans: "Source Sans 3", serif: "Source Serif 4", status: "Live now", ok: "yes" },
    { app: "Word and PowerPoint", sans: "Source Sans Pro (a Microsoft cloud font; nothing to install)", serif: "Georgia Italic (in Office, Windows and Mac)", status: "Checked", ok: "yes" },
    { app: "Adobe Express", sans: "Source Sans 3 (Adobe Fonts)", serif: "Source Serif 4 (Adobe Fonts)", status: "Free plans get part of Adobe Fonts", ok: "part" },
    { app: "InDesign and print", sans: "Source Sans 3 (Adobe Fonts)", serif: "Source Serif 4 (Adobe Fonts)", status: "Checked", ok: "yes" },
    { app: "Canva", sans: "Source Sans 3, or upload it", serif: "Source Serif 4, or upload it", status: "Not checked yet (needs sign-in); upload needs Pro or Teams", ok: "part" },
  ];
  return (
    <Frame {...p} section="Typography" className="ta">
      <Head k="Typography · Where it works" t="Which font in which app" sub="Checked live Nov 5, 2026: Microsoft's cloud-font and font-family pages, fonts.adobe.com, Canva and Adobe help pages." />
      <div className="ta-table">
        <p className="ta-hd"><span>App</span><span>Headings and body</span><span>Quotes</span><span>Status</span></p>
        {rows.map((r) => (
          <div key={r.app} className="ta-row">
            <p className="ta-app">{r.app}</p><p className="ta-sans">{r.sans}</p><p className="ta-serif">{r.serif}</p>
            <p><span className={`lw-v lw-${r.ok}`}>{r.status}</span></p>
          </div>
        ))}
      </div>
      <p className="ta-foot">Source Sans Pro is the earlier release of Source Sans 3, so Office files match the website closely.</p>
    </Frame>
  );
}

/* ── graphic language ─────────────────────────────────────────── */
function Shape({ kind }: { kind: "loop" | "track" | "cycle" | "hub" | "ascent" }) {
  const nodes = (pts: [number, number][]) => pts.map(([x, y], k) => <g key={k} className="mk-node" transform={`translate(${x} ${y})`}><circle className="mk-halo" r="9" /><circle className="mk-dot" r="4" /></g>);
  if (kind === "loop") return <svg viewBox="0 0 120 120"><circle className="mk-line" cx="60" cy="60" r="40" />{nodes([[60, 20], [98, 72], [22, 72]])}</svg>;
  if (kind === "track") return <svg viewBox="0 0 120 120"><path className="mk-line" d="M8 60H112" />{nodes([[20, 60], [50, 60], [80, 60], [106, 60]])}</svg>;
  if (kind === "cycle") return <svg viewBox="0 0 120 120"><path className="mk-line" d="M60 20A40 40 0 1 1 23 75" /><path className="mk-line" d="M23 75L18 64M23 75L34 72" />{nodes([[60, 20], [100, 60], [60, 100]])}</svg>;
  if (kind === "hub") return <svg viewBox="0 0 120 120">{[[60, 14], [104, 46], [88, 100], [32, 100], [16, 46]].map(([x, y], k) => <path key={k} className="mk-line" d={`M60 60L${x} ${y}`} />)}{nodes([[60, 60], [60, 14], [104, 46], [88, 100], [32, 100], [16, 46]])}</svg>;
  return <svg viewBox="0 0 120 120"><path className="mk-faint-l" d="M6 108H114" /><path className="mk-line" d="M8 104Q40 104 50 76T86 40T114 12" />{nodes([[30, 100], [62, 62], [96, 30]])}</svg>;
}
export function GLLines(p: SlideProps) {
  const shapes: [Parameters<typeof Shape>[0]["kind"], string, string][] = [
    ["loop", "Loop", "Strategy & Organization"], ["track", "Track", "Project Delivery"], ["cycle", "Cycle", "Operations & Maintenance"],
    ["hub", "Hub", "Digital Solutions"], ["ascent", "Ascent", "Drones & Advanced Air Mobility"],
  ];
  return (
    <Frame {...p} dark section="Graphic language" className="gl">
      <div className="mk-grid" />
      <Head k="Graphic language · Lines and nodes" t="One line, real steps" sub="Each of the five areas has its own shape on the website. Same parts every time: a line, nodes, a dark stage." />
      <div className="gl-shapes">{shapes.map(([k, n, a]) => <figure key={k}><div className="gl-shape"><Shape kind={k} /></div><figcaption><b>{n}</b>{a}</figcaption></figure>)}</div>
      <ol className="gl-rules">
        <li><b>One line leads the eye.</b> One glowing line per graphic.</li>
        <li><b>Nodes mean something.</b> Each one is a real step, place or system.</li>
        <li><b>Glow on dark only.</b> Flat lines on light pages and in print.</li>
        <li><b>Guides stay faint.</b> Dotted light blue at about 25%. <Proposed /></li>
      </ol>
    </Frame>
  );
}

export function GLFrames(p: SlideProps) {
  return (
    <Frame {...p} section="Graphic language" className="gf">
      <Head k="Graphic language · Photo frames" t="Layered photo frames" sub="Photos sit on layers: a pale panel behind, one glowing rule, sometimes a line drawing on top." />
      <div className="gf-row">
        <figure>
          <div className="gf-a"><span className="gf-back" /><img src={P("engineersoperatingdrones.webp")} alt="" /><span className="gf-bar" /></div>
          <figcaption><b>Light page</b>Photo, pale panel offset down and right, one glow rule.</figcaption>
        </figure>
        <figure>
          <div className="gf-b"><img src={P("home-hero-poster.webp")} alt="" /><div className="mk-grid" /><Route w={520} h={400} nodes={3} faint={false} /></div>
          <figcaption><b>Dark stage</b>Navy duotone photo, blueprint grid, one route line.</figcaption>
        </figure>
        <figure>
          <div className="gf-c"><img src={P("auto-human.webp")} alt="" /><div className="gf-wire"><div className="mk-grid" /><Route w={240} h={330} nodes={3} faint={false} /></div></div>
          <figcaption><b>Photo and wire panel</b>The photo shows the people; the panel shows the system.</figcaption>
        </figure>
      </div>
    </Frame>
  );
}

export function GLGrid(p: SlideProps) {
  return (
    <Frame {...p} section="Graphic language" className="gg">
      <Head k="Graphic language · Grid" t="The blueprint grid" sub={<>A quiet engineering grid behind type and diagrams. <Proposed /></>} />
      <div className="gg-row">
        <div className="gg-dark"><div className="gg-grid" /><Route w={560} h={560} nodes={3} faint={false} /><p>On dark</p><span>32 px minor, 160 px major · light blue at 6% and 13%</span><h4>Getting programs and projects built</h4></div>
        <div className="gg-light"><div className="gg-grid" /><p>On light</p><span>Same spacing · navy at 4% and 8%</span><h4>Getting programs and projects built</h4></div>
        <ul className="gg-rules">
          <li><b>Use it</b> behind headlines, diagrams and data.</li>
          <li><b>Fade it</b> where it meets a photo.</li>
          <li><b>Never</b> over faces or small text.</li>
          <li><b>At 1920 wide,</b> grid squares are 32 px. Scale with the page.</li>
          <li className="gg-note">Drawn twice as bold here so it shows on screen.</li>
        </ul>
      </div>
    </Frame>
  );
}

/* ── photography ──────────────────────────────────────────────── */
export function PhotoWhat(p: SlideProps) {
  const cols: [string, string, string[]][] = [
    ["People at work", "Doing the work, not posing.", ["auto-human.webp", "engineersoperatingdrones.webp", "auto-team.webp"]],
    ["Infrastructure at scale", "Roads, bridges, airspace, from above.", ["home-hero-poster.webp", "majortrans.webp", "aam-highway-aerial.webp"]],
    ["Places we work", "Real places, named correctly.", ["tnbig.webp", "louisiana.webp", "utah.webp"]],
  ];
  return (
    <Frame {...p} section="Photography" className="pw">
      <Head k="Photography · What we show" t="Real work, real places" />
      <div className="pw-cols">
        {cols.map(([t, d, fs]) => (
          <section key={t}><p className="pw-h">{t}</p><p className="pw-d">{d}</p><div className="pw-imgs">{fs.map((f, k) => <img key={f} src={P(f)} alt="" className={k === 0 ? "is-big" : ""} />)}</div></section>
        ))}
      </div>
      <ul className="pw-rules">
        <li><b>Our own photos first.</b> Stock only when we have nothing real. <Proposed /></li>
        <li><b>Client names, logos and faces</b> only when cleared.</li>
        <li><b>LinkedIn:</b> headshots before events, casual photos after (Jacob, Oct 15).</li>
      </ul>
    </Frame>
  );
}

export function PhotoTreat(p: SlideProps) {
  const img = P("majortrans.webp");
  return (
    <Frame {...p} section="Photography" className="pt">
      <Head k="Photography · Treatment" t="One photo, four uses" sub={<>Duotone is for backgrounds. People stay in natural color. <Proposed /></>} />
      <div className="pt-row">
        <figure><div className="pt-img"><img src={img} alt="" /></div><figcaption><b>Natural</b>People, light pages, documents</figcaption></figure>
        <figure><div className="pt-img pt-duo"><img src={img} alt="" /></div><figcaption><b>Navy duotone</b>Dark stages behind type</figcaption></figure>
        <figure><div className="pt-img pt-duo pt-hero"><img src={img} alt="" /><div className="mk-grid" /><Route w={400} h={300} nodes={3} faint={false} /></div><figcaption><b>Duotone, grid and line</b>Heroes, title slides, social</figcaption></figure>
        <figure><div className="pt-img pt-layer"><span className="gf-back" /><img src={img} alt="" /><span className="gf-bar" /></div><figcaption><b>Layered frame</b>Light pages and one-pagers</figcaption></figure>
      </div>
      <p className="pt-h">Avoid going forward <em>(some are on the site today)</em></p>
      <div className="pt-dont">
        <figure><img src={P("aam-team-meeting.webp")} alt="" /><i className="lx-no">✕</i><figcaption>Staged handshakes and posed meetings</figcaption></figure>
        <figure><img src={P("home-about.webp")} alt="" /><i className="lx-no">✕</i><figcaption>Sci-fi renders that aren't real infrastructure</figcaption></figure>
        <figure className="pt-txt"><p>Glow or heavy filters over faces</p><p>Fake dashboards and screens</p><p>Places we haven't worked, shown as ours</p></figure>
      </div>
    </Frame>
  );
}

/* ── voice and tone (Jacob Michaels' kit v1.1) ────────────────── */
const KIT = "Source: Rawlins Brand Voice and Tone Kit v1.1 (Oct 19, 2026), Jacob Michaels";
export function VoiceTraits(p: SlideProps) {
  const traits: [string, string, string][] = [
    ["Practitioner grounded", "Names the real operating problem, the constraints and who is responsible.", "Assuming insider knowledge, listing credentials, one answer for every agency."],
    ["Clear and purposeful", "Leads with the point. Explains how actions lead to results.", "Slogans instead of explanation, or every detail with no reason."],
    ["Confident and measured", "States the recommendation. Claims only what the evidence supports.", "Superlatives and guarantees, or hedging until nothing is said."],
    ["Human and respectful", "Natural sentences. Credits staff, clients and partners.", "Stiff, patronizing, overfamiliar or artificially cheerful."],
  ];
  return (
    <Frame {...p} section="Voice and tone" className="vt">
      <Head k="Voice and tone · Four qualities" t="Practical judgment, said plainly" sub="We write like people who understand public agencies and the work they're responsible for." />
      <div className="vt-grid">
        {traits.map(([t, does, drift], k) => (
          <section key={t}><p className="vt-n">{pad(k + 1)}</p><h3>{t}</h3><p className="vt-does"><b>Does</b>{does}</p><p className="vt-drift"><b>Drifts into</b>{drift}</p></section>
        ))}
      </div>
      <p className="vt-src">{KIT}, pp. 1 and 3. Jacob is the editorial owner.</p>
    </Frame>
  );
}

function Dots({ v }: { v: number }) {
  return <span className="dots">{[1, 2, 3, 4, 5].map((k) => <i key={k} className={k <= v ? "on" : ""} />)}</span>;
}
export function VoiceTone(p: SlideProps) {
  const base: [string, number, string][] = [["Formality", 3, "Conversational professional"], ["Humor", 1, "Serious"], ["Respect", 5, "Explicitly respectful"], ["Enthusiasm", 2, "Let the news set the emphasis"]];
  const rows: [string, number, number, number, number][] = [
    ["Proposal or qualifications", 4, 1, 5, 2], ["Website or capability statement", 3, 1, 5, 2], ["LinkedIn insight post", 3, 1, 5, 2],
    ["Event or speaking announcement", 3, 1, 5, 3], ["Routine client email", 2, 1, 5, 2], ["Delay or difficult news", 3, 1, 5, 1],
  ];
  return (
    <Frame {...p} section="Voice and tone" className="vtn">
      <Head k="Voice and tone · Settings" t="One voice, four tone dials" sub="The voice stays the same. The tone moves with the reader and the situation." />
      <div className="vtn-row">
        <div className="vtn-base">
          <p className="vtn-h">Rawlins baseline</p>
          {base.map(([n, v, d]) => <div key={n} className="vtn-dial"><p><b>{n}</b><span>{v}</span></p><Dots v={v} /><em>{d}</em></div>)}
        </div>
        <div className="vtn-matrix">
          <p className="vtn-mh"><span>Situation</span><span>Formality</span><span>Humor</span><span>Respect</span><span>Enthusiasm</span></p>
          {rows.map(([s, f, h, r, e]) => <p key={s} className="vtn-mr"><span>{s}</span><Dots v={f} /><Dots v={h} /><Dots v={r} /><Dots v={e} /></p>)}
        </div>
      </div>
      <p className="vt-src">{KIT}, pp. 4 to 6. Scores are starting settings, not measurements.</p>
    </Frame>
  );
}

export function VoiceWords(p: SlideProps) {
  const swaps: [string, string][] = [
    ["leverage, harness, utilize", "use, apply"], ["spearhead, orchestrate", "lead, coordinate, manage"], ["optimize, streamline", "name the actual improvement"],
    ["unlock, drive, transform", "improve, reduce, establish, change"], ["ensure, guarantee", "will check, is designed to, may reduce"],
  ];
  return (
    <Frame {...p} section="Voice and tone" className="vw">
      <Head k="Voice and tone · Words and mechanics" t="Say what actually happens" />
      <div className="vw-row">
        <div className="vw-swaps">
          <p className="vw-h"><span>Often replace</span><span>Usually clearer</span></p>
          {swaps.map(([a, b]) => <p key={a} className="vw-sw"><s>{a}</s><b>{b}</b></p>)}
          <p className="vw-avoid"><b>Supply facts instead of:</b> innovative, robust, seamless, cutting-edge, comprehensive, holistic, transformative, industry-leading, best-in-class.</p>
        </div>
        <ul className="vw-mech">
          <li><b>No em dashes.</b> Use a period, comma, colon or parentheses.</li>
          <li><b>Serial comma,</b> always.</li>
          <li><b>Sentence-case headings.</b></li>
          <li><b>Exclamation points:</b> rare, never in formal work.</li>
          <li><b>Contractions</b> in social and email.</li>
          <li><b>Spell out acronyms</b> on first use.</li>
          <li><b>“Rawlins”</b> in everyday copy; the legal entity name only where required.</li>
          <li><b>Open with the point.</b> End when the reader has what they need.</li>
        </ul>
      </div>
      <p className="vt-src">{KIT}, pp. 8 and 9.</p>
    </Frame>
  );
}

export function VoiceClaims(p: SlideProps) {
  const status: [string, string][] = [["Completed", "What was delivered, for whom, when"], ["Underway", "Done so far, and what remains"], ["Proposed", "Planned work and its conditions"], ["Target", "Labeled, with baseline and method"], ["Illustrative", "Clearly marked as hypothetical"]];
  return (
    <Frame {...p} section="Voice and tone" className="vc">
      <Head k="Voice and tone · Claims" t="Show it, then say it" />
      <div className="vc-row">
        <div className="vc-ba">
          <p className="vc-h">Before and after <em>(the kit's teaching example)</em></p>
          <p className="vc-before"><b>Before</b>“We leverage cutting-edge integration solutions to unlock seamless efficiency and empower your organization.”</p>
          <p className="vc-after"><b>After</b>“We connect existing systems and remove duplicate data entry so staff can spend less time moving information between applications. We document the workflow so the agency can maintain it.”</p>
        </div>
        <div className="vc-rules">
          <p className="vc-h">Keep the status visible</p>
          <ol className="vc-status">{status.map(([a, b]) => <li key={a}><b>{a}</b>{b}</li>)}</ol>
          <p className="vc-will"><b>will</b> what we control · <b>can</b> what we've shown · <b>may</b> what depends on conditions</p>
          <p className="vc-test"><b>Competitor test:</b> could a competitor truthfully say the same sentence? Then add the evidence that makes it ours.</p>
          <p className="vc-test"><b>Our work vs. earlier roles:</b> keep Rawlins engagements separate from what staff did before joining.</p>
        </div>
      </div>
      <p className="vt-src">{KIT}, pp. 9, 10 and 13.</p>
    </Frame>
  );
}

/* ── templates ────────────────────────────────────────────────── */
export function TplOnePager(p: SlideProps) {
  const marks: [number, number, string, string][] = [
    [-5, 15, "Header band", "Dark stage, logo, eyebrow, title, one italic line"],
    [-5, 46, "What we do", "The services, in plain words"],
    [-5, 72, "How we work", "One short paragraph"],
    [105, 42, "Photo and proof", "Layered frame, one quote or cleared fact"],
    [-5, 97, "Contact bar", "Site, email, phone; a QR code for digital use"],
  ];
  return (
    <Frame {...p} section="Templates" className="to">
      <div className="to-row">
        <div className="to-mock">
          <Fit w={600} iw={850} ih={1100}><MockOnePager /></Fit>
          {marks.map(([x, y], k) => <span key={k} className="to-pin" style={{ left: `${x}%`, top: `${y}%` }}>{k + 1}</span>)}
        </div>
        <div className="to-notes">
          <Head k="Templates · One-pager" t="The solution brief" sub="One page, one idea. Letter size. Shown with today's logo." />
          <ol className="to-list">{marks.map(([, , t, d], k) => <li key={t}><b>{k + 1}</b><span><strong>{t}</strong>{d}</span></li>)}</ol>
          <p className="to-rule"><b>Digital first:</b> one page with a QR code and no client names (Ben). Scott prefers fewer paper leave-behinds.</p>
        </div>
      </div>
    </Frame>
  );
}

function SlideTitle() {
  return (
    <div className="mk tpl-dark">
      <div className="mk-grid" /><Route w={1920} h={1080} nodes={4} faint={false} />
      <Logo dark h={64} style={{ position: "absolute", left: 120, top: 100 }} />
      <div className="tpl-copy"><p className="mk-eyebrow">AASHTO Annual Meeting · Louisville</p><h3>Getting programs and projects built</h3><p className="tpl-it">{HOME.line}</p></div>
    </div>
  );
}
function SlideSection() {
  return (
    <div className="mk tpl-dark">
      <div className="mk-grid" /><Route w={1920} h={1080} nodes={3} faint={false} />
      <div className="tpl-sec"><p>02</p><h3>Project Delivery</h3><span>Getting programs and projects built</span></div>
    </div>
  );
}
function SlideClose() {
  return (
    <div className="mk tpl-dark">
      <div className="mk-grid" /><Route w={1920} h={1080} nodes={3} faint={false} />
      <div className="tpl-copy tpl-close"><h3>What are you trying to fix?</h3><p className="tpl-contact">info@rawlinsic.com · 775-843-3822 · rawlinsic.com</p></div>
      <Logo dark h={70} style={{ position: "absolute", left: 120, bottom: 100 }} />
    </div>
  );
}
export function TplSlides(p: SlideProps) {
  const W = 560;
  return (
    <Frame {...p} section="Templates" className="tsl">
      <Head k="Templates · Slides" t="Four slides cover most decks" sub="16:9. Source Sans Pro in PowerPoint. Shown with today's logo." />
      <div className="tsl-row">
        <div className="tsl-grid">
          <Fit w={W} iw={1920} ih={1080} label="1 Title"><SlideTitle /></Fit>
          <Fit w={W} iw={1920} ih={1080} label="2 Section"><SlideSection /></Fit>
          <Fit w={W} iw={1920} ih={1080} label="3 Content"><MockSlide /></Fit>
          <Fit w={W} iw={1920} ih={1080} label="4 Closing"><SlideClose /></Fit>
        </div>
        <ul className="tsl-rules">
          <li><b>One idea</b> per slide.</li>
          <li><b>Dark</b> for title, section and closing. <b>Light</b> for content.</li>
          <li><b>Glow</b> on dark slides only.</li>
          <li><b>Footer:</b> logo, one glow rule, page number.</li>
          <li><b>Next:</b> real PowerPoint and Word templates once color and logo are picked.</li>
        </ul>
      </div>
    </Frame>
  );
}

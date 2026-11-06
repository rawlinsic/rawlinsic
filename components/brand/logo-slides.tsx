/* Logo section of the brand guide: today's logo, Nicole's concepts,
   six directions (each on light, dark, small, favicon and a slide),
   wordmark typefaces, the 16-pixel test, and the decision. */
import type { CSSProperties, ReactNode } from "react";
import { Frame, Head, type SlideProps } from "@/components/brand/color-slides";
import { Fit, Route } from "@/components/brand/mocks";
import { Boxed, CONCEPTS, Lockup, Mark, Stage, type Concept, type ConceptId } from "@/components/brand/logos";
import { WORDMARK_FONTS } from "@/lib/content/brand-guide";

const CUR = "/images/brand/current";
const pad = (n: number) => String(n).padStart(2, "0");

/* ── opener ───────────────────────────────────────────────────── */
export function LogoOpener(p: SlideProps) {
  return (
    <Frame {...p} dark section="Logo" className="op">
      <div className="mk-grid" />
      <Route w={1920} h={1080} nodes={4} className="op-route" />
      <p className="op-n">02</p>
      <h2 className="op-t">Logo</h2>
      <p className="op-line">Exploration only. Nicole decides.</p>
      <ol className="op-steps">
        <li><b>1</b>Where we are<span>Today's logo and your concepts</span></li>
        <li><b>2</b>Six directions<span>3 from your concepts, 3 new</span></li>
        <li><b>3</b>Pick one to refine<span>Then final files, favicon, embroidery</span></li>
      </ol>
    </Frame>
  );
}

/* ── today ────────────────────────────────────────────────────── */
export function LogoToday(p: SlideProps) {
  return (
    <Frame {...p} section="Logo" className="lt">
      <Head k="Logo · Where we are" t="Today's logo" sub="Script wordmark in a box, from the 2025 guide. Files: Rawlins Branding › FINAL rawlins logos." />
      <div className="lt-row">
        <figure className="lt-main"><img src="/images/pages/rawlinslogo-square.png" alt="Rawlins box logo" /><figcaption>Primary (box)</figcaption></figure>
        <div className="lt-side">
          <figure><img src={`${CUR}/letters-blue.svg`} alt="Rawlins wordmark" style={{ height: 70 }} /><figcaption>Wordmark</figcaption></figure>
          <figure className="lt-dark"><img src={`${CUR}/letters-white.svg`} alt="Rawlins wordmark, white" style={{ height: 70 }} /><figcaption>Wordmark, reversed</figcaption></figure>
          <figure><img src={`${CUR}/r-icon-black.svg`} alt="R icon" style={{ height: 110 }} /><figcaption>R icon</figcaption></figure>
        </div>
      </div>
      <div className="lt-notes">
        <div className="lt-keep">
          <p className="lt-h">Keep</p>
          <ul>
            <li><b>The name: Rawlins.</b> Nothing else.</li>
            <li><b>A rectangular logo.</b> Scott's condition (via Ben, Jun 23).</li>
            <li><b>The underline.</b> It can become our route line.</li>
          </ul>
        </div>
        <div className="lt-fix">
          <p className="lt-h">Hard today</p>
          <ul>
            <li><b>Script breaks down small.</b> At 16 px it's a blur:</li>
            <li className="lt-tiny"><img src={`${CUR}/letters-blue.svg`} alt="" style={{ height: 16 }} /><img src={`${CUR}/r-icon-black.svg`} alt="" style={{ height: 16 }} /><span>actual size</span></li>
            <li><b>Doesn't match the site's type</b> (Source Sans 3).</li>
            <li><b>Glow and lines</b> have no home in it yet.</li>
          </ul>
        </div>
      </div>
    </Frame>
  );
}

/* ── your concepts ────────────────────────────────────────────── */
export function LogoYours(p: SlideProps) {
  return (
    <Frame {...p} dark section="Logo" className="ly">
      <div className="mk-grid" />
      <Head k="Logo · Your concepts" t="What you liked" sub="Three ideas worth keeping, with three flags." />
      <div className="ly-row">
        <figure><img src="/images/brand/concepts/concept-r-arrow.jpg" alt="R monogram with arrow concept" /><figcaption><b>R with arrow</b>Progress, momentum</figcaption></figure>
        <figure><img src="/images/brand/concepts/concept-circuit-node-a.webp" alt="Circuit R and node wordmark concepts" /><figcaption><b>Circuit R · node on the a</b>Engineering meets technology</figcaption></figure>
        <figure><img src="/images/brand/concepts/concept-circuit-node-b.webp" alt="Glowing circuit R and node wordmark concepts" /><figcaption><b>Glowing circuit · node wordmark</b>Light on navy</figcaption></figure>
      </div>
      <ol className="ly-flags">
        <li><b>“Engineering + Technology” is not approved.</b> We are just Rawlins. No descriptor under the logo.</li>
        <li><b>These are renders, not artwork.</b> Bevels, metal and glow are effects. A logo must work flat, in one color, embroidered and at 16 px.</li>
        <li><b>Glow is for screens.</b> Print, embroidery and Office files get the flat version.</li>
      </ol>
    </Frame>
  );
}

/* ── six directions ───────────────────────────────────────────── */
export function LogoDirections(p: SlideProps) {
  return (
    <Frame {...p} section="Logo" className="ld">
      <Head k="Logo · Directions" t="Six directions" sub="Three rebuilt from your concepts, three new. All drawn as clean vectors." />
      <div className="ld-grid">
        {CONCEPTS.map((c) => (
          <article key={c.id}>
            <Stage tone="dark" glow className="ld-tile"><div className="mk-grid" /><Lockup id={c.id} h={c.id === "route" || c.id === "nodeword" ? 74 : 84} /></Stage>
            <p className="ld-name"><b>{c.n}</b>{c.name}<em className={c.from === "yours" ? "is-yours" : ""}>{c.from === "yours" ? "From your concepts" : "New"}</em></p>
          </article>
        ))}
      </div>
    </Frame>
  );
}

/* a title slide carrying the logo (1920×1080) */
function TitleSlide({ id }: { id: ConceptId }) {
  return (
    <div className="mk lg-slide">
      <div className="mk-grid" />
      <Route w={1920} h={1080} nodes={4} faint={false} />
      <Stage tone="dark" glow className="lg-slide-logo"><Lockup id={id} h={84} /></Stage>
      <div className="lg-slide-copy">
        <p className="mk-eyebrow">AASHTO Annual Meeting · Louisville</p>
        <h3>Getting programs and projects built</h3>
      </div>
      <Stage tone="dark" className="lg-slide-foot"><Mark id={id} size={56} /><span>rawlinsic.com</span></Stage>
    </div>
  );
}

function Favicon({ id }: { id: ConceptId }) {
  return (
    <div className="lg-fav">
      <div className="lg-fav-tabs">
        <span className="lg-fav-tab is-on"><Stage tone="light" className="lg-fav-ic"><Mark id={id} size={16} /></Stage>Rawlins | Consulting for…<i>×</i></span>
        <span className="lg-fav-tab"><span className="lg-fav-ph" />Inbox<i>×</i></span>
      </div>
      <div className="lg-fav-url"><span>rawlinsic.com</span></div>
    </div>
  );
}

/* ── one concept ──────────────────────────────────────────────── */
export function ConceptSlide({ c, ...p }: SlideProps & { c: Concept }) {
  const big = c.id === "route" || c.id === "nodeword" ? 140 : 156;
  return (
    <Frame {...p} section="Logo" className="lc">
      <div className="lc-top">
        <Head k={`Logo · Direction ${c.n} of ${CONCEPTS.length} · ${c.from === "yours" ? "from your concepts" : "new"}`} t={<><span className="lc-n">{c.n}</span>{c.name}</>} sub={c.says} />
        <p className="lc-meta"><span>Type: {c.font}</span><span>Watch: {c.watch}</span></p>
      </div>
      <div className="lc-grid">
        <div className="lc-left">
          <Stage tone="dark" glow className="lc-dark"><div className="mk-grid" /><Lockup id={c.id} h={big} /><span className="lc-tag">On dark (glow, screens)</span></Stage>
          <div className="lc-pair">
            <Stage tone="light" className="lc-light"><Lockup id={c.id} h={big * 0.5} /><span className="lc-tag">On light (flat)</span></Stage>
            <Stage tone="light" className="lc-boxed"><Boxed id={c.id} h={112} /><span className="lc-tag">Rectangular version</span></Stage>
          </div>
        </div>
        <div className="lc-right">
          <div className="lc-sizes">
            <p className="lc-h">Small sizes <em>actual pixels</em></p>
            <Stage tone="light" className="lc-row">{[64, 48, 32, 16].map((s) => <span key={s}><Mark id={c.id} size={s} /><i>{s}</i></span>)}<span className="lc-mono"><Stage tone="mono-light"><Mark id={c.id} size={48} /></Stage><i>1 color</i></span></Stage>
            <Stage tone="dark" glow className="lc-row lc-row-dark">{[64, 48, 32, 16].map((s) => <span key={s}><Mark id={c.id} size={s} /><i>{s}</i></span>)}<span className="lc-mono"><Stage tone="mono-dark"><Mark id={c.id} size={48} /></Stage><i>1 color</i></span></Stage>
          </div>
          <div>
            <p className="lc-h">Favicon</p>
            <Favicon id={c.id} />
          </div>
          <div>
            <p className="lc-h">On a slide</p>
            <Fit w={540} iw={1920} ih={1080}><TitleSlide id={c.id} /></Fit>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ── wordmark typefaces ───────────────────────────────────────── */
export function LogoType(p: SlideProps) {
  return (
    <Frame {...p} section="Logo" className="lw">
      <Head k="Logo · Wordmark type" t="Wordmark typeface options" sub="All free for print and commercial use (SIL Open Font License). Where each one works, checked live Nov 5, 2026." />
      <div className="lw-table">
        <p className="lw-hd"><span /><span>Office (Word, PowerPoint)</span><span>Canva</span><span>Adobe Express</span></p>
        {WORDMARK_FONTS.map((f) => (
          <div key={f.name} className="lw-row">
            <p className="lw-sample" style={{ fontFamily: f.cssVar } as CSSProperties}>
              <span>Rawlins</span><span className="lw-lc">rawlins</span>
              <em>{f.name}{f.note ? ` · ${f.note}` : ""}</em>
            </p>
            {[f.office, f.canva, f.adobe].map((v, k) => <span key={k} className={`lw-v lw-${v.ok}`}>{v.label}</span>)}
          </div>
        ))}
      </div>
      <ul className="lw-notes">
        <li><b>Office:</b> only Source Sans Pro is built in (a Microsoft cloud font). Others: install on each computer and embed in the file.</li>
        <li><b>Canva:</b> its built-in list can only be checked signed in. Any of these can be uploaded on Canva Pro or Teams.</li>
        <li><b>Adobe Express:</b> free plans get part of Adobe Fonts; Premium gets all of it.</li>
        <li><b>Today's script (Magneto):</b> not free. It comes with Office, but it isn't ours to use everywhere.</li>
        <li><b>The logo ships as artwork</b> (SVG, PNG, AI), so nobody needs the font to use the logo itself.</li>
      </ul>
    </Frame>
  );
}

/* ── the 16-pixel test ────────────────────────────────────────── */
export function LogoSmall(p: SlideProps) {
  return (
    <Frame {...p} section="Logo" className="ls">
      <Head k="Logo · Small sizes" t="The 16-pixel test" sub="Favicons, app icons, LinkedIn avatars and embroidered polos all live here. Actual pixels." />
      <div className="ls-grid">
        <p className="ls-hd"><span /><span>64</span><span>32</span><span>16</span><span>Dark 32</span><span>Dark 16</span></p>
        <div className="ls-row">
          <p className="ls-name">Today · R icon</p>
          {[64, 32, 16].map((s) => <span key={s}><img src={`${CUR}/r-icon-black.svg`} alt="" style={{ height: s }} /></span>)}
          {[32, 16].map((s) => <span key={s} className="ls-dark"><img src={`${CUR}/r-icon-white.svg`} alt="" style={{ height: s }} /></span>)}
        </div>
        {CONCEPTS.map((c) => (
          <div key={c.id} className="ls-row">
            <p className="ls-name"><b>{c.n}</b> {c.name}</p>
            {[64, 32, 16].map((s) => <Stage key={s} tone="light" className="ls-cell"><Mark id={c.id} size={s} /></Stage>)}
            {[32, 16].map((s) => <Stage key={s} tone="dark" className="ls-cell ls-dark"><Mark id={c.id} size={s} /></Stage>)}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ── decide ───────────────────────────────────────────────────── */
export function LogoDecide(p: SlideProps) {
  return (
    <Frame {...p} dark section="Logo" className="dc lgd">
      <div className="mk-grid" />
      <Head k="Logo · Decision" t="Pick a direction to refine" />
      <div className="lgd-row">
        {CONCEPTS.map((c) => (
          <Stage key={c.id} tone="dark" glow className="lgd-opt"><span className="lgd-n">{pad(c.n)}</span><Mark id={c.id} size={88} /><b>{c.name}</b></Stage>
        ))}
        <div className="lgd-opt lgd-keep"><span className="lgd-n">00</span><img src={`${CUR}/letters-white.svg`} alt="" style={{ height: 40 }} /><b>Keep today's</b></div>
      </div>
      <div className="dc-row lgd-two">
        <div className="dc-pick">
          <p className="dc-h">Our take</p>
          <ul>
            <li><b>If the rectangle is a must:</b> 5 Framed. Same box and underline, modern type, one lit corner.</li>
            <li><b>If Scott is open:</b> 6 Node R for the icon with a clean wordmark. The simplest, clearest R at 16 px.</li>
            <li><b>Most like your concepts:</b> 2 Circuit R, using its simple version under 32 px.</li>
          </ul>
        </div>
        <div className="dc-flow">
          <p className="dc-h">After you pick</p>
          <ol>
            <li><b>1</b>Two refinement rounds<span>Spacing, weight, wordmark type</span></li>
            <li><b>2</b>Scott's yes<span>Through Ben, like the name</span></li>
            <li><b>3</b>Final files<span>AI, SVG, PNG, EPS; favicon; Office, Canva, Adobe Express</span></li>
            <li><b>4</b>Embroidery test<span>New .dst from the flat one-color version</span></li>
          </ol>
        </div>
      </div>
    </Frame>
  );
}

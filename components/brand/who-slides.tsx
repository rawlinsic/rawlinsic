/* "Who we are": the brand's story told through people, growth and how we
   work together, not a mission statement or a values poster.
   Sources: site copy (lib/content/site.ts), Allison Black's Culture
   Commitment Statements (finalized Sep 16, 2026, from the 2026 retreat's
   Strengthening Our Culture session) and Jacob Michaels' Aug 5, 2026 note
   on culture and brand. */
import { readdirSync } from "fs";
import path from "path";
import { Frame, Head, type SlideProps } from "@/components/brand/color-slides";
import { Fit, Logo, Route } from "@/components/brand/mocks";
import { HOME, LEADERS, STORY } from "@/lib/content/site";
import { STORY_PHOTO } from "@/lib/content/v8";

const pad = (n: number) => String(n).padStart(2, "0");
const TEAM = "/images/team";

/* the five commitments, as finalized Sep 16, 2026 (Allison Black) */
export const COMMITMENTS: [string, string][] = [
  ["Put Team Success First", "We support one another, remain open to different approaches, and let go of individual preferences when another direction better serves the team's goal to serve the client."],
  ["Communicate Early and Clearly", "We share relevant information and context, set and clarify expectations, confirm understanding, and communicate promptly when priorities, timelines, or commitments change."],
  ["Seek the Right Perspectives", "We involve people based on their expertise and availability, invite different viewpoints, and build on one another's strengths and ideas."],
  ["Treat Others with Respect", "We communicate constructively, show appreciation and give credit for others' contributions, and address behaviors that undermine a respectful and productive workplace."],
  ["Own the Outcome", "We clarify roles, honor commitments, address recurring issues, and take responsibility for keeping work moving as a team."],
];
const ALLISON_SRC = "Source: Culture Commitment Statements, finalized Sep 16, 2026. Led by Allison Black from the 2026 retreat's Strengthening Our Culture session.";

/* ── the short version ────────────────────────────────────────── */
export function WhoShort(p: SlideProps) {
  const lines: [string, boolean][] = [
    ["Established in 2017. Based in Reno, Nevada.", false],
    ["Our people ran the programs our clients run.", false],
    ["They work next to a team that builds the tools.", false],
    [HOME.line, true],
  ];
  return (
    <Frame {...p} dark section="Who we are" className="ws">
      <div className="mk-grid" />
      <Head k="Who we are · The short version" t="Four lines, no mission statement" />
      <div className="ws-row">
        <ol className="ws-lines">
          {lines.map(([t, it], k) => <li key={t} className={it ? "is-it" : ""}><i className="ws-node" /><span className="ws-n">{pad(k + 1)}</span>{t}</li>)}
        </ol>
        <div className="ws-photo"><img src={STORY_PHOTO[0]} alt="" /><div className="mk-grid" /><Route w={520} h={640} nodes={3} faint={false} /></div>
      </div>
      <p className="vt-src ws-src">Lines from the website copy. The home headline is still with Ben and Scott.</p>
    </Frame>
  );
}

/* ── the people ───────────────────────────────────────────────── */
function teamPhotos(): string[] {
  try {
    return readdirSync(path.join(process.cwd(), "public", "images", "team")).filter((f) => f.endsWith(".webp")).sort();
  } catch {
    return [];
  }
}
export function WhoPeople(p: SlideProps) {
  const faces = teamPhotos();
  const leaders = LEADERS.filter((l) => ["scott", "april", "darawheeler", "rex", "mayela", "joey"].includes(l.photo));
  return (
    <Frame {...p} section="Who we are" className="wp">
      <Head k="Who we are · The people" t="We've done the job" sub="Chief engineers, CIOs, maintenance directors and federal program executives, on the same team as the people who build the tools." />
      <div className="wp-row">
        <div className="wp-wall">{faces.map((f) => <img key={f} src={`${TEAM}/${f}`} alt="" loading="lazy" />)}</div>
        <ul className="wp-leaders">
          {leaders.map((l) => (
            <li key={l.name}><img src={`${TEAM}/${l.photo}.webp`} alt="" /><p><b>{l.name}</b>{l.role}</p></li>
          ))}
        </ul>
      </div>
      <p className="vt-src">Photos from the team roster on the website. Roles as written on the site's Who we are page.</p>
    </Frame>
  );
}

/* ── how we've grown ──────────────────────────────────────────── */
export function WhoGrown(p: SlideProps) {
  const pts: [number, number][] = [[240, 930], [710, 830], [1180, 730], [1650, 630]];
  const d = pts.reduce((acc, [x, y], k) => (k ? `${acc} C ${pts[k - 1][0] + 220} ${pts[k - 1][1]} ${x - 220} ${y} ${x} ${y}` : `M0 960 Q 120 930 ${x} ${y}`), "") + " Q 1780 560 1920 520";
  return (
    <Frame {...p} dark section="Who we are" className="wg">
      <div className="mk-grid" />
      <Head k="Who we are · How we've grown" t="Same people, more ways to help" />
      <svg className="wg-route" viewBox="0 0 1920 1080" aria-hidden="true">
        <path className="mk-line" d={d} />
        {pts.map(([x, y], k) => <g key={k} className="mk-node" transform={`translate(${x} ${y})`}><circle className="mk-halo" r="26" /><circle className="mk-ring" r="12" /><circle className="mk-dot" r="5" /></g>)}
      </svg>
      {STORY.map(([stage, title, body], k) => (
        <article key={stage} className="wg-stage" style={{ left: pts[k][0] - 170, top: pts[k][1] - 420 }}>
          <img src={STORY_PHOTO[k]} alt="" />
          <p className="wg-k">{pad(k + 1)} · {stage}</p>
          <h3>{title}</h3>
          <p className="wg-b">{body}</p>
        </article>
      ))}
    </Frame>
  );
}

/* ── how we work together (Allison's commitments) ─────────────── */
export function WhoCommitments(p: SlideProps) {
  return (
    <Frame {...p} section="Who we are" className="wc">
      <Head k="Who we are · How we work together" t="Five commitments we made to each other" sub="Written with the whole team after the 2026 retreat. Not a poster: a way of working." />
      <ol className="wc-grid">
        {COMMITMENTS.map(([t, d], k) => (
          <li key={t}><span className="wc-n">{pad(k + 1)}</span><h3>{t}</h3><p>{d}</p></li>
        ))}
      </ol>
      <p className="wc-obs"><b>What the team said:</b> keep the collaborative, supportive culture we have. Be clearer, more consistent and more accountable about it as we grow.</p>
      <p className="vt-src">{ALLISON_SRC}</p>
    </Frame>
  );
}

/* ── culture is brand ─────────────────────────────────────────── */
function KickoffSlide() {
  const pts: [number, number][] = [[260, 690], [620, 560], [980, 640], [1340, 500], [1700, 580]];
  const d = pts.reduce((acc, [x, y], k) => (k ? `${acc} C ${pts[k - 1][0] + 150} ${pts[k - 1][1]} ${x - 150} ${y} ${x} ${y}` : `M0 740 Q 120 720 ${x} ${y}`), "") + " Q 1820 560 1920 520";
  return (
    <div className="mk wk-slide">
      <div className="mk-grid" />
      <p className="mk-eyebrow">Project kickoff</p>
      <h3>How we'll work together</h3>
      <svg viewBox="0 0 1920 1080" aria-hidden="true"><path className="mk-line" d={d} />{pts.map(([x, y], k) => <g key={k} className="mk-node" transform={`translate(${x} ${y})`}><circle className="mk-halo" r="22" /><circle className="mk-dot" r="8" /></g>)}</svg>
      {COMMITMENTS.map(([t], k) => <p key={t} className="wk-lab" style={{ left: pts[k][0] - 150, top: pts[k][1] + 46 }}>{t}</p>)}
      <Logo dark h={56} style={{ position: "absolute", left: 120, bottom: 70 }} />
    </div>
  );
}
function ShoutOut() {
  return (
    <div className="mk wk-shout">
      <div className="mk-grid" />
      <Route w={1080} h={1080} nodes={3} faint={false} />
      <p className="mk-eyebrow">Shout-out</p>
      <h3>Own the Outcome</h3>
      <p className="wk-body">Thank you, First Last, for keeping the work moving when the schedule changed.</p>
      <Logo dark h={60} style={{ position: "absolute", left: 80, bottom: 76 }} />
    </div>
  );
}
function WelcomeCard() {
  return (
    <div className="mk wk-card">
      <span className="mk-card-bar" />
      <p className="mk-kick">Welcome to Rawlins</p>
      <ol>{COMMITMENTS.map(([t], k) => <li key={t}><b>{k + 1}</b>{t}</li>)}</ol>
      <Logo h={44} style={{ position: "absolute", left: 790, bottom: 56 }} />
    </div>
  );
}
export function WhoBrand(p: SlideProps) {
  return (
    <Frame {...p} section="Who we are" className="wb">
      <div className="wb-top">
        <Head k="Who we are · Culture is brand" t={<span className="wb-q">“Culture is brand, brand is culture.”</span>} sub="Jacob Michaels, Aug 5, 2026. To hone one is to hone the other." />
        <ul className="wb-where">
          <li>New team member onboarding</li><li>Team and project kickoffs</li><li>Feedback and recognition</li><li>Visual and communication materials</li>
        </ul>
      </div>
      <p className="wb-h">Where the commitments can show up <em>ideas for Allison and the admin team</em></p>
      <div className="wb-row">
        <Fit w={680} iw={1920} ih={1080} label="Kickoff slide"><KickoffSlide /></Fit>
        <Fit w={382} iw={1080} ih={1080} label="Recognition post (Teams, Slack or LinkedIn)"><ShoutOut /></Fit>
        <Fit w={400} iw={1050} ih={600} label="Onboarding card"><WelcomeCard /></Fit>
      </div>
      <p className="vt-src">Where they show up: Allison Black's plan for the commitments (Sep 16, 2026). Quote: Jacob Michaels in Slack, Aug 5, 2026.</p>
    </Frame>
  );
}

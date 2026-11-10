/* Home (v8). Moves like scale.com: smooth scrolling, and every section is a
   panel that slides up over the one before it. The story, in order:
   1 who we are, with the five areas as photo panels   2 what we do, area by area (held chapters)   3 why us (a
   card that lights up, then the proof)   4 who we work with (a ring of
   photos)   5 our work   6 how we've grown   7 what's new   8 start a
   conversation. Words come from the content layer. Dev-only marks never
   reach production. Full site pass Part 5: the hero panels are the doors (no
   quotes); What we do pairs what clients say with what we bring, beside each
   area's featured project; Why Rawlins keeps its card and five tabs. */
import type { CSSProperties } from "react";
import { AREAS, CASES, HOME, NUMBERS, PROBLEMS, STEPS, VISIBLE_INDUSTRIES, WHY, areaHref, caseById, caseHref, caseTag, industryHref, isOurs, serviceById, subsectorHref } from "@/lib/content/site";
import { AREAS as AREA_DATA } from "@/lib/content/catalog";
import { AREA_PHOTO, HOME_CLOSING_PHOTO, INDUSTRY_PHOTO } from "@/lib/content/media";
import { NEWS, EVENTS, isUpcoming } from "@/lib/content/news";
import { themeStyle, casePhoto, FEATURED_CASES, STORY_PHOTO } from "@/lib/content/v8";
import { Diagram } from "@/components/v8/diagram";
import Scene from "@/components/v8/scene";
import Grown from "@/components/v8/grown";
import FlowHero from "@/components/v8/flow-hero";
import LitText from "@/components/v8/lit-text";
import Tabs from "@/components/v8/tabs";
import Rail from "@/components/v8/rail";
import Panels from "@/components/v8/panels";
import Chapters from "@/components/v8/chapters";
import Orbit, { type Tile } from "@/components/v8/orbit";
import { stripPeople, veteranPeople } from "@/components/site/more";
import PeopleStrip from "@/components/v8/people-strip";
import SkipNext from "@/components/v8/skip-next";

const PROD = process.env.VERCEL_ENV === "production";
const q = (s: string) => `“${s.replace(/[.”"]+$/, "")}.”`;
const areaOf = (serviceId: string) => serviceById(serviceId)?.area;
/* off the photo ring in production: no Rawlins work there yet (g-capital, g-mpo), and placeholder
   photos (sub-rail; sub-ports, Philadelphia from the Ben Franklin Bridge). Previews show them,
   labeled (full site pass, Part 1, 2.4 and Part 4, 1). */
const OFF_RING: Record<string, string> = { "g-capital": "No project yet", "g-mpo": "No project yet", "sub-rail": "Placeholder photo", "sub-ports": "Placeholder photo" };

export default function Home() {
  /* Featured projects: Rawlins work only (no Before Rawlins cases) */
  const cases = FEATURED_CASES.map((id) => CASES.find((c) => c.id === id)!).filter((c) => c && isOurs(c));
  /* previews also show the unverified number, marked (Part 4, 1) */
  const numbers = NUMBERS.filter((n) => n.verified || !PROD);
  const news = NEWS.filter((n) => !n.placeholder || !PROD).slice(0, 3);
  const ev = EVENTS.filter((e) => (!e.placeholder || !PROD) && isUpcoming(e))[0];
  const pdn = CASES.find((c) => c.id === "cs-pdn")!;
  /* the five reasons in display order; each tab keeps its own proof (Part 5, 1.3) */
  const why = WHY;
  const people = stripPeople();
  const veterans = veteranPeople();
  // the ring: each industry, then its specialties, dealt round so they spread out
  const groups: Tile[][] = VISIBLE_INDUSTRIES.map((i) => [
    { src: INDUSTRY_PHOTO[i.id], label: i.name, href: industryHref(i), sub: i.who },
    ...i.subsectors.filter((sb) => INDUSTRY_PHOTO[sb.id] && (!PROD || !OFF_RING[sb.id])).map((sb) => ({ src: INDUSTRY_PHOTO[sb.id], label: sb.name, href: subsectorHref(i, sb), sub: i.name, note: OFF_RING[sb.id] })),
  ]);
  const tiles: Tile[] = [];
  for (let r = 0; tiles.length < groups.flat().length; r++) groups.forEach((g) => { if (g[r]) tiles.push(g[r]); });

  return (
    <Panels>
      {/* 0 · the opening: the moving background on top, then Nicole's section right
          below it, as it was: small tagline, headline, line, buttons, event note, the
          five areas. One panel, so it scrolls away normally. */}
      <div className="h-open">
      <FlowHero next="#h-title" />

      {/* 1 · who we are */}
      <section className="h-hero" aria-labelledby="h-title">
        <div className="v8-wrap h-hero-top">
          {HOME.eyebrow && <p className="h-tag" data-reveal>{HOME.eyebrow}</p>}
          <h1 id="h-title" className="h-title" data-reveal>{HOME.headline}</h1>
          <div className="h-side" data-reveal>
            <p className="h-line">{HOME.line}</p>
            <div className="v8-actions">
              <a className="v8-btn" href="/contact">Get in touch</a>
              <a className="v8-btn v8-btn-ghost" href="#what">See what we do</a>
            </div>
            {ev?.line && <p className="h-event"><a href="/contact">{ev.line} <b>Plan to meet us</b></a></p>}
          </div>
        </div>
        <ul className="ways" aria-label="What we do">
          {AREAS.map((a) => (
            <li key={a.id} className="way" style={themeStyle(a.id)}>
              <a href={areaHref(a)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={AREA_PHOTO[a.id]} alt="" />
                <span className="way-txt">
                  <b>{a.name}</b>
                  <em>{a.tag}</em>
                  <span className="way-more">Explore {a.name}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      </div>

      {/* 2 · what we do, area by area */}
      <Chapters
        intro={{ k: "What we do", h: "What we hear, and what we bring.", lead: "Like many organizations today, you’re facing complex, interconnected challenges: technology-driven transformation, resource constraints, and shifting regulatory demands. That's where we come in. From strategy and proven frameworks to the systems and products that put them to work, we help you turn decisions into action." }}
        items={AREAS.map((a) => {
          const L = AREA_DATA[a.id];
          const fc = a.featuredCase ? caseById(a.featuredCase) : undefined;
          return {
            id: a.id, name: a.name, tag: a.tag, lead: L.lead, href: areaHref(a),
            /* the first two "What we hear / What we bring" pairs (Part 5, 2) */
            pairs: L.hear.slice(0, 2).map((h, k) => ({ q: q(h), b: L.bring?.[k] ?? "" })),
            /* the area's featured project, not the area photo the hero already shows */
            photo: fc ? casePhoto(fc) : AREA_PHOTO[a.id],
            project: fc ? { title: fc.title, href: caseHref(fc) } : undefined,
            services: a.services.map((sv) => ({ name: sv.name, href: `/services/${a.slug}/${sv.slug}` })),
          };
        })}
      />

      {/* 3 · why us: the card holds while the sentence lights up */}
      <Scene steps={1} per={90} className="wc" label="Why Rawlins">
        <div className="wc-in">
          <div className="wc-card">
            <PeopleStrip people={people} showDev={!PROD} />
            <div className="wc-copy">
              <p className="v8-eyebrow">Why Rawlins</p>
              <LitText className="wc-lit" text="Our people have run the programs you run. They do the work themselves, with an in-house team that builds the tools." />
            </div>
          </div>
        </div>
      </Scene>

      {/* the proof: holds while scrolling steps through each reason */}
      <Scene steps={5} per={60} className="h-why hw" label="What sets us apart">
        <div className="v8-wrap">
          <div className="h-why-head h-row-head" data-reveal>
            <h2 id="h-why" className="v8-h2">What sets us apart</h2>
            <SkipNext />
          </div>
          <div data-reveal>
            <Tabs label="What sets us apart" labels={why.map((w) => w[0])}>
              <div className="why-p">
                <p className="why-text">{why[0][1]}</p>
                <PeopleStrip people={veterans} across showDev={!PROD} />
                <a className="v8-link" href="/about/our-people">Meet our people</a>
              </div>
              <div className="why-p">
                <p className="why-text">{why[1][1]}</p>
                <dl className="nums">{numbers.map((n) => <div key={n.label}>{!n.verified && <em className="v8-dev">Placeholder: number not verified yet.</em>}<dt>{n.label}</dt><dd>{n.value}</dd></div>)}</dl>
              </div>
              <div className="why-p">
                <p className="why-text">{why[2][1]}</p>
                <a className="proof" href={caseHref(pdn)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={casePhoto(pdn)} alt="" loading="lazy" />
                  <span><em>From our work</em><b>{pdn.title}</b><span>{pdn.who}</span></span>
                </a>
              </div>
              <div className="why-p" style={themeStyle("tech")}>
                <p className="why-text">{why[3][1]}</p>
                <Diagram kind="hub" steps={AREA_DATA.tech.feature.steps} center="The systems you already own" />
              </div>
              <div className="why-p" style={themeStyle("strategy")}>
                <p className="why-text">{why[4][1]}</p>
                <Diagram kind="track" detail steps={STEPS.map(([t, d]) => ({ t, d }))} />
                <a className="v8-link" href="/about/how-we-work">How we work</a>
              </div>
            </Tabs>
          </div>
        </div>
      </Scene>

      {/* 4 · who we work with: a ring of photos around the headline */}
      <Orbit tiles={tiles}>
        <p className="v8-eyebrow">Who we work with</p>
        <h2 id="orb-h" className="orb-h">Public agencies and private firms, <span>wherever the work is.</span></h2>
        <p className="v8-lead">More than 30 transportation agencies, plus local governments, a multi-state research program, contractors, and engineering firms. Our work so far has been in the United States, and our team can work anywhere.</p>
      </Orbit>

      {/* 5 · our work */}
      <section className="h-work" aria-labelledby="h-work">
        <div className="v8-wrap">
          <div className="h-row-head" data-reveal>
            <div><p className="v8-eyebrow">Our work</p><h2 id="h-work" className="v8-h2">Featured projects</h2></div>
            <a className="v8-link" href="/insights/case-studies">All projects</a>
          </div>
          <Rail label="Projects">
            {cases.map((c) => {
              const areas = Array.from(new Set(c.services.map((s) => areaOf(s)?.id).filter(Boolean) as string[]));
              return (
                <li key={c.id} className="pc">
                  <a href={caseHref(c)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={casePhoto(c)} alt="" loading="lazy" />
                    <span className={`pc-status${c.status === "Ongoing" ? " is-live" : ""}`}>{caseTag(c)}</span>
                    <b>{c.title}</b>
                    <span className="pc-who">{c.who}</span>
                    <span className="pc-areas">{areas.map((id) => <i key={id} style={themeStyle(id)}>{AREAS.find((a) => a.id === id)!.name}</i>)}</span>
                  </a>
                </li>
              );
            })}
          </Rail>
        </div>
      </section>

      {/* 6 · how we've grown: slides sideways as you scroll (shared with Who we are) */}
      <Grown eyebrow="Our story" title="From our story to yours." link={{ href: "/about/who-we-are", label: "Who we are" }} />

      {/* 7 · what's new */}
      <section className="h-new" aria-labelledby="h-new">
        <div className="v8-wrap">
          <div className="h-row-head" data-reveal><div><p className="v8-eyebrow">What&apos;s new</p><h2 id="h-new" className="v8-h2">Where we&apos;ll be, and what we&apos;re up to</h2></div><a className="v8-link" href="/insights/news">News &amp; recognition</a></div>
          <div className="newsgrid">
            {ev && (
              <article className="ev" data-reveal>
                <span className="ev-when">{ev.when}</span>
                <b>{ev.title}</b>
                {ev.where && <span className="ev-where">{ev.where}</span>}
                {ev.note && <p>{ev.note}</p>}
                <a className="v8-btn v8-btn-light" href="/contact">Plan to meet us</a>
              </article>
            )}
            {news.map((n) => (
              <article key={n.title} className={`nw${n.placeholder ? " is-dev" : ""}`} data-reveal>
                <span className="nw-tag">{n.tag}{n.date ? ` · ${n.date}` : ""}</span>
                <b>{n.href ? <a href={n.href} {...(/^http/.test(n.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{n.title}</a> : n.title}</b>
                {n.text && <p>{n.text}</p>}
                {n.placeholder && !PROD && <em className="v8-dev">Placeholder (preview only): {n.placeholder}</em>}
              </article>
            ))}
            <a className="pod" href="/insights/podcast" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pages/insights-card-3.webp" alt="" loading="lazy" />
              <span><em>Podcast</em><b>The Rawlins Way</b></span>
            </a>
          </div>
        </div>
      </section>

      {/* 8 · start a conversation */}
      <section className="h-start" aria-labelledby="h-start">
        {/* a still photo for now (Detroit at night); a licensed U.S. clip can replace it later */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="h-start-video" src={HOME_CLOSING_PHOTO} alt="" loading="lazy" aria-hidden="true" />
        <div className="v8-wrap h-start-in" data-reveal>
          <h2 id="h-start" className="v8-h2">Tell us what you&apos;re trying to fix.</h2>
          <p className="v8-lead">Start with the one that sounds most like you, or write your own.</p>
          <ul className="starts">
            {PROBLEMS.map((p) => {
              const a = areaOf(p.services[0]);
              const href = `/contact?topic=${encodeURIComponent(a?.name ?? "Not sure")}&msg=${encodeURIComponent(p.q + ".")}`;
              return <li key={p.q}><a href={href} style={a ? themeStyle(a.id) : undefined}>{q(p.q)}</a></li>;
            })}
          </ul>
          <p className="h-start-direct"><a href="/contact">Write your own</a><a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a><a href="tel:+17758433822">(775) 843-3822</a></p>
        </div>
      </section>
    </Panels>
  );
}

/* Home (v8). Moves like scale.com: smooth scrolling, and every section is a
   panel that slides up over the one before it. The story, in order:
   1 who we are, with the five areas as photo panels   2 what we do, area by area (held chapters)   3 why us (a
   card that lights up, then the proof)   4 who we work with (a ring of
   photos)   5 our work   6 how we've grown   7 what's new   8 start a
   conversation. Words come from the content layer. Dev-only marks never
   reach production. Full site pass Part 5: the hero panels are the doors (no
   quotes); What we do pairs what clients say with what we bring, beside each
   area's featured project; Why Rawlins keeps its card and five tabs. */
import ProjectCard from "@/components/v8/project-card";
import FanCards from "@/components/v8/fan-cards";
import type { CSSProperties } from "react";
import { AREAS, CASES, HOME, HOME_STORY, NUMBERS, PROBLEMS, STEPS, INDUSTRIES, VISIBLE_INDUSTRIES, WHY, areaHref, caseById, caseHref, caseTag, industryHref, isOurs, serviceById, serviceHref, subsectorHref, isListed } from "@/lib/content/site";
import { AREAS as AREA_DATA } from "@/lib/content/catalog";
import { AREA_PHOTO, AREA_PHOTO_POS, INDUSTRY_PHOTO } from "@/lib/content/media";
import { CaseNote, Dev } from "@/components/site/ui";
import { NEWS, EVENTS, isUpcoming } from "@/lib/content/news";
import { themeStyle, casePhoto, FEATURED_CASES, STORY_PHOTO } from "@/lib/content/v8";
import { Diagram } from "@/components/v8/diagram";
import Grown from "@/components/v8/grown";
import HeroStory from "@/components/v8/hero-story";
import FixPicker from "@/components/v8/fix-picker";
import LitText from "@/components/v8/lit-text";
import Rail from "@/components/v8/rail";
import Panels from "@/components/v8/panels";
import Chapters from "@/components/v8/chapters";
import WhoRing from "@/components/v8/who-ring";
import { stripPeople, veteranPeople } from "@/components/site/more";
import PeopleStrip from "@/components/v8/people-strip";
import { tvPeople, whyItems } from "@/components/v8/why-items";

const PROD = process.env.VERCEL_ENV === "production";
const q = (s: string) => `“${s.replace(/[.”"]+$/, "")}.”`;
const areaOf = (serviceId: string) => serviceById(serviceId)?.area;

/* the tagline's "•" shows as a short blue line between the two phrases (the
   character stays in the text, so Edit text still finds it) */
const tagline = (t: string) => t.split(/(\s*•\s*)/).map((part, i) => (i % 2 ? <span key={i} className="tag-sep">{part}</span> : part));

/* keep a month and its days on one line ("Nov 15–18") */
const keepDates = (t: string) => t.split(/((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d+(?:[–-]\d+)?)/).map((part, i) => (i % 2 ? <span key={i} className="nowrap">{part}</span> : part));

/* What we do (area by area, "What we hear, and what we bring.") is hidden for now, not deleted (Nicole, Nov 9). true brings it back. */
const SHOW_WHAT_WE_DO = false;
/* What we do: the five areas as fanned photo cards (Nicole, Nov 10, "like the insights"). The expanding tiles
   are kept for the archive: set SHOW_WAYS_TILES to true to bring them back. */
const SHOW_WAYS_TILES = false;
/* The tagline + headline section under the opening story is hidden for now, not deleted (Nicole, Nov 10). true brings it back. */
const SHOW_HOME_INTRO = false;
/* The team box at the end of the opening story ("Our people have run the programs you run", with the team
   strip) is off the home page for now, not deleted (Nicole, Nov 10). true brings it back. */
const SHOW_STORY_TEAM_BOX = false;


export default function Home() {
  /* Featured projects: Rawlins work only (no Before Rawlins cases) */
  const cases = FEATURED_CASES.map((id) => CASES.find((c) => c.id === id)!).filter((c) => c && isOurs(c));
  /* previews also show the unverified number, marked (Part 4, 1) */
  const numbers = NUMBERS.filter((n) => n.verified || !PROD);
  /* this spot shows a project in the works (Nicole, Nov 10: never "contract wins") */
  /* Nov 11: this was the Nevada aeronautics research (cs-aerodiv). Nicole asked whether we're allowed to talk about
     it, and our records don't show the department's OK, so this spot shows a project that is on the live site by name. */
  const wip = caseById("cs-proficiency");
  const news = NEWS.filter((n) => !n.offHome && (n.tag === "Project" || !n.placeholder || !PROD)).slice(0, 3);
  const ev = EVENTS.filter((e) => (!e.placeholder || !PROD) && isUpcoming(e))[0];
  const pdn = CASES.find((c) => c.id === "cs-pdn")!;
  /* the five reasons in display order; each tab keeps its own proof (Part 5, 1.3) */
  const why = WHY;
  const people = stripPeople();
  const veterans = veteranPeople();
  /* the TV in "We've done the job": everyone, in the order components/v8/why-items.tsx sets (shared with Who we are) */
  const everyone = tvPeople(people);

  return (
    <Panels>
      {/* 0 · the opening: the moving background on top, then Nicole's section right
          below it, as it was: small tagline, headline, line, buttons, event note, the
          five areas. One panel, so it scrolls away normally. */}
      <div className="h-open">
      {/* the hero as a scroll story (Nicole, Nov 9): the video zooms out into the glass
          frame, bounces side to side with her words, then turns into the team strip
          beside the Why Rawlins panel */}
      <HeroStory
        next="#what-we-do"
        video={{ src: "/videos/home-hero-story-v3.mp4", poster: "/images/pages/home-hero-story-poster.jpg" }}
        hero={
          <div className="fh-center">
            {HOME.eyebrow && <p className="fh-tag">{tagline(HOME.eyebrow)}</p>}
            <h1 className="fh-title">{HOME.headline}</h1>
          </div>
        }
        steps={[
          /* side one: How we work, with the five service areas as still tiles in the frame (each opens its page) */
          {
            ...HOME_STORY[0],
            visual: (
              <div className="hs-areas">
                <p className="hs-areas-k">Our services</p>
                <ul>{AREAS.map((a) => (
                  <li key={a.id} data-a={a.id}><a href={areaHref(a)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={AREA_PHOTO[a.id]} alt="" loading="lazy" style={AREA_PHOTO_POS[a.id] ? { objectPosition: AREA_PHOTO_POS[a.id] } : undefined} /><span>{a.name}</span>
                  </a></li>
                ))}</ul>
              </div>
            ),
          },
          /* side two: What sets us apart, one reason per scroll, each with its picture in the frame (Nicole, Nov 9) */
          {
            k: "What sets us apart",
            intro: { h: "What sets us apart" },
            /* the five reasons and their pictures: components/v8/why-items.tsx (the same list Who we are uses) */
            items: whyItems(everyone, !PROD),
          },
        ]}
        whyLeft={SHOW_STORY_TEAM_BOX ? <PeopleStrip people={people} showDev={!PROD} /> : undefined}
        whyRight={SHOW_STORY_TEAM_BOX ? (
          <div className="wc-copy">
            <LitText manual className="wc-lit" text="Our people have run the programs you run. They do the work themselves, with an in-house team that builds the tools." />
          </div>
        ) : undefined}
      />

      {/* 1 · who we are: the tagline, headline, line, and buttons. Hidden on the home page for now, not
          deleted (Nicole, Nov 10: "save the work, I'll use it in other areas"). true brings it back. */}
      {SHOW_HOME_INTRO && <section className="h-hero" aria-labelledby="h-title">
        <div className="v8-wrap h-hero-top">
          {HOME.eyebrow && <p className="h-tag" data-reveal>{tagline(HOME.eyebrow)}</p>}
          <h2 id="h-title" className="h-title" data-reveal>{HOME.headline}</h2>
          <div className="h-side" data-reveal>
            <p className="h-line">{HOME.line}</p>
            <div className="v8-actions">
              <a className="v8-btn" href="/contact">Get in touch</a>
              <a className="v8-btn v8-btn-ghost" href="/services">See what we do</a>
            </div>
          </div>
        </div>
      </section>}
      </div>

      {/* 1b · what we do: the five area tiles; the one you point at opens with its line, a quote, and a link
          (Nicole, Nov 10: like the earlier home tiles). The pop-out tour now lives on the Services page. */}
      {SHOW_WAYS_TILES ? (
      <section id="what-we-do" className="h-ways" data-nofill aria-labelledby="h-ways-h">
          <div className="v8-wrap h-ways-head" data-reveal>
            <p className="v8-eyebrow">What we do</p>
            <h2 id="h-ways-h" className="v8-h2">From the plan, to the tools, implementation, & delivery</h2>
          </div>
          <ul className="ways" aria-label="Our services">
            {AREAS.map((a) => (
              <li key={a.id} className="way" style={themeStyle(a.id)}>
                <a href={areaHref(a)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={AREA_PHOTO[a.id]} alt="" loading="lazy" style={AREA_PHOTO_POS[a.id] ? { objectPosition: AREA_PHOTO_POS[a.id] } : undefined} />
                  <span className="way-txt">
                    <b>{a.name}</b>
                    <em>{a.tag}</em>
                    <span className="way-q">{q(AREA_DATA[a.id].hear[0])}</span>
                    <span className="way-more">Explore {a.name}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section id="what-we-do" className="h-ways h-fan" data-nofill aria-labelledby="h-ways-h">
          <div className="v8-wrap h-ways-head" data-reveal>
            <p className="v8-eyebrow">What we do</p>
            <h2 id="h-ways-h" className="v8-h2">From the plan, to the tools, implementation, & delivery</h2>
          </div>
          <FanCards label="What we do" start={2} tags={false} hoverFront
            cards={AREAS.map((a) => ({ href: areaHref(a), tag: a.tag, title: a.name, photo: AREA_PHOTO[a.id], pos: AREA_PHOTO_POS[a.id], text: a.tag, more: "Explore" }))} /* a brief description of the area, then Explore (Nicole, Nov 11) */ />
        </section>
      )}

      {/* 2 · what we do, area by area. Hidden for now (Nicole, Nov 9: "remove this whole section for now,
          but don't delete it"). To bring it back, set SHOW_WHAT_WE_DO to true at the top of this file. */}
      {SHOW_WHAT_WE_DO && <Chapters
        intro={{ k: "What we do", h: "Challenges we hear, and what we bring.", lead: "Like many organizations today, you’re facing complex, interconnected challenges: technology-driven transformation, resource constraints, and shifting regulatory demands. That's where we come in. From strategy and proven frameworks to the systems and products that put them to work, we help you turn decisions into action." }}
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
            services: a.services.filter((sv) => isListed(sv.id)).map((sv) => ({ name: sv.name, href: `/services/${a.slug}/${sv.slug}` })),
          };
        })}
      />}

      {/* 3 · why us: the Why Rawlins card now ends the opening story (hero-story.tsx) */}

      {/* What sets us apart is now side two of the opening story (hero-story.tsx), one reason per scroll */}

      {/* 4 · who we work with: a ring of photos around the headline (components/v8/who-ring.tsx, shared with Transportation Sector) */}
      <WhoRing />

      {/* 5 · our work */}
      <section className="h-work" aria-labelledby="h-work">
        <div className="v8-wrap">
          <div className="h-row-head" data-reveal>
            <div><p className="v8-eyebrow">Our work</p><h2 id="h-work" className="v8-h2">Featured projects</h2></div>
            <a className="v8-link" href="/insights/case-studies">All projects</a>
          </div>
          <Rail label="Projects">
            {cases.map((c) => <ProjectCard key={c.id} c={c} />)}
          </Rail>
        </div>
      </section>

      {/* 6 · how we've grown: slides sideways as you scroll (shared with Who we are) */}
      <Grown eyebrow="how we've grown" title="Evolving impact" link={{ href: "/about/who-we-are", label: "Learn more about us" }} />

      {/* 7 · what's new */}
      <section className="h-new" aria-labelledby="h-new">
        <div className="v8-wrap">
          <div className="h-row-head" data-reveal><div><p className="v8-eyebrow">insights</p><h2 id="h-new" className="v8-h2">Where we&apos;ll be, and what we&apos;re up to</h2></div><a className="v8-link" href="/insights/news">News &amp; Recognition</a></div>
          <div className="newsgrid">
            {ev && (
              <article className={`ev${ev.photo ? " has-photo" : ""}${ev.banner ? " has-banner" : ""}`} data-reveal>
                {ev.photo && (
                  <div className="ev-ph">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ev.photo} alt="" loading="lazy" title={ev.credit} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {ev.logo && <img className="ev-logo" src={ev.logo} alt={ev.title} loading="lazy" />}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {ev.badge && <img className="ev-badge" src={ev.badge} alt="" loading="lazy" />}
                  </div>
                )}
                <span className="ev-when">{ev.when}</span>
                <b>{ev.cardTitle ?? ev.title}</b>
                {ev.where && <span className="ev-where">{ev.where}</span>}
                {ev.note && <p>{ev.note}</p>}
                <a className="v8-btn v8-btn-light" href="/contact#message">Plan to meet us</a>
              </article>
            )}
            {news.map((n) => n.tag === "Project" && wip ? (
              <a key="wip" className="nw nw-proj" href={caseHref(wip)} data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={casePhoto(wip)} alt="" loading="lazy" />
                <span className="nw-tag"><i aria-hidden="true" />In the works</span>
                <b>{wip.title}</b>
                <span className="nw-who">{wip.who}</span>
                <CaseNote id={wip.id} />
                <span className="nw-more">Explore</span>
              </a>
            ) : (
              <article key={n.title} className={`nw${n.placeholder ? " is-dev" : ""}${n.photo ? " has-photo" : ""}`} data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {n.photo && <img className="nw-ph" src={n.photo} alt="" loading="lazy" />}
                <span className="nw-tag">{n.tag}{n.date ? ` · ${n.date}` : ""}</span>
                <b>{n.href ? <a href={n.href} {...(/^http/.test(n.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{n.title}</a> : n.title}</b>
                {n.text && <p>{n.text}</p>}
                {n.placeholder && !PROD && <em className="v8-dev">Placeholder (preview only): {n.placeholder}</em>}
                {/* every tile ends with Explore (Nicole, Nov 11) */}
                {n.href && <a className="nw-more" href={n.href} aria-label={`Explore: ${n.title}`} {...(/^http/.test(n.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>Explore</a>}
              </article>
            ))}
            <a className="pod" href="/insights/podcast" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pages/insights-card-3.webp" alt="" loading="lazy" />
              <span><em>Podcast</em><b>The Rawlins Way</b><i className="nw-more">Explore</i></span>
            </a>
          </div>
        </div>
      </section>

      {/* 8 · start a conversation: pick your problem, see where we'd start (Nicole, Nov 10) */}
      <section className="h-start h-fix" aria-labelledby="h-start">
        <div className="v8-wrap h-start-in" data-reveal>
          <h2 id="h-start" className="v8-h2">Tell us what you'd like help with.</h2>
          <p className="v8-lead">Pick the one that sounds most like you, and we&apos;ll show you where we&apos;d start. Or write your own.</p>
          <FixPicker fixes={PROBLEMS.map((p) => ({
            q: p.q, topic: areaOf(p.services[0])?.name ?? "Not sure",
            services: p.services.map((id) => serviceById(id)).filter(Boolean).map((h) => ({ name: h!.service.name, area: h!.area.name, href: `/services/${h!.area.slug}/${h!.service.slug}`, style: themeStyle(h!.area.id) })),
          }))} />
        </div>
      </section>
    </Panels>
  );
}

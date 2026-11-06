/* Home (v8). Moves like scale.com: smooth scrolling, and every section is a
   panel that slides up over the one before it. The story, in order:
   1 who we are, with the five areas as photo panels   2 what we do, area by area (held chapters)   3 why us (a
   card that lights up, then the proof)   4 who we work with (a ring of
   photos)   5 our work   6 how we've grown   7 what's new   8 start a
   conversation. Words come from the content layer. Dev-only marks never
   reach production. */
import { AREAS, CASES, HOME, NUMBERS, PROBLEMS, STEPS, STORY, VISIBLE_INDUSTRIES, WHY, areaHref, caseHref, caseWho, industryHref, serviceById, subsectorHref } from "@/lib/content/site";
import { AREAS as AREA_DATA } from "@/lib/content/catalog";
import { AREA_PHOTO, HOME_VIDEO, INDUSTRY_PHOTO } from "@/lib/content/media";
import { NEWS, EVENTS } from "@/lib/content/news";
import { themeStyle, casePhoto, FEATURED_CASES, STORY_PHOTO } from "@/lib/content/v8";
import { Diagram } from "@/components/v8/diagram";
import Scene from "@/components/v8/scene";
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

export default function Home() {
  const cases = FEATURED_CASES.map((id) => CASES.find((c) => c.id === id)!).filter((c) => c && (!PROD || !c.needsSignoff));
  const numbers = NUMBERS.filter((n) => n.verified);
  const news = NEWS.filter((n) => !n.placeholder || !PROD).slice(0, 3);
  const ev = EVENTS.filter((e) => !e.placeholder || !PROD)[0];
  const pdn = CASES.find((c) => c.id === "cs-pdn")!;
  const why = [0, 1, 2, 4, 3].map((i) => WHY[i]);
  const people = stripPeople();
  const veterans = veteranPeople();
  // the ring: each industry, then its specialties, dealt round so they spread out
  const groups: Tile[][] = VISIBLE_INDUSTRIES.map((i) => [
    { src: INDUSTRY_PHOTO[i.id], label: i.name, href: industryHref(i) },
    ...i.subsectors.filter((sb) => INDUSTRY_PHOTO[sb.id]).map((sb) => ({ src: INDUSTRY_PHOTO[sb.id], label: sb.name, href: subsectorHref(i, sb) })),
  ]);
  const tiles: Tile[] = [];
  for (let r = 0; tiles.length < groups.flat().length; r++) groups.forEach((g) => { if (g[r]) tiles.push(g[r]); });

  return (
    <Panels>
      {/* 1 · who we are */}
      <section className="h-hero" aria-labelledby="h-title">
        <div className="v8-wrap h-hero-top">
          <h1 id="h-title" className="h-title" data-reveal>{HOME.headline}</h1>
          <div className="h-side" data-reveal>
            <p className="h-line">{HOME.line}</p>
            <div className="v8-actions">
              <a className="v8-btn" href="/contact">Get in touch</a>
              <a className="v8-btn v8-btn-ghost" href="#what">See what we do</a>
            </div>
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
                  <span className="way-q">{q(AREA_DATA[a.id].hear[0])}</span>
                  <span className="way-more">Explore {a.name}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* 2 · what we do, area by area */}
      <Chapters
        intro={{ k: "What we do", h: "Most of our work starts with how an organization is set up to deliver.", lead: "From there, we help deliver projects, keep what's built running, launch drone and air mobility programs, and put digital tools to work." }}
        items={AREAS.map((a) => ({
          id: a.id, name: a.name, tag: a.tag, lead: AREA_DATA[a.id].lead, quote: q(AREA_DATA[a.id].hear[0]), href: areaHref(a), photo: AREA_PHOTO[a.id],
          services: a.services.map((sv) => ({ name: sv.name, href: `/services/${a.slug}/${sv.slug}` })),
        }))}
      />

      {/* 3 · why us: the card holds while the sentence lights up */}
      <Scene steps={1} per={90} className="wc" label="Why Rawlins">
        <div className="wc-in">
          <div className="wc-card">
            <PeopleStrip people={people} />
            <div className="wc-copy">
              <p className="v8-eyebrow">Why Rawlins</p>
              <LitText className="wc-lit" text="30+ former agency executives and engineers. Our people ran the programs our clients run, so we skip the learning curve." />
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
                <PeopleStrip people={veterans} across />
                <a className="v8-link" href="/about/our-people">Meet our people</a>
              </div>
              <div className="why-p">
                <p className="why-text">{why[1][1]}</p>
                <dl className="nums">{numbers.map((n) => <div key={n.label}><dt>{n.label}</dt><dd>{n.value}</dd></div>)}</dl>
              </div>
              <div className="why-p">
                <p className="why-text">{why[2][1]}</p>
                <a className="proof" href={caseHref(pdn)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={casePhoto(pdn)} alt="" loading="lazy" />
                  <span><em>From our work</em><b>{pdn.title}</b><span>{caseWho(pdn, PROD)}</span></span>
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
        <h2 id="orb-h" className="orb-h">Built inside <span>public agencies.</span></h2>
        <p className="v8-lead">Our work so far is across the United States, and our team can do it anywhere.</p>
        <ul className="orb-chips">{VISIBLE_INDUSTRIES.map((i) => <li key={i.id}><a href={industryHref(i)}>{i.name}</a></li>)}</ul>
        <a className="v8-link" href="/industries">Everyone we work with</a>
      </Orbit>

      {/* 5 · our work */}
      <section className="h-work" aria-labelledby="h-work">
        <div className="v8-wrap">
          <div className="h-row-head" data-reveal>
            <div><p className="v8-eyebrow">Our work</p><h2 id="h-work" className="v8-h2">Projects, finished and in the works</h2></div>
            <a className="v8-link" href="/insights/case-studies">All 28 projects</a>
          </div>
          <Rail label="Projects">
            {cases.map((c) => {
              const areas = Array.from(new Set(c.services.map((s) => areaOf(s)?.id).filter(Boolean) as string[]));
              return (
                <li key={c.id} className="pc">
                  <a href={caseHref(c)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={casePhoto(c)} alt="" loading="lazy" />
                    <span className={`pc-status${c.status === "Ongoing" ? " is-live" : ""}`}>{c.status === "Ongoing" ? "In the works" : "Completed"}</span>
                    <b>{c.title}</b>
                    <span className="pc-who">{caseWho(c, PROD)}</span>
                    <span className="pc-areas">{areas.map((id) => <i key={id} style={themeStyle(id)}>{AREAS.find((a) => a.id === id)!.name}</i>)}</span>
                  </a>
                </li>
              );
            })}
          </Rail>
        </div>
      </section>

      {/* 6 · how we've grown: slides sideways as you scroll */}
      <Scene steps={1} per={160} className="hg" label="How we've grown">
        <div className="v8-wrap h-row-head hg-head">
          <div><p className="v8-eyebrow">How we&apos;ve grown</p><h2 className="v8-h2">Started in 2017 by a former Nevada DOT chief engineer</h2></div>
          <a className="v8-link" href="/about/who-we-are">Who we are</a>
        </div>
        <div className="hg-line" aria-hidden="true"><i /></div>
        <div className="hg-view">
          <ol className="hg-track" data-hscroll>
            {STORY.map(([k, h, p], i) => (
              <li key={k} className="hg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={STORY_PHOTO[i]} alt="" loading="lazy" />
                <div><span className="grown-k">{k}</span><b>{h}</b><p>{p}</p></div>
              </li>
            ))}
            <li className="hg-card hg-next"><span className="grown-k">What&apos;s next</span><b>Where are you headed?</b><a className="v8-btn v8-btn-glow" href="/contact">Tell us what you&apos;re trying to fix</a></li>
          </ol>
        </div>
      </Scene>

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
                <b>{n.href ? <a href={n.href}>{n.title}</a> : n.title}</b>
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
        <video className="h-start-video" autoPlay muted loop playsInline poster={HOME_VIDEO.poster} aria-hidden="true">
          <source src={HOME_VIDEO.webm} type="video/webm" />
          <source src={HOME_VIDEO.mp4} type="video/mp4" />
        </video>
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

/* Home (v8). The story, in order:
   1 who we are, with five ways in   2 what we do, area by area (the page
   takes each area's color)   3 why us, shown with proof   4 who we work with
   5 our work   6 how we've grown   7 what's new   8 start a conversation.
   Words come from the content layer. Dev-only marks never reach production. */
import type { CSSProperties } from "react";
import { AREAS, CASES, HOME, LEADERS, NUMBERS, PROBLEMS, STEPS, STORY, VISIBLE_INDUSTRIES, WHY, areaHref, caseHref, caseWho, industryHref, serviceById, subsectorHref } from "@/lib/content/site";
import { AREAS as AREA_DATA } from "@/lib/content/catalog";
import { AREA_PHOTO, HOME_VIDEO, INDUSTRY_PHOTO } from "@/lib/content/media";
import { NEWS, EVENTS } from "@/lib/content/news";
import { THEME, themeStyle, casePhoto, FEATURED_CASES, STORY_PHOTO } from "@/lib/content/v8";
import { Diagram } from "@/components/v8/diagram";
import Explorer from "@/components/v8/explorer";
import Tabs from "@/components/v8/tabs";
import Rail from "@/components/v8/rail";

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

  return (
    <>
      {/* 1 · who we are, and five ways in */}
      <section className="h-hero" aria-labelledby="h-title">
        <div className="v8-wrap h-hero-top">
          <div>
            <p className="v8-eyebrow" data-reveal>{HOME.eyebrow}</p>
            <h1 id="h-title" className="h-title" data-reveal>{HOME.headline}</h1>
          </div>
          <div className="h-side" data-reveal>
            <p className="h-line">{HOME.line}</p>
            <div className="v8-actions">
              <a className="v8-btn" href="/contact">Get in touch</a>
              <a className="v8-btn v8-btn-ghost" href="#what">See what we do</a>
            </div>
          </div>
        </div>
        <ul className="ways" aria-label="What we do: five areas">
          {AREAS.map((a) => (
            <li key={a.id} className="way" style={themeStyle(a.id)}>
              <a href={areaHref(a)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={AREA_PHOTO[a.id]} alt="" />
                <span className="way-n" aria-hidden="true">{THEME[a.id].n}</span>
                <span className="way-txt"><b>{a.name}</b><em>{a.tag}</em><span className="way-more">{a.services.length} services</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* 2 · what we do, area by area */}
      <section className="h-what" id="what" aria-labelledby="h-what">
        <div className="v8-wrap h-what-head" data-reveal>
          <p className="v8-eyebrow">What we do</p>
          <h2 id="h-what" className="v8-h2">Most of our work starts with how an organization is set up to deliver.</h2>
          <p className="v8-lead">From there, we help deliver projects, keep what&apos;s built running, put digital tools to work, and launch drone and air mobility programs.</p>
        </div>
        <Explorer items={AREAS.map((a) => ({ name: a.name, n: THEME[a.id].n, tint: THEME[a.id].tint, color: THEME[a.id].color }))}>
          {AREAS.map((a, i) => {
            const d = AREA_DATA[a.id];
            return (
              <article key={a.id} className="ex-panel" data-i={i} data-reveal style={themeStyle(a.id)} aria-labelledby={`ex-h-${a.id}`}>
                <div className="ex-copy">
                  <p className="ex-k"><span>{THEME[a.id].n}</span>{a.tag}</p>
                  <h3 id={`ex-h-${a.id}`}><a href={areaHref(a)}>{a.name}</a></h3>
                  <p className="ex-lead">{d.lead}</p>
                  <ul className="v8-voices" aria-label="What we hear">{d.hear.slice(0, 2).map((h) => <li key={h}>{q(h)}</li>)}</ul>
                  <a className="v8-btn v8-btn-area" href={areaHref(a)}>Explore {a.name}</a>
                </div>
                <div className="ex-visual">
                  <p className="ex-dg-title">{d.feature.title}</p>
                  <Diagram kind={THEME[a.id].diagram} steps={d.feature.steps} />
                  <ul className="ex-svcs" aria-label={`${a.name} services`}>
                    {a.services.map((s) => <li key={s.id}><a href={`/services/${a.slug}/${s.slug}`}>{s.name}</a></li>)}
                  </ul>
                </div>
              </article>
            );
          })}
        </Explorer>
      </section>

      {/* 3 · why us, with proof */}
      <section className="h-why" aria-labelledby="h-why">
        <div className="v8-wrap">
          <div className="h-why-head" data-reveal>
            <p className="v8-eyebrow">Why Rawlins</p>
            <h2 id="h-why" className="v8-h2">What sets us apart</h2>
          </div>
          <div data-reveal>
            <Tabs label="What sets us apart" labels={why.map((w) => w[0])}>
              <div className="why-p">
                <p className="why-text">{why[0][1]}</p>
                <ul className="faces">{LEADERS.slice(0, 6).map((p) => (
                  <li key={p.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/images/team/${p.photo}.webp`} alt="" loading="lazy" width={72} height={72} />
                    <b>{p.name}</b><span>{p.role}</span>
                  </li>
                ))}</ul>
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
      </section>

      {/* 4 · who we work with */}
      <section className="h-inds" aria-labelledby="h-inds">
        <div className="v8-wrap">
          <div className="h-row-head" data-reveal>
            <div><p className="v8-eyebrow">Who we work with</p><h2 id="h-inds" className="v8-h2">Built inside public agencies. Useful anywhere.</h2></div>
            <a className="v8-link" href="/industries">Everyone we work with</a>
          </div>
          <ul className="inds">
            {VISIBLE_INDUSTRIES.map((ind, k) => (
              <li key={ind.id} className={`ind ind-${k}`} data-reveal style={{ ["--d" as string]: `${k * 80}ms` } as CSSProperties}>
                <a className="ind-main" href={industryHref(ind)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={INDUSTRY_PHOTO[ind.id]} alt="" loading="lazy" />
                  <span className="ind-txt"><b>{ind.name}</b><span>{ind.who}</span></span>
                </a>
                {ind.subsectors.length > 0 && (
                  <ul className="ind-subs" aria-label={`${ind.name} specialties`}>{ind.subsectors.map((s) => <li key={s.id}><a href={subsectorHref(ind, s)}>{s.name}</a></li>)}</ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

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

      {/* 6 · how we've grown */}
      <section className="h-grown" aria-labelledby="h-grown">
        <div className="v8-wrap">
          <div className="h-row-head" data-reveal><div><p className="v8-eyebrow">How we&apos;ve grown</p><h2 id="h-grown" className="v8-h2">Started in 2017 by a former Nevada DOT chief engineer</h2></div><a className="v8-link" href="/about/who-we-are">Who we are</a></div>
          <ol className="grown" data-reveal>
            {STORY.map(([k, h, p], i) => (
              <li key={k} style={{ ["--i" as string]: i } as CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={STORY_PHOTO[i]} alt="" loading="lazy" />
                <span className="grown-k">{k}</span><b>{h}</b><p>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
    </>
  );
}

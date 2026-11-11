/* Who we work with (overview), in the v8 system: the page photo behind the
   headline, then the four kinds of clients as big photo cards. Each card has
   its photo, the name, who it covers, the first sentence of its lead, its
   specialties as plain links, and Explore (full site pass, Part 2, 2.1).
   Previews also show the hidden International page, marked (Part 4, 1). */
import { INDUSTRIES, VISIBLE_INDUSTRIES, industryHref, subsectorHref } from "@/lib/content/site";
import { INDUSTRY_PHOTO, PAGE_PHOTO } from "@/lib/content/media";
import Panels from "@/components/v8/panels";
import { Dev, PROD, TALK } from "@/components/site/ui";

const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();

export default function IndustriesIndexV8() {
  const intl = PROD ? undefined : INDUSTRIES.find((i) => i.id === "intl");
  return (
    <div className="sv iw">
      <Panels className="pnl-page">
        <section className="sv-hero svh iw-hero" data-scrub="page">
          <div className="svh-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PAGE_PHOTO.industries} alt="" />
          </div>
          <div className="v8-wrap iw-top">
            <nav className="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Who we work with</li></ol></nav>
            <p className="sv-area">Who we work with</p>
            <h1>Public agencies and private firms, wherever the work is.</h1>
            <p className="sv-intro">Most of our work is with organizations that own and run public infrastructure: more than 30 transportation agencies, plus local governments and a multi-state research program. We also work with contractors and engineering firms on public projects, and help private firms with their systems and workflows. Our work so far has been in the United States, and our team can work anywhere.</p>
            <div className="v8-actions"><a className="v8-btn v8-btn-area" href="/contact">Get in touch</a></div>
          </div>
        </section>

        <section className="iw-list" aria-label="Who we work with">
          <ul className="v8-wrap iw-cards">
            {VISIBLE_INDUSTRIES.map((i) => (
              <li key={i.id} className="iw-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={INDUSTRY_PHOTO[i.id]} alt="" loading="lazy" />
                <div className="iw-txt">
                  <h2><a href={industryHref(i)}>{i.name}</a></h2>
                  <p className="iw-who">{i.who}</p>
                  <p className="iw-lead">{firstSentence(i.lead)}</p>
                  {i.subsectors.length > 0 && (
                    <ul className="iw-subs" aria-label={`${i.name} specialties`}>
                      {i.subsectors.map((s) => <li key={s.id}><a href={subsectorHref(i, s)}>{s.name}</a></li>)}
                    </ul>
                  )}
                  <a className="iw-more" href={industryHref(i)}>Explore {i.name}</a>
                </div>
              </li>
            ))}
            {intl && (
              <li className="iw-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={INDUSTRY_PHOTO.intl} alt="" loading="lazy" />
                <div className="iw-txt">
                  <h2><a href={industryHref(intl)}>{intl.name}</a></h2>
                  <p className="iw-lead">{intl.lead}</p>
                  <em className="v8-dev">Hidden on the live site unless approved.</em>
                  <a className="iw-more" href={industryHref(intl)}>Explore {intl.name}</a>
                </div>
              </li>
            )}
          </ul>
        </section>

        <section id="talk" className="svt" data-nofill>
          <div className="v8-wrap svt-in">
            <div className="svt-talk">
              <h2 className="v8-h2">{TALK.title}</h2>
              {/* TODO(Nicole): closing line to come from Nicole (removed Nov 9) */}
              {TALK.text ? <p className="v8-lead">{TALK.text}</p> : null}
              <div className="v8-actions"><a className="v8-btn v8-btn-area" href="/contact">Get in touch</a></div>
            </div>
          </div>
        </section>
      </Panels>
    </div>
  );
}

/* Who we work with (overview), in the v8 system: the page photo behind the
   headline, then the four kinds of clients as big photo cards. Each card has
   who it covers, the lead, and its specialties as plain links. */
import { VISIBLE_INDUSTRIES, industryHref, subsectorHref } from "@/lib/content/site";
import { INDUSTRY_PHOTO, PAGE_PHOTO } from "@/lib/content/media";
import Panels from "@/components/v8/panels";
import { TALK } from "@/components/site/ui";

export default function IndustriesIndexV8() {
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
            <p className="sv-intro">Most of our work is with organizations that own and run public infrastructure: more than 30 transportation agencies so far, plus local governments and a multi-state research program. We also work with contractors and engineering firms on public projects, and with private firms on their systems and workflows. Our work so far is across the United States, and our team can do it anywhere.</p>
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
                  <p className="iw-who">{i.who}</p>
                  <h2><a href={industryHref(i)}>{i.name}</a></h2>
                  <p className="iw-lead">{i.lead}</p>
                  {i.subsectors.length > 0 && (
                    <ul className="iw-subs" aria-label={`${i.name} specialties`}>
                      {i.subsectors.map((s) => <li key={s.id}><a href={subsectorHref(i, s)}>{s.name}</a></li>)}
                    </ul>
                  )}
                  <a className="iw-more" href={industryHref(i)}>Explore {i.name}</a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="talk" className="svt">
          <div className="v8-wrap svt-in">
            <div className="svt-talk">
              <h2 className="v8-h2">{TALK.title}</h2>
              <p className="v8-lead">{TALK.text}</p>
              <div className="v8-actions"><a className="v8-btn v8-btn-area" href="/contact">Get in touch</a></div>
            </div>
          </div>
        </section>
      </Panels>
    </div>
  );
}

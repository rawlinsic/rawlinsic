/* Who we work with (overview). Nov 12 (Nicole: "design this page the same as the insights page. keep all the
   text we have everywhere though"): the Insights page's layout. The headline, then the kinds of clients as
   fanned photo cards (name and who it covers; Explore on the middle card), then a link to each. Under that, the
   page's intro and every card's words as text: the name, who it covers, the first sentence of its lead, its
   specialties as links, and Explore (full site pass, Part 2, 2.1). Previews also show the hidden International
   page (Part 4, 1).
   The closing band keeps its id ("talk"): Nicole took it off this page with the preview's Delete section button
   (lib/content/removed-sections.ts), and Undo there puts it back. */
import { INDUSTRIES, VISIBLE_INDUSTRIES, industryHref, subsectorHref } from "@/lib/content/site";
import { INDUSTRY_PHOTO } from "@/lib/content/media";
import FanCards, { type FanCard } from "@/components/v8/fan-cards";
import { PROD, Shell, Talk } from "@/components/site/ui";

const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();

export default function IndustriesIndexV8() {
  const intl = PROD ? undefined : INDUSTRIES.find((i) => i.id === "intl");
  const all = [...VISIBLE_INDUSTRIES, ...(intl ? [intl] : [])];
  const cards: FanCard[] = all.map((i) => ({ href: industryHref(i), tag: "Who we work with", title: i.name, sub: i.who, more: `Explore ${i.name}`, photo: INDUSTRY_PHOTO[i.id] }));
  return (
    <Shell>
      <section className="fan-sec" data-nofill>
        <div className="ed-wrap fan-head">
          <nav className="pg-crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><span aria-current="page">Who we work with</span></li></ol></nav>
          <h1 className="fan-h is-wide">Public agencies and private firms, <em>wherever the work is.</em></h1>
        </div>
        <FanCards cards={cards} label="Who we work with" start={0} tags={false} />
        <ul className="ed-wrap fan-links">
          {all.map((i) => <li key={i.id}><a href={industryHref(i)}>{i.name}</a></li>)}
        </ul>
      </section>

      <section className="ed-sec is-panel iwx" data-nofill aria-label="Who we work with">
        <div className="ed-wrap">
          <div className="iwx-head">
            <p className="ed-k">Who we work with</p>
            <p className="iwx-intro">Most of our work is with the public agencies that own and run infrastructure: more than 30 transportation agencies, local agencies, and a multi-state research program. We also work with the contractors and engineering firms that build for those agencies, and we help private firms connect their systems and workflows. Our work so far has been in the United States, and our team can work anywhere.</p>
            <div className="ed-btns"><a className="ed-btn is-solid" href="/contact">Get in touch</a></div>
          </div>
          <ul className="iwx-list">
            {VISIBLE_INDUSTRIES.map((i) => (
              <li key={i.id} className={i.subsectors.length > 4 ? "is-wide" : undefined}>
                <h2><a href={industryHref(i)}>{i.name}</a></h2>
                <p className="iwx-who">{i.who}</p>
                <p className="iwx-lead">{firstSentence(i.lead)}</p>
                {i.subsectors.length > 0 && (
                  <ul className="iwx-subs" aria-label={`${i.name} specialties`}>
                    {i.subsectors.map((s) => <li key={s.id}><a href={subsectorHref(i, s)}>{s.name}</a></li>)}
                  </ul>
                )}
                <a className="ed-more" href={industryHref(i)}>Explore {i.name}</a>
              </li>
            ))}
            {intl && (
              <li>
                <h2><a href={industryHref(intl)}>{intl.name}</a></h2>
                <p className="iwx-lead">{intl.lead}</p>
                <a className="ed-more" href={industryHref(intl)}>Explore {intl.name}</a>
              </li>
            )}
          </ul>
        </div>
      </section>

      <Talk id="talk" />
    </Shell>
  );
}

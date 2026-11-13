/* Who we work with (overview). Nov 12 (Nicole: "design this page the same as the insights page"): the Insights
   page's layout. The headline and the intro, then the kinds of clients as fanned photo cards (name and who it
   covers; Explore on the middle card), then a link to each. Previews also show the hidden International page
   (Part 4, 1).
   The closing band keeps its id ("talk"): Nicole took it off this page with the preview's Delete section button
   (lib/content/removed-sections.ts), and Undo there puts it back. */
import { INDUSTRIES, VISIBLE_INDUSTRIES, industryHref } from "@/lib/content/site";
import { INDUSTRY_PHOTO } from "@/lib/content/media";
import FanCards, { type FanCard } from "@/components/v8/fan-cards";
import { Shell, Talk } from "@/components/site/ui";


export default function IndustriesIndexV8() {
  const intl = INDUSTRIES.find((i) => i.id === "intl"); // on the live site too since Nov 12
  const all = [...VISIBLE_INDUSTRIES, ...(intl ? [intl] : [])];
  const cards: FanCard[] = all.map((i) => ({ href: industryHref(i), tag: "Who we work with", title: i.name, sub: i.who, more: `Explore ${i.name}`, photo: INDUSTRY_PHOTO[i.id] }));
  return (
    <Shell>
      <section className="fan-sec" data-nofill>
        <div className="ed-wrap fan-head">
          <nav className="pg-crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><span aria-current="page">Who we work with</span></li></ol></nav>
          <h1 className="fan-h is-wide">Public agencies and private firms, <em>wherever the work is.</em></h1>
          <p className="fan-intro">Most of our work is with the public agencies that own and run infrastructure: more than 30 transportation agencies, local agencies, and a multi-state research program. We also work with the contractors and engineering firms that build for those agencies, and we help private firms connect their systems and workflows. Our work so far has been in the United States, and our team can work anywhere.</p>
        </div>
        {/* hoverFront: resting on a side card brings it to the middle, like the home page's cards (Nicole, Nov 12) */}
        <FanCards cards={cards} label="Who we work with" start={0} tags={false} hoverFront />
        <ul className="ed-wrap fan-links">
          {all.map((i) => <li key={i.id}><a href={industryHref(i)}>{i.name}</a></li>)}
        </ul>
      </section>

      {/* the section that listed each one again as text (intro, Get in touch, who lines, lead sentences, specialties)
          was deleted by Nicole, Nov 12; the intro moved up under the headline */}

      <Talk id="talk" />
    </Shell>
  );
}

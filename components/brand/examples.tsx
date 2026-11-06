/* The examples grid used on each accent slide and in Mix and match.
   Colors come from the CSS variables on a parent (mockVars). */
import { Fit, MockCard, MockDiagram, MockHero, MockOnePager, MockSlide, MockSocial } from "@/components/brand/mocks";

export function Examples({ compact }: { compact?: boolean }) {
  /* full: about 1580 px wide; compact (next to the Mix and match controls): about 1260 px */
  const k = compact ? 0.76 : 0.92;
  const W = (n: number) => Math.round(n * k);
  return (
    <div className="ex" style={{ gap: W(40) }}>
      <div className="ex-col" style={{ gap: W(22) }}>
        <Fit w={W(760)} iw={1440} ih={900} label="Website hero"><MockHero /></Fit>
        <div className="ex-row" style={{ gap: W(20) }}>
          <Fit w={W(370)} iw={1050} ih={600} label="Business card, front"><MockCard side="front" /></Fit>
          <Fit w={W(370)} iw={1050} ih={600} label="Business card, back"><MockCard side="back" /></Fit>
        </div>
      </div>
      <div className="ex-col" style={{ gap: W(22) }}>
        <Fit w={W(520)} iw={1920} ih={1080} label="Slide"><MockSlide /></Fit>
        <Fit w={W(520)} iw={1280} ih={720} label="Line-and-node diagram"><MockDiagram /></Fit>
      </div>
      <div className="ex-col" style={{ gap: W(22) }}>
        <Fit w={W(296)} iw={850} ih={1100} label="One-pager"><MockOnePager /></Fit>
        <Fit w={W(296)} iw={1080} ih={1080} label="Social post"><MockSocial /></Fit>
      </div>
    </div>
  );
}

"use client";
/* Flat U.S. map (photo version of "the proof"): states with our work are lit;
   the picked state is darkest. Same data as the 3D map (public/world). */
import { useEffect, useState } from "react";

type MapData = { w: number; h: number; states: { name: string; rings: number[][][] }[]; nation: number[][][] };
let cache: Promise<MapData> | null = null;
const load = () => (cache ??= fetch("/world/us-map.json").then((r) => r.json()));

export default function USMap({ lit, active, onPick, label }: { lit: string[]; active?: string | null; onPick?: (s: string) => void; label: string }) {
  const [d, setD] = useState<MapData | null>(null);
  useEffect(() => { load().then(setD).catch(() => {}); }, []);
  if (!d) return <div className="usmap usmap-loading" aria-hidden="true" />;
  const path = (rings: number[][][]) => rings.map((r) => `M${r.map(([x, y]) => `${x},${y}`).join("L")}Z`).join("");
  return (
    <svg className="usmap" viewBox={`0 0 ${d.w} ${d.h}`} role="img" aria-label={label}>
      {d.states.map((s) => {
        const on = lit.includes(s.name), act = active === s.name;
        return (
          <path key={s.name} d={path(s.rings)} className={`usmap-s${on ? " is-lit" : ""}${act ? " is-active" : ""}`}
            onClick={on && onPick ? () => onPick(s.name) : undefined}>
            <title>{s.name}</title>
          </path>
        );
      })}
      <path d={d.nation.map((l) => `M${l.map(([x, y]) => `${x},${y}`).join("L")}`).join("")} className="usmap-outline" />
    </svg>
  );
}

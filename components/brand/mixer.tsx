"use client";
/* Mix and match: pick a blue system and an accent, every example updates.
   Print shows the recommended pair. */
import { useState, type CSSProperties } from "react";
import { ACCENTS, PICK, SYSTEMS, accentById, mockVars, systemById } from "@/lib/content/brand-guide";
import { Examples } from "@/components/brand/examples";

export function Mixer() {
  const [sid, setS] = useState<string>(PICK.system);
  const [aid, setA] = useState<string>(PICK.accent);
  const s = systemById(sid), a = accentById(aid);
  return (
    <div className="mx-b" style={mockVars(s, a) as CSSProperties}>
      <div className="mx-b-ctl">
        <p className="mx-b-h">Blue system</p>
        <div className="mx-b-sys" role="radiogroup" aria-label="Blue system">
          {SYSTEMS.map((x) => (
            <button key={x.id} type="button" role="radio" aria-checked={x.id === sid} onClick={() => setS(x.id)}>
              <span className="mx-b-strip">{[x.theme.deep, x.theme.primary, x.theme.secondary, x.theme.support, x.theme.light, x.theme.pale].map((c) => <i key={c} style={{ background: c }} />)}</span>
              <b>{x.id}</b> {x.name}
            </button>
          ))}
        </div>
        <p className="mx-b-h">Accent</p>
        <div className="mx-b-acc" role="radiogroup" aria-label="Accent">
          {ACCENTS.map((x) => (
            <button key={x.id} type="button" role="radio" aria-checked={x.id === aid} onClick={() => setA(x.id)}>
              <i style={{ background: x.glow.hex, boxShadow: `0 0 14px ${x.glow.hex}` }} />{x.name}
            </button>
          ))}
        </div>
        <p className="mx-b-now"><b>{s.id} · {s.name}</b> with <b>{a.name}</b></p>
      </div>
      <Examples compact />
    </div>
  );
}

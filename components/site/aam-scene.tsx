/* The illustrated places on the Drones & Advanced Air Mobility map (the airport,
   delivery drone, homes, hospital, farm, and city), from the current site's
   "Integrate the next layer" map, recolored to the site's navy and blues
   (Nicole, Nov 10: "get the actual map with icons back"). Drawn in the map's
   0 0 1000 660 space. The selected place is drawn at full strength. */
export function AamScene({ on }: { on: string }) {
  return (
    <g className="av-scene">
        {/* Airport/Urban Air Taxi */}
        <g className={`av-scene-g${on === "urban-air-taxi" ? " is-on" : ""}`}>
          <g transform="translate(93.49,225.83)">
            <ellipse cx="0" cy="0" rx="18" ry="12" fill="#8fa3bb" />
            <line x1="-18" y1="-5" x2="-34" y2="-13" stroke="#8fa3bb" strokeWidth="2.5" />
            <line x1="18" y1="-5" x2="34" y2="-13" stroke="#8fa3bb" strokeWidth="2.5" />
            <ellipse cx="-34" cy="-15" rx="14" ry="4" fill="none" stroke="#7d93ad" strokeWidth="1.2" />
            <ellipse cx="34" cy="-15" rx="14" ry="4" fill="none" stroke="#7d93ad" strokeWidth="1.2" />
            <line x1="-12" y1="11" x2="-16" y2="17" stroke="#7d93ad" strokeWidth="1.5" />
            <line x1="12" y1="11" x2="16" y2="17" stroke="#7d93ad" strokeWidth="1.5" />
            <line x1="-20" y1="17" x2="20" y2="17" stroke="#6f86a1" strokeWidth="1.5" />
            <circle cx="0" cy="-7" r="4" fill="#22d3ee" />
            <path d="M-6 9 L-4 0 L4 0 L6 9Z" fill="rgba(34, 211, 238,0.8)" />
          </g>
          <path d="M79.04 309.94 Q79.04 270 169.04 258 Q259.04 270 259.04 309.94 L259.04 339.94 L79.04 339.94Z" fill="#8aa0b8" stroke="#a9b8cb" strokeWidth="1" />
          <rect x="97.04" y="287.94" width="140" height="52" fill="#6f86a1" stroke="#8aa0b8" strokeWidth="0.5" />
          <rect x="114.04" y="297.94" width="28" height="14" fill="#5b7290" />
          <rect x="154.04" y="297.94" width="28" height="14" fill="#5b7290" />
          <rect x="194.04" y="297.94" width="28" height="14" fill="#5b7290" />
          <rect x="131.04" y="319.94" width="14" height="20" fill="#4d6582" />
          <rect x="151.04" y="319.94" width="14" height="20" fill="#4d6582" />
          <rect x="171.04" y="319.94" width="14" height="20" fill="#4d6582" />
          <rect x="281.04" y="254.94" width="16" height="85" fill="#8fa3bb" />
          <rect x="273.04" y="239.94" width="32" height="20" rx="3" fill="#a9b8cb" stroke="#c3cfdd" strokeWidth="0.8" />
          <rect x="277.04" y="244.94" width="6" height="10" fill="#7fd8ea" />
          <rect x="285.04" y="244.94" width="6" height="10" fill="#7fd8ea" />
          <rect x="293.04" y="244.94" width="6" height="10" fill="#7fd8ea" />
          <rect x="267.04" y="309.94" width="50" height="30" fill="#7f95ae" />
          <g transform="translate(165,230) rotate(-10)">
            <ellipse cx="30" cy="8" rx="32" ry="6" fill="#a9b8cb" />
            <path d="M18 8 L28 -14 L36 -12 L26 8Z" fill="#8aa0b8" />
            <path d="M18 8 L28 30 L36 28 L26 8Z" fill="#8aa0b8" />
            <path d="M-2 8 L2 -5 L9 -3 L5 8Z" fill="#7d93ad" />
            <ellipse cx="58" cy="8" rx="6" ry="4" fill="#7fd8ea" />
          </g>
        </g>

        {/* Package Delivery */}
        <g className={`av-scene-g${on === "package-delivery" ? " is-on" : ""}`}>
          <rect x="114.5" y="509.11" width="170" height="85" fill="#879cb4" />
          <rect x="114.5" y="494.11" width="170" height="20" fill="#7f95ae" />
          <rect x="144.5" y="549.11" width="28" height="45" fill="#5b7290" />
          <rect x="182.5" y="549.11" width="28" height="45" fill="#5b7290" />
          <rect x="220.5" y="549.11" width="28" height="45" fill="#5b7290" />
          <g transform="translate(121.49,402.03)">
            <ellipse cx="0" cy="0" rx="16" ry="7" fill="#a9b8cb" />
            <line x1="-16" y1="0" x2="-30" y2="-7" stroke="#8fa3bb" strokeWidth="2.5" />
            <line x1="16" y1="0" x2="30" y2="-7" stroke="#8fa3bb" strokeWidth="2.5" />
            <ellipse cx="-30" cy="-9" rx="12" ry="3.5" fill="none" stroke="#7d93ad" strokeWidth="1.2" />
            <ellipse cx="30" cy="-9" rx="12" ry="3.5" fill="none" stroke="#7d93ad" strokeWidth="1.2" />
            <line x1="-9" y1="7" x2="-14" y2="16" stroke="#7d93ad" strokeWidth="1.5" />
            <line x1="9" y1="7" x2="14" y2="16" stroke="#7d93ad" strokeWidth="1.5" />
            <line x1="0" y1="7" x2="0" y2="18" stroke="#22d3ee" strokeWidth="1" />
            <rect x="-9" y="18" width="18" height="16" rx="2" fill="#22d3ee" stroke="#67e8f9" strokeWidth="1" />
            <line x1="0" y1="18" x2="0" y2="34" stroke="rgba(34, 211, 238,0.5)" strokeWidth="0.8" />
            <line x1="-9" y1="26" x2="9" y2="26" stroke="rgba(34, 211, 238,0.5)" strokeWidth="0.8" />
          </g>
        </g>

        {/* Residential */}
        <g className={`av-scene-g${on === "residential" ? " is-on" : ""}`}>
          <rect x="411.83" y="221.83" width="38" height="28" fill="#8aa0b8" />
          <path d="M405.83 221.83 L430.83 198.83 L455.83 221.83Z" fill="#8399b2" />
          <rect x="422.83" y="232.83" width="10" height="17" fill="#5f7794" />
          <rect x="461.83" y="208.83" width="50" height="41" fill="#8fa3bb" />
          <path d="M455.83 208.83 L486.83 181.83 L517.83 208.83Z" fill="#879cb4" />
          <rect x="479.83" y="232.83" width="13" height="17" fill="#5f7794" />
          <rect x="466.83" y="216.83" width="9" height="9" fill="#7fd8ea" />
          <rect x="521.83" y="204.83" width="55" height="45" fill="#8ea2ba" />
          <path d="M515.83 204.83 L548.83 176.83 L582.83 204.83Z" fill="#8399b2" />
          <rect x="527.83" y="212.83" width="9" height="9" fill="#7fd8ea" />
          <rect x="541.83" y="212.83" width="9" height="9" fill="#7fd8ea" />
          <rect x="557.83" y="212.83" width="9" height="9" fill="#7fd8ea" />
          <rect x="543.83" y="232.83" width="12" height="17" fill="#5f7794" />
          <circle cx="454.83" cy="234.83" r="10" fill="#33909a" />
          <circle cx="516.83" cy="236.83" r="8" fill="#2b7b84" />
          <circle cx="586.83" cy="234.83" r="11" fill="#2f858f" />
          <line x1="401.83" y1="249.83" x2="601.83" y2="249.83" stroke="rgba(220,230,242,0.4)" strokeWidth="1" />
        </g>

        {/* City Center */}
        <g className={`av-scene-g${on === "city-center" ? " is-on" : ""}`}>
          <rect x="712.49" y="420.09" width="32" height="120" fill="#8aa0b8" />
          <rect x="749.49" y="398.09" width="28" height="142" fill="#879cb4" />
          <rect x="782.49" y="440.09" width="22" height="100" fill="#7f95ae" />
          <rect x="809.49" y="380.09" width="38" height="160" fill="#8fa3bb" />
          <rect x="852.49" y="420.09" width="24" height="120" fill="#8297b0" />
          <rect x="881.49" y="450.09" width="20" height="90" fill="#6f86a1" />
          <rect x="717.49" y="430.09" width="6" height="6" fill="#22d3ee" />
          <rect x="725.49" y="430.09" width="6" height="6" fill="#22d3ee" />
          <rect x="717.49" y="442.09" width="6" height="6" fill="#22d3ee" />
          <rect x="814.49" y="390.09" width="7" height="7" fill="rgba(34, 211, 238,0.6)" />
          <rect x="825.49" y="390.09" width="7" height="7" fill="rgba(34, 211, 238,0.6)" />
          <rect x="814.49" y="406.09" width="7" height="7" fill="rgba(34, 211, 238,0.6)" />
          <rect x="825.49" y="406.09" width="7" height="7" fill="rgba(34, 211, 238,0.6)" />
          <rect x="814.49" y="422.09" width="7" height="7" fill="rgba(34, 211, 238,0.6)" />
          <rect x="906.49" y="420.09" width="48" height="120" fill="#3b6ea8" rx="2" />
          <rect x="912.49" y="430.09" width="9" height="9" fill="rgba(0,0,0,0.4)" />
          <rect x="927.49" y="430.09" width="9" height="9" fill="rgba(0,0,0,0.4)" />
          <rect x="912.49" y="446.09" width="9" height="9" fill="rgba(0,0,0,0.4)" />
          <rect x="927.49" y="446.09" width="9" height="9" fill="rgba(0,0,0,0.4)" />
          <rect x="912.49" y="462.09" width="9" height="9" fill="rgba(0,0,0,0.4)" />
          <rect x="927.49" y="462.09" width="9" height="9" fill="rgba(0,0,0,0.4)" />
        </g>

        {/* Medical */}
        <g className={`av-scene-g${on === "medical" ? " is-on" : ""}`}>
          <rect x="489.68" y="475.05" width="112.25" height="99.78" fill="#8aa0b8" />
          <rect x="489.68" y="462.58" width="112.25" height="17.46" fill="#8fa3bb" />
          <rect x="527.1" y="440.13" width="37.42" height="27.44" rx="3.74" fill="#e5484d" />
          <rect x="540.82" y="445.12" width="9.98" height="17.46" fill="#fff" />
          <rect x="532.09" y="451.36" width="27.44" height="4.99" fill="#fff" />
          <rect x="499.66" y="485.03" width="12.47" height="12.47" fill="#7fd8ea" />
          <rect x="519.62" y="485.03" width="12.47" height="12.47" fill="#7fd8ea" />
          <rect x="539.57" y="485.03" width="12.47" height="12.47" fill="#7fd8ea" />
          <rect x="559.53" y="485.03" width="12.47" height="12.47" fill="#7fd8ea" />
          <rect x="579.48" y="485.03" width="12.47" height="12.47" fill="#7fd8ea" />
          <rect x="499.66" y="512.47" width="12.47" height="12.47" fill="#7fd8ea" />
          <rect x="519.62" y="512.47" width="12.47" height="12.47" fill="#7fd8ea" />
          <rect x="539.57" y="512.47" width="12.47" height="12.47" fill="#7fd8ea" />
          <rect x="559.53" y="512.47" width="12.47" height="12.47" fill="#7fd8ea" />
          <rect x="579.48" y="512.47" width="12.47" height="12.47" fill="#7fd8ea" />
          <rect x="529.59" y="537.42" width="32.43" height="37.42" fill="#5f7794" />
          <g transform="translate(446.46,459.18)">
            <ellipse cx="0" cy="0" rx="20" ry="8.73" fill="#a9b8cb" />
            <line x1="-20" y1="0" x2="-37.5" y2="-8.73" stroke="#8fa3bb" strokeWidth="2.5" />
            <line x1="20" y1="0" x2="37.5" y2="-8.73" stroke="#8fa3bb" strokeWidth="2.5" />
            <ellipse cx="-37.5" cy="-11.23" rx="15" ry="4.37" fill="none" stroke="#7d93ad" strokeWidth="1.2" />
            <ellipse cx="37.5" cy="-11.23" rx="15" ry="4.37" fill="none" stroke="#7d93ad" strokeWidth="1.2" />
            <line x1="-11.23" y1="8.73" x2="-17.46" y2="19.96" stroke="#7d93ad" strokeWidth="1.5" />
            <line x1="11.23" y1="8.73" x2="17.46" y2="19.96" stroke="#7d93ad" strokeWidth="1.5" />
            <g transform="translate(0,35)">
              <path d="M0 4 C0 -8.73 -12.47 -11.23 -12.47 -2.49 C-12.47 3.75 0 14.97 0 14.97 C0 14.97 12.47 3.75 12.47 -2.49 C12.47 -11.23 0 -8.73 0 4Z" fill="#e5484d" stroke="#ef5b60" strokeWidth="1.25" />
              <path d="M-7.49 5.35 L-3.74 5.35 L0 -0.87 L3.74 6.24 L6.24 -0.87 L8.73 5.35" fill="none" stroke="#fff" strokeWidth="1.2" />
            </g>
          </g>
        </g>

        {/* Rural */}
        <g className={`av-scene-g${on === "rural" ? " is-on" : ""}`}>
          <rect x="723.49" y="188.08" width="55" height="45" fill="#8ea2ba" />
          <path d="M717.49 188.08 L750.49 161.08 L784.49 188.08Z" fill="#6c86a6" />
          <rect x="741.49" y="209.08" width="16" height="24" fill="#5f7794" />
          <rect x="788.49" y="171.08" width="20" height="62" rx="5" fill="#8aa0b8" />
          <ellipse cx="798.49" cy="171.08" rx="10" ry="6" fill="#8399b2" />
          <line x1="828.49" y1="165.08" x2="828.49" y2="233.08" stroke="#8fa3bb" strokeWidth="2.5" />
          <g transform="translate(828.49,165.08)">
            <line x1="0" y1="0" x2="-16" y2="-20" stroke="#8aa0b8" strokeWidth="2" />
            <line x1="0" y1="0" x2="20" y2="-12" stroke="#8aa0b8" strokeWidth="2" />
            <line x1="0" y1="0" x2="10" y2="20" stroke="#8aa0b8" strokeWidth="2" />
            <line x1="0" y1="0" x2="-20" y2="10" stroke="#8aa0b8" strokeWidth="2" />
          </g>
          <path d="M703.49 213.08 L713.49 178.08 L723.49 213.08Z" fill="#33909a" />
          <path d="M691.49 218.08 L698.49 191.08 L705.49 218.08Z" fill="#2b7b84" />
          <circle cx="853.49" cy="215.08" r="10" fill="#2f858f" />
          <circle cx="871.49" cy="219.08" r="7" fill="#2b7b84" />
          <line x1="688.49" y1="233.08" x2="883.49" y2="233.08" stroke="rgba(220,230,242,0.35)" strokeWidth="1" />
        </g>


    </g>
  );
}

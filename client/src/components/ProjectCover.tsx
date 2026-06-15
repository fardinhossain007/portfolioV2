// Hand-built SVG "cover art" per project — on-brand, scalable, no image files.
// 16:9 viewBox (400 x 225). Each cover shares a framed gradient backdrop.
import type { Project } from "@/siteConfig";

const VB = { w: 400, h: 225 };

function Frame({
  id,
  from,
  to,
  children,
}: {
  id: string;
  from: string;
  to: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <pattern id={`${id}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>
      <rect width={VB.w} height={VB.h} fill={`url(#${id}-bg)`} />
      <rect width={VB.w} height={VB.h} fill={`url(#${id}-dots)`} />
      {children}
      <rect
        width={VB.w}
        height={VB.h}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="2"
      />
    </svg>
  );
}

function RagCover() {
  const s = "url(#rag-stroke)";
  return (
    <Frame id="rag" from="#141a36" to="#0a0f24">
      {/* document */}
      <g transform="translate(54 46)">
        <rect width="120" height="135" rx="8" fill="rgba(255,255,255,0.05)" stroke={s} strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="16" y={22 + i * 20} width={i % 2 ? 70 : 88} height="6" rx="3" fill="rgba(255,255,255,0.18)" />
        ))}
        {/* citation chips */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${16 + i * 26} 112)`}>
            <rect width="20" height="14" rx="4" fill="rgba(34,211,238,0.18)" stroke="#22d3ee" strokeWidth="1" />
            <text x="10" y="11" textAnchor="middle" fontSize="9" fill="#67e8f9" fontFamily="monospace">{i + 1}</text>
          </g>
        ))}
      </g>
      {/* retrieval links to answer node */}
      <g stroke={s} strokeWidth="1.6" fill="none" opacity="0.8">
        <path d="M174 80 C 230 70, 250 95, 300 100" />
        <path d="M174 110 C 230 120, 250 110, 300 104" />
        <path d="M174 140 C 230 150, 250 120, 300 110" />
      </g>
      {/* answer node + shield */}
      <circle cx="316" cy="104" r="26" fill="rgba(129,140,248,0.18)" stroke={s} strokeWidth="2" />
      <path d="M316 90 l 13 5 v 9 c 0 9 -7 14 -13 17 c -6 -3 -13 -8 -13 -17 v -9 z" fill="rgba(34,211,238,0.25)" stroke="#22d3ee" strokeWidth="1.5" />
      <path d="M311 104 l 4 4 l 7 -8" stroke="#a5f3fc" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function PcbCover() {
  const trace = "#34d399";
  return (
    <Frame id="pcb" from="#0c2620" to="#071a2a">
      <g stroke={trace} strokeWidth="2" fill="none" opacity="0.85" strokeLinecap="round">
        <path d="M40 60 H120 V120 H210" />
        <path d="M40 160 H90 V100 H160 V150 H260" />
        <path d="M300 40 V90 H230" />
        <path d="M360 120 H280 V180" />
        <path d="M120 60 V30" />
      </g>
      {/* pads / vias */}
      {[
        [40, 60], [120, 120], [210, 120], [90, 160], [160, 150], [260, 150],
        [300, 40], [230, 90], [360, 120], [280, 180], [120, 30],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="#0b1020" stroke={trace} strokeWidth="2" />
      ))}
      {/* chip */}
      <rect x="170" y="78" width="56" height="44" rx="4" fill="rgba(52,211,153,0.12)" stroke={trace} strokeWidth="2" />
      {/* defect highlight */}
      <rect x="244" y="132" width="40" height="36" rx="3" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5 4" />
      <text x="264" y="126" textAnchor="middle" fontSize="9" fill="#fda4af" fontFamily="monospace">defect</text>
    </Frame>
  );
}

function F1Cover() {
  const s = "url(#f1-stroke)";
  return (
    <Frame id="f1" from="#2a1030" to="#0c0a24">
      {/* speed streaks */}
      <g stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round">
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={20} y1={40 + i * 12} x2={120 - i * 14} y2={40 + i * 12} />
        ))}
      </g>
      {/* telemetry curve */}
      <path
        d="M30 150 L70 120 L100 135 L140 90 L180 110 L220 70 L260 95 L300 55 L360 75"
        fill="none"
        stroke={s}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {[[140, 90], [220, 70], [300, 55]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#c084fc" />
      ))}
      {/* podium */}
      <g transform="translate(286 150)" opacity="0.95">
        <rect x="0" y="20" width="26" height="40" rx="2" fill="rgba(255,255,255,0.10)" stroke={s} strokeWidth="1.5" />
        <rect x="30" y="4" width="26" height="56" rx="2" fill="rgba(192,132,252,0.18)" stroke={s} strokeWidth="1.5" />
        <rect x="60" y="30" width="26" height="30" rx="2" fill="rgba(255,255,255,0.10)" stroke={s} strokeWidth="1.5" />
        <text x="43" y="-4" textAnchor="middle" fontSize="11" fill="#e9d5ff" fontFamily="monospace">P1</text>
      </g>
    </Frame>
  );
}

function TaxiCover() {
  return (
    <Frame id="taxi" from="#10203a" to="#0a1020">
      {/* street grid */}
      <g stroke="rgba(255,255,255,0.10)" strokeWidth="1.5">
        {[60, 120, 180, 240, 300, 360].map((x) => (
          <line key={`v${x}`} x1={x} y1="20" x2={x} y2="205" />
        ))}
        {[55, 105, 155, 205].map((y) => (
          <line key={`h${y}`} x1="20" y1={y} x2="380" y2={y} />
        ))}
      </g>
      {/* route */}
      <path
        d="M70 180 L70 105 L180 105 L180 55 L300 55"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[[70, 180], [300, 55]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 -16 C 9 -16 14 -9 14 -2 C 14 7 0 16 0 16 C 0 16 -14 7 -14 -2 C -14 -9 -9 -16 0 -16 Z"
            fill={i === 0 ? "rgba(129,140,248,0.3)" : "rgba(34,211,238,0.3)"}
            stroke={i === 0 ? "#818cf8" : "#22d3ee"} strokeWidth="2" />
          <circle cx="0" cy="-2" r="4" fill="#fff" />
        </g>
      ))}
      <text x="200" y="35" textAnchor="middle" fontSize="11" fill="#67e8f9" fontFamily="monospace">$1.79</text>
    </Frame>
  );
}

function BioPcbCover() {
  const g = "#34d399";
  return (
    <Frame id="biopcb" from="#0c2a1e" to="#08161f">
      {/* leaf */}
      <path
        d="M200 40 C 120 60, 90 150, 150 190 C 230 200, 290 140, 280 70 C 250 50, 230 42, 200 40 Z"
        fill="rgba(52,211,153,0.10)"
        stroke={g}
        strokeWidth="2"
      />
      {/* circuit veins */}
      <g stroke={g} strokeWidth="1.6" fill="none" opacity="0.9" strokeLinecap="round">
        <path d="M180 180 L205 110 L260 80" />
        <path d="M205 110 L160 95" />
        <path d="M205 110 L235 130" />
        <path d="M205 140 L240 150" />
      </g>
      {[[205, 110], [260, 80], [160, 95], [235, 130], [240, 150]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#0b1020" stroke={g} strokeWidth="2" />
      ))}
      <circle cx="205" cy="110" r="9" fill="rgba(52,211,153,0.3)" />
    </Frame>
  );
}

function MeterCover() {
  const s = "url(#meter-stroke)";
  return (
    <Frame id="meter" from="#161334" to="#0a0a22">
      {/* AC sine */}
      <path
        d="M30 110 q 15 -45 30 0 t 30 0 t 30 0"
        fill="none"
        stroke="#818cf8"
        strokeWidth="2.5"
      />
      <text x="75" y="150" textAnchor="middle" fontSize="10" fill="#a5b4fc" fontFamily="monospace">230V AC</text>
      {/* converter block */}
      <rect x="155" y="80" width="90" height="60" rx="6" fill="rgba(192,132,252,0.12)" stroke={s} strokeWidth="2" />
      <text x="200" y="115" textAnchor="middle" fontSize="11" fill="#e9d5ff" fontFamily="monospace">BUCK</text>
      <path d="M120 110 H155" stroke="#818cf8" strokeWidth="2.5" />
      {/* DC flat */}
      <path d="M245 110 H300" stroke="#22d3ee" strokeWidth="2.5" />
      <path d="M300 110 H372" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="2 5" />
      <text x="320" y="150" textAnchor="middle" fontSize="10" fill="#67e8f9" fontFamily="monospace">5V DC</text>
    </Frame>
  );
}

const COVERS: Record<Project["cover"], () => React.ReactElement> = {
  rag: RagCover,
  pcb: PcbCover,
  f1: F1Cover,
  taxi: TaxiCover,
  biopcb: BioPcbCover,
  meter: MeterCover,
};

export default function ProjectCover({ cover }: { cover: Project["cover"] }) {
  const C = COVERS[cover];
  return <C />;
}

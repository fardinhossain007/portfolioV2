// Full-bleed, responsive neural-network backdrop.
// Renders as an SVG that scales to cover its parent (preserveAspectRatio slice),
// so it grows/shrinks with the screen. Pure CSS animation — no per-frame JS.

const LAYERS = [4, 6, 6, 5, 3];
const W = 1200;
const H = 560;
const PAD_X = 110;
const PAD_Y = 70;
const COLORS = ["#818cf8", "#a78bfa", "#c084fc", "#22d3ee", "#34d399"];

type Node = { x: number; y: number; layer: number; i: number };

function buildLayers(): Node[][] {
  const stepX = (W - PAD_X * 2) / (LAYERS.length - 1);
  return LAYERS.map((count, layer) => {
    const stepY = (H - PAD_Y * 2) / (count - 1 || 1);
    return Array.from({ length: count }, (_, i) => ({
      x: PAD_X + layer * stepX,
      y: count === 1 ? H / 2 : PAD_Y + i * stepY,
      layer,
      i,
    }));
  });
}

const layers = buildLayers();
const edges: { a: Node; b: Node; key: string }[] = [];
for (let l = 0; l < layers.length - 1; l++) {
  for (const a of layers[l]) {
    for (const b of layers[l + 1]) {
      edges.push({ a, b, key: `${l}-${a.i}-${b.i}` });
    }
  }
}

export default function NeuralNetBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      style={{
        // soft vignette so the net fades toward the edges of the viewport
        maskImage:
          "radial-gradient(125% 125% at 50% 45%, black 45%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(125% 125% at 50% 45%, black 45%, transparent 100%)",
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full opacity-30"
      >
        <defs>
          <linearGradient id="netEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* edges */}
        <g stroke="url(#netEdge)" strokeWidth={1} fill="none" opacity={0.55}>
          {edges.map((e, idx) => (
            <line
              key={e.key}
              x1={e.a.x}
              y1={e.a.y}
              x2={e.b.x}
              y2={e.b.y}
              strokeDasharray="3 7"
              style={{
                animation: `flow ${2.2 + (idx % 5) * 0.3}s linear infinite`,
              }}
            />
          ))}
        </g>

        {/* nodes */}
        {layers.map((layer, li) =>
          layer.map((n) => (
            <g key={`${li}-${n.i}`}>
              <circle cx={n.x} cy={n.y} r={14} fill={COLORS[li]} opacity={0.12} />
              <circle
                cx={n.x}
                cy={n.y}
                r={6}
                fill={COLORS[li]}
                style={{
                  filter: `drop-shadow(0 0 7px ${COLORS[li]})`,
                  animation: `pulse-glow ${2.6 + n.i * 0.25}s ease-in-out ${
                    (li + n.i) * 0.18
                  }s infinite`,
                }}
              />
            </g>
          ))
        )}
      </svg>
    </div>
  );
}

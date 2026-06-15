import { useEffect, useRef } from "react";
import { RotateCw } from "lucide-react";

// Interactive "live training" data field:
// scattered points converge into clusters (k-means vibe) and react to the cursor,
// with a live HUD reading out epoch / loss / accuracy. Click "re-train" to replay.

const CLUSTER_COLORS = ["#818cf8", "#c084fc", "#22d3ee"];
const N = 150;
const CONVERGE_MS = 3600;
const TARGET_ACC = 96.6;
const REPEL_R = 78;

type Pt = {
  x: number; y: number; tx: number; ty: number; c: number; ph: number;
};

export default function LiveTrainingHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const epochRef = useRef<HTMLSpanElement>(null);
  const lossRef = useRef<HTMLSpanElement>(null);
  const accRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const retrainRef = useRef<() => void>(() => {});

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pts: Pt[] = [];
    let centroids: { x: number; y: number }[] = [];
    const mouse = { x: -999, y: -999 };
    let start = performance.now();
    let raf = 0;

    function layout() {
      const r = wrap.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function pickCentroids() {
      const mx = W * 0.2, my = H * 0.2;
      centroids = [
        { x: mx + Math.random() * (W - 2 * mx), y: my + Math.random() * (H * 0.4) },
        { x: mx + Math.random() * (W * 0.45), y: H * 0.55 + Math.random() * (H * 0.3) },
        { x: W * 0.55 + Math.random() * (W * 0.3), y: H * 0.5 + Math.random() * (H * 0.35) },
      ];
    }

    function assignTargets() {
      const spread = Math.min(W, H) * 0.13;
      for (const p of pts) {
        const ce = centroids[p.c];
        const a = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * spread;
        p.tx = ce.x + Math.cos(a) * r;
        p.ty = ce.y + Math.sin(a) * r;
      }
    }

    function seed() {
      pts = Array.from({ length: N }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        tx: 0, ty: 0,
        c: i % 3,
        ph: Math.random() * Math.PI * 2,
      }));
      pickCentroids();
      assignTargets();
      start = performance.now();
    }

    function retrain() {
      for (const p of pts) {
        p.x = Math.random() * W;
        p.y = Math.random() * H;
        p.c = Math.floor(Math.random() * 3);
      }
      pickCentroids();
      assignTargets();
      start = performance.now();
    }
    retrainRef.current = retrain;

    function frame(now: number) {
      const t = Math.min((now - start) / CONVERGE_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      // HUD
      if (epochRef.current) epochRef.current.textContent = String(Math.round(eased * 120));
      if (lossRef.current) lossRef.current.textContent = (1.42 * Math.pow(1 - eased, 1.6) + 0.021).toFixed(3);
      if (accRef.current) accRef.current.textContent = (TARGET_ACC * eased).toFixed(1) + "%";
      if (barRef.current) barRef.current.style.width = (eased * 100).toFixed(1) + "%";

      ctx.clearRect(0, 0, W, H);

      // edges to centroid (faint) while converging
      ctx.lineWidth = 1;
      for (const p of pts) {
        const lerp = reduce ? 1 : 0.045 + 0.04 * t;
        p.x += (p.tx - p.x) * lerp;
        p.y += (p.ty - p.y) * lerp;

        // cursor repulsion
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_R * REPEL_R) {
          const d = Math.sqrt(d2) || 1;
          const f = (REPEL_R - d) / REPEL_R;
          p.x += (dx / d) * f * 6;
          p.y += (dy / d) * f * 6;
        }
        // gentle idle bob
        if (!reduce) {
          p.ph += 0.02;
          p.x += Math.cos(p.ph) * 0.12;
          p.y += Math.sin(p.ph) * 0.12;
        }

        const col = CLUSTER_COLORS[p.c];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.shadowColor = col;
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (!reduce) raf = requestAnimationFrame(frame);
    }

    layout();
    seed();
    raf = requestAnimationFrame(frame);
    if (reduce) {
      // settle instantly for reduced motion
      for (let i = 0; i < 200; i++) for (const p of pts) { p.x += (p.tx - p.x) * 0.3; p.y += (p.ty - p.y) * 0.3; }
      frame(start + CONVERGE_MS);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -999; mouse.y = -999; };
    const ro = new ResizeObserver(() => { layout(); pickCentroids(); assignTargets(); });
    ro.observe(wrap);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full aspect-square max-w-[460px] mx-auto">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* HUD */}
      <div className="absolute top-3 left-3 glass-card px-4 py-3 font-mono text-xs pointer-events-none">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          training model.fardin
        </div>
        <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
          <span className="text-muted-foreground">epoch</span>
          <span className="text-foreground">
            <span ref={epochRef}>0</span>/120
          </span>
          <span className="text-muted-foreground">loss</span>
          <span ref={lossRef} className="text-foreground">1.420</span>
          <span className="text-muted-foreground">acc</span>
          <span ref={accRef} className="text-gradient font-semibold">0.0%</span>
        </div>
        <div className="mt-2 h-1 w-full rounded-full bg-white/10 overflow-hidden">
          <div ref={barRef} className="h-full rounded-full" style={{ width: "0%", background: "linear-gradient(90deg,var(--indigo),var(--cyan))" }} />
        </div>
      </div>

      {/* re-train */}
      <button
        onClick={() => retrainRef.current()}
        className="absolute bottom-3 right-3 inline-flex items-center gap-2 glass-card px-3 py-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        <RotateCw className="h-3.5 w-3.5" />
        re-train
      </button>
    </div>
  );
}

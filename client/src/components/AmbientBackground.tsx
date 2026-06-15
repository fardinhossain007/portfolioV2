import NeuralNetBackground from "./NeuralNetBackground";

// Fixed, full-viewport animated gradient blobs + dotted grid + neural net.
// Sits behind all content (z-0) and never intercepts pointer events.
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* dotted grid, fades toward edges */}
      <div
        className="grid-bg absolute inset-0 opacity-60"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      {/* drifting color blobs */}
      <div
        className="ambient-blob animate-float-slow"
        style={{
          width: 520,
          height: 520,
          top: "-8%",
          left: "-6%",
          background: "var(--indigo)",
          animationDelay: "0s",
        }}
      />
      <div
        className="ambient-blob animate-float-slow"
        style={{
          width: 460,
          height: 460,
          top: "20%",
          right: "-8%",
          background: "var(--violet)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="ambient-blob animate-float-slow"
        style={{
          width: 400,
          height: 400,
          bottom: "-10%",
          left: "30%",
          background: "var(--cyan)",
          opacity: 0.35,
          animationDelay: "-12s",
        }}
      />

      {/* neural net layered over the blobs, behind all content */}
      <NeuralNetBackground />
    </div>
  );
}

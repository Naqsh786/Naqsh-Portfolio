import * as React from "react";

// Weight Sweep Preloader — themed for Naqsh Portfolio
// Single purple/indigo design system:
// Background: #00020B, Indigo: #100354, Purple: #5435CC, Muted: #8C92AA, Text: #E4E5ED

const PRESETS = {
  purple: { paper: "#00020B", ink: "#E4E5ED" },
  paper: { paper: "#00020B", ink: "#E4E5ED" },
  ink: { paper: "#00020B", ink: "#E4E5ED" },
  vermilion: { paper: "#00020B", ink: "#E4E5ED" },
  bone: { paper: "#00020B", ink: "#E4E5ED" },
};

const SANS_STACK =
  '"Inter Tight", "Inter Variable", "Inter", "Space Grotesk", "SF Pro Display", "Helvetica Neue", system-ui, sans-serif';
const SERIF_STACK = '"Instrument Serif", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';
const MONO_STACK = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace';

const TICKS = 40;
const LIFT_MS = 700;

/** Clamp to [0, 1]. */
export function wspClamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * The simulated load at time fraction t ∈ [0, 1], as a percentage.
 */
export function wspSimulated(t) {
  const k = wspClamp01(t);
  const ease = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
  const stall = 0.035 * Math.sin(k * Math.PI * 3) * Math.sin(k * Math.PI);
  return Math.max(0, Math.min(100, (ease - stall) * 100));
}

/** The weight drawn at a given percentage, between the lightest and heaviest. */
export function wspWeight(pct, lo, hi) {
  const a = Math.max(1, Math.min(1000, lo));
  const b = Math.max(1, Math.min(1000, hi));
  return Math.round(a + (b - a) * wspClamp01(pct / 100));
}

/** Tracking in em for a weight: hairlines sit open, black sits tight. */
export function wspTracking(weight) {
  return -0.02 - 0.06 * wspClamp01((weight - 100) / 800);
}

/** How many of the rail's ticks are lit at a percentage. */
export function wspTicks(pct, total) {
  return Math.round(wspClamp01(pct / 100) * total);
}

/** Zero-padded three-digit count. */
export function wspPad(pct) {
  const n = Math.max(0, Math.min(100, Math.floor(pct)));
  return (n < 10 ? "00" : n < 100 ? "0" : "") + n;
}

const WSP_CSS = `
.wsp-root { position: relative; width: 100%; overflow: hidden; isolation: isolate; }
.wsp-gate {
  position: absolute; inset: 0; z-index: 2; overflow: hidden;
  container-type: size;
  background: radial-gradient(circle at 50% 25%, rgba(84, 53, 204, 0.16), transparent 70%), #00020B;
  color: #E4E5ED;
  transition: opacity 700ms cubic-bezier(.65,0,.35,1), visibility 0s linear 700ms;
  -webkit-font-smoothing: antialiased; cursor: default;
}
.wsp-gate[data-phase="lift"] { opacity: 0; visibility: hidden; pointer-events: none; }
.wsp-hud {
  position: absolute; left: 0; right: 0; top: 0; display: flex; justify-content: space-between;
  gap: 16px; padding: clamp(18px, 3.2cqw, 34px) clamp(18px, 3.2cqw, 40px) 0;
  font-family: var(--wsp-mono); font-size: 11px; font-weight: 600; letter-spacing: .25em; text-transform: uppercase;
}
.wsp-hud span:first-child { color: #5435CC; text-shadow: 0 0 16px rgba(84, 53, 204, 0.6); display: flex; align-items: center; gap: 8px; }
.wsp-hud span:first-child::before { content: ""; display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #5435CC; box-shadow: 0 0 10px #5435CC; }
.wsp-hud span:last-child { color: #8C92AA; font-variant-numeric: tabular-nums; text-align: right; }
.wsp-rule {
  position: absolute; left: clamp(18px, 3.2cqw, 40px); right: clamp(18px, 3.2cqw, 40px);
  top: calc(clamp(18px, 3.2cqw, 34px) + 24px); height: 0;
  border-top: 1px solid rgba(84, 53, 204, 0.28);
}
.wsp-count {
  position: absolute; left: clamp(6px, 1.4cqw, 22px); bottom: 0; margin: 0;
  font-family: var(--wsp-sans); line-height: .74; white-space: nowrap;
  font-size: min(70cqh, 43cqw); font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1, "ss01" 1;
  transform: translateY(6%); will-change: font-weight;
  color: #E4E5ED;
  text-shadow: 0 0 50px rgba(84, 53, 204, 0.25);
}
.wsp-foot {
  position: absolute; left: clamp(18px, 3.2cqw, 40px); right: clamp(18px, 3.2cqw, 40px);
  top: calc(clamp(18px, 3.2cqw, 34px) + 40px); display: flex; align-items: flex-end; justify-content: space-between; gap: 20px;
  font-family: var(--wsp-mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase;
}
.wsp-foot > span { color: #8C92AA; white-space: nowrap; }
.wsp-rail { display: flex; align-items: flex-end; gap: 0; flex: 0 1 min(46cqw, 520px); justify-content: space-between; height: 11px; }
.wsp-tick { width: 1.5px; height: 5px; background: #443D50; opacity: .45; transition: all 180ms ease; }
.wsp-tick[data-major="true"] { height: 11px; }
.wsp-tick[data-on="true"] { background: #5435CC; opacity: 1; box-shadow: 0 0 8px rgba(84, 53, 204, 0.85); }
.wsp-tick[data-major="true"][data-on="true"] { background: #7c5ce7; box-shadow: 0 0 12px rgba(124, 92, 231, 1); }
.wsp-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .wsp-tick { transition: none; }
}
`;

export default function WeightSweepPreloader({
  children,
  loop = false,
  progress,
  durationMs = 2400,
  preset = "purple",
  palette,
  label = "NAQSH PORTFOLIO",
  caption = "INITIALIZING ARCHITECTURE",
  message = "", // Empty string bypasses the closing panel and directly lifts/fades into portfolio
  weights = [100, 900],
  hud = true,
  fontFamily = SANS_STACK,
  serifFamily = SERIF_STACK,
  monoFamily = MONO_STACK,
  height = "100svh",
  onComplete,
  className = "",
}) {
  const colors = { ...(PRESETS[preset] || PRESETS.purple), ...(palette || {}) };
  const [pct, setPct] = React.useState(0);
  const [phase, setPhase] = React.useState("load");
  const [run, setRun] = React.useState(0);
  const [reduced, setReduced] = React.useState(false);
  const onCompleteRef = React.useRef(onComplete);
  onCompleteRef.current = onComplete;
  const progressRef = React.useRef(progress);
  progressRef.current = progress;

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The count: simulated, or eased toward real progress
  React.useEffect(() => {
    if (phase !== "load") return;
    let raf = 0;
    let shown = 0;
    const t0 = performance.now();
    const dur = Math.max(400, durationMs);
    const tick = (now) => {
      const real = progressRef.current;
      const target = real === undefined ? wspSimulated((now - t0) / dur) : Math.max(0, Math.min(100, Number(real) || 0));
      shown = reduced ? Math.max(shown, target) : Math.max(shown, shown + (target - shown) * 0.18);
      if (target >= 100 && shown > 99.6) shown = 100;
      setPct(shown);
      if (shown >= 100) {
        // Direct lift animation into portfolio when message is empty
        setPhase(message ? "panel" : "lift");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, run, durationMs, reduced, message]);

  // Lift → done
  React.useEffect(() => {
    if (phase === "lift") {
      const t = setTimeout(() => {
        setPhase("done");
        if (!loop) onCompleteRef.current?.();
      }, reduced ? 0 : LIFT_MS);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, loop, reduced]);

  const [lo, hi] = weights;
  const weight = wspWeight(pct, lo, hi);
  const lit = wspTicks(pct, TICKS);
  const count = wspPad(pct);
  const done = phase === "done";

  return (
    <div
      className={"wsp-root " + className}
      style={{
        height,
        "--wsp-paper": colors.paper,
        "--wsp-ink": colors.ink,
        "--wsp-sans": fontFamily,
        "--wsp-serif": serifFamily,
        "--wsp-mono": monoFamily,
      }}
    >
      <style>{WSP_CSS}</style>
      {loop ? null : children}
      {done && !loop ? null : (
        <div
          className="wsp-gate"
          data-phase={phase}
          data-loop={loop}
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.floor(pct)}
        >
          {hud ? (
            <>
              <div className="wsp-hud" aria-hidden="true">
                <span>{label}</span>
                <span>wght {weight}</span>
              </div>
              <div className="wsp-rule" aria-hidden="true" />
            </>
          ) : null}
          <p
            className="wsp-count"
            aria-hidden="true"
            style={{
              fontWeight: weight,
              fontVariationSettings: "'wght' " + weight,
              letterSpacing: wspTracking(weight) + "em",
            }}
          >
            {count}
          </p>
          {hud ? (
            <div className="wsp-foot" aria-hidden="true">
              <span>{caption}</span>
              <div className="wsp-rail">
                {Array.from({ length: TICKS + 1 }, (_, i) => (
                  <i key={i} className="wsp-tick" data-major={i % 10 === 0} data-on={i <= lit} />
                ))}
              </div>
            </div>
          ) : null}
          <span className="wsp-sr" aria-live="polite">
            {phase === "load" ? "" : "Loaded"}
          </span>
        </div>
      )}
    </div>
  );
}

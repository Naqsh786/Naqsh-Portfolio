import { useEffect, useRef, useState } from "react";

export default function GlowCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const start = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...start };
    const ring = { ...start };
    const glow = { ...start };
    const scale = { ring: 1, glow: 1, dot: 1 };
    const target = { ring: 1, glow: 1, dot: 1 };
    const opacity = { val: 0, target: 0 };
    let raf;

    const isInteractive = (e) =>
      e.target instanceof Element &&
      e.target.closest("a, button, input, textarea, select, label, [role='button'], [data-cursor]") !== null;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      opacity.target = 1;
      const interactive = isInteractive(e);
      target.dot = interactive ? 0.8 : 1;
      target.ring = interactive ? 1.6 : 1;
      target.glow = interactive ? 1.45 : 1;
    };

    const onDown = () => {
      target.dot = 0.45;
      target.ring = 0.85;
      target.glow = 1.1;
    };

    const onUp = () => {
      target.dot = 1;
      target.ring = 1;
      target.glow = 1;
    };

    const onLeave = () => {
      opacity.target = 0;
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.2;
      ring.y += (pos.y - ring.y) * 0.2;
      glow.x += (pos.x - glow.x) * 0.09;
      glow.y += (pos.y - glow.y) * 0.09;

      scale.ring += (target.ring - scale.ring) * 0.25;
      scale.glow += (target.glow - scale.glow) * 0.25;
      scale.dot += (target.dot - scale.dot) * 0.35;
      opacity.val += (opacity.target - opacity.val) * 0.3;

      const o = opacity.val.toFixed(3);
      if (dotRef.current) {
        dotRef.current.style.opacity = o;
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${scale.dot.toFixed(3)})`;
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = (opacity.val * 0.9).toFixed(3);
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(${scale.ring.toFixed(3)})`;
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = (opacity.val * 0.5).toFixed(3);
        glowRef.current.style.transform = `translate(${glow.x}px, ${glow.y}px) translate(-50%, -50%) scale(${scale.glow.toFixed(3)})`;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", () => {
      opacity.target = 1;
    });

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
      {/* Soft trailing glow */}
      <div
        ref={glowRef}
        className="fixed left-0 top-0 w-14 h-14 rounded-full bg-neon-primary/20 blur-lg"
        style={{ opacity: 0 }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 w-8 h-8 rounded-full border-2 border-neon-primary/70 shadow-[0_0_12px_rgba(var(--color-neon-primary),0.3)]"
        style={{ opacity: 0 }}
      />
      {/* Instant core dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 w-2 h-2 rounded-full bg-neon-primary shadow-[0_0_10px_3px_rgba(var(--color-neon-primary),0.55)]"
        style={{ opacity: 0 }}
      />
    </div>
  );
}

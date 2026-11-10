import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiRotateCcw, FiGithub, FiMail, FiCode } from "react-icons/fi";

// Constants from Framer FooterField specification
const PUSH = 12000; // px/s² at pointer center
const SIDE = 0.25;  // share of push applied sideways
const RIPPLE_SPEED = 1400; // px/s wave travel speed
const RIPPLE_KICK = 900;  // initial letter impulse on tap
const STIFFNESS = 180;
const DAMPING = 16;
const RADIUS = 150;

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function FooterField({ onReplayIntro }) {
  const wordmark = "NAQSH";
  const letters = Array.from(wordmark);
  const n = letters.length;

  const rootRef = useRef(null);
  const wmRef = useRef(null);
  const lineRef = useRef(null);
  const letterEls = useRef([]);
  const measureRef = useRef(null);

  const [fitFontSize, setFitFontSize] = useState("16vw");

  // Trigger replay intro
  const handleReplayClick = () => {
    if (onReplayIntro) {
      onReplayIntro();
    } else {
      window.dispatchEvent(new CustomEvent("replay-intro"));
    }
  };

  // Responsive font size calculator so wordmark fills width nicely and NEVER gets cut off
  useIsoLayoutEffect(() => {
    const updateSize = () => {
      if (!wmRef.current) return;
      const width = wmRef.current.clientWidth;
      // Fit letters safely across available width with guaranteed padding
      const calculated = Math.max(36, Math.min(230, Math.floor((width * 0.82) / (n * 0.68))));
      setFitFontSize(`${calculated}px`);
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (wmRef.current) ro.observe(wmRef.current);
    return () => ro.disconnect();
  }, [n]);

  // Spring physics simulation for interactive letters
  useEffect(() => {
    const root = rootRef.current;
    const wmEl = wmRef.current;
    if (!root || !wmEl) return;

    const els = letterEls.current.slice(0, n);
    const x = new Float64Array(n);
    const y = new Float64Array(n);
    const vx = new Float64Array(n);
    const vy = new Float64Array(n);
    const cx = new Float64Array(n);
    const cy = new Float64Array(n);
    const hold = new Float64Array(n);
    const rising = new Uint8Array(n);
    const kickT = new Float64Array(n).fill(-1);
    const kickX = new Float64Array(n);
    const kickY = new Float64Array(n);

    let rootLeft = 0;
    let rootTop = 0;
    let rectStale = true;
    let px = 0;
    let py = 0;
    let inside = false;
    let raf = 0;
    let prev = 0;
    let running = false;

    const readRect = () => {
      const r = root.getBoundingClientRect();
      rootLeft = r.left;
      rootTop = r.top;
      rectStale = false;
    };

    const measure = () => {
      for (let i = 0; i < n; i++) {
        const el = els[i];
        if (!el) continue;
        let left = 0;
        let top = 0;
        let node = el;
        while (node && node !== root) {
          left += node.offsetLeft;
          top += node.offsetTop;
          const parent = node.offsetParent;
          node = parent instanceof HTMLElement && root.contains(parent) ? parent : null;
        }
        cx[i] = left + el.offsetWidth / 2;
        cy[i] = top + el.offsetHeight / 2;
      }
      rectStale = true;
    };
    measureRef.current = measure;

    const write = (i, clear) => {
      const el = els[i];
      if (!el) return;
      if (clear) {
        el.style.transform = "";
        el.style.willChange = "";
        el.style.opacity = "";
        return;
      }
      el.style.transform = `translate3d(${x[i].toFixed(2)}px, ${y[i].toFixed(2)}px, 0)`;
      if (rising[i]) {
        const op = hold[i] > 0 ? 0 : Math.max(0, Math.min(1, 1 - y[i] / 80));
        if (op >= 0.999) {
          rising[i] = 0;
          el.style.opacity = "";
        } else {
          el.style.opacity = op.toFixed(3);
        }
      }
    };

    const stop = (snap) => {
      running = false;
      raf = 0;
      for (let i = 0; i < n; i++) {
        if (snap) {
          x[i] = 0;
          y[i] = 0;
          vx[i] = 0;
          vy[i] = 0;
          write(i, true);
        } else {
          if (els[i]) els[i].style.willChange = "";
        }
      }
    };

    const tick = (now) => {
      const dt = prev ? Math.min((now - prev) / 1000, 1 / 30) : 1 / 60;
      prev = now;
      let maxX = 0;
      let maxV = 0;
      let maxA = 0;
      let pending = false;

      for (let i = 0; i < n; i++) {
        if (hold[i] > 0) {
          hold[i] -= dt;
          pending = true;
          continue;
        }
        if (kickT[i] >= 0) {
          kickT[i] -= dt;
          pending = true;
          if (kickT[i] < 0) {
            vx[i] += kickX[i];
            vy[i] += kickY[i];
          }
        }

        let fx = 0;
        let fy = 0;
        if (inside) {
          const dx = cx[i] + x[i] - px;
          const dy = cy[i] + y[i] - py;
          const d = Math.hypot(dx, dy);
          if (d < RADIUS) {
            const f = PUSH * (1 - d / RADIUS);
            fx = d > 0.001 ? (dx / d) * f * SIDE : 0;
            fy = (dy > 0 ? 1 : -1) * f;
          }
        }

        const ax = -STIFFNESS * x[i] - DAMPING * vx[i] + fx;
        const ay = -STIFFNESS * y[i] - DAMPING * vy[i] + fy;
        vx[i] += ax * dt;
        vy[i] += ay * dt;
        x[i] += vx[i] * dt;
        y[i] += vy[i] * dt;

        maxX = Math.max(maxX, Math.abs(x[i]), Math.abs(y[i]));
        maxV = Math.max(maxV, Math.abs(vx[i]), Math.abs(vy[i]));
        maxA = Math.max(maxA, Math.abs(ax), Math.abs(ay));
        write(i, false);
      }

      if (!pending) {
        if (!inside && maxX < 0.05 && maxV < 0.05) return stop(true);
        if (inside && maxV < 0.05 && maxA < 1) return stop(false);
      }

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      prev = 0;
      for (const el of els) {
        if (el) el.style.willChange = "transform";
      }
      raf = requestAnimationFrame(tick);
    };

    const onEnter = (e) => {
      readRect();
      if (e.pointerType === "touch") return;
      px = e.clientX - rootLeft;
      py = e.clientY - rootTop;
    };

    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      if (rectStale) readRect();
      px = e.clientX - rootLeft;
      py = e.clientY - rootTop;
      inside = true;
      start();
    };

    const onLeave = () => {
      if (!inside) return;
      inside = false;
      start();
    };

    const onWheel = () => {
      rectStale = true;
    };

    const onDown = (e) => {
      if (e.pointerType !== "touch") return;
      readRect();
      const tx = e.clientX - rootLeft;
      const ty = e.clientY - rootTop;
      const reach = RADIUS * 3.5;
      for (let i = 0; i < n; i++) {
        const dx = cx[i] - tx;
        const dy = cy[i] - ty;
        const d = Math.hypot(dx, dy);
        const fall = Math.max(0, 1 - d / reach);
        if (fall <= 0) continue;
        const ux = d > 0.001 ? dx / d : 0;
        const uy = d > 0.001 ? dy / d : -1;
        kickT[i] = d / RIPPLE_SPEED;
        kickX[i] = ux * RIPPLE_KICK * fall * SIDE;
        kickY[i] = (uy > 0 ? 1 : -1) * RIPPLE_KICK * fall;
      }
      start();
    };

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);

    // Initial staggered entry rise animation when scrolled into view
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          for (let i = 0; i < n; i++) {
            y[i] = 70;
            hold[i] = i * 0.06;
            rising[i] = 1;
            write(i, false);
          }
          start();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(wmEl);

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("wheel", onWheel);
      ro.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      measureRef.current = null;
      for (const el of els) {
        if (el) {
          el.style.transform = "";
          el.style.willChange = "";
          el.style.opacity = "";
        }
      }
    };
  }, [n]);

  return (
    <footer
      ref={rootRef}
      className="relative w-full bg-[#00020B] text-[#F4F4F5] border-t border-neon-primary/25 pt-16 pb-10 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
      style={{
        boxShadow: "inset 0 30px 60px -30px rgba(84, 53, 204, 0.15)",
      }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(84,53,204,0.18)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col relative z-10">
        {/* Top Row: Brand & Focused Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-14 border-b border-surface/20">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-neon-primary to-[#7c5ce7] flex items-center justify-center text-white shadow-md shadow-neon-primary/30">
                <FiCode className="text-base" />
              </div>
              <span className="text-2xl font-bold font-mono tracking-tight text-white">
                Naqsh<span className="text-neon-primary">.</span>
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Full-Stack Developer building scalable web applications, clean API architectures, and responsive user interfaces with React, Next.js, and Node.js.
            </p>
          </div>

          {/* Quick Navigation (No filler links) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-neon-primary">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-text-secondary">
              <li>
                <a
                  href="#hero"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Skills & Technologies
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Featured Projects
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Services & Solutions
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Get In Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Connect / Actions */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-neon-primary">
              Connect
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-text-secondary">
              <li>
                <a
                  href="https://github.com/Naqsh786"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all"
                >
                  <FiGithub className="text-neon-primary" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:naqshcc916@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all"
                >
                  <FiMail className="text-neon-primary" /> naqshcc916@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant Interactive Physics Wordmark (Framer FooterField) */}
        <div
          ref={wmRef}
          className="w-full py-8 sm:py-12 flex justify-center items-center overflow-hidden border-b border-surface/20"
        >
          <div
            ref={lineRef}
            className="flex justify-center items-center w-full tracking-tighter font-extrabold cursor-default select-none gap-[1vw] sm:gap-[1.5vw] px-2"
            style={{
              fontSize: fitFontSize,
              lineHeight: 0.95,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {letters.map((char, i) => (
              <span
                key={i}
                ref={(el) => (letterEls.current[i] = el)}
                className="inline-block transition-colors duration-200 text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E2E8F0] to-[#5435CC] hover:to-[#8B5CF6] drop-shadow-[0_10px_25px_rgba(84,53,204,0.35)]"
                style={{
                  display: "inline-block",
                  transformOrigin: "center bottom",
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Replay Intro & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-muted font-mono">
          <p className="order-2 sm:order-1 text-center sm:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-neon-primary font-semibold">Muhammad Naqsh</span>. All rights reserved.
          </p>

          <div className="order-1 sm:order-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Replay Intro Button (Requested by User) */}
            <button
              onClick={handleReplayClick}
              type="button"
              id="replay-intro-btn"
              className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-neon-primary/30 bg-[#00020B]/90 hover:bg-neon-primary/10 hover:border-neon-primary text-[#F4F4F5] hover:text-white transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.5)] hover:shadow-neon-primary/20 active:translate-y-[1px]"
              title="Replay introductory animation"
            >
              <FiRotateCcw className="text-xs text-neon-primary group-hover:rotate-180 transition-transform duration-500" />
              <span className="tracking-wide">Replay Intro</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

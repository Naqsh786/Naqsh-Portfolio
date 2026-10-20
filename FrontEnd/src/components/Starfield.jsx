import React, { useEffect, useRef } from "react";

// Starfield / Stars Galaxy — Converted from Framer component
// Source: https://framer.com/m/Stars-Galaxy-mcPCjY.js@Mj2pxzqB0usafl3jU9iO
// Themed with the portfolio purple/indigo design system:
// Background: #00020B, Stars: #ffffff, #E4E5ED, #c4b5fd, #7c5ce7, #5435CC

export default function Starfield({
  stars = 650,
  speed = 1.3,
  spread = 4.5,
  focal = 1.5,
  twinkle = 0.35,
  trail = 0.8,
  size = 1.4,
  fadeInRange = 3.5,
  reverseFly = false,
  followCursor = true,
  background = "#00020B",
  className = "",
  style = {},
}) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    // Cosmic star color palette matching the portfolio theme
    const STAR_PALETTE = [
      "#ffffff",
      "#ffffff",
      "#E4E5ED",
      "#c4b5fd",
      "#7c5ce7",
      "#5435CC",
    ];

    const createStar = () => ({
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread,
      z: Math.random(),
      tw: Math.random() * Math.PI * 2,
      color: STAR_PALETTE[Math.floor(Math.random() * STAR_PALETTE.length)],
    });

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const w = Math.max(rect.width, 300);
      const h = Math.max(rect.height, 300);
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    starsRef.current = Array.from({ length: stars }, createStar);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.current.x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      mouse.current.y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let raf = 0;
    const animate = () => {
      const w = canvas.width / DPR;
      const h = canvas.height / DPR;

      ctx.globalAlpha = 1;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);

      if (trail < 1) {
        ctx.globalAlpha = 1 - trail;
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, w, h);
      }

      const cx = followCursor ? mouse.current.x * w : w / 2;
      const cy = followCursor ? mouse.current.y * h : h / 2;

      for (const s of starsRef.current) {
        const depth = s.z * clamp(focal, 0.01, 10) + 0.001;
        const px = cx + (s.x / depth) * w;
        const py = cy + (s.y / depth) * h;

        s.z += reverseFly
          ? clamp(speed, 0, 10) * 0.002
          : -clamp(speed, 0, 10) * 0.002;

        if (s.z <= 0 || s.z > 1) {
          Object.assign(s, createStar());
        }

        s.tw += clamp(twinkle, 0, 1) * 0.05;
        const alpha = Math.max(0, 1 - s.z / clamp(fadeInRange, 0.1, 10));
        const radius =
          clamp(size, 0.1, 5) *
          (1 - s.z) *
          (1 + Math.sin(s.tw) * clamp(twinkle, 0, 1));

        if (px >= -20 && px <= w + 20 && py >= -20 && py <= h + 20) {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.7, radius), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [
    stars,
    speed,
    spread,
    focal,
    twinkle,
    trail,
    size,
    fadeInRange,
    reverseFly,
    followCursor,
    background,
  ]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ background, ...style }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

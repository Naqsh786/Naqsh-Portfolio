import React, { useEffect, useRef } from "react";

/**
 * CursorDotTrail — Framer Cursor Dot Trail Component
 * Source: https://framer.com/m/CursorDotTrail-ZDqFAE.js@iLyzK205nNCuHNDP5Nsc
 * 
 * High-performance canvas-based cursor:
 * - Spring-physics smooth follower dot
 * - Clean, sleek fading trail (180ms, no accumulation)
 * - Guaranteed DPR clearRect wiping
 * - Interactive hover ring over buttons, links, inputs
 * - Themed in portfolio neon purple (#7c5ce7 / #a78bfa)
 */

export default function CursorDotTrail({
  color = "#8b5cf6",
  accentColor = "#c4b5fd",
  size = 10,
  hoverSize = 36,
  borderWidth = 2,
  spring = 0.22,
  friction = 0.6,
  trailDuration = 180,
  transitionSpeed = 0.2,
}) {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const ballRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const animRef = useRef();
  const lastTimeRef = useRef(0);
  const radiusRef = useRef(size / 2);
  const fillOpacityRef = useRef(1);
  const strokeOpacityRef = useRef(0);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();

    const onMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (ballRef.current.x < 0) {
        ballRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resize);

    const lerp = (from, to, amt) => from + (to - from) * amt;

    const animate = () => {
      const now = performance.now();
      const dt = Math.min(now - lastTimeRef.current, 33);
      lastTimeRef.current = now;

      // ── Always clean full raw canvas regardless of DPR transforms ──
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Only run if mouse has moved into window
      if (targetRef.current.x >= 0) {
        // Spring physics
        const dx = targetRef.current.x - ballRef.current.x;
        const dy = targetRef.current.y - ballRef.current.y;
        velocityRef.current.x += dx * spring;
        velocityRef.current.y += dy * spring;
        velocityRef.current.x *= friction;
        velocityRef.current.y *= friction;
        ballRef.current.x += velocityRef.current.x;
        ballRef.current.y += velocityRef.current.y;

        // Only add points if moving to avoid point accumulation
        const speed = Math.hypot(velocityRef.current.x, velocityRef.current.y);
        if (speed > 0.5) {
          pointsRef.current.push({
            x: ballRef.current.x,
            y: ballRef.current.y,
            age: 0,
          });
        }

        // Age and filter points
        for (let i = 0; i < pointsRef.current.length; i++) {
          pointsRef.current[i].age += dt;
        }
        pointsRef.current = pointsRef.current.filter((p) => p.age < trailDuration);

        // Hover detection
        const el = document.elementFromPoint(targetRef.current.x, targetRef.current.y);
        const isInteractive = !!el?.closest(
          "a, button, [role='button'], input, textarea, select, [data-interactive]"
        );
        isHoveredRef.current = isInteractive;

        // Draw sleek connecting trail line
        if (pointsRef.current.length > 2) {
          ctx.beginPath();
          ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);

          for (let i = 1; i < pointsRef.current.length; i++) {
            ctx.lineTo(pointsRef.current[i].x, pointsRef.current[i].y);
          }

          const oldest = pointsRef.current[0];
          const newest = pointsRef.current[pointsRef.current.length - 1];
          const gradient = ctx.createLinearGradient(oldest.x, oldest.y, newest.x, newest.y);
          gradient.addColorStop(0, "rgba(84, 53, 204, 0)");
          gradient.addColorStop(0.5, "rgba(124, 92, 231, 0.5)");
          gradient.addColorStop(1, "rgba(196, 181, 253, 0.9)");

          ctx.strokeStyle = gradient;
          ctx.lineWidth = Math.max(2, size / 3.5);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }

        // Target size & opacity lerping
        const targetRadius = isInteractive ? hoverSize / 2 : size / 2;
        radiusRef.current = lerp(radiusRef.current, targetRadius, transitionSpeed);
        fillOpacityRef.current = lerp(fillOpacityRef.current, isInteractive ? 0.1 : 1, transitionSpeed);
        strokeOpacityRef.current = lerp(strokeOpacityRef.current, isInteractive ? 1 : 0.3, transitionSpeed);

        // Draw cursor dot / hover ring
        ctx.beginPath();
        ctx.arc(ballRef.current.x, ballRef.current.y, radiusRef.current, 0, Math.PI * 2);

        // Outer glow
        ctx.shadowColor = isInteractive ? "#5435CC" : "#7c5ce7";
        ctx.shadowBlur = isInteractive ? 16 : 8;

        if (strokeOpacityRef.current > 0.02) {
          ctx.strokeStyle = `rgba(196, 181, 253, ${strokeOpacityRef.current})`;
          ctx.lineWidth = borderWidth;
          ctx.stroke();
        }

        if (fillOpacityRef.current > 0.02) {
          ctx.fillStyle = isInteractive
            ? `rgba(84, 53, 204, ${fillOpacityRef.current})`
            : "#ffffff";
          ctx.fill();
        }

        // Center dot when hovering
        if (isInteractive) {
          ctx.beginPath();
          ctx.arc(ballRef.current.x, ballRef.current.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }

        ctx.shadowBlur = 0;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [color, accentColor, size, hoverSize, borderWidth, spring, friction, trailDuration, transitionSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999]"
      style={{ display: "block" }}
    />
  );
}

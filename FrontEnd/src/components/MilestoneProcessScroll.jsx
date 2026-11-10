import React, { useEffect, useRef, useState } from "react";
import { FiLayers, FiCode, FiCompass, FiUploadCloud } from "react-icons/fi";

const processMilestones = [
  {
    step: "01",
    phase: "Phase 01",
    stage: "Architecture & Data Modeling",
    title: "Requirements & System Design",
    tag: "System Design",
    desc: "Defining functional requirements, structuring relational and document database schemas, establishing RESTful API contracts, and selecting the optimal technology stack before implementation.",
    deliverables: ["Architecture Blueprint", "Schema Design", "API Contracts"],
    icon: FiCompass,
    side: "right",
  },
  {
    step: "02",
    phase: "Phase 02",
    stage: "Interface Architecture",
    title: "Design Systems & Component Prototyping",
    tag: "Frontend Architecture",
    desc: "Developing accessible, modular design tokens and reusable component libraries in React. Ensuring responsive layouts, intuitive state handling, and smooth micro-interactions across devices.",
    deliverables: ["Design Tokens", "Component Library", "Responsive Layouts"],
    icon: FiLayers,
    side: "left",
  },
  {
    step: "03",
    phase: "Phase 03",
    stage: "Full-Stack Development",
    title: "Core Implementation & Integration",
    tag: "Core Engineering",
    desc: "Writing modular frontend and backend code, connecting RESTful endpoints, configuring secure authentication (JWT/OAuth), and optimizing database queries for high throughput.",
    deliverables: ["Frontend & Backend Logic", "Auth & Security", "State Management"],
    icon: FiCode,
    side: "right",
  },
  {
    step: "04",
    phase: "Phase 04",
    stage: "Quality & Deployment",
    title: "Testing, Optimization & Production Launch",
    tag: "Production Release",
    desc: "Executing cross-browser testing, auditing Core Web Vitals and Lighthouse scores, configuring CI/CD automation pipelines, and provisioning reliable cloud hosting with zero downtime.",
    deliverables: ["Performance Audit", "CI/CD Pipeline", "Production Deployment"],
    icon: FiUploadCloud,
    side: "left",
  },
];

export default function MilestoneProcessScroll() {
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [activeStep, setActiveStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(new Set([0]));

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      rafId = 0;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      // Track scroll as container passes through the middle of the viewport
      const startOffset = windowHeight * 0.65;
      const totalScrollableDistance = rect.height;
      const currentScroll = startOffset - rect.top;

      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollableDistance));
      setScrollProgress(progress);

      // Determine the milestone closest to reading eye-level
      const readingLine = windowHeight * 0.48;
      let closestIdx = -1;
      let minDistance = Infinity;

      const currentVisible = new Set();

      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        const elRect = el.getBoundingClientRect();
        const elCenter = elRect.top + elRect.height / 2;
        const distance = Math.abs(elCenter - readingLine);

        // Track closest milestone only if container has been reached
        if (progress > 0 && distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }

        // Card is visible when inside the active scroll window (reverses when scrolling back out)
        if (elRect.top < windowHeight * 0.92 && elRect.bottom > 0) {
          currentVisible.add(idx);
        }
      });

      setVisibleSteps(currentVisible);
      setActiveStep(closestIdx);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="w-full relative mt-20 md:mt-28">
      {/* Section Header - Clean, professional, unsloped */}
      <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
          How Ideas Become <span className="gradient-text">Production Systems</span>
        </h3>
        <p className="text-muted text-xs sm:text-sm md:text-base font-sans mt-3 leading-relaxed">
          A disciplined, milestone-by-milestone workflow from initial schema design to high-performance production deployment.
        </p>
      </div>

      {/* Milestone Scroll Track Container */}
      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* ── Central Rail (Desktop: Center / Mobile: Left side) ── */}
        <div className="absolute top-4 bottom-4 left-6 md:left-1/2 -translate-x-1/2 w-[2px] pointer-events-none z-0">
          {/* Base background line */}
          <div className="w-full h-full bg-gradient-to-b from-transparent via-surface/30 to-transparent" />

          {/* Scrolling active neon line */}
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-neon-primary via-[#8B5CF6] to-neon-primary transition-all duration-150 ease-out shadow-[0_0_8px_rgba(84,53,204,0.5)]"
            style={{
              height: `${scrollProgress * 100}%`,
            }}
          >
            {/* Glowing lead bead at the bottom of the active line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#5435CC,0_0_16px_#8B5CF6]" />
          </div>
        </div>

        {/* ── Steps List ── */}
        <div className="flex flex-col gap-12 md:gap-20 relative z-10">
          {processMilestones.map((item, idx) => {
            const isStepActive = idx <= activeStep;
            const isCurrent = idx === activeStep;
            const isVisible = visibleSteps.has(idx);
            const isRight = item.side === "right"; // Step 1 & 3 on right, 2 & 4 on left

            return (
              <div
                key={item.step}
                ref={(el) => (stepRefs.current[idx] = el)}
                className="relative flex items-center"
              >
                {/* ── Center Milestone Circle Node ── */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md border-2 transition-all duration-500 flex items-center justify-center font-mono text-xs sm:text-sm font-bold bg-[#00020B] ${
                      isStepActive
                        ? "border-neon-primary text-white shadow-[0_2px_12px_rgba(84,53,204,0.5)] scale-105"
                        : "border-surface/60 text-muted/50 scale-95"
                    }`}
                  >
                    <span>{item.step}</span>
                  </div>
                </div>

                {/* ── Two-Column Row (Desktop: Alternating / Mobile: Offset to right of rail) ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 w-full pl-14 md:pl-0">
                  {/* Left Column Container */}
                  <div
                    className={`flex flex-col justify-center ${
                      isRight ? "md:items-end md:text-right order-2 md:order-1" : "order-1"
                    }`}
                  >
                    {!isRight ? (
                      /* Step 2 & Step 4: Card on LEFT side (animates from left) */
                      <div
                        className={`w-full rounded-xl p-5 sm:p-7 bg-[#00020B]/90 border transition-all duration-700 ${
                          isVisible
                            ? "translate-x-0 opacity-100"
                            : "md:-translate-x-10 opacity-0"
                        } ${
                          isCurrent
                            ? "border-neon-primary/70 shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
                            : "border-surface/40 hover:border-surface/80 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="text-[11px] font-mono font-semibold text-neon-primary tracking-wider uppercase">
                            {item.phase}
                          </span>
                          <span className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-surface/40 text-[10px] font-mono text-muted">
                            {item.tag}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight">
                          {item.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                          {item.desc}
                        </p>

                        <div className="pt-3 border-t border-surface/30 flex flex-wrap gap-1.5">
                          {item.deliverables.map((del, dIdx) => (
                            <span
                              key={dIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-surface/30 text-[10px] sm:text-[11px] font-mono text-text-secondary"
                            >
                              <span className="w-1 h-1 rounded-sm bg-neon-primary" />
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Step 1 & Step 3: Phase Info Label on LEFT side (Desktop only) */
                      <div
                        className={`hidden md:flex flex-col items-end transition-all duration-700 ${
                          isVisible
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-6 opacity-0"
                        }`}
                      >
                        <span className="text-xs font-mono font-semibold text-neon-primary tracking-widest uppercase mb-1">
                          {item.phase}
                        </span>
                        <span className="text-sm font-medium text-text-secondary">
                          {item.stage}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Column Container */}
                  <div
                    className={`flex flex-col justify-center ${
                      isRight ? "order-1 md:order-2" : "md:items-start md:text-left order-2"
                    }`}
                  >
                    {isRight ? (
                      /* Step 1 & Step 3: Card on RIGHT side (animates from right) */
                      <div
                        className={`w-full rounded-xl p-5 sm:p-7 bg-[#00020B]/90 border transition-all duration-700 ${
                          isVisible
                            ? "translate-x-0 opacity-100"
                            : "md:translate-x-10 opacity-0"
                        } ${
                          isCurrent
                            ? "border-neon-primary/70 shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
                            : "border-surface/40 hover:border-surface/80 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="text-[11px] font-mono font-semibold text-neon-primary tracking-wider uppercase">
                            {item.phase}
                          </span>
                          <span className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-surface/40 text-[10px] font-mono text-muted">
                            {item.tag}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight">
                          {item.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                          {item.desc}
                        </p>

                        <div className="pt-3 border-t border-surface/30 flex flex-wrap gap-1.5">
                          {item.deliverables.map((del, dIdx) => (
                            <span
                              key={dIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-surface/30 text-[10px] sm:text-[11px] font-mono text-text-secondary"
                            >
                              <span className="w-1 h-1 rounded-sm bg-neon-primary" />
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Step 2 & Step 4: Phase Info Label on RIGHT side (Desktop only) */
                      <div
                        className={`hidden md:flex flex-col items-start transition-all duration-700 ${
                          isVisible
                            ? "translate-x-0 opacity-100"
                            : "translate-x-6 opacity-0"
                        }`}
                      >
                        <span className="text-xs font-mono font-semibold text-neon-primary tracking-widest uppercase mb-1">
                          {item.phase}
                        </span>
                        <span className="text-sm font-medium text-text-secondary">
                          {item.stage}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

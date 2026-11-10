import React, { useState, useEffect } from "react";
import { FiExternalLink, FiGithub, FiMaximize2, FiX, FiLayers, FiChevronDown, FiArrowUpRight } from "react-icons/fi";
import Starfield from "../Starfield";

/**
 * MotionTiles — Interactive 3D Project Showcase
 * 
 * Implemented per user's specifications:
 * 1. In-place accordion: Clicking a project in "Select Project to Inspect" expands
 *    its details directly underneath that item with smooth animation.
 * 2. Toggle behavior: Clicking the same active project again collapses/closes it.
 * 3. Clicking any other project or 3D card expands that project and switches the active 3D image.
 * 4. No separate box below the list, keeping the entire section compact and perfectly aligned
 *    so the "Featured Projects" heading stays visible without scrolling.
 * 5. Normal hover effect with subtle light/glow only (no aggressive hover switching).
 * 6. Preserved cosmic Stars Galaxy background and dark neon aesthetic.
 */

export default function MotionTiles({ projects = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(0); // Project 01 open by default
  const [lightboxImage, setLightboxImage] = useState(null);

  // Close lightbox on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!projects || projects.length === 0) return null;

  // Toggle accordion open/close
  const handleToggle = (idx) => {
    if (expandedIndex === idx) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(idx);
      setActiveIndex(idx);
    }
  };

  // When clicking a 3D card on the right
  const handleCardClick = (idx) => {
    setActiveIndex(idx);
    setExpandedIndex(idx);
  };

  return (
    <div className="relative w-full py-6 md:py-10 overflow-hidden">
      {/* ── Background: Cosmic Stars Galaxy (preserved) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Starfield
          stars={600}
          speed={0.85}
          spread={4.5}
          focal={1.5}
          twinkle={0.35}
          trail={0.75}
          size={1.3}
          background="transparent"
          className="w-full h-full"
        />
        {/* Ambient Cosmic Purple & Violet Nebulas */}
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-neon-primary/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#7c5ce7]/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00020B] via-transparent to-[#00020B] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Main Two-Column Layout (Pinned Top Alignment for 100% Stability) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ════ LEFT COLUMN: In-Place Expandable Project Accordion ════ */}
          <div className="lg:col-span-6 flex flex-col space-y-3">
            
            {/* Header label */}
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-mono font-bold text-neon-primary uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-primary animate-pulse shadow-[0_0_8px_#5435CC]" />
                Select Project To Inspect
              </span>
              <span className="text-xs font-mono text-muted/70">
                {projects.length} Production Builds
              </span>
            </div>

            {/* Project Accordion List */}
            {projects.map((proj, idx) => {
              const isSelected = activeIndex === idx;
              const isExpanded = expandedIndex === idx;
              const shortTitle = proj.title.split("–")[0].trim();
              const category = proj.title.split("–")[1]?.trim() || proj.technologies?.[0] || "Full Stack Application";

              return (
                <div
                  key={proj._id || idx}
                  className={`rounded-lg transition-all duration-300 border overflow-hidden ${
                    isExpanded
                      ? "bg-[#00020B]/90 border-neon-primary shadow-[0_8px_28px_rgba(0,0,0,0.85)]"
                      : isSelected
                      ? "bg-[#00020B]/75 border-neon-primary/60 shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                      : "bg-[#00020B]/50 border-surface/40 hover:border-neon-primary/40 hover:bg-[#00020B]/80 hover:shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  {/* Clickable Header Row */}
                  <button
                    type="button"
                    onClick={() => handleToggle(idx)}
                    className="w-full p-4 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Number badge */}
                      <span
                        className={`font-mono text-xs font-bold transition-colors shrink-0 ${
                          isSelected ? "text-neon-primary" : "text-muted"
                        }`}
                      >
                        0{idx + 1}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-sm transition-colors truncate max-w-[220px] ${
                              isSelected
                                ? "bg-neon-primary/20 text-[#c4b5fd] border border-neon-primary/30"
                                : "bg-surface/30 text-muted/80 border border-surface/20"
                            }`}
                          >
                            {category}
                          </span>
                        </div>
                        <h4
                          className={`text-sm sm:text-base font-bold transition-colors truncate ${
                            isSelected ? "text-white" : "text-text-primary/80"
                          }`}
                        >
                          {shortTitle}
                        </h4>
                      </div>
                    </div>

                    {/* Chevron Indicator */}
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isExpanded
                          ? "bg-neon-primary text-white border-neon-primary shadow-[0_2px_8px_rgba(84,53,204,0.5)] rotate-180"
                          : isSelected
                          ? "bg-neon-primary/20 text-neon-primary border-neon-primary/40"
                          : "bg-surface/30 text-muted border-surface/30"
                      }`}
                    >
                      <FiChevronDown className="text-base" />
                    </div>
                  </button>

                  {/* ── Accordion Collapsible Detail Drawer ── */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "max-h-[900px] opacity-100 border-t border-surface/30 px-4 sm:px-5 pt-4 pb-5 space-y-4"
                        : "max-h-0 opacity-0 py-0 px-4 sm:px-5 border-t-0 pointer-events-none"
                    }`}
                  >
                    {/* Mobile In-Accordion Visual Showcase Preview (< lg) */}
                    <div className="block lg:hidden rounded-lg overflow-hidden border border-neon-primary/40 relative aspect-[16/10] bg-[#00020B] shadow-[0_12px_28px_rgba(0,0,0,0.8)] group/mobimg">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00020B] via-[#00020B]/20 to-transparent pointer-events-none" />
                      
                      {/* Top Badge Overlay */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#00020B]/85 backdrop-blur-md border border-surface/50 text-[10px] font-mono font-bold text-white">
                          0{idx + 1} // {shortTitle}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxImage(proj);
                          }}
                          className="p-1.5 rounded-md bg-neon-primary text-white shadow-[0_2px_8px_rgba(84,53,204,0.5)] active:scale-90 transition-transform"
                          aria-label="Expand screenshot"
                          title="View full image"
                        >
                          <FiMaximize2 className="text-xs" />
                        </button>
                      </div>

                      {/* Bottom active pill */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                        <span className="text-[10px] font-mono text-neon-primary font-bold uppercase tracking-wider truncate max-w-[200px]">
                          {proj.technologies?.slice(0, 3).join(" • ")}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-neon-primary/90 text-white text-[9px] font-mono font-bold shadow-sm">
                          <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                          ACTIVE
                        </span>
                      </div>
                    </div>

                    {/* Full Title */}
                    <h5 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                      {proj.title}
                    </h5>

                    {/* Description */}
                    <p className="text-muted text-xs sm:text-sm leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Tech Stack Pills */}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-neon-primary uppercase tracking-wider mb-2">
                          <FiLayers className="text-xs" />
                          <span>Stack & Technologies</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md bg-surface/35 border border-surface/50 text-text-primary text-[11px] font-mono hover:border-neon-primary/50 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Link Buttons */}
                    <div className="pt-3 border-t border-surface/30 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {proj.liveDemo && (
                        <a
                          href={proj.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-neon-primary text-white text-xs font-bold shadow-[0_4px_14px_rgba(84,53,204,0.3)] hover:bg-white hover:text-neon-primary transition-all duration-200 active:scale-[0.98] min-h-[40px]"
                        >
                          <FiExternalLink className="text-sm" />
                          <span>Live Demo</span>
                        </a>
                      )}

                      {proj.gitFrontend && (
                        <a
                          href={proj.gitFrontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#0D0D1A] border border-neon-primary/40 text-muted hover:text-white hover:border-neon-primary hover:bg-neon-primary/10 text-xs font-bold transition-all duration-200 active:scale-[0.98] min-h-[40px]"
                        >
                          <FiGithub className="text-sm" />
                          <span>Frontend</span>
                        </a>
                      )}

                      {proj.gitBackend && (
                        <a
                          href={proj.gitBackend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#0D0D1A] border border-[#7c5ce7]/40 text-muted hover:text-white hover:border-[#7c5ce7] hover:bg-[#7c5ce7]/10 text-xs font-bold transition-all duration-200 active:scale-[0.98] min-h-[40px]"
                        >
                          <FiGithub className="text-sm" />
                          <span>Backend</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ════ RIGHT COLUMN: Large 3D Motion Tiles Showcase (Pinned Sticky & Stable on Desktop) ════ */}
          <div className="hidden lg:flex lg:col-span-6 flex-col items-center justify-start lg:sticky lg:top-28 self-start relative mt-2 lg:mt-0">
            
            {/* Ambient Radial Spotlight */}
            <div className="absolute w-[400px] sm:w-[500px] h-[350px] sm:h-[400px] rounded-full bg-gradient-to-tr from-neon-primary/25 via-[#7c5ce7]/15 to-transparent blur-3xl pointer-events-none" />

            {/* 3D Isometric Cards Deck Container */}
            <div
              className="relative w-full max-w-[560px] aspect-[16/10] select-none"
              style={{
                perspective: "1400px",
              }}
            >
              <div
                className="relative w-full h-full"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(8deg) rotateY(-14deg)",
                  transition: "transform 0.5s ease-out",
                }}
              >
                {projects.map((proj, idx) => {
                  const isActive = activeIndex === idx;
                  const offset = idx - activeIndex;

                  // 3D Stacking logic:
                  // Active card sits in the front with full prominence
                  // Other cards step back in 3D depth, stacked cleanly on X/Z axes with yShift = 0 (100% vertical stability)
                  let zPos = 100;
                  let xShift = 0;
                  let yShift = 0;
                  let opacity = 1;
                  let scale = 1;

                  if (!isActive) {
                    const depth = offset > 0 ? offset : projects.length + offset;
                    zPos = 100 - depth * 80;
                    xShift = depth * 28;
                    yShift = 0; // Completely rock-solid vertical position: NO UP/DOWN SHIFTING
                    opacity = Math.max(0.35, 0.95 - depth * 0.2);
                    scale = Math.max(0.88, 1 - depth * 0.04);
                  }

                  return (
                    <div
                      key={proj._id || idx}
                      onClick={() => handleCardClick(idx)}
                      className={`absolute inset-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-out group ${
                        isActive
                          ? "ring-2 ring-neon-primary shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(84,53,204,0.3)]"
                          : "border border-surface/50 hover:border-neon-primary/60 hover:shadow-[0_12px_28px_rgba(0,0,0,0.7)]"
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                        transform: `translate3d(${xShift}px, ${yShift}px, ${zPos}px) scale(${scale})`,
                        opacity,
                        zIndex: isActive ? 40 : 30 - Math.abs(offset),
                        background: "#00020B",
                      }}
                    >
                      {/* High-Resolution Project Screenshot */}
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Vignette Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00020B] via-[#00020B]/30 to-transparent pointer-events-none" />
                      
                      {/* Top Bar on Card */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                        <span className="px-2.5 py-1 rounded-md bg-[#00020B]/90 backdrop-blur-md border border-surface/60 text-xs font-mono font-bold text-white shadow-md">
                          0{idx + 1} // {proj.title.split("–")[0].trim()}
                        </span>

                        {isActive ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLightboxImage(proj);
                            }}
                            className="p-1.5 rounded-md bg-neon-primary/90 hover:bg-white hover:text-neon-primary text-white backdrop-blur-md shadow-[0_2px_10px_rgba(84,53,204,0.5)] transition-all"
                            title="Expand Screenshot"
                            aria-label="Expand image"
                          >
                            <FiMaximize2 className="text-sm" />
                          </button>
                        ) : (
                          <span className="px-2.5 py-1 rounded-md bg-[#00020B]/80 text-[11px] font-mono text-muted border border-surface/40">
                            Click to View
                          </span>
                        )}
                      </div>

                      {/* Bottom Banner on Card */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                        <div className="min-w-0 pr-3">
                          <p className="text-xs font-mono text-neon-primary font-bold uppercase tracking-wider mb-0.5">
                            {proj.technologies?.slice(0, 3).join(" • ")}
                          </p>
                          <h4 className="text-white font-extrabold text-sm sm:text-base truncate drop-shadow-md">
                            {proj.title}
                          </h4>
                        </div>

                        {isActive && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neon-primary text-white text-xs font-mono font-bold shadow-[0_2px_10px_rgba(84,53,204,0.4)] shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            ACTIVE
                          </span>
                        )}
                      </div>

                      {/* Normal Hover Glow Light Effect (NO PROJECT SHUFFLING) */}
                      <div className="absolute inset-0 bg-neon-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Helper Indicator Text below the stage */}
            <p className="text-xs font-mono text-muted/70 mt-6 text-center">
              ✦ Click any project on the left or 3D card on the right to inspect details & live demo
            </p>
          </div>
        </div>

        {/* ── View More Projects on GitHub Button (Desktop & Mobile) ── */}
        <div className="mt-10 sm:mt-12 flex justify-center items-center">
          <a
            href="https://github.com/Naqsh786?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            id="view-more-github-btn"
            className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-gradient-to-r from-[#00020B] via-[#0D0D1A] to-[#00020B] border border-neon-primary/40 hover:border-neon-primary text-white font-mono text-xs sm:text-sm font-bold tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_30px_rgba(84,53,204,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
          >
            {/* Ambient inner reactive glow */}
            <div className="absolute inset-0 rounded-lg bg-neon-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <FiGithub className="text-base sm:text-lg text-neon-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
            <span className="relative z-10 font-semibold text-text-primary group-hover:text-white">
              View More Projects on GitHub
            </span>
            <FiArrowUpRight className="text-sm sm:text-base text-neon-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          LIGHTBOX MODAL (Opens only when user clicks Expand button)
          ═════════════════════════════════════════════════════════════════ */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] rounded-xl overflow-hidden bg-[#00020B] border border-neon-primary/60 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col"
          >
            {/* Lightbox Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-surface/40 bg-[#00020B]/90">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {lightboxImage.title}
                </h4>
                <p className="text-xs font-mono text-neon-primary">
                  {lightboxImage.technologies?.join(" • ")}
                </p>
              </div>

              <button
                onClick={() => setLightboxImage(null)}
                className="w-9 h-9 rounded-md bg-[#0D0D1A] border border-surface/60 flex items-center justify-center text-muted hover:text-white hover:border-neon-primary transition-all"
                aria-label="Close lightbox"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Full Image */}
            <div className="overflow-auto flex-1 p-2 bg-[#00020B]">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="w-full h-auto rounded-lg object-contain mx-auto"
              />
            </div>

            {/* Lightbox Footer Actions */}
            <div className="p-4 border-t border-surface/40 flex items-center justify-end gap-3 bg-[#00020B]/90">
              {lightboxImage.liveDemo && (
                <a
                  href={lightboxImage.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neon-primary text-white text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(84,53,204,0.3)] hover:bg-white hover:text-neon-primary transition-all"
                >
                  <FiExternalLink className="text-sm" />
                  <span>Open Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFadingOut(true), 200);
          setTimeout(onComplete, 800);
          return 100;
        }
        // Smooth non-linear progress acceleration
        const increment = Math.floor(Math.random() * 3) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 22);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Dynamic system status status text based on progress stage
  const getStatusText = () => {
    if (progress < 25) return "INITIALIZING CORE SYSTEM // V2.0";
    if (progress < 55) return "LOADING HOLOGRAPHIC 3D ENGINE";
    if (progress < 85) return "ESTABLISHING MONGODB & API ROUTERS";
    if (progress < 100) return "OPTIMIZING SHADERS & GRAPHICS";
    return "SYSTEM READY // WELCOME TO NAQSH PORTFOLIO";
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02050e] overflow-hidden select-none transition-all duration-700 ${
        isFadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Cybernetic Grid & Ambient Lights */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute w-[500px] h-[500px] bg-neon-primary/15 rounded-full blur-[160px] animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] animate-pulse delay-700" />

      {/* Futuristic Floating HUD Elements */}
      <div className="absolute top-8 left-8 hidden sm:flex flex-col gap-1 font-mono text-[10px] text-gray-500 tracking-widest uppercase">
        <span className="text-neon-primary font-bold">NAQSH OS v3.6</span>
        <span>STATUS: BOOTING</span>
        <span>CORE_TEMP: NORMAL</span>
      </div>

      <div className="absolute top-8 right-8 hidden sm:flex flex-col items-end gap-1 font-mono text-[10px] text-gray-500 tracking-widest uppercase">
        <span>MEM_ALLOC: OK</span>
        <span className="text-cyan-400 font-bold">PORT: 5000 ACTIVE</span>
        <span>SECURITY: ENCRYPTED</span>
      </div>

      {/* Central Holographic Spinner Ring & Counter */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer Rotating Futuristic SVG Ring */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center mb-6">
          {/* Outer Segment Ring */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-neon-primary/30"
              strokeDasharray="4 6"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="text-cyan-500/40"
              strokeDasharray="15 30"
            />
          </svg>

          {/* Reverse Spinner Arc */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_6s_linear_infinite_reverse]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="url(#gradient-arc)"
              strokeWidth="1.5"
              strokeDasharray="60 120"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient-arc" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-neon-primary, #8b5cf6)" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Counter Display */}
          <div className="flex flex-col items-center justify-center text-center z-10">
            <div className="text-6xl sm:text-7xl font-black font-mono tracking-tighter text-white tabular-nums drop-shadow-[0_0_25px_rgba(var(--color-neon-primary),0.6)]">
              {progress}
              <span className="text-neon-primary text-2xl sm:text-3xl font-mono ml-1">%</span>
            </div>
            <div className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase mt-1">
              LOADING...
            </div>
          </div>
        </div>

        {/* Cyberpunk Segmented Progress Bar */}
        <div className="w-72 sm:w-96 h-2 bg-slate-950/80 rounded-full p-0.5 border border-neon-primary/30 shadow-[0_0_20px_rgba(var(--color-neon-primary),0.2)] relative overflow-hidden mb-6">
          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-r from-neon-primary via-purple-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(var(--color-neon-primary),1)] transition-all duration-150 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Glowing lead dot */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]" />
          </div>
        </div>

        {/* Dynamic HUD Status Line */}
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/60 border border-neon-primary/20 shadow-[0_0_15px_rgba(var(--color-neon-primary),0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-primary"></span>
          </span>
          <span className="text-[11px] font-mono text-gray-300 font-semibold tracking-wider uppercase">
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Footer System Credit */}
      <div className="absolute bottom-6 text-[10px] font-mono text-gray-600 tracking-[0.4em] uppercase">
        NAQSH • FULL STACK & 3D SPECIALIST
      </div>
    </div>
  );
};

export default Preloader;

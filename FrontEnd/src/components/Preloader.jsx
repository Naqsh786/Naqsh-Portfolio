import React, { useState, useEffect } from "react";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 3 seconds = 3000ms. 3000 / 100 = 30ms per increment.
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // 500ms delay after hitting 100 for smoothness
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050001]">
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-neon-red/10 rounded-full blur-[120px] animate-pulse" />
      
      <div className="relative flex flex-col items-center">
        {/* Animated Counter */}
        <div className="text-8xl md:text-9xl font-black text-white mb-4 tracking-tighter tabular-nums selection:bg-transparent">
          <span className="gradient-text text-glow">{progress}</span>
          <span className="text-neon-red text-4xl md:text-5xl ml-2">%</span>
        </div>

        {/* Cinematic Progress Bar Container */}
        <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative border border-white/5">
          <div 
            className="absolute inset-y-0 left-0 bg-neon-red shadow-[0_0_15px_rgba(255,0,60,0.8)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text */}
        <div className="mt-6 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-neon-red animate-ping" />
          <span className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] font-medium">
            Initializing System Core
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

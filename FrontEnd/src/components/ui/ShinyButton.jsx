import React from "react";

export function ShinyButton({
  children,
  onClick,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative group inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(84,53,204,0.35)] hover:shadow-[0_0_28px_rgba(84,53,204,0.6)] focus:outline-none focus:ring-2 focus:ring-neon-primary/50 cursor-pointer ${className}`}
      {...props}
    >
      {/* Animated Rotating Conic Gradient Border */}
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#5435CC_50%,#8B5CF6_75%,#ffffff_90%,transparent_100%)] pointer-events-none" />

      {/* Button Content Surface with balanced padding and font size */}
      <span className="relative z-10 inline-flex h-full w-full items-center justify-center gap-2 rounded-full bg-[#00020B] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 group-hover:bg-[#0D0D1A]/90">
        {/* Subtle Shimmer Sweep on Hover */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
        {children}
      </span>
    </button>
  );
}

export default ShinyButton;


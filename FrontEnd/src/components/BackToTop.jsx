import React from "react";
import { LuArrowUp } from "react-icons/lu";

export default function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      type="button"
      id="back-to-top-btn"
      aria-label="Back to top"
      title="Back to top"
      className="group fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full border-2 border-[#7C5CFC]/85 bg-gradient-to-b from-[#251A4F] via-[#171135] to-[#0D0924] backdrop-blur-xl text-white shadow-[0_0_22px_rgba(124,92,252,0.45),0_8px_24px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:border-white hover:bg-gradient-to-b hover:from-[#352570] hover:to-[#1B1340] hover:shadow-[0_0_32px_rgba(147,112,255,0.75),0_12px_30px_rgba(0,0,0,0.9)] hover:scale-110 hover:-translate-y-1 active:scale-95 active:translate-y-0 transition-all duration-300 ease-out cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#00020B]"
    >
      <LuArrowUp 
        className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-300 stroke-[2.5] drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" 
      />
    </button>
  );
}

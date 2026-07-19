/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#050814",
          card: "#0b1120",
          surface: "#111827",
        },
        neon: {
          primary: "#8b5cf6",
          glow: "#8b5cf6ba",
          secondary: "#3b82f6"
        },
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-glow": "pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        float: "float 4s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px #8b5cf660, 0 0 20px #8b5cf630" },
          "50%": { boxShadow: "0 0 25px #8b5cf6, 0 0 50px #8b5cf680" },
        },
        fadeIn: {
          from: { opacity: "0", filter: "blur(4px)" },
          to: { opacity: "1", filter: "blur(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px) scale(0.95)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
  plugins: [],
};

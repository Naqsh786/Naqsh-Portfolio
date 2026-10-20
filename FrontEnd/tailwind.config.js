/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // New unified purple/indigo palette
        'accent': 'rgb(var(--color-accent-rgb) / <alpha-value>)',
        'accent-hover': '#6B4FE0',
        'deep-indigo': '#100354',
        // Semantic surface tokens
        dark: {
          bg: '#00020B',
          card: 'rgba(0, 2, 11, 0.7)',
          surface: '#0D0D1A',
          border: 'rgba(68, 61, 80, 0.5)',
        },
        surface: {
          DEFAULT: '#443D50',
          light: 'rgba(68, 61, 80, 0.4)',
        },
        muted: '#8C92AA',
        'text-primary': '#E4E5ED',
        // Keep neon-primary as an alias so existing Tailwind classes work
        'neon-primary': 'rgb(var(--color-accent-rgb) / <alpha-value>)',
      },
      fontFamily: {
        sans: ["Space Grotesk", "Outfit", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(84, 53, 204, 0.4), 0 0 10px -5px rgba(84, 53, 204, 0.25)',
        'glow-subtle': '0 0 20px -5px rgba(84, 53, 204, 0.2)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        "pulse-glow": "pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
        spin: "spin 12s linear infinite",
        "shimmer": "shimmer 2.5s infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(84, 53, 204, 0.3), 0 0 30px rgba(16, 3, 84, 0.15)" },
          "50%": { boxShadow: "0 0 35px rgba(84, 53, 204, 0.5), 0 0 60px rgba(16, 3, 84, 0.3)" },
        },
        fadeIn: {
          from: { opacity: "0", filter: "blur(8px)" },
          to: { opacity: "1", filter: "blur(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(40px) scale(0.96)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(2deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        }
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'neon-primary': 'rgb(var(--color-neon-primary) / <alpha-value>)',
        'neon-secondary': 'rgb(var(--color-neon-secondary) / <alpha-value>)',
        'neon-accent': 'rgb(var(--color-neon-accent) / <alpha-value>)',
        dark: {
          bg: 'var(--color-dark-bg)',
          card: 'var(--color-dark-card)',
          surface: "#0f172a",
          border: "var(--color-dark-border)",
        },
        violet: {
          glow: "#8b5cf6",
          accent: "#a855f7",
          deep: "#6d28d9"
        },
        cyan: {
          glow: "#06b6d4",
          accent: "#22d3ee"
        },
        pink: {
          accent: "#ec4899"
        }
      },
      fontFamily: {
        sans: ["Space Grotesk", "Outfit", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.5), 0 0 10px -5px rgba(139, 92, 246, 0.3)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.5), 0 0 10px -5px rgba(6, 182, 212, 0.3)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
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
          "0%, 100%": { boxShadow: "0 0 15px rgba(139, 92, 246, 0.4), 0 0 30px rgba(6, 182, 212, 0.2)" },
          "50%": { boxShadow: "0 0 35px rgba(139, 92, 246, 0.8), 0 0 60px rgba(236, 72, 153, 0.5)" },
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


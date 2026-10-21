import React, { useState } from "react";
import {
  FaLaptopCode,
  FaServer,
  FaRocket,
  FaCheckCircle,
  FaArrowRight,
  FaCogs,
  FaLayerGroup,
  FaShieldAlt,
  FaBolt
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { FiLayers, FiCpu, FiCheck, FiArrowUpRight } from "react-icons/fi";

const services = [
  {
    id: "full-stack",
    number: "01",
    tag: "END-TO-END ENGINEERING",
    title: "Full-Stack Web Applications",
    subtitle: "Turnkey MERN & Next.js production platforms",
    description:
      "Architecting scalable, production-grade web systems from the ground up. Combining lightning-fast React and Next.js frontends with robust Node.js backend APIs, resilient databases, and real-time state synchronization.",
    icon: FaLaptopCode,
    glowColor: "rgba(84, 53, 204, 0.45)",
    borderColor: "group-hover:border-neon-primary/70",
    deliverables: [
      "Custom MERN & Next.js (SSR / SSG) Systems",
      "Real-Time WebSockets & Live Dashboards",
      "Secure Role-Based Auth (JWT, OAuth, OTP)",
      "High-Traffic State Management (Redux / Zustand)"
    ],
    techStack: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Redux"]
  },
  {
    id: "ui-ux",
    number: "02",
    tag: "CREATIVE ENGINEERING",
    title: "Interactive UI/UX & 3D Experiences",
    subtitle: "Engaging, high-converting digital interfaces",
    description:
      "Transforming static screens into living, sensory web experiences. Leveraging 3D canvas visuals, 60fps physics animations, sleek glassmorphism, and pixel-perfect responsiveness that keep visitors captivated.",
    icon: HiSparkles,
    glowColor: "rgba(124, 92, 231, 0.45)",
    borderColor: "group-hover:border-[#7c5ce7]/70",
    deliverables: [
      "Immersive 3D Canvas & Three.js Experiences",
      "Smooth Lenis Inertial Scroll & GSAP Dynamics",
      "Bespoke Glassmorphism & Cyber Aesthetics",
      "Figma to Pixel-Perfect High-Fidelity Code"
    ],
    techStack: ["Three.js", "Framer Motion", "Tailwind CSS", "Canvas", "Lenis"]
  },
  {
    id: "backend-cloud",
    number: "03",
    tag: "RESILIENT INFRASTRUCTURE",
    title: "Backend APIs & Cloud Architecture",
    subtitle: "High-throughput, secure microservices & data layers",
    description:
      "Engineering rock-solid server architectures, automated business workflows, and payment pipelines. Built for speed, maximum uptime, strict security compliance, and effortless horizontal scalability.",
    icon: FaServer,
    glowColor: "rgba(16, 185, 129, 0.35)",
    borderColor: "group-hover:border-emerald-500/60",
    deliverables: [
      "RESTful & Microservices Architecture",
      "Stripe Payments & Webhook Automations",
      "Database Schema Design & Query Optimization",
      "Cloud Media Storage (Cloudinary, AWS S3)"
    ],
    techStack: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Stripe API", "Redis"]
  },
  {
    id: "performance-seo",
    number: "04",
    tag: "OPTIMIZATION & SCALE",
    title: "Performance, SEO & Modernization",
    subtitle: "Sub-second speed, 95+ Lighthouse & code refactoring",
    description:
      "Supercharging existing web apps to achieve benchmark performance and search supremacy. Eradicating layout shifts, cutting bundle sizes, implementing rich SEO metadata, and migrating legacy codebases.",
    icon: FaRocket,
    glowColor: "rgba(236, 72, 153, 0.35)",
    borderColor: "group-hover:border-pink-500/60",
    deliverables: [
      "95+ Google Lighthouse & Core Web Vitals Audit",
      "Automated CI/CD & Docker Containerization",
      "Technical SEO, Semantic Markup & OpenGraph",
      "Legacy Code Refactoring to Modern React & TypeScript"
    ],
    techStack: ["Lighthouse", "Docker", "Vercel", "TypeScript", "SEO", "Vite"]
  }
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Blueprint",
    desc: "Understanding product goals, user personas, technical specs, and mapping system architecture."
  },
  {
    step: "02",
    title: "UI/UX & Interactive Prototype",
    desc: "Translating wireframes into polished interactive components with modern styling and responsive layouts."
  },
  {
    step: "03",
    title: "Full-Stack Development",
    desc: "Clean, modular code writing with secure APIs, database integration, state management, and tests."
  },
  {
    step: "04",
    title: "Quality Audit & Launch",
    desc: "Cross-browser testing, SEO check, performance tuning, and zero-downtime production deployment."
  }
];

export default function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleInquire = (serviceTitle) => {
    // Notify contact form to pre-populate subject
    window.dispatchEvent(
      new CustomEvent("select-service", {
        detail: { serviceTitle }
      })
    );

    // Smooth scroll to contact
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-neon-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[300px] bg-[#7c5ce7]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-18">

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight">
            What I Can  <span className="gradient-text">Build For You</span>
          </h2>
          <p className="text-muted font-sans text-sm sm:text-base md:text-lg mt-4 leading-relaxed">
            I turn ideas into production-ready web applications — engineered for performance, built with clean code, and designed to scale.
          </p>
        </div>

        {/* 2x2 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            const isHovered = hoveredCard === srv.id;

            return (
              <div
                key={srv.id}
                onMouseEnter={() => setHoveredCard(srv.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0D0D1A]/95 via-[#00020B]/90 to-[#100354]/30 border border-surface/50 ${srv.borderColor} transition-all duration-500 shadow-[0_0_25px_rgba(84,53,204,0.06)] hover:shadow-[0_0_50px_rgba(84,53,204,0.22)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden`}
              >
                {/* Top Glowing Indicator Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-primary to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Ambient Reactive Glow Blob */}
                <div
                  className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:scale-125"
                  style={{ background: srv.glowColor }}
                />

                <div>
                  {/* Top Header Row: Icon + Badge + Number */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#00020B] border border-neon-primary/30 flex items-center justify-center text-neon-primary text-xl sm:text-2xl shadow-[0_0_15px_rgba(84,53,204,0.15)] group-hover:border-neon-primary group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(84,53,204,0.45)] transition-all duration-300 flex-shrink-0">
                      <Icon />
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-muted/60 group-hover:text-neon-primary transition-colors">
                        {srv.number} // SERVICE
                      </span>
                      <div className="mt-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-neon-primary/10 border border-neon-primary/25 text-[10px] font-mono text-neon-primary uppercase tracking-wider">
                          {srv.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#c4b5fd] transition-colors tracking-tight mb-1.5">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-mono text-neon-primary/90 mb-3.5">
                    {srv.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  {/* Key Deliverables Checklist */}
                  <div className="mb-6 pt-4 border-t border-surface/30">
                    <p className="text-[11px] font-mono text-text-primary uppercase tracking-wider font-semibold mb-3 flex items-center gap-1.5">
                      <FiCpu className="text-neon-primary" /> Key Capabilities & Deliverables
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted">
                      {srv.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <FaCheckCircle className="text-neon-primary text-[11px] mt-0.5 flex-shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {srv.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-[#00020B]/80 border border-surface/50 text-[11px] font-mono text-text-secondary group-hover:border-neon-primary/40 group-hover:text-white transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action: Direct Inquire CTA */}
                <div className="pt-4 border-t border-surface/30 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-muted/70">
                    Production Ready • Scalable Code
                  </span>

                  <button
                    type="button"
                    onClick={() => handleInquire(srv.title)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neon-primary/10 hover:bg-neon-primary text-neon-primary hover:text-white border border-neon-primary/30 hover:border-neon-primary text-xs font-mono font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(84,53,204,0.1)] hover:shadow-[0_0_20px_rgba(84,53,204,0.4)] active:scale-95 group/btn"
                  >
                    <span>Inquire Now</span>
                    <FaArrowRight className="text-[10px] group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Process / How I Work Strip ── */}
        <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-[#0D0D1A]/70 border border-surface/40 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-neon-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center md:text-left md:flex md:items-center md:justify-between pb-6 mb-6 border-b border-surface/30">
            <div>
              <span className="text-xs font-mono font-bold text-neon-primary uppercase tracking-widest">
                EXECUTION FRAMEWORK
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                How Ideas Become Production Reality
              </h4>
            </div>
            <p className="text-muted text-xs sm:text-sm font-sans max-w-md mt-2 md:mt-0 leading-relaxed">
              A transparent, agile development workflow designed for predictability, quality assurance, and swift delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative group flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="text-2xl font-black font-mono text-neon-primary/40 group-hover:text-neon-primary transition-colors">
                      {step.step}
                    </span>
                    <span className="h-px flex-1 bg-surface/40 group-hover:bg-neon-primary/40 transition-colors" />
                  </div>
                  <h5 className="text-sm font-bold text-white mb-1.5 group-hover:text-[#c4b5fd] transition-colors">
                    {step.title}
                  </h5>
                  <p className="text-xs text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

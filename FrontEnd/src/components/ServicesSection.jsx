import React, { useState, useEffect, useRef } from "react";
import {
  FiCode,
  FiLayout,
  FiServer,
  FiZap,
  FiCheck,
  FiArrowRight
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MilestoneProcessScroll from "./MilestoneProcessScroll";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "full-stack",
    number: "01",
    tag: "FULL-STACK",
    title: "Full-Stack Web Applications",
    subtitle: "Production-ready platforms with React, Next.js & Node.js",
    description:
      "Developing full-stack web applications with modular frontend components, secure Node.js REST APIs, resilient database schemas, and predictable state management.",
    icon: FiCode,
    glowColor: "rgba(84, 53, 204, 0.2)",
    borderColor: "group-hover:border-neon-primary/60",
    deliverables: [
      "Custom React & Next.js Applications",
      "Secure Authentication (JWT, OAuth)",
      "Real-time Data Updates & Dashboards",
      "Predictable State Architecture (Redux)"
    ],
    techStack: ["React.js", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB"]
  },
  {
    id: "ui-ux",
    number: "02",
    tag: "FRONTEND & MOTION",
    title: "Frontend & Interactive Interfaces",
    subtitle: "Fluid user interactions and responsive layouts",
    description:
      "Creating intuitive, accessible web interfaces with smooth micro-interactions, responsive styling, and interactive 3D canvas visuals using Three.js and Framer Motion.",
    icon: FiLayout,
    glowColor: "rgba(124, 92, 231, 0.2)",
    borderColor: "group-hover:border-[#7c5ce7]/60",
    deliverables: [
      "Responsive & Mobile-First Layouts",
      "Smooth Scroll & Micro-Animations",
      "3D Canvas & WebGL Integration",
      "Figma to Pixel-Perfect Code"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]
  },
  {
    id: "backend-cloud",
    number: "03",
    tag: "BACKEND & APIS",
    title: "Backend APIs & Data Architecture",
    subtitle: "Robust server runtimes, data models & third-party integrations",
    description:
      "Engineering RESTful API endpoints, structured database schemas with MongoDB and PostgreSQL, role-based authorization, and payment processing pipelines.",
    icon: FiServer,
    glowColor: "rgba(16, 185, 129, 0.18)",
    borderColor: "group-hover:border-emerald-500/50",
    deliverables: [
      "RESTful API Design & Input Validation",
      "Stripe Payment & Webhook Integration",
      "Database Schema & Query Tuning",
      "Cloud Asset Pipelines (Cloudinary)"
    ],
    techStack: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Stripe API", "Redis"]
  },
  {
    id: "performance-seo",
    number: "04",
    tag: "PERFORMANCE",
    title: "Performance & Code Optimization",
    subtitle: "Fast load times, SEO best practices & code refactoring",
    description:
      "Auditing and optimizing existing web applications to improve Core Web Vitals, minimize bundle sizes, implement proper meta tags, and migrate codebases to modern TypeScript standards.",
    icon: FiZap,
    glowColor: "rgba(236, 72, 153, 0.18)",
    borderColor: "group-hover:border-pink-500/50",
    deliverables: [
      "Core Web Vitals & Lighthouse Tuning",
      "Bundle Size & Image Optimization",
      "Semantic SEO & OpenGraph Structure",
      "TypeScript & React Modernization"
    ],
    techStack: ["Lighthouse", "TypeScript", "Vite", "Next.js", "Docker", "Vercel"]
  }
];


export default function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 90%",
              end: "top 70%",
              scrub: 0.8,
            },
          }
        );
      }

      if (cardsRef.current.length > 0) {
        cardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "top 72%",
                scrub: 0.8,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      ref={sectionRef}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20 overflow-hidden"
    >
      {/* Ambient background glows - softened */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-neon-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[200px] bg-[#7c5ce7]/[0.03] rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-14 md:mb-18">

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight">
            Services & <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-muted font-sans text-sm sm:text-base md:text-lg mt-4 leading-relaxed">
            Production-ready web applications, responsive frontend architecture, and resilient API backends built to scale.
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
                ref={(el) => (cardsRef.current[idx] = el)}
                onMouseEnter={() => setHoveredCard(srv.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0D0D1A]/95 via-[#00020B]/90 to-[#100354]/30 border border-surface/50 ${srv.borderColor} transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_35px_rgba(84,53,204,0.18)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden`}
              >
                {/* Top Glowing Indicator Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-primary to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Ambient Reactive Glow Blob */}
                <div
                  className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20 group-hover:opacity-40 group-hover:scale-110"
                  style={{ background: srv.glowColor }}
                />

                <div>
                  {/* Top Header Row: Icon + Badge + Number */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#00020B] border border-neon-primary/30 flex items-center justify-center text-neon-primary text-xl sm:text-2xl shadow-[0_0_15px_rgba(84,53,204,0.15)] group-hover:border-neon-primary group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(84,53,204,0.3)] transition-all duration-300 flex-shrink-0">
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
                    <p className="text-[11px] font-mono text-muted uppercase tracking-wider font-semibold mb-3">
                      Key Capabilities & Deliverables
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted">
                      {srv.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <FiCheck className="text-neon-primary text-xs mt-0.5 flex-shrink-0" />
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
                    <FiArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Interactive Milestone Process Scroll (Center Rail & Alternating Cards) ── */}
        <MilestoneProcessScroll />
      </div>
    </section>
  );
}

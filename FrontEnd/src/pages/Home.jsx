import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GridTrails from "../components/GridTrails";
import MotionTiles from "@/components/ui/motion-tiles";
import RidgelineTerrain from "../components/RidgelineTerrain";
import ServicesSection from "../components/ServicesSection";
import FooterField from "../components/FooterField";
import {
  FiArrowDown,
  FiSend,
  FiLayout,
  FiServer,
  FiDatabase,
  FiTerminal,
  FiGithub,
  FiMail
} from "react-icons/fi";
import { profile, projects } from "../data"; // Hardcoded data
import { API_BASE_URL } from "../utils/apiConfig";

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // Listen for service inquiry triggers from ServicesSection
  useEffect(() => {
    const handleSelectService = (e) => {
      const serviceTitle = e.detail?.serviceTitle;
      if (serviceTitle) {
        setFormData((prev) => ({
          ...prev,
          subject: `Project Inquiry: ${serviceTitle}`
        }));
      }
    };
    window.addEventListener("select-service", handleSelectService);
    return () => window.removeEventListener("select-service", handleSelectService);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: "success",
          text: "Message sent successfully! Naqsh will get back to you soon."
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          text: data.message || "Failed to send message. Please try again."
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        text: "Cannot connect to server. Please verify backend is running on port 5000."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-5 sm:p-8 md:p-10 rounded-xl bg-[#00020B]/90 backdrop-blur-2xl border border-surface/50 hover:border-neon-primary/40 max-w-3xl w-full mx-auto shadow-[0_16px_45px_rgba(0,0,0,0.85)] transition-colors text-left">
      {/* Glow Top Accent */}
      <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-neon-primary/60 to-transparent" />

      {status && (
        <div
          className={`mb-6 p-3.5 sm:p-4 rounded-lg border font-mono text-xs sm:text-sm font-semibold flex items-center gap-3 ${status.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
            : "bg-red-500/10 border-red-500/40 text-red-300"
            }`}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-ping flex-shrink-0" />
          <span className="break-words">{status.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label htmlFor="contact-name" className="block text-xs font-mono text-muted mb-2 uppercase tracking-wider">
              Your Name *
            </label>
            <div className="relative">
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Rivers"
                className="w-full bg-[#0D0D1A]/90 border border-surface/50 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 text-text-primary text-sm focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary/40 font-sans transition-all placeholder:text-muted/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-xs font-mono text-muted mb-2 uppercase tracking-wider">
              Your Email *
            </label>
            <div className="relative">
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                className="w-full bg-[#0D0D1A]/90 border border-surface/50 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 text-text-primary text-sm focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary/40 font-sans transition-all placeholder:text-muted/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className="block text-xs font-mono text-muted mb-2 uppercase tracking-wider">
            Subject
          </label>
          <div className="relative">
            <input
              id="contact-subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Full-Stack Project / Collaboration"
              className="w-full bg-[#0D0D1A]/90 border border-surface/50 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 text-text-primary text-sm focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary/40 font-sans transition-all placeholder:text-muted/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-mono text-muted mb-2 uppercase tracking-wider">
            Your Message *
          </label>
          <div className="relative">
            <textarea
              id="contact-message"
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project scope, timeline, and goals..."
              className="w-full bg-[#0D0D1A]/90 border border-surface/50 rounded-lg p-3.5 sm:p-4 text-text-primary text-sm focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary/40 font-sans transition-all resize-none placeholder:text-muted/40 leading-relaxed shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-lg bg-gradient-to-r from-neon-primary via-[#6d44e8] to-[#5435CC] text-white font-bold tracking-wide shadow-md shadow-neon-primary/25 hover:shadow-neon-primary/40 hover:scale-[1.01] active:scale-[0.99] active:translate-y-[1px] transition-all duration-300 disabled:opacity-50 font-mono text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Transmitting Message...</span>
            </span>
          ) : (
            <>
              <FiSend className="text-sm" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const Home = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    const email = "naqshcc916@gmail.com";
    navigator.clipboard.writeText(email).catch(() => { });
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 4000);

    // Open Gmail web compose in new tab
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Project%20Inquiry%20-%20Naqsh%20Portfolio`, "_blank", "noopener,noreferrer");
  };

  const handleReplayIntro = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  const heroImageRef = useRef(null);
  const heroTextRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const skillsHeaderRef = useRef(null);
  const skillCardsRef = useRef([]);
  const projectsHeaderRef = useRef(null);
  const projectsWrapperRef = useRef(null);
  const contactHeaderRef = useRef(null);
  const contactFormWrapperRef = useRef(null);
  const contactSocialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { scale: 0.92, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
      }
      if (heroTextRef.current) {
        gsap.fromTo(
          heroTextRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power2.out", delay: 0.15 }
        );
      }

      // 2. Skills Section
      if (skillsHeaderRef.current) {
        gsap.fromTo(
          skillsHeaderRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsHeaderRef.current,
              start: "top 95%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      skillCardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const isEven = idx % 2 === 0;
        gsap.fromTo(
          card,
          { x: isEven ? -20 : 20, opacity: 0, scale: 0.98 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // 3. Projects Section
      if (projectsHeaderRef.current) {
        gsap.fromTo(
          projectsHeaderRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: projectsHeaderRef.current,
              start: "top 95%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      if (projectsWrapperRef.current) {
        gsap.fromTo(
          projectsWrapperRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: projectsWrapperRef.current,
              start: "top 95%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 4. Contact Section
      if (contactHeaderRef.current) {
        gsap.fromTo(
          contactHeaderRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactHeaderRef.current,
              start: "top 95%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      if (contactFormWrapperRef.current) {
        gsap.fromTo(
          contactFormWrapperRef.current,
          { y: 20, opacity: 0, scale: 0.99 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactFormWrapperRef.current,
              start: "top 95%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      if (contactSocialsRef.current) {
        gsap.fromTo(
          contactSocialsRef.current.children,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactSocialsRef.current,
              start: "top 95%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });

    // Refresh ScrollTrigger to sync accurate element positions once fonts and images settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleRefresh);
    window.addEventListener("resize", handleRefresh);
    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("load", handleRefresh);
      window.removeEventListener("resize", handleRefresh);
      ctx.revert();
    };
  }, []);

  const skillCategories = [
    {
      id: "frontend",
      title: "Frontend Development",
      subtitle: "Component Architecture & Responsive UI",
      badge: "Frontend",
      status: "Modern React & Next.js",
      icon: FiLayout,
      skills: profile.frontendSkills || [],
      count: profile.frontendSkills?.length || 0,
      glowColor: "rgba(84, 53, 204, 0.15)",
    },
    {
      id: "backend",
      title: "Backend Development",
      subtitle: "REST APIs & Middleware Systems",
      badge: "Backend",
      status: "Node.js & Express",
      icon: FiServer,
      skills: profile.backendSkills || [],
      count: profile.backendSkills?.length || 0,
      glowColor: "rgba(16, 3, 84, 0.25)",
    },
    {
      id: "database",
      title: "Database Systems",
      subtitle: "Schema Design & Persistence",
      badge: "Databases",
      status: "SQL & NoSQL Models",
      icon: FiDatabase,
      skills: profile.databaseSkills || [],
      count: profile.databaseSkills?.length || 0,
      glowColor: "rgba(84, 53, 204, 0.15)",
    },
    {
      id: "tools",
      title: "Developer Toolchain",
      subtitle: "Version Control & Containerization",
      badge: "Toolchain",
      status: "Git, Docker & Postman",
      icon: FiTerminal,
      skills: profile.tools || [],
      count: profile.tools?.length || 0,
      glowColor: "rgba(16, 3, 84, 0.25)",
    },
  ];

  return (
    <div className="bg-grid min-h-screen relative z-10 bg-[#00020B]/50">
      {/* ── HERO SECTION ── */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-28 md:pt-0 relative overflow-hidden">
        {/* Interactive WebGL Grid Trails Background (from Framer) */}
        <div className="absolute inset-0 z-0">
          <GridTrails
            background="#00020B"
            lineColor="#120e2e"
            accent="#5435CC"
            cellSize={96}
            lights={8}
            speed={40}
            glow={95}
            hover={100}
          />
          {/* Subtle gradient overlay to smoothly transition into content */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#00020B] pointer-events-none" />
        </div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-primary/4 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#100354]/8 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "1.5s" }} />

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-20 relative z-10">
          {/* Profile Image Portrait (Architectural Precision Frame) */}
          <div ref={heroImageRef} className="relative flex-shrink-0 group">
            {/* Outer Frame (Engineered 3:4 ratio with clean seamless border) */}
            <div className="w-72 sm:w-80 md:w-96 lg:w-[26rem] xl:w-[28rem] aspect-[3/4] p-3 sm:p-4 rounded-xl border border-neon-primary/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group-hover:border-neon-primary/75 transition-all duration-500 bg-[#00020B]/50 backdrop-blur-sm">
              {/* Inner Image Mask */}
              <div className="w-full h-full rounded-lg overflow-hidden border border-neon-primary/25 relative group/pic bg-gradient-to-b from-neon-primary/10 via-transparent to-[#00020B]/70 flex items-end justify-center">
                <picture className="w-full h-full">
                  <source srcSet="/12006.avif" type="image/avif" />
                  <source srcSet="/12006.webp" type="image/webp" />
                  <img
                    src="/12006.png"
                    alt={`${profile?.name || "Naqsh"} Profile`}
                    className="w-full h-full object-cover object-[center_top] filter drop-shadow-[0_16px_32px_rgba(0,2,11,0.7)] group-hover:scale-[1.02] transition-all duration-500"
                    width="432"
                    height="578"
                    fetchPriority="high"
                    loading="eager"
                    style={{ imageRendering: "high-quality" }}
                  />
                </picture>

                {/* Subtle bottom gradient to gracefully ground the suit edge */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#00020B]/60 via-[#00020B]/20 to-transparent pointer-events-none" />
              </div>
            </div>
            {/* Status indicator - Precision square badge */}
            <div className="absolute bottom-5 right-5 lg:bottom-6 lg:right-6 w-4 h-4 bg-neon-primary rounded-sm border-2 border-[#00020B] animate-pulse shadow-[0_2px_10px_rgba(84,53,204,0.7)] z-20" title="Available for work" />
          </div>

          {/* Hero Text */}
          <div ref={heroTextRef} className="text-center md:text-left flex-grow">
            {(profile?.availableForWork ?? true) && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#00020B]/85 border border-neon-primary/25 rounded-md mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                <span className="relative flex h-2 w-2 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-primary"></span>
                </span>
                <span className="text-neon-primary text-xs font-mono font-medium uppercase tracking-widest pr-1">
                  Open to Opportunities
                </span>
              </div>
            )}

            <h2 className="text-xl md:text-2xl text-muted font-mono mb-2">
              Hello World, I'm
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-text-primary leading-none mb-4">
              <span className="gradient-text text-glow tracking-tight">{profile?.name || "Naqsh"}</span>
            </h1>

            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
              <div className="h-[2px] w-12 bg-neon-primary/60 hidden md:block"></div>
              <p className="text-xl md:text-2xl text-text-primary font-medium tracking-wide">
                {profile?.role || "Full-Stack Developer"}
              </p>
            </div>

            <p
              className="text-muted font-sans max-w-65ch mx-auto md:mx-0 text-lg leading-relaxed mb-8 whitespace-pre-wrap glass p-5 rounded-lg border border-surface/30 border-l-2 border-l-neon-primary/70 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              style={{ background: "rgba(0, 2, 11, 0.9)" }}
            >
              {profile?.description || "Full-stack developer building fast, reliable web applications with React, Next.js, TypeScript, and Node.js."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-neon-primary text-white font-bold rounded-lg shadow-[0_4px_16px_rgba(84,53,204,0.25)] hover:shadow-[0_8px_24px_rgba(84,53,204,0.4)] transition-all duration-300 hover:-translate-y-[1px] active:translate-y-[1px]"
              >
                View Projects
                <FiArrowDown className="text-sm group-hover:translate-y-1 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00020B]/90 border border-neon-primary/60 text-neon-primary font-semibold rounded-lg hover:bg-neon-primary hover:text-white shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_20px_rgba(84,53,204,0.25)] transition-all duration-300 hover:-translate-y-[1px] active:translate-y-[1px]"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <FiArrowDown className="text-neon-primary/40 text-xl" aria-hidden="true" />
        </div>
      </section>

      {/* ── SKILLS SECTION ── */}
      <section
        id="skills"
        ref={skillsSectionRef}
        className="py-28 px-6 relative z-10 border-t border-surface/20 overflow-hidden scroll-mt-24 md:scroll-mt-28"
      >
        {/* Ambient background glow orbs - softened */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-primary/[0.03] rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#100354]/[0.08] rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={skillsHeaderRef} className="text-center mb-16 md:mb-20 px-4">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-text-primary mb-5 tracking-tight">
              Technical <span className="gradient-text text-glow">Skills</span>
            </h2>
            <p className="text-muted font-sans max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Core languages, frameworks, databases, and developer tools I use to build scalable web applications.
            </p>
          </div>

          {/* Cards 2x2 Grid with Alternating Left / Right Entrance Animation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 max-w-6xl mx-auto text-left">
            {skillCategories.map((cat, idx) => {
              const Icon = cat.icon;

              return (
                <div
                  key={cat.id}
                  ref={(el) => (skillCardsRef.current[idx] = el)}
                  className="relative group rounded-xl p-6 md:p-8 bg-gradient-to-br from-[#0D0D1A]/95 via-[#00020B]/90 to-[#100354]/25 border border-surface/40 hover:border-neon-primary/60 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.85)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden transition-all duration-500"
                >
                  {/* Top neon indicator highlight bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-primary to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Ambient top-right reactive glow */}
                  <div
                    className="absolute -top-14 -right-14 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20 group-hover:opacity-40 group-hover:scale-110"
                    style={{ background: cat.glowColor }}
                  />

                  <div>
                    {/* Header: Icon + Titles + Count Badge */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 md:w-13 md:h-13 rounded-lg bg-[#00020B] border border-neon-primary/30 flex items-center justify-center text-neon-primary text-xl md:text-2xl shadow-[0_2px_12px_rgba(0,0,0,0.5)] group-hover:border-neon-primary group-hover:scale-105 group-hover:shadow-[0_4px_16px_rgba(84,53,204,0.3)] transition-all duration-300 flex-shrink-0">
                          <Icon />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-1.5 h-1.5 rounded-sm bg-neon-primary animate-pulse" />
                            <span className="text-[10px] md:text-[11px] font-mono text-muted uppercase tracking-widest font-semibold">
                              {cat.badge}
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-text-primary tracking-tight group-hover:text-white transition-colors">
                            {cat.title}
                          </h3>
                          <p className="text-xs font-mono text-muted mt-0.5">
                            {cat.subtitle}
                          </p>
                        </div>
                      </div>

                      <span className="flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-mono bg-[#00020B]/90 border border-surface/50 text-muted group-hover:border-neon-primary/50 group-hover:text-text-primary transition-all shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                        {cat.count} Skills
                      </span>
                    </div>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2 my-4">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={`${cat.id}-${sIdx}`}
                          className="px-2.5 py-1.5 rounded-md bg-[#00020B]/90 border border-surface/40 text-text-primary text-xs md:text-sm font-mono tracking-wide hover:border-neon-primary/60 hover:text-white hover:bg-neon-primary/10 transition-all duration-200 cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Status Line */}
                  <div className="pt-4 mt-5 border-t border-surface/30 flex items-center justify-between text-xs font-mono text-muted">
                    <span className="text-muted group-hover:text-text-primary transition-colors">
                      {cat.status}
                    </span>
                    <span className="text-neon-primary font-medium">
                      Active Stack
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS SECTION (Motion Tiles 3D Showcase) ── */}
      <section id="projects" className="py-12 md:py-16 relative z-10 scroll-mt-20 md:scroll-mt-24">
        <div ref={projectsHeaderRef} className="max-w-7xl mx-auto px-6 mb-4 md:mb-6 text-center">

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted font-sans text-sm md:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            Full-stack applications, interactive web experiences, and production systems built with modern technologies.
          </p>
        </div>

        <div ref={projectsWrapperRef}>
          <MotionTiles projects={projects} />
        </div>
      </section>

      {/* ── SERVICES & SOLUTIONS SECTION ── */}
      <ServicesSection />

      {/* ── CONTACT SECTION with Ridgeline Terrain Background ── */}
      <section id="contact" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 relative z-10 border-t border-surface/20 scroll-mt-20 overflow-hidden">
        {/* Background: Ridgeline WebGL Terrain Flyover (Framer Component) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <RidgelineTerrain
            background="#00020B"
            lineColor="#5435CC"
            accentColor="#c4b5fd"
            density={54}
            speed={60}
            relief={90}
            cameraHeight={130}
            fogDistance={44}
            scan={true}
            scanSpeed={110}
            className="w-full h-full opacity-70"
          />
          {/* Subtle gradient vignettes so content remains crisp and readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#00020B] via-transparent to-[#00020B] pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#00020B]/30 to-[#00020B] pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div ref={contactHeaderRef}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-muted font-sans mb-7 sm:mb-9 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Have an open role, project inquiry, or technical question? Send a message and I&apos;ll get back to you shortly.
            </p>
          </div>

          <div ref={contactFormWrapperRef}>
            <ContactForm />
          </div>

          {/* Social Links & Direct Mail Bar */}
          <div
            ref={contactSocialsRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-10 max-w-xl mx-auto w-full px-2"
          >
            <a
              href="https://github.com/Naqsh786/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-lg bg-gradient-to-r from-[#120F2A]/90 to-[#0A0818]/90 backdrop-blur-md border border-surface/50 text-text-primary hover:text-white hover:border-neon-primary/70 hover:shadow-[0_0_20px_rgba(84,53,204,0.35),0_8px_20px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-[1px] font-mono text-xs font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_4px_12px_rgba(0,0,0,0.5)]"
              title="GitHub Profile"
              aria-label="Visit GitHub Profile"
            >
              <FiGithub className="text-base text-neon-primary group-hover:scale-110 group-hover:text-white transition-all flex-shrink-0" />
              <span>GitHub</span>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=naqshcc916@gmail.com&su=Project%20Inquiry%20-%20Naqsh%20Portfolio"
              onClick={handleEmailClick}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 sm:flex-[1.2] inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-lg bg-gradient-to-r from-[#120F2A]/90 to-[#0A0818]/90 backdrop-blur-md border border-surface/50 text-text-primary hover:text-white hover:border-neon-primary/70 hover:shadow-[0_0_20px_rgba(84,53,204,0.35),0_8px_20px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-[1px] font-mono text-xs font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_4px_12px_rgba(0,0,0,0.5)] min-w-0"
              title="Send Email via Gmail"
              aria-label="Send Email via Gmail"
            >
              <FiMail className="text-base text-neon-primary group-hover:scale-110 group-hover:text-white transition-all flex-shrink-0" />
              <span className="truncate">naqshcc916@gmail.com</span>
            </a>
          </div>

          {emailCopied && (
            <div className="mt-4 inline-block px-3.5 py-1.5 rounded-lg bg-neon-primary/10 border border-neon-primary/40 text-neon-primary font-mono text-xs shadow-[0_2px_10px_rgba(84,53,204,0.3)] animate-bounce">
              ✓ Email copied to clipboard! (naqshcc916@gmail.com)
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER FIELD (Interactive Physics Wordmark & Quick Navigation) ── */}
      <FooterField />
    </div>
  );
};

export default Home;

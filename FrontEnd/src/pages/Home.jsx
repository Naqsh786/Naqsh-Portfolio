import React, { useState, useEffect, useRef } from "react";
import GridTrails from "../components/GridTrails";
import MotionTiles from "@/components/ui/motion-tiles";
import RidgelineTerrain from "../components/RidgelineTerrain";
import ServicesSection from "../components/ServicesSection";
import FooterField from "../components/FooterField";
import {
  FaLinkedin,
  FaEnvelope,
  FaArrowDown,
  FaTerminal,
  FaGithub,
  FaPaperPlane,
  FaRedo,
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaTools,
  FaCheckCircle
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { profile, projects } from "../data"; // Hardcoded data
import { API_BASE_URL } from "../utils/apiConfig";

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
    <div className="relative p-6 sm:p-10 rounded-3xl bg-[#00020B]/85 backdrop-blur-2xl border border-neon-primary/35 max-w-3xl mx-auto shadow-[0_0_60px_rgba(84,53,204,0.22)] text-left">
      {/* Glow Top Accent */}
      <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-neon-primary to-transparent" />

      {status && (
        <div
          className={`mb-6 p-4 rounded-2xl border font-mono text-xs md:text-sm font-semibold flex items-center gap-3 ${status.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
            : "bg-red-500/10 border-red-500/40 text-red-300"
            }`}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-ping" />
          <span>{status.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                className="w-full bg-[#0D0D1A]/90 border border-surface/50 rounded-2xl px-4 py-3.5 text-text-primary text-sm focus:outline-none focus:border-neon-primary focus:ring-2 focus:ring-neon-primary/20 font-sans transition-all placeholder:text-muted/40"
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
                className="w-full bg-[#0D0D1A]/90 border border-surface/50 rounded-2xl px-4 py-3.5 text-text-primary text-sm focus:outline-none focus:border-neon-primary focus:ring-2 focus:ring-neon-primary/20 font-sans transition-all placeholder:text-muted/40"
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
              className="w-full bg-[#0D0D1A]/90 border border-surface/50 rounded-2xl px-4 py-3.5 text-text-primary text-sm focus:outline-none focus:border-neon-primary focus:ring-2 focus:ring-neon-primary/20 font-sans transition-all placeholder:text-muted/40"
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
              className="w-full bg-[#0D0D1A]/90 border border-surface/50 rounded-2xl p-4 text-text-primary text-sm focus:outline-none focus:border-neon-primary focus:ring-2 focus:ring-neon-primary/20 font-sans transition-all resize-none placeholder:text-muted/40 leading-relaxed"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-neon-primary via-[#6d44e8] to-[#5435CC] text-white font-bold tracking-wide shadow-[0_0_25px_rgba(84,53,204,0.45)] hover:shadow-[0_0_35px_rgba(84,53,204,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 font-mono text-sm flex items-center justify-center gap-2.5 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Transmitting Message...</span>
            </span>
          ) : (
            <>
              <FaPaperPlane className="text-sm" />
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

  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsSectionRef = useRef(null);

  useEffect(() => {
    const el = skillsSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      id: "frontend",
      title: "Frontend Architecture",
      subtitle: "Client-Side & Reactive UI",
      badge: "User Interface",
      status: "Responsive & Modern",
      icon: FaLaptopCode,
      skills: profile.frontendSkills || [],
      count: profile.frontendSkills?.length || 0,
      glowColor: "rgba(84, 53, 204, 0.22)",
    },
    {
      id: "backend",
      title: "Backend Engineering",
      subtitle: "Server Runtimes & REST APIs",
      badge: "Core Systems",
      status: "Scalable & Secure",
      icon: FaServer,
      skills: profile.backendSkills || [],
      count: profile.backendSkills?.length || 0,
      glowColor: "rgba(16, 3, 84, 0.35)",
    },
    {
      id: "database",
      title: "Database & Storage",
      subtitle: "Schema Design & Persistence",
      badge: "Data Layer",
      status: "High-Throughput Queries",
      icon: FaDatabase,
      skills: profile.databaseSkills || [],
      count: profile.databaseSkills?.length || 0,
      glowColor: "rgba(84, 53, 204, 0.22)",
    },
    {
      id: "tools",
      title: "DevOps & Toolchain",
      subtitle: "Version Control & Prototyping",
      badge: "Workflow & Cloud",
      status: "Continuous Integration",
      icon: FaTools,
      skills: profile.tools || [],
      count: profile.tools?.length || 0,
      glowColor: "rgba(16, 3, 84, 0.35)",
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
          {/* Profile Image Portrait (Enlarged 3:4 Frame with Perfect Fit) */}
          <div className="relative flex-shrink-0 animate-fade-in group">
            {/* Outer Frame (Significantly enlarged 3:4 ratio) */}
            <div className="w-72 sm:w-80 md:w-96 lg:w-[26rem] xl:w-[28rem] aspect-[3/4] p-3 sm:p-4 rounded-[2.5rem] border-2 border-neon-primary/40 shadow-[0_0_45px_rgba(84,53,204,0.25)] group-hover:border-neon-primary transition-all duration-500 group-hover:shadow-[0_0_75px_rgba(84,53,204,0.5)] bg-[#00020B]/30 backdrop-blur-sm">
              {/* Inner Image Mask */}
              <div className="w-full h-full rounded-[2rem] overflow-hidden border border-neon-primary/25 relative group/pic bg-gradient-to-b from-neon-primary/10 via-transparent to-[#00020B]/70 flex items-end justify-center">
                <picture className="w-full h-full">
                  <source srcSet="/12006.avif" type="image/avif" />
                  <source srcSet="/12006.webp" type="image/webp" />
                  <img
                    src="/12006.png"
                    alt={`${profile?.name || "Naqsh"} Profile`}
                    className="w-full h-full object-cover object-[center_top] filter drop-shadow-[0_16px_32px_rgba(0,2,11,0.7)] group-hover:scale-[1.03] transition-all duration-500"
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
            {/* Status indicator */}
            <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 w-6 h-6 bg-neon-primary rounded-full border-4 border-[#00020B] animate-pulse shadow-[0_0_20px_rgba(84,53,204,0.8)] z-20" title="Available for work" />
          </div>

          {/* Hero Text */}
          <div className="text-center md:text-left animate-slide-up opacity-0 flex-grow" style={{ animationDelay: "0.2s" }}>
            {(profile?.availableForWork ?? true) && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00020B]/70 border border-neon-primary/15 rounded-full mb-6 shadow-[0_0_15px_rgba(84,53,204,0.08)]">
                <span className="relative flex h-2.5 w-2.5 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-primary"></span>
                </span>
                <span className="text-neon-primary text-xs font-mono font-medium uppercase tracking-widest pr-2">
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
              className="text-muted font-sans max-w-65ch mx-auto md:mx-0 text-lg leading-relaxed mb-8 whitespace-pre-wrap glass p-5 rounded-r-xl rounded-bl-xl border-l-4 border-neon-primary/60"
              style={{ background: "rgba(0, 2, 11, 0.9)" }}
            >
              {profile?.description || "I craft modern, performant web applications with clean code and stunning user experiences."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-neon-primary text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(84,53,204,0.4)] transition-all duration-300 hover:translate-y-[-2px]"
              >
                View Projects
                <FaArrowDown className="text-sm group-hover:translate-y-1 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#00020B]/80 border-2 border-neon-primary text-neon-primary font-semibold rounded-lg hover:bg-neon-primary hover:text-white hover:shadow-[0_0_20px_rgba(84,53,204,0.4)] hover:translate-y-[-2px] transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <FaArrowDown className="text-neon-primary/35 text-xl" aria-hidden="true" />
        </div>
      </section>

      {/* ── SKILLS SECTION ── */}
      <section
        id="skills"
        ref={skillsSectionRef}
        className="py-28 px-6 relative z-10 border-t border-surface/20 overflow-hidden scroll-mt-24 md:scroll-mt-28"
      >
        {/* Ambient background glow orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-primary/5 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#100354]/12 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20 px-4">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-text-primary mb-5 tracking-tight">
              Technical <span className="gradient-text text-glow">Arsenal</span>
            </h2>
            <p className="text-muted font-sans max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Curated technologies and modern toolchains I leverage to engineer high-performance, scalable web systems.
            </p>
          </div>

          {/* Cards 2x2 Grid with Alternating Left / Right Entrance Animation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 max-w-6xl mx-auto text-left">
            {skillCategories.map((cat, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = cat.icon;

              // Alternating entrance animation: Even from left, Odd from right
              const transformClass = skillsVisible
                ? "translate-x-0 opacity-100 scale-100"
                : isEven
                  ? "-translate-x-14 md:-translate-x-24 opacity-0 scale-[0.96]"
                  : "translate-x-14 md:translate-x-24 opacity-0 scale-[0.96]";

              return (
                <div
                  key={cat.id}
                  style={{
                    transitionDuration: "850ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${idx * 130}ms`,
                  }}
                  className={`transition-all ${transformClass} relative group rounded-3xl p-7 md:p-8 bg-gradient-to-br from-[#0D0D1A]/95 via-[#00020B]/90 to-[#100354]/25 border border-surface/50 hover:border-neon-primary/60 shadow-[0_0_30px_rgba(84,53,204,0.05)] hover:shadow-[0_0_50px_rgba(84,53,204,0.22)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden`}
                >
                  {/* Top neon indicator highlight bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-primary to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Ambient top-right reactive glow */}
                  <div
                    className="absolute -top-14 -right-14 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-125"
                    style={{ background: cat.glowColor }}
                  />

                  <div>
                    {/* Header: Icon + Titles + Count Badge */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-13 h-13 md:w-14 md:h-14 rounded-2xl bg-[#00020B] border border-neon-primary/30 flex items-center justify-center text-neon-primary text-xl md:text-2xl shadow-[0_0_15px_rgba(84,53,204,0.15)] group-hover:border-neon-primary group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(84,53,204,0.4)] transition-all duration-300 flex-shrink-0">
                          <Icon />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-primary animate-pulse" />
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

                      <span className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-mono bg-[#00020B]/80 border border-surface/60 text-muted group-hover:border-neon-primary/50 group-hover:text-text-primary transition-all">
                        {cat.count} Skills
                      </span>
                    </div>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2.5 my-4">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={`${cat.id}-${sIdx}`}
                          className="group/pill inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#00020B]/90 border border-surface/50 text-text-primary text-xs md:text-sm font-mono tracking-wide hover:border-neon-primary hover:text-white hover:bg-neon-primary/10 hover:shadow-[0_0_16px_rgba(84,53,204,0.35)] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-primary/50 group-hover/pill:bg-neon-primary group-hover/pill:shadow-[0_0_8px_#5435CC] transition-all" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Status Line */}
                  <div className="pt-4 mt-5 border-t border-surface/30 flex items-center justify-between text-xs font-mono text-muted">
                    <span className="flex items-center gap-1.5 text-muted group-hover:text-text-primary transition-colors">
                      <span className="text-neon-primary">✦</span> {cat.status}
                    </span>
                    <span className="flex items-center gap-1.5 text-neon-primary font-medium">
                      <FaCheckCircle className="text-[11px]" /> Verified Stack
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
        <div className="max-w-7xl mx-auto px-6 mb-4 md:mb-6 text-center">

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted font-sans text-sm md:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            Production-grade full-stack systems, dynamic real-time architectures, and luxury web experiences built with modern technologies.
          </p>
        </div>

        <MotionTiles projects={projects} />
      </section>

      {/* ── SERVICES & SOLUTIONS SECTION ── */}
      <ServicesSection />

      {/* ── CONTACT SECTION with Ridgeline Terrain Background ── */}
      <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 relative z-10 border-t border-surface/20 scroll-mt-20 overflow-hidden">
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
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-primary/10 border border-neon-primary/30 text-neon-primary text-xs font-mono font-medium tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(84,53,204,0.15)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-neon-primary animate-pulse" />
            <span>Available For Work</span>
          </div> */}

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-4">
            Let&apos;s Build Something <span className="gradient-text">Exceptional</span>
          </h2>
          <p className="text-muted font-sans mb-10 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Have a project in mind, need full-stack architecture, or want to discuss opportunities? Drop a line and I&apos;ll reply promptly.
          </p>

          <ContactForm />

          {/* Social Links & Direct Mail Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-12">
            <a
              href="https://github.com/Naqsh786/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#00020B]/80 backdrop-blur-md border border-surface/50 text-muted hover:text-white hover:border-neon-primary/60 hover:shadow-[0_0_20px_rgba(84,53,204,0.3)] transition-all duration-300 hover:-translate-y-1 font-mono text-xs font-bold"
              title="GitHub Profile"
              aria-label="Visit GitHub Profile"
            >
              <FaGithub className="text-base text-neon-primary group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-naqsh-369347425/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#00020B]/80 backdrop-blur-md border border-surface/50 text-muted hover:text-white hover:border-neon-primary/60 hover:shadow-[0_0_20px_rgba(84,53,204,0.3)] transition-all duration-300 hover:-translate-y-1 font-mono text-xs font-bold"
              title="LinkedIn Profile"
              aria-label="Visit LinkedIn Profile"
            >
              <FaLinkedin className="text-base text-neon-primary group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=naqshcc916@gmail.com&su=Project%20Inquiry%20-%20Naqsh%20Portfolio"
              onClick={handleEmailClick}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#00020B]/80 backdrop-blur-md border border-surface/50 text-muted hover:text-white hover:border-neon-primary/60 hover:shadow-[0_0_20px_rgba(84,53,204,0.3)] transition-all duration-300 hover:-translate-y-1 font-mono text-xs font-bold"
              title="Send Email via Gmail"
              aria-label="Send Email via Gmail"
            >
              <FaEnvelope className="text-base text-neon-primary group-hover:scale-110 transition-transform" />
              <span>naqshcc916@gmail.com</span>
            </a>
          </div>

          {emailCopied && (
            <div className="mt-4 inline-block px-4 py-2 rounded-xl bg-neon-primary/10 border border-neon-primary/40 text-neon-primary font-mono text-xs shadow-[0_0_15px_rgba(84,53,204,0.3)] animate-bounce">
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

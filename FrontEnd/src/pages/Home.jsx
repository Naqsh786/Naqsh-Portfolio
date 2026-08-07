import React, { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Hero3D from "../components/Hero3D"; // New 3D component
import { FaLinkedin, FaEnvelope, FaArrowDown, FaTerminal, FaGithub, FaPaperPlane, FaRedo } from "react-icons/fa";
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
    <div className="glass p-8 md:p-10 rounded-3xl border border-neon-primary/20 max-w-3xl mx-auto shadow-[0_0_40px_rgba(var(--color-neon-primary),0.08)] text-left">
      {status && (
        <div
          className={`mb-6 p-4 rounded-xl border font-mono text-xs md:text-sm font-semibold ${status.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
            : "bg-red-500/10 border-red-500/40 text-red-300"
            }`}
        >
          {status.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className="block text-xs font-mono text-gray-300 mb-2 uppercase tracking-wider">
              Your Name *
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Alex Rivers"
              className="w-full bg-slate-950/80 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-primary font-sans transition-all"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-xs font-mono text-gray-300 mb-2 uppercase tracking-wider">
              Your Email *
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@example.com"
              className="w-full bg-slate-950/80 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-primary font-sans transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className="block text-xs font-mono text-gray-300 mb-2 uppercase tracking-wider">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Project Discussion / Inquiry"
            className="w-full bg-slate-950/80 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-primary font-sans transition-all"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-mono text-gray-300 mb-2 uppercase tracking-wider">
            Message *
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Hi Naqsh, I would like to build..."
            className="w-full bg-slate-950/80 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-primary font-sans transition-all resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-neon-primary text-white font-bold tracking-wide shadow-[0_0_20px_rgba(var(--color-neon-primary),0.35)] hover:shadow-[0_0_30px_rgba(var(--color-neon-primary),0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 font-mono text-sm flex items-center justify-center gap-2"
        >
          {loading ? (
            "Sending Message..."
          ) : (
            <>
              <FaPaperPlane className="text-xs" /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const Home = ({ theme }) => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    const email = "naqshcc916@gmail.com";
    navigator.clipboard.writeText(email).catch(() => {});
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 4000);
    
    // Open Gmail web compose in new tab
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Project%20Inquiry%20-%20Naqsh%20Portfolio`, "_blank", "noopener,noreferrer");
  };

  const handleReplayIntro = (e) => {
    e.preventDefault();
    localStorage.removeItem("portfolio_intro_seen");
    window.location.reload();
  };

  return (
    <div className="bg-grid min-h-screen relative z-10 bg-slate-950/50">
      {/* ── HERO SECTION ── */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-28 md:pt-0 relative overflow-hidden">

        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-primary/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-primary/3 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "1.5s" }} />

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-20 relative z-10">
          {/* Profile Image Portrait */}
          <div className="relative flex-shrink-0 animate-fade-in group">
            {/* Outer Frame */}
            <div className="w-60 h-60 md:w-72 md:h-72 lg:w-[22rem] lg:h-[22rem] p-3 md:p-4 rounded-full glass border border-neon-primary/40 shadow-[0_0_30px_rgba(var(--color-neon-primary),0.15)] group-hover:border-neon-primary/80 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(var(--color-neon-primary),0.45)] bg-dark-bg/80">
              {/* Inner Image Mask */}
              <div className="w-full h-full rounded-full overflow-hidden border border-neon-primary/20 relative group/pic bg-dark-bg">
                <picture>
                  <source srcSet="/12006.avif" type="image/avif" />
                  <source srcSet="/12006.webp" type="image/webp" />
                  <img
                    src="/12006.png"
                    alt={`${profile?.name || "Naqsh"} Profile`}
                    className="w-full h-full object-cover object-center scale-110"
                    width="288"
                    height="288"
                    fetchPriority="high"
                    loading="eager"
                    style={{ imageRendering: "high-quality" }}
                  />
                </picture>
              </div>
            </div>
            {/* Status indicator */}
            <div className="absolute bottom-5 right-5 lg:bottom-8 lg:right-8 w-6 h-6 bg-neon-primary rounded-full border-4 border-dark-bg animate-pulse shadow-[0_0_20px_rgba(var(--color-neon-primary),0.8)] z-20" title="Available for work" />
          </div>

          {/* Hero Text */}
          <div className="text-center md:text-left animate-slide-up opacity-0 flex-grow" style={{ animationDelay: "0.2s" }}>
            {(profile?.availableForWork ?? true) && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-dark-card border border-neon-primary/20 rounded-full mb-6 shadow-[0_0_15px_rgba(var(--color-neon-primary),0.1)]">
                <span className="relative flex h-2.5 w-2.5 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-primary"></span>
                </span>
                <span className="text-neon-primary text-xs font-mono font-medium uppercase tracking-widest pr-2">
                  Open to Opportunities
                </span>
              </div>
            )}

            <h2 className="text-xl md:text-2xl text-gray-400 font-mono mb-2">
              Hello World, I'm
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-4">
              <span className="gradient-text text-glow tracking-tight">{profile?.name || "Naqsh"}</span>
            </h1>

            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
              <div className="h-[2px] w-12 bg-neon-primary/80 hidden md:block"></div>
              <p className="text-xl md:text-2xl text-white font-medium tracking-wide">
                {profile?.role || "Full-Stack Developer"}
              </p>
            </div>

            <p
              className="text-gray-300 font-sans max-w-65ch mx-auto md:mx-0 text-lg leading-relaxed mb-8 whitespace-pre-wrap glass p-5 rounded-r-xl rounded-bl-xl border-l-4 border-neon-primary/80"
              style={{ background: "rgba(15, 23, 42, 0.9)" }}
            >
              {profile?.description || "I craft modern, performant web applications with clean code and stunning user experiences."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-neon-primary text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(var(--color-neon-primary),0.5)] transition-all duration-300 hover:translate-y-[-2px]"
              >
                View Projects
                <FaArrowDown className="text-sm group-hover:translate-y-1 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900/80 border-2 border-neon-primary text-neon-primary font-semibold rounded-lg hover:bg-neon-primary hover:text-white hover:shadow-[0_0_20px_rgba(var(--color-neon-primary),0.5)] hover:translate-y-[-2px] transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <FaArrowDown className="text-neon-primary/40 text-xl" aria-hidden="true" />
        </div>
      </section>

      {/* ── SKILLS SECTION ── */}
      <section id="skills" className="py-24 px-6 relative z-10 border-t border-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 px-4 animate-fade-in opacity-0">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-gray-300 font-sans max-w-xl mx-auto mb-10 text-base md:text-lg">
              Here are the technologies and tools I utilize to craft amazing digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto text-left">
            {/* Frontend Skills Card */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-neon-primary/20 group hover:border-neon-primary/50 transition-all shadow-[0_0_20px_rgba(var(--color-neon-primary),0.03)] hover:shadow-[0_0_30px_rgba(var(--color-neon-primary),0.18)] hover:-translate-y-2 flex flex-col">
              <div className="flex items-center gap-4 mb-5 border-b border-gray-800/80 pb-4">
                <div className="w-10 h-10 rounded-xl bg-neon-primary/10 border border-neon-primary/30 flex items-center justify-center text-neon-primary font-bold text-lg group-hover:bg-neon-primary group-hover:text-white transition-all shadow-inner">
                  FE
                </div>
                <h3 className="text-xl font-black text-white tracking-widest uppercase">
                  Frontend
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.frontendSkills?.map((skill, idx) => (
                  <span key={`fe-${idx}`} className="px-3 py-1.5 rounded-full border border-gray-700/80 bg-black/60 text-gray-300 font-mono text-xs tracking-wide hover:text-white hover:border-neon-primary/80 hover:bg-neon-primary/10 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Skills Card */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-neon-primary/20 group hover:border-neon-primary/50 transition-all shadow-[0_0_20px_rgba(var(--color-neon-primary),0.03)] hover:shadow-[0_0_30px_rgba(var(--color-neon-primary),0.18)] hover:-translate-y-2 flex flex-col">
              <div className="flex items-center gap-4 mb-5 border-b border-gray-800/80 pb-4">
                <div className="w-10 h-10 rounded-xl bg-neon-primary/10 border border-neon-primary/30 flex items-center justify-center text-neon-primary font-bold text-lg group-hover:bg-neon-primary group-hover:text-white transition-all shadow-inner">
                  BE
                </div>
                <h3 className="text-xl font-black text-white tracking-widest uppercase">
                  Backend
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.backendSkills?.map((skill, idx) => (
                  <span key={`be-${idx}`} className="px-3 py-1.5 rounded-full border border-gray-700/80 bg-black/60 text-gray-300 font-mono text-xs tracking-wide hover:text-white hover:border-neon-primary/80 hover:bg-neon-primary/10 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Database Skills Card */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-neon-primary/20 group hover:border-neon-primary/50 transition-all shadow-[0_0_20px_rgba(var(--color-neon-primary),0.03)] hover:shadow-[0_0_30px_rgba(var(--color-neon-primary),0.18)] hover:-translate-y-2 flex flex-col">
              <div className="flex items-center gap-4 mb-5 border-b border-gray-800/80 pb-4">
                <div className="w-10 h-10 rounded-xl bg-neon-primary/10 border border-neon-primary/30 flex items-center justify-center text-neon-primary font-bold text-lg group-hover:bg-neon-primary group-hover:text-white transition-all shadow-inner">
                  DB
                </div>
                <h3 className="text-xl font-black text-white tracking-widest uppercase">
                  Database
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.databaseSkills?.map((skill, idx) => (
                  <span key={`db-${idx}`} className="px-3 py-1.5 rounded-full border border-gray-700/80 bg-black/60 text-gray-300 font-mono text-xs tracking-wide hover:text-white hover:border-neon-primary/80 hover:bg-neon-primary/10 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Tools Skills Card */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-neon-primary/20 group hover:border-neon-primary/50 transition-all shadow-[0_0_20px_rgba(var(--color-neon-primary),0.03)] hover:shadow-[0_0_30px_rgba(var(--color-neon-primary),0.18)] hover:-translate-y-2 flex flex-col">
              <div className="flex items-center gap-4 mb-5 border-b border-gray-800/80 pb-4">
                <div className="w-10 h-10 rounded-xl bg-neon-primary/10 border border-neon-primary/30 flex items-center justify-center text-neon-primary font-bold text-lg group-hover:bg-neon-primary group-hover:text-white transition-all shadow-inner">
                  TL
                </div>
                <h3 className="text-xl font-black text-white tracking-widest uppercase">
                  Tools
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.tools?.map((skill, idx) => (
                  <span key={`tl-${idx}`} className="px-3 py-1.5 rounded-full border border-gray-700/80 bg-black/60 text-gray-300 font-mono text-xs tracking-wide hover:text-white hover:border-neon-primary/80 hover:bg-neon-primary/10 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS SECTION ── */}
      <section id="projects" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in opacity-0">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-300 font-sans max-w-xl mx-auto mb-10 text-base md:text-lg">
              A collection of projects that showcase my skills and passion for
              building amazing digital experiences.
            </p>
          </div>

          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-gray-400 font-sans text-lg">
                Projects are loading soon. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section id="contact" className="py-24 px-6 relative z-10 border-t border-gray-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-300 font-sans mb-10 text-base md:text-lg">
            Got a project in mind or just want to say hi? Send a message and I&apos;ll get back to you within 24 hours.
          </p>

          <ContactForm />

          <div className="flex justify-center gap-6 mt-12">
            <a
              href="https://github.com/Naqsh786/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-xl bg-dark-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-primary hover:border-neon-primary/50 hover:shadow-lg hover:shadow-neon-primary/10 transition-all duration-300 hover:translate-y-[-4px]"
              title="GitHub Profile"
              aria-label="Visit GitHub Profile"
            >
              <FaGithub className="text-2xl" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-naqsh-369347425/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-xl bg-dark-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-primary hover:border-neon-primary/50 hover:shadow-lg hover:shadow-neon-primary/10 transition-all duration-300 hover:translate-y-[-4px]"
              title="LinkedIn Profile"
              aria-label="Visit LinkedIn Profile"
            >
              <FaLinkedin className="text-2xl" aria-hidden="true" />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=naqshcc916@gmail.com&su=Project%20Inquiry%20-%20Naqsh%20Portfolio"
              onClick={handleEmailClick}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-xl bg-dark-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-primary hover:border-neon-primary/50 hover:shadow-lg hover:shadow-neon-primary/10 transition-all duration-300 hover:translate-y-[-4px]"
              title="Send Email via Gmail"
              aria-label="Send Email via Gmail"
            >
              <FaEnvelope className="text-2xl" aria-hidden="true" />
            </a>
          </div>

          {emailCopied && (
            <div className="mt-4 inline-block px-4 py-2 rounded-xl bg-neon-primary/10 border border-neon-primary/40 text-neon-primary font-mono text-xs animate-bounce">
              ✓ Email copied to clipboard! (naqshcc916@gmail.com)
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-800/30 py-8 px-6 relative z-10 glass mt-12 mb-4 mx-4 rounded-3xl overflow-hidden flex flex-col gap-4">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm font-mono">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-neon-primary">Naqsh</span>. All rights
            reserved.
          </p>
          
          <button 
            onClick={handleReplayIntro}
            className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-neon-primary transition-colors"
          >
            <FaRedo className="text-[10px]" /> Replay Intro
          </button>
          
          <p className="text-gray-500 text-xs font-mono">
            Built with <span className="text-neon-primary">React</span> &{" "}
            <span className="text-neon-primary">Three.js</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

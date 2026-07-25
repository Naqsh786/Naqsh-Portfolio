import React, { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Hero3D from "../components/Hero3D"; // New 3D component
import { FaLinkedin, FaEnvelope, FaArrowDown, FaTerminal, FaGithub, FaPaperPlane } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { profile, projects } from "../data"; // Hardcoded data

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
      const res = await fetch("http://localhost:5000/api/contact", {
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
    <div className="glass p-8 md:p-10 rounded-3xl border border-neon-primary/20 max-w-2xl mx-auto shadow-[0_0_40px_rgba(var(--color-neon-primary),0.08)] text-left">
      {status && (
        <div
          className={`mb-6 p-4 rounded-xl border font-mono text-xs md:text-sm font-semibold ${
            status.type === "success"
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
            <label className="block text-xs font-mono text-gray-300 mb-2 uppercase tracking-wider">
              Your Name *
            </label>
            <input
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
            <label className="block text-xs font-mono text-gray-300 mb-2 uppercase tracking-wider">
              Your Email *
            </label>
            <input
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
          <label className="block text-xs font-mono text-gray-300 mb-2 uppercase tracking-wider">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Project Discussion / Inquiry"
            className="w-full bg-slate-950/80 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-primary font-sans transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-300 mb-2 uppercase tracking-wider">
            Message *
          </label>
          <textarea
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
  return (
    <div className="bg-grid min-h-screen">
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
              <p className="text-xl md:text-2xl text-neon-primary font-medium tracking-wide">
                {profile?.role || "Full-Stack Developer"}
              </p>
            </div>

            <p className="text-gray-300 max-w-xl mx-auto md:mx-0 text-lg leading-relaxed mb-8 whitespace-pre-wrap glass p-5 rounded-r-xl rounded-bl-xl border-l-4 border-neon-primary/80">
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
                className="inline-flex items-center gap-2 px-7 py-3.5 glass border-neon-primary/45 text-neon-primary font-semibold rounded-lg hover:bg-neon-primary/10 hover:border-neon-primary hover:shadow-[0_0_15px_rgba(var(--color-neon-primary),0.3)] transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <FaArrowDown className="text-neon-primary/40 text-xl" />
        </div>
      </section>

      {/* ── SKILLS SECTION ── */}
      <section id="skills" className="py-24 px-6 relative z-10 border-t border-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 px-4 animate-fade-in opacity-0">
            <span className="text-neon-primary font-mono text-sm uppercase tracking-widest">
              Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The technologies and tools I utilize to craft amazing digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
            {/* Frontend Skills Card */}
            <div className="glass p-8 rounded-3xl border border-neon-primary/20 group hover:border-neon-primary/50 transition-all shadow-[0_0_20px_rgba(var(--color-neon-primary),0.03)] hover:shadow-[0_0_30px_rgba(var(--color-neon-primary),0.18)] hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6 border-b border-gray-800/80 pb-4">
                <div className="w-12 h-12 rounded-xl bg-neon-primary/10 border border-neon-primary/30 flex items-center justify-center text-neon-primary font-bold text-xl group-hover:bg-neon-primary group-hover:text-white transition-all shadow-inner">
                  FE
                </div>
                <h3 className="text-2xl font-black text-white tracking-widest uppercase">
                  Frontend
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {profile.frontendSkills?.map((skill, idx) => (
                  <span key={`fe-${idx}`} className="px-5 py-2.5 rounded-full border border-gray-700/80 bg-black/60 text-gray-300 font-mono text-xs md:text-sm tracking-wide hover:text-white hover:border-neon-primary/80 hover:bg-neon-primary/10 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Skills Card */}
            <div className="glass p-8 rounded-3xl border border-neon-primary/20 group hover:border-neon-primary/50 transition-all shadow-[0_0_20px_rgba(var(--color-neon-primary),0.03)] hover:shadow-[0_0_30px_rgba(var(--color-neon-primary),0.18)] hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6 border-b border-gray-800/80 pb-4">
                <div className="w-12 h-12 rounded-xl bg-neon-primary/10 border border-neon-primary/30 flex items-center justify-center text-neon-primary font-bold text-xl group-hover:bg-neon-primary group-hover:text-white transition-all shadow-inner">
                  BE
                </div>
                <h3 className="text-2xl font-black text-white tracking-widest uppercase">
                  Backend
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {profile.backendSkills?.map((skill, idx) => (
                  <span key={`be-${idx}`} className="px-5 py-2.5 rounded-full border border-gray-700/80 bg-black/60 text-gray-300 font-mono text-xs md:text-sm tracking-wide hover:text-white hover:border-neon-primary/80 hover:bg-neon-primary/10 transition-all cursor-default">
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
            <span className="text-neon-primary font-mono text-sm uppercase tracking-widest">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
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
              <p className="text-gray-500 text-lg">
                Projects are loading soon. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section id="contact" className="py-24 px-6 relative z-10 border-t border-gray-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-neon-primary font-mono text-sm uppercase tracking-widest">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-6">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-400 mb-10 text-base md:text-lg">
            Have a project in mind or want to collaborate? Send a message directly to my inbox!
          </p>

          <ContactForm />

          <div className="flex justify-center gap-6 mt-12">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-xl bg-dark-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-primary hover:border-neon-primary/50 hover:shadow-lg hover:shadow-neon-primary/10 transition-all duration-300 hover:translate-y-[-4px]"
              title="GitHub Profile"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-xl bg-dark-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-primary hover:border-neon-primary/50 hover:shadow-lg hover:shadow-neon-primary/10 transition-all duration-300 hover:translate-y-[-4px]"
              title="LinkedIn Profile"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="mailto:naqsh@example.com"
              className="w-14 h-14 rounded-xl bg-dark-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-primary hover:border-neon-primary/50 hover:shadow-lg hover:shadow-neon-primary/10 transition-all duration-300 hover:translate-y-[-4px]"
              title="Direct Email"
            >
              <FaEnvelope className="text-2xl" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-800/30 py-8 px-6 relative z-10 glass mt-12 mb-4 mx-4 rounded-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm font-mono">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-neon-primary">Naqsh</span>. All rights
            reserved.
          </p>
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

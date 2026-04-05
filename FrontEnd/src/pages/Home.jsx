import ProjectCard from "../components/ProjectCard";
import Hero3D from "../components/Hero3D"; // New 3D component
import { FaLinkedin, FaEnvelope, FaArrowDown, FaTerminal, FaGithub } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { profile, projects } from "../data"; // Hardcoded data

const Home = () => {
  return (
    <div className="bg-grid min-h-screen">
      {/* ── HERO SECTION ── */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* 3D Background */}
        <Hero3D />

        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-red/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-red/3 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "1.5s" }} />

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative z-10">
          {/* Profile Image Portrait */}
          <div className="relative flex-shrink-0 animate-fade-in group">
            {/* Outer Frame */}
            <div className="w-60 h-60 md:w-72 md:h-72 lg:w-[22rem] lg:h-[22rem] p-3 md:p-4 rounded-full glass border border-neon-red/40 shadow-[0_0_30px_rgba(255,0,60,0.15)] group-hover:border-neon-red/80 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,0,60,0.4)] bg-[#110004]/80">
              {/* Inner Image Mask */}
              <div className="w-full h-full rounded-full overflow-hidden border border-neon-red/20 relative group/pic bg-[#110004]">
                <img 
                  src={profile?.imageUrl || "/12006.png"} 
                  alt={`${profile?.name || "Naqsh"} Profile`} 
                  className="w-full h-full object-cover object-center scale-110"
                  style={{ imageRendering: "high-quality" }}
                />
              </div>
            </div>
            {/* Status indicator */}
            <div className="absolute bottom-5 right-5 lg:bottom-8 lg:right-8 w-8 h-8 bg-neon-red rounded-full border-4 border-[#050001] animate-pulse shadow-[0_0_20px_rgba(255,0,60,0.8)] z-20" title="Available for work" />
          </div>

          {/* Hero Text */}
          <div className="text-center md:text-left animate-slide-up opacity-0 flex-grow" style={{ animationDelay: "0.2s" }}>
            {(profile?.availableForWork ?? true) && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1a0005]/80 backdrop-blur-sm border border-neon-red/20 rounded-full mb-6 shadow-[0_0_15px_rgba(255,0,60,0.1)]">
                <span className="relative flex h-2.5 w-2.5 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-red"></span>
                </span>
                <span className="text-neon-red text-xs font-mono font-medium uppercase tracking-widest pr-2">
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
              <div className="h-[2px] w-12 bg-neon-red/80 hidden md:block"></div>
              <p className="text-xl md:text-2xl text-neon-red font-medium tracking-wide">
                {profile?.role || "Full-Stack Developer"}
              </p>
            </div>

            <p className="text-gray-300 max-w-xl mx-auto md:mx-0 text-lg leading-relaxed mb-8 whitespace-pre-wrap glass p-5 rounded-r-xl rounded-bl-xl border-l-4 border-neon-red/80">
              {profile?.description || "I craft modern, performant web applications with clean code and stunning user experiences."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-neon-red text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(255,0,60,0.5)] transition-all duration-300 hover:translate-y-[-2px]"
              >
                View Projects
                <FaArrowDown className="text-sm group-hover:translate-y-1 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 glass border-neon-red/40 text-neon-red font-semibold rounded-lg hover:bg-neon-red/10 hover:border-neon-red hover:shadow-[0_0_15px_rgba(255,0,60,0.3)] transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <FaArrowDown className="text-neon-red/40 text-xl" />
        </div>
      </section>

      {/* ── SKILLS SECTION ── */}
      <section id="skills" className="py-24 px-6 relative z-10 border-t border-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 px-4 animate-fade-in opacity-0">
            <span className="text-neon-red font-mono text-sm uppercase tracking-widest">
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
            <div className="glass p-8 rounded-3xl border border-neon-red/20 group hover:border-neon-red/50 transition-all shadow-[0_0_20px_rgba(255,0,60,0.05)] hover:shadow-[0_0_30px_rgba(255,0,60,0.2)] hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6 border-b border-gray-800/80 pb-4">
                <div className="w-12 h-12 rounded-xl bg-neon-red/10 border border-neon-red/30 flex items-center justify-center text-neon-red font-bold text-xl group-hover:bg-neon-red group-hover:text-white transition-all shadow-inner">
                  FE
                </div>
                <h3 className="text-2xl font-black text-white tracking-widest uppercase">
                  Frontend
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {profile.frontendSkills?.map((skill, idx) => (
                  <span key={`fe-${idx}`} className="px-5 py-2.5 rounded-full border border-gray-700/80 bg-black/60 text-gray-300 font-mono text-xs md:text-sm tracking-wide hover:text-white hover:border-neon-red/80 hover:bg-neon-red/10 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Skills Card */}
            <div className="glass p-8 rounded-3xl border border-neon-red/20 group hover:border-neon-red/50 transition-all shadow-[0_0_20px_rgba(255,0,60,0.05)] hover:shadow-[0_0_30px_rgba(255,0,60,0.2)] hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6 border-b border-gray-800/80 pb-4">
                <div className="w-12 h-12 rounded-xl bg-neon-red/10 border border-neon-red/30 flex items-center justify-center text-neon-red font-bold text-xl group-hover:bg-neon-red group-hover:text-white transition-all shadow-inner">
                  BE
                </div>
                <h3 className="text-2xl font-black text-white tracking-widest uppercase">
                  Backend
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {profile.backendSkills?.map((skill, idx) => (
                  <span key={`be-${idx}`} className="px-5 py-2.5 rounded-full border border-gray-700/80 bg-black/60 text-gray-300 font-mono text-xs md:text-sm tracking-wide hover:text-white hover:border-neon-red/80 hover:bg-neon-red/10 transition-all cursor-default">
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
            <span className="text-neon-red font-mono text-sm uppercase tracking-widest">
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
          <span className="text-neon-red font-mono text-sm uppercase tracking-widest">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-6">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-500 mb-10 text-lg">
            Have a project in mind? Let&apos;s discuss and build something
            amazing together.
          </p>

          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-xl bg-dark-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-red hover:border-neon-red/50 hover:shadow-lg hover:shadow-neon-red/10 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-xl bg-dark-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-red hover:border-neon-red/50 hover:shadow-lg hover:shadow-neon-red/10 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="mailto:naqsh@example.com"
              className="w-14 h-14 rounded-xl bg-dark-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-red hover:border-neon-red/50 hover:shadow-lg hover:shadow-neon-red/10 transition-all duration-300 hover:translate-y-[-4px]"
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
            <span className="text-neon-red">Naqsh</span>. All rights
            reserved.
          </p>
          <p className="text-gray-500 text-xs font-mono">
            Built with <span className="text-neon-red">React</span> &{" "}
            <span className="text-neon-red">Three.js</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import ProjectCard from "../components/ProjectCard";
import { FaLinkedin, FaEnvelope, FaArrowDown, FaTerminal, FaGithub } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useGetProjectsQuery, useGetProfileQuery } from "../redux/api/apiSlice";

const Home = () => {
  const { data: projects = [], isLoading: loadingProjects } = useGetProjectsQuery();
  const { data: profile } = useGetProfileQuery();

  return (
    <div className="bg-grid min-h-screen">
      {/* ── HERO SECTION ── */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-green/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-green/3 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="relative flex-shrink-0 animate-fade-in group">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-neon-green/30 animate-pulse-glow hover:border-neon-green/80 transition-all duration-500 bg-dark-surface">
              <img 
                src={profile?.imageUrl || "/12006.png"} 
                alt={`${profile?.name || "Naqsh"} Profile`} 
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            {/* Status indicator */}
            <div className="absolute bottom-6 right-6 w-6 h-6 bg-neon-green rounded-full border-4 border-dark-bg animate-pulse shadow-[0_0_15px_rgba(57,255,20,0.5)]" />
          </div>

          {/* Hero Text */}
          <div className="text-center md:text-left animate-slide-up opacity-0" style={{ animationDelay: "0.2s" }}>
            {(profile?.availableForWork ?? true) && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20 mb-6">
                <HiSparkles className="text-neon-green text-sm" />
                <span className="text-neon-green text-xs font-mono font-semibold uppercase tracking-widest">
                  Available for work
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
              Hi, I am{" "}
              <span className="gradient-text text-glow">{profile?.name || "Naqsh"}</span>
            </h1>

            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <FaTerminal className="text-neon-green" />
              <p className="text-lg md:text-xl text-gray-400 font-mono">
                {profile?.role || "Full-Stack Developer"}
              </p>
            </div>

            <p className="text-gray-500 max-w-lg text-base md:text-lg leading-relaxed mb-8 whitespace-pre-wrap">
              {profile?.description || "I craft modern, performant web applications with clean code and stunning user experiences. Specializing in the MERN Stack."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300 hover:translate-y-[-2px]"
              >
                View Projects
                <FaArrowDown className="text-sm group-hover:translate-y-1 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-neon-green/30 text-neon-green font-semibold rounded-lg hover:bg-neon-green/10 transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <FaArrowDown className="text-neon-green/40 text-xl" />
        </div>
      </section>

      {/* ── PROJECTS SECTION ── */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in opacity-0">
            <span className="text-neon-green font-mono text-sm uppercase tracking-widest">
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

          {loadingProjects ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-neon-green/20 border-t-neon-green rounded-full animate-spin" />
            </div>
          ) : projects.length > 0 ? (
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
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-neon-green font-mono text-sm uppercase tracking-widest">
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
              className="w-14 h-14 rounded-xl bg-dark-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-green hover:border-neon-green/50 hover:shadow-lg hover:shadow-neon-green/10 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-xl bg-dark-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-green hover:border-neon-green/50 hover:shadow-lg hover:shadow-neon-green/10 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="mailto:naqsh@example.com"
              className="w-14 h-14 rounded-xl bg-dark-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-green hover:border-neon-green/50 hover:shadow-lg hover:shadow-neon-green/10 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <FaEnvelope className="text-2xl" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-800/50 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm font-mono">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-neon-green">Naqsh</span>. All rights
            reserved.
          </p>
          <p className="text-gray-700 text-xs font-mono">
            Built with <span className="text-neon-green">React</span> +{" "}
            <span className="text-neon-green">Express</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

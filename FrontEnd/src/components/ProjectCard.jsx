import { FiExternalLink, FiGithub } from "react-icons/fi";

const ProjectCard = ({ project }) => {
  return (
    <div className="w-full max-w-[400px] mx-auto group rounded-2xl overflow-hidden animate-fade-in opacity-0 hover:translate-y-[-8px] hover:shadow-[0_15px_40px_rgba(var(--color-neon-primary),0.35)] transition-all duration-500 flex flex-col h-full bg-gradient-to-b from-dark-card via-black/20 to-dark-bg/40 border border-neon-primary/20">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9]">
        {project.imageUrl ? (
          <picture>
            {project.imageUrl && project.imageUrl.startsWith('/') && (
              <>
                <source srcSet={project.imageUrl.replace('.png', '.avif')} type="image/avif" />
                <source srcSet={project.imageUrl.replace('.png', '.webp')} type="image/webp" />
              </>
            )}
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              width="400"
              height="225"
              fetchPriority="low"
              decoding="async"
            />
          </picture>
        ) : (
          <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-neon-primary/30 via-slate-900/50 to-black group-hover:scale-105 transition-transform duration-700">
             <div className="absolute inset-0 bg-grid opacity-30"></div>
            <span className="relative z-20 text-6xl font-bold text-neon-primary/60 drop-shadow-[0_0_15px_rgba(var(--color-neon-primary),0.5)] font-mono group-hover:text-neon-primary/90 transition-colors duration-500">
              {"</>"}
            </span>
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-90 z-10" />
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col z-20 relative">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-neon-primary transition-colors duration-300 break-all">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow opacity-80 group-hover:opacity-100 transition-opacity">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-neon-primary/10 text-neon-primary border border-neon-primary/20 shadow-[0_0_10px_rgba(var(--color-neon-primary),0.1)] group-hover:bg-neon-primary/20 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="grid grid-cols-3 gap-1.5 md:gap-2 pt-4 border-t border-neon-primary/10 mt-auto w-full">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${project.title}`}
              className="flex items-center justify-center gap-1 w-full py-2 px-1 rounded-lg bg-neon-primary border border-neon-primary/20 text-white text-[11px] md:text-xs font-bold shadow-[0_0_10px_rgba(var(--color-neon-primary),0.3)] hover:shadow-[0_0_20px_rgba(var(--color-neon-primary),0.8)] hover:scale-[1.02] transition-all duration-300"
            >
              <FiExternalLink className="text-xs md:text-sm shrink-0" aria-hidden="true" />
              <span className="truncate">Demo</span>
            </a>
          )}
          {project.gitFrontend && (
            <a
              href={project.gitFrontend}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Frontend source code for ${project.title}`}
              className="flex items-center justify-center gap-1 w-full py-2 px-1 rounded-lg bg-dark-card border border-white/5 text-gray-300 text-[11px] md:text-xs hover:text-white hover:border-neon-primary/80 hover:bg-neon-primary/10 hover:shadow-[0_0_15px_rgba(var(--color-neon-primary),0.4)] transition-all duration-300"
            >
              <FiGithub className="text-xs md:text-sm shrink-0" aria-hidden="true" />
              <span className="truncate">Frontend</span>
            </a>
          )}
          {project.gitBackend && (
            <a
              href={project.gitBackend}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Backend source code for ${project.title}`}
              className="flex items-center justify-center gap-1 w-full py-2 px-1 rounded-lg bg-dark-card border border-white/5 text-gray-300 text-[11px] md:text-xs hover:text-white hover:border-neon-primary/80 hover:bg-neon-primary/10 hover:shadow-[0_0_15px_rgba(var(--color-neon-primary),0.4)] transition-all duration-300"
            >
              <FiGithub className="text-xs md:text-sm shrink-0" aria-hidden="true" />
              <span className="truncate">Backend</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

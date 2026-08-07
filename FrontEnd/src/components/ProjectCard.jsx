import { FiExternalLink, FiGithub } from "react-icons/fi";

const ProjectCard = ({ project }) => {
  return (
    <div className="w-full min-w-[320px] sm:min-w-[350px] max-w-[400px] mx-auto group rounded-2xl overflow-hidden animate-fade-in opacity-0 hover:translate-y-[-4px] hover:shadow-[0_20px_50px_rgba(var(--color-neon-primary),0.5)] transition-all duration-500 flex flex-col h-full bg-gradient-to-b from-dark-card via-black/20 to-dark-bg/40 border border-neon-primary/20">
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
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col z-20 relative">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-neon-primary transition-colors duration-300 break-words hyphens-none">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow opacity-80 group-hover:opacity-100 transition-opacity description-clamp">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-slate-900 text-neon-primary border border-neon-primary/30 shadow-[0_0_10px_rgba(var(--color-neon-primary),0.15)] transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Actions — always visible, accessible on touch */}
        {(project.liveDemo || project.gitFrontend || project.gitBackend) && (
          <div className="flex gap-2 mt-5 pt-4 border-t border-white/10">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${project.title}`}
                className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-3 rounded-xl bg-neon-primary text-white text-xs font-bold shadow-[0_0_15px_rgba(var(--color-neon-primary),0.45)] hover:bg-white hover:text-neon-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <FiExternalLink className="text-sm shrink-0" aria-hidden="true" />
                <span>Live Demo</span>
              </a>
            )}
            {project.gitFrontend && (
              <a
                href={project.gitFrontend}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Frontend source code for ${project.title}`}
                className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-3 rounded-xl bg-slate-900 border border-neon-primary/40 text-gray-200 text-xs font-bold shadow-lg hover:border-neon-primary hover:bg-neon-primary/15 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <FiGithub className="text-sm shrink-0" aria-hidden="true" />
                <span>Frontend</span>
              </a>
            )}
            {project.gitBackend && (
              <a
                href={project.gitBackend}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Backend source code for ${project.title}`}
                className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-3 rounded-xl bg-slate-900 border border-cyan-400/40 text-gray-200 text-xs font-bold shadow-lg hover:border-cyan-400 hover:bg-cyan-400/15 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <FiGithub className="text-sm shrink-0" aria-hidden="true" />
                <span>Backend</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;

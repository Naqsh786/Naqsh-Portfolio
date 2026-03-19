import { FiExternalLink, FiGithub } from "react-icons/fi";

const ProjectCard = ({ project }) => {
  return (
    <div className="group glow-border rounded-xl bg-dark-card overflow-hidden animate-fade-in opacity-0 hover:translate-y-[-6px] transition-all duration-500">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-dark-surface to-dark-bg flex items-center justify-center">
            <span className="text-5xl font-bold text-neon-green/20 font-mono">
              {"</>"}
            </span>
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-green transition-colors duration-300 break-all">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 break-all">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-neon-green transition-colors duration-300"
            >
              <FiExternalLink className="text-base" />
              Live Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-neon-green transition-colors duration-300"
            >
              <FiGithub className="text-base" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaCode, FaLock } from "react-icons/fa";
import { FiChevronRight, FiDownload } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname !== "/") {
        setActiveSection(location.pathname === "/admin" ? "admin" : "");
        return;
      }

      const scrollPos = window.scrollY + 220;
      const skillsEl = document.getElementById("skills");
      const projectsEl = document.getElementById("projects");
      const servicesEl = document.getElementById("services");
      const contactEl = document.getElementById("contact");

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveSection("contact");
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveSection("services");
      } else if (projectsEl && scrollPos >= projectsEl.offsetTop) {
        setActiveSection("projects");
      } else if (skillsEl && scrollPos >= skillsEl.offsetTop) {
        setActiveSection("skills");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const navLinks = [
    { id: "home", name: "Home", path: "/" },
    { id: "skills", name: "Skills", path: "/#skills" },
    { id: "projects", name: "Projects", path: "/#projects" },
    { id: "services", name: "Services", path: "/#services" },
    { id: "contact", name: "Contact", path: "/#contact" },
  ];

  const handleNavClick = (link) => {
    setIsOpen(false);
    if (link.path === "/") {
      if (location.pathname !== "/") {
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setActiveSection("home");
      return;
    }

    if (link.path.startsWith("/#")) {
      const id = link.path.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      setActiveSection(link.id);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pt-3 px-3 sm:pt-4 sm:px-6 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-500 border ${
          scrolled
            ? "glass border-surface/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2.5 px-4 sm:px-6 bg-[#00020B]/95 backdrop-blur-xl"
            : "bg-[#00020B]/85 backdrop-blur-xl border-surface/25 py-3.5 px-4 sm:px-6 shadow-lg"
        } flex items-center justify-between`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-neon-primary/15 border border-neon-primary/40 flex items-center justify-center group-hover:bg-neon-primary group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.15)]">
            <FaCode className="text-neon-primary group-hover:text-white text-base transition-colors" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-text-primary font-sans">
            Naqsh<span className="text-neon-primary">.</span>
          </span>
        </Link>

        {/* Desktop Links - Active Pill & Hover Indicator */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#00020B]/90 p-1.5 rounded-full border border-surface/25 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`px-5 py-2 rounded-full text-xs font-mono font-medium uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-neon-primary text-white shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.5)] border border-neon-primary/50 font-bold scale-[1.02]"
                    : "text-muted hover:text-text-primary hover:bg-neon-primary/10 hover:border hover:border-neon-primary/25"
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>

        {/* Action Controls (Admin + Resume + Hire Me) */}
        <div className="hidden md:flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <a
              href="/Naqsh%20Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-surface/40 text-sm font-semibold text-muted hover:text-neon-primary hover:border-neon-primary/50 hover:shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.2)] transition-all"
            >
              View Resume
            </a>
            <a
              href="/Naqsh%20Resume.pdf"
              download="Naqsh_Resume.pdf"
              className="p-2.5 rounded-full border border-surface/40 text-muted hover:text-neon-primary hover:border-neon-primary/50 hover:shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.2)] transition-all"
              title="Download Resume"
              aria-label="Download Resume"
            >
              <FiDownload className="text-sm" aria-hidden="true" />
            </a>
          </div>

          <Link
            to="/admin"
            className={`p-2 rounded-xl bg-[#00020B]/90 border transition-all ${
              location.pathname === "/admin"
                ? "border-neon-primary text-neon-primary shadow-[0_0_12px_rgba(var(--color-accent-rgb),0.3)]"
                : "border-surface/40 text-muted hover:text-neon-primary hover:border-neon-primary/40"
            }`}
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
          >
            <FaLock className="text-xs" aria-hidden="true" />
          </Link>

          <button
            onClick={() => handleNavClick({ id: "contact", path: "/#contact" })}
            className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-neon-primary to-deep-indigo text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.25)] hover:scale-105"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Toggle & Quick Actions */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            to="/admin"
            className={`p-2 rounded-xl bg-[#00020B]/90 border transition-all ${
              location.pathname === "/admin"
                ? "border-neon-primary text-neon-primary shadow-[0_0_12px_rgba(var(--color-accent-rgb),0.3)]"
                : "border-surface/40 text-muted hover:text-neon-primary hover:border-neon-primary/40"
            }`}
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
          >
            <FaLock className="text-xs" aria-hidden="true" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-neon-primary p-2 focus:outline-none"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <HiX aria-hidden="true" /> : <HiMenuAlt3 aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[35rem] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto glass rounded-2xl border border-neon-primary/25 p-4 shadow-2xl flex flex-col gap-2 bg-[#00020B]/95 backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-widest transition-all ${
                  isActive
                    ? "bg-neon-primary/15 text-white border border-neon-primary/35 font-bold"
                    : "text-muted hover:bg-neon-primary/8 hover:text-text-primary"
                }`}
              >
                <span>{link.name}</span>
                <FiChevronRight className="text-neon-primary" />
              </button>
            );
          })}

          {/* Mobile Resume Buttons */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-surface/30">
            <a
              href="/Naqsh%20Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-surface/40 text-muted text-sm font-bold uppercase tracking-widest hover:border-neon-primary/40 hover:text-neon-primary transition-all"
            >
              View Resume
            </a>
            <a
              href="/Naqsh%20Resume.pdf"
              download="Naqsh_Resume.pdf"
              className="flex items-center justify-center p-3.5 rounded-xl border border-surface/40 text-muted hover:text-neon-primary hover:border-neon-primary/50 transition-all"
              title="Download Resume"
              aria-label="Download Resume"
            >
              <FiDownload className="text-base" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile Hire Me Button */}
          <button
            onClick={() => handleNavClick({ id: "contact", path: "/#contact" })}
            className="w-full py-3 mt-1 rounded-xl bg-gradient-to-r from-neon-primary to-deep-indigo text-white text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-all shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.25)] active:scale-95"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

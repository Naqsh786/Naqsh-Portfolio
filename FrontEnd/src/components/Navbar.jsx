import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaCode, FaLock } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const Navbar = ({ theme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

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
      const contactEl = document.getElementById("contact");

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveSection("contact");
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
    { id: "contact", name: "Contact", path: "/#contact" },
  ];

  const handleNavClick = (link) => {
    setIsOpen(false);
    if (link.path === "/") {
      if (location.pathname !== "/") {
        window.location.href = "/";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setActiveSection("home");
      return;
    }

    if (link.path.startsWith("/#")) {
      const id = link.path.replace("/#", "");
      if (location.pathname !== "/") {
        window.location.href = link.path;
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
            ? "glass border-neon-primary/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2.5 px-4 sm:px-6 bg-slate-950/90 backdrop-blur-xl"
            : "bg-slate-950/75 backdrop-blur-lg border-white/10 py-3.5 px-4 sm:px-6"
        } flex items-center justify-between`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-neon-primary/15 border border-neon-primary/40 flex items-center justify-center group-hover:bg-neon-primary group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(var(--color-neon-primary),0.2)]">
            <FaCode className="text-neon-primary group-hover:text-white text-base transition-colors" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-sans">
            Naqsh<span className="text-neon-secondary">.</span>
          </span>
        </Link>

        {/* Desktop Links - Active Pill & Hover Indicator */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-950/90 p-1.5 rounded-full border border-white/10 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`px-5 py-2 rounded-full text-xs font-mono font-medium uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-neon-primary text-white shadow-[0_0_15px_rgba(var(--color-neon-primary),0.6)] border border-neon-primary/50 font-bold scale-[1.02]"
                    : "text-gray-400 hover:text-white hover:bg-neon-primary/15 hover:border hover:border-neon-primary/30"
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>

        {/* Action Controls (Theme Switcher + Admin + Hire Me) */}
        <div className="hidden md:flex items-center gap-3 sm:gap-4">
          {/* Dynamic Theme Dots */}
          <div className="flex items-center gap-2 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
            <button 
              onClick={() => onThemeChange("cyberpunk")} 
              className={`w-3.5 h-3.5 rounded-full bg-purple-500 border border-purple-400 transition-all duration-300 ${theme === 'cyberpunk' ? 'ring-2 ring-white scale-110 shadow-[0_0_10px_#8b5cf6]' : 'opacity-50 hover:opacity-100'}`}
              title="Cyberpunk Theme"
            />
            <button 
              onClick={() => onThemeChange("matrix")} 
              className={`w-3.5 h-3.5 rounded-full bg-emerald-500 border border-emerald-400 transition-all duration-300 ${theme === 'matrix' ? 'ring-2 ring-white scale-110 shadow-[0_0_10px_#10b981]' : 'opacity-50 hover:opacity-100'}`}
              title="Matrix Theme"
            />
            <button 
              onClick={() => onThemeChange("sunset")} 
              className={`w-3.5 h-3.5 rounded-full bg-orange-500 border border-orange-400 transition-all duration-300 ${theme === 'sunset' ? 'ring-2 ring-white scale-110 shadow-[0_0_10px_#f97316]' : 'opacity-50 hover:opacity-100'}`}
              title="Sunset Theme"
            />
          </div>

          <Link
            to="/admin"
            className={`p-2 rounded-xl bg-slate-950/90 border transition-all ${
              location.pathname === "/admin"
                ? "border-neon-primary text-neon-primary shadow-[0_0_12px_rgba(var(--color-neon-primary),0.4)]"
                : "border-white/10 text-gray-400 hover:text-neon-primary hover:border-neon-primary/40"
            }`}
            title="Admin Dashboard"
          >
            <FaLock className="text-xs" />
          </Link>

          <button
            onClick={() => handleNavClick({ id: "contact", path: "/#contact" })}
            className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-neon-primary to-neon-secondary text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_20px_rgba(var(--color-neon-primary),0.35)] hover:scale-105"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-neon-primary p-2 focus:outline-none"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[30rem] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto glass rounded-2xl border border-neon-primary/30 p-4 shadow-2xl flex flex-col gap-2 bg-slate-950/95 backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-widest transition-all ${
                  isActive
                    ? "bg-neon-primary/20 text-white border border-neon-primary/40 font-bold"
                    : "text-gray-300 hover:bg-neon-primary/10 hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                <FiChevronRight className="text-neon-primary" />
              </button>
            );
          })}

          {/* Mobile Theme Selector */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-neon-primary/20 mt-2 pt-4">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Theme</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onThemeChange("cyberpunk")} 
                className={`px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase transition-all ${theme === 'cyberpunk' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50' : 'text-gray-400 border border-transparent'}`}
              >
                Cyber
              </button>
              <button 
                onClick={() => onThemeChange("matrix")} 
                className={`px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase transition-all ${theme === 'matrix' ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50' : 'text-gray-400 border border-transparent'}`}
              >
                Matrix
              </button>
              <button 
                onClick={() => onThemeChange("sunset")} 
                className={`px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase transition-all ${theme === 'sunset' ? 'bg-orange-600/30 text-orange-300 border border-orange-500/50' : 'text-gray-400 border border-transparent'}`}
              >
                Sunset
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

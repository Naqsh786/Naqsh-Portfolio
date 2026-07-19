import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaCode } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/#skills" },
    { name: "Projects", path: "/#projects" },
    { name: "Contact", path: "/#contact" },
  ];

  const handleNavClick = (path) => {
    setIsOpen(false);
    if (path === "/") {
      if (location.pathname !== "/") {
        window.location.href = "/";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (path.startsWith("/#")) {
      const id = path.replace("/#", "");
      if (location.pathname !== "/") {
        window.location.href = path;
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
        scrolled
          ? "glass border-neon-primary/30 shadow-2xl py-3"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-lg bg-neon-primary/10 border border-neon-primary/30 flex items-center justify-center group-hover:bg-neon-primary/20 group-hover:border-neon-primary transition-all duration-300">
            <FaCode className="text-neon-primary text-lg" />
          </div>
          <span className="text-xl font-bold text-white group-hover:text-neon-primary transition-colors duration-300">
            Naqsh<span className="text-neon-primary">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-neon-primary ${
                location.pathname === link.path || location.hash === link.path.replace('/', '')
                  ? "text-neon-primary"
                  : "text-gray-400"
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-neon-primary transition-all duration-300 ${location.pathname === link.path || location.hash === link.path.replace('/', '') ? "w-full" : "w-0 group-hover:w-full hover:w-full"}`} />
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-neon-primary z-50"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-6 my-4 glass rounded-2xl border border-neon-primary/10 shadow-2xl overflow-hidden animate-slide-up">
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map((link, i) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl hover:bg-neon-primary/5 transition-all duration-300 group ${location.pathname === link.path || location.hash === link.path.replace('/', '') ? "text-neon-primary bg-neon-primary/5" : "text-gray-400 hover:text-neon-primary"}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="text-sm font-bold uppercase tracking-widest">{link.name}</span>
                <FiChevronRight className={`transition-opacity ${location.pathname === link.path || location.hash === link.path.replace('/', '') ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

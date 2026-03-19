import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaCode } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdminPath = location.pathname.startsWith("/admin-naqsh");
  const isLoginPage = location.pathname === "/login";

  const navLinks = isAdminPath
    ? [
        { name: "Dashboard", path: "/admin-naqsh" },
        { name: "Profile", path: "/admin-naqsh/profile" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/#projects" },
        { name: "Contact", path: "/#contact" },
      ];

  const handleLogout = () => {
    localStorage.removeItem("naqsh-admin-token");
    setIsOpen(false);
    navigate("/login");
  };

  const handleNavClick = (path) => {
    setIsOpen(false);
    if (isAdminPath) {
      navigate(path);
      return;
    }
    if (path === "/") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (path.startsWith("/#")) {
      const id = path.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg shadow-black/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center group-hover:bg-neon-green/20 group-hover:border-neon-green transition-all duration-300">
            <FaCode className="text-neon-green text-lg" />
          </div>
          <span className="text-xl font-bold text-white group-hover:text-neon-green transition-colors duration-300">
            Naqsh<span className="text-neon-green">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        {!isLoginPage && (
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-neon-green ${
                  location.pathname === link.path
                    ? "text-neon-green"
                    : "text-gray-400"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-neon-green transition-all duration-300 ${location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full hover:w-full"}`} />
              </button>
            ))}
            
            {isAdminPath ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/admin-naqsh"
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-neon-green/30 text-neon-green hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
              >
                Admin
              </Link>
            )}
          </div>
        )}

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-neon-green"
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
        <div className="mx-6 my-4 glass rounded-2xl border border-neon-green/10 shadow-2xl overflow-hidden animate-slide-up">
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map((link, i) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl hover:bg-neon-green/5 transition-all duration-300 group ${location.pathname === link.path ? "text-neon-green bg-neon-green/5" : "text-gray-400 hover:text-neon-green"}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="text-sm font-bold uppercase tracking-widest">{link.name}</span>
                <FiChevronRight className={`transition-opacity ${location.pathname === link.path ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
              </button>
            ))}
            <div className="h-px bg-gray-800/50 my-2" />
            {isAdminPath ? (
              <>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <span>Logout</span>
                </button>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-gray-800 text-gray-400 font-bold text-sm uppercase tracking-widest hover:text-white transition-all duration-300 mt-2"
                >
                  <span>Back to Site</span>
                </Link>
              </>
            ) : (
              <Link
                to="/admin-naqsh"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-neon-green/10 border border-neon-green/20 text-neon-green font-bold text-sm uppercase tracking-widest hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
              >
                <span>Admin Dashboard</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

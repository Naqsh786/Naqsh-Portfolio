import React, { useState, useEffect } from "react";
import { 
  FaLock, 
  FaEnvelope, 
  FaTrash, 
  FaCheckCircle, 
  FaEnvelopeOpen, 
  FaSignOutAlt, 
  FaSearch, 
  FaSync, 
  FaFilter,
  FaShieldAlt,
  FaUser,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

export default function AdminDashboard({ theme }) {
  const [token, setToken] = useState(() => localStorage.getItem("portfolio_admin_token") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token));
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ total: 0, unread: 0 });
  const [loadingData, setLoadingData] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState("");

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  // Check login on token change
  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setLoginError("Please enter your admin password.");
      return;
    }

    setLoadingLogin(true);
    setLoginError("");

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("portfolio_admin_token", data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        setPassword("");
        showToast("Logged in successfully!");
      } else {
        setLoginError(data.message || "Invalid password");
      }
    } catch (err) {
      setLoginError("Could not connect to backend server. Make sure node server is running on port 5000.");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("portfolio_admin_token");
    setToken("");
    setIsAuthenticated(false);
    setMessages([]);
    showToast("Logged out successfully.");
  };

  const fetchData = async (authToken = token) => {
    setLoadingData(true);
    try {
      const res = await fetch(`${API_BASE}/admin/messages`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
        const unreadCount = data.data.filter((m) => !m.read).length;
        setStats({ total: data.data.length, unread: unreadCount });
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const toggleReadStatus = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/admin/messages/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, read: !m.read } : m))
        );
        const newUnread = messages.filter((m) => (m._id === id ? m.read : !m.read)).length;
        setStats((prev) => ({ ...prev, unread: newUnread }));
        showToast("Status updated");
      }
    } catch (err) {
      showToast("Failed to update status");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        setStats((prev) => ({
          total: prev.total - 1,
          unread: messages.find((m) => m._id === id && !m.read) ? prev.unread - 1 : prev.unread
        }));
        showToast("Message deleted");
      }
    } catch (err) {
      showToast("Failed to delete message");
    }
  };

  // Filtering
  const filteredMessages = messages.filter((msg) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !msg.read) ||
      (filter === "read" && msg.read);

    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // ── 1. LOGIN SCREEN ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md glass rounded-3xl p-6 sm:p-8 border border-neon-primary/30 shadow-[0_0_50px_rgba(var(--color-neon-primary),0.2)]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-neon-primary/10 border border-neon-primary/40 mx-auto flex items-center justify-center text-neon-primary text-3xl mb-4 shadow-[0_0_20px_rgba(var(--color-neon-primary),0.3)]">
              <FaShieldAlt />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Please enter your secure administrator password to unlock the dashboard.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 text-xs sm:text-sm font-mono text-center break-words">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6" autoComplete="off">
            <div>
              <label className="block text-xs font-mono text-gray-300 mb-2 uppercase tracking-wider">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  autoComplete="new-password"
                  className="w-full bg-slate-950/80 border border-gray-700/80 rounded-xl px-4 py-3.5 pl-11 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary font-mono text-sm transition-all"
                />
                <FaLock className="absolute left-4 top-4 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition-colors p-1"
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loadingLogin}
              className="w-full py-3.5 sm:py-4 rounded-xl bg-neon-primary text-white font-bold tracking-wide shadow-[0_0_20px_rgba(var(--color-neon-primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--color-neon-primary),0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 font-mono text-sm"
            >
              {loadingLogin ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── 2. DASHBOARD VIEW ──
  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 max-w-[90vw] px-4 py-2.5 rounded-xl bg-neon-primary text-white font-mono text-xs font-bold shadow-[0_0_25px_rgba(var(--color-neon-primary),0.6)] animate-bounce text-center">
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 glass p-5 sm:p-6 rounded-3xl border border-neon-primary/20">
        <div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-white">
              Admin Dashboard
            </h1>
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-mono font-bold rounded-full bg-neon-primary/20 text-neon-primary border border-neon-primary/40">
              Authenticated
            </span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Manage incoming contact inquiries from your portfolio.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={() => fetchData()}
            disabled={loadingData}
            className="p-2.5 sm:p-3 rounded-xl bg-slate-900 border border-gray-700 text-gray-300 hover:text-white hover:border-neon-primary/60 transition-all"
            title="Refresh Messages"
          >
            <FaSync className={loadingData ? "animate-spin text-neon-primary" : ""} />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 hover:bg-red-500 hover:text-white font-mono text-xs font-bold transition-all duration-300"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* Bento Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="glass p-5 sm:p-6 rounded-2xl border border-neon-primary/20 flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-neon-primary/10 border border-neon-primary/30 flex items-center justify-center text-neon-primary text-xl sm:text-2xl shrink-0">
            <FaEnvelope />
          </div>
          <div>
            <div className="text-gray-400 text-[11px] sm:text-xs font-mono uppercase tracking-wider">Total Messages</div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stats.total}</div>
          </div>
        </div>

        <div className="glass p-5 sm:p-6 rounded-2xl border border-amber-500/20 flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl sm:text-2xl shrink-0">
            <FaEnvelopeOpen />
          </div>
          <div>
            <div className="text-gray-400 text-[11px] sm:text-xs font-mono uppercase tracking-wider">Unread Messages</div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono">{stats.unread}</div>
          </div>
        </div>

        <div className="glass p-5 sm:p-6 rounded-2xl border border-emerald-500/20 flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl sm:text-2xl shrink-0">
            <FaCheckCircle />
          </div>
          <div>
            <div className="text-gray-400 text-[11px] sm:text-xs font-mono uppercase tracking-wider">Read Messages</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">{stats.total - stats.unread}</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="relative w-full md:w-80 lg:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or content..."
            className="w-full bg-slate-950/80 border border-gray-800 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neon-primary transition-colors"
          />
          <FaSearch className="absolute left-3.5 top-3 text-gray-500 text-xs" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 shrink-0">
          <span className="text-xs font-mono text-gray-500 flex items-center gap-1 mr-1 shrink-0">
            <FaFilter className="text-[10px]" /> Filter:
          </span>
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shrink-0 ${
              filter === "all"
                ? "bg-neon-primary text-white shadow-[0_0_12px_rgba(var(--color-neon-primary),0.5)]"
                : "bg-slate-900 border border-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shrink-0 ${
              filter === "unread"
                ? "bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                : "bg-slate-900 border border-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            Unread ({stats.unread})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shrink-0 ${
              filter === "read"
                ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                : "bg-slate-900 border border-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            Read ({stats.total - stats.unread})
          </button>
        </div>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <div className="glass p-8 sm:p-12 rounded-3xl text-center border border-gray-800/80">
          <FaEnvelopeOpen className="text-4xl text-gray-600 mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-mono font-bold text-gray-300">No Messages Found</h3>
          <p className="text-gray-500 text-xs mt-1">
            {searchTerm ? "Try adjusting your search criteria." : "No contact submissions have been received yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className={`glass p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                !msg.read
                  ? "border-neon-primary/50 shadow-[0_0_20px_rgba(var(--color-neon-primary),0.1)] bg-slate-900/80"
                  : "border-gray-800/60 opacity-90"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-bold text-white font-mono text-sm sm:text-base flex items-center gap-2 break-all">
                      <FaUser className="text-neon-primary text-xs shrink-0" />
                      {msg.name}
                    </span>
                    {!msg.read ? (
                      <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                        NEW UNREAD
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono rounded-full bg-gray-800 text-gray-400">
                        Read
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 text-[11px] sm:text-xs text-gray-400 font-mono">
                    <a
                      href={`mailto:${msg.email}`}
                      className="hover:text-neon-primary transition-colors underline decoration-neon-primary/30 break-all"
                    >
                      {msg.email}
                    </a>
                    <span className="hidden sm:inline text-gray-600">•</span>
                    <span className="text-gray-500 text-[10px] sm:text-xs">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => toggleReadStatus(msg._id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
                      msg.read
                        ? "bg-slate-900 border-gray-700 text-gray-400 hover:text-white"
                        : "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black"
                    }`}
                  >
                    {msg.read ? "Mark Unread" : "Mark Read"}
                  </button>

                  <button
                    onClick={() => deleteMessage(msg._id)}
                    className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                    title="Delete Message"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Subject */}
              <div className="text-xs font-mono text-neon-primary mb-2 font-bold break-all">
                Subject: {msg.subject}
              </div>

              {/* Body */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-black/60 border border-gray-800/80 text-gray-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans break-words overflow-x-auto">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

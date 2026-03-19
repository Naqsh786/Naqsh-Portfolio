import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/apiSlice";
import { FiLock, FiChevronRight, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { FaTerminal } from "react-icons/fa";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading: loading, error: loginError, isSuccess }] = useLoginMutation();

  // Redirect if success
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin-naqsh");
    }
  }, [isSuccess, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ password }).unwrap();
      if (result.success && result.token) {
        localStorage.setItem("naqsh-admin-token", result.token);
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const errorMessage = loginError?.data?.message || "Invalid password. Access denied.";

  return (
    <div className="min-h-screen bg-dark-bg bg-grid flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full animate-fade-in">
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-neon-green/10 border border-neon-green/20 mb-4 sm:mb-6 group hover:border-neon-green/50 transition-all duration-300">
            <FiLock className="text-2xl sm:text-3xl text-neon-green group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Admin <span className="gradient-text">Gateway</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-500 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]">
            <FaTerminal className="text-neon-green/60" />
            <span>Authorization Required</span>
          </div>
        </div>

        <div className="glass p-6 sm:p-8 rounded-2xl border border-neon-green/10 shadow-2xl relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/5 blur-3xl rounded-full -mr-16 -mt-16" />
          
          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6 relative z-10" autoComplete="off">
            <div>
              <label className="block text-gray-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-2.5 sm:mb-3">
                Secure Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  required
                  autoComplete="new-password"
                  className="w-full bg-dark-bg/60 border border-gray-800 rounded-xl py-3.5 sm:py-4 px-4 sm:px-5 pr-12 text-sm sm:text-base text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/50 focus:shadow-[0_0_20px_rgba(57,255,20,0.05)] transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-neon-green transition-colors duration-200 focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff className="text-base sm:text-lg" /> : <FiEye className="text-base sm:text-lg" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs sm:text-sm animate-shake">
                <FiAlertCircle className="flex-shrink-0" />
                <p className="truncate">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group bg-neon-green text-dark-bg font-bold py-3.5 sm:py-4 rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 text-sm sm:text-base"
            >
              {loading ? "Verifying..." : "Authorize Access"}
              {!loading && <FiChevronRight className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-[10px] sm:text-xs mt-6 sm:mt-8 font-mono">
          Return to <a href="/" className="text-neon-green/60 hover:text-neon-green transition-colors underline underline-offset-4">Portfolio Home</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

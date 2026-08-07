import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import GlowCursor from "./components/GlowCursor";

// Lazy load heavy 3D engine and page routes
const Hero3D = lazy(() => import("./components/Hero3D"));
const Home = lazy(() => import("./pages/Home"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "cyberpunk";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  return (
    <Router>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          {/* Fixed layers must stay OUTSIDE any filtered/animated ancestor,
              otherwise filter creates a containing block and they scroll with the page */}
          <GlowCursor />
          <Suspense fallback={null}>
            <Hero3D theme={theme} />
          </Suspense>
          <Navbar theme={theme} onThemeChange={toggleTheme} />
          <div className="min-h-screen bg-transparent animate-fade-in relative">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Suspense fallback={<div className="min-h-screen bg-[#050814]" />}>
                    <Home theme={theme} />
                  </Suspense>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <Suspense fallback={<div className="min-h-screen bg-[#050814]" />}>
                    <AdminDashboard theme={theme} />
                  </Suspense>
                } 
              />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;

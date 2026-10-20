import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WeightSweepPreloader from "@/components/ui/weight-sweep-preloader";
import CursorDotTrail from "./components/CursorDotTrail";

// Lazy load page routes
const Home = lazy(() => import("./pages/Home"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  const [loading, setLoading] = useState(true);

  // Support replay intro from footer or navigation
  React.useEffect(() => {
    const handleReplay = () => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setLoading(true);
    };
    window.addEventListener("replay-intro", handleReplay);
    return () => window.removeEventListener("replay-intro", handleReplay);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#00020B] text-text-primary relative selection:bg-neon-primary selection:text-white">
        {loading && (
          <div className="fixed inset-0 z-[9999]">
            <WeightSweepPreloader 
              durationMs={2200}
              onComplete={() => setLoading(false)} 
            />
          </div>
        )}
        <CursorDotTrail />
        <Navbar />
        <div className="min-h-screen bg-transparent relative">
          <Routes>
            <Route 
              path="/" 
              element={
                <Suspense fallback={<div className="min-h-screen bg-[#00020B]" />}>
                  <Home />
                </Suspense>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <Suspense fallback={<div className="min-h-screen bg-[#00020B]" />}>
                  <AdminDashboard />
                </Suspense>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";

// Lazy load the Home component
const Home = lazy(() => import("./pages/Home"));

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <div className="min-h-screen bg-transparent animate-fade-in">
          <Navbar />
          <Routes>
            <Route 
              path="/" 
              element={
                <Suspense fallback={<div className="min-h-screen bg-[#050814]" />}>
                  <Home />
                </Suspense>
              } 
            />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;

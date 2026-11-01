import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/globals.css";
import ThemeProvider from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CanvasBoundary from "./components/CanvasBoundary";
import Home from "./pages/Home";

const StarField = lazy(() => import("./components/StarField"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const AiWorkflow = lazy(() => import("./pages/AiWorkflow"));
const Architecture = lazy(() => import("./pages/Architecture"));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <CanvasBoundary>
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
        </CanvasBoundary>
        <Navbar />
        <main className="app-main">
          <Suspense fallback={<div className="section container muted">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/ai-workflow" element={<AiWorkflow />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
      </Router>
    </ThemeProvider>
  );
}

export default App;

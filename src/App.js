import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Inspire from "./components/Inspire";
import Contact from "./components/Contact";
import LearnToCode from "./components/LearnToCode";
import AdminDashboard from "./components/AdminDashboard";

import "./styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ThemeProvider from "./contexts/ThemeContext";
import Login from "./pages/Login";

function App() {
  return (
    <ThemeProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/inspire" element={<Inspire />} />
        <Route path="/learn" element={<LearnToCode />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;

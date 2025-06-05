import React, { useContext } from "react";
import SectionWrapper from "./SectionWrapper";
import {
  FaReact,
  FaAngular,
  FaVuejs,
  FaNodeJs,
  FaDatabase,
  FaCode,
  FaLaptopCode,
  FaCogs,
  FaMicrosoft,
  FaQuoteLeft,
} from "react-icons/fa";
import { ThemeContext } from "../contexts/ThemeContext";

const About = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const cardStyle = {
    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    backdropFilter: "blur(8px)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
  };

  const labelColor = isDark ? "#ccc" : "#333";

  return (
    <SectionWrapper>
      <div className="container py-5">
        <h2 className="text-center mb-4 display-5 fw-bold">Who I Am</h2>

        <div className="row align-items-start mt-4 g-5">
          {/* Left: Story Block */}
          <div className="col-lg-6">
            <div className="p-4 rounded-4" style={cardStyle}>
              <h4 className="fw-bold text-info mb-3">
                💡 Passion-Driven Developer
              </h4>
              <p className="fs-5">
                I’m <strong>Hani Ayach</strong>, a full-stack software engineer
                who believes in turning ideas into tangible, working solutions.
              </p>
              <p className="fs-5">
                For me, <em>programming is a passion</em> — the art of creating
                something from nothing to solve a real-world problem. I find
                excitement every time I crack a tough bug or bring a new feature
                to life.
              </p>

              <div className="text-info mt-4 mb-2">
                <FaQuoteLeft className="me-2" />
                <em>“I can transfer ideas into real solutions.”</em>
              </div>

              <p className="fs-5 mb-2">
                I thrive in both solo and collaborative environments — but
                working in a team brings an extra spark of energy.
              </p>
              <p className="fs-5 text-warning mb-0">
                🚀 Always learning. Always building. Always improving.
              </p>
            </div>
          </div>

          {/* Right: Tech Stack */}
          <div className="col-lg-6 text-center">
            <h4 className="text-info fw-semibold mb-4">⚙ My Toolbox</h4>
            <div className="d-flex flex-wrap justify-content-center gap-4">
              <SkillItem icon={<FaMicrosoft color="#0078D4" />} label=".NET Stack" color={labelColor} />
              <SkillItem icon={<FaReact color="#61DBFB" />} label="React" color={labelColor} />
              <SkillItem icon={<FaAngular color="#dd1b16" />} label="Angular" color={labelColor} />
              <SkillItem icon={<FaVuejs color="#42b883" />} label="Vue.js" color={labelColor} />
              <SkillItem icon={<FaNodeJs color="#3C873A" />} label="Node.js" color={labelColor} />
              <SkillItem icon={<FaDatabase color="#f9c74f" />} label="Databases" color={labelColor} />
              <SkillItem icon={<FaCogs color="#adb5bd" />} label="Design Patterns" color={labelColor} />
              <SkillItem icon={<FaCode color="#6c757d" />} label="REST APIs" color={labelColor} />
              <SkillItem icon={<FaLaptopCode color="#17a2b8" />} label="Full-Stack" color={labelColor} />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

// 🧩 Skill block
const SkillItem = ({ icon, label, color }) => (
  <div className="text-center" style={{ width: "100px" }}>
    <div className="fs-1 mb-2">{icon}</div>
    <div style={{ fontSize: "0.9rem", color }}>{label}</div>
  </div>
);

export default About;

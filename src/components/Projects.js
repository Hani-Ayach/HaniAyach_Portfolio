import React, { useContext, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import SectionWrapper from "./SectionWrapper";
import { ThemeContext } from "../contexts/ThemeContext";
import styles from "../styles/Projects.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const ProjectCard = ({
  title,
  description,
  github_url,
  website_url,
  image_base64,
}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`card h-100 border shadow ${
        isDark
          ? "bg-dark text-light border-secondary"
          : "bg-white text-dark border-light"
      }`}
    >
      {image_base64 ? (
        <img
          src={image_base64}
          className="card-img-top"
          alt={title}
          style={{ objectFit: "fit", height: "200px" }}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            height: "200px",
            backgroundColor: isDark ? "#333" : "#e9ecef",
            color: isDark ? "#ccc" : "#555",
            fontFamily: "monospace",
            fontSize: "1.2rem",
          }}
        >
          No Image Available
        </div>
      )}
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
        <div className="d-flex flex-wrap gap-2 mt-3">
          {website_url && (
            <a
              href={website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success flex-fill"
            >
              View Live
            </a>
          )}
          {github_url && (
            <a
              href={github_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn flex-fill ${
                isDark ? "btn-outline-light" : "btn-outline-dark"
              }`}
            >
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const projects = [
  {
    title: "Portfolio Website",
    description: "My personal portfolio with 3D hero and interactive UI.",
    github: "https://github.com/hanicode/portfolio",
    website: "https://haniayach.dev",
    image: null,
  },
  {
    title: "AI Chat App",
    description: "A full-stack AI chat app using OpenAI.",
    github: "https://github.com/hanicode/ai-chat",
    website: null,
    image: null,
  },
  {
    title: "Weather Dashboard",
    description: "A weather app using React and OpenWeather API.",
    github: "https://github.com/hanicode/weather-app",
    website: "https://weather.haniayach.dev",
    image: null,
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("Projects").select("*");

      console.log(data);
      console.log("data");
      console.log(error);
      console.log("error");

      if (data) setProjects(data);
    };
    fetchProjects();
  }, []);

  const { theme } = useContext(ThemeContext);

  return (
    <div className="position-relative">
      {/* 3D Background */}
      <Canvas
        className={styles.canvasBackground}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background: theme === "dark" ? "#000000" : "#f8f9fa",
          pointerEvents: "none",
        }}
      >
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={5000} factor={4} fade />
        </Suspense>
      </Canvas>

      {/* Main Content */}
      <SectionWrapper>
  <div className="position-relative" style={{ zIndex: 1 }}>
    <h2 className="my-5 text-center display-5 fw-bold">
      Projects {projects.length === 0 && "[Coming Soon 😉]"}
    </h2>

    <div className="row g-4">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <ProjectCard {...project} />
          </div>
        ))
      ) : (
        [...Array(3)].map((_, i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <div className="card placeholder-glow">
              <div
                className="card-img-top placeholder"
                style={{ height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title placeholder col-6"></h5>
                <p className="card-text placeholder col-8"></p>
                <button className="btn btn-secondary disabled placeholder col-4"></button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</SectionWrapper>

    </div>
  );
};

export default Projects;

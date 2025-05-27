import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import styles from "../styles/Projects.module.css";

const ProjectCard = ({ title, description, github, website, image }) => {
  return (
    <div className="card h-100 bg-dark text-light border border-secondary shadow">
      {image ? (
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{ objectFit: "cover", height: "200px" }}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            height: "200px",
            backgroundColor: "#333",
            color: "#ccc",
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
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success flex-fill"
            >
              View Live
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light flex-fill"
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
    website: null, // no live site
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
  return (
    <section className={styles.projectsSection}>
      <Canvas className={styles.canvasBackground}>
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={5000} factor={4} fade />
        </Suspense>
      </Canvas>

      <div className="container position-relative text-white py-5">
        <h2 className="mb-5 text-center">Projects</h2>
        <div className="row g-4">
          {projects.map((project, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import React, { useRef, useState, Suspense, useContext, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stars, Html } from "@react-three/drei";
import Typical from "react-typical";
import styles from "../styles/Hero.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext } from "../contexts/ThemeContext";
import { supabase } from "../supabase";
import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaEnvelope,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaGlobe
} from "react-icons/fa6";

// Icon map for dynamic rendering
const iconMap = {
  linkedin: <FaLinkedin />,
  github: <FaGithub />,
  x: <FaXTwitter />,
  twitter: <FaXTwitter />,
  email: <FaEnvelope />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  facebook: <FaFacebook />,
  website: <FaGlobe />
};

// 3D Laptop Model
const LaptopModel = () => {
  const { scene } = useGLTF("/models/Laptop.glb");
  return (
    <primitive
      object={scene}
      scale={1.4}
      position={[-0.1, -1, 0]}
      rotation={[0, Math.PI / -1.75, 0]}
    />
  );
};

// Hero Section
const Hero = () => {
  const [open, setOpen] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [socialLinks, setSocialLinks] = useState([]);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {
    const fetchSocialLinks = async () => {
      const { data, error } = await supabase.from("SocialLinks").select("*");
      if (!error && data) setSocialLinks(data);
    };
    fetchSocialLinks();
  }, []);

  return (
    <div className={styles.heroWrapper}>
      {/* Overlay Text */}
      <div
        className={styles.overlay}
        style={{
          color: isDark ? "#ffffff" : "#212529",
          textShadow: isDark ? "1px 1px 3px rgba(0,0,0,0.6)" : "none"
        }}
      >
        <h1>Hi, I'm Hani Ayach</h1>
        <h2>Full Stack Software Engineer • Aspiring AI Developer</h2>

        {/* 🔗 Social Icons (Dynamic from Supabase) */}
        <div className="d-flex justify-content-center gap-4 fs-4 my-3">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={link.platform}
              className={`text-decoration-none ${isDark ? "text-light" : "text-dark"}`}
            >
              {iconMap[link.icon_name?.toLowerCase()] || <FaEnvelope />}
            </a>
          ))}
        </div>

        <button
          className={styles.button}
          onClick={() => {
            setOpen(true);
            setRunKey((prev) => prev + 1);
          }}
        >
          Run
        </button>
      </div>

      {/* 3D Background */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: isDark ? "#000000" : "#f8f9fa" }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 2, 1]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

        <Suspense fallback={null}>
          <LaptopModel />

          {open && (
            <Html
              position={[0.17, -0.3, -0.95]}
              rotation={[0, Math.PI / -13, 0]}
              transform
              distanceFactor={1.5}
              style={{
                background: isDark ? "#111" : "#eee",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontFamily: "monospace",
                color: isDark ? "#00ffff" : "#005577",
                fontSize: "13px",
                textAlign: "center",
                whiteSpace: "nowrap"
              }}
            >
              <Typical key={runKey} steps={['Console.WriteLine("Hani Welcomes You!");', 1000]} loop={1} wrapper="p" />
            </Html>
          )}
        </Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Hero;

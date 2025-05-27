import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stars, Text } from "@react-three/drei";
import styles from "../styles/Hero.module.css";
import Typical from "react-typical";
import { Html } from "@react-three/drei"; // for HTML inside Canvas
import "bootstrap/dist/css/bootstrap.min.css";

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

const Hero = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.overlay}>
        <h1>Hi, I'm Hani Ayach</h1>
        <h2>Full Stack Software Engineer • Aspiring AI Developer</h2>
        <button className={styles.button} onClick={() => setOpen(true)}>
          Run
        </button>
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 2, 1]} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />

        <Suspense fallback={null}>
          <LaptopModel open={open} />

          {open && (
            <Html
              position={[0.17, -0.3, -0.95]} // Adjust based on model's screen position
              rotation={[0, Math.PI / -13, 0]} // X: 30°, Y: 45°, Z: 0°
              fontSize={2.75}
              transform
              distanceFactor={1.5}
              style={{
                background: "#111",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontFamily: "monospace",
                color: "#00ffff",
                fontSize: "12px",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              <Typical
                steps={['Console.WriteLine("Hani Welcomes You!");', 1000]}
                loop={1}
                wrapper="p"
              />
            </Html>
          )}
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Hero;

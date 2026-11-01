import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useIsMobile, useReducedMotion } from "../hooks/useMediaQuery";

// One star field behind the whole site (was three separate canvases).
const StarField = () => {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  if (reduced && mobile) return null;

  return (
    <div className="starfield" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]} frameloop={reduced ? "demand" : "always"}>
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={mobile ? 1200 : 2500} factor={4} saturation={0} fade speed={reduced ? 0 : 1} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarField;

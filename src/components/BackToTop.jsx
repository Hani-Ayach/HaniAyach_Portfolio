import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useReducedMotion } from "../hooks/useMediaQuery";

const SHOW_AFTER = 600; // px scrolled before the button appears

const BackToTop = () => {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <button
      type="button"
      className="back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  );
};

export default BackToTop;

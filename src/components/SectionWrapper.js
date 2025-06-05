import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const SectionWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={`py-5 ${
        theme === "dark" ? "bg-black text-white" : "bg-light text-dark"
      }`}
    >
      <div className="container">{children}</div>
    </section>
  );
};

export default SectionWrapper;

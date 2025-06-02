import React from "react";
import styles from "../styles/SectionWrapper.module.css";

const SectionWrapper = ({ children, background = "bg-dark" }) => {
  return (
    <section
      className={` mt-5 pt-5 text-center ${styles.section} ${styles[background]}`}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;

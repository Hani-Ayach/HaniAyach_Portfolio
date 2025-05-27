import React from "react";
import styles from "../styles/SectionWrapper.module.css";

const SectionWrapper = ({ children, background = "bg-dark" }) => {
  return (
    <section className={`${styles.section} ${styles[background]}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Contact from "../components/Contact";
import Experience from "../sections/Experience";
import Work from "../sections/Work";
import AiTeaser from "../sections/AiTeaser";
import ArchitectureTeaser from "../sections/ArchitectureTeaser";
import Notes from "../sections/Notes";

// Router navigation to "/#section" does not scroll by itself.
function useScrollToHash() {
  const { hash, search } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    el?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }, [hash, search]);
}

const Home = () => {
  useScrollToHash();
  return (
    <>
      <Hero />
      <Experience />
      <Work />
      <ArchitectureTeaser />
      <AiTeaser />
      <Notes />
      <Contact />
    </>
  );
};

export default Home;


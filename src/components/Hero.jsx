import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa6";
import styles from "../styles/Hero.module.css";
import { profile, yearsOfExperience, formatYears } from "../content/profile";
import Terminal from "../terminal/Terminal";

const Hero = () => {
  const years = formatYears(yearsOfExperience(profile.experience));

  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="section-eyebrow">Hi, I'm {profile.name}</p>
          <h1 className={styles.title}>{profile.title}</h1>
          <p className={styles.tagline}>{profile.tagline}</p>

          <div className={styles.badges}>
            <span className={styles.years}>{years} professional experience</span>
            <span className="muted mono small">{profile.location}</span>
          </div>

          <ul className={styles.keywords} aria-label="Core technologies">
            {profile.keywords.map((k) => (
              <li key={k} className="chip">{k}</li>
            ))}
          </ul>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <a className="btn btn-cta px-4" href="/#work">See my work</a>
            <a className="btn btn-ghost px-4" href="/#contact">Contact me</a>
          </div>

          <div className={styles.socials}>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><FaEnvelope /></a>
          </div>
        </div>

        <div className={styles.terminal}>
          <Terminal />
        </div>
      </div>
    </section>
  );
};

export default Hero;

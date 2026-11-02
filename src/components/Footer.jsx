import React from "react";
import { profile } from "../content/profile";

const Footer = () => (
  <footer className="site-footer">
    <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span className="d-flex gap-3">
        <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </span>
    </div>
  </footer>
);

export default Footer;

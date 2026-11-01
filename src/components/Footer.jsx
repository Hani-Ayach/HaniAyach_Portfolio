import React from "react";
import { profile } from "../content/profile";
import ProofStrip from "./ProofStrip";

const Footer = () => (
  <footer className="site-footer">
    <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
      <span>
        © {new Date().getFullYear()} {profile.name} · <span className="mono">{profile.motto}</span>
      </span>
      <span className="d-flex gap-3">
        <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </span>
    </div>
    <div className="container mt-2">
      <ProofStrip />
    </div>
  </footer>
);

export default Footer;

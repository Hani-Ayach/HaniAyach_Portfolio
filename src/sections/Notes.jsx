import React from "react";
import { profile } from "../content/profile";

const Notes = () => (
  <section className="section" id="notes">
    <div className="container">
      <p className="section-eyebrow">Engineering notes</p>
      <h2 className="section-title">How I think about the craft</h2>
      <p className="section-lead">Short takes I've shared on LinkedIn.</p>
      <div className="row g-3 mt-2">
        {profile.notes.map((n) => (
          <div key={n.title} className="col-md-6">
            <div className="card-surface p-4 h-100">
              <h3 className="h6 mb-2">{n.title}</h3>
              <p className="muted small mb-0">{n.summary}</p>
            </div>
          </div>
        ))}
      </div>
      <a className="btn btn-ghost mt-4" href={`${profile.socials.linkedin}recent-activity/all/`} target="_blank" rel="noopener noreferrer">
        Read more on LinkedIn
      </a>
    </div>
  </section>
);

export default Notes;

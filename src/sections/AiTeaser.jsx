import React from "react";
import { Link } from "react-router-dom";
import { profile } from "../content/profile";

const AiTeaser = () => (
  <section className="section" id="ai">
    <div className="container">
      <div className="card-surface p-4 p-md-5 d-flex flex-column flex-lg-row gap-4 align-items-lg-center justify-content-between">
        <div>
          <p className="section-eyebrow">How I work</p>
          <h2 className="section-title mb-2">{profile.motto}</h2>
          <p className="section-lead mb-0">
            Recurring work and migrations run as my own Claude Code skills, so I spend less time on the
            repetitive parts. Design, review and business rules stay with me.
          </p>
        </div>
        <Link className="btn btn-cta px-4 flex-shrink-0" to="/ai-workflow">How I work with AI</Link>
      </div>
    </div>
  </section>
);

export default AiTeaser;

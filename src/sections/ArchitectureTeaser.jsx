import React from "react";
import { Link } from "react-router-dom";
import { architecture } from "../content/architecture";

const ArchitectureTeaser = () => (
  <section className="section" id="architecture">
    <div className="container">
      <p className="section-eyebrow">Architecture & design patterns</p>
      <h2 className="section-title">Structure first, framework second</h2>
      <p className="section-lead">
        Clean Architecture and the patterns I use in production, each with the problem it solves, how I apply
        it, and a code example.
      </p>
      <ul className="d-flex flex-wrap gap-2 list-unstyled my-4">
        {architecture.patterns.map((p) => (
          <li key={p.slug} className="chip">{p.name}</li>
        ))}
      </ul>
      <Link className="btn btn-cta px-4" to="/architecture">See the patterns</Link>
    </div>
  </section>
);

export default ArchitectureTeaser;

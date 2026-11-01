import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { profile } from "../content/profile";
import Mermaid from "../components/Mermaid";
import { usePageEntry } from "../hooks/usePageEntry";

const CaseStudy = () => {
  const { slug } = useParams();
  const index = profile.caseStudies.findIndex((c) => c.slug === slug);
  const c = profile.caseStudies[index];
  const headingRef = usePageEntry(c ? `${c.title} — ${profile.name}` : `Not found — ${profile.name}`, slug);

  if (!c) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="section-title" ref={headingRef} tabIndex={-1}>Case study not found</h1>
          <p className="section-lead">There's no case study at this address.</p>
          <a className="btn btn-ghost" href="/#work">Back to all work</a>
        </div>
      </section>
    );
  }

  const next = profile.caseStudies[(index + 1) % profile.caseStudies.length];

  return (
    <article className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        <a href="/#work" className="small text-decoration-none"><FaArrowLeft aria-hidden="true" /> Back to all work</a>
        <p className="section-eyebrow mt-4">{c.label}</p>
        <h1 className="section-title" ref={headingRef} tabIndex={-1}>{c.title}</h1>
        <p className="section-lead">{c.summary}</p>

        <h2 className="h4 mt-5">Context</h2>
        <p>{c.context}</p>

        <h2 className="h4 mt-4">My role</h2>
        <p>{c.role}</p>

        <h2 className="h4 mt-4">Architecture</h2>
        <div className="card-surface p-3 overflow-auto">
          <Mermaid chart={c.architecture} label={`Architecture diagram for ${c.title}`} />
        </div>

        <h2 className="h4 mt-4">Key decisions</h2>
        <ul>{c.decisions.map((d) => <li key={d}>{d}</li>)}</ul>

        <h2 className="h4 mt-4">Results</h2>
        <ul>{c.results.map((r) => <li key={r} className="fw-semibold">{r}</li>)}</ul>

        <h2 className="h4 mt-4">Stack</h2>
        <div className="d-flex flex-wrap gap-1">{c.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>

        <div className="d-flex justify-content-between flex-wrap gap-2 mt-5 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <a className="btn btn-ghost" href="/#contact">Talk to me about this</a>
          {next.slug !== c.slug && (
            <Link className="btn btn-cta" to={`/work/${next.slug}`} aria-label={`Next: ${next.title}`}>
              Next case study <FaArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default CaseStudy;

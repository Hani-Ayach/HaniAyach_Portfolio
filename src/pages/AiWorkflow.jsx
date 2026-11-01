import React from "react";
import { FaCheck } from "react-icons/fa";
import { profile } from "../content/profile";
import ProofStrip from "../components/ProofStrip";
import { usePageEntry } from "../hooks/usePageEntry";
import styles from "./AiWorkflow.module.css";

const BUILD_DOC = "https://github.com/Hani-Ayach/HaniAyach_Portfolio/blob/main/docs/how-this-site-was-built.md";

const AiWorkflow = () => {
  const { tools, guardrails, exampleSkill } = profile.aiWorkflow;
  const headingRef = usePageEntry(`How I work with AI — ${profile.name}`);

  return (
    <article className="section">
      <div className="container" style={{ maxWidth: 960 }}>
        <p className="section-eyebrow">How I work with AI</p>
        <h1 className="section-title" ref={headingRef} tabIndex={-1}>{profile.motto}</h1>
        <p className="section-lead">
          I use AI to remove repetitive work, not to replace thinking. My recurring development tasks run as
          custom Claude Code skills, so my time goes to business rules, system design and keeping the system
          open for extension, and migrations and upgrades take less of my time.
        </p>

        <section className="mt-5">
          <h2 className="h4">I automate my own recurring work</h2>
          <p className="muted">
            An example of the kind of skill I build: one command replaces a checklist that would otherwise be
            run by hand, and it stops before merging, because the review is mine.
          </p>
          <p className="small mono muted">{exampleSkill.note}</p>
          <div className={`card-surface ${styles.skill}`}>
            <p className="mono mb-3"><span className={styles.prompt}>$</span> claude /{exampleSkill.name}</p>
            <ol className={styles.steps}>
              {exampleSkill.steps.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>
          <div className={styles.flow}>
            <span className="chip">Manual checklist</span><span aria-hidden="true">→</span>
            <span className="chip">One command</span><span aria-hidden="true">→</span>
            <span className="chip">Reviewed diff</span>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="h4">Tools and what each is for</h2>
          <div className="row g-3 mt-1">
            {tools.map((t) => (
              <div key={t.name} className="col-md-4">
                <div className="card-surface p-3 h-100">
                  <h3 className="h6 mb-2">{t.name}</h3>
                  <p className="muted small mb-0">{t.use}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h2 className="h4">Guardrails</h2>
          <ul className="list-unstyled mt-3">
            {guardrails.map((g) => (
              <li key={g} className="d-flex gap-2 mb-2"><FaCheck className={styles.check} aria-hidden="true" /><span>{g}</span></li>
            ))}
          </ul>
        </section>

        <section className="mt-5 card-surface p-4">
          <h2 className="h4">Proof: this website</h2>
          <p className="muted">
            This site was rebuilt with the same workflow: a written spec, a step-by-step plan, tests written
            before code, and a review of every change. The numbers below come from the build.
          </p>
          <ProofStrip className="mb-3" />
          <a className="btn btn-ghost" href={BUILD_DOC} target="_blank" rel="noopener noreferrer">How this site was built</a>
        </section>
      </div>
    </article>
  );
};

export default AiWorkflow;

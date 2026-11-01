import React from "react";
import { architecture } from "../content/architecture";
import { profile } from "../content/profile";
import Mermaid from "../components/Mermaid";
import { usePageEntry } from "../hooks/usePageEntry";
import styles from "./Architecture.module.css";

const Architecture = () => {
  const headingRef = usePageEntry(`Architecture & design patterns — ${profile.name}`);

  return (
    <article className="section">
      <div className="container" style={{ maxWidth: 960 }}>
        <p className="section-eyebrow">Architecture & design patterns</p>
        <h1 className="section-title" ref={headingRef} tabIndex={-1}>
          Architecture first, framework second
        </h1>
        <p className="section-lead">{architecture.intro}</p>

        <nav aria-label="Patterns on this page" className={styles.toc}>
          {architecture.patterns.map((p) => (
            <a key={p.slug} href={`#${p.slug}`} className="chip">{p.name}</a>
          ))}
        </nav>

        <section className={`card-surface ${styles.layers}`}>
          <h2 className="h5">The dependency rule</h2>
          <div className="row g-4 align-items-center">
            <div className="col-lg-7 overflow-auto">
              <Mermaid chart={architecture.cleanArchitectureDiagram} label="Clean Architecture layers diagram" />
            </div>
            <div className="col-lg-5">
              <ul className={styles.rules}>
                {architecture.rules.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <p className="small mono muted mt-4">
          Code samples are illustrative and simplified, written for this page. No company code.
        </p>

        {architecture.patterns.map((p) => (
          <section key={p.slug} id={p.slug} className={styles.pattern}>
            <h2 className="h4">{p.name}</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <h3 className={styles.label}>Problem</h3>
                <p className="muted">{p.problem}</p>
              </div>
              <div className="col-md-6">
                <h3 className={styles.label}>How I use it</h3>
                <p>{p.useCase}</p>
              </div>
            </div>
            <pre className={styles.code} tabIndex={0} aria-label={`${p.name} code example`}>
              <code>{p.code}</code>
            </pre>
          </section>
        ))}
      </div>
    </article>
  );
};

export default Architecture;

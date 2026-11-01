import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { profile } from "../content/profile";
import styles from "./Work.module.css";

const Work = () => (
  <section className="section" id="work">
    <div className="container">
      <p className="section-eyebrow">Selected work</p>
      <h2 className="section-title">Case studies</h2>
      <p className="section-lead">
        Real problems from my jobs, anonymized: no company names and no company code, just the problem, the structure I
        chose and what changed.
      </p>

      <div className={styles.grid}>
        {profile.caseStudies.map((c, i) => (
          <article key={c.slug} className={`card-surface ${styles.card}`}>
            <span className="mono small muted">{String(i + 1).padStart(2, "0")} · {c.label}</span>
            <h3 className={styles.title}>{c.title}</h3>
            <p className="muted">{c.summary}</p>
            <p className={styles.result}>{c.results[0]}</p>
            <div className="d-flex flex-wrap gap-1 mb-3">
              {c.stack.slice(0, 4).map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
            <Link to={`/work/${c.slug}`} className={styles.link} aria-label={`Read case study: ${c.title}`}>
              Read case study <FaArrowRight aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Work;

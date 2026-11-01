import React from "react";
import { FaDownload } from "react-icons/fa";
import { profile, yearsOfExperience, formatYears } from "../content/profile";
import { formatPeriod } from "../content/format";
import styles from "./Experience.module.css";

const TIERS = [
  ["strong", "Strong: production & interview-ready"],
  ["production", "Used in production"],
  ["learning", "Learning / certified"],
];

const Experience = ({ today = new Date() }) => {
  const years = formatYears(yearsOfExperience(profile.experience, today));

  return (
    <section className="section" id="experience">
      <div className="container">
        <p className="section-eyebrow">Experience</p>
        <h2 className="section-title">{years} building enterprise software</h2>
        <p className="section-lead">
          Full-time since 2023 across workflow platforms, integrations and business apps, plus an internship
          before that. The frameworks changed from job to job; the engineering approach didn't.
        </p>

        <ol className={styles.timeline} aria-label="Employment history">
          {profile.experience.map((job) => (
            <li key={job.id} className={styles.item}>
              <span className={`${styles.dot} ${job.end === null ? styles.current : ""}`} aria-hidden="true" />
              <div className={`card-surface ${styles.card}`}>
                <div className="d-flex flex-wrap justify-content-between gap-2 align-items-baseline">
                  <h3 className={styles.role}>{`${job.role} · ${job.company}`}</h3>
                  <span className="mono small muted">{formatPeriod(job.start, job.end)}</span>
                </div>
                {job.type === "internship" && <span className="chip mb-2">Internship</span>}
                <p className="muted mb-2">{job.summary}</p>
                <ul className={styles.highlights}>
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="d-flex flex-wrap gap-1 mt-2">
                  {job.stack.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="row g-4 mt-2">
          <div className="col-lg-7">
            <h3 className="h5 mb-3">Skills</h3>
            {TIERS.map(([key, label]) => (
              <div key={key} className="mb-3">
                <h4 className="small mono muted text-uppercase mb-2">{label}</h4>
                {key === "production" ? (
                  profile.skills.productionGroups.map((g) => (
                    <div key={g.group} className={styles.group}>
                      <span className={styles.groupName}>{g.group}</span>
                      <ul className="d-flex flex-wrap gap-1 list-unstyled mb-0" aria-label={g.group}>
                        {g.items.map((s) => <li key={s} className="chip">{s}</li>)}
                      </ul>
                    </div>
                  ))
                ) : (
                  <ul className="d-flex flex-wrap gap-1 list-unstyled mb-0" aria-label={label}>
                    {profile.skills[key].map((s) => (
                      <li key={s} className={`chip ${key === "strong" ? styles.strong : ""}`}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className="col-lg-5">
            <div className={`card-surface p-4 ${styles.side}`}>
              <h3 className="h6 mono muted text-uppercase">Education</h3>
              <p className="mb-1 fw-semibold">{profile.education.degree}</p>
              <p className="muted small mb-3">
                {profile.education.school} · {profile.education.period} · {profile.education.note}
              </p>
              <h3 className="h6 mono muted text-uppercase">Certifications</h3>
              <ul className="small mb-4 ps-3">
                {profile.certifications.map((c) => (
                  <li key={c.name}>{c.name} · <span className="muted">{c.issuer}</span></li>
                ))}
              </ul>
              {profile.cvUrl ? (
                <a className="btn btn-cta w-100" href={profile.cvUrl} download>
                  <FaDownload aria-hidden="true" className="me-2" />
                  Download my CV
                </a>
              ) : (
                <a className="btn btn-cta w-100" href={`mailto:${profile.email}?subject=CV%20request`}>
                  Ask me for my CV
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

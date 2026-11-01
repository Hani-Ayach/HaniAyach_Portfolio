import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa6";
import { profile } from "../content/profile";
import { sendMessage } from "../lib/contact";

const EMPTY = { name: "", email: "", message: "" };

const Contact = () => {
  const [params] = useSearchParams();
  const [form, setForm] = useState(EMPTY);
  const [subject, setSubject] = useState(() => params.get("subject") ?? "");
  const [state, setState] = useState("idle"); // idle | sending | sent | error

  const urlSubject = params.get("subject");
  useEffect(() => {
    if (urlSubject) setSubject(urlSubject);
  }, [urlSubject]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setState("sending");
    try {
      await sendMessage({ ...form, subject });
      setForm(EMPTY);
      setSubject("");
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <p className="section-eyebrow">Contact</p>
            <h2 className="section-title">Let's build something</h2>
            <p className="section-lead">
              Hiring for a full-stack role, or have a project in mind? Send a message and I'll get back to you.
            </p>
            <ul className="list-unstyled mt-4 d-grid gap-2">
              <li><a href={`mailto:${profile.email}`}><FaEnvelope className="me-2" aria-hidden="true" />{profile.email}</a></li>
              <li><a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin className="me-2" aria-hidden="true" />LinkedIn</a></li>
              <li><a href={profile.socials.github} target="_blank" rel="noopener noreferrer"><FaGithub className="me-2" aria-hidden="true" />GitHub</a></li>
            </ul>
          </div>

          <div className="col-lg-7">
            <form className="card-surface p-4" onSubmit={onSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="c-name" className="form-label">Your name</label>
                  <input id="c-name" className="form-control" value={form.name} onChange={update("name")} required autoComplete="name" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="c-email" className="form-label">Email address</label>
                  <input id="c-email" type="email" className="form-control" value={form.email} onChange={update("email")} required autoComplete="email" />
                </div>
                <div className="col-12">
                  <label htmlFor="c-subject" className="form-label">Subject <span className="muted small">(optional)</span></label>
                  <input id="c-subject" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>
                <div className="col-12">
                  <label htmlFor="c-message" className="form-label">Message</label>
                  <textarea id="c-message" rows="5" className="form-control" value={form.message} onChange={update("message")} required />
                </div>
              </div>

              <button type="submit" className="btn btn-cta w-100 mt-3" disabled={state === "sending"}>
                {state === "sending" ? "Sending…" : "Send message"}
              </button>

              {state === "sent" && (
                <p role="status" className="mt-3 mb-0" style={{ color: "var(--good)" }}>
                  Message sent. Thanks, I'll get back to you soon.
                </p>
              )}
              {state === "error" && (
                <p role="alert" className="mt-3 mb-0" style={{ color: "var(--bad)" }}>
                  Couldn't send right now. Please email me directly at{" "}
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

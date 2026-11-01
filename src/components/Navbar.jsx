import React, { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { FaCode, FaMoon, FaSun, FaDownload, FaEnvelope } from "react-icons/fa";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { ThemeContext } from "../contexts/ThemeContext";
import { profile } from "../content/profile";

const LINKS = [
  ["Experience", "/#experience"],
  ["Work", "/#work"],
  ["Architecture", "/architecture"],
  ["AI Workflow", "/ai-workflow"],
  ["Contact", "/#contact"],
];

const ThemeButton = ({ withLabel = false }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={toggleTheme} aria-label={`Switch to ${next} theme`}>
      {theme === "dark" ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
      {withLabel && <span className="ms-2">{next === "light" ? "Light" : "Dark"} theme</span>}
    </button>
  );
};

const CvButton = ({ className = "" }) =>
  profile.cvUrl ? (
    <a className={`btn btn-cta btn-sm px-3 ${className}`} href={profile.cvUrl} download>
      <FaDownload aria-hidden="true" className="me-2" />
      Download CV
    </a>
  ) : null;

// Phone/tablet menu: a sheet from the right. Closes on Escape, backdrop tap or
// link choice; locks page scroll and keeps keyboard focus inside while open.
// Rendered into <body>: the navbar's backdrop-filter would otherwise trap
// these fixed elements inside its 64px box.
const MobileMenu = ({ onClose, toggleRef }) => {
  const sheetRef = useRef(null);

  useEffect(() => {
    const sheet = sheetRef.current;
    sheet.querySelector("a, button")?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggleRef.current, ...sheet.querySelectorAll("a, button")].filter(Boolean);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, toggleRef]);

  return createPortal(
    <>
      <div className="menu-backdrop" data-testid="menu-backdrop" onClick={() => { onClose(); toggleRef.current?.focus(); }} />
      <div ref={sheetRef} id="mobileMenu" className="menu-sheet" role="dialog" aria-modal="true" aria-label="Menu">
        <ul className="menu-links">
          {LINKS.map(([name, href], i) => (
            <li key={href}>
              <a href={href} onClick={onClose}>
                <span className="menu-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                {name}
              </a>
            </li>
          ))}
        </ul>

        <div className="menu-footer">
          <div className="d-flex gap-2 flex-wrap">
            <CvButton />
            <ThemeButton withLabel />
          </div>
          <div className="menu-socials">
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><FaEnvelope /></a>
          </div>
          <p className="mono small muted mb-0">{profile.motto}</p>
        </div>
      </div>
    </>,
    document.body
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const close = useRef(() => setOpen(false)).current;

  return (
    <nav className={`navbar fixed-top site-nav ${open ? "menu-open" : ""}`} aria-label="Main">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-semibold" to="/" onClick={close}>
          <FaCode aria-hidden="true" /> {profile.name}
        </Link>

        <ul className="navbar-nav flex-row d-none d-lg-flex ms-auto align-items-center gap-3">
          {LINKS.map(([name, href]) => (
            <li className="nav-item" key={href}>
              <a className="nav-link" href={href}>{name}</a>
            </li>
          ))}
          {profile.cvUrl && <li className="nav-item"><CvButton /></li>}
          <li className="nav-item"><ThemeButton /></li>
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className={`menu-toggle d-lg-none ${open ? "is-open" : ""}`}
          aria-controls="mobileMenu"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {open && <MobileMenu onClose={close} toggleRef={toggleRef} />}
    </nav>
  );
};

export default Navbar;

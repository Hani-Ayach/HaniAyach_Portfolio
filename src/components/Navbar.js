import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCode } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      className="btn btn-outline-info ms-3"
      title="Toggle Light/Dark Mode"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};


const Navbar = () => {
  const handleNavItemClick = () => {
    const menu = document.getElementById("mainNavbar");
    if (menu && menu.classList.contains("show")) {
      menu.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container">
        {/* Logo or Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <FaCode />
          Hani Ayach
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto text-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={handleNavItemClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/projects" className="nav-link" onClick={handleNavItemClick}>
                Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/inspire" className="nav-link" onClick={handleNavItemClick}>
                Inspire
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" onClick={handleNavItemClick}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link" onClick={handleNavItemClick}>
                Contact
              </NavLink>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

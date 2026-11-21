import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "../content/site";

// Every route serves the same index.html, so the canonical tag is set per route
// here. A fixed one would tell Google every page is a copy of the home page.
const Canonical = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `${SITE_URL}${path}`;
  }, [pathname]);

  return null;
};

export default Canonical;

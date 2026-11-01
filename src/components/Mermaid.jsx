import React, { useContext, useEffect, useId, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

// Renders a Mermaid diagram; mermaid is loaded lazily so it never weighs on the home page.
const Mermaid = ({ chart, label }) => {
  const { theme } = useContext(ThemeContext);
  const id = `m${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let alive = true;
    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: theme === "dark" ? "dark" : "default", securityLevel: "strict" });
      const { svg } = await mermaid.render(`${id}-${theme}`, chart);
      if (alive) setSvg(svg);
    }).catch(() => alive && setSvg(""));
    return () => { alive = false; };
  }, [chart, theme, id]);

  return svg ? (
    <figure role="img" aria-label={label} className="mermaid-figure" dangerouslySetInnerHTML={{ __html: svg }} />
  ) : (
    <pre className="mono small muted" aria-label={label}>{chart}</pre>
  );
};

export default Mermaid;

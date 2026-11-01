import React, { useEffect, useState } from "react";

// Build-time facts about this site (public/proof.json, written by scripts/gen-proof.mjs).
const ProofStrip = ({ className = "" }) => {
  const [proof, setProof] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch("/proof.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => alive && setProof(p))
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  if (!proof) return null;
  return (
    <p className={`mono small muted mb-0 ${className}`}>
      {proof.tests && <span>{proof.tests.passed} tests passing · </span>}
      <span>build <code>{proof.commit}</code></span>
    </p>
  );
};

export default ProofStrip;

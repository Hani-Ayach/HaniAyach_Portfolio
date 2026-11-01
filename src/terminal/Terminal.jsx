import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { runCommand, complete } from "./commands";
import { profile } from "../content/profile";
import styles from "./Terminal.module.css";

const BOOT = [
  { kind: "accent", text: "hani.sh v2.0 — interactive résumé" },
  { kind: "out", text: 'Type "help" or tap a command below.' },
];
const CHIPS = ["whoami", "experience", "work", "automate", "sudo hire-hani"];

let lineId = 0;
const withIds = (lines) => lines.map((l) => ({ ...l, id: ++lineId }));

const Terminal = () => {
  const navigate = useNavigate();
  const [lines, setLines] = useState(() => withIds(BOOT));
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(null); // index into history while browsing
  const inputRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (input) => {
    const result = runCommand(input, { profile, today: new Date() });
    const echo = { kind: "cmd", text: `$ ${input}` };
    if (input.trim()) setHistory((h) => [...h, input]);
    setCursor(null);
    setValue("");

    if (result.action?.type === "clear") {
      setLines([]);
      return;
    }
    setLines((prev) => [...prev, ...withIds([echo, ...result.lines])]);

    if (result.action?.type === "navigate") navigate(result.action.to);
    if (result.action?.type === "download") {
      const a = document.createElement("a");
      a.href = result.action.href;
      a.download = "";
      a.click();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor === null) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(null);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab" && !e.shiftKey && value.trim()) {
      // Only take over Tab when it completes something; otherwise let focus move on.
      const matches = complete(value, { profile }).filter((m) => m !== value);
      if (matches.length === 0) return;
      e.preventDefault();
      if (matches.length === 1) setValue(matches[0]);
      else setLines((prev) => [...prev, ...withIds([{ kind: "out", text: matches.join("   ") }])]);
    }
  };

  return (
    <div className={styles.window} onClick={() => inputRef.current?.focus()}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dot} style={{ background: "#ff5f57" }} />
        <span className={styles.dot} style={{ background: "#febc2e" }} />
        <span className={styles.dot} style={{ background: "#28c840" }} />
        <span className={styles.name}>hani@portfolio: ~</span>
      </div>

      <div ref={logRef} className={styles.log} role="log" aria-live="polite" aria-label="Terminal output">
        {lines.map((l) => (
          <div key={l.id} className={styles[l.kind]}>{l.text}</div>
        ))}
      </div>

      <div className={styles.prompt}>
        <span aria-hidden="true" className={styles.ps1}>$</span>
        <input
          ref={inputRef}
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal input"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="help"
        />
      </div>

      <div className={styles.chips}>
        {CHIPS.map((c) => (
          <button key={c} type="button" className={styles.chip} onClick={(e) => { e.stopPropagation(); run(c); }}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Terminal;

import { readFileSync } from "node:fs";

const css = readFileSync("src/styles/tokens.css", "utf8");
const block = (selector) => {
  const start = css.indexOf(selector);
  return css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
};
const tokens = (text) => Object.fromEntries([...text.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const dark = tokens(block("body.dark"));
const light = { ...dark, ...tokens(block("body.light")) };

test.each([
  ["dark", dark],
  ["light", light],
])("%s theme: every text colour meets WCAG AA (4.5:1) on the background", (_name, t) => {
  for (const key of ["text", "muted", "accent", "cta", "good", "bad"]) {
    expect(t[key], `--${key} defined`).toBeDefined();
    expect(ratio(t[key], t.bg), `--${key} on --bg`).toBeGreaterThanOrEqual(4.5);
  }
});

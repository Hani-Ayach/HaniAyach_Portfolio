import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? files(p) : /\.(jsx?|mjs|css)$/.test(p) ? [p] : [];
  });
}

test.each(files("src"))("%s is valid UTF-8 (the production bundler rejects anything else)", (file) => {
  expect(() => new TextDecoder("utf-8", { fatal: true }).decode(readFileSync(file))).not.toThrow();
});

// Writes public/proof.json at build time: real numbers about how this site was built.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { countTests } from "./proof-lib.mjs";

let commit = null;
try {
  commit = execSync("git rev-parse --short HEAD", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
} catch {
  /* no git in this environment */
}

let tests = null;
const report = "vitest-report.json";
try {
  execSync(`npx vitest run --reporter=json --outputFile=${report}`, { stdio: "ignore" });
} catch {
  /* failing tests still produce a report */
}
try {
  tests = countTests(JSON.parse(readFileSync(report, "utf8")));
  rmSync(report);
} catch {
  /* no report */
}

const proof = { commit, builtAt: new Date().toISOString(), tests };
writeFileSync("public/proof.json", JSON.stringify(proof, null, 2) + "\n");
console.log("proof.json", proof);

// Pure helpers for gen-proof.mjs (kept separate so they can be unit-tested).

export function countTests(report) {
  if (!report) return null;
  return { total: report.numTotalTests, passed: report.numPassedTests };
}

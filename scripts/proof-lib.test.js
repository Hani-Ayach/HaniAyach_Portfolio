import { countTests } from "./proof-lib.mjs";

test("counts passing tests from a vitest json report", () => {
  expect(countTests({ numTotalTests: 61, numPassedTests: 60 })).toEqual({ total: 61, passed: 60 });
  expect(countTests(null)).toBeNull();
});

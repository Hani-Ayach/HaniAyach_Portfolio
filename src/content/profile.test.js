import { profile, yearsOfExperience, formatYears } from "./profile";

const TODAY = new Date(2026, 8, 27); // 27 Sep 2026

test("experience is listed newest first", () => {
  const starts = profile.experience.map((e) => e.start);
  expect(starts).toEqual([...starts].sort().reverse());
});

test("only the current role has no end date", () => {
  const current = profile.experience.filter((e) => e.end === null);
  expect(current.map((e) => e.company)).toEqual(["Intalio"]);
});

test("years of experience counts full-time roles only", () => {
  expect(yearsOfExperience(profile.experience, TODAY)).toBe(3);
});

test("years of experience ignores internships", () => {
  const internOnly = [{ type: "internship", start: "2021-10", end: "2022-06" }];
  expect(yearsOfExperience(internOnly, TODAY)).toBe(0);
});

test("a role running to the present counts up to today", () => {
  const current = [{ type: "full-time", start: "2024-09", end: null }];
  expect(yearsOfExperience(current, TODAY)).toBe(2);
});

test("formatYears renders a plus-suffixed label", () => {
  expect(formatYears(3)).toBe("3+ years");
  expect(formatYears(1)).toBe("1+ year");
});

test("case study slugs are unique kebab-case", () => {
  const slugs = profile.caseStudies.map((c) => c.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
  slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
});

test("every case study has all sections filled", () => {
  for (const c of profile.caseStudies) {
    for (const key of ["title", "label", "summary", "context", "role", "architecture"]) {
      expect(c[key], `${c.slug}.${key}`).toBeTruthy();
    }
    for (const key of ["decisions", "results", "stack"]) {
      expect(c[key].length, `${c.slug}.${key}`).toBeGreaterThan(0);
    }
  }
});

test("content never exposes a phone number", () => {
  expect(JSON.stringify(profile)).not.toMatch(/\+961|\b\d{2}[\s-]?\d{3}[\s-]?\d{3}\b/);
});

test("course-only skills are never listed as production skills", () => {
  const production = [...profile.skills.strong, ...profile.skills.production];
  for (const s of profile.skills.learning) expect(production).not.toContain(s);
  expect(profile.skills.learning).toEqual(expect.arrayContaining(["Kubernetes", "Terraform"]));
});

test("case studies never name an employer", () => {
  const employers = profile.experience.map((e) => e.company);
  for (const c of profile.caseStudies) {
    const text = JSON.stringify(c);
    for (const name of employers) expect(text, `${c.slug} mentions ${name}`).not.toContain(name);
  }
});

const CONFIRMED_2026_10_05 = [
  "Elasticsearch", "Redis", "SignalR", "Hangfire / Worker Services", "PostgreSQL / MySQL", "MongoDB",
  "ASP.NET Core Identity", "Policy-based authorization", "Swagger / OpenAPI", "Serilog", "AutoMapper",
  "FluentValidation", "Angular Material / PrimeNG", "Tailwind CSS", "Charts & dashboards", "Arabic RTL / i18n",
  "GitHub Actions", "IIS / Windows Server", "Aspose", "Telerik document processing", "File storage",
];

test("production skills include every technology Hani confirmed on 2026-10-05", () => {
  expect(profile.skills.production).toEqual(expect.arrayContaining(CONFIRMED_2026_10_05));
});

test("production skills are grouped for display, and the groups are the whole list", () => {
  const flat = profile.skills.productionGroups.flatMap((g) => g.items);
  expect(flat).toEqual(profile.skills.production);
  profile.skills.productionGroups.forEach((g) => expect(g.group).toBeTruthy());
});

test("the platform-features case study only uses confirmed use cases", () => {
  const c = profile.caseStudies.find((x) => x.slug === "search-realtime-background-jobs");
  expect(c.stack).toEqual(expect.arrayContaining(["Elasticsearch", "Redis", "SignalR", "Hangfire"]));
  expect(JSON.stringify(c)).not.toMatch(/\d+\s?%|\d+x faster/); // no invented numbers
});

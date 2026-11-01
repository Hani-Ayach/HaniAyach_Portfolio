// Keeps the site in line with the decisions Hani made for his 2026 CV (v4).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { profile } from "../content/profile";

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return sourceFiles(p);
    return /\.(jsx?|html)$/.test(p) && !/\.test\./.test(p) ? [p] : [];
  });
}
const siteText = [...sourceFiles("src"), "index.html"].map((f) => readFileSync(f, "utf8")).join("\n");

test("no '3x faster' claim anywhere: Hani can't show how it was measured", () => {
  expect(siteText).not.toMatch(/\b3\s?[x×]\b/i);
});

test("location doesn't say remote-only: he wants hybrid and on-site roles too", () => {
  expect(profile.location).toBe("Lebanon");
  expect(siteText).not.toMatch(/open to remote/i);
});

test("Intalio lists what the CV confirms there", () => {
  const intalio = profile.experience.find((e) => e.company === "Intalio");
  const text = intalio.highlights.join(" ");
  expect(text).toMatch(/CQRS \+ MediatR/);
  expect(text).toMatch(/Driver \+ Registry \+ Factory/);
  expect(text).toMatch(/Docker Compose/);
});

test("Antwork includes the APIs for web and mobile and the CI/CD-ready Git work", () => {
  const text = profile.experience.find((e) => e.company === "Antwork").highlights.join(" ");
  expect(text).toMatch(/web .*mobile/i);
  expect(text).toMatch(/CI\/CD/);
});

test("skills match the CV's production list", () => {
  const groups = Object.fromEntries(profile.skills.productionGroups.map((g) => [g.group, g.items]));
  expect(groups.Languages).toEqual(["C#", "TypeScript", "JavaScript", "SQL", "Java"]);
  expect(profile.skills.production).toEqual(
    expect.arrayContaining(["MediatR", "JWT", "RabbitMQ", "Telerik UI", "Docker Compose", "Query optimization & indexing", "Agile / Scrum"])
  );
  expect(profile.skills.production).toEqual(expect.arrayContaining(["Modular monolith", "Telerik document processing"]));
});

test("no CV download: Hani chose to keep his phone number off the web", () => {
  expect(profile.cvUrl).toBeNull();
});

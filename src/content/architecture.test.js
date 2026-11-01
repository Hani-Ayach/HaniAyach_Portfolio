import { architecture } from "./architecture";
import { profile } from "./profile";

const CONFIRMED = ["Clean Architecture", "CQRS + MediatR", "Repository + Unit of Work", "Driver + Registry + Factory", "Facade"];

test("lists exactly the approaches Hani confirmed using in production", () => {
  expect(architecture.patterns.map((p) => p.name)).toEqual(CONFIRMED);
});

test("every pattern explains the problem, the use case and shows code", () => {
  for (const p of architecture.patterns) {
    for (const key of ["slug", "problem", "useCase", "code"]) expect(p[key], `${p.name}.${key}`).toBeTruthy();
    expect(p.code).toMatch(/class|interface|record/);
  }
});

test("never claims patterns Hani did not confirm", () => {
  const text = JSON.stringify({ architecture, profile });
  expect(text).not.toMatch(/\b(Strategy|Adapter|Decorator|Template Method|Chain of Responsibility|Observer|Builder)\b/);
});

test("snippets are generic: no employer names", () => {
  const text = JSON.stringify(architecture);
  for (const e of profile.experience) expect(text).not.toContain(e.company);
});

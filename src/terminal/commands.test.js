import { runCommand, complete, COMMANDS } from "./commands";
import { profile } from "../content/profile";

const ctx = { profile, today: new Date(2026, 8, 27) };
const text = (r) => r.lines.map((l) => l.text).join("\n");

test("help lists every command", () => {
  const out = text(runCommand("help", ctx));
  COMMANDS.forEach((c) => expect(out).toContain(c));
});

test("whoami prints name and title", () => {
  const out = text(runCommand("whoami", ctx));
  expect(out).toContain(profile.name);
  expect(out).toContain(profile.title);
});

test("input is trimmed and case-insensitive", () => {
  expect(text(runCommand("  WHOAMI  ", ctx))).toContain(profile.name);
});

test("years prints the computed experience", () => {
  expect(text(runCommand("years", ctx))).toContain("3+ years");
});

test("experience lists each company with its period", () => {
  const out = text(runCommand("experience", ctx));
  expect(out).toMatch(/Intalio.*Nov 2025 – Present/);
  expect(out).toMatch(/Antwork.*Sep 2023 – Mar 2025/);
});

test("stack shows the honest tiers", () => {
  const out = text(runCommand("stack", ctx));
  expect(out).toMatch(/strong:.*ASP\.NET Core/i);
  expect(out).toMatch(/learning:.*Kubernetes/i);
});

test("work lists every case study slug", () => {
  const out = text(runCommand("work", ctx));
  profile.caseStudies.forEach((c) => expect(out).toContain(c.slug));
});

test("open <known slug> navigates to the case study", () => {
  const slug = profile.caseStudies[0].slug;
  expect(runCommand(`open ${slug}`, ctx).action).toEqual({ type: "navigate", to: `/work/${slug}` });
});

test("open <unknown> errors and points to work", () => {
  const r = runCommand("open nope", ctx);
  expect(r.lines[0].kind).toBe("err");
  expect(r.lines[0].text).toMatch(/not found.*work/i);
  expect(r.action).toBeUndefined();
});

test("open with no slug shows usage", () => {
  expect(runCommand("open", ctx).lines[0].text).toMatch(/usage: open <slug>/i);
});

test("ai navigates to the AI workflow page", () => {
  expect(runCommand("ai", ctx).action).toEqual({ type: "navigate", to: "/ai-workflow" });
});

test("automate plays the example skill and ends with a review step", () => {
  const r = runCommand("automate", ctx);
  expect(text(r)).toContain(profile.aiWorkflow.exampleSkill.name);
  expect(r.lines.at(-1).text).toMatch(/review/i);
});

test("cv downloads the CV when configured", () => {
  const withCv = { ...ctx, profile: { ...profile, cvUrl: "/cv.pdf" } };
  expect(runCommand("cv", withCv).action).toEqual({ type: "download", href: "/cv.pdf" });
});

test("cv without a CV file points to email instead of a broken download", () => {
  const noCv = { ...ctx, profile: { ...profile, cvUrl: null } };
  const r = runCommand("cv", noCv);
  expect(r.action).toBeUndefined();
  expect(r.lines.map((l) => l.text).join(" ")).toContain(profile.email);
});

test("contact navigates to the contact section", () => {
  expect(runCommand("contact", ctx).action).toEqual({ type: "navigate", to: "/#contact" });
});

test("clear asks the terminal to clear", () => {
  expect(runCommand("clear", ctx)).toEqual({ lines: [], action: { type: "clear" } });
});

test("sudo hire-hani opens contact with a pre-filled subject", () => {
  expect(runCommand("sudo hire-hani", ctx).action).toEqual({
    type: "navigate",
    to: "/?subject=Let%27s%20talk%20about%20a%20role#contact",
  });
});

test("other sudo commands are denied with a hint", () => {
  const r = runCommand("sudo rm -rf /", ctx);
  expect(r.lines[0].kind).toBe("err");
  expect(r.lines[0].text).toMatch(/sudo hire-hani/);
});

test("easter eggs answer", () => {
  expect(text(runCommand("dotnet new portfolio", ctx))).toMatch(/already exists/i);
  expect(text(runCommand("ng serve", ctx))).toMatch(/localhost/i);
});

test("unknown command suggests help", () => {
  const r = runCommand("rm -rf /", ctx);
  expect(r.lines[0].kind).toBe("err");
  expect(r.lines[0].text).toMatch(/command not found.*help/i);
});

test("empty input prints nothing", () => {
  expect(runCommand("   ", ctx)).toEqual({ lines: [] });
});

test("complete matches command prefixes", () => {
  expect(complete("wh", ctx)).toEqual(["whoami"]);
  expect(complete("c", ctx)).toEqual(["contact", "cv", "clear"].sort());
});

test("complete suggests slugs after open", () => {
  expect(complete("open ", ctx)).toEqual(profile.caseStudies.map((c) => `open ${c.slug}`));
  expect(complete("open api", ctx)).toEqual(["open api-response-time-40"]);
});

test("help and automate describe the skill as an example", () => {
  expect(text(runCommand("help", ctx))).toMatch(/automate\s+watch an example Claude skill run/);
  expect(text(runCommand("automate", ctx))).toMatch(/example/i);
});

test("patterns opens the architecture page and is listed in help", () => {
  expect(runCommand("patterns", ctx).action).toEqual({ type: "navigate", to: "/architecture" });
  expect(text(runCommand("help", ctx))).toMatch(/patterns\s+/);
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AiWorkflow from "./AiWorkflow";
import { profile } from "../content/profile";

beforeEach(() => vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false }))));
afterEach(() => vi.unstubAllGlobals());

const setup = () => render(<MemoryRouter><AiWorkflow /></MemoryRouter>);

test("leads with the engineer-in-charge message", () => {
  setup();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/AI accelerates\. Engineering decides\./);
});

test("shows the example skill step by step and says it is generic", () => {
  setup();
  const skill = profile.aiWorkflow.exampleSkill;
  expect(screen.getByText(new RegExp(skill.name))).toBeInTheDocument();
  skill.steps.forEach((s) => expect(screen.getByText(s)).toBeInTheDocument());
  expect(screen.getByText(/generic/i)).toBeInTheDocument();
});

test("lists every tool and guardrail", () => {
  setup();
  profile.aiWorkflow.tools.forEach((t) => expect(screen.getByRole("heading", { name: t.name })).toBeInTheDocument());
  profile.aiWorkflow.guardrails.forEach((g) => expect(screen.getByText(g)).toBeInTheDocument());
});

test("links to the write-up of how this site was built", () => {
  setup();
  expect(screen.getByRole("link", { name: /how this site was built/i })).toHaveAttribute(
    "href",
    "https://github.com/Hani-Ayach/HaniAyach_Portfolio/blob/main/docs/how-this-site-was-built.md"
  );
});

test("labels the example skill as illustrative, not as a real company skill", () => {
  setup();
  expect(screen.getByText(profile.aiWorkflow.exampleSkill.note)).toBeInTheDocument();
  expect(screen.queryByText(/one of my claude code skills/i)).toBeNull();
});

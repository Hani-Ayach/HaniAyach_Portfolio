import { render, screen, within } from "@testing-library/react";
import Experience from "./Experience";
import { profile } from "../content/profile";

const setup = () => render(<Experience today={new Date(2026, 8, 27)} />);

test("lists every role newest first", () => {
  setup();
  const items = [...screen.getByRole("list", { name: /employment history/i }).querySelectorAll(":scope > li")];
  expect(items.map((li) => within(li).getByRole("heading", { level: 3 }).textContent)).toEqual(
    profile.experience.map((e) => `${e.role} · ${e.company}`)
  );
});

test("current role shows Present and formatted dates", () => {
  setup();
  expect(screen.getByText("Nov 2025 – Present")).toBeInTheDocument();
  expect(screen.getByText("Sep 2023 – Mar 2025")).toBeInTheDocument();
});

test("internship is labelled as such", () => {
  setup();
  expect(screen.getByText("Internship")).toBeInTheDocument();
});

test("shows computed years of professional experience", () => {
  setup();
  expect(screen.getByText(/3\+ years/)).toBeInTheDocument();
});

test("skills are split into honest tiers", () => {
  setup();
  expect(screen.getByRole("heading", { name: /learning \/ certified/i })).toBeInTheDocument();
  const learning = screen.getByRole("list", { name: /learning \/ certified/i });
  expect(within(learning).getByText("Kubernetes")).toBeInTheDocument();
});

test("offers the CV download only when a CV file is configured", () => {
  setup();
  const cv = screen.queryByRole("link", { name: /download my cv/i });
  if (profile.cvUrl) {
    expect(cv).toHaveAttribute("href", profile.cvUrl);
    expect(cv).toHaveAttribute("download");
  } else {
    expect(cv).toBeNull();
    expect(screen.getByRole("link", { name: /ask me for my cv/i })).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
  }
});

test("production skills are shown in labelled groups", () => {
  setup();
  for (const g of profile.skills.productionGroups) {
    const list = screen.getByRole("list", { name: g.group });
    g.items.forEach((s) => expect(within(list).getByText(s)).toBeInTheDocument());
  }
});

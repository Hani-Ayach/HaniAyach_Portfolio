import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CaseStudy from "./CaseStudy";
import { profile } from "../content/profile";

vi.mock("../components/Mermaid", () => ({ default: ({ chart }) => <pre data-testid="diagram">{chart}</pre> }));

const renderAt = (slug) =>
  render(
    <MemoryRouter initialEntries={[`/work/${slug}`]}>
      <Routes>
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Routes>
    </MemoryRouter>
  );

test("renders every section of a known case study", () => {
  const c = profile.caseStudies[0];
  renderAt(c.slug);
  expect(screen.getByRole("heading", { level: 1, name: c.title })).toBeInTheDocument();
  for (const h of ["Context", "My role", "Architecture", "Key decisions", "Results", "Stack"]) {
    expect(screen.getByRole("heading", { level: 2, name: h })).toBeInTheDocument();
  }
  expect(screen.getByTestId("diagram").textContent).toBe(c.architecture);
  c.stack.forEach((s) => expect(screen.getAllByText(s).length).toBeGreaterThan(0));
});

test("unknown slug shows a friendly not-found with a way back", () => {
  renderAt("nope");
  expect(screen.getByRole("heading", { name: /case study not found/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /back to all work/i })).toHaveAttribute("href", "/#work");
});

test("links to the next case study", () => {
  const [a, b] = profile.caseStudies;
  renderAt(a.slug);
  expect(screen.getByRole("link", { name: new RegExp(`next: ${b.title}`, "i") })).toHaveAttribute("href", `/work/${b.slug}`);
});

test("the case study page shows the neutral label, not the employer", () => {
  const c = profile.caseStudies[0];
  renderAt(c.slug);
  expect(screen.getByText(c.label)).toBeInTheDocument();
  for (const e of profile.experience) expect(screen.queryByText(new RegExp(e.company))).toBeNull();
});

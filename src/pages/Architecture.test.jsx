import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Architecture from "./Architecture";
import { architecture } from "../content/architecture";

vi.mock("../components/Mermaid", () => ({ default: ({ label }) => <div data-testid="diagram" aria-label={label} /> }));

const setup = () => render(<MemoryRouter><Architecture /></MemoryRouter>);

test("has one heading and a code sample per pattern", () => {
  setup();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/architecture/i);
  for (const p of architecture.patterns) {
    expect(screen.getByRole("heading", { level: 2, name: p.name })).toBeInTheDocument();
    expect(screen.getByText(p.useCase)).toBeInTheDocument();
  }
  expect(document.querySelectorAll("pre code").length).toBe(architecture.patterns.length);
});

test("draws the Clean Architecture layers and states the dependency rule", () => {
  setup();
  expect(screen.getByTestId("diagram")).toHaveAttribute("aria-label", expect.stringMatching(/clean architecture/i));
  architecture.rules.forEach((r) => expect(screen.getByText(r)).toBeInTheDocument());
});

test("says the code is illustrative, not company code", () => {
  setup();
  expect(screen.getByText(/illustrative/i)).toBeInTheDocument();
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Work from "./Work";
import { profile } from "../content/profile";

test("shows a card linking to every case study", () => {
  render(<MemoryRouter><Work /></MemoryRouter>);
  for (const c of profile.caseStudies) {
    const link = screen.getByRole("link", { name: new RegExp(`read case study: ${c.title}`, "i") });
    expect(link).toHaveAttribute("href", `/work/${c.slug}`);
  }
});

test("says the work is anonymized", () => {
  render(<MemoryRouter><Work /></MemoryRouter>);
  expect(screen.getByText(/anonymized/i)).toBeInTheDocument();
});

test("cards show the neutral label, not the employer", () => {
  render(<MemoryRouter><Work /></MemoryRouter>);
  for (const c of profile.caseStudies) expect(screen.getAllByText(new RegExp(c.label)).length).toBeGreaterThan(0);
  for (const e of profile.experience) expect(screen.queryByText(new RegExp(e.company))).toBeNull();
});

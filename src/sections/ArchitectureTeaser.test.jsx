import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ArchitectureTeaser from "./ArchitectureTeaser";
import { architecture } from "../content/architecture";

test("lists the patterns and links to the full page", () => {
  render(<MemoryRouter><ArchitectureTeaser /></MemoryRouter>);
  architecture.patterns.forEach((p) => expect(screen.getByText(p.name)).toBeInTheDocument());
  expect(screen.getByRole("link", { name: /see the patterns/i })).toHaveAttribute("href", "/architecture");
});

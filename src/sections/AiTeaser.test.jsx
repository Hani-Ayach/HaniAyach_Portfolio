import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AiTeaser from "./AiTeaser";

test("teases the AI workflow and links to the full page", () => {
  render(<MemoryRouter><AiTeaser /></MemoryRouter>);
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/AI accelerates/);
  expect(screen.getByText(/Claude Code skills/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /how i work with ai/i })).toHaveAttribute("href", "/ai-workflow");
});

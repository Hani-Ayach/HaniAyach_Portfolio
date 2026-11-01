import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/react";
import App from "./App";
import { profile } from "./content/profile";
import { mockMatchMedia } from "./test/matchMedia";

vi.mock("@react-three/fiber", () => ({ Canvas: () => <div data-testid="canvas" /> }));

beforeEach(() => mockMatchMedia([]));

function renderAt(path) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

test("navbar links to every home section", () => {
  renderAt("/");
  const nav = screen.getByRole("navigation");
  for (const [name, href] of [
    ["Experience", "/#experience"],
    ["Work", "/#work"],
    ["Architecture", "/architecture"],
    ["AI Workflow", "/ai-workflow"],
    ["Contact", "/#contact"],
  ]) {
    expect(within(nav).getByRole("link", { name })).toHaveAttribute("href", href);
  }
});

test("navbar offers the CV only when a CV file is configured", () => {
  renderAt("/");
  const cv = screen.queryByRole("link", { name: /download cv/i });
  if (profile.cvUrl) {
    expect(cv).toHaveAttribute("href", profile.cvUrl);
    expect(cv).toHaveAttribute("download");
  } else {
    expect(cv).toBeNull();
  }
});

test.each(["/admin", "/login", "/inspire", "/learn", "/projects", "/about"])(
  "retired route %s lands on the home page",
  async (path) => {
    renderAt(path);
    expect(await screen.findByRole("heading", { level: 1, name: /full stack software engineer/i })).toBeInTheDocument();
  }
);

import { render, screen } from "@testing-library/react";
import App from "./App";
import { mockMatchMedia } from "./test/matchMedia";

// Simulates a browser with WebGL blocked: react-three-fiber rethrows into the React tree.
vi.mock("@react-three/fiber", () => ({
  Canvas: () => {
    throw new Error("Error creating WebGL context.");
  },
}));

beforeEach(() => {
  mockMatchMedia([]);
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

test("the site still renders when WebGL is unavailable", async () => {
  window.history.pushState({}, "", "/");
  render(<App />);
  expect(await screen.findByRole("heading", { level: 1, name: /full stack software engineer/i })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: /terminal input/i })).toBeInTheDocument();
});

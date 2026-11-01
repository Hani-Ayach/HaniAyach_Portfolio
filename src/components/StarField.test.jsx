import { render, screen } from "@testing-library/react";
import StarField from "./StarField";
import { mockMatchMedia } from "../test/matchMedia";

vi.mock("@react-three/fiber", () => ({ Canvas: ({ children }) => <div data-testid="canvas">{children}</div> }));
vi.mock("@react-three/drei", () => ({ Stars: (p) => <i data-testid="stars" data-speed={p.speed} /> }));

test("stars move at normal speed by default", () => {
  mockMatchMedia([]);
  render(<StarField />);
  expect(screen.getByTestId("stars").dataset.speed).toBe("1");
});

test("stars freeze when the user prefers reduced motion", () => {
  mockMatchMedia(["prefers-reduced-motion"]);
  render(<StarField />);
  expect(screen.getByTestId("stars").dataset.speed).toBe("0");
});

test("no canvas at all on mobile with reduced motion", () => {
  mockMatchMedia(["prefers-reduced-motion", "max-width"]);
  render(<StarField />);
  expect(screen.queryByTestId("canvas")).toBeNull();
});

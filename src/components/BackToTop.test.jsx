import { render, screen, fireEvent } from "@testing-library/react";
import BackToTop from "./BackToTop";
import { mockMatchMedia } from "../test/matchMedia";

function scrollTo(y) {
  window.scrollY = y;
  fireEvent.scroll(window);
}

beforeEach(() => {
  window.scrollTo = vi.fn();
  scrollTo(0);
});

test("is hidden near the top of the page", () => {
  mockMatchMedia([]);
  render(<BackToTop />);
  expect(screen.queryByRole("button", { name: /back to top/i })).toBeNull();
});

test("appears after scrolling down and scrolls smoothly to the top", () => {
  mockMatchMedia([]);
  render(<BackToTop />);
  scrollTo(900);
  fireEvent.click(screen.getByRole("button", { name: /back to top/i }));
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
});

test("jumps without animation for reduced-motion users", () => {
  mockMatchMedia(["prefers-reduced-motion"]);
  render(<BackToTop />);
  scrollTo(900);
  fireEvent.click(screen.getByRole("button", { name: /back to top/i }));
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
});

test("hides again when scrolled back up", () => {
  mockMatchMedia([]);
  render(<BackToTop />);
  scrollTo(900);
  scrollTo(100);
  expect(screen.queryByRole("button", { name: /back to top/i })).toBeNull();
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Hero from "./Hero";
import { mockMatchMedia } from "../test/matchMedia";

vi.mock("@react-three/fiber", () => ({ Canvas: () => <div data-testid="canvas" /> }));

test("desktop hero shows the terminal and no 3D laptop", async () => {
  mockMatchMedia([]); // desktop, motion allowed
  render(<MemoryRouter><Hero /></MemoryRouter>);
  expect(screen.getByRole("textbox", { name: /terminal input/i })).toBeInTheDocument();
  await new Promise((r) => setTimeout(r, 1000)); // give any lazy 3D chunk time to mount
  expect(screen.queryByTestId("canvas")).toBeNull();
});
